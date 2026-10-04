"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "./Reveal";
import { ApolloLogo, CalendarLogo, GmailLogo, LinkedInLogo, SalesforceLogo } from "./icons";

const W = 1536;
const H = 495;
const RED = "#ee2f2f";
const INK = "#0c0c14";

const abs = (x: number, y: number, w?: number, h?: number, d = 0): CSSProperties => {
  const s: Record<string, string | number> = { left: x, top: y, "--d": `${d}s` };
  if (w !== undefined) s.width = w;
  if (h !== undefined) s.height = h;
  return s as CSSProperties;
};

function Fade({ x, y, w, h, d, className = "", style, children }: { x: number; y: number; w?: number; h?: number; d?: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div className={`pfade absolute ${className}`} style={{ ...abs(x, y, w, h, d), ...style }}>
      {children}
    </div>
  );
}

/* ---------- logos ---------- */
function Starburst({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <g stroke="#6a4cf0" strokeWidth="2.6" strokeLinecap="round">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16;
          const r1 = i % 2 ? 8 : 6;
          const r2 = i % 2 ? 15 : 18;
          return <line key={i} x1={(20 + Math.cos(a) * r1).toFixed(2)} y1={(20 + Math.sin(a) * r1).toFixed(2)} x2={(20 + Math.cos(a) * r2).toFixed(2)} y2={(20 + Math.sin(a) * r2).toFixed(2)} stroke={i % 3 === 0 ? "#8a6bff" : "#5b3df0"} />;
        })}
      </g>
    </svg>
  );
}

function OpenAI({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="#0c0c14" strokeWidth="1.9" strokeLinejoin="round" aria-hidden>
      {[0, 60, 120].map((r) => (
        <path key={r} transform={`rotate(${r} 16 16)`} d="M16 3.500 24.500 8.400v9.800L16 23.100 7.500 18.200V8.400z" />
      ))}
    </svg>
  );
}

const TOOLS: { key: string; title: string; sub: string[]; logo: ReactNode; x: number; w: number }[] = [
  { key: "crm", title: "CRM", sub: ["Salesforce"], logo: <SalesforceLogo className="h-[30px] w-[42px]" />, x: 82, w: 176 },
  { key: "email", title: "Email", sub: ["Google Workspace"], logo: <GmailLogo className="h-[28px] w-[38px]" />, x: 273, w: 192 },
  { key: "nav", title: "Sales Navigator", sub: ["LinkedIn"], logo: <LinkedInLogo className="h-[37px] w-[37px]" />, x: 480, w: 189 },
  { key: "apollo", title: "Apollo", sub: ["Prospecting"], logo: <ApolloLogo className="h-[38px] w-[38px]" />, x: 684, w: 187 },
  { key: "calls", title: "Calls", sub: ["Conversation", "intelligence"], logo: <span className="flex h-[40px] w-[40px] items-center justify-center bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"><Starburst className="h-[34px] w-[34px]" /></span>, x: 886, w: 189 },
  { key: "cal", title: "Calendar", sub: ["Meetings", "& scheduling"], logo: <CalendarLogo className="h-[40px] w-[40px]" />, x: 1089, w: 191 },
  { key: "ai", title: "AI Models", sub: ["GPT, Claude", "and more"], logo: <OpenAI className="h-[38px] w-[38px]" />, x: 1295, w: 167 },
];

