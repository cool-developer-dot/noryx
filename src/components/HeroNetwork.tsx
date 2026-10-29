"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Apollo, FileCsv, Gmail, Globe, Gong, HubSpot, Salesforce } from "./logos";
import { Glyph } from "./ui";

/* Design space for the desktop composition; it is scaled to the available width. */
const W = 1200;
const H = 460;
const CX = 600;
const CY = 230;
const CORE_R = 62;
const SRC_W = 184;

/* `soon` marks tools on the roadmap: shown dimmed, with no live beam into the engine. */
type Src = { key: string; label: string; icon: ReactNode; special?: boolean; soon?: boolean };

const SOURCES: Src[] = [
  { key: "offer", label: "What you sell", icon: <span className="h-[8px] w-[8px] rounded-full bg-accent" />, special: true },
  { key: "csv", label: "Target accounts", icon: <FileCsv className="h-[18px] w-[18px] text-fg-2" /> },
  { key: "apollo", label: "Apollo", icon: <Apollo className="h-[18px] w-[18px]" /> },
  { key: "web", label: "Websites", icon: <Globe className="h-[17px] w-[17px] text-fg-2" /> },
  { key: "hubspot", label: "HubSpot", icon: <HubSpot className="h-[19px] w-[19px]" />, soon: true },
  { key: "sf", label: "Salesforce", icon: <Salesforce className="h-[15px] w-[22px]" />, soon: true },
  { key: "gmail", label: "Gmail", icon: <Gmail className="h-[14px] w-[19px]" />, soon: true },
  { key: "gong", label: "Gong", icon: <Gong className="h-[18px] w-[18px]" />, soon: true },
];

/* sources sit on an arc that bulges towards the core */
const srcPos = SOURCES.map((_, i) => {
  const y = 22 + i * 57;
  const t = (y + 18 - CY) / CY;
  const x = 34 + 118 * (1 - t * t);
  return { x, y };
});

type Out = { key: string; title: string; when: string; sub: string; tag: string; hot?: boolean; icon: ReactNode };

const OUTS: Out[] = [
  {
    key: "signal",
    title: "Signal qualified",
    when: "now",
    sub: "Northwind Market launched payouts in Germany",
    tag: "Act now",
    hot: true,
    icon: <path d="M4 14l4-5 3 3 5-7" />,
  },
  { key: "people", title: "People found", when: "1m", sub: "Head of Payments · VP Finance", tag: "Free search", icon: <path d="M8 8a3 3 0 1 0 0-.01M3 17c.6-3 2.6-4.5 5-4.5s4.4 1.5 5 4.5M14 6.5a2.5 2.5 0 1 1 0 5M15.5 13.5c1.5.4 2.6 1.6 3 3.5" /> },
  { key: "approve", title: "Approval needed", when: "1m", sub: "Reveal 1 email · 1 Apollo credit", tag: "You decide", icon: <path d="M10 2.5l6 2.5v4.5c0 4-2.6 6.8-6 8-3.4-1.2-6-4-6-8V5zM7.2 10l2 2 3.6-4" /> },
  { key: "draft", title: "Draft ready", when: "2m", sub: "4 of 4 sentences cited · not sent", tag: "Edit and copy", icon: <path d="M4 15.5V18h2.5L15 9.5 12.5 7zM14 5.5l2.5 2.5" /> },
];

const OUT_X = 856;
const OUT_W = 318;
const OUT_H = 74;
const OUT_GAP = 16;
const outY = OUTS.map((_, i) => CY - (OUTS.length * OUT_H + (OUTS.length - 1) * OUT_GAP) / 2 + i * (OUT_H + OUT_GAP));

const ORBIT = [
  { label: "Research", x: CX - 196, y: CY - 112, d: 0 },
  { label: "Qualify", x: CX + 92, y: CY - 92, d: 1.4 },
  { label: "Draft", x: CX - 34, y: CY + 116, d: 2.6 },
];

