import Reveal from "./Reveal";

const ROLES = [
  {
    n: "01",
    title: "Account Executives",
    benefit: "Know the account before you enter the room.",
    label: ["Account context", "Pre-call intelligence"],
  },
  {
    n: "02",
    title: "SDRs",
    benefit: "Spend less time researching and more time engaging.",
    label: ["Targeting", "Persona context"],
  },
  {
    n: "03",
    title: "Sales Leaders",
    benefit: "See what your team is learning across accounts and conversations.",
    label: ["Team intelligence", "Deal context"],
  },
  {
    n: "04",
    title: "Revenue Operations",
    benefit: "Connect intelligence across the systems your team already uses.",
    label: ["Connected systems", "Workflow context"],
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 22 10" className="h-[9px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden>
      <path d="M0 5h20M16 1l4 4-4 4" />
    </svg>
  );
}

/** Editorial role index — typography, thin rules and a little signal red. No imagery. */
export default function Roles() {
  return (
    <Reveal id="teams" className="relative overflow-x-clip bg-[#f7f5f0] text-[#0c0c14]">
      <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-[72px] sm:px-6 md:pt-24 lg:px-[6vw] lg:pb-[120px] lg:pt-[72px] xl:px-[64px]">
        <div className="lg:grid lg:grid-cols-[30fr_70fr] lg:gap-x-[5vw]">
          {/* left: statement */}
          <div className="lg:sticky lg:top-[132px] lg:self-start">
            <div className="pfade flex items-center gap-[22px]">
              <span className="h-[3px] w-[30px] bg-[#ee2f2f]" />
              <span className="text-[10.5px] font-medium uppercase tracking-[0.3em]">05 / Built for your team</span>
            </div>

            <h2
              className="pfade mt-8 font-display uppercase text-[#0c0c14] [text-wrap:balance] lg:mt-10"
              style={{
                ["--d" as string]: "0.1s",
                letterSpacing: "-0.025em",
                lineHeight: 0.96,
                fontSize: "clamp(2.75rem, 12vw, 3.25rem)",
              }}
            >
              <span className="block md:text-[clamp(3rem,7vw,4.25rem)] lg:text-[clamp(2.6rem,3.7vw,4.6rem)]">One intelligence layer.</span>
              <span className="mt-[0.28em] block md:text-[clamp(3rem,7vw,4.25rem)] lg:text-[clamp(2.6rem,3.7vw,4.6rem)]">
                Built around how your team sells.
              </span>
            </h2>

            <p
              className="pfade mt-8 max-w-[420px] font-serif text-[clamp(1.1rem,4.6vw,1.3rem)] font-light leading-[1.5] text-[#4a4b58] lg:mt-10"
              style={{ ["--d" as string]: "0.2s" }}
            >
              NORYX gives every revenue role the context they need — without changing the tools or workflows they already use.
            </p>
          </div>

          {/* right: role index */}
          <ol className="mt-14 lg:mt-0">
            {ROLES.map((r, i) => (
              <li
                key={r.n}
                className="group pfade relative border-b-0 pb-[30px] pt-[30px] lg:grid lg:grid-cols-[44px_minmax(0,1.32fr)_minmax(0,1fr)_minmax(0,0.78fr)_26px] lg:items-start lg:gap-x-8 lg:py-[46px]"
                style={{ ["--d" as string]: `${0.15 + i * 0.1}s` }}
              >
                <span className="role-rule absolute inset-x-0 top-0 h-px bg-[#0c0c14]/[0.16] group-hover:bg-[#0c0c14]/45" style={{ ["--d" as string]: `${0.3 + i * 0.12}s` }} />
                {i === ROLES.length - 1 && (
                  <span className="role-rule absolute inset-x-0 bottom-0 h-px bg-[#0c0c14]/[0.16] group-hover:bg-[#0c0c14]/45" style={{ ["--d" as string]: "0.8s" }} />
                )}

                {/* faint background numeral */}
                <span
                  className="pointer-events-none absolute right-[2%] top-1/2 hidden -translate-y-1/2 select-none font-display text-[10.5rem] leading-none text-[#0c0c14]/[0.03] lg:block"
                  aria-hidden
                >
                  {r.n}
                </span>

                <span className="relative font-mono text-[12px] leading-none tracking-[0.14em] text-[#ee2f2f]/60 transition-colors duration-300 group-hover:text-[#ee2f2f] lg:pt-[9px] lg:text-[11px]">
                  {r.n}
                </span>

                <h3 className="relative mt-4 font-display text-[clamp(1.65rem,7.4vw,1.875rem)] uppercase leading-[1] tracking-[-0.005em] md:text-[2.4rem] lg:mt-0 lg:text-[clamp(2.1rem,2.9vw,3.1rem)] lg:leading-[0.98]">
                  {r.title}
                </h3>

                <p className="relative mt-4 max-w-[34ch] font-serif text-[clamp(1.125rem,5vw,1.25rem)] font-light leading-[1.4] text-[#2b2c3a] lg:mt-[6px] lg:text-[1.2rem]">
                  {r.benefit}
                </p>

                <p className="relative mt-5 font-mono text-[12.5px] uppercase leading-[1.7] tracking-[0.1em] text-[#0c0c14]/55 lg:mt-[10px] lg:text-[10.5px] lg:tracking-[0.14em]">
                  {r.label.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>

                <span className="relative hidden justify-end pt-[14px] text-[#0c0c14]/35 transition-[transform,color] duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#0c0c14] lg:flex">
                  <Arrow />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Reveal>
  );
}
