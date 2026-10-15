#!/usr/bin/env python3
"""Build one email HTML per company from the base piece.

Replaces the content between <!-- OBS:START --> and <!-- OBS:END --> in the
base HTML with each company's observation. Standard library only.

Usage:
    python3 tools/industria/build_variants.py LOTE.csv [--base industria-b2b.html] [--out _envios]

CSV columns (UTF-8, header required):
    slug         short file-safe id, e.g. atramat
    empresa      company name (manifest only)
    para         recipients, separated by ';'
    asunto       subject line (manifest only)
    observacion  plain text; blank line = new paragraph. HTML is escaped.

Output:
    <out>/<lote>/<slug>.html   one file per row, ready for the Gmail plugin
    <out>/<lote>/manifest.csv  file, company, recipients, subject
"""
import argparse
import csv
import html
import re
import sys
from pathlib import Path

START = "<!-- OBS:START -->"
END = "<!-- OBS:END -->"
P_STYLE = "margin:0; font-size:17px; line-height:1.62; color:#bebbb6;"
P_STYLE_GAP = "margin:0 0 16px; font-size:17px; line-height:1.62; color:#bebbb6;"
SLUG_RE = re.compile(r"^[a-z0-9-]+$")
EMAIL_RE = re.compile(r"^[^@\s;]+@[^@\s;]+\.[^@\s;]+$")
INDENT = " " * 18


def render_observation(text: str) -> str:
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text.strip()) if p.strip()]
    if not paragraphs:
        raise ValueError("observacion is empty")
    out = []
    for i, p in enumerate(paragraphs):
        style = P_STYLE if i == len(paragraphs) - 1 else P_STYLE_GAP
        body = html.escape(" ".join(p.split()), quote=False)
        out.append(f'{INDENT}<p class="f-body" style="{style}">{body}</p>')
    return "\n".join(out)


def build(base: str, observation_html: str) -> str:
    if base.count(START) != 1 or base.count(END) != 1:
        raise ValueError("base HTML must contain exactly one OBS:START and one OBS:END")
    head, rest = base.split(START)
    _, tail = rest.split(END)
    return f"{head}{START}\n{observation_html}\n{INDENT}{END}{tail}"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("csv", type=Path)
    ap.add_argument("--base", type=Path, default=Path("industria-b2b.html"))
    ap.add_argument("--out", type=Path, default=Path("_envios"))
    args = ap.parse_args()

    base = args.base.read_text(encoding="utf-8")
    lote = args.csv.stem
    out_dir = args.out / lote
    out_dir.mkdir(parents=True, exist_ok=True)

    with args.csv.open(encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
    required = {"slug", "empresa", "para", "asunto", "observacion"}
    if not rows or not required.issubset(rows[0].keys()):
        print(f"CSV must have columns: {', '.join(sorted(required))}", file=sys.stderr)
        return 1

    errors, manifest, seen = [], [], set()
    for n, row in enumerate(rows, start=2):
        slug = row["slug"].strip()
        recipients = [e.strip() for e in row["para"].split(";") if e.strip()]
        if not SLUG_RE.match(slug) or slug in seen:
            errors.append(f"line {n}: invalid or duplicate slug '{slug}'")
            continue
        bad = [e for e in recipients if not EMAIL_RE.match(e)]
        if not recipients or bad:
            errors.append(f"line {n} ({slug}): invalid recipients {bad or '(none)'}")
            continue
        try:
            page = build(base, render_observation(row["observacion"]))
        except ValueError as e:
            errors.append(f"line {n} ({slug}): {e}")
            continue
        seen.add(slug)
        path = out_dir / f"{slug}.html"
        path.write_text(page, encoding="utf-8")
        manifest.append({"archivo": path.name, "empresa": row["empresa"].strip(),
                         "para": "; ".join(recipients), "asunto": row["asunto"].strip()})

    with (out_dir / "manifest.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["archivo", "empresa", "para", "asunto"])
        w.writeheader()
        w.writerows(manifest)

    print(f"{len(manifest)} file(s) written to {out_dir}")
    for e in errors:
        print("ERROR", e, file=sys.stderr)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
