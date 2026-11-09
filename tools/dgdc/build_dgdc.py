#!/usr/bin/env python3
"""DGDC (UNAM) email builder — lote 4.

Base: industria-servicios.html. Per row: new PRE/HERO/INTRO, a Propuesta block,
optional image sections (video, minisitios, experiencias), optional short version
(no Sistemas de Marca box, no Love Academy case), institution wording swaps,
unsubscribe to pulse@ and a "Ver en navegador" link to the row's own published copy.

Usage: python3 tools/dgdc/build_dgdc.py tools/industria/lotes/lote-04-dgdc.csv
Writes dgdc-<slug>.html at the repo root (published) and _envios/lote-04-dgdc/ with manifest.csv.
"""

import csv, html, re, sys
from pathlib import Path
REPO = Path('/home/claude/strategicland-cursor')
sys.path.insert(0, str(REPO / 'tools/industria'))
from build_variants import render_segment, replace_block, inline
IMG = 'https://wemakenoisenotdigital.com/assets/email/dgdc/'
ANCHOR = '<!-- INTRO:END -->\n            </td>\n          </tr>\n\n'
SWAPS = [
    ('Trabajamos el sistema completo de una empresa: qué sabe de su mercado', 'Trabajamos el sistema completo de una institución: qué sabe de su público'),
    ('Construimos lo que trae y convierte clientes en línea', 'Construimos lo que trae y convierte visitantes en línea'),
    ('Recibe este correo porque la dirección de contacto comercial de su empresa es pública.', 'Recibe este correo porque su dirección de contacto institucional es pública.'),
    ('se vive y con qué vende.', 'se vive y con qué lo atrae.'),
    ('entendemos el mercado: qué busca su cliente, qué lo hace cambiar de proveedor y en qué posición le conviene competir.', 'entendemos al público: qué busca, qué lo hace elegir una opción sobre otra y qué lugar le conviene ocupar a la institución.'),
    ('Insights y journey del consumidor', 'Insights y journey del público'),
    ('catálogo, fichas técnicas, presentaciones y señalética.', 'publicaciones, presentaciones, gráfica de exposición y señalética.'),
    ('Definimos qué dice la empresa y cómo lo dice, para que su discurso la distinga de la competencia. De ahí salen la presentación comercial, el informe anual, los casos de éxito y el contenido que un cliente, un buscador o una IA pueden leer y citar.', 'Definimos qué dice la institución y cómo lo dice, para que su voz sea reconocible en cualquier canal. De ahí salen la presentación institucional, el informe anual, las campañas y el contenido que un visitante, un buscador o una IA pueden leer y citar.'),
    ('eventos, stands, museografía interactiva', 'eventos, exposiciones, museografía interactiva'),
    ('para saber qué trae ventas y qué no.', 'para saber qué trae visitantes y qué no.'),
]
LABEL = 'margin:0 0 16px; font-size:10px; color:{c}; text-transform:uppercase; letter-spacing:2px;'
H2 = 'margin:0 0 20px; font-size:26px; line-height:1.12; font-weight:700; color:#bebbb6; text-transform:uppercase;'
BODY = 'margin:0 0 {m}; font-size:17px; line-height:1.62; color:{c};'
CAP = 'margin:10px 0 0; font-size:13px; line-height:1.5; color:#938f8a;'

def p(text, last=False, color='#bebbb6'):
    return f'<p class="f-body" style="{BODY.format(m="0" if last else "16px", c=color)}">{inline(text)}</p>'

def proposal(row):
    items = [x for x in row['propuesta'].strip().split('\n\n') if x.strip()]
    body = '\n'.join('                  ' + p(t, i == len(items) - 1) for i, t in enumerate(items))
    return f'''          <!-- ░░ PROPUESTA ░░ -->
          <tr>
            <td class="px" style="padding:0 40px 44px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:2px solid #ff5e00;">
                <tr><td style="padding:4px 0 4px 24px;">
                  <p class="f-mono" style="margin:0 0 14px; font-size:10px; color:#ff5e00; text-transform:uppercase; letter-spacing:2px;">Propuesta</p>
{body}
                </td></tr>
              </table>
            </td>
          </tr>

'''

