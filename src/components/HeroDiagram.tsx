"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ApolloLogo,
  CalendarLogo,
  GmailLogo,
  LinkedInLogo,
  NextIcon,
  PersonGlyph,
  PersonLines,
  SalesforceLogo,
  SayIcon,
  WhatIcon,
  WhoIcon,
  WhyIcon,
  ZoomLogo,
} from "./icons";

/* Design space for the desktop diagram (px). Everything inside is laid out in
   these units and scaled uniformly to the available width. */
const W = 840;
const H = 600;

type Source = { key: string; title: string; sub: [string, string]; logo: ReactNode };

const SOURCES: Source[] = [
  { key: "crm", title: "CRM", sub: ["Account data,", "deal history"], logo: <SalesforceLogo className="h-[34px] w-[48px] text-cream/65" /> },
  { key: "nav", title: "Sales Navigator", sub: ["People, roles,", "company insights"], logo: <LinkedInLogo className="h-[38px] w-[38px] text-cream/65" /> },
  { key: "apollo", title: "Apollo", sub: ["Prospects,", "intent signals"], logo: <ApolloLogo className="h-[38px] w-[38px] text-cream/65" /> },
  { key: "email", title: "Email", sub: ["Conversations,", "relationships"], logo: <GmailLogo className="h-[30px] w-[40px] text-cream/65" /> },
  { key: "calls", title: "Calls", sub: ["Transcripts,", "key moments"], logo: <ZoomLogo className="h-[40px] w-[40px] text-cream/65" /> },
  { key: "cal", title: "Calendar", sub: ["Meetings,", "upcoming touchpoints"], logo: <CalendarLogo className="h-[40px] w-[40px] text-cream/65" /> },
];

type Output = { key: string; title: string; sub: [string, string]; icon: ReactNode };

const OUTPUTS: Output[] = [
  { key: "who", title: "Who", sub: ["Right people", "to engage"], icon: <WhoIcon className="h-[26px] w-[26px]" /> },
  { key: "what", title: "What", sub: ["Key priorities", "and initiatives"], icon: <WhatIcon className="h-[26px] w-[26px]" /> },
  { key: "why", title: "Why", sub: ["Likely needs", "and pain points"], icon: <WhyIcon className="h-[26px] w-[26px]" /> },
  { key: "say", title: "What to say", sub: ["Talking points", "and questions"], icon: <SayIcon className="h-[26px] w-[26px]" /> },
  { key: "next", title: "What's next", sub: ["Clear next steps", "and follow-up"], icon: <NextIcon className="h-[26px] w-[26px]" /> },
];

/* Layout (design-space px) */
const SRC = { x: 3, w: 174, h: 78, ys: [15, 110, 205, 300, 395, 490], tilt: 3.6 };
const OUT = { x: 684, w: 141, h: 86, ys: [40, 145, 250, 357, 462], tilt: -4 };
const CORE = { x: 273, y: 130, w: 324, h: 374 };

const SRC_END = [215, 240, 270, 310, 350, 385].map((y) => y + 0);
const OUT_START = [262, 280, 292, 308, 326];

const srcPath = (i: number) => {
  const y0 = SRC.ys[i] + SRC.h / 2;
  const y1 = SRC_END[i];
  const x0 = SRC.x + SRC.w;
  return `M${x0} ${y0} C ${x0 + 52} ${y0}, ${CORE.x - 48} ${y1}, ${CORE.x} ${y1}`;
};
const outPath = (i: number) => {
  const y0 = OUT_START[i];
  const y1 = OUT.ys[i] + OUT.h / 2;
  const x0 = CORE.x + CORE.w;
  return `M${x0} ${y0} C ${x0 + 50} ${y0}, ${OUT.x - 50} ${y1}, ${OUT.x} ${y1}`;
};

function SourceCard({ s, style }: { s: Source; style?: React.CSSProperties }) {
  return (
    <div className="glass absolute flex items-center gap-[12px] rounded-[6px] pl-[14px]" style={style}>
      <div className="flex w-[40px] shrink-0 items-center justify-center">{s.logo}</div>
      <div className="min-w-0">
        <div className="whitespace-nowrap text-[13px] font-bold leading-none tracking-[-0.005em] text-cream">
          {s.title}
        </div>
        <div className="mt-[7px] whitespace-nowrap text-[10.5px] leading-[1.35] text-[#a1a1aa]">
          {s.sub[0]}
          <br />
          {s.sub[1]}
        </div>
      </div>
      <span className="absolute right-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 translate-x-1/2 rounded-full bg-cream/80" />
    </div>
  );
}

function OutputCard({ o, style }: { o: Output; style?: React.CSSProperties }) {
  return (
    <div className="glass absolute rounded-[6px] px-[16px] py-[14px]" style={style}>
      <div className="flex items-center gap-[9px] text-cream/80">
        {o.icon}
        <span className="whitespace-nowrap text-[13px] font-bold leading-none tracking-[-0.005em] text-cream">
          {o.title}
        </span>
      </div>
      <div className="mt-[10px] whitespace-nowrap pl-[2px] text-[10.5px] leading-[1.35] text-[#a1a1aa]">
        {o.sub[0]}
        <br />
        {o.sub[1]}
      </div>
      <span className="absolute left-0 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/80" />
    </div>
  );
}

function AcmeMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 5 5 35h5.600l2.400-5h14l2.400 5H35zM15 25l5-10.500L25 25z" fill="#f4efe6" fillRule="evenodd" />
      <path d="M17 33c4-2 8-2 12 0" stroke="#f4efe6" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function CoreCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`glass-core relative overflow-hidden rounded-[6px] ${compact ? "w-full text-[11.5px] [&_.row]:!h-auto [&_.row]:!min-h-[40px] [&_.row]:!grid-cols-[104px_1fr] [&_.row]:!whitespace-normal [&_.row]:!py-2 [&_.row]:!text-[12px]" : "h-full w-full"}`}>
      {/* header */}
      <div className="flex h-[56px] items-center justify-between border-b border-white/[0.07] px-[22px]">
        <span className="text-[20px] font-bold leading-none tracking-[-0.04em] text-cream">NORYX</span>
        <span className="flex items-center gap-[7px] text-[9.5px] uppercase tracking-[0.16em] text-[#a1a1aa]">
          Intelligence layer
          <span className="pulse-dot h-[6px] w-[6px] rounded-full bg-cream/80" />
        </span>
      </div>

      {/* company */}
      <div className="flex items-center gap-[16px] px-[22px] pb-[16px] pt-[18px]">
        <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#2a2c33] to-[#101115] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          <AcmeMark className="h-[30px] w-[30px]" />
        </div>
        <div className="min-w-0">
          <div className="text-[24px] font-bold leading-none tracking-[-0.03em] text-cream">
            Acme Corp
          </div>
          <div className="mt-[10px] flex flex-wrap gap-[7px]">
            <span className="bg-white/[0.14] px-[8px] py-[4px] text-[9.5px] font-bold uppercase leading-none tracking-[0.1em] text-cream">
              High priority
            </span>
            <span className="border border-white/30 px-[8px] py-[3px] text-[9.5px] uppercase leading-none tracking-[0.1em] text-cream/90">
              Expansion signal
            </span>
          </div>
        </div>
      </div>

      {/* rows */}
      <div className="px-[20px]">
        <div className="flex h-[40px] items-center justify-between border border-white/[0.09] bg-white/[0.045] px-[10px] text-[11.5px] text-cream">
          <span className="flex items-center gap-[9px]">
            <PersonGlyph className="h-[14px] w-[14px] text-cream/80" />
            Expansion initiative detected
          </span>
          <span className="text-[13px] text-cream/60">↗</span>
        </div>
        <Row icon={<PersonGlyph className="h-[13px] w-[13px]" />} label="Key stakeholder" value="VP Revenue" />
        <Row icon={<PersonLines className="h-[14px] w-[14px]" />} label="Likely priority" value="Pipeline efficiency" />
        <div className="row grid h-[38px] grid-cols-[123px_1fr] items-center border-t border-white/[0.07] pl-[10px] text-[10.5px] whitespace-nowrap">
          <span className="text-cream/85">Suggested next move</span>
          <span className="flex items-center gap-[6px] text-cream">
            Discuss forecasting workflow
            <span className="text-cream/60">→</span>
          </span>
        </div>
      </div>

      {/* footer */}
      <div className="mx-[22px] mt-[10px] flex items-center justify-between border-t border-white/[0.07] pb-[16px] pt-[16px]">
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center">
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/40 bg-[#14151a] text-[9px] text-cream">
              JD
            </span>
            <span className="-ml-[6px] flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/25 bg-[#1b1c22] text-cream/80">
              <PersonGlyph className="h-[12px] w-[12px]" />
            </span>
            <span className="-ml-[6px] flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/20 bg-[#1b1c22] text-[8.5px] text-cream/80">
              +3
            </span>
          </div>
          <span className="text-[10px] text-[#a1a1aa]">Insights from 12 sources</span>
        </div>
        <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-cream/55" aria-hidden>
          <rect x="3" y="13" width="4" height="8" fill="currentColor" />
          <rect x="10" y="4" width="4" height="17" fill="currentColor" />
          <rect x="17" y="9" width="4" height="12" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="row grid h-[38px] grid-cols-[123px_1fr] items-center border-t border-white/[0.07] pl-[10px] text-[10.5px] whitespace-nowrap">
      <span className="flex items-center gap-[9px] text-cream/75">
        <span className="text-cream/55">{icon}</span>
        {label}
      </span>
      <span className="text-cream">{value}</span>
    </div>
  );
}

