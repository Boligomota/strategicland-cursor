/**
 * Research Archive schema — Strategic Brain 2026.
 * Authority: Knowledge Structural Review · Arquitectura_Web Fase 06 §10.
 * Data layer only — no UI.
 */

/** Only surface with explicit archive vocation per architecture document. */
export type ArchiveScope = "strategic-brain";

export type PageArchiveMeta = {
  scope: ArchiveScope;
  /** Temporal stamp from document ("2026", "inteligencia prospectiva de 2026"). */
  editionYear: number;
  editionLabel: string;
  consultable: true;
  accumulable: true;
};

export type SignalArchiveStatus = "published" | "reserved";

/** Home/06 audit source channels — future cross-ref only. */
export type EngineSourceChannel =
  | "entornos-sociales"
  | "cultura-popular"
  | "alta-teoria"
  | "redes-sociales"
  | "nuevas-tecnologias";

export type SignalArchiveMeta = {
  signalId: string;
  documentedAt: string;
  archiveYear: number;
  status: SignalArchiveStatus;
  sourceChannel?: EngineSourceChannel;
};
