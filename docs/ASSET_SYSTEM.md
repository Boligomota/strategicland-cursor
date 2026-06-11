# STRATEGICLAND — Sistema de Assets de Producción

> Sprint 03 · Asset System Builder.
> Este documento define la arquitectura completa de assets de producción
> para Storyscape, Showcase, M-04 (`/work/[slug]`) y las Work Pages.
> No crea imágenes: crea el sistema que las recibe.

Fuentes normativas auditadas:

- `.rules/image-treatment-system.mdc` (canon de tratamiento)
- `.rules/performance-system.mdc` (presupuestos de peso y LCP)
- `.rules/responsive-system.mdc` (breakpoints bloqueados)
- `public/images/<chapter>/README.md` × 5 (contratos por capítulo)
- `app/components/media/` (EditorialImage · HeroImage · AtmosphericPlaceholder)
- `content/work/types.ts` (CaseImageRef → modelo de slots de M-04)

---

## 0. Resultado de la auditoría

| Superficie | Estado real del repo |
|------------|---------------------|
| `public/images/` | 5 carpetas con README-contrato. **Cero AVIF reales.** |
| Storyscape (ACT A) | **No lleva imágenes** — ley arquitectónica (`StoryscapeChapter.tsx`: "NO imagery (Act A without image is architectural law)"). No requiere carpeta. |
| Showcase (ACT B) | Contrato existente (`public/images/showcase/README.md`): 3 plates. Componentes renderizan slots estructurales (`data-showcase-plate`) sin binding aún. |
| M-04 / Work Pages | `content/work/types.ts` resuelve slots a `public/images/work/<slug>/<descriptor>.avif`. **La carpeta `work/` no existe.** Los componentes (`CaseHero`, `HorizontalSequence`) todavía no pasan `src`. |
| Pipeline de delivery | `next.config.ts` vacío → Next 16.2.6 negocia solo `image/webp` por defecto. El mandato AVIF-primario (canon §2.1) no se cumplía en runtime. Corregido en este sprint (ver §8). |
| Masters | Canon §11 exige `assets/source/images/` gitignored. `.gitignore` no lo excluía. Corregido en este sprint. |
| Presupuestos | Dos generaciones en conflicto: canon §2.4 (Hero ≤ 600 KB) vs. contratos recientes + `performance-system.mdc` (≤ 220 KB above-fold, long-edge 1920, LQIP ≤ 4 KB). Reconciliados en §4. |

---

## 1. Arquitectura de carpetas

```
public/images/
├── methodology/            # HC-02 · contrato existente
│   ├── README.md
│   ├── statement-architecture.avif
│   └── tension-silhouette.avif
├── signal/                 # HC-03 · contrato existente
│   ├── README.md
│   ├── fragments-urban.avif
│   ├── constellation-glow.avif
│   └── compression-isolation.avif
├── capabilities/           # HC-04 · contrato existente
│   ├── README.md
│   ├── fragments-tactical.avif
│   ├── tension-presence.avif
│   └── outcome-system.avif
├── showcase/               # HC-05 ACT B · contrato existente
│   ├── README.md
│   ├── case-protagonist.avif
│   ├── case-compact-a.avif
│   └── case-compact-b.avif
├── closing/                # HC-05 ACT C · contrato existente
│   ├── README.md
│   └── afterimage-residue.avif
└── work/                   # M-04 · creado en este sprint
    ├── README.md           # contrato por-slug (este sprint)
    └── <slug>/             # un subfolder por caso registrado
        ├── hero-<descriptor>.avif
        ├── slide-NN-<descriptor>.avif   # 4–6, espeja CaseData.sequence
        └── reflection-<descriptor>.avif # opcional

assets/source/images/       # masters (gitignored, sync design-ops)
└── <chapter|work/slug>/    # espeja public/images/ 1:1
```

Reglas:

- **Storyscape NO tiene carpeta.** Crear `public/images/storyscape/` sería
  violar la ley del acto. Si un brief futuro lo pide, escala al
  Cinematic Architect.
- **Hero (HC-01) NO tiene carpeta.** Su atmósfera es procedural
  (LightField / AmbientDepth / WebGL), no fotográfica.
- Cada carpeta lleva un `README.md` contrato (dominio Atmosphere
  Rendering). El contrato es la única fuente de verdad del slot:
  componente consumidor, ratio, reveal, crop, sujeto, dimensiones, peso.
- `assets/source/` espeja la estructura de `public/images/` con masters
  sin comprimir (TIFF/PNG/RAW export). Nunca se commitea.

---

## 2. Arquitectura de assets

Cuatro clases de asset, derivadas de los primitivos reales del repo:

