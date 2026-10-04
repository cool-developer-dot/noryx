import Reveal from "./Reveal";

/** Set these to your real destinations. */
const LINKS = {
  linkedin: "#",
  privacy: "#",
  terms: "#",
};

const NAV = [
  { n: "01", label: "Product", href: "#product" },
  { n: "02", label: "How it works", href: "#how-it-works" },
  { n: "03", label: "Integrations", href: "#integrations" },
  { n: "04", label: "For teams", href: "#teams" },
];

const LEGAL: { label: string; href: string; external?: boolean }[] = [
  { label: "Contact", href: "#demo" },
  { label: "LinkedIn", href: LINKS.linkedin, external: true },
  { label: "Privacy", href: LINKS.privacy },
  { label: "Terms", href: LINKS.terms },
];

function Wordmark() {
  return (
    <svg viewBox="0 0 1000 175" preserveAspectRatio="none" className="block h-auto w-full" role="img" aria-label="NORYX">
      <defs>
        <linearGradient id="wm-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262838" />
          <stop offset=".55" stopColor="#171826" />
          <stop offset="1" stopColor="#0b0c14" />
        </linearGradient>
        <linearGradient id="wm-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff2a2a" stopOpacity="0" />
          <stop offset=".5" stopColor="#ff2a2a" stopOpacity=".34" />
          <stop offset="1" stopColor="#ff2a2a" stopOpacity="0" />
          <animateTransform attributeName="gradientTransform" type="translate" values="-1.4 0; 1.4 0" dur="10s" begin="1s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <g style={{ fontFamily: "var(--font-unbounded), 'Arial Black', sans-serif", fontWeight: 800 }} fontSize="268">
        <text x="0" y="238" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#wm-fill)">
          NORYX
        </text>
        <text className="sweep" x="0" y="238" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="url(#wm-sweep)">
          NORYX
        </text>
      </g>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Reveal id="footer" className="foot-bg relative overflow-x-clip text-cream">
      <div className="hero-grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-[6vw] xl:px-[64px]">
        {/* top rule */}
        <div className="pfade relative pt-[72px] lg:pt-[92px]">
          {/* line arriving from the CTA above, ending in a glowing node just under the rule */}
          <span className="absolute -top-[84px] bottom-[-20px] left-[3px] w-px bg-gradient-to-b from-transparent via-[#ff2a2a]/80 to-[#ff2a2a] lg:left-[9%]" />
          <span className="absolute bottom-[-24px] left-[3px] h-[8px] w-[8px] -translate-x-[3.5px] rounded-full bg-[#ff2a2a] shadow-[0_0_0_5px_rgba(255,42,42,0.14),0_0_18px_rgba(255,42,42,0.8)] lg:left-[9%]" />
          <div className="flex items-start justify-between gap-6 border-b border-cream/15 pb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-cream/45">
            <span className="hidden sm:block">&nbsp;</span>
            <span className="ml-auto">08 / End</span>
          </div>
        </div>

        {/* body */}
        <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-0 lg:py-[52px]">
          {/* brand */}
          <div className="pfade sm:col-span-2 lg:col-span-1 lg:pr-10" style={{ ["--d" as string]: "0.1s" }}>
            <a href="#top" aria-label="NORYX — back to top" className="inline-flex items-start">
              <span className="font-display text-[clamp(3.2rem,12vw,4.6rem)] leading-[0.9] tracking-[-0.01em] text-cream">NORYX</span>
              <span className="mt-[0.5em] text-[10px] leading-none text-cream/70" aria-hidden>
                ®
              </span>
            </a>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.36em] text-cream/65">Connected revenue intelligence</p>
            <span className="mt-6 block h-[4px] w-[40px] bg-[#ff2a2a]" />
            <p className="mt-8 max-w-[360px] font-serif text-[17px] font-light leading-[1.5] text-cream/55">
              One intelligence layer across prospecting, research, conversations, CRM, and follow-up.
            </p>
          </div>

          {/* nav */}
          <nav aria-label="Footer" className="pfade lg:border-l lg:border-cream/15 lg:px-[3.4vw]" style={{ ["--d" as string]: "0.2s" }}>
            <ul className="space-y-[18px] font-mono text-[12px] uppercase tracking-[0.2em] lg:space-y-[22px]">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="foot-link text-cream/90">
                    <span className="w-[26px] text-cream/35">{l.n}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* legal + contact */}
          <div className="pfade lg:border-l lg:border-cream/15 lg:px-[3.4vw]" style={{ ["--d" as string]: "0.3s" }}>
            <ul className="space-y-[18px] font-mono text-[12px] uppercase tracking-[0.2em] lg:space-y-[22px]">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="foot-link text-cream/90"
                  >
                    {l.label}
                    {l.external && (
                      <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] text-[#ff3b3b]" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                        <path d="M2 10 10 2M4 2h6v6" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="pfade flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-cream/10 py-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-cream/55" style={{ ["--d" as string]: "0.35s" }}>
          <span>© {year} NORYX</span>
          <span className="hidden h-px flex-1 bg-cream/10 sm:block" />
          <a href="#top" className="foot-link group text-cream/80">
            Back to top
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-cream/25 text-[#ff3b3b] transition-colors group-hover:border-[#ff2a2a]">
              <svg viewBox="0 0 10 12" className="h-[11px] w-[9px]" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                <path d="M5 11V1M1 5l4-4 4 4" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* oversized wordmark, cropped by the page edge */}
      <div className="pfade relative mt-2 select-none" style={{ ["--d" as string]: "0.4s" }} aria-hidden>
        <Wordmark />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07080f] to-transparent" />
      </div>
    </Reveal>
  );
}
