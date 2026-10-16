#!/usr/bin/env python3
"""Technical first pass over a company website. Standard library only.

Reports verifiable facts only; choosing which finding matters is a human step.

IMPORTANT: this reads the raw HTML without running JavaScript. Sites that render
with JS or translate per visitor can produce false positives (e.g. {{placeholders}}
that users never see, or a language that is not the one users get). Confirm every
finding in a real browser before it goes into an observation.

Usage:
    python3 tools/industria/check_site.py https://example.com [more URLs...]
    python3 tools/industria/check_site.py --csv LOTE.csv      # uses the 'sitio' column
    python3 tools/industria/check_site.py --file saved.html   # offline test

Checks:
    https_downgrade   HTTPS request redirected to plain HTTP ("No seguro" in browsers)
    https_error       HTTPS could not be loaded at all
    lang              <html lang> value
    hreflang          alternate-language links declared
    language_links    visible links that look like a language switcher
    copyright_years   years found next to © / copyright
    meta_description  empty or missing
    unrendered        template placeholders left in the page, e.g. {{nombreInput}}
    empty_links       count of href="#" and javascript:void links
    title             <title> text
    h1                <h1> texts found (0 or several = weak page structure)
    canonical         <link rel=canonical> present
    og_title          Open Graph title present (how links look when shared)
    jsonld_types      schema.org @type values declared in JSON-LD
    images            total <img> and how many have no alt text
    pdf_links         links to PDF files (fichas, catálogos)
    quote_links       links that look like cotización / contacto
    content_links     links that look like blog / noticias / recursos
    robots            per AI crawler: blocked, allowed or no rule (robots.txt)
    sitemap           sitemap URLs declared in robots.txt and /sitemap.xml status

AI crawlers checked: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
PerplexityBot, Google-Extended. Rules are read literally (longest-match is not
evaluated); "blocked" means a group naming the bot, or '*', has Disallow: /.
"""
import argparse
import csv
import json
import re
import ssl
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Safari/605.1.15"
AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended"]
QUOTE_RE = re.compile(r"cotiza|cotizaci|quote|solicita|contact", re.I)
CONTENT_RE = re.compile(r"blog|noticia|news|art[ií]culo|recurso|insight|prensa|press", re.I)
LANG_WORDS = re.compile(r"^\s*(english|español|espanol|eng|esp|en|es|por|português|pt)\s*$", re.I)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = None
        self.title = ""
        self.meta_description = None
        self.hreflang = []
        self.language_links = []
        self.empty_links = 0
        self.h1 = []
        self.canonical = False
        self.og_title = False
        self.images = 0
        self.images_no_alt = 0
        self.pdf_links = set()
        self.quote_links = set()
        self.content_links = set()
        self.jsonld = []
        self._in_h1 = False
        self._in_jsonld = False
        self._href = ""
        self._in_title = False
        self._in_a = False
        self._a_text = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "title":
            self._in_title = True
        elif tag == "meta" and (a.get("name") or "").lower() == "description":
            self.meta_description = (a.get("content") or "").strip()
        elif tag == "meta" and (a.get("property") or "").lower() == "og:title":
            self.og_title = True
        elif tag == "link" and a.get("hreflang"):
            self.hreflang.append(a["hreflang"])
        elif tag == "link" and "canonical" in (a.get("rel") or "").lower():
            self.canonical = True
        elif tag == "h1":
            self._in_h1 = True
            self.h1.append("")
        elif tag == "img":
            self.images += 1
            if not (a.get("alt") or "").strip():
                self.images_no_alt += 1
        elif tag == "script" and (a.get("type") or "").lower() == "application/ld+json":
            self._in_jsonld = True
            self.jsonld.append("")
        elif tag == "a":
            href = (a.get("href") or "").strip()
            if href in ("#", "") or href.lower().startswith("javascript:void"):
                self.empty_links += 1
            elif urlparse(href).path.lower().endswith(".pdf"):
                self.pdf_links.add(href)
            self._href = href
            self._in_a, self._a_text = True, ""

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        elif tag == "h1":
            self._in_h1 = False
        elif tag == "script":
            self._in_jsonld = False
        elif tag == "a" and self._in_a:
            text = " ".join(self._a_text.split())
            if LANG_WORDS.match(text):
                self.language_links.append(text)
            probe = f"{self._href} {text}"
            if self._href and not self._href.startswith("#"):
                if QUOTE_RE.search(probe):
                    self.quote_links.add(self._href)
                if CONTENT_RE.search(probe):
                    self.content_links.add(self._href)
            self._in_a = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._in_a:
            self._a_text += data
        if self._in_h1 and self.h1:
            self.h1[-1] += data
        if self._in_jsonld and self.jsonld:
            self.jsonld[-1] += data


def jsonld_types(blocks):
    found = set()

    def walk(node):
        if isinstance(node, dict):
            t = node.get("@type")
            for v in (t if isinstance(t, list) else [t]):
                if isinstance(v, str):
                    found.add(v)
            for v in node.values():
                walk(v)
        elif isinstance(node, list):
            for v in node:
                walk(v)

    for raw in blocks:
        try:
            walk(json.loads(raw))
        except ValueError:
            found.add("(JSON-LD inválido)")
    return sorted(found)


