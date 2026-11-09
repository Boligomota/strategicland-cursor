#!/usr/bin/env python3
"""Endpoint alignment check for any built HTML piece (email, page, minisite).

Lists every destination in the file (mailto, wa.me, links, images, scripts,
stylesheets) and compares it with the project's expected channels. Run it on
every HTML before delivering it.

Usage:
  python3 tools/check_endpoints.py FILE.html [FILE.html ...]
  python3 tools/check_endpoints.py _envios/lote-05/*.html --self-url-base https://wemakenoisenotdigital.com/

Exit code 1 when any FAIL is found.
"""
import argparse
import html
import os
import re
import sys
from urllib.parse import urlparse

DEFAULTS = {
    "mailbox": "pulse@wemakenoisenotdigital.com",
    "domain": "wemakenoisenotdigital.com",
    "whatsapp": "525514993121",
    # External hosts accepted without warning (social profile, video host, fonts).
    "allowed_hosts": ["www.linkedin.com", "linkedin.com", "vimeo.com", "player.vimeo.com",
                      "fonts.googleapis.com", "fonts.gstatic.com"],
}

TAG_RE = re.compile(r"<(a|img|link|script|source|iframe)\b([^>]*)>(.*?)(?:</\1>|$)?", re.I | re.S)
ATTR_RE = re.compile(r'\b(href|src)\s*=\s*"([^"]*)"', re.I)
VIEW_WORDS = ("navegador", "view in browser", "ver en línea", "ver online")
UNSUB_WORDS = ("baja", "unsubscribe", "darse de baja")


def text_of(fragment):
    return html.unescape(re.sub(r"<[^>]+>", " ", fragment or "")).strip().lower()


def anchors(page):
    """Yield (tag, attr, url, anchor_text) for every href/src in the page."""
    for m in re.finditer(r"<a\b([^>]*)>(.*?)</a>", page, re.I | re.S):
        for a in ATTR_RE.finditer(m.group(1)):
            yield "a", a.group(1).lower(), html.unescape(a.group(2)), text_of(m.group(2))
    for m in re.finditer(r"<(img|link|script|source|iframe)\b([^>]*)>", page, re.I):
        for a in ATTR_RE.finditer(m.group(2)):
            yield m.group(1).lower(), a.group(1).lower(), html.unescape(a.group(2)), ""


def check(path, cfg, self_url):
    page = open(path, encoding="utf-8").read()
    rows = []
    own = cfg["domain"]
    saw_view = saw_unsub = False
    for tag, attr, url, label in anchors(page):
        scheme = urlparse(url).scheme.lower()
        status, note = "OK", ""
        if scheme == "mailto":
            addr = url[7:].split("?")[0].lower()
            if addr != cfg["mailbox"]:
                status, note = "FAIL", f"mailto a {addr}, se espera {cfg['mailbox']}"
            if any(w in label for w in UNSUB_WORDS) or "baja" in url.lower():
                saw_unsub = True
        elif scheme in ("http", "https"):
            host = urlparse(url).netloc.lower()
            if host in ("wa.me", "api.whatsapp.com"):
                num = re.sub(r"\D", "", urlparse(url).path)
                if num != cfg["whatsapp"]:
                    status, note = "FAIL", f"WhatsApp {num}, se espera {cfg['whatsapp']}"
            elif host == own or host.endswith("." + own):
                if tag == "a" and any(w in label for w in VIEW_WORDS):
                    saw_view = True
                    if url.split("?")[0].split("#")[0] != self_url:
                        status, note = "FAIL", f"«Ver en navegador» abre otra pieza; se espera {self_url}"
            elif tag in ("img", "source"):
                status, note = "FAIL", f"imagen alojada fuera de {own}"
            elif host not in cfg["allowed_hosts"]:
                status, note = "WARN", "destino externo: confirmar que pertenece al proyecto"
        elif scheme in ("tel", "sms"):
            status, note = "WARN", "teléfono: confirmar que es el canal del proyecto"
        elif url.startswith("#") or not url:
            status, note = ("WARN", "enlace vacío") if not url or url == "#" else ("OK", "")
        else:
            status, note = "WARN", "ruta relativa: en correo no carga; usar URL absoluta"
        rows.append((status, tag, url[:110], label[:40], note))
    if not saw_unsub:
        rows.append(("WARN", "-", "-", "-", "no se encontró enlace de baja"))
    if not saw_view:
        rows.append(("WARN", "-", "-", "-", "no se encontró «Ver en navegador»"))
    return rows


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="+")
    ap.add_argument("--mailbox", default=DEFAULTS["mailbox"])
    ap.add_argument("--domain", default=DEFAULTS["domain"])
    ap.add_argument("--whatsapp", default=DEFAULTS["whatsapp"])
    ap.add_argument("--allow-host", action="append", default=[], help="extra external host accepted")
    ap.add_argument("--self-url", help="expected «Ver en navegador» URL (single file)")
    ap.add_argument("--self-url-base", default=None,
                    help="base URL; expected view URL = base + file name (default https://<domain>/)")
    ap.add_argument("--quiet", action="store_true", help="print only FAIL and WARN rows")
    args = ap.parse_args()
    cfg = dict(DEFAULTS, mailbox=args.mailbox.lower(), domain=args.domain, whatsapp=args.whatsapp)
    cfg["allowed_hosts"] = DEFAULTS["allowed_hosts"] + args.allow_host
    base = args.self_url_base or f"https://{args.domain}/"
    failed = False
    for f in args.files:
        self_url = args.self_url or base + os.path.basename(f)
        rows = check(f, cfg, self_url)
        n_fail = sum(r[0] == "FAIL" for r in rows)
        n_warn = sum(r[0] == "WARN" for r in rows)
        failed |= n_fail > 0
        print(f"\n== {f} · FAIL {n_fail} · WARN {n_warn}")
        for r in rows:
            if args.quiet and r[0] == "OK":
                continue
            print("  " + " | ".join(r))
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
