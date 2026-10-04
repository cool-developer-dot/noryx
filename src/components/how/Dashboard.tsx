import type { ReactNode } from "react";
import { ApolloLogo, CalendarLogo, LinkedInLogo, PersonGlyph } from "../icons";
import { Avatar } from "../problem/cards";

const MUTED = "text-[#8f929d]";

function AcmeMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 5 5 35h5.600l2.400-5h14l2.400 5H35zM15 25l5-10.500L25 25z" fill="#f4efe6" fillRule="evenodd" />
      <path d="M17 33c4-2 8-2 12 0" stroke="#f4efe6" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-white/[0.09] pl-[14px] pr-[16px] first:border-l-0 @2xl:first:border-l">
      <div className="text-[7.5px] font-medium uppercase leading-none tracking-[0.16em] text-[#8f929d]">{label}</div>
      <div className="mt-[7px] whitespace-nowrap text-[12px] font-medium leading-none text-cream">{value}</div>
    </div>
  );
}

const TABS = ["Overview", "People", "Signals", "Conversations", "Next Steps"];
const TAB_W = ["@2xl:w-[94px]", "@2xl:w-[108px]", "@2xl:w-[84px]", "@2xl:w-[158px]", "@2xl:w-[90px]"];

function Gauge() {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[72px] w-[72px] shrink-0">
      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="gauge-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1fb6ff" />
            <stop offset="1" stopColor="#2f6bff" />
          </linearGradient>
        </defs>
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1a1c24" strokeWidth="4.500" />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="url(#gauge-g)"
          strokeWidth="4.500"
          strokeLinecap="round"
          strokeDasharray={`${c * 0.92} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[19px] font-semibold leading-none text-cream">92%</span>
        <span className="mt-[4px] text-[6.5px] font-medium uppercase leading-none tracking-[0.14em] text-[#ff3b3b]">
          Fit score
        </span>
      </div>
    </div>
  );
}

function Persona({ name, role, who, tone, hair }: { name: string; role: string; who: string; tone?: string; hair?: string }) {
  return (
    <div className="flex items-center gap-[7px]">
      <Avatar className="h-[30px] w-[30px] shrink-0 rounded-full border border-white/20" tone={tone} hair={hair} />
      <div className="whitespace-nowrap">
        <div className="text-[8.5px] font-semibold leading-none text-cream">{role}</div>
        <div className="mt-[5px] text-[7px] leading-none text-[#8f929d]">{who}</div>
        <span className="sr-only">{name}</span>
      </div>
    </div>
  );
}

function Signal({ icon, title, lines, tag, tagTone }: { icon: ReactNode; title: ReactNode; lines?: ReactNode; tag: string; tagTone?: "hi" | "md" }) {
  return (
    <div className="rounded-[4px] border border-white/[0.09] bg-white/[0.03] px-[11px] pb-[8px] pt-[10px]">
      <div className="flex items-start gap-[8px]">
        <span className="mt-[1px] shrink-0">{icon}</span>
        <div className="whitespace-nowrap text-[8.5px] leading-[1.4] text-cream">
          {title}
          {lines}
        </div>
      </div>
      <span
        className={`mt-[7px] inline-block rounded-[2px] px-[5px] py-[2px] text-[6.5px] font-semibold uppercase leading-none tracking-[0.14em] ${
          tagTone === "md" ? "bg-[#3a2f10] text-[#e3b64a]" : "bg-[#3a2f10] text-[#e3b64a]"
        }`}
      >
        {tag}
      </span>
    </div>
  );
}

const Heart = () => (
  <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden>
    <path d="M12 21s-8-5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 6-8 11-8 11z" fill="#ff3b3b" />
  </svg>
);
const People = () => (
  <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="#3b7bff" strokeWidth="1.8" aria-hidden>
    <circle cx="9" cy="8" r="3.200" />
    <path d="M3 20c0-3.500 2.700-5.500 6-5.500s6 2 6 5.500" strokeLinecap="round" />
    <circle cx="17.500" cy="9" r="2.400" />
  </svg>
);
const Person = () => <PersonGlyph className="h-[16px] w-[16px] text-[#3b7bff]" />;

const DocIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="#e8e8ee" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
    <path d="M6 3h8l5 5v13H6z" />
    <path d="M14 3v5h5M9 13h7M9 17h7" strokeLinecap="round" />
  </svg>
);
const StackIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
    <ellipse cx="12" cy="6" rx="8" ry="3" fill="#f2f2f5" />
    <path d="M4 9.500c0 1.700 3.600 3 8 3s8-1.300 8-3V13c0 1.700-3.600 3-8 3s-8-1.300-8-3z" fill="#f2f2f5" />
    <path d="M4 15.500c0 1.700 3.600 3 8 3s8-1.300 8-3V19c0 1.700-3.600 3-8 3s-8-1.300-8-3z" fill="#f2f2f5" />
  </svg>
);

const ACTIVITY: { icon: ReactNode; title: string; sub: string }[] = [
  { icon: <LinkedInLogo className="h-[20px] w-[20px]" />, title: "New VP Revenue joined", sub: "2 months ago" },
  { icon: <ApolloLogo className="h-[22px] w-[22px]" />, title: "Revenue Operations hiring", sub: "3 open roles" },
  { icon: <DocIcon />, title: "Expansion mentioned in earnings", sub: "2 weeks ago" },
  { icon: <CalendarLogo className="h-[22px] w-[22px]" />, title: "Met at SaaStr conference", sub: "3 months ago" },
  { icon: <StackIcon />, title: "Recent funding round", sub: "$50M · Jan 2024" },
];

const TIMELINE = [
  { t: "Discover", s: "Account fit" },
  { t: "Prioritize", s: "Expansion signal" },
  { t: "Prepare", s: "Likely pain" },
  { t: "Understand", s: "Confirmed pain" },
  { t: "Act", s: "Recommended action" },
];

export default function Dashboard() {
  return (
    <div className="@container h-full w-full">
      <div className="dash-panel relative flex h-full w-full flex-col overflow-hidden rounded-[6px] text-cream">
        {/* glowing left edge */}
        <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[3px] bg-gradient-to-b from-[#ff2a2a]/40 via-[#ff2a2a] to-[#ff2a2a]/40 shadow-[0_0_22px_5px_rgba(255,42,42,0.8)]" />

        {/* header */}
        <div className="flex shrink-0 flex-col gap-4 border-b border-white/[0.08] px-5 py-4 @2xl:h-[60px] @2xl:flex-row @2xl:items-center @2xl:justify-between @2xl:px-[22px] @2xl:py-0">
          <div className="flex items-center gap-5">
            <span className="font-display text-[31px] leading-none tracking-[-0.01em]">NORYX</span>
            <span className="text-[8.5px] font-medium uppercase tracking-[0.14em] text-white/75">Account intelligence</span>
          </div>
          <div className="flex items-center">
            <Stat label="Intelligence sources" value="12" />
            <Stat label="Last updated" value="Today, 08:42" />
            <Stat label="Confidence" value="92%" />
            <span className="ml-3 hidden pr-1 text-[15px] leading-none tracking-[0.1em] text-white/80 @2xl:block">···</span>
          </div>
        </div>

        {/* company */}
        <div className="flex shrink-0 items-center justify-between gap-4 px-5 pb-[14px] pt-[13px] @2xl:h-[82px] @2xl:px-[22px] @2xl:py-0">
          <div className="flex min-w-0 items-center gap-[18px]">
            <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#2a2c33] to-[#101115] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              <AcmeMark className="h-[30px] w-[30px]" />
            </div>
            <div className="min-w-0">
              <div className="font-cond text-[27px] font-medium uppercase leading-none tracking-[0.06em]">Acme Corp</div>
              <div className={`mt-[9px] text-[11px] leading-[1.4] ${MUTED}`}>
                Enterprise Software <span className="px-[3px]">·</span> 1,240 employees <span className="px-[3px]">·</span>
                <span className="hidden @md:inline"> San Francisco, CA</span>
              </div>
            </div>
          </div>
          <span className="hidden shrink-0 bg-[#ff2a2a] px-[10px] py-[6px] text-[8.5px] font-semibold uppercase leading-none tracking-[0.14em] text-white @md:block @2xl:mr-[56px]">
            High priority
          </span>
        </div>

        {/* tabs */}
        <div className="flex shrink-0 overflow-x-auto border-b border-white/[0.08] px-5 @2xl:h-[34px] @2xl:px-[30px] [&::-webkit-scrollbar]:hidden">
          {TABS.map((t, i) => (
            <span
              key={t}
              className={`shrink-0 whitespace-nowrap border-t-2 px-[14px] pb-[10px] pt-[11px] text-center text-[9.5px] @2xl:pb-0 ${TAB_W[i]} ${
                i === 0 ? "border-[#ff2a2a] font-medium text-cream" : "border-transparent text-white/60"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* body */}
        <div className="grid shrink-0 gap-3 px-5 pt-[5px] @2xl:h-[325px] @2xl:grid-cols-[1fr_256px] @2xl:gap-[8px] @2xl:pl-[30px] @2xl:pr-[24px] @2xl:pt-[4px]">
          {/* discovering */}
          <div className="min-h-0 overflow-hidden rounded-[4px] border border-white/[0.08] bg-white/[0.022]">
            <div className="flex items-center justify-between border-b border-[#ff2a2a]/70 px-[22px] py-[11px] text-[9.5px] font-medium uppercase tracking-[0.18em]">
              <span>01 / Discovering</span>
              <span className="text-[8px] text-[#ff3b3b]">Target match</span>
            </div>
            <div className="flex items-center justify-between gap-4 px-[22px] pb-[12px] pt-[13px]">
              <div>
                <div className="text-[19px] font-medium leading-none">Why ACME CORP</div>
                <p className={`mt-[12px] text-[10.5px] leading-[1.45] ${MUTED}`}>
                  Strong fit for your ICP with multiple
                  <br className="hidden @md:block" /> growth signals and relevant personas.
                </p>
              </div>
              <div className="flex items-center border-l border-white/[0.09] pl-[20px] @2xl:mr-[6px]">
                <Gauge />
              </div>
            </div>
            <div className="grid gap-4 border-t border-white/[0.07] px-[22px] pb-[4px] pt-[12px] @2xl:grid-cols-[131px_1fr] @2xl:gap-0">
              <div>
                <div className={`text-[9px] leading-none ${MUTED}`}>Target market</div>
                <div className="mt-[11px] text-[9.5px] font-semibold leading-none">B2B SaaS</div>
                <div className="mt-[6px] text-[9px] leading-none">500 – 2,000 employees</div>
                <div className="mt-[6px] text-[9px] leading-none">North America</div>
              </div>
              <div>
                <div className={`text-[9px] leading-none ${MUTED}`}>Relevant personas</div>
                <div className="mt-[11px] flex flex-wrap gap-x-[8px] gap-y-3">
                  <Persona name="Sarah Chen" role="VP Revenue" who="Sarah Chen" />
                  <Persona name="Mark Williams" role="CRO" who="Mark Williams" tone="#b08467" hair="#1c1612" />
                  <Persona name="Priya Desai" role="RevOps" who="Priya Desai" tone="#a9744f" hair="#120d0a" />
                </div>
              </div>
            </div>
            <div className="px-[22px] pb-[14px] pt-[10px]">
              <div className="text-[9px] font-medium leading-none">Key signals</div>
              <div className="mt-[10px] grid gap-[8px] @md:grid-cols-3">
                <Signal
                  icon={<Heart />}
                  title={
                    <>
                      Expansion into
                      <br />2 new markets
                    </>
                  }
                  tag="High"
                />
                <Signal
                  icon={<People />}
                  title={
                    <>
                      Headcount
                      <br />
                      <span className="text-[#e3b64a]">+18% YoY</span>
                    </>
                  }
                  tag="High"
                />
                <Signal
                  icon={<Person />}
                  title={
                    <>
                      Hiring
                      <br />
                      Revenue Operations
                    </>
                  }
                  tag="Medium"
                  tagTone="md"
                />
              </div>
            </div>
          </div>

          {/* latest activity */}
          <div className="min-h-0 overflow-hidden rounded-[4px] border border-white/[0.08] bg-white/[0.022]">
            <div className="flex items-center justify-between px-[16px] pb-[10px] pt-[16px]">
              <span className="text-[11.5px] font-medium leading-none">Latest activity</span>
              <span className="text-[7px] font-medium uppercase tracking-[0.16em] text-white/70">View all →</span>
            </div>
            <ul>
              {ACTIVITY.map((a) => (
                <li key={a.title} className="flex items-center gap-[12px] border-t border-white/[0.07] px-[16px] py-[11px]">
                  <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center">{a.icon}</span>
                  <div className="min-w-0">
                    <div className="truncate text-[9.5px] leading-none text-cream">{a.title}</div>
                    <div className={`mt-[6px] text-[8px] leading-none ${MUTED}`}>{a.sub}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* timeline */}
        <div className="mt-auto shrink-0 px-5 pb-[18px] pt-[14px] @2xl:px-[39px]">
          <div className="flex flex-col gap-1 @2xl:flex-row @2xl:items-baseline @2xl:gap-[18px]">
            <span className="text-[10.5px] font-medium leading-none">Context timeline</span>
            <span className="text-[8.5px] leading-[1.4] text-white/55">
              Everything NORYX has learned about this account, in one place.
            </span>
          </div>
          <div className="relative mt-[14px] grid grid-cols-1 gap-3 @2xl:grid-cols-[136px_164px_151px_117px_1fr] @2xl:gap-0">
            <span className="absolute left-[6px] right-0 top-[5px] hidden h-px bg-white/[0.14] @2xl:block" />
            {TIMELINE.map((x, i) => (
              <div key={x.t} className="relative flex items-center gap-3 @2xl:block">
                <span
                  className={`relative block h-[11px] w-[11px] shrink-0 rounded-full ${
                    i === 0
                      ? "bg-[#ff2a2a] shadow-[0_0_0_3px_rgba(255,42,42,0.25),0_0_14px_3px_rgba(255,42,42,0.9)]"
                      : "border border-white/70 bg-[#0c0d11]"
                  }`}
                />
                <div className="@2xl:mt-[14px]">
                  <div className="text-[8.5px] font-semibold uppercase leading-none tracking-[0.1em]">{x.t}</div>
                  <div className={`mt-[6px] text-[10px] leading-none ${MUTED}`}>{x.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
