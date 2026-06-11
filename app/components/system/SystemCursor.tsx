/**
 * SystemCursor — RETIRED VISUAL (visual migration to the HTML
 * reference system). The HTML reference uses the native cursor;
 * the dual custom cursor was legacy cinematic language.
 *
 * GlobalCursorProvider stays intact (business logic / provider
 * tree untouched); this leaf simply renders nothing, so the
 * native cursor remains everywhere.
 */
export function SystemCursor() {
  return null;
}
