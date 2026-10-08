import Reveal from "./Reveal";

/** Set these to your real destinations. */
const LINKS = {
  linkedin: "#",
  privacy: "#",
  terms: "#",
};

const NAV = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Integrations", href: "#integrations" },
  { label: "For teams", href: "#teams" },
  { label: "FAQ", href: "#faq" },
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
          <stop offset="0" stopColor="#26272d" />
          <stop offset=".55" stopColor="#18191d" />
          <stop offset="1" stopColor="#0b0c0f" />
        </linearGradient>
        <linearGradient id="wm-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
          <animateTransform attributeName="gradientTransform" type="translate" values="-1.4 0; 1.4 0" dur="10s" begin="1s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <g style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontWeight: 700 }} fontSize="276">
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
  const link = "foot-link text-[15px] text-[#c4c4cc]";

  return (
    <Reveal id="footer" className="foot-bg relative overflow-x-clip text-cream">
      <div className="section-x relative mx-auto max-w-[1600px] pt-8 lg:pt-12">
        {/* body */}
        <div className="grid gap-12 border-t border-white/[0.14] pt-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-0 lg:pt-14">
          {/* brand */}
          <div className="pfade sm:col-span-2 lg:col-span-1 lg:pr-10">
            <a href="#top" aria-label="NORYX — back to top" className="text-[40px] font-bold leading-none tracking-[-0.06em] text-cream">
              NORYX
            </a>
            <p className="mt-5 text-[15px] text-[#c4c4cc]">Connected revenue intelligence</p>
            <p className="body-copy mt-6 max-w-[34ch] !text-[15px]">
              One intelligence layer across prospecting, research, conversations, CRM, and follow-up.
            </p>
          </div>

          {/* nav */}
          <nav aria-label="Footer" className="pfade lg:border-l lg:border-white/[0.14] lg:px-[3.4vw]" style={{ ["--d" as string]: "0.1s" }}>
            <p className="eyebrow">Explore</p>
            <ul className="mt-6 space-y-4">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* legal + contact */}
          <div className="pfade lg:border-l lg:border-white/[0.14] lg:px-[3.4vw]" style={{ ["--d" as string]: "0.2s" }}>
            <p className="eyebrow">Company</p>
            <ul className="mt-6 space-y-4">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <a href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={link}>
                    {l.label}
                    {l.external && (
                      <svg viewBox="0 0 12 12" className="h-[11px] w-[11px]" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
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
        <div className="pfade mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-white/10 py-6 text-[14px] text-[#a1a1aa]" style={{ ["--d" as string]: "0.25s" }}>
          <span>© {year} NORYX</span>
          <a href="#top" className="foot-link group text-[#c4c4cc]">
            Back to top
            <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-white">
              <svg viewBox="0 0 10 12" className="h-[11px] w-[9px]" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                <path d="M5 11V1M1 5l4-4 4 4" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* oversized wordmark, cropped by the page edge */}
      <div className="pfade relative mt-2 select-none" style={{ ["--d" as string]: "0.3s" }} aria-hidden>
        <Wordmark />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07080a] to-transparent" />
      </div>
    </Reveal>
  );
}