def parse_robots(text):
    """Return {bot: 'blocked'|'allowed'|'no rule'} plus declared sitemaps."""
    groups, agents, rules, last_was_agent = [], [], [], False
    sitemaps = []
    for line in text.splitlines():
        line = line.split("#", 1)[0].strip()
        if ":" not in line:
            continue
        key, val = (x.strip() for x in line.split(":", 1))
        key = key.lower()
        if key == "sitemap":
            sitemaps.append(val)
        elif key == "user-agent":
            if not last_was_agent and agents:
                groups.append((agents, rules))
                agents, rules = [], []
            agents.append(val.lower())
            last_was_agent = True
        elif key in ("allow", "disallow"):
            rules.append((key, val))
            last_was_agent = False
    if agents:
        groups.append((agents, rules))

    def verdict(rs):
        return "blocked" if ("disallow", "/") in rs else "allowed"

    out = {}
    star = [r for a, r in groups if "*" in a]
    for bot in AI_BOTS:
        own = [r for a, r in groups if bot.lower() in a]
        if own:
            out[bot] = verdict([x for r in own for x in r])
        elif star:
            out[bot] = verdict([x for r in star for x in r]) + " (vía *)"
        else:
            out[bot] = "no rule"
    return out, sitemaps


def robots_and_sitemap(final_url):
    origin = "{0.scheme}://{0.netloc}".format(urlparse(final_url))
    result = {}
    try:
        status, _, _, body = fetch(origin + "/robots.txt")
        if status == 200 and body.strip() and "<html" not in body[:500].lower():
            result["robots"], sitemaps = parse_robots(body)
        else:
            result["robots"], sitemaps = f"robots.txt no disponible ({status})", []
    except Exception as e:
        result["robots"], sitemaps = f"error: {type(e).__name__}", []
    try:
        status, _, _, body = fetch(origin + "/sitemap.xml")
        xml_ok = status == 200 and ("<urlset" in body or "<sitemapindex" in body)
        result["sitemap"] = {"declared_in_robots": sitemaps, "sitemap_xml": "ok" if xml_ok else f"no ({status})"}
    except Exception as e:
        result["sitemap"] = {"declared_in_robots": sitemaps, "sitemap_xml": f"error: {type(e).__name__}"}
    return result


def fetch(url, follow=True, timeout=20):
    handlers = [urllib.request.HTTPSHandler(context=ssl.create_default_context())]
    if not follow:
        handlers.append(NoRedirect)
    opener = urllib.request.build_opener(*handlers)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with opener.open(req, timeout=timeout) as r:
            return r.status, r.geturl(), r.headers, r.read().decode(r.headers.get_content_charset() or "utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, url, e.headers, ""


def https_probe(url):
    host = urlparse(url if "://" in url else "https://" + url).netloc
    target = f"https://{host}/"
    try:
        status, _, headers, _ = fetch(target, follow=False)
    except Exception as e:  # TLS failure, timeout, refused
        return {"https_error": f"{type(e).__name__}: {e}"[:160], "https_downgrade": None}
    loc = headers.get("Location") if headers else None
    downgrade = bool(loc and urljoin(target, loc).startswith("http://")) if 300 <= status < 400 else False
    return {"https_error": None, "https_downgrade": downgrade, "https_status": status}


def analyse(html_text):
    p = PageParser()
    p.feed(html_text)
    years = sorted(set(re.findall(r"(?:©|&copy;|copyright)[^<]{0,40}?((?:19|20)\d{2})", html_text, re.I)))
    unrendered = sorted(set(re.findall(r"\{\{\s*[\w.]+\s*\}\}", html_text)))[:15]
    return {
        "title": " ".join(p.title.split()),
        "lang": p.lang,
        "hreflang": sorted(set(p.hreflang)),
        "language_links": p.language_links,
        "copyright_years": years,
        "meta_description": "missing" if p.meta_description is None else ("empty" if not p.meta_description else "ok"),
        "unrendered": unrendered,
        "empty_links": p.empty_links,
        "h1": [" ".join(h.split()) for h in p.h1],
        "canonical": p.canonical,
        "og_title": p.og_title,
        "jsonld_types": jsonld_types(p.jsonld),
        "images": {"total": p.images, "sin_alt": p.images_no_alt},
        "pdf_links": len(p.pdf_links),
        "quote_links": sorted(p.quote_links)[:8],
        "content_links": sorted(p.content_links)[:8],
    }


def check(url):
    result = {"url": url}
    result.update(https_probe(url))
    try:
        status, final, _, body = fetch(url)
        result.update({"status": status, "final_url": final})
        result.update(analyse(body))
        result.update(robots_and_sitemap(final))
    except Exception as e:
        result["error"] = f"{type(e).__name__}: {e}"[:160]
    return result


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("urls", nargs="*")
    ap.add_argument("--csv", help="CSV with a 'sitio' column")
    ap.add_argument("--file", help="analyse a saved HTML file (offline)")
    args = ap.parse_args()

    if args.file:
        with open(args.file, encoding="utf-8", errors="replace") as f:
            print(json.dumps({"file": args.file, **analyse(f.read())}, ensure_ascii=False, indent=2))
        return 0
    urls = list(args.urls)
    if args.csv:
        with open(args.csv, encoding="utf-8-sig", newline="") as f:
            urls += [r["sitio"].strip() for r in csv.DictReader(f) if r.get("sitio", "").strip()]
    if not urls:
        ap.print_help()
        return 1
    print(json.dumps([check(u) for u in urls], ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
