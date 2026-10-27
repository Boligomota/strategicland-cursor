# Correo con respuestas

Genera dos piezas a partir de un archivo de contenido y uno de marca:

1. **Correo HTML para Gmail** con botones de respuesta de un toque. Va a `_envios/<slug>/` (gitignored) y se mete en Gmail con el plugin.
2. **Página de respuestas** `<slug>.html` en la raíz del repo. Se publica en `wemakenoisenotdigital.com/<slug>.html` con `./publica.sh`. Cada botón registra su respuesta y la manda por Web3Forms al correo configurado.

`tools/` no se publica en Vercel (`.vercelignore`).

## Uso

```bash
cd strategicland-cursor
python3 tools/correo-con-respuestas/build.py --nuevo-slug cierre-2027          # nombre de página con código al azar
mkdir -p _envios/cierre-2027-xxxxxx
cp tools/correo-con-respuestas/contenido.ejemplo.json _envios/cierre-2027-xxxxxx/contenido.json
# editar contenido.json: slug, textos aprobados, bloques, liga de Drive
python3 tools/correo-con-respuestas/build.py _envios/cierre-2027-xxxxxx/contenido.json \
  --marca tools/correo-con-respuestas/marcas/love-academy.json --verificar --prueba   # revisar sin publicar
python3 tools/correo-con-respuestas/build.py _envios/cierre-2027-xxxxxx/contenido.json \
  --marca tools/correo-con-respuestas/marcas/love-academy.json --verificar           # genera la página en la raíz
./publica.sh "Página de respuestas cierre 2027"
```

`--verificar` abre el correo y la página a 320 y 375 px y avisa si hay desplazamiento horizontal. El script siempre revisa que no haya colores fuera de la marca y que las claves de respuesta no se repitan.

## Marcas

| Archivo | Estado |
|---|---|
| `marcas/love-academy.json` | Completo. Oswald + Inter, rojo #cf2033, grises derivados para contraste |
| `marcas/wmnnd.json` | Completo. Registro claro de correo: Archivo, Space Grotesk, IBM Plex Mono, naranja #ff5e00 |
| `marcas/ikal-restaura.json` | Incompleto. Falta decidir qué color sólido va de fondo, de filas sombreadas y de acento. El script se niega a usarlo |

Marcas sin sistema (KRATOS, EMC, Legado Eterno): no se inventan colores ni tipografías. Se agregan cuando estén definidas.

## Bloques del contenido

`p` · `instructions` · `section` · `sub` · `response` · `field_response` · `calendar` · `ledger` · `callout` · `tiles` · `cards` · `note` · `closing`. El ejemplo usa todos.

- `response`: botón de un toque. `key` en minúsculas, única.
- `field_response`: botón que abre un formulario corto (campos `text` o `textarea`).
- `calendar`: estados de celda `fuerte`, `apagado`, `marca`, `tenue`, `normal`.
- `ledger`: filas con total, desglose, chips y nota; `group` sombrea un rango de filas.

## Reglas

- **Datos privados nunca al repo.** El repo es público. El contenido real vive en `_envios/` (gitignored). La página publicada no lleva cifras de dinero ni datos personales: solo etiquetas de respuesta.
- Los archivos con datos sensibles van por Drive y se enlazan con `closing.link`.
- La apertura del correo se rastrea con Mailtrack, no con un píxel propio.
- Gmail no carga fuentes web: los títulos caen a las fuentes de respaldo de cada marca.