function Cursor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden>
      <path d="M1 1l10 4-4.2 1.4L5.4 11z" fill="#f4efe6" stroke="#07080a" strokeWidth=".8" strokeLinejoin="round" />
    </svg>
  );
}

function OutCard({ o, i, style, className = "" }: { o: Out; i: number; style?: CSSProperties; className?: string }) {
  return (
    <div className={`spot chip flex items-center gap-3.5 px-3.5 ${className}`} style={{ ...style, ["--d" as string]: `${i * 3}s` }}>
      <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[9px] border border-white/10 bg-[#1b1c22]">
        <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] text-fg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {o.icon}
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="truncate text-[14px] font-bold text-fg">{o.title}</span>
          <span className="shrink-0 text-[11.5px] text-dim">{o.when}</span>
        </span>
        <span className="mt-1 flex items-center justify-between gap-3">
          <span className="truncate text-[12.5px] text-muted">{o.sub}</span>
          <span
            className={`shrink-0 rounded-full px-2 py-[3px] text-[10.5px] font-bold ${
              o.hot ? "bg-accent/15 text-[#ff6a5c] ring-1 ring-accent/40" : "bg-white/[0.06] text-fg-2 ring-1 ring-white/10"
            }`}
          >
            {o.tag}
          </span>
        </span>
      </span>
    </div>
  );
}

function Core({ size, font }: { size: string; font: string }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size, fontSize: font }}>
      <span className="pulse-ring absolute inset-0 rounded-full border border-white/25" />
      <span className="pulse-ring absolute inset-0 rounded-full border border-white/20" style={{ ["--d" as string]: "1.4s" }} />
      <span className="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_50%_35%,#1d1e25,#0b0c10_70%)] shadow-[0_0_0_8px_rgba(255,255,255,0.02),0_30px_60px_-20px_rgba(0,0,0,0.9)]">
        <Glyph className="h-[38%] w-[38%]" />
        <span className="mt-[0.27em] font-bold leading-none tracking-[-0.045em] text-fg">NORYX</span>
        <span className="mt-[0.47em] text-[0.57em] uppercase leading-none tracking-[0.2em] text-dim">engine</span>
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- desktop */

