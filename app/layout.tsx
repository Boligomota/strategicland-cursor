import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { ReducedMotionProvider } from "./providers/ReducedMotionProvider";
import { IrregularityProvider } from "./providers/IrregularityProvider";
import { LenisProvider } from "./providers/LenisProvider";
import { MotionProvider } from "./providers/MotionProvider";
import { TransitionDirectorProvider } from "./providers/TransitionDirectorProvider";
import { NarrativeTimelineProvider } from "./providers/NarrativeTimelineProvider";
import { GlobalCursorProvider } from "./providers/GlobalCursorProvider";
import {
  SystemFrame,
  SystemMetaNav,
  SystemCursor,
  SystemLoader,
  SystemGrain,
  TransitionLayer,
  WebGLRoot,
} from "./components/system";

/**
 * Type stack per the approved HTML reference: Cormorant Garamond
 * (serif display) + Inter (sans body) + Space Mono (metadata).
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Metadata wording per Mapa de Sitio Estratégico §01 HERO (titular +
// sub-título). Prior non-canonical title/description removed in the
// sitemap compliance pass.
export const metadata: Metadata = {
  title: "WE MAKE NOISE / NOT DIGITAL",
  description: "Consultoría Interdisciplinaria de Negocios y Marketing.",
};

/**
 * Provider tree per docs/SYSTEM_ARCHITECTURE.md §3:
 *
 *   ReducedMotion
 *    └─ Irregularity
 *        └─ Lenis
 *            └─ Motion
 *                └─ TransitionDirector       (T0–T5 chapter lifecycle)
 *                    └─ NarrativeTimeline    (scene-level density/emotion)
 *                        └─ GlobalCursor      (site-wide cursor lifecycle)
 *                            ├─ <WebGLRoot />     (single R3F Canvas, demand)
 *                            ├─ <SystemFrame />   (2vw inset border)
 *                            ├─ <SystemMetaNav /> (top corners + clock)
 *                            ├─ <SystemCursor />  (dual cursor leaf)
 *                            ├─ {children}        (chapters / pages)
 *                            ├─ <TransitionLayer/>(veil for T3 transitions)
 *                            ├─ <SystemLoader />  (000→100 site intake)
 *                            └─ <SystemGrain />   (cinematic grain — top)
 *
 * NarrativeTimeline depends on TransitionDirector (reads active chapter
 * from state) and pushes scene density/emotion back via the director's
 * setActiveDensity override channel. Everything downstream still reads
 * a single oracle: useTransitionDirector().currentDensity / currentEmotion.
 *
 * Audio/SoundProvider lands when HC-03 ships per
 * .rules/sound-behavior-system.mdc.
 *
 * Stack order rationale:
 *  - TransitionLayer z9998 sits below SystemLoader z9999. The loader can
 *    cover even the veil during initial intake.
 *  - SystemGrain z101 sits above content but blends via mix-blend-overlay
 *    so it is non-blocking.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ReducedMotionProvider>
          <IrregularityProvider>
            <LenisProvider>
              <MotionProvider>
                <TransitionDirectorProvider>
                  <NarrativeTimelineProvider>
                    <GlobalCursorProvider>
                      <WebGLRoot />
                      <SystemFrame />
                      <SystemMetaNav />
                      <SystemCursor />
                      {children}
                      <TransitionLayer />
                      <SystemLoader />
                      <SystemGrain />
                    </GlobalCursorProvider>
                  </NarrativeTimelineProvider>
                </TransitionDirectorProvider>
              </MotionProvider>
            </LenisProvider>
          </IrregularityProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