/* ---------- Desktop / tablet: scaled composition ---------- */
function ScaledDiagram() {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrap} className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: W,
          height: H,
          transform: `scale(${scale ?? 1})`,
          opacity: scale === null ? 0 : 1,
        }}
      >
        {/* connectors */}
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="ln-in" x1="0" x2="1">
              <stop offset="0" stopColor="#a1a1aa" stopOpacity=".9" />
              <stop offset="1" stopColor="#f4efe6" stopOpacity=".9" />
            </linearGradient>
            <linearGradient id="ln-out" x1="0" x2="1">
              <stop offset="0" stopColor="#f4efe6" stopOpacity=".9" />
              <stop offset="1" stopColor="#a1a1aa" stopOpacity=".9" />
            </linearGradient>
          </defs>
          {SOURCES.map((s, i) => (
            <g key={s.key}>
              <path d={srcPath(i)} fill="none" stroke="url(#ln-in)" strokeWidth="1" opacity=".55" />
              <path d={srcPath(i)} fill="none" stroke="#f4efe6" strokeOpacity=".75" strokeWidth="1.4" className="flow-line" style={{ animationDelay: `${i * -0.25}s` }} />
              <circle cx={CORE.x} cy={SRC_END[i]} r="2.2" fill="#fff" />
            </g>
          ))}
          {OUTPUTS.map((o, i) => (
            <g key={o.key}>
              <path d={outPath(i)} fill="none" stroke="url(#ln-out)" strokeWidth="1" opacity=".6" />
              <path d={outPath(i)} fill="none" stroke="#f4efe6" strokeOpacity=".75" strokeWidth="1.4" className="flow-line" style={{ animationDelay: `${i * -0.3}s` }} />
              <circle cx={CORE.x + CORE.w} cy={OUT_START[i]} r="2.2" fill="#fff" />
            </g>
          ))}
        </svg>

        {SOURCES.map((s, i) => (
          <SourceCard
            key={s.key}
            s={s}
            style={{
              left: SRC.x,
              top: SRC.ys[i],
              width: SRC.w,
              height: SRC.h,
              transform: `skewY(${SRC.tilt}deg)`,
              animation: `rise .8s ${0.15 + i * 0.07}s cubic-bezier(.2,.7,.2,1) both`,
            }}
          />
        ))}

        <div
          className="absolute"
          style={{ left: CORE.x, top: CORE.y, width: CORE.w, height: CORE.h, animation: "rise .9s .3s cubic-bezier(.2,.7,.2,1) both" }}
        >
          <CoreCard />
        </div>

        {OUTPUTS.map((o, i) => (
          <OutputCard
            key={o.key}
            o={o}
            style={{
              left: OUT.x,
              top: OUT.ys[i],
              width: OUT.w,
              height: OUT.h,
              transform: `skewY(${OUT.tilt}deg)`,
              animation: `rise .8s ${0.4 + i * 0.07}s cubic-bezier(.2,.7,.2,1) both`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Phones: stacked composition ---------- */
function StackedDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="grid grid-cols-2 gap-2.5">
        {SOURCES.map((s) => (
          <div key={s.key} className="glass relative flex items-center gap-2.5 rounded-[6px] px-3 py-3">
            <div className="flex w-8 shrink-0 items-center justify-center [&>svg]:max-h-[30px] [&>svg]:max-w-[36px]">
              {s.logo}
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-bold leading-[1.2] tracking-[-0.005em] text-cream">{s.title}</div>
              <div className="mt-1.5 text-[11.5px] leading-[1.35] text-[#a1a1aa]">
                {s.sub[0]} {s.sub[1]}
              </div>
            </div>
            <span className="absolute bottom-0 left-1/2 h-[6px] w-[6px] -translate-x-1/2 translate-y-1/2 rounded-full bg-cream/80" />
          </div>
        ))}
      </div>

      <Connector color="blue" />

      <div className="relative z-10">
        <CoreCard compact />
      </div>

      <Connector color="red" />

      <div className="grid grid-cols-2 gap-2.5">
        {OUTPUTS.map((o, i) => (
          <div
            key={o.key}
            className={`glass relative rounded-[6px] px-4 py-3.5 ${i === OUTPUTS.length - 1 ? "col-span-2" : ""}`}
          >
            <div className="flex items-center gap-2.5 text-cream/80">
              <span className="[&>svg]:h-[22px] [&>svg]:w-[22px]">{o.icon}</span>
              <span className="text-[14px] font-bold leading-none tracking-[-0.005em] text-cream">
                {o.title}
              </span>
            </div>
            <div className="mt-2 text-[11px] leading-[1.4] text-[#a1a1aa]">
              {o.sub[0]} {o.sub[1]}
            </div>
            <span className="absolute left-1/2 top-0 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/80" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Connector({ color }: { color: "blue" | "red" }) {
  const c = color === "blue" ? "#a1a1aa" : "#f4efe6";
  return (
    <svg viewBox="0 0 2 44" className="mx-auto block h-11 w-[2px] overflow-visible" aria-hidden>
      <line x1="1" y1="0" x2="1" y2="44" stroke={c} strokeWidth="1.4" className="flow-line" />
    </svg>
  );
}

export default function HeroDiagram() {
  return (
    <>
      <div className="hidden md:block">
        <ScaledDiagram />
      </div>
      <div className="md:hidden">
        <StackedDiagram />
      </div>
    </>
  );
}