def img(file, alt, cap, full=True):
    w = 520 if full else 254
    return (f'<img src="{IMG}{file}" alt="{html.escape(alt)}" width="{w}" style="width:100%; max-width:{w}px; height:auto; display:block; border-radius:4px;">'
            f'\n<p class="f-body" style="{CAP}">{inline(cap)}</p>')

def pair(a, b):
    return f'''<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;"><tr>
<td width="50%" valign="top" style="padding-right:6px;">{img(*a, full=False)}</td>
<td width="50%" valign="top" style="padding-left:6px;">{img(*b, full=False)}</td>
</tr></table>'''

def section(label, h2, intro, full, two):
    return f'''          <tr>
            <td class="px" style="padding:0 40px 44px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #393632;">
                <tr><td style="padding-top:36px;">
                  <p class="f-mono" style="{LABEL.format(c='#938f8a')}">{label}</p>
                  <h2 class="f-display h2" style="{H2}">{h2}</h2>
                  {p(intro, color='#938f8a')}
                  {img(*full)}
                  {''.join('<div style="height:24px; line-height:24px; font-size:0;">&nbsp;</div>' + img(*x) for x in two)}
                </td></tr>
              </table>
            </td>
          </tr>

'''

MINISITIOS = section('[Así se ven] Minisitios', 'Un sitio<br>por evento.',
    'Para Love Academy hacemos un minisitio por cada concierto: el evento, la sala, los precios y la compra en una sola página.',
    ('la-andrew-bird.jpg', 'Minisitio de Andrew Bird & The Love Academy Orchestra',
     '**Andrew Bird & The Love Academy Orchestra** · Teatro de la Ciudad Esperanza Iris. Funciones, precios y compra por zona.'),
    (('la-andrew-bird-sala.jpg', 'Mapa de la sala con disponibilidad', 'Mapa de la sala con lugares disponibles por zona.'),
     ('la-rodrigo-y-gabriela.jpg', 'Minisitio de Rodrigo y Gabriela', '**Rodrigo y Gabriela** · Polyforum Siqueiros. Cupo restante por noche.')))

EXPERIENCIAS = section('[Experiencias en sitio]', 'La visita<br>también se diseña.',
    'Proyectos de nuestro equipo en museos, eventos culturales y activaciones.',
    ('museo-cimmyt.jpg', 'Sala del Museo CIMMYT con pantallas interactivas',
     '**Museo CIMMYT** · Aplicaciones touch para recorrer la historia del maíz y el trigo, con una mesa de 80" que controla el contenido de las demás pantallas.'),
    (('celebrando-la-eternidad-registro.jpg', 'Registro de Celebrando la Eternidad', '**Celebrando la Eternidad** · Bosque de Chapultepec. Registro en línea y acceso con código QR.'),
     ('photo-wall.jpg', 'Photo wall en pantalla de leds', '**Photo wall** · Las fotos del evento aparecen en la pantalla grande en cuanto se toman.')))

FW = re.compile(r'          <tr>\n            <td class="px" style="padding:0 40px 44px;">\n              <!-- ENVOLVENTE — THE FRAMEWORK -->.*?</tr>\n\n', re.S)

def build_v2(row, base):
    seg = {'eyebrow': row['eyebrow'], 'h1': row['h1'].replace('\\n', '\n'), 'preheader': row['preheader'],
           'intro': row['intro'], 'tesis_h2': 'x', 'tesis': [{'text': 'x'}]}
    r = render_segment(seg)
    page = base
    for k in ('PRE', 'HERO', 'INTRO'):
        page = replace_block(page, k, r[k])
    page, n = FW.subn('', page); assert n == 1
    assert page.count(ANCHOR) == 1
    page = page.replace(ANCHOR, ANCHOR + proposal(row) + MINISITIOS + EXPERIENCIAS)
    for a, b in SWAPS:
        assert page.count(a) == 1, a
        page = page.replace(a, b)
    return page


