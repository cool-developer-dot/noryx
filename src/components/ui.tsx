import type { CSSProperties, ReactNode } from "react";

/** Where "Join the pilot" goes. Point this at your booking page or form when you have one. */
export const PILOT_URL = "#pilot";
/** The NORYX web app. */
export const APP_URL = "https://noryx-hq.vercel.app/login";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 10" className={`arrow ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M0 5h14M10 1l4 4-4 4" />
    </svg>
  );
}

/** The NORYX glyph: an "N" whose path ends in a red signal, the next best action. Draws on any background. */
export function Glyph({ className = "", ink = "#f4efe6" }: { className?: string; ink?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M9.6 22.4V9.7l12.8 12.7V15.6" fill="none" stroke={ink} strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="glyph-dot" cx="22.4" cy="9.7" r="2.65" fill="var(--accent)" />
    </svg>
  );
}

/** The NORYX mark: the glyph on its dark tile (header, footer, app icon). */
export function Mark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`mark inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.27 }}
      aria-hidden
    >
      <Glyph className="h-full w-full" />
    </span>
  );
}

export function Wordmark({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <span className={`logo inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={size} />
      <span className="font-bold leading-none tracking-[-0.045em]" style={{ fontSize: Math.round(size * 0.71) }}>
        NORYX
      </span>
    </span>
  );
}

/** Fade-up on scroll; `d` staggers it. Needs a <Reveal> ancestor. */
export function Rv({ d = 0, className = "", children, as: Tag = "div" }: { d?: number; className?: string; children: ReactNode; as?: "div" | "p" | "h2" | "h3" | "li" }) {
  return (
    <Tag className={`rv ${className}`} style={{ "--d": `${d}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function SectionHead({ eyebrow, title, lede, tone = "dark", align = "center" }: { eyebrow?: string; title: ReactNode; lede?: ReactNode; tone?: "dark" | "light"; align?: "center" | "left" }) {
  const c = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <div className={`flex max-w-[760px] flex-col ${c}`}>
      {eyebrow && (
        <Rv>
          <p className={`eyebrow ${tone === "light" ? "!text-ink-muted" : ""}`} style={tone === "light" ? { color: "var(--ink-muted)" } : undefined}>
            {eyebrow}
          </p>
        </Rv>
      )}
      <Rv d={0.06} className="mt-4">
        <h2 className={`display text-[clamp(2.1rem,6.4vw,3.6rem)] ${tone === "light" ? "text-ink" : "text-fg"}`}>{title}</h2>
      </Rv>
      {lede && (
        <Rv d={0.12} className="mt-5">
          <p className="lede max-w-[620px]" style={tone === "light" ? { color: "var(--ink-muted)" } : undefined}>
            {lede}
          </p>
        </Rv>
      )}
    </div>
  );
}