| Clase | Primitivo consumidor | Rol cinematográfico | Instancias |
|-------|---------------------|---------------------|-----------|
| **Backplate atmosférico** | `<HeroImage>` (full-bleed, reveal `blur`) | Atmósfera, no sujeto. Cap 2/página — agotado (HC-02 statement + HC-03 constellation). | 2 home + 1 por work page (CaseHero) |
| **Plate editorial** | `<EditorialImage>` (ratio bloqueado, reveal `mask`) | Fragmento documental dentro de la atmósfera del capítulo. | HC-02/03/04: 6 slots |
| **Subject plate** | `<EditorialImage>` a opacidad plena | ACT B: la primera imagen-sujeto de la página ("la fuerza hecha materia"). | Showcase: 3 slots |
| **Case set** | `CaseImageRef` → `<HeroImage>` / `<EditorialImage>` con edge-drift | Set completo por caso: hero + 4–6 slides + reflection opcional. | `/work/<slug>`: 6–8 por caso |

Contrato de upgrade (ya implementado en los primitivos): cada slot
renderiza `AtmosphericPlaceholder` mientras `src` es `undefined`.
Soltar el AVIF en la ruta del contrato y pasar `src` activa la imagen
real sin refactor. Las imágenes son artefactos, no assets (canon §1):
fotografía editorial/documental/original — **stock prohibido**.

---

## 3. Requisitos AVIF

| Parámetro | Requisito | Fuente |
|-----------|-----------|--------|
| Formato primario | AVIF | canon §2.1 |
| Perfil de color | sRGB embebido, conversión previa obligatoria | canon §2.2 |
| Profundidad | 8-bit/canal (10-bit solo hero excepcional, requiere escalamiento) | canon §2.2 |
| Encoding | `avifenc` o Squoosh; effort alto (`-s 4` o menor); quality ~55–65 equivalente | operativo |
| Chroma subsampling | 4:2:0 (las plates van graduadas con grain/vignette/grade — el detalle cromático fino no sobrevive el tratamiento) | operativo |
| Animación | Prohibida (carousels/auto-motion prohibidos, canon §7) | canon §7 |
| Fallback | **No se commitean `.webp` hermanos.** El optimizador de Next 16 (sharp) decodifica el AVIF fuente y negocia AVIF→WebP por `Accept` header con `formats: ['image/avif', 'image/webp']` (configurado en este sprint). Un solo archivo fuente por slot. | §8 |

Nota de reconciliación: los contratos de `closing/` y `showcase/` piden
"`+ .webp`". Con el pipeline de §8 ese requisito queda satisfecho por
negociación automática — no por archivos duplicados. Los contratos no se
reescriben (canon de Atmosphere Rendering); este documento registra la
interpretación operativa.

---

## 4. Especificaciones de imagen (inventario completo)

Política de presupuestos reconciliada:

- **Techo absoluto** = canon §2.4 (Hero ≤ 600 KB, Editorial ≤ 400 KB).
- **Objetivo de producción** = contratos recientes + `performance-system.mdc`:
  above-fold ≤ 220 KB AVIF, long-edge ≤ 1920 px en plates nuevas,
  peso total above-fold ≤ 600 KB, máx. 3 imágenes above-fold,
  máx. 6 imágenes por capítulo (casos exceptuados).
- Ante conflicto, gana el objetivo de producción (es el más estricto y
  el más reciente). Performance Audit gates sobre el objetivo.

### 4.1 Homepage (slots ya contratados — referencia consolidada)

| Asset | Capítulo | Primitivo | Ratio | Máx. px | Peso objetivo |
|-------|----------|-----------|-------|---------|---------------|
| `statement-architecture.avif` | HC-02 | HeroImage | full-bleed | 2400×1600 | ≤ 600 KB (techo) / ≤ 300 KB objetivo |
| `tension-silhouette.avif` | HC-02 | EditorialImage | 3:4 | 1800×2400 | ≤ 400 KB / ≤ 220 KB |
| `fragments-urban.avif` | HC-03 | EditorialImage | 2:1 | 2000×1000 | ≤ 400 KB / ≤ 220 KB |
| `constellation-glow.avif` | HC-03 | HeroImage | full-bleed | 2400×1600 | ≤ 600 KB / ≤ 300 KB |
| `compression-isolation.avif` | HC-03 | EditorialImage | 2.39:1 | 2400×1004 | ≤ 400 KB / ≤ 220 KB |
| `fragments-tactical.avif` | HC-04 | EditorialImage | 2:1 | 2000×1000 | ≤ 400 KB / ≤ 220 KB |
| `tension-presence.avif` | HC-04 | EditorialImage | 3:4 | 1800×2400 | ≤ 400 KB / ≤ 220 KB |
| `outcome-system.avif` | HC-04 | EditorialImage | 2.39:1 | 2400×1004 | ≤ 400 KB / ≤ 220 KB |
| `case-protagonist.avif` | ACT B | EditorialImage | 2.39:1 | 1920×803 | ≤ 220 KB |
| `case-compact-a.avif` | ACT B | EditorialImage | 2:1 | 1920×960 | ≤ 220 KB |
| `case-compact-b.avif` | ACT B | EditorialImage | 3:4 | 1440×1920 | ≤ 220 KB |
| `afterimage-residue.avif` | ACT C | EditorialImage | 2.39:1 | 1920×803 | ≤ 220 KB |

