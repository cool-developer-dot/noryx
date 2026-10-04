"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode, type TouchEvent } from "react";
import Reveal from "./Reveal";

const RED = "#ee2f2f";
const COBALT = "#2f6fed";
const GREEN = "#1fa35a";

type Step = {
  q: string;
  answer: string;
  /** "quote" sets the answer in serif (used for the question to ask) */
  tone?: "display" | "quote";
  sub?: string;
  whyLabel: string;
  why: string;
  tag?: [string, "green" | "cobalt" | "red" | "ink"];
};

const STEPS: Step[] = [
  {
    q: "Who are they?",
    answer: "Enterprise software.",
    sub: "1,240 employees · San Francisco, CA",
    whyLabel: "Why it fits",
    why: "A growing B2B software team scaling revenue operations — squarely inside your ideal customer profile.",
    tag: ["92% ICP fit", "green"],
  },
  {
    q: "What are they focused on?",
    answer: "International expansion.",
    sub: "Building Revenue Operations",
    whyLabel: "Why it matters",
    why: "Two new markets are on the roadmap for 2025, and a Revenue Operations function is being built to support them.",
    tag: ["High priority", "red"],
  },
  {
    q: "Who should I speak with?",
    answer: "Sarah Chen",
    sub: "VP Revenue",
    whyLabel: "Why her",
    why: "Recently appointed and likely responsible for improving forecast predictability during expansion.",
    tag: ["Primary stakeholder", "cobalt"],
  },
  {
    q: "What might matter?",
    answer: "Forecast accuracy.",
    sub: "Pipeline visibility · Scalable processes",
    whyLabel: "Why it matters",
    why: "Fragmented forecasting inputs across regions are the most likely pain as the team scales.",
    tag: ["Likely pain", "red"],
  },
  {
    q: "What should I ask?",
    answer: "“How are forecasting inputs currently consolidated across regions?”",
    tone: "quote",
    whyLabel: "Why this question",
    why: "It tests whether expansion is creating visibility problems — without assuming the problem.",
    tag: ["Discovery question", "ink"],
  },
  {
    q: "What should I avoid?",
    answer: "Replacing their stack.",
    sub: "“Replace your current revenue stack.”",
    whyLabel: "Why not",
    why: "Available context suggests ACME is investing in its existing systems. Connect the intelligence already inside the tools they use instead.",
    tag: ["Better frame: connect, don’t replace", "ink"],
  },
  {
    q: "What should I do next?",
    answer: "Speak with Sarah Chen.",
    sub: "Lead with forecasting visibility during international expansion.",
    whyLabel: "NORYX recommends",
    why: "Explore how regional forecasting inputs are consolidated and validate implementation concerns.",
  },
];

const TAG: Record<NonNullable<Step["tag"]>[1], string> = { green: GREEN, cobalt: COBALT, red: RED, ink: "#0c0c14" };

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 10" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M0 5h19M15 1l4 4-4 4" />
    </svg>
  );
}

function Xv({ i, className = "", children }: { i: number; className?: string; children: ReactNode }) {
  return (
    <div className={`xp-rv ${className}`} style={{ ["--i" as string]: i } as CSSProperties}>
      {children}
    </div>
  );
}

function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`font-mono text-[10px] uppercase leading-none tracking-[0.2em] lg:text-[10.5px] ${className}`}>{children}</div>;
}

