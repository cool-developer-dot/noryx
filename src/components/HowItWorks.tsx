"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import Reveal from "./Reveal";

const STAGES = [
  { n: "01", label: "Discover" },
  { n: "02", label: "Prioritize" },
  { n: "03", label: "Prepare" },
  { n: "04", label: "Understand" },
  { n: "05", label: "Act" },
];

/** What the account has "learned" by the end of each stage (desktop ledger). */
const LEDGER = ["Fit 92%", "Expansion signal", "Brief ready", "Pain identified", "Action recommended"];

const DOT = "#a1a1aa";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 10" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M0 5h19M15 1l4 4-4 4" />
    </svg>
  );
}

/** Reveal wrapper: children of the active stage rise in one after another. */
function Rv({ i, className = "", children }: { i: number; className?: string; children: ReactNode }) {
  return (
    <div className={`hiw-rv ${className}`} style={{ ["--i" as string]: i } as CSSProperties}>
      {children}
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return <div className="text-[12px] uppercase leading-none tracking-[0.14em] text-[#a1a1aa]">{children}</div>;
}

function Dot() {
  return <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: DOT }} />;
}

/* ---------------------------------------------------------------- stage content */

function Discover() {
  const signals = [
    ["Expansion into 2 new markets", "Sales Navigator"],
    ["New VP Revenue", "LinkedIn"],
    ["Revenue Operations hiring", "Apollo"],
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div>
        <Rv i={0}>
          <Kicker>Account match</Kicker>
        </Rv>
        <Rv i={1} className="mt-3 flex items-end gap-3 lg:mt-5">
          <span className="text-[64px] font-bold leading-[0.85] tracking-[-0.06em] text-accent lg:text-[132px]">92%</span>
          <span className="pb-1 text-[12px] uppercase tracking-[0.14em] text-[#a1a1aa] lg:pb-3">Fit</span>
        </Rv>
        <Rv i={2}>
          <p className="mt-4 max-w-[30ch] text-[1.0625rem] leading-[1.5] text-[#d4d4d8] lg:mt-6 lg:text-[1.375rem] lg:leading-[1.45]">
            Strong ICP match with relevant growth signals.
          </p>
        </Rv>
      </div>
      <div className="lg:pt-1">
        <Rv i={3}>
          <Kicker>Why ACME?</Kicker>
        </Rv>
        <ul className="mt-3 lg:mt-5">
          {signals.map(([t, s], k) => (
            <Rv key={t} i={4 + k}>
              <li className="flex items-start gap-3 border-t border-white/10 py-[12px] text-[16px] leading-[1.4] text-[#e4e4e7] lg:py-[16px] lg:text-[17px]">
                <Dot />
                <span className="flex-1">{t}</span>
                <span className="hidden text-[12px] text-[#71717a] lg:inline">{s}</span>
              </li>
            </Rv>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Prioritize() {
  const rank = [
    ["ACME Corp", 92, true],
    ["Northwind Systems", 71, false],
    ["Helix Group", 64, false],
  ] as const;
  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div>
        <Rv i={0}>
          <Kicker>Why now</Kicker>
        </Rv>
        <Rv i={1}>
          <p className="mt-3 max-w-[26ch] text-[1.375rem] font-bold leading-[1.2] tracking-[-0.03em] text-cream lg:mt-5 lg:text-[2.125rem] lg:leading-[1.15]">
            ACME is expanding into two new markets while building its Revenue Operations function.
          </p>
        </Rv>
        <Rv i={2}>
          <p className="mt-3 text-[13px] leading-[1.6] text-[#a1a1aa] lg:mt-5">
            Expansion signal · 3 sources · updated 08:42
          </p>
        </Rv>
      </div>
      <div>
        <Rv i={3}>
          <Kicker>
            <span className="lg:hidden">Priority · #1 of 24 accounts</span>
            <span className="hidden lg:inline">Ranked by fit × timing</span>
          </Kicker>
        </Rv>
        <ul className="mt-3 lg:mt-5">
          {rank.map(([name, score, hot], k) => (
            <Rv key={name} i={4 + k} className={hot ? "" : "hidden lg:block"}>
              <li className="border-t border-white/10 py-3 lg:py-[16px]">
                <div className="flex items-baseline justify-between text-[14px] lg:text-[15.5px]">
                  <span className={hot ? "text-cream" : "text-[#71717a]"}>
                    
                    {name}
                  </span>
                  <span className={`text-[14px] font-bold tabular-nums ${hot ? "text-accent" : "text-[#71717a]"}`}>{score}</span>
                </div>
                <div className="mt-[10px] h-px bg-white/10">
                  <div className={`hiw-bar h-px ${hot ? "bg-accent" : "bg-cream/30"}`} style={{ ["--w" as string]: score / 100 } as CSSProperties} />
                </div>
              </li>
            </Rv>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Prepare() {
  const rows = [
    ["Open with", "Forecast visibility during international expansion."],
    ["Ask", "How are forecasting inputs consolidated across regions?"],
    ["Avoid", "Replacing their current revenue stack."],
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
      <div>
        <Rv i={0}>
          <Kicker>Pre-call brief</Kicker>
        </Rv>
        <Rv i={1}>
          <div className="mt-3 text-[36px] font-bold leading-[1] tracking-[-0.045em] text-cream lg:mt-5 lg:text-[60px]">Sarah Chen</div>
        </Rv>
        <Rv i={2}>
          <p className="mt-2 text-[14px] leading-[1.6] text-[#a1a1aa] lg:mt-4">
            VP Revenue · primary stakeholder
            <span className="hidden lg:inline">
              <br />
              New role · 2 months
            </span>
          </p>
        </Rv>
      </div>
      <ul className="lg:pt-1">
        {rows.map(([k, v], n) => (
          <Rv key={k} i={3 + n}>
            <li className="grid grid-cols-[72px_1fr] gap-3 border-t border-white/10 py-[11px] lg:grid-cols-[104px_1fr] lg:py-[18px]">
              <span className="pt-[3px] text-[12px] uppercase tracking-[0.14em] text-[#a1a1aa]">{k}</span>
              <span className="text-[16px] leading-[1.5] text-[#e4e4e7] lg:text-[1.125rem]">{v}</span>
            </li>
          </Rv>
        ))}
      </ul>
    </div>
  );
}

function Understand() {
  const rows = [
    ["Pain", "Manual forecasting"],
    ["Need", "Pipeline visibility"],
    ["Objection", "Implementation complexity"],
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
      <div>
        <Rv i={0}>
          <Kicker>Conversation · 42:17</Kicker>
        </Rv>
        <Rv i={1}>
          <p className="mt-3 max-w-[24ch] text-[1.375rem] leading-[1.3] tracking-[-0.02em] text-cream lg:mt-5 lg:text-[2.125rem] lg:leading-[1.22]">
            “Forecasting is still <span className="hiw-underline">largely manual</span> across regions.”
          </p>
        </Rv>
      </div>
      <div>
        <Rv i={2}>
          <Kicker>
            <span className="inline-flex items-center gap-2">
              <Arrow className="h-[7px] w-[14px] rotate-90 text-cream/70 lg:rotate-0" />
              Turned into intelligence
            </span>
          </Kicker>
        </Rv>
        <ul className="mt-3 lg:mt-5">
          {rows.map(([k, v], n) => (
            <Rv key={k} i={3 + n}>
              <li className="grid grid-cols-[84px_1fr] gap-3 border-t border-white/10 py-[11px] lg:grid-cols-[110px_1fr] lg:py-[17px]">
                <span className="pt-[3px] text-[12px] uppercase tracking-[0.14em] text-[#a1a1aa]">{k}</span>
                <span className="text-[16px] leading-[1.4] text-[#e4e4e7] lg:text-[17px]">{v}</span>
              </li>
            </Rv>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Act() {
  const why = ["Confirmed expansion signal", "New VP Revenue in seat", "Open forecasting pain"];
  return (
    <div className="relative grid gap-5 lg:min-h-full lg:grid-cols-[1.25fr_1fr] lg:gap-14">
      {/* the intelligence thread ends here: a stub from the last node into the action */}
      <span className="hiw-stub absolute -left-[34px] bottom-[4px] hidden h-px w-[30px] bg-accent lg:block" aria-hidden />
      <div className="flex flex-col lg:justify-between">
        <Rv i={0}>
          <Kicker>Next best action</Kicker>
        </Rv>
        <div className="relative mt-3 lg:mt-0">
          <Rv i={1}>
            <h3 className="h-display text-[38px] text-cream lg:text-[64px]">Speak with Sarah Chen.</h3>
          </Rv>
          <Rv i={2}>
            <p className="mt-3 max-w-[34ch] text-[1.0625rem] leading-[1.5] text-[#d4d4d8] lg:mt-5 lg:text-[1.25rem]">
              Lead with forecast visibility during international expansion.
            </p>
          </Rv>
        </div>
      </div>
      <div className="lg:self-end">
        <Rv i={3} className="hidden lg:block">
          <Kicker>Why this action</Kicker>
          <ul className="mt-5">
            {why.map((w) => (
              <li key={w} className="flex items-start gap-3 border-t border-white/10 py-[13px] text-[15px] text-cream/85">
                <Dot />
                {w}
              </li>
            ))}
          </ul>
        </Rv>
        <Rv i={4}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:mt-5">
            <span className="inline-flex h-[46px] items-center gap-4 border border-white/35 px-5 text-[15px] font-bold tracking-[-0.005em] text-cream">
              Prepare discovery questions
              <Arrow className="h-[8px] w-[16px]" />
            </span>
            <span className="text-[12px] leading-[1.5] text-[#a1a1aa]">
              Human decision
              <br />
              required
            </span>
          </div>
        </Rv>
      </div>
    </div>
  );
}

const PANELS = [Discover, Prioritize, Prepare, Understand, Act];

/* ---------------------------------------------------------------- thread + number */

function Odometer({ i }: { i: number }) {
  return (
    <span className="hiw-odo text-[28px] font-bold leading-none tracking-[-0.04em] text-cream lg:text-[40px]" aria-hidden>
      <span className="hiw-odo-col" style={{ transform: `translateY(${-i * 20}%)` }}>
        {STAGES.map((s) => (
          <span key={s.n}>{s.n}</span>
        ))}
      </span>
    </span>
  );
}

function node(k: number, i: number, shape: "round" | "square") {
  const reached = k <= i;
  const current = k === i;
  return `absolute block h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 border transition-[background-color,border-color,box-shadow] duration-500 ${
    shape === "square" ? "" : "rounded-full"
  } ${reached ? "border-accent bg-accent" : "border-white/30 bg-[#0c0e13]"} ${
    current ? "shadow-[0_0_0_4px_rgba(255,42,42,0.16)]" : ""
  }`;
}

export default function HowItWorks() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const rail = useRef<HTMLDivElement>(null);
  const p = i / (STAGES.length - 1);

  const go = (n: number) => setI(Math.max(0, Math.min(STAGES.length - 1, n)));

  /* keep the active tab visible inside the horizontal rail (never scrolls the page) */
  useEffect(() => {
    const r = rail.current;
    const t = tabs.current[i];
    if (!r || !t || r.scrollWidth <= r.clientWidth) return;
    r.scrollTo({ left: Math.max(0, t.offsetLeft - 20), behavior: "smooth" });
  }, [i]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? i + 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? STAGES.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = Math.max(0, Math.min(STAGES.length - 1, next));
    go(n);
    tabs.current[n]?.focus({ preventScroll: true });
  };

  return (
    <Reveal id="how-it-works" className="relative bg-[#07080a] text-cream">
      <div className="section-x section-y mx-auto flex max-w-[1600px] flex-col">
        <div className="mb-10 max-w-[860px] lg:mb-14">
          <p className="eyebrow pfade">How it works</p>
          <h2 className="h-display h-section pfade mt-5 text-cream lg:mt-6" style={{ ["--d" as string]: "0.1s" } as CSSProperties}>
            One intelligence layer. Every stage of the deal.
          </h2>
        </div>
        <div className="grid flex-1 gap-6 lg:grid-cols-[25fr_75fr] lg:gap-x-[4vw]">
          {/* ------------------------------------------------ left: stage navigation */}
          <div className="min-w-0">

            {/* stage rail (mobile) / vertical list (desktop) */}
            <div
              ref={rail}
              role="tablist"
              aria-label="Deal stages"
              aria-orientation="vertical"
              onKeyDown={onKey}
              className="pfade hiw-rail -mx-5 flex overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
              style={{ ["--d" as string]: "0.2s" } as CSSProperties}
            >
              {STAGES.map((s, k) => (
                <button
                  key={s.n}
                  ref={(el) => {
                    tabs.current[k] = el;
                  }}
                  id={`hiw-tab-${k}`}
                  role="tab"
                  type="button"
                  aria-selected={i === k}
                  aria-controls={`hiw-panel-${k}`}
                  tabIndex={i === k ? 0 : -1}
                  onClick={() => go(k)}
                  className={`hiw-tab group relative flex shrink-0 items-baseline gap-2 whitespace-nowrap px-3 py-3 text-left transition-colors duration-300 first:pl-0 lg:gap-4 lg:border-t lg:border-white/10 lg:px-0 lg:py-[14px] ${
                    i === k ? "is-active text-accent" : "text-[#a1a1aa] hover:text-cream"
                  }`}
                >
                  <span className="text-[12px] tabular-nums tracking-[0.04em] lg:w-7 lg:text-[13px]">{s.n}</span>
                  <span className="text-[16px] font-bold leading-none tracking-[-0.01em] lg:text-[26px] lg:tracking-[-0.035em]">
                    {s.label}
                  </span>
                  <span className="hiw-tab-line absolute bottom-0 left-3 right-3 h-[2px] bg-accent group-first:left-0 lg:hidden" aria-hidden />
                </button>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------ right: one product canvas */}
          <div className="pfade min-w-0" style={{ ["--d" as string]: "0.3s" } as CSSProperties}>
            <div className="hiw-canvas relative flex h-full flex-col border border-white/[0.1] bg-[#0c0e13]">
              {/* header */}
              <div className="flex items-start justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-7">
                <div className="min-w-0">
                  <div className="text-[26px] font-bold leading-none tracking-[-0.045em] text-cream lg:text-[34px]">Acme Corp</div>
                  <div className="mt-2 text-[13px] leading-[1.5] text-[#a1a1aa]">
                    Enterprise software
                    <span className="hidden sm:inline"> · 1,240 employees</span>
                    <span className="hidden lg:inline"> · San Francisco, CA</span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="flex items-baseline justify-end gap-1.5">
                    <Odometer i={i} />
                    <span className="text-[12px] tracking-[0.04em] text-[#71717a]">/05</span>
                  </div>
                  <div className="mt-2 text-[12px] uppercase tracking-[0.14em] text-accent">{STAGES[i].label}</div>
                </div>
              </div>

              {/* context ledger — what this one account has accumulated so far (desktop) */}
              <ul className="hidden flex-wrap items-center gap-x-3 gap-y-1 px-8 pt-5 text-[13px] lg:flex" aria-label="Context so far">
                {LEDGER.map((l, k) => (
                  <li key={l} className={`hiw-ledger flex items-center gap-3 ${k <= i ? "is-on" : ""}`}>
                    {k > 0 && <span className="text-cream/20">/</span>}
                    <span className="text-cream/65">{l}</span>
                  </li>
                ))}
              </ul>

              {/* intelligence thread — horizontal on mobile */}
              <div className="px-4 pt-5 sm:px-6 lg:hidden" aria-hidden>
                <div className="relative mx-[4px] h-[7px]" style={{ ["--p" as string]: p } as CSSProperties}>
                  <span className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
                  <span className="hiw-fill-x absolute inset-x-0 top-1/2 h-px bg-accent" />
                  {STAGES.map((s, k) => (
                    <span key={s.n} className={node(k, i, k === STAGES.length - 1 ? "square" : "round")} style={{ left: `${(k / 4) * 100}%`, top: "50%" }} />
                  ))}
                </div>
              </div>

              {/* body */}
              <div className="grid flex-1 grid-cols-1 px-4 pb-1 pt-5 sm:px-6 lg:grid-cols-[28px_minmax(0,1fr)] lg:gap-x-6 lg:px-8 lg:pb-2 lg:pt-8">
                {/* intelligence thread — vertical on desktop */}
                <div className="relative hidden lg:block" style={{ ["--p" as string]: p } as CSSProperties} aria-hidden>
                  <span className="absolute bottom-[4px] left-1/2 top-[4px] w-px -translate-x-1/2 bg-white/15" />
                  <span className="hiw-fill-y absolute bottom-[4px] left-1/2 top-[4px] w-px -translate-x-1/2 bg-accent" />
                  {STAGES.map((s, k) => (
                    <span
                      key={s.n}
                      className={node(k, i, k === STAGES.length - 1 ? "square" : "round")}
                      style={{ left: "50%", top: `calc(4px + (100% - 8px) * ${k / 4})` }}
                    />
                  ))}
                </div>

                <div className="grid min-h-[272px] sm:min-h-[260px] lg:min-h-[330px]">
                  {PANELS.map((Panel, k) => (
                    <section
                      key={STAGES[k].n}
                      id={`hiw-panel-${k}`}
                      role="tabpanel"
                      aria-labelledby={`hiw-tab-${k}`}
                      aria-hidden={i !== k}
                      inert={i !== k}
                      className={`hiw-stage min-w-0 ${i === k ? "is-active" : ""}`}
                    >
                      <Panel />
                    </section>
                  ))}
                </div>
              </div>

              {/* footer: progress + controls */}
              <div className="flex items-center gap-3 border-t border-white/[0.08] px-4 py-3 sm:px-6 lg:gap-6 lg:px-8 lg:py-4">
                <div className="hidden flex-1 items-center gap-2 lg:flex" aria-hidden>
                  {STAGES.map((s, k) => (
                    <span key={s.n} className="relative h-[2px] flex-1 bg-white/10">
                      <span className="hiw-seg absolute inset-0 bg-accent" style={{ transform: `scaleX(${k <= i ? 1 : 0})` }} />
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => go(i - 1)}
                  disabled={i === 0}
                  aria-label="Previous stage"
                  className="flex h-[44px] w-[44px] shrink-0 items-center justify-center border border-white/15 text-cream/70 transition-colors enabled:hover:border-white/40 enabled:hover:text-cream disabled:opacity-30"
                >
                  <Arrow className="h-[8px] w-[16px] rotate-180" />
                </button>

                {i < STAGES.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => go(i + 1)}
                    className="group flex h-[44px] flex-1 items-center justify-between gap-6 bg-accent px-5 text-[16px] font-bold tracking-[-0.01em] text-[#14080a] transition-colors hover:bg-white hover:text-[#07080a] lg:w-[240px] lg:flex-none"
                  >
                    <span className="whitespace-nowrap">
                      Next<span className="hidden lg:inline"> · {STAGES[i + 1].label}</span>
                    </span>
                    <Arrow className="h-[8px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                ) : (
                  <a
                    href="#demo"
                    className="group flex h-[44px] flex-1 items-center justify-between gap-6 bg-accent px-5 text-[16px] font-bold tracking-[-0.01em] text-[#14080a] transition-colors hover:bg-white hover:text-[#07080a] lg:w-[240px] lg:flex-none"
                  >
                    Book a demo
                    <Arrow className="h-[8px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ closing statement */}
        <div className="pfade mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 lg:mt-10 lg:flex-row lg:items-end lg:justify-between" style={{ ["--d" as string]: "0.4s" } as CSSProperties}>
          <p className="text-[16px] leading-[1.7] text-[#a1a1aa] lg:text-[18px]">
            <span className="block">Research becomes context.</span>
            <span className="block">Context becomes conversation.</span>
            <span className="block font-bold text-cream">Conversation becomes action.</span>
          </p>
          <a href="#demo" className="group inline-flex items-center gap-3 text-[14px] text-[#c4c4cc] transition-colors hover:text-white">
            One continuous revenue workflow
            <Arrow className="h-[8px] w-[16px] transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}
