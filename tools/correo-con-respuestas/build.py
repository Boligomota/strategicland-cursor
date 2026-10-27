#!/usr/bin/env python3
"""Build a Gmail-safe HTML email with one-tap response buttons plus its hosted
response page (Vercel, wemakenoisenotdigital.com) from a content JSON and a
brand JSON.

Usage:
  python3 build.py CONTENT.json --marca marcas/love-academy.json [--verificar]
  python3 build.py CONTENT.json --marca ... --prueba   # page stays in _envios/, not published
  python3 build.py --nuevo-slug cierre-2027

Outputs:
  _envios/<slug>/<email_file>.html   email to paste/insert in Gmail (gitignored)
  <slug>.html                        response page at the repo root (published)
"""
import argparse, html as H, json, os, re, secrets, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = "https://wemakenoisenotdigital.com/"


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


# ---------------------------------------------------------------- email ----
class Email:
    def __init__(self, brand, content):
        c, f = brand["color"], brand["fuente"]
        self.c, self.f = c, f
        self.INK, self.BG, self.RAISE = c["ink"], c["bg"], c["raised"]
        self.MUT, self.LBL, self.GR, self.OR = c["muted"], c["label"], c["gray"], c["accent"]
        self.TER, self.ON, self.LN = c["on_dark_muted"], c["on_accent"], c["line"]
        self.D, self.B, self.M = f["display"], f["body"], f["label"]
        self.BT = f"1px solid {self.INK}"
        self.url = SITE + content["slug"] + ".html"
        self.content = content
        self.brand = brand

    # primitives
    def p(self, t, extra=""):
        return f'<p style="{self.B}font-size:15px;line-height:1.6;color:{self.INK};margin:0 0 14px;{extra}">{t}</p>'

    def section(self, b):
        return (f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:{self.BT};border-bottom:{self.BT};margin:36px 0 18px;"><tr>'
                f'<td valign="bottom" style="padding:16px 0 12px;{self.D}font-size:26px;line-height:0.95;color:{self.INK};">{b["title"]}</td>'
                f'<td align="right" valign="bottom" style="padding:16px 0 13px;{self.M}font-size:10px;color:{self.LBL};white-space:nowrap;">{b.get("label","")}</td></tr></table>')

    def sub(self, b):
        return f'<p style="{self.D}font-size:17px;line-height:1;color:{self.INK};margin:22px 0 8px;">&gt; {b["text"]}</p>'

    def response(self, b):
        btn = b.get("button", "Marcar")
        return (f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 22px;background:{self.OR};"><tr>'
                f'<td valign="middle" style="padding:14px 12px;background:{self.OR};"><span style="{self.M}font-size:14px;font-weight:600;color:{self.ON};">{b["label"]}</span></td>'
                f'<td align="right" valign="middle" style="padding:10px 10px;background:{self.OR};"><a href="{self.url}?r={b["key"]}" target="_blank" style="display:inline-block;background:{self.INK};color:{self.BG};{self.M}font-size:11px;font-weight:600;text-decoration:none;padding:12px 16px;white-space:nowrap;">{btn} &rarr;</a></td>'
                '</tr></table>')

    def field_response(self, b):
        fl = self.c["accent_field_line"]
        fields = b["fields"]
        short = [x for x in fields if x.get("type") != "textarea"]
        long_ = [x for x in fields if x.get("type") == "textarea"]
        row = ""
        if short:
            n = len(short)
            w = f"{100 // n}%"
            cells = []
            for i, x in enumerate(short):
                pad = "0 10px 6px 0" if i == 0 else ("0 0 6px 10px" if i == n - 1 else "0 10px 6px 10px")
                cells.append(f'<td width="{w}" style="{self.M}font-size:10px;color:{self.ON};padding:{pad};border-bottom:1px solid {fl};">{x["label"]}</td>')
            row += "<tr>" + "".join(cells) + "</tr>"
        for x in long_:
            row += f'<tr><td colspan="{max(len(short),1)}" style="{self.M}font-size:10px;color:{self.ON};padding:18px 0 6px;border-bottom:1px solid {fl};">{x["label"]}</td></tr>'
        return (f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 24px;background:{self.OR};"><tr><td style="padding:14px 12px 4px;background:{self.OR};"><span style="{self.M}font-size:14px;font-weight:600;color:{self.ON};">{b["label"]}</span></td></tr>'
                f'<tr><td style="padding:10px 12px 0;background:{self.OR};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">{row}</table></td></tr>'
                f'<tr><td style="padding:14px 12px 14px;background:{self.OR};"><a href="{self.url}?r={b["key"]}" target="_blank" style="display:inline-block;background:{self.INK};color:{self.BG};{self.M}font-size:11px;font-weight:600;text-decoration:none;padding:12px 16px;">{b.get("button","Responder")} &rarr;</a></td></tr></table>')

    def instructions(self, b):
        ib = self.c["instr_bg"]
        out = (f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:{self.BT};margin:4px 0 22px;background:{ib};"><tr><td style="padding:16px 14px 6px;background:{ib};">'
               f'<p style="{self.M}font-size:11px;font-weight:600;color:{self.INK};margin:0 0 10px;">{b["label"]}</p>'
               f'<p style="{self.M}font-size:12px;line-height:1.6;color:{self.INK};margin:0 0 8px;">{b["text"]}</p>'
               f'<p style="{self.M}font-size:11px;line-height:1.6;color:{self.INK};margin:0;">{b["hint"]}</p>'
               '</td></tr>')
        if b.get("example"):
            ex = b["example"]
            out += (f'<tr><td style="padding:12px 14px 14px;background:{ib};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:{self.BT};"><tr>'
                    f'<td valign="middle" style="padding:12px 12px;{self.M}font-size:13px;font-weight:600;color:{self.INK};">{ex["label"]}</td>'
                    f'<td align="right" valign="middle" style="padding:8px 8px;"><span style="display:inline-block;border:{self.BT};color:{self.INK};{self.M}font-size:11px;font-weight:600;text-decoration:none;padding:10px 14px;white-space:nowrap;">{ex.get("button","Marcar")} &rarr;</span></td>'
                    '</tr></table></td></tr>')
        return out + '</table>'

    def calendar(self, b):
        INK, BG, GR, OR, LN, TER, LBL, M, D, BT = self.INK, self.BG, self.GR, self.OR, self.LN, self.TER, self.LBL, self.M, self.D, self.BT
        st = {
            "fuerte": f'background:{INK};color:{BG};border:1px solid {INK};',
            "apagado": f'background:{GR};color:{BG};border:1px solid {GR};',
            "marca": f'background:{BG};color:{OR};border:2px solid {OR};',
            "tenue": f'background:{BG};color:{GR};border:1px solid {LN};',
            "normal": f'background:{BG};color:{INK};border:1px solid {LN};',
        }
        c = f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:{BT};margin:8px 0 6px;background:{BG};">'
        c += f'<tr><td colspan="7" style="background:{INK};padding:11px 10px;"><span style="{D}font-size:19px;color:{BG};line-height:1;">{b["title"]}</span><span style="{M}font-size:10px;color:{TER};"> &nbsp;{b.get("subtitle","")}</span></td></tr><tr>'
        for dn in b.get("weekdays", ["D", "L", "M", "M", "J", "V", "S"]):
            c += f'<td align="center" style="{M}font-size:10px;color:{LBL};padding:7px 0;border-bottom:{BT};">{dn}</td>'
        c += '</tr>'
        for w in b["weeks"]:
            c += '<tr>'
            for cell in w:
                lab, s = cell
                sz = "font-size:12px;" if "<br>" in lab else "font-size:17px;"
                c += f'<td align="center" width="14%" style="{D}{sz}letter-spacing:0;line-height:1.05;padding:11px 0;{st[s]}">{lab}</td>'
            c += '</tr>'
        c += '</table>'
        sw = {"fuerte": f"background:{INK};", "apagado": f"background:{GR};",
              "marca": f"border:2px solid {OR};width:8px;height:8px;",
              "tenue": f"background:{BG};border:1px solid {GR};width:8px;height:8px;"}

        def lg(s, t):
            return f'<td style="padding:0 14px 6px 0;white-space:nowrap;"><span style="display:inline-block;width:10px;height:10px;{sw[s]}vertical-align:middle;"></span><span style="{M}font-size:10px;color:{INK};vertical-align:middle;"> {t}</span></td>'
        legend = b.get("legend", [])
        c += '<table role="presentation" cellpadding="0" cellspacing="0">'
        for i in range(0, len(legend), 2):
            c += '<tr>' + "".join(lg(s, t) for s, t in legend[i:i + 2]) + '</tr>'
        c += '</table>'
        if b.get("footnote"):
            c += f'<p style="{M}font-size:10px;color:{LBL};margin:2px 0 24px;">{b["footnote"]}</p>'
        return c

    def ledger(self, b):
        INK, BG, RAISE, MUT, LBL, TER, M, D, B, BT = self.INK, self.BG, self.RAISE, self.MUT, self.LBL, self.TER, self.M, self.D, self.B, self.BT
        widths = b["chip_widths"]

        def prow(r, gray):
            bg = RAISE if gray else BG
            cells = "".join(f'<td width="{w}" valign="top" style="{M}font-size:9px;letter-spacing:0.02em;white-space:nowrap;color:{LBL if not gray else MUT};line-height:1.4;">{l}<br><span style="{B}font-size:12px;font-weight:600;letter-spacing:0;text-transform:none;color:{INK};">{v}</span></td>'
                            for (l, v), w in zip(r["chips"], widths))
            return (f'<tr><td style="background:{bg};padding:12px 12px;border-bottom:{BT};">'
                    f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
                    f'<td valign="bottom" style="{D}font-size:21px;line-height:1;color:{INK};">{r["title"]}</td>'
                    f'<td align="right" valign="bottom" style="{D}font-size:21px;line-height:1;color:{INK};white-space:nowrap;letter-spacing:-0.01em;">{r["total"]}</td></tr>'
                    f'<tr><td colspan="2" align="right" style="{B}font-size:12px;color:{INK};padding-top:3px;">{r["breakdown"]}</td></tr>'
                    f'<tr><td colspan="2" style="padding-top:8px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>{cells}</tr></table></td></tr>'
                    f'<tr><td colspan="2" style="{B}font-size:11px;line-height:1.5;color:{MUT};padding-top:6px;">{r["note"]}</td></tr>'
                    '</table></td></tr>')
        rows = b["rows"]
        g = b.get("group")
        t = f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:{BT};border-bottom:0;margin:8px 0 6px;background:{BG};">'
        t += f'<tr><td style="background:{INK};padding:12px 12px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="{D}font-size:19px;color:{BG};line-height:1;">{b["title"]}</td><td align="right" style="{M}font-size:9px;color:{TER};">{b.get("subtitle","")}</td></tr></table></td></tr>'
        if g:
            a, z = g["from"], g["to"]
            for r in rows[:a]: t += prow(r, False)
            t += f'<tr><td style="background:{INK};padding:7px 12px;{M}font-size:10px;color:{BG};">{g["label"]}</td></tr>'
            t += f'<tr><td style="padding:0;border-left:6px solid {INK};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
            for r in rows[a:z + 1]: t += prow(r, True)
            t += '</table></td></tr>'
            for r in rows[z + 1:]: t += prow(r, False)
        else:
            for r in rows: t += prow(r, False)
        t += '</table>'
        notes = b.get("notes", [])
        for i, n in enumerate(notes):
            mb = "0 0 22px" if i == len(notes) - 1 else "0 0 4px"
            sw = f'<span style="display:inline-block;width:10px;height:10px;background:{RAISE};border:1px solid {INK};vertical-align:middle;"></span> ' if n.get("swatch") else ""
            t += f'<p style="{B}font-size:11px;line-height:1.5;color:{MUT};margin:{mb};">{sw}{n["text"]}</p>'
        return t

    def callout(self, b):
        return (f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 0;"><tr><td style="background:{self.INK};padding:18px 16px;">'
                f'<p style="{self.M}font-size:14px;font-weight:600;color:{self.OR};margin:0 0 12px;">{b["label"]}</p>'
                f'<p style="{self.B}font-size:15px;line-height:1.6;color:{self.BG};margin:0;">{b["html"]}</p>'
                '</td></tr></table>')

    def tiles(self, b):
        NT = "text-transform:none;"
        items = b["items"]
        k = f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:{self.BT};margin:6px 0 0;"><tr>'
        w = f"{100 // len(items)}%"
        for i, it in enumerate(items):
            br = f"border-right:1px solid {self.c['tile_divider']};" if i < len(items) - 1 else ""
            unit = f'<span style="font-size:13px;{NT}"> {it["unit"]}</span>' if it.get("unit") else ""
            k += f'<td width="{w}" valign="top" style="background:{self.INK};padding:12px 10px;{br}"><p style="{self.M}font-size:10px;color:{self.TER};margin:0;">{it["label"]}</p><p style="{self.D}font-size:27px;line-height:1;color:{self.BG};margin:6px 0 0;">{it["value"]}{unit}</p><p style="{self.B}font-size:12px;color:{self.TER};margin:4px 0 0;">{it["sub"]}</p></td>'
        tot = b["total"]
        k += (f'</tr><tr><td colspan="{len(items)}" style="background:{self.BG};padding:14px 12px;border-top:{self.BT};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="{self.M}font-size:10px;color:{self.INK};">{tot["label"]}</td>'
              f'<td align="right" style="{self.D}font-size:22px;line-height:1;color:{self.OR};white-space:nowrap;">{tot["value"]}</td></tr></table></td></tr></table>')
        return k

    def cards(self, b):
        INK, BG, LBL, MUT, OR, LN, M, D, B, BT = self.INK, self.BG, self.LBL, self.MUT, self.OR, self.LN, self.M, self.D, self.B, self.BT
        out = []
        cols = b["columns"]
        n = len(b["cards"])
        for i, cd in enumerate(b["cards"]):
            nxt = f'↓ sigue {b["cards"][i+1]["title"]}' if i < n - 1 else "fin"
            marker = b.get("marker", "Año {i} de {n} · {nxt}").format(i=i + 1, n=n, nxt=nxt)
            q = f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:{BT};margin:16px 0 0;background:{BG};">'
            q += f'<tr><td style="background:{INK};padding:12px 12px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="{D}font-size:30px;line-height:0.9;color:{BG};">{cd["title"]}</td><td align="right" valign="bottom" style="{M}font-size:10px;color:{OR};">{marker}</td></tr></table></td></tr>'
            q += f'<tr><td style="padding:0 12px;border-bottom:{BT};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="{M}font-size:10px;color:{LBL};padding:8px 0;">{cols[0]}</td><td align="right" width="64" style="{M}font-size:10px;color:{LBL};padding:8px 0;">{cols[1]}</td><td align="right" width="96" style="{M}font-size:10px;color:{LBL};padding:8px 0;">{cols[2]}</td></tr></table></td></tr>'
            for m, hr, mo, ts in cd["rows"]:
                q += (f'<tr><td style="padding:10px 12px;border-bottom:1px solid {LN};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
                      f'<td style="{D}font-size:16px;line-height:1;color:{INK};">{m}</td><td align="right" width="64" style="{B}font-size:14px;color:{INK};">{hr}</td><td align="right" width="96" style="{B}font-size:14px;font-weight:600;color:{INK};white-space:nowrap;">{mo}</td></tr>'
                      f'<tr><td colspan="3" style="{B}font-size:11px;line-height:1.45;color:{MUT};padding-top:4px;">{ts}</td></tr></table></td></tr>')
            t0, t1, t2 = cd["total"]
            q += (f'<tr><td style="padding:12px 12px;background:{INK};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
                  f'<td style="{D}font-size:16px;line-height:1;color:{BG};">{t0}</td><td align="right" width="64" style="{B}font-size:14px;font-weight:600;color:{BG};">{t1}</td><td align="right" width="96" style="{B}font-size:14px;font-weight:700;color:{BG};white-space:nowrap;">{t2}</td></tr></table></td></tr></table>')
            out.append(q)
        return "\n".join(out)

    def note(self, b):
        return f'<p style="{self.B}font-size:11px;line-height:1.55;color:{self.MUT};margin:12px 0 22px;">{b["text"]}</p>'

    def closing(self, b):
        R, INK, BG, MUT, OR, M, B, BT = self.RAISE, self.INK, self.BG, self.MUT, self.OR, self.M, self.B, self.BT
        s = f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:{BT};margin:16px 0 8px;background:{R};">'
        s += f'<tr><td style="padding:16px 14px 6px;background:{R};"><p style="{B}font-size:15px;line-height:1.6;color:{INK};margin:0;">{b["text"]}</p></td></tr>'
        if b.get("link"):
            L = b["link"]
            s += f'<tr><td style="padding:14px 14px 4px;background:{R};"><a href="{L["url"]}" target="_blank" style="display:block;background:{INK};color:{BG};{M}font-size:12px;text-decoration:none;padding:15px 16px;text-align:center;">{L["label"]} &rarr;</a><p style="{M}font-size:9px;color:{MUT};margin:8px 0 6px;text-align:center;">{L.get("caption","")}</p></td></tr>'
        lines = b.get("lines", [])
        if lines:
            s += f'<tr><td style="padding:10px 0 0;background:{R};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:{INK};padding:16px 14px;">'
            for i, ln in enumerate(lines):
                mb = "0" if i == len(lines) - 1 else "0 0 8px"
                s += f'<p style="{B}font-size:16px;line-height:1.55;font-weight:700;color:{OR};text-transform:uppercase;letter-spacing:0.02em;margin:{mb};">{ln}</p>'
            s += '</td></tr></table></td></tr>'
        return s + '</table>'

    def render(self):
        O = []
        for b in self.content["blocks"]:
            t = b["type"]
            if t == "p":
                O.append(self.p(b["text"]))
            else:
                O.append(getattr(self, t)(b))
        INK, BG = self.INK, self.BG
        header = self.content.get("header_line", "")
        head = ""
        if header:
            head = (f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-bottom:1px solid {INK};"><tr>'
                    f'<td style="padding:6px 0 16px;{self.f["header_line"]}color:{INK};white-space:nowrap;">{header}</td></tr></table>\n')
        return f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{self.content["email_title"]}</title>