function ToolCard({ t, compact = false }: { t: (typeof TOOLS)[number]; compact?: boolean }) {
  return (
    <div className={`tool-card flex h-full w-full items-center border border-[#e8e5de] bg-[#fbfaf7] ${compact ? "gap-[10px] px-3" : "gap-[14px] px-[16px]"}`}>
      <span className="flex w-[42px] shrink-0 items-center justify-center">{t.logo}</span>
      <div className="min-w-0">
        <div className="whitespace-nowrap text-[12px] font-semibold leading-none text-[#0c0c14]">{t.title}</div>
        <div className="mt-[7px] text-[10.5px] leading-[1.45] text-[#7a7b86]">
          {t.sub.map((l) => (
            <span key={l} className="block whitespace-nowrap">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Eyebrow() {
  return (
    <div className="flex items-center gap-[27px]">
      <span className="h-[3px] w-[36px] bg-[#ee2f2f]" />
      <span className="text-[10.5px] font-medium uppercase tracking-[0.3em] text-[#0c0c14]">05 / Built for your team &amp; stack</span>
    </div>
  );
}

function Headline({ flow = false }: { flow?: boolean }) {
  const line = flow ? "pfade block whitespace-nowrap text-[clamp(1.8rem,8.4vw,5.4rem)] leading-[1]" : "pfade block text-[84px] leading-[84px]";
  return (
    <h2 className="font-display uppercase text-[#0c0c14]" style={{ letterSpacing: "-0.035em" }}>
      <span className={line}>Your tools stay.</span>
      <span className={line} style={{ ["--d" as string]: "0.12s" }}>
        Your team gets smarter.
        <span className="ml-[0.08em] inline-block rounded-full bg-[#ee2f2f]" style={{ width: "0.15em", height: "0.15em" }} />
      </span>
    </h2>
  );
}

const COPY = "NORYX connects intelligence across the tools your revenue team already uses — bringing the right context to every seller, leader, and operator at the right moment.";

/* ---------- desktop stage ---------- */

const BUS = 422;
const GREY_PATHS = [
  { id: "p-email", d: `M373 390 V${BUS - 10} Q373 ${BUS} 383 ${BUS} H676` },
  { id: "p-nav", d: `M575 390 V${BUS - 10} Q575 ${BUS} 585 ${BUS} H676` },
  { id: "p-calls", d: `M972 390 V${BUS - 10} Q972 ${BUS} 962 ${BUS} H872` },
  { id: "p-cal", d: `M1175 390 V${BUS - 10} Q1175 ${BUS} 1165 ${BUS} H972` },
  { id: "p-apollo", d: "M768 390 V413" },
  { id: "p-ai", d: "M1375 390 V402" },
];
const IN_PATH = "M169 390 V431 Q169 441 179 441 H690";
const OUT_PATH = "M870 442 L1262 448";
const DOTS = [169, 373, 575, 768, 972, 1175, 1375];

function Stage() {
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
    <div ref={wrap} className="relative mx-auto w-full max-w-[1920px]" style={{ aspectRatio: `${W} / ${H}` }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale ?? 1})`, opacity: scale === null ? 0 : 1 }}
      >
        {/* lines */}
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="pointer-events-none absolute inset-0" aria-hidden>
          {/* stack bracket */}
          <path d="M74 312 V294 H88 M280 294 H1462 V312" stroke={INK} strokeOpacity=".28" fill="none" />
          {/* gap dots */}
          {[78, 267, 474, 678, 880, 1083, 1288].map((x) => (
            <circle key={x} cx={x} cy="346" r="1.4" fill={INK} opacity=".55" />
          ))}
          {/* tool -> hub (draw on, then pulses travel along each line) */}
          <g stroke={INK} strokeOpacity=".3" strokeWidth="1" fill="none">
            {GREY_PATHS.map((g, k) => (
              <path key={g.id} id={g.id} d={g.d} pathLength={1} className="draw" style={{ ["--d" as string]: `${0.9 + k * 0.12}s` }} />
            ))}
          </g>
          {DOTS.map((x) => (
            <circle key={x} cx={x} cy="390" r="2" fill={INK} opacity=".7" />
          ))}
          <circle cx="678" cy={BUS} r="3" fill="#f7f5f0" stroke={INK} strokeOpacity=".5" />
          <circle cx="868" cy={BUS} r="3" fill="#f7f5f0" stroke={INK} strokeOpacity=".5" />
          {/* red flows */}
          <path id="p-in" d={IN_PATH} pathLength={1} className="draw" style={{ ["--d" as string]: "1.1s" }} stroke={RED} strokeWidth="1" fill="none" />
          <path d="M692 441 l-8 -3 v6z" fill={RED} className="pfade" style={{ ["--d" as string]: "2.2s" }} />
          <path id="p-out" d={OUT_PATH} pathLength={1} className="draw" style={{ ["--d" as string]: "1.5s" }} stroke={RED} strokeWidth="1" fill="none" />
          <path d="M1266 448 l-8 -3 v6z" fill={RED} className="pfade" style={{ ["--d" as string]: "2.6s" }} />
          <circle cx="870" cy="442" r="2.4" fill={RED} />
          <g className="pulses">
            {GREY_PATHS.slice(0, 5).map((g, k) => (
              <circle key={g.id} r="2.3" fill={INK} opacity=".75">
                <animateMotion dur={`${3.4 + k * 0.35}s`} begin={`${2.2 + k * 0.5}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1">
                  <mpath href={`#${g.id}`} />
                </animateMotion>
              </circle>
            ))}
            <circle r="3" fill={RED}>
              <animateMotion dur="3.6s" begin="2.4s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1">
                <mpath href="#p-in" />
              </animateMotion>
            </circle>
            <circle r="3" fill={RED}>
              <animateMotion dur="3.6s" begin="3.4s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1">
                <mpath href="#p-out" />
              </animateMotion>
            </circle>
          </g>
        </svg>

        {/* header */}
        <div className="absolute" style={{ left: 73, top: 33 }}>
          <Eyebrow />
        </div>
        <div className="absolute" style={{ left: 70, top: 72 }}>
          <Headline />
        </div>
        <span className="absolute w-px bg-[#0c0c14]/30" style={{ left: 975, top: 143, height: 104 }} />
        <Fade x={1024} y={140} w={430} d={0.3} className="font-serif text-[22px] font-light leading-[27px] text-[#14141f]">
          NORYX connects intelligence across the tools your revenue team already uses — bringing the right context to every seller, leader, and operator at the right moment.
        </Fade>

        {/* stack */}
        <Fade x={90} y={286} d={0.3} className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-[#0c0c14]">
          Your existing stack
        </Fade>
        {TOOLS.map((t, i) => (
          <Fade key={t.key} x={t.x} y={313} w={t.w} h={69} d={0.35 + i * 0.06}>
            <div className="tool-float h-full w-full" style={{ animationDelay: `${1.6 + i * 0.35}s` }}>
              <ToolCard t={t} />
            </div>
          </Fade>
        ))}

        {/* hub */}
        <Fade x={700} y={413} w={144} h={63} d={0.5} className="hub-pulse flex items-center justify-center bg-[#0c0c10]">
          <span className="font-display text-[38px] leading-none tracking-[-0.01em] text-white">NORYX</span>
          <span className="pulse-dot ml-[6px] mt-[16px] h-[8px] w-[8px] rounded-full bg-[#ee2f2f]" />
        </Fade>
        <Fade x={1288} y={431} d={0.55} className="text-[10.5px] font-medium uppercase leading-[17px] tracking-[0.22em] text-[#0c0c14]">
          Connected
          <br />
          revenue intelligence
        </Fade>

      </div>
    </div>
  );
}

/* ---------- tablet / phone flow ---------- */

function Flow() {
  return (
    <div className="px-5 pb-6 pt-10 sm:px-8 md:pt-14">
      <Eyebrow />
      <div className="mt-6">
        <Headline flow />
      </div>
      <p className="pfade mt-7 max-w-[560px] font-serif text-[clamp(1.1rem,4.4vw,1.4rem)] font-light leading-[1.4] text-[#14141f]" style={{ ["--d" as string]: "0.2s" }}>
        {COPY}
      </p>

      {/* stack */}
      <div className="mt-12 text-[10px] font-medium uppercase tracking-[0.28em]">Your existing stack</div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {TOOLS.map((t) => (
          <div key={t.key} className="pfade h-[72px]">
            <ToolCard t={t} compact />
          </div>
        ))}
        <div className="pfade col-span-2 flex h-[72px] items-center justify-center gap-3 bg-[#0c0c10] md:col-span-1">
          <span className="font-display text-[34px] leading-none text-white">NORYX</span>
          <span className="mt-[14px] h-[7px] w-[7px] rounded-full bg-[#ee2f2f]" />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-4 text-[10px] font-medium uppercase leading-[1.7] tracking-[0.22em]">
        <span className="h-px w-10 bg-[#ee2f2f]" />
        Connected revenue intelligence
      </div>

    </div>
  );
}

export default function Stack() {
  return (
    <Reveal id="integrations" className="relative overflow-hidden bg-[#f7f5f0] text-[#0c0c14]">
      <div className="relative hidden xl:block">
        <Stage />
      </div>
      <div className="relative xl:hidden">
        <Flow />
      </div>
    </Reveal>
  );
}