function Desktop() {
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
        style={{ width: W, height: H, transform: `scale(${scale ?? 1})`, opacity: scale === null ? 0 : 1 }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="absolute inset-0 overflow-hidden" aria-hidden>
          <defs>
            <linearGradient id="hn-in" x1="0" x2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".1" />
              <stop offset="1" stopColor="#fff" stopOpacity=".26" />
            </linearGradient>
            <linearGradient id="hn-out" x1="0" x2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".26" />
              <stop offset="1" stopColor="#fff" stopOpacity=".1" />
            </linearGradient>
            <radialGradient id="hn-glow">
              <stop offset="0" stopColor="#fff" stopOpacity=".07" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* arcs behind the sources */}
          <g fill="none" stroke="#fff" strokeOpacity=".05">
            <circle cx={-250} cy={CY} r={430} />
            <circle cx={-250} cy={CY} r={470} />
            <circle cx={-250} cy={CY} r={510} />
          </g>
          {/* rings around the core */}
          <circle cx={CX} cy={CY} r={210} fill="url(#hn-glow)" />
          <circle cx={CX} cy={CY} r={94} fill="none" stroke="#fff" strokeOpacity=".09" strokeDasharray="2 6" className="spin-slow" />
          <circle cx={CX} cy={CY} r={134} fill="none" stroke="#fff" strokeOpacity=".06" strokeDasharray="1 9" className="spin-rev" />
          <circle cx={CX} cy={CY} r={176} fill="none" stroke="#fff" strokeOpacity=".035" />

          {/* inbound */}
          {SOURCES.map((s, i) => {
            const x0 = srcPos[i].x + SRC_W;
            const y0 = srcPos[i].y + 18;
            const d = `M${x0} ${y0} C ${x0 + 130} ${y0}, ${CX - 170} ${CY}, ${CX - CORE_R} ${CY}`;
            return (
              <g key={s.key}>
                {s.soon ? (
                  <path d={d} fill="none" stroke="#fff" strokeOpacity=".09" strokeWidth="1" strokeDasharray="3 5" />
                ) : (
                  <>
                    <path d={d} fill="none" stroke="url(#hn-in)" strokeWidth="1" />
                    <path d={d} fill="none" stroke="#f4efe6" strokeOpacity=".75" strokeWidth="1.3" strokeLinecap="round" className="beam" style={{ ["--d" as string]: `${i * 0.45}s` }} />
                  </>
                )}
                <circle cx={x0} cy={y0} r="2.2" fill="#f4efe6" fillOpacity={s.soon ? 0.25 : 0.7} />
              </g>
            );
          })}

          {/* outbound */}
          {OUTS.map((o, i) => {
            const y1 = outY[i] + OUT_H / 2;
            const d = `M${CX + CORE_R} ${CY} C ${CX + 150} ${CY}, ${OUT_X - 110} ${y1}, ${OUT_X} ${y1}`;
            return (
              <g key={o.key}>
                <path d={d} fill="none" stroke="url(#hn-out)" strokeWidth="1" />
                <path d={d} fill="none" stroke="#f4efe6" strokeOpacity=".75" strokeWidth="1.3" strokeLinecap="round" className="beam" style={{ ["--d" as string]: `${0.9 + i * 3}s` }} />
                <circle cx={OUT_X} cy={y1} r="2.2" fill="#f4efe6" fillOpacity=".7" />
              </g>
            );
          })}
        </svg>

        {/* sources */}
        {SOURCES.map((s, i) => (
          <div
            key={s.key}
            className={`hero-in absolute flex h-[36px] items-center gap-2.5 rounded-full px-3.5 text-[13px] ${
              s.special ? "border border-white/25 bg-[#17181e] font-bold text-fg" : "border border-white/[0.09] bg-[#0f1014] text-fg-2"
            }`}
            style={{ left: srcPos[i].x, top: srcPos[i].y, width: SRC_W, ["--d" as string]: `${0.5 + i * 0.05}s` }}
          >
            <span className={`flex w-[22px] shrink-0 items-center justify-center ${s.soon ? "opacity-50" : ""}`}>{s.icon}</span>
            <span className={`truncate ${s.soon ? "text-dim" : ""}`}>{s.label}</span>
            {s.soon && <span className="ml-auto shrink-0 rounded-full px-1.5 py-[2px] text-[9.5px] font-bold uppercase tracking-[0.08em] text-dim ring-1 ring-white/10">Soon</span>}
          </div>
        ))}

        {/* core */}
        <div className="hero-in absolute" style={{ left: CX - CORE_R, top: CY - CORE_R, ["--d" as string]: "0.4s" }}>
          <Core size={`${CORE_R * 2}px`} font="15px" />
        </div>

        {/* the engine's jobs */}
        {ORBIT.map((o) => (
          <div key={o.label} className="hero-in absolute" style={{ left: o.x, top: o.y, ["--d" as string]: `${0.7 + o.d * 0.1}s` }}>
            <div className="float flex items-center gap-1.5" style={{ ["--d" as string]: `${o.d}s` }}>
              <Cursor className="h-[12px] w-[12px] -translate-y-2" />
              <span className="rounded-[7px] border border-white/15 bg-[#e9e5dc] px-2.5 py-1 text-[12.5px] font-bold text-ink shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)]">
                {o.label}
              </span>
            </div>
          </div>
        ))}

        {/* outputs */}
        {OUTS.map((o, i) => (
          <div key={o.key} className="hero-in absolute" style={{ left: OUT_X, top: outY[i], width: OUT_W, height: OUT_H, ["--d" as string]: `${0.8 + i * 0.08}s` }}>
            <OutCard o={o} i={i} className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- phones and tablets */

/* The orbit is drawn in a 360 x 340 design space. --u is one design pixel, so the whole drawing scales with its
   column in CSS alone: no measuring, nothing to pop in after hydration. */
const OW = 360;
const OH = 340;
const OCX = 180;
const OCY = 170;
const OR = 140;
const u = (n: number) => `calc(var(--u) * ${n})`;

function Ring({ r, dash, spin }: { r: number; dash?: string; spin?: "spin-slow" | "spin-rev" }) {
  return (
    <div className={`absolute ${spin ?? ""}`} style={{ left: u(OCX - r), top: u(OCY - r), width: u(r * 2), height: u(r * 2) }}>
      <svg viewBox={`0 0 ${r * 2} ${r * 2}`} className="block h-full w-full" aria-hidden>
        <circle cx={r} cy={r} r={r - 0.5} fill="none" stroke="#fff" strokeOpacity={dash ? 0.1 : 0.05} strokeDasharray={dash} />
      </svg>
    </div>
  );
}

const STATUS = ["Researching", "Qualifying", "Drafting"];

function Orbit() {
  return (
    <div className="mx-auto w-full max-w-[420px] [container-type:inline-size]">
      <div className="relative" style={{ ["--u" as string]: `calc(100cqw / ${OW})`, height: u(OH) }} aria-hidden>
        <div
          className="absolute rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.075),transparent)]"
          style={{ left: u(OCX - 180), top: u(OCY - 180), width: u(360), height: u(360) }}
        />
        <Ring r={166} />
        <Ring r={OR} />
        <Ring r={104} dash="1 7" spin="spin-rev" />
        <Ring r={74} dash="2 6" spin="spin-slow" />

        {/* the sources ride the ring; each one counter-turns so it stays upright */}
        <div className="orbit absolute" style={{ left: u(OCX - OR), top: u(OCY - OR), width: u(OR * 2), height: u(OR * 2) }}>
          {SOURCES.map((s, i) => (
            <div
              key={`spoke-${s.key}`}
              className="absolute"
              style={{ left: `calc(50% - ${u(1)})`, top: `calc(50% - ${u(116)})`, width: u(2), height: u(116), transformOrigin: "50% 100%", transform: `rotate(${i * 45}deg)` }}
            >
              <span className="absolute inset-x-[25%] top-0 bg-white/[0.1]" style={{ height: u(62) }} />
              {!s.soon && (
                <span
                  className="spoke-pulse absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-transparent to-[#f4efe6]"
                  style={{ height: u(16), ["--d" as string]: `${i * 0.45}s` }}
                />
              )}
            </div>
          ))}
          {SOURCES.map((s, i) => {
            const a = ((i * 45 - 90) * Math.PI) / 180;
            return (
              <div key={s.key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: u(OR + OR * Math.cos(a)), top: u(OR + OR * Math.sin(a)) }}>
                <div className="orbit-counter">
                  {s.special ? (
                    <span
                      className="flex items-center whitespace-nowrap rounded-full border border-white/25 bg-[#17181e] font-bold text-fg shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)]"
                      style={{ height: u(32), gap: u(7), paddingInline: u(12), fontSize: u(12.5) }}
                    >
                      <span className="rounded-full bg-accent" style={{ width: u(7), height: u(7) }} />
                      {s.label}
                    </span>
                  ) : (
                    <span
                      className={`flex items-center justify-center border bg-[#111217] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)] ${s.soon ? "border-dashed border-white/15 opacity-45" : "border-white/10"}`}
                      style={{ width: u(44), height: u(44), borderRadius: u(13) }}
                    >
                      <span className="flex items-center justify-center [&>svg]:h-full [&>svg]:w-full" style={{ width: u(22), height: u(22) }}>
                        {s.icon}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute" style={{ left: u(OCX - 50), top: u(OCY - 50) }}>
          <Core size={u(100)} font={u(12.2)} />
        </div>

        {/* what the engine is doing right now */}
        <div className="absolute -translate-x-1/2" style={{ left: u(OCX + 8), top: u(OCY + 72) }}>
          <div className="float flex items-center" style={{ gap: u(5) }}>
            <span style={{ width: u(12), height: u(12), transform: `translateY(${u(-8)})` }}>
              <Cursor className="block h-full w-full" />
            </span>
            <span
              className="relative block overflow-hidden rounded-[7px] border border-white/15 bg-[#e9e5dc] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.9)]"
              style={{ width: u(98), height: u(26), fontSize: u(12.5) }}
            >
              {STATUS.map((w, i) => (
                <span
                  key={w}
                  className={`status-word absolute inset-0 flex items-center justify-center font-bold text-ink ${i === 0 ? "is-first" : ""}`}
                  style={{ ["--d" as string]: `${i * 4 - 13}s` }}
                >
                  {w}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeckCard({ o, first, d }: { o: Out; first: boolean; d: string }) {
  return (
    <div className={`deck-card chip absolute inset-0 flex items-start gap-3 p-3.5 ${first ? "is-first" : ""}`} style={{ ["--d" as string]: d }}>
      <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[9px] border border-white/10 bg-[#1b1c22]">
        <svg viewBox="0 0 20 20" className="h-[18px] w-[18px] text-fg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {o.icon}
        </svg>
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="flex items-center justify-between gap-3">
          <span className="truncate text-[14.5px] font-bold text-fg">{o.title}</span>
          <span
            className={`shrink-0 rounded-full px-2 py-[3px] text-[10.5px] font-bold max-[359px]:hidden ${
              o.hot ? "bg-accent/15 text-[#ff6a5c] ring-1 ring-accent/40" : "bg-white/[0.06] text-fg-2 ring-1 ring-white/10"
            }`}
          >
            {o.tag}
          </span>
        </span>
        <span className="mt-1.5 line-clamp-2 block text-[12.5px] leading-[1.45] text-muted">{o.sub}</span>
      </span>
    </div>
  );
}

/* the outputs take turns at the front of a stack: 4 cards x 3s */
function Deck() {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <p className="sr-only">Signal qualified, people found, approval needed, draft ready.</p>
      <div className="relative h-[88px]" aria-hidden>
        <span className="absolute inset-x-7 -bottom-[16px] h-full rounded-[10px] border border-white/[0.06] bg-[#0d0e12]" />
        <span className="absolute inset-x-3.5 -bottom-[8px] h-full rounded-[10px] border border-white/[0.09] bg-[#111217]" />
        {OUTS.map((o, i) => (
          <DeckCard key={o.key} o={o} first={i === 0} d={`${i * 3 - 13}s`} />
        ))}
      </div>
      <div className="mt-9 flex justify-center gap-1.5" aria-hidden>
        {OUTS.map((o, i) => (
          <span key={o.key} className="relative h-[3px] w-7 overflow-hidden rounded-full bg-white/[0.14]">
            <span className={`deck-bar absolute inset-0 origin-left rounded-full bg-fg ${i === 0 ? "is-first" : ""}`} style={{ ["--d" as string]: `${i * 3 - 13}s` }} />
          </span>
        ))}
      </div>
    </div>
  );
}

function Mobile() {
  return (
    <div className="mx-auto w-full max-w-[440px]">
      <div className="hero-in" style={{ ["--d" as string]: "0.4s" }}>
        <Orbit />
      </div>
      <div className="hero-in" style={{ ["--d" as string]: "0.55s" }}>
        <span className="relative mx-auto mb-4 mt-1 block h-10 w-px overflow-hidden bg-white/[0.12]" aria-hidden>
          <span className="drop absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-transparent to-[#f4efe6]" />
        </span>
        <Deck />
      </div>
    </div>
  );
}

export default function HeroNetwork() {
  return (
    <>
      <div className="hidden lg:block">
        <Desktop />
      </div>
      <div className="lg:hidden">
        <Mobile />
      </div>
    </>
  );
}