function Answer({ s, k }: { s: Step; k: number }) {
  const last = k === STEPS.length - 1;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div>
        <Xv i={0}>
          <Mono className="text-[#0c0c14]/55">
            <span className="text-[#ee2f2f]">{String(k + 1).padStart(2, "0")}</span> / {s.q}
          </Mono>
        </Xv>
        <div className="xp-mask mt-4 lg:mt-6">
          <div
            className={`xp-mask-in ${
              s.tone === "quote"
                ? "font-serif text-[1.45rem] font-normal leading-[1.22] text-[#0c0c14] lg:text-[2.25rem] lg:leading-[1.18]"
                : "font-display text-[clamp(2.1rem,10.5vw,2.75rem)] uppercase leading-[0.98] tracking-[-0.005em] text-[#0c0c14] lg:text-[clamp(2.6rem,4.4vw,4.4rem)]"
            }`}
          >
            {s.answer}
          </div>
        </div>
        {s.sub && (
          <Xv i={2}>
            <p className={`mt-3 max-w-[34ch] font-serif text-[1.1rem] font-light leading-[1.35] lg:mt-5 lg:text-[1.35rem] ${last ? "text-[#0c0c14]" : "text-[#3a3b4a]"}`}>{s.sub}</p>
          </Xv>
        )}
      </div>

      <div className="lg:pt-[34px]">
        <Xv i={3}>
          <Mono className={last ? "text-[#ee2f2f]" : "text-[#0c0c14]/55"}>{s.whyLabel}</Mono>
        </Xv>
        <Xv i={4}>
          <p className="mt-3 max-w-[44ch] text-[14.5px] leading-[1.6] text-[#2b2c3a] lg:mt-4 lg:text-[15.5px]">{s.why}</p>
        </Xv>
        {s.tag && (
          <Xv i={5}>
            <div className="mt-4 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0c0c14]/75 lg:mt-5">
              <span className="h-[6px] w-[6px] rounded-full" style={{ background: TAG[s.tag[1]] }} />
              {s.tag[0]}
            </div>
          </Xv>
        )}
        {last && (
          <Xv i={5}>
            <a
              href="#demo"
              className="group mt-6 inline-flex h-[48px] w-full items-center justify-between gap-6 bg-[#ee2f2f] px-6 font-cond text-[16px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#0c0c14] sm:w-auto"
            >
              Prepare discovery questions
              <Arrow className="h-[8px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Xv>
        )}
      </div>
    </div>
  );
}

