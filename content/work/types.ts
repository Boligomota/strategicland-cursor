/**
 * Case system content model — per the approved M-04 implementation
 * blueprint §8 and CHAPTER_SYSTEM.md §3.3 (canon HC-06).
 *
 * A case is a typed TS module (content/work/<slug>/case.ts) registered
 * in content/work/registry.ts. Components in
 * app/components/cinematic/case/ (Sprint 02) are pure templates — ALL
 * copy lives here, never in components. This is the contract that lets
 * the case archive grow without code changes.
 *
 * Deviations from the canonical destination (registered in the
 * blueprint, pending Human Director sign-off at session close):
 *  - content.mdx → typed data module (no MDX infra in repo).
 *  - atmosphere.config.ts → inline `atmosphere` field.
 *  - audio.config.ts → deferred per MASTER_STATE §3 (slot reserved).
 */

/**
 * The 9 Strategic Activators (Storyscape vocabulary, HC-05 Act A).
 * Cases declare 2–3 — the connective tissue between forces (home)
 * and evidence (/work). Locked taxonomy; expanding it requires
 * Human Director authorization.
 */
export type CaseActivator =
  | "entertainment"
  | "hyper-mediatization"
  | "immersion"
  | "identity"
  | "crowd-culture"
  | "aspirational-systems"
  | "sustainability"
  | "innovation"
  | "hyper-personalization";

/**
 * Honesty register — rendered in the CaseHero micro-taxonomy per the
 * approved HC-05 architecture §8. Speculative work is never disguised
 * as client work.
 */
export type CaseNature = "real" | "hybrid" | "conceptual" | "speculative";

/** Locked aspect-ratio dictionary — mirrors EditorialImage. */
export type CaseImageRatio = "2.39:1" | "2:1" | "3:2" | "4:3" | "1:1" | "3:4";

/** Locked reveal set — mirrors EditorialImage (canon §4). */
export type CaseImageReveal = "mask" | "blur" | "drift" | "none";

export type CaseImageDirection = "left-to-right" | "right-to-left";

/** Mirrors AtmosphericPlaceholderVariant (app/components/media). */
export type CasePlaceholderVariant = "architectural" | "documentary" | "peak";

export type CaseImageCaption = {
  author: string;
  year?: string;
  place?: string;
};

/**
 * Image slot by reference: resolves to
 * public/images/work/<slug>/<descriptor>.avif. When the asset is
 * absent the consuming component falls back to AtmosphericPlaceholder
 * automatically — the route is reviewable with zero photography.
 */
export type CaseImageRef = {
  descriptor: string;
  ratio: CaseImageRatio;
  reveal?: CaseImageReveal;
  direction?: CaseImageDirection;
  placeholderVariant?: CasePlaceholderVariant;
  caption?: CaseImageCaption;
};

/** One panel of Scene03_HorizontalSequence (4–6 per case, canon §3.3). */
export type CaseSlide = {
  index: string;
  eyebrow: string;
  title: string;
  /** ≤ 280 chars — T05 per-panel verbal budget. */
  body: string;
  image: CaseImageRef;
};

export type CaseCreator = {
  name: string;
  role: string;
  note?: string;
};

/** Per-case atmosphere override (canon §3.3: charcoal is the Absolut precedent). */
export type CaseAtmosphere = {
  background?: "warmBlack" | "charcoal";
};

export type CaseSeo = {
  title: string;
  description: string;
  ogImage?: string;
};

/**
 * Homepage-plane M-04 threshold (HC-05 ACT B, architecture §8).
 *
 * Exactly the four data points the homepage is allowed to present:
 * mobilized forces come from `activators`; the other three live here
 * as DEDICATED compressed copy — never verbatim reuse of the inner
 * case copy (the homepage previews, /work contains depth; the two
 * planes never duplicate).
 *
 *  - tension   line 1 of the strategic line — the market tension faced.
 *  - decision  line 2 of the strategic line — the strategic decision
 *              that resolved it.
 *  - footprint what remained installed, 1 line — position, never KPI.
 *  - image     homepage plate. Ratio follows the ACT B slot law:
 *              registry[0] (protagonist) 2.39:1 · registry[1] 2:1 ·
 *              registry[2] 3:4 (locked set; reveal "mask" only).
 */
export type CaseThreshold = {
  tension: string;
  decision: string;
  footprint: string;
  image: CaseImageRef;
};

export type CaseData = {
  slug: string;
  title: string;
  year?: string;
  nature: CaseNature;
  /** 2–3 entries — validated by the registry in dev. */
  activators: CaseActivator[];

  /** Scene01_CaseHero (T04). */
  hero: {
    titleLines: string[];
    lede: string;
    image: CaseImageRef;
  };

  /** Scene02_StrategicIntro (T03). */
  intro: {
    statement: string;
    columns: {
      problem: string;
      strategy: string;
      result: string;
    };
  };

  /** Scene03_HorizontalSequence (T05, pinned). 4–6 slides. */
  sequence: CaseSlide[];

  /** Scene04_CreatorsBlock (T04). Speculative cases credit the studio. */
  creators?: CaseCreator[];

  /** Scene05_CaseReflection (T02 — mandatory closing tier per canon). */
  reflection: {
    statement: string;
    caption?: string;
    image?: CaseImageRef;
  };

  /** Homepage evidence preview (HC-05 ACT B threshold). */
  threshold: CaseThreshold;

  atmosphere?: CaseAtmosphere;
  seo: CaseSeo;
  // audio?: deferred per MASTER_STATE §3 — slot reserved, do not implement.
};
