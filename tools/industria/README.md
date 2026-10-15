# Campaña industria B2B — herramientas

Pieza base pública: `industria-b2b.html` (raíz del repo). Esta carpeta no se publica (`.vercelignore`).
Los datos de cada lote y los HTML por empresa nunca entran al repo (`.gitignore`).

## Flujo por lote

1. Crear `tools/industria/lotes/lote-NN.csv` con columnas:
   `slug, empresa, para, asunto, sitio, observacion`
   - `para`: correos separados por `;`
   - `observacion`: texto plano; línea en blanco = párrafo nuevo
2. Revisión técnica (primera pasada, solo HTML crudo):
   `python3 tools/industria/check_site.py --csv tools/industria/lotes/lote-NN.csv`
   Todo hallazgo se confirma en un navegador real antes de usarse.
3. Redactar y aprobar las observaciones en el CSV.
4. Generar los HTML por empresa:
   `python3 tools/industria/build_variants.py tools/industria/lotes/lote-NN.csv`
   Salida: `_envios/lote-NN/<slug>.html` + `manifest.csv` (archivo, empresa, para, asunto).
5. Pegar cada HTML con el plugin de Gmail; un envío por empresa.

## Reglas de contactos

Descartar buzones que no deciden sobre marca o que son canales regulados:
farmacovigilancia, contraloría, facturación, RH, legal.