export default function Experience() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const rail = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0 });
  const [touched, setTouched] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const last = STEPS.length - 1;

  const go = useCallback(
    (n: number) => {
      setTouched(true);
      setI(Math.max(0, Math.min(last, n)));
    },
    [last],
  );

  /* the red progress line: measured under the active question, so it works in the scrolling rail too */
  const measure = useCallback(() => {
    const t = tabs.current[i];
    if (t) setInd({ x: t.offsetLeft, w: t.offsetWidth });
  }, [i]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* keep the active question in view inside the rail (never scrolls the page) */
  useEffect(() => {
    const r = rail.current;
    const t = tabs.current[i];
    if (!r || !t || r.scrollWidth <= r.clientWidth) return;
    r.scrollTo({ left: Math.max(0, t.offsetLeft - 20), behavior: "smooth" });
  }, [i]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = e.key === "ArrowRight" || e.key === "ArrowDown" ? i + 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (n === null) return;
    e.preventDefault();
    const c = Math.max(0, Math.min(last, n));
    go(c);
    tabs.current[c]?.focus({ preventScroll: true });
  };

  /* swipe between answers on touch devices (vertical scrolling is left alone) */
  const onTouchStart = (e: TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const s = touch.current;
    touch.current = null;
    if (!s) return;
    const dx = e.changedTouches[0].clientX - s.x;
    const dy = e.changedTouches[0].clientY - s.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(i + (dx < 0 ? 1 : -1));
  };

  return (
    <Reveal id="product" className="relative overflow-x-clip bg-[#f7f5f0] text-[#0c0c14]">
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-16 sm:px-6 md:pt-20 lg:px-[5vw] lg:pb-[72px] lg:pt-[104px] xl:px-[64px]">
        <div className="grid gap-10 lg:grid-cols-[30fr_70fr] lg:gap-x-[5vw]">
          {/* ------------------------------------------------ left: the question */}
          <div className="min-w-0 lg:pt-1">
            <div className="pfade flex items-center gap-[22px]">
              <span className="h-[3px] w-[28px] bg-[#ee2f2f]" />
              <span className="text-[10.5px] font-medium uppercase tracking-[0.3em]">04 / The NORYX experience</span>
            </div>

            <h2
              className="pfade mt-6 font-display uppercase text-[#0c0c14] lg:mt-9"
              style={{ ["--d" as string]: "0.1s", letterSpacing: "-0.03em", lineHeight: 0.95 } as CSSProperties}
            >
              <span className="block text-[clamp(2.6rem,12.4vw,3.6rem)] lg:text-[clamp(3rem,4.9vw,5rem)]">From research</span>
              <span className="block text-[clamp(2.6rem,12.4vw,3.6rem)] lg:text-[clamp(3rem,4.9vw,5rem)]">
                to revenue
                <span className="ml-[0.05em] inline-block rounded-full bg-[#ee2f2f]" style={{ width: "0.15em", height: "0.15em" }} />
              </span>
            </h2>

            <div className="pfade mt-7 font-serif text-[#0c0c14] lg:mt-12" style={{ ["--d" as string]: "0.2s" } as CSSProperties}>
              <p className="text-[1.05rem] font-light leading-[1.4] text-[#4a4b58] lg:text-[1.2rem]">Open an account and ask:</p>
              <p className="mt-1 text-[1.35rem] font-medium leading-[1.25] lg:text-[1.65rem]">“Prepare me for this account.”</p>
              <p className="mt-5 max-w-[32ch] text-[1.05rem] font-light leading-[1.5] text-[#4a4b58] lg:mt-8 lg:text-[1.15rem]">
                NORYX turns connected context into a brief you can act on.
              </p>
            </div>
          </div>

          {/* ------------------------------------------------ right: one intelligence surface */}
          <div className="pfade min-w-0" style={{ ["--d" as string]: "0.25s" } as CSSProperties}>
            <div className="border border-[#0c0c14]/[0.12] bg-[#fbfaf6]">
              {/* ask (desktop — on mobile the prompt already sits in the intro) */}
              <div className="hidden items-center gap-5 border-b border-[#0c0c14]/[0.1] px-8 py-4 lg:flex">
                <span className="h-[28px] w-[2px] bg-[#ee2f2f]" />
                <div>
                  <Mono className="text-[#0c0c14]/50">Ask NORYX</Mono>
                  <div className="mt-2 font-serif text-[1.35rem] leading-none">
                    <span className="xp-type">Prepare me for this account.</span>
                    <span className="xp-caret ml-[3px] inline-block h-[1.05em] w-px translate-y-[0.18em] bg-[#0c0c14]" aria-hidden />
                  </div>
                </div>
              </div>

              {/* account + synthesis */}
              <div className="px-4 pb-5 pt-5 sm:px-6 lg:px-8 lg:pb-6 lg:pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div className="font-cond text-[24px] font-semibold uppercase leading-none tracking-[0.06em] lg:text-[30px]">Acme Corp</div>
                  <Mono className="flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-nowrap text-[#0c0c14]/55">
                    <span>12 sources</span>
                    <span aria-hidden>·</span>
                    <span>27 signals</span>
                    <span aria-hidden>·</span>
                    <span className="flex items-center gap-1.5 text-[#0c0c14]/80">
                      <span className="h-[6px] w-[6px] rounded-full" style={{ background: GREEN }} />
                      Brief ready
                    </span>
                  </Mono>
                </div>

                <Mono className="mt-5 text-[#ee2f2f] lg:mt-7">Why this account, why now?</Mono>
                <p className="mt-3 max-w-[40ch] font-serif text-[1.3rem] font-normal leading-[1.22] lg:mt-4 lg:max-w-[46ch] lg:text-[1.95rem] lg:leading-[1.2]">
                  ACME is expanding into two new markets while building its Revenue Operations function.
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px] text-[#2b2c3a] lg:mt-5 lg:text-[13.5px]">
                  {["New VP Revenue", "RevOps hiring", "International expansion"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-[5px] w-[5px] rounded-full" style={{ background: COBALT }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* question rail */}
              <div className="border-t border-[#0c0c14]/[0.1]">
                <div className="flex items-center justify-between gap-4 px-4 pt-4 sm:px-6 lg:px-8 lg:pt-5">
                  <span className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0c0c14]/70 lg:text-[10.5px]">
                    <span className={`block h-[6px] w-[6px] rounded-full bg-[#ee2f2f] ${touched ? "" : "xp-ping"}`} aria-hidden />
                    <span className="lg:hidden">Tap a question — 7 in total</span>
                    <span className="hidden lg:inline">Click any question to see its answer</span>
                  </span>
                  <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0c0c14]/40 lg:flex" aria-hidden>
                    <kbd className="border border-[#0c0c14]/20 px-1.5 py-[2px] font-mono text-[10px]">←</kbd>
                    <kbd className="border border-[#0c0c14]/20 px-1.5 py-[2px] font-mono text-[10px]">→</kbd>
                    to browse
                  </span>
                </div>
                <div
                  ref={rail}
                  role="tablist"
                  aria-label="Seven questions"
                  onKeyDown={onKey}
                  className="xp-rail relative overflow-x-auto px-4 sm:px-6 lg:overflow-visible lg:px-8"
                >
                  <div className="relative flex border-b border-[#0c0c14]/[0.12] lg:grid lg:grid-cols-7">
                    {STEPS.map((s, k) => (
                      <button
                        key={s.q}
                        ref={(el) => {
                          tabs.current[k] = el;
                        }}
                        id={`xp-tab-${k}`}
                        role="tab"
                        type="button"
                        aria-selected={i === k}
                        aria-controls={`xp-panel-${k}`}
                        tabIndex={i === k ? 0 : -1}
                        onClick={() => go(k)}
                        className="group relative flex w-[128px] shrink-0 cursor-pointer flex-col items-start justify-start py-4 pr-3 text-left focus-visible:outline-none lg:w-auto lg:pr-4"
                      >
                        <span className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] transition-colors duration-300 ${i === k ? "text-[#ee2f2f]" : "text-[#0c0c14]/45 group-hover:text-[#ee2f2f]"}`}>
                          {String(k + 1).padStart(2, "0")}
                          {k === i + 1 && !touched && <span className="xp-ping block h-[6px] w-[6px] rounded-full bg-[#ee2f2f]" aria-hidden />}
                        </span>
                        <span className={`mt-2 block text-[12.5px] leading-[1.3] transition-colors duration-300 lg:text-[13px] ${i === k ? "text-[#0c0c14]" : "text-[#0c0c14]/50 group-hover:text-[#0c0c14]/80"}`}>
                          {s.q}
                        </span>
                        <span className="pointer-events-none absolute bottom-[-1px] left-0 right-3 h-[2px] origin-left scale-x-0 bg-[#0c0c14]/30 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-focus-visible:bg-[#ee2f2f]" aria-hidden />
                      </button>
                    ))}
                    <span
                      className="xp-ind pointer-events-none absolute bottom-[-1px] left-0 h-[2px] bg-[#ee2f2f]"
                      style={{ transform: `translateX(${ind.x}px)`, width: ind.w }}
                      aria-hidden
                    />
                  </div>
                </div>

                {/* one answer at a time */}
                <div className="px-4 pb-2 pt-6 sm:px-6 lg:px-8 lg:pt-7" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ touchAction: "pan-y" }}>
                  <div className="grid min-h-[300px] sm:min-h-[260px] lg:min-h-[214px]">
                    {STEPS.map((s, k) => (
                      <section
                        key={s.q}
                        id={`xp-panel-${k}`}
                        role="tabpanel"
                        aria-labelledby={`xp-tab-${k}`}
                        aria-hidden={i !== k}
                        inert={i !== k}
                        className={`xp-stage min-w-0 ${i === k ? "is-active" : ""}`}
                      >
                        <Answer s={s} k={k} />
                      </section>
                    ))}
                  </div>
                  <div className={`mt-4 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0c0c14]/45 transition-opacity duration-500 lg:hidden ${touched ? "opacity-0" : "opacity-100"}`} aria-hidden>
                    <Arrow className="xp-hint-l h-[7px] w-[16px] rotate-180 text-[#ee2f2f]" />
                    Swipe for the next answer
                    <Arrow className="xp-hint-r h-[7px] w-[16px] text-[#ee2f2f]" />
                  </div>
                </div>

                {/* controls */}
                <div className="flex items-center justify-between gap-4 border-t border-[#0c0c14]/[0.1] px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
                  <button
                    type="button"
                    onClick={() => go(i - 1)}
                    disabled={i === 0}
                    className="flex h-[40px] items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0c0c14]/60 transition-colors enabled:hover:text-[#0c0c14] disabled:opacity-30"
                  >
                    <Arrow className="h-[7px] w-[16px] rotate-180" />
                    Back
                  </button>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#0c0c14]/45" aria-live="polite">
                    {String(i + 1).padStart(2, "0")} / 07
                  </span>
                  {i < last ? (
                    <button
                      type="button"
                      onClick={() => go(i + 1)}
                      className="group flex min-h-[44px] items-center gap-4 bg-[#0c0c14] py-2 pl-5 pr-4 text-left text-[#f7f5f0] transition-colors hover:bg-[#ee2f2f] lg:min-h-[52px] lg:pl-6 lg:pr-5"
                    >
                      <span>
                        <span className="block font-mono text-[9.5px] uppercase leading-none tracking-[0.2em] text-[#f7f5f0]/60 group-hover:text-white/80">Next question</span>
                        <span className="mt-1.5 hidden max-w-[24ch] text-[13px] leading-none lg:block">{STEPS[i + 1].q}</span>
                      </span>
                      <Arrow className={`h-[8px] w-[18px] shrink-0 ${touched ? "transition-transform duration-300 group-hover:translate-x-1" : "xp-bounce"}`} />
                    </button>
                  ) : (
                    <button type="button" onClick={() => go(0)} className="flex h-[40px] items-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#0c0c14]/60 transition-colors hover:text-[#0c0c14]">
                      Start over
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