ACT A (Storyscape): **cero assets** — entrada deliberada del inventario.

### 4.2 Work Pages / M-04 (`/work/<slug>`)

Espeja `CaseData` (`content/work/types.ts`). Por caso:

| Slot | Scene | Primitivo | Ratio | Máx. px | Peso objetivo |
|------|-------|-----------|-------|---------|---------------|
| `hero-<descriptor>.avif` | Scene01 CaseHero | HeroImage (backplate, máscara radial, opacidad 0.2) | full-bleed (fuente 2:1+) | 1920×1080 | ≤ 220 KB (es el above-fold de la ruta) |
| `slide-NN-<descriptor>.avif` × 4–6 | Scene03 HorizontalSequence | EditorialImage (edge-drift) | 3:2 / 4:3 alternados (per `CaseImageRef`) | 2000×1500 (canon "case study slides") | ≤ 500 KB techo / ≤ 250 KB objetivo |
| `reflection-<descriptor>.avif` | Scene05 Reflection | EditorialImage | per `CaseImageRef` | 1920 long-edge | ≤ 220 KB |

Set vigente (`sample-case`): `hero-terrain` (2:1) · `slide-01-saturation`
(3:2) · `slide-02-tension` (4:3) · `slide-03-decision` (3:2) ·
`slide-04-system` (4:3) · `slide-05-residue` (3:2). Sin reflection.

Captions: obligatorios en plates editoriales (canon §8.3) vía
`caption={{ author, year, place }}` en el `CaseImageRef` / componente.
Los backplates `HeroImage` no llevan caption (atmósfera, no crédito).

---

## 5. Sistema de aspect ratios

Diccionario **bloqueado** — espeja `EditorialImage.tsx` (`ImageRatio`) y
`content/work/types.ts` (`CaseImageRatio`). Expandirlo requiere
autorización del Human Director (AGENTS §6.1).

| Ratio | Padding-top | Uso canónico | Dimensiones de producción |
|-------|-------------|--------------|---------------------------|
| `2.39:1` | 41.84% | Anamórfico — thresholds, residuos de cierre | 1920×803 · 2400×1004 |
| `2:1` | 50% | Cinemático landscape — fragments, compactos | 1920×960 · 2000×1000 |
| `3:2` | 66.67% | Editorial landscape — slides de caso | 1800×1200 · 2000×1333 |
| `4:3` | 75% | Slides de caso (contrapunto de 3:2) | 2000×1500 |
| `1:1` | 100% | Puntuación deliberada — uso raro | 1600×1600 |
| `3:4` | 133.33% | Retrato editorial — presencia humana | 1440×1920 · 1800×2400 |

Reglas de crop (canon §3): el crop es encuadre deliberado; nunca cortar
rostros bajo los ojos ni manos en la muñeca; respetar el espacio
negativo en la dirección de la mirada/movimiento; entregar el master ya
compuesto en el ratio nativo del slot (el `objectFit: cover` de los
primitivos solo absorbe desviaciones menores, no re-encuadra).

`HeroImage` no fuerza ratio — el consumidor restringe vía layout.
Fuente 16:9 o más ancha para backplates.

---

## 6. Sistema responsive

Breakpoints bloqueados (`responsive-system.mdc §2`): 480 / 768 / 1024 /
1280 / 1536 / 1920.

Atributos `sizes` vigentes en los primitivos:

- `EditorialImage`: `(min-width: 1280px) 800px, (min-width: 768px) 60vw, 100vw`
  → render máximo ~800 px CSS en desktop; con cap DPR ×2
  (`performance-system.mdc §5`: nunca servir > display×2) el variant
  más grande útil es **1600 px** — los masters de 1800–2400 px cubren
  todo el rango sin upscale.
- `HeroImage`: `100vw` → variant máximo 1920 px (deviceSizes capado,
  ver §8), alineado con el long-edge cap de los contratos recientes.

