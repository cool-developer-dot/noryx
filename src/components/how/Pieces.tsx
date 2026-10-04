import type { ReactNode } from "react";
import { ApolloLogo, CalendarLogo, GmailLogo, LinkedInLogo, SalesforceLogo, ZoomLogo } from "../icons";

/* ---------- sources ---------- */

function GlobeFill({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden>
      <circle cx="18" cy="18" r="16" fill="#2d63ea" />
      <g fill="none" stroke="#0a1b4d" strokeWidth="1.3" opacity=".9">
        <ellipse cx="18" cy="18" rx="6.500" ry="16" />
        <path d="M2 18h32M4.500 10h27M4.500 26h27M18 2v32" />
      </g>
      <path d="M8 9c3 1 4 4 8 4s3 3 2 5-4 1-5 4-4 2-5-1-1-8 0-12z" fill="#7aa2ff" opacity=".6" />
    </svg>
  );
}

function AiMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="#f4f4f7" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
      {[0, 60, 120].map((r) => (
        <path key={r} transform={`rotate(${r} 16 16)`} d="M16 3.500 24.500 8.400v9.800L16 23.100 7.500 18.200V8.400z" />
      ))}
    </svg>
  );
}

export type Source = { key: string; title: string; sub: [string, string]; logo: ReactNode; dot: "red" | "white" };

export const SOURCES: Source[] = [
  { key: "crm", title: "CRM", sub: ["Deal history", "Account data"], logo: <SalesforceLogo className="h-[24px] w-[34px]" />, dot: "red" },
  { key: "nav", title: "Sales Navigator", sub: ["People & roles", "Company insights"], logo: <LinkedInLogo className="h-[32px] w-[32px]" />, dot: "white" },
  { key: "apollo", title: "Apollo", sub: ["Contact data", "Intent signals"], logo: <ApolloLogo className="h-[32px] w-[32px]" />, dot: "red" },
  { key: "email", title: "Email", sub: ["Conversations", "Relationships"], logo: <GmailLogo className="h-[24px] w-[32px]" />, dot: "white" },
  { key: "calls", title: "Calls", sub: ["Transcripts", "Key moments"], logo: <ZoomLogo className="h-[32px] w-[32px]" />, dot: "white" },
  { key: "research", title: "Research", sub: ["Company news", "Market context"], logo: <GlobeFill className="h-[32px] w-[32px]" />, dot: "white" },
  { key: "cal", title: "Calendar", sub: ["Meetings", "Upcoming touchpoints"], logo: <CalendarLogo className="h-[32px] w-[32px]" />, dot: "white" },
  {
    key: "ai",
    title: "AI Copilots",
    sub: ["Summaries", "Draft content"],
    logo: (
      <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#1b1d24] ring-1 ring-white/10">
        <AiMark className="h-[22px] w-[22px]" />
      </span>
    ),
    dot: "white",
  },
];

export function SourceCard({ s, className = "", style }: { s: Source; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`hglass relative flex items-center gap-[13px] rounded-[5px] pl-[11px] pr-[8px] ${className}`} style={style}>
      <div className="flex w-[36px] shrink-0 items-center justify-center">{s.logo}</div>
      <div className="min-w-0">
        <div className="whitespace-nowrap text-[11px] font-semibold leading-none text-cream">{s.title}</div>
        <div className="mt-[6px] whitespace-nowrap text-[8.5px] leading-[1.35] text-[#8f929d]">
          {s.sub[0]}
          <br />
          {s.sub[1]}
        </div>
      </div>
      <span
        className={`absolute right-0 top-1/2 h-[6px] w-[6px] -translate-y-1/2 translate-x-1/2 rounded-full ${
          s.dot === "red"
            ? "bg-[#ff2a2a] shadow-[0_0_10px_2px_rgba(255,42,42,0.9)]"
            : "bg-white shadow-[0_0_8px_1px_rgba(255,255,255,0.6)]"
        }`}
      />
    </div>
  );
}

/* ---------- steps ---------- */

export const STEPS = [
  { n: "01", t: "Discover", d: ["Find the right accounts", "with real context."] },
  { n: "02", t: "Prioritize", d: ["Focus on what", "matters now."] },
  { n: "03", t: "Prepare", d: ["Get ready for every", "conversation."] },
  { n: "04", t: "Understand", d: ["Turn conversations", "into intelligence."] },
  { n: "05", t: "Act", d: ["Take the next best", "action, everywhere."] },
];

export function StepNode({ active = false }: { active?: boolean }) {
  return active ? (
    <span className="relative flex h-[22px] w-[22px] items-center justify-center rounded-full border-[1.5px] border-[#ff2a2a] bg-[#0b0c10] shadow-[0_0_16px_3px_rgba(255,42,42,0.7)]">
      <span className="h-[10px] w-[10px] rounded-full bg-[#ff2a2a]" />
    </span>
  ) : (
    <span className="block h-[18px] w-[18px] rounded-full border border-white/55 bg-[#0b0c10]" />
  );
}

