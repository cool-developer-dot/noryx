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

const COBALT = "#4c8dff";

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
  return <div className="font-mono text-[10px] uppercase leading-none tracking-[0.22em] text-cream/50 lg:text-[10.5px]">{children}</div>;
}

function Dot() {
  return <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: COBALT }} />;
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
          <span className="font-display text-[56px] leading-[0.85] tracking-[-0.01em] text-cream lg:text-[132px]">92%</span>
          <span className="pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ff3b3b] lg:pb-3 lg:text-[11px]">Fit</span>
        </Rv>
        <Rv i={2}>
          <p className="mt-4 max-w-[30ch] font-serif text-[1.05rem] font-light leading-[1.4] text-cream/85 lg:mt-6 lg:text-[1.45rem] lg:leading-[1.3]">
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
              <li className="flex items-start gap-3 border-t border-white/10 py-[11px] text-[14px] leading-[1.35] text-cream/90 lg:py-[15px] lg:text-[15.5px]">
                <Dot />
                <span className="flex-1">{t}</span>
                <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/35 lg:inline">{s}</span>
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
          <p className="mt-3 max-w-[26ch] font-serif text-[1.3rem] font-normal leading-[1.22] text-cream lg:mt-5 lg:text-[2.1rem] lg:leading-[1.16]">
            ACME is expanding into two new markets while building its Revenue Operations function.
          </p>
        </Rv>
        <Rv i={2}>
          <p className="mt-3 font-mono text-[10px] uppercase leading-[1.8] tracking-[0.16em] text-cream/45 lg:mt-5 lg:text-[10.5px]">
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
                  <span className={hot ? "text-cream" : "text-cream/45"}>
                    <span className="mr-3 font-mono text-[10px] tracking-[0.12em] text-cream/35">{String(k + 1).padStart(2, "0")}</span>
                    {name}
                  </span>
                  <span className={`font-mono text-[11px] tabular-nums ${hot ? "text-[#ff3b3b]" : "text-cream/35"}`}>{score}</span>
                </div>
                <div className="mt-[10px] h-px bg-white/10">
                  <div className={`hiw-bar h-px ${hot ? "bg-[#ff2a2a]" : "bg-cream/30"}`} style={{ ["--w" as string]: score / 100 } as CSSProperties} />
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
          <div className="mt-3 font-display text-[34px] uppercase leading-[0.95] tracking-[-0.005em] text-cream lg:mt-5 lg:text-[64px]">Sarah Chen</div>
        </Rv>
        <Rv i={2}>
          <p className="mt-2 font-mono text-[10px] uppercase leading-[1.8] tracking-[0.16em] text-cream/50 lg:mt-4 lg:text-[10.5px]">
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
              <span className="pt-[3px] font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff3b3b]">{k}</span>
              <span className="text-[14px] leading-[1.4] text-cream/90 lg:font-serif lg:text-[1.2rem] lg:font-light lg:leading-[1.35]">{v}</span>
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
          <p className="mt-3 max-w-[24ch] font-serif text-[1.35rem] font-light leading-[1.25] text-cream lg:mt-5 lg:text-[2.2rem] lg:leading-[1.2]">
            “Forecasting is still <span className="hiw-underline">largely manual</span> across regions.”
          </p>
        </Rv>
      </div>
      <div>
        <Rv i={2}>
          <Kicker>
            <span className="inline-flex items-center gap-2">
              <Arrow className="h-[7px] w-[14px] rotate-90 text-[#ff3b3b] lg:rotate-0" />
              Turned into intelligence
            </span>
          </Kicker>
        </Rv>
        <ul className="mt-3 lg:mt-5">
          {rows.map(([k, v], n) => (
            <Rv key={k} i={3 + n}>
              <li className="grid grid-cols-[84px_1fr] gap-3 border-t border-white/10 py-[11px] lg:grid-cols-[110px_1fr] lg:py-[17px]">
                <span className="pt-[3px] font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff3b3b]">{k}</span>
                <span className="text-[14px] leading-[1.35] text-cream/90 lg:text-[16px]">{v}</span>
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
      <span className="hiw-stub absolute -left-[34px] bottom-[4px] hidden h-px w-[30px] bg-[#ff2a2a] lg:block" aria-hidden />
      <div className="flex flex-col lg:justify-between">
        <Rv i={0}>
          <Kicker>Next best action</Kicker>
        </Rv>
        <div className="relative mt-3 lg:mt-0">
          <Rv i={1}>
            <h3 className="font-display text-[36px] uppercase leading-[0.96] tracking-[-0.005em] text-cream lg:text-[68px]">Speak with Sarah Chen.</h3>
          </Rv>
          <Rv i={2}>
            <p className="mt-3 max-w-[34ch] font-serif text-[1.05rem] font-light leading-[1.4] text-cream/80 lg:mt-5 lg:text-[1.35rem]">
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
            <span className="inline-flex h-[44px] items-center gap-4 border border-[#ff2a2a] px-5 font-cond text-[15px] font-semibold uppercase tracking-[0.14em] text-[#ff3b3b]">
              Prepare discovery questions
              <Arrow className="h-[8px] w-[16px]" />
            </span>
            <span className="font-mono text-[9.5px] uppercase leading-[1.7] tracking-[0.2em] text-cream/45">
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
    <span className="hiw-odo font-display text-[26px] leading-none text-cream lg:text-[40px]" aria-hidden>
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
  } ${reached ? "border-[#ff2a2a] bg-[#ff2a2a]" : "border-white/30 bg-[#0c0e13]"} ${
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
      <div className="mx-auto flex max-w-[1600px] flex-col px-5 pb-14 pt-14 sm:px-6 lg:min-h-[min(100svh,980px)] lg:px-[5vw] lg:pb-14 lg:pt-[116px] xl:px-[64px]">
        <div className="grid flex-1 gap-6 lg:grid-cols-[25fr_75fr] lg:gap-x-[4vw]">
          {/* ------------------------------------------------ left: intro + stage navigation */}
          <div className="min-w-0">
            <div className="pfade flex items-center gap-[18px]">
              <span className="h-[3px] w-[28px] bg-[#ff2a2a]" />
              <span className="text-[10.5px] font-medium uppercase tracking-[0.3em]">03 / How NORYX works</span>
            </div>

            <h2
              className="pfade mt-5 font-display uppercase text-cream [text-wrap:balance] lg:mt-8"
              style={{ ["--d" as string]: "0.1s", letterSpacing: "-0.03em", lineHeight: 0.98 } as CSSProperties}
            >
              <span className="block text-[clamp(1.75rem,8.4vw,3rem)] lg:text-[clamp(2rem,2.9vw,3.1rem)]">One intelligence layer.</span>
              <span className="block text-[clamp(1.75rem,8.4vw,3rem)] lg:text-[clamp(2rem,2.9vw,3.1rem)]">Every stage of the deal.</span>
            </h2>

            {/* stage rail (mobile) / vertical list (desktop) */}
            <div
              ref={rail}
              role="tablist"
              aria-label="Deal stages"
              aria-orientation="vertical"
              onKeyDown={onKey}
              className="pfade hiw-rail -mx-5 mt-6 flex overflow-x-auto px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-12 lg:flex-col lg:overflow-visible lg:px-0"
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
                    i === k ? "is-active text-[#ff3b3b]" : "text-cream/45 hover:text-cream/80"
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-[0.14em] lg:w-6 lg:text-[11px]">{s.n}</span>
                  <span className="font-cond text-[15px] font-semibold uppercase leading-none tracking-[0.12em] lg:font-display lg:text-[26px] lg:font-normal lg:tracking-[0.01em]">
                    {s.label}
                  </span>
                  <span className="hiw-tab-line absolute bottom-0 left-3 right-3 h-[2px] bg-[#ff2a2a] group-first:left-0 lg:hidden" aria-hidden />
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
                  <div className="font-cond text-[24px] font-semibold uppercase leading-none tracking-[0.06em] text-cream lg:text-[34px]">Acme Corp</div>
                  <div className="mt-2 font-mono text-[9.5px] uppercase leading-[1.6] tracking-[0.16em] text-cream/45 lg:text-[10.5px]">
                    Enterprise software
                    <span className="hidden sm:inline"> · 1,240 employees</span>
                    <span className="hidden lg:inline"> · San Francisco, CA</span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="flex items-baseline justify-end gap-1.5">
                    <Odometer i={i} />
                    <span className="font-mono text-[10px] tracking-[0.1em] text-cream/40">/05</span>
                  </div>
                  <div className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#ff3b3b] lg:text-[10.5px]">{STAGES[i].label}</div>
                </div>
              </div>

              {/* context ledger — what this one account has accumulated so far (desktop) */}
              <ul className="hidden flex-wrap items-center gap-x-3 gap-y-1 px-8 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] lg:flex" aria-label="Context so far">
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
                  <span className="hiw-fill-x absolute inset-x-0 top-1/2 h-px bg-[#ff2a2a]" />
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
                  <span className="hiw-fill-y absolute bottom-[4px] left-1/2 top-[4px] w-px -translate-x-1/2 bg-[#ff2a2a]" />
                  {STAGES.map((s, k) => (
                    <span
                      key={s.n}
                      className={node(k, i, k === STAGES.length - 1 ? "square" : "round")}
                      style={{ left: "50%", top: `calc(4px + (100% - 8px) * ${k / 4})` }}
                    />
                  ))}
                </div>

                <div className="grid min-h-[272px] sm:min-h-[260px] lg:min-h-[340px]">
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
                      <span className="hiw-seg absolute inset-0 bg-[#ff2a2a]" style={{ transform: `scaleX(${k <= i ? 1 : 0})` }} />
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
                    className="group flex h-[44px] flex-1 items-center justify-between gap-6 bg-[#ff2a2a] px-5 font-cond text-[16px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#07080a] lg:w-[240px] lg:flex-none"
                  >
                    <span className="whitespace-nowrap">
                      Next<span className="hidden lg:inline"> · {STAGES[i + 1].label}</span>
                    </span>
                    <Arrow className="h-[8px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                ) : (
                  <a
                    href="#demo"
                    className="group flex h-[44px] flex-1 items-center justify-between gap-6 bg-[#ff2a2a] px-5 font-cond text-[16px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#07080a] lg:w-[240px] lg:flex-none"
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
          <p className="font-mono text-[10.5px] font-medium uppercase leading-[1.9] tracking-[0.2em] sm:text-[11px]">
            <span className="block text-[#ff3b3b]">Research becomes context.</span>
            <span className="block text-[#ff3b3b]">Context becomes conversation.</span>
            <span className="block text-cream">Conversation becomes action.</span>
          </p>
          <a href="#demo" className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/65 transition-colors hover:text-white">
            One continuous revenue workflow
            <Arrow className="h-[8px] w-[16px] text-[#ff3b3b] transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}