VIDEO = f'''          <tr>
            <td class="px" style="padding:0 40px 44px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #393632;">
                <tr><td style="padding-top:36px;">
                  <p class="f-mono" style="{LABEL.format(c='#938f8a')}">[Así se ve] Contenido</p>
                  <h2 class="f-display h2" style="{H2}">Murales,<br>contados en video.</h2>
                  {p('Street Artketing: murales de artistas para marcas, documentados en video para redes.', color='#938f8a')}
                  <a href="https://vimeo.com/189204332" target="_blank" style="text-decoration:none;"><img src="{IMG}video-nescafe-dolce-gusto.jpg" alt="Video de Street Artketing en Vimeo" width="520" style="width:100%; max-width:520px; height:auto; display:block; border-radius:4px;"></a>
                  <p class="f-body" style="{CAP}">{inline('**Street Artketing** · Murales para Nescafé Dolce Gusto · 1:27. Clic en la imagen para verlo en Vimeo.')}</p>
                </td></tr>
              </table>
            </td>
          </tr>

'''
SECTIONS = {'video': VIDEO, 'minisitios': MINISITIOS, 'experiencias': EXPERIENCIAS}
SISTEMAS = re.compile(r'          <tr>\n            <td class="px" style="padding:0 40px 44px;">\n                  <!-- ENVOLVENTE 2 — SISTEMAS DE MARCA 2026 -->.*?</tr>\n\n', re.S)
CASO = re.compile(r'          <!-- ░░ CASO — LOVE ACADEMY ░░ -->.*?(?=          <!-- ░░ LO QUE HACEMOS)', re.S)

def build(row, base):
    seg = {'eyebrow': row['eyebrow'], 'h1': row['h1'].replace('\\n', '\n'), 'preheader': row['preheader'],
           'intro': row['intro'], 'tesis_h2': 'x', 'tesis': [{'text': 'x'}]}
    r = render_segment(seg); page = base
    for k in ('PRE', 'HERO', 'INTRO'):
        page = replace_block(page, k, r[k])
    page, n = FW.subn('', page); assert n == 1
    if row.get('corto') == 'si':
        page, n = SISTEMAS.subn('', page); assert n == 1
        page, n = CASO.subn('', page); assert n == 1
    secs = ''.join(SECTIONS[s] for s in row['secciones'].split() if s)
    assert page.count(ANCHOR) == 1
    page = page.replace(ANCHOR, ANCHOR + proposal(row) + secs)
    for a, b in SWAPS:
        assert page.count(a) == 1, a
        page = page.replace(a, b)
    return page


UNSUB = ('mailto:juanluis.contreras@gmail.com?subject=Baja%20de%20lista', 'mailto:pulse@wemakenoisenotdigital.com?subject=Baja%20de%20lista')
VIEW = 'https://wemakenoisenotdigital.com/industria-b2b.html'

def build_final(row, base):
    page = build(row, base)
    assert page.count(UNSUB[0]) == 1 and page.count(VIEW) == 1
    page = page.replace(UNSUB[0], UNSUB[1])
    page = page.replace(VIEW, f"https://wemakenoisenotdigital.com/dgdc-{row['slug']}.html")
    return page

if __name__ == '__main__':
    src = Path(sys.argv[1]); out = REPO / '_envios' / 'lote-04-dgdc'; out.mkdir(parents=True, exist_ok=True)
    base = (REPO / 'industria-servicios.html').read_text()
    rows = list(csv.DictReader(src.open(encoding='utf-8-sig')))
    with (out / 'manifest.csv').open('w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f); w.writerow(['institucion', 'archivo', 'cuenta_envio', 'para', 'asunto', 'ver_en_navegador'])
        for row in rows:
            fn = f"dgdc-{row['slug']}.html"; html_ = build_final(row, base)
            (REPO / fn).write_text(html_); (out / fn).write_text(html_)
            w.writerow([row['institucion'], fn, 'pulse@wemakenoisenotdigital.com', row['para'], row['asunto'], f'https://wemakenoisenotdigital.com/{fn}'])
            print('ok', fn)