<link href="{self.brand["google_fonts"]}" rel="stylesheet"></head>
<body style="margin:0;padding:0;background:{BG};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:{BG};"><tr><td style="padding:16px;background:{BG};">
<div style="max-width:600px;">
{head}{chr(10).join(O)}
</div></td></tr></table></body></html>'''


# ----------------------------------------------------------------- page ----
def render_page(brand, content):
    c, f = brand["color"], brand["fuente"]
    pg = content["page"]
    items, forms = {}, {}
    for b in content["blocks"]:
        if b["type"] == "response":
            items[b["key"]] = {"section": b["section"], "label": b["label"]}
        elif b["type"] == "field_response":
            forms[b["key"]] = {"section": b["section"], "title": b["label"], "question": b.get("question", ""),
                               "fields": b["fields"], "done": b.get("done", "Ya me llegó tu respuesta.")}
    with open(os.path.join(HERE, "pagina.template.html"), encoding="utf-8") as fh:
        tpl = fh.read()
    rep = {
        "{{TITLE}}": H.escape(pg["title"]),
        "{{GOOGLE_FONTS}}": brand["google_fonts"],
        "{{BG}}": c["bg"], "{{RAISED}}": c["raised"], "{{INK}}": c["ink"],
        "{{MUTED}}": c["muted"], "{{LABEL}}": c["label"], "{{LINE}}": c["line"],
        "{{ACCENT}}": c["accent"], "{{EASE}}": brand["ease"], "{{RADIUS}}": brand.get("radius", "0"),
        "{{BODY_FONT}}": f["page_body"], "{{DISPLAY_CSS}}": f["page_display"], "{{LABEL_CSS}}": f["page_label"],
        "{{HEADER_LINE}}": H.escape(content.get("header_line", "")),
        "{{NONE_EYEBROW}}": pg["eyebrow"], "{{NONE_TITLE}}": pg["none_title"], "{{NONE_LEDE}}": pg["none_lede"],
        "{{FOOTER}}": pg["footer"],
        "{{CONFIG}}": json.dumps({
            "accessKey": pg["web3forms_key"], "to": pg["reply_to"], "fromName": pg["from_name"],
            "subjectPrefix": pg["subject_prefix"], "fallbackSubject": pg["fallback_subject"],
            "storeKey": content["slug"], "eyebrow": pg["eyebrow"],
            "okTitle": pg.get("ok_title", "Registrado"), "okLede": pg["ok_lede"],
            "errTitle": pg.get("err_title", "Sin conexión"), "errLede": pg["err_lede"],
            "items": items, "forms": forms}, ensure_ascii=False, indent=1),
    }
    for k, v in rep.items():
        tpl = tpl.replace(k, v)
    left = re.findall(r"\{\{[A-Z_]+\}\}", tpl)
    if left:
        sys.exit(f"Unfilled placeholders in page: {left}")
    return tpl


# --------------------------------------------------------------- checks ----
def check_palette(html_text, brand):
    allowed = {v.lower() for v in brand["color"].values() if isinstance(v, str) and v.startswith("#")}
    found = {h.lower() for h in re.findall(r"#[0-9a-fA-F]{6}\b", html_text)}
    return sorted(found - allowed)


def check_keys(content):
    keys = [b["key"] for b in content["blocks"] if b["type"] in ("response", "field_response")]
    dup = sorted({k for k in keys if keys.count(k) > 1})
    bad = [k for k in keys if not re.fullmatch(r"[a-z0-9-]+", k)]
    return dup, bad


def verify_width(paths):
    js = r"""
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const out={};
for(const p of process.argv.slice(1)){for(const w of [320,375]){const pg=await b.newPage({viewport:{width:w,height:700}});
await pg.route('https://api.web3forms.com/**',r=>r.fulfill({status:200,contentType:'application/json',body:'{"success":true}'}));
await pg.goto('file://'+p);out[p+' @'+w]=await pg.evaluate(()=>document.documentElement.scrollWidth);await pg.close();}}
console.log(JSON.stringify(out));await b.close();})();"""
    r = subprocess.run(["node", "-e", js] + paths, capture_output=True, text=True)
    if r.returncode != 0:
        return None, r.stderr.strip()[-300:]
    return json.loads(r.stdout.strip().splitlines()[-1]), None


# ----------------------------------------------------------------- main ----
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("contenido", nargs="?")
    ap.add_argument("--marca")
    ap.add_argument("--verificar", action="store_true", help="render at 320 and 375 px with Playwright")
    ap.add_argument("--nuevo-slug", metavar="BASE")
    ap.add_argument("--prueba", action="store_true", help="write the page into _envios/<slug>/ instead of the repo root (nothing gets published)")
    a = ap.parse_args()
    if a.nuevo_slug:
        print(f"{a.nuevo_slug}-{secrets.token_hex(3)}")
        return
    if not (a.contenido and a.marca):
        ap.error("contenido and --marca are required")
    brand, content = load(a.marca), load(a.contenido)
    if brand.get("estado") != "completo":
        sys.exit(f"Brand '{brand['nombre']}' is not ready: {brand.get('pendiente','estado != completo')}")
    dup, bad = check_keys(content)
    if dup or bad:
        sys.exit(f"Response keys invalid. Duplicated: {dup} Bad format: {bad}")

    email = Email(brand, content).render()
    page = render_page(brand, content)

    out_dir = os.path.join(ROOT, "_envios", content["slug"])
    os.makedirs(out_dir, exist_ok=True)
    email_path = os.path.join(out_dir, content["email_file"] + ".html")
    page_path = os.path.join(out_dir if a.prueba else ROOT, content["slug"] + ".html")
    with open(email_path, "w", encoding="utf-8") as fh:
        fh.write(email)
    with open(page_path, "w", encoding="utf-8") as fh:
        fh.write(page)
    print(f"email: {email_path}\npage:  {page_path}\nurl:   {SITE}{content['slug']}.html")

    off = check_palette(email, brand) + check_palette(page, brand)
    print("palette: OK" if not off else f"palette: OFF-BRAND {sorted(set(off))}")
    if a.verificar:
        res, err = verify_width([email_path, page_path])
        if err:
            print("width check skipped:", err)
        else:
            for k, v in res.items():
                w = int(k.rsplit("@", 1)[1])
                print(f"width {k}: {v} {'OK' if v <= w else 'HORIZONTAL SCROLL'}")


if __name__ == "__main__":
    main()
