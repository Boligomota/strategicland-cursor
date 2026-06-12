"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type RefObject,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/app/providers/ReducedMotionProvider";
import { PAGE_OWNERSHIP } from "@/content/knowledge/graph";
import { getKnowledgePage } from "@/content/knowledge/registry";

/**
 * SystemInstitutionalIndex — editorial discoverability for the knowledge
 * ecosystem and evidence plane. Entry via SystemMetaNav wordmark only.
 *
 * Data authority: content/knowledge/registry.ts + PAGE_OWNERSHIP (graph.ts).
 * No duplicated route definitions.
 *
 * Links use Next.js Link (not EditorialLink): panel close + showcase
 * scroll require onClick; register is institutional-index-link.
 */

const EVIDENCE_WORK_LABEL = "Work";
const EVIDENCE_WORK_ROUTE = "/" as const;
const SHOWCASE_SELECTOR = '[data-chapter-name="showcase"]';

const ROLE_LABEL: Record<
  (typeof PAGE_OWNERSHIP)[number]["role"],
  string
> = {
  hub: "Hub",
  operativo: "Operativo",
  metodologico: "Metodológico",
  sectorial: "Sectorial",
};

const researchEntries = PAGE_OWNERSHIP.map((entry) => {
  const page = getKnowledgePage(entry.slug);
  if (!page) return null;
  return {
    slug: entry.slug,
    title: page.title,
    route: page.route,
    role: entry.role,
  };
}).filter((entry): entry is NonNullable<typeof entry> => entry !== null);

type SystemInstitutionalIndexProps = {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export function SystemInstitutionalIndex({
  open,
  onClose,
  triggerRef,
}: SystemInstitutionalIndexProps) {
  const panelId = useId();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const handleClose = useCallback(() => {
    onClose();
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, [onClose, triggerRef]);

  const scrollToShowcase = useCallback(() => {
    const target = document.querySelector(SHOWCASE_SELECTOR);
    if (!target) return;
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, [reduced]);

  const handleWorkNavigate = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname !== EVIDENCE_WORK_ROUTE) return;
      event.preventDefault();
      handleClose();
      requestAnimationFrame(scrollToShowcase);
    },
    [pathname, handleClose, scrollToShowcase]
  );

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      handleClose();
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, handleClose, triggerRef]);

  if (!open) return null;

  return (
    <>
      <div
        className="institutional-index-backdrop"
        aria-hidden
        onClick={handleClose}
      />

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="institutional-index-panel"
        data-institutional-index
      >
        <div className="institutional-index-header">
          <p id={titleId} className="institutional-index-kicker text-mono">
            Institutional Index
          </p>
          <button
            type="button"
            className="institutional-index-close text-mono"
            onClick={handleClose}
            aria-label="Close institutional index"
          >
            Close
          </button>
        </div>

        <section
          className="institutional-index-section"
          aria-labelledby={`${panelId}-research`}
        >
          <h2
            id={`${panelId}-research`}
            className="institutional-index-section-label text-mono"
          >
            Research Archive
          </h2>
          <ul className="institutional-index-list" role="list">
            {researchEntries.map((entry) => (
              <li key={entry.slug} className="institutional-index-item">
                <Link
                  href={entry.route}
                  data-hover-target
                  className="institutional-index-link"
                  onClick={handleClose}
                >
                  {entry.title}
                </Link>
                <span className="institutional-index-meta text-mono">
                  {ROLE_LABEL[entry.role]}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="institutional-index-section"
          aria-labelledby={`${panelId}-evidence`}
        >
          <h2
            id={`${panelId}-evidence`}
            className="institutional-index-section-label text-mono"
          >
            Evidence
          </h2>
          <ul className="institutional-index-list" role="list">
            <li className="institutional-index-item">
              <Link
                href={EVIDENCE_WORK_ROUTE}
                data-hover-target
                data-editorial-link
                className="institutional-index-link"
                onClick={handleWorkNavigate}
              >
                {EVIDENCE_WORK_LABEL}
              </Link>
              <span className="institutional-index-meta text-mono">
                Showcase
              </span>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