Comportamiento por breakpoint (grounded en componentes):

- Las plates corner-anchored de HC-04 y el afterimage de ACT C son
  **md+ only** — mobile no descarga esos assets (los componentes no los
  montan bajo 768 px). No se producen variantes "mobile" manuales: el
  srcset del optimizador resuelve densidad; la arquitectura resuelve
  presencia.
- `priority` solo en la única imagen above-fold por ruta (canon §11):
  en `/work/<slug>` es el backplate del CaseHero. La homepage hoy no
  tiene imagen above-fold (HC-01 es procedural) — ninguna plate de la
  home lleva `priority`.

---

## 7. Convenciones de naming

Canon §2.3 + patrón establecido por los 5 contratos existentes:

```
public/images/<chapter>/<scene>-<descriptor>.avif      # capítulos home
public/images/work/<slug>/<slot>-<descriptor>.avif     # casos M-04
```

- kebab-case, minúsculas, sin espacios, sin acentos, ASCII.
- `<scene>` = escena/momento del capítulo (`statement`, `fragments`,
  `tension`, `outcome`, `compression`, `constellation`, `case`,
  `afterimage`).
- `<slot>` en work: `hero` · `slide-NN` (NN = índice 01–06, espeja
  `CaseSlide.index`) · `reflection`.
- `<descriptor>` = contenido, no tratamiento: `silhouette`, `terrain`,
  `saturation` ✓ — `dark`, `final`, `v2`, `new` ✗.
- Sin sufijos de tamaño (`-2x`, `-mobile`): el optimizador genera los
  variants. Un archivo por slot.
- Renombrar un asset = romper el contrato del slot. Los descriptores se
  fijan en el README del capítulo / en `CaseImageRef.descriptor` antes
  de producir.

---

## 8. Estrategia de optimización

### 8.1 Pipeline de delivery (configurado en este sprint)

`next.config.ts`:

```ts
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  qualities: [60, 75],
}
```

Justificación grounded:

- El default de Next 16.2.6 es `formats: ['image/webp']` — sin esta
  config, todo AVIF fuente se transcodificaba a WebP y el mandato
  AVIF-primario del canon §2.1 era letra muerta. Con AVIF primero en el
  array, los browsers con soporte (98%+) reciben AVIF; el resto degrada
  a WebP automáticamente. JPG último recurso lo maneja Next cuando el
  `Accept` no matchea.
- `deviceSizes` capado en 1920: alineado con el long-edge cap de los
  contratos recientes y con la regla "nunca servir > display×2". Se
  eliminan los variants 2048/3840 del default (cache de optimización
  más chico, cero beneficio visual con masters ≤ 2400 px).
- `qualities: [60, 75]`: 75 es el default que usan los primitivos hoy;
  60 queda en el allowlist para backplates atmosféricos pesados (van a
  opacidad 0.1–0.2 bajo grain+vignette+grade — la calidad percibida no
  cae). Next 16 exige allowlist explícito de qualities.

### 8.2 Compresión en origen

1. Master sRGB en `assets/source/images/` (espejo de la ruta destino).
2. Export al ratio y dimensiones máximas del slot (§4) — nunca más
   grande "por si acaso".
3. Encode AVIF 4:2:0, quality iterada hasta entrar en el peso objetivo
   **sin** banding visible en las zonas oscuras (el warm-black del
   sistema vive en valores 8–22 RGB; el banding ahí es el modo de
   fallo número uno).
4. Verificar peso contra §4. Si no entra: bajar dimensiones antes que
   quality (las plates van graduadas; la resolución sobra antes que la
   limpieza tonal).

### 8.3 LQIP

Canon §10: `placeholder="blur"` con `blurDataURL` custom para imágenes
above-fold; color acorde a la atmósfera del capítulo — nunca gris.
Below-fold: lazy nativo sin placeholder (la atmósfera sostiene el slot —
eso es `AtmosphericPlaceholder`).

- Aplica a: backplate de CaseHero (`/work/<slug>`) y cualquier futura
  imagen above-fold. ≤ 4 KB por contrato de closing/showcase.
- Generación: export 16–24 px del master → AVIF/WebP → base64. Tinte
  dominante warm-black (`#161310` familia), nunca neutro.
- Gap registrado: `EditorialImage` / `HeroImage` no exponen
  `blurDataURL` aún — se añade en la fase 2 de migración (§9).

### 8.4 Presupuesto de página (gates de Performance Audit)

