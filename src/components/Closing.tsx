import Reveal from "./Reveal";
import { APP_URL, Arrow, PILOT_URL, Rv, Wordmark } from "./ui";

/** Set these to your real destinations. */
const LINKS = { contact: "#", privacy: "#", terms: "#" };

const COLS = [
  {
    h: "Product",
    l: [
      { t: "Product", href: "#product" },
      { t: "How it works", href: "#how" },
      { t: "Principles", href: "#principles" },
      { t: "FAQ", href: "#faq" },
    ],
  },
  {
    h: "Company",
    l: [
      { t: "Sign in", href: APP_URL },
      { t: "Contact", href: LINKS.contact },
      { t: "Privacy", href: LINKS.privacy },
      { t: "Terms", href: LINKS.terms },
    ],
  },
];

export default function Closing() {
  const year = new Date().getFullYear();
  return (
    <Reveal id="pilot" className="on-ivory relative overflow-hidden bg-ivory text-ink">
      {/* final call to action */}
      <div className="frame dots-ink pad-x py-14 text-center lg:py-20">
        <Rv>
          <h2 className="display mx-auto max-w-[860px] text-[clamp(2.3rem,7vw,4.2rem)] text-ink">Turn target accounts into next best actions.</h2>
        </Rv>
        <Rv d={0.08}>
          <p className="mx-auto mt-5 max-w-[540px] text-[16px] leading-[1.6] lg:text-[18px]" style={{ color: "var(--ink-muted)" }}>
            We&apos;re onboarding a small group of sellers first. Tell us what you sell and we&apos;ll set up your workspace.
          </p>
        </Rv>
        <Rv d={0.14} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={PILOT_URL} className="btn btn-accent">
            Join the pilot
            <Arrow className="h-[10px] w-[15px]" />
          </a>
          <a href={APP_URL} className="btn border border-ink/15 text-ink hover:border-ink/40">
            Sign in
          </a>
        </Rv>
      </div>

      {/* footer */}
      <footer className="border-t border-ink/[0.09]">
        <div className="frame pad-x relative pt-10 lg:pt-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-[1.4fr_1fr_1fr]">
            <div className="col-span-2 sm:col-span-1">
              <span className="text-ink">
                <Wordmark size={30} />
              </span>
              <p className="mt-4 max-w-[32ch] text-[14.5px] leading-[1.6]" style={{ color: "var(--ink-muted)" }}>
                The intelligence engine for your next best action.
              </p>
            </div>
            {COLS.map((c) => (
              <div key={c.h}>
                <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                  {c.h}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.l.map((l) => (
                    <li key={l.t}>
                      <a href={l.href} className="text-[14.5px] text-ink/80 transition-colors hover:text-ink">
                        {l.t}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/[0.09] py-6 text-[13.5px]" style={{ color: "var(--ink-muted)" }}>
            <span>© {year} NORYX</span>
            <a href="#top" className="transition-colors hover:text-ink">
              Back to top ↑
            </a>
          </div>
        </div>
        {/* oversized wordmark, cropped by the bottom edge */}
        <div className="frame pointer-events-none select-none overflow-hidden" aria-hidden>
          <p className="translate-y-[22%] text-center text-[25vw] font-bold leading-[0.8] tracking-[-0.07em] text-ink/[0.06] lg:text-[318px]">NORYX</p>
        </div>
      </footer>
    </Reveal>
  );
}
