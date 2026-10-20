#!/usr/bin/env python3
"""Build one email HTML per company from the base piece.

Replaces the content between <!-- OBS:START --> and <!-- OBS:END --> in the
base HTML with each company's observation. Standard library only.

Usage:
    python3 tools/industria/build_variants.py LOTE.csv [--base industria-b2b.html] [--out _envios]

CSV columns (UTF-8, header required):
    slug         short file-safe id, e.g. atramat
    segmento     optional: key in segments.json (b2b, hospitalario, aerolineas, b2c).
                 Fills the INTRO and TESIS blocks. Default: b2b
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
import json
import sys
from pathlib import Path

START = "<!-- OBS:START -->"
END = "<!-- OBS:END -->"
P_STYLE = "margin:0; font-size:17px; line-height:1.62; color:#bebbb6;"
P_STYLE_GAP = "margin:0 0 16px; font-size:17px; line-height:1.62; color:#bebbb6;"
SLUG_RE = re.compile(r"^[a-z0-9-]+$")
EMAIL_RE = re.compile(r"^[^@\s;]+@[^@\s;]+\.[^@\s;]+$")
INDENT = " " * 18
STRONG = '<strong style="color:#bebbb6; font-weight:600;">'
INTRO_STYLE = "margin:0; font-size:17px; line-height:1.6; color:#bebbb6;"
H2_STYLE = ("margin:0 0 22px; font-size:28px; line-height:1.12; font-weight:700; "
            "color:#bebbb6; text-transform:uppercase;")
TESIS_COLOR = {False: "#938f8a", True: "#bebbb6"}


def inline(text: str) -> str:
    """Escape text, then turn **bold** into the email's strong style."""
    safe = html.escape(" ".join(text.split()), quote=False)
    return re.sub(r"\*\*(.+?)\*\*", lambda m: f"{STRONG}{m.group(1)}</strong>", safe)


def render_segment(seg: dict) -> dict:
    intro = f'<p class="f-body" style="{INTRO_STYLE}">{inline(seg["intro"])}</p>'
    h2 = "<br>".join(html.escape(x.strip(), quote=False) for x in seg["tesis_h2"].split("\n"))
    parts = [f'<h2 class="f-display h2" style="{H2_STYLE}">{h2}</h2>']
    for i, para in enumerate(seg["tesis"]):
        last = i == len(seg["tesis"]) - 1
        margin = "0" if last else "0 0 18px"
        color = TESIS_COLOR[bool(para.get("highlight"))]
        parts.append(f'<p class="f-body" style="margin:{margin}; font-size:17px; line-height:1.62; '
                     f'color:{color};">{inline(para["text"])}</p>')
    return {"INTRO": intro, "TESIS": "\n".join(parts)}


def replace_block(page: str, name: str, content: str) -> str:
    start, end = f"<!-- {name}:START -->", f"<!-- {name}:END -->"
    if page.count(start) != 1 or page.count(end) != 1:
        raise ValueError(f"base HTML must contain exactly one {name}:START and one {name}:END")
    head, rest = page.split(start)
    old, tail = rest.split(end)
    indent = re.search(r"\n( *)$", head).group(1)
    body = "\n".join(indent + line for line in content.split("\n"))
    return f"{head}{start}\n{body}\n{indent}{end}{tail}"


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
    ap.add_argument("--segments", type=Path, default=Path(__file__).with_name("segments.json"))
    args = ap.parse_args()

    base = args.base.read_text(encoding="utf-8")
    segments = {k: render_segment(v) for k, v in json.loads(args.segments.read_text(encoding="utf-8")).items()
                if not k.startswith("_")}
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
        seg_key = (row.get("segmento") or "b2b").strip()
        if seg_key not in segments:
            errors.append(f"line {n} ({slug}): unknown segmento '{seg_key}'")
            continue
        try:
            page = base
            for block, content in segments[seg_key].items():
                page = replace_block(page, block, content)
            page = build(page, render_observation(row["observacion"]))
        except ValueError as e:
            errors.append(f"line {n} ({slug}): {e}")
            continue
        seen.add(slug)
        path = out_dir / f"{slug}.html"
        path.write_text(page, encoding="utf-8")
        manifest.append({"archivo": path.name, "empresa": row["empresa"].strip(), "segmento": seg_key,
                         "para": "; ".join(recipients), "asunto": row["asunto"].strip()})

    with (out_dir / "manifest.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["archivo", "empresa", "segmento", "para", "asunto"])
        w.writeheader()
        w.writerows(manifest)

    print(f"{len(manifest)} file(s) written to {out_dir}")
    for e in errors:
        print("ERROR", e, file=sys.stderr)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