- Above-fold total ≤ 600 KB · máx. 3 imágenes above-fold.
- Máx. 6 imágenes por capítulo (casos exceptuados).
- LCP ≤ 2.0 s en 4G mobile · CLS = 0 (los ratios con padding-top de
  `EditorialImage` ya garantizan cero layout shift).
- Cache: assets estáticos con headers immutable (Next default en
  `/_next/image` + `public/`).

---

## 9. Estrategia de migración

Estado actual: 0 assets, 12 slots home contratados + 6 slots
sample-case. Migración en 4 fases, cada una mergeable sola.

### Fase 1 — Infraestructura (este sprint)

- [x] `next.config.ts` → formats AVIF/WebP, deviceSizes, qualities.
- [x] `.gitignore` → `/assets/source/`.
- [x] `public/images/work/README.md` → contrato por-slug.
- [x] Este documento.

### Fase 2 — Cableado de `src` (sprint de código, Motion/Atmosphere)

1. Resolver de assets de caso: helper puro
   `caseImageSrc(slug, descriptor)` → `/images/work/<slug>/<descriptor>.avif`,
   más un manifest opcional (build-time `fs.readdirSync` en
   `generateStaticParams`) para que el slot caiga a placeholder cuando
   el archivo no existe — preserva el contrato "reviewable con cero
   fotografía".
2. `CaseHero` / `HorizontalSequence` / `CaseReflection`: pasar `src`
   desde el resolver (hoy ignoran el asset aunque exista).
3. `EditorialImage` / `HeroImage`: prop opcional `blurDataURL` →
   `placeholder="blur"` cuando `priority`.
4. Showcase: binding de las 3 plates a `EditorialImage` en los slots
   `data-showcase-plate` (pase de contenido ya previsto por el
   contrato ACT B).

### Fase 3 — Producción de assets (design-ops, fuera del repo)

Orden por impacto narrativo y riesgo de performance:

1. ACT B (3 plates) — primera imagen-sujeto de la página; bloquea la
   lectura del acto.
2. `/work/sample-case` (6 assets) — valida el pipeline M-04 completo.
3. HC-02 / HC-03 (5 assets) — los dos HeroImage de la home son los
   más caros; entrar con los pesos objetivo, no los techos.
4. HC-04 (3) y ACT C (1) — plates md+ only, menor riesgo.

Cada drop: master a `assets/source/`, AVIF a `public/images/`, caption
metadata al componente/`CaseImageRef`, checklist §10.

### Fase 4 — Cierre

- Performance Audit: smoke de producción (LCP/CLS/peso por ruta).
- Human Director autoriza actualización de `docs/MASTER_STATE.md`
  (protocolo de cierre AGENTS §8.5 — ningún agente lo edita solo).

---

## 10. Checklist de producción (por asset)

Contenido:

- [ ] Fotografía editorial/documental/original — **no stock** (canon §1).
- [ ] Sujeto conforme al contrato del slot (README del capítulo /
      `CaseImageRef`), incluidas las listas de sujetos prohibidos
      (closing: sin personas/tecnología/marcas; showcase: sin mockups/
      UI/logos/escenas corporativas).
- [ ] Crop en el ratio nativo del slot; espacio negativo respetado;
      sin rostros/manos cortados ilegalmente (canon §3).

Técnica:

- [ ] AVIF, sRGB embebido, 8-bit, 4:2:0.
- [ ] Dimensiones ≤ máximo del slot (§4); long-edge ≤ 1920 px en
      plates de nueva generación.
- [ ] Peso ≤ objetivo del slot (§4); sin banding en sombras warm-black.
- [ ] Naming exacto del contrato (§7) — kebab-case, descriptor fijado.
- [ ] Master depositado en `assets/source/images/<ruta espejo>/`.

Integración:

- [ ] Archivo en la ruta exacta del contrato (`public/images/...`).
- [ ] `src` cableado en el componente / `CaseImageRef` (Fase 2).
- [ ] Caption `{ author, year, place }` en plates editoriales (canon §8.3).
- [ ] `priority` + `blurDataURL` **solo** si es la imagen above-fold de
      la ruta (máx. 1).
- [ ] Reveal del contrato respetado (mask/blur/drift — set bloqueado);
      blur sigue capado a 2/página.

Gates (Performance Audit — bloqueantes de merge):

- [ ] Peso above-fold de la ruta ≤ 600 KB; ≤ 3 imágenes above-fold.
- [ ] ≤ 6 imágenes en el capítulo afectado (casos exceptuados).
- [ ] CLS = 0 verificado (ratio container intacto).
- [ ] LCP ≤ 2.0 s (4G) en la ruta afectada.
- [ ] AVIF servido como AVIF (verificar `Content-Type` en
      `/_next/image` con `Accept: image/avif`).
