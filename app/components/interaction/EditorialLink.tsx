"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type EditorialLinkProps = {
  href: string;
  children: ReactNode;
  /**
   * Inherits surrounding typography by default.
   * Pass existing register classes (e.g. methodology-threshold-link)
   * when embedding in threshold / framework copy.
   */
  className?: string;
} & Pick<ComponentPropsWithoutRef<typeof Link>, "aria-label" | "prefetch">;

/**
 * EditorialLink — canonical internal knowledge navigation (Fase 0).
 *
 * Editorial behavior only: no button chrome, no CTA styling.
 * Uses site-wide hover target contract (data-hover-target) and
 * threshold-link underline grammar when className is omitted.
 *
 * Scope: in-copy knowledge navigation only. Panel consumers with
 * lifecycle handlers (e.g. SystemInstitutionalIndex) use Link directly.
 */
export function EditorialLink({
  href,
  children,
  className,
  ...linkProps
}: EditorialLinkProps) {
  return (
    <Link
      href={href}
      data-hover-target
      data-editorial-link
      className={className ?? "editorial-link"}
      {...linkProps}
    >
      {children}
    </Link>
  );
}
