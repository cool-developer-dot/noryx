import Reveal from "./Reveal";

const ROLES = [
  {
    title: "Account Executives",
    benefit: "Know the account before you enter the room.",
    label: "Account context · Pre-call intelligence",
  },
  {
    title: "SDRs",
    benefit: "Spend less time researching and more time engaging.",
    label: "Targeting · Persona context",
  },
  {
    title: "Sales Leaders",
    benefit: "See what your team is learning across accounts and conversations.",
    label: "Team intelligence · Deal context",
  },
  {
    title: "Revenue Operations",
    benefit: "Connect intelligence across the systems your team already uses.",
    label: "Connected systems · Workflow context",
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 22 10" className="h-[9px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden>
      <path d="M0 5h20M16 1l4 4-4 4" />
    </svg>
  );
}

/** Editorial role index — typography and thin rules only. No imagery, no numbering. */
export default function Roles() {
  return (
    <Reveal id="teams" className="relative overflow-x-clip bg-[#f7f5f0] text-[#0c0c14]">
      <div className="section-x section-y mx-auto max-w-[1600px]">
        <div className="lg:grid lg:grid-cols-[34fr_66fr] lg:gap-x-[5vw]">
          {/* left: statement */}
          <div className="lg:sticky lg:top-[132px] lg:self-start">
            <p className="eyebrow eyebrow-light pfade">Your team</p>

            <h2 className="h-display pfade mt-5 text-[clamp(2.25rem,8.6vw,3rem)] text-[#0c0c14] lg:mt-6 lg:text-[clamp(2.25rem,2.9vw,2.875rem)]" style={{ ["--d" as string]: "0.1s" }}>
              One intelligence layer. Built around how your team sells.
            </h2>

            <p className="body-copy body-copy-light pfade mt-6 max-w-[40ch] lg:mt-8" style={{ ["--d" as string]: "0.2s" }}>
              NORYX gives every revenue role the context they need — without changing the tools or workflows they already use.
            </p>
          </div>

          {/* right: role index */}
          <ul className="mt-10 lg:mt-0">
            {ROLES.map((r, i) => (
              <li
                key={r.title}
                className="group pfade relative py-6 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_28px] lg:items-start lg:gap-x-10 lg:py-[36px]"
                style={{ ["--d" as string]: `${0.15 + i * 0.1}s` }}
              >
                <span className="role-rule absolute inset-x-0 top-0 h-px bg-[#0c0c14]/[0.16] group-hover:bg-[#0c0c14]/45" style={{ ["--d" as string]: `${0.3 + i * 0.12}s` }} />
                {i === ROLES.length - 1 && (
                  <span className="role-rule absolute inset-x-0 bottom-0 h-px bg-[#0c0c14]/[0.16] group-hover:bg-[#0c0c14]/45" style={{ ["--d" as string]: "0.8s" }} />
                )}

                <h3 className="h-display text-[clamp(1.75rem,7vw,2rem)] text-[#0c0c14] lg:text-[clamp(1.875rem,2.6vw,2.75rem)]">{r.title}</h3>

                <div className="mt-3 lg:mt-1">
                  <p className="max-w-[34ch] text-[17px] leading-[1.5] text-[#3f3f46] lg:text-[18px]">{r.benefit}</p>
                  <p className="mt-4 text-[13px] leading-[1.6] text-[#71717a]">{r.label}</p>
                </div>

                <span className="hidden justify-end pt-[10px] text-[#0c0c14]/35 transition-[transform,color] duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-[#0c0c14] lg:flex">
                  <Arrow />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