export function StepText({ s }: { s: (typeof STEPS)[number] }) {
  return (
    <div>
      <div className="text-[11px] font-medium leading-none tracking-[0.22em] text-cream/90">{s.n}</div>
      <div className="mt-[7px] font-display text-[21.5px] uppercase leading-none tracking-[0.005em] text-cream">{s.t}</div>
      <p className="mt-[5px] font-serif text-[15px] font-light leading-[1.2] text-[#b5b0a8]">
        {s.d[0]}
        <br />
        {s.d[1]}
      </p>
    </div>
  );
}

/* ---------- from data to action ---------- */

const ICON = "h-[22px] w-[22px] text-cream";

const ACTIONS: { icon: ReactNode; t: [string, string]; hot?: boolean }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
        <circle cx="10.500" cy="10.500" r="6.500" />
        <path d="m15.500 15.500 5 5" />
      </svg>
    ),
    t: ["Account identified", "and researched"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className={ICON} fill="currentColor" aria-hidden>
        <rect x="3" y="12" width="4" height="9" />
        <rect x="10" y="4" width="4" height="17" />
        <rect x="17" y="9" width="4" height="12" />
      </svg>
    ),
    t: ["Priority signals", "evaluated"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
        <path d="M6 3h8l5 5v13H6z" />
        <path d="M14 3v5h5M9 13h7M9 17h7" strokeLinecap="round" />
      </svg>
    ),
    t: ["Pre-call brief", "generated"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
        <path d="M3 12h1M6.500 8v8M10 5v14M13.500 7.500v9M17 3.500v17M20.500 9v6" />
      </svg>
    ),
    t: ["Conversation", "analyzed"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-[#ff2a2a]" fill="currentColor" aria-hidden>
        <path d="M21 3 3 10.500l6.500 2.500L12 20l2.500-5.500zM9.500 13l7-6" />
      </svg>
    ),
    t: ["Next best action", "recommended"],
    hot: true,
  },
];

export function ActionPanel({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`hpanel relative flex flex-col rounded-[6px] pb-[20px] pl-[18px] pr-[6px] pt-[24px] ${className}`} style={style}>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#ff2a2a] to-transparent shadow-[0_0_16px_3px_rgba(255,42,42,0.7)]" />
      <div className="flex items-center gap-[10px] font-cond text-[20px] font-medium leading-none tracking-[0.04em] text-[#ff3b3b]">
        01
        <svg viewBox="0 0 20 10" className="h-[9px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M0 5h17M13 1l4 4-4 4" />
        </svg>
        05
      </div>
      <div className="mt-[9px] whitespace-nowrap text-[8px] font-medium uppercase leading-none tracking-[0.15em] text-cream/85">
        From data to action
      </div>
      <ul className="mt-[26px] flex flex-1 flex-col justify-between">
        {ACTIONS.map((a, i) => (
          <li key={a.t[0]} className="flex flex-col items-start">
            <div className="flex items-center gap-[10px]">
              <span
                className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[5px] border ${
                  a.hot ? "border-[#ff2a2a]/50 bg-[#2a1215]" : "border-white/10 bg-[#171920]"
                }`}
              >
                {a.icon}
              </span>
              <span className={`whitespace-nowrap text-[9px] leading-[1.45] ${a.hot ? "text-[#ff3b3b]" : "text-cream/85"}`}>
                {a.t[0]}
                <br />
                {a.t[1]}
              </span>
            </div>
            {i < ACTIONS.length - 1 && (
              <svg viewBox="0 0 10 22" className="my-[8px] ml-[18px] h-[20px] w-[9px] text-white/60" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <path d="M5 1v18M1.500 15.500 5 19l3.500-3.500" />
              </svg>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- lunar terrain ---------- */

export function Terrain({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1536 240" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <filter id="terr-f" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="5" seed="11" result="n" />
          <feDiffuseLighting in="n" lightingColor="#b9bac2" surfaceScale="9" diffuseConstant="0.9" result="l">
            <feDistantLight azimuth="230" elevation="34" />
          </feDiffuseLighting>
          <feColorMatrix in="l" type="saturate" values="0" />
        </filter>
        <linearGradient id="terr-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#07080a" stopOpacity=".45" />
          <stop offset=".45" stopColor="#07080a" stopOpacity=".8" />
          <stop offset="1" stopColor="#07080a" stopOpacity="1" />
        </linearGradient>
        <mask id="terr-m">
          <path
            fill="#fff"
            d="M0 22 L40 20 L90 42 L130 36 L185 52 L240 40 L300 62 L360 56 L420 70 L520 60 L640 64 L760 58 L880 72 L1000 60 L1100 66 L1200 56 L1290 70 L1380 62 L1460 74 L1536 60 V240 H0Z"
          />
        </mask>
      </defs>
      <g mask="url(#terr-m)">
        <rect width="1536" height="240" filter="url(#terr-f)" />
        <rect width="1536" height="240" fill="url(#terr-fade)" />
      </g>
    </svg>
  );
}
