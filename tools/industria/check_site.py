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
        elif tag == "link" and a.get("hreflang"):
            self.hreflang.append(a["hreflang"])
        elif tag == "a":
            href = (a.get("href") or "").strip()
            if href in ("#", "") or href.lower().startswith("javascript:void"):
                self.empty_links += 1
            self._in_a, self._a_text = True, ""

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        elif tag == "a" and self._in_a:
            if LANG_WORDS.match(self._a_text):
                self.language_links.append(self._a_text.strip())
            self._in_a = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._in_a:
            self._a_text += data


def fetch(url, follow=True, timeout=20):
    opener = urllib.request.build_opener() if follow else urllib.request.build_opener(NoRedirect)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with opener.open(req, timeout=timeout, context=ssl.create_default_context()) as r:
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
    }


def check(url):
    result = {"url": url}
    result.update(https_probe(url))
    try:
        status, final, _, body = fetch(url)
        result.update({"status": status, "final_url": final})
        result.update(analyse(body))
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
