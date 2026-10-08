"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode, type TouchEvent } from "react";
import Reveal from "./Reveal";

type Step = {
  q: string;
  answer: string;
  /** "quote" sets the answer in serif (used for the question to ask) */
  tone?: "display" | "quote";
  sub?: string;
  whyLabel: string;
  why: string;
  tag?: string;
};

const STEPS: Step[] = [
  {
    q: "Who are they?",
    answer: "Enterprise software.",
    sub: "1,240 employees · San Francisco, CA",
    whyLabel: "Why it fits",
    why: "A growing B2B software team scaling revenue operations — squarely inside your ideal customer profile.",
    tag: "92% ICP fit",
  },
  {
    q: "What are they focused on?",
    answer: "International expansion.",
    sub: "Building Revenue Operations",
    whyLabel: "Why it matters",
    why: "Two new markets are on the roadmap for 2025, and a Revenue Operations function is being built to support them.",
    tag: "High priority",
  },
  {
    q: "Who should I speak with?",
    answer: "Sarah Chen",
    sub: "VP Revenue",
    whyLabel: "Why her",
    why: "Recently appointed and likely responsible for improving forecast predictability during expansion.",
    tag: "Primary stakeholder",
  },
  {
    q: "What might matter?",
    answer: "Forecast accuracy.",
    sub: "Pipeline visibility · Scalable processes",
    whyLabel: "Why it matters",
    why: "Fragmented forecasting inputs across regions are the most likely pain as the team scales.",
    tag: "Likely pain",
  },
  {
    q: "What should I ask?",
    answer: "“How are forecasting inputs currently consolidated across regions?”",
    tone: "quote",
    whyLabel: "Why this question",
    why: "It tests whether expansion is creating visibility problems — without assuming the problem.",
    tag: "Discovery question",
  },
  {
    q: "What should I avoid?",
    answer: "Replacing their stack.",
    sub: "“Replace your current revenue stack.”",
    whyLabel: "Why not",
    why: "Available context suggests ACME is investing in its existing systems. Connect the intelligence already inside the tools they use instead.",
    tag: "Better frame: connect, don’t replace",
  },
  {
    q: "What should I do next?",
    answer: "Speak with Sarah Chen.",
    sub: "Lead with forecasting visibility during international expansion.",
    whyLabel: "NORYX recommends",
    why: "Explore how regional forecasting inputs are consolidated and validate implementation concerns.",
  },
];

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
  return <div className={`text-[12px] uppercase leading-none tracking-[0.14em] ${className}`}>{children}</div>;
}

function Answer({ s, k }: { s: Step; k: number }) {
  const last = k === STEPS.length - 1;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div>
        <Xv i={0}>
          <Mono className="text-[#52525b]">{s.q}</Mono>
        </Xv>
        <div className="xp-mask mt-4 lg:mt-5">
          <div
            className={`xp-mask-in ${
              s.tone === "quote"
                ? "text-[1.5rem] leading-[1.25] tracking-[-0.035em] text-[#0c0c14] lg:text-[2.125rem] lg:leading-[1.2]"
                : "h-display text-[clamp(2rem,9vw,2.5rem)] text-[#0c0c14] lg:text-[clamp(2.5rem,4vw,3.75rem)]"
            }`}
          >
            {s.answer}
          </div>
        </div>
        {s.sub && (
          <Xv i={2}>
            <p className="mt-3 max-w-[36ch] text-[17px] leading-[1.5] text-[#52525b] lg:mt-5 lg:text-[19px]">{s.sub}</p>
          </Xv>
        )}
      </div>

      <div className="lg:pt-[30px]">
        <Xv i={3}>
          <Mono className="text-[#52525b]">{s.whyLabel}</Mono>
        </Xv>
        <Xv i={4}>
          <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.6] text-[#3f3f46] lg:mt-4 lg:text-[17px]">{s.why}</p>
        </Xv>
        {s.tag && (
          <Xv i={5}>
            <div className="mt-4 flex items-center gap-2.5 text-[13px] text-[#52525b] lg:mt-5">
              <span className="h-[6px] w-[6px] rounded-full bg-[#0c0c14]" />
              {s.tag}
            </div>
          </Xv>
        )}
        {last && (
          <Xv i={5}>
            <a href="#demo" className="btn-primary group mt-6 !w-full !justify-between sm:!w-auto">
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
      <div className="section-x section-y mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-[30fr_70fr] lg:gap-x-[5vw]">
          {/* ------------------------------------------------ left: the question */}
          <div className="min-w-0">
            <p className="eyebrow eyebrow-light pfade">The experience</p>

            <h2 className="h-display pfade mt-5 text-[#0c0c14] lg:mt-6" style={{ ["--d" as string]: "0.1s" } as CSSProperties}>
              <span className="block text-[clamp(2.25rem,9vw,3rem)] lg:text-[clamp(2.5rem,3.7vw,3.75rem)]">From research to revenue.</span>
            </h2>

            <div className="pfade mt-7 lg:mt-10" style={{ ["--d" as string]: "0.2s" } as CSSProperties}>
              <p className="body-copy body-copy-light">Open an account and ask:</p>
              <p className="mt-2 text-[22px] font-bold leading-[1.25] tracking-[-0.03em] lg:text-[26px]">“Prepare me for this account.”</p>
              <p className="body-copy body-copy-light mt-6 max-w-[34ch]">NORYX turns connected context into a brief you can act on.</p>
            </div>
          </div>

          {/* ------------------------------------------------ right: one intelligence surface */}
          <div className="pfade min-w-0" style={{ ["--d" as string]: "0.25s" } as CSSProperties}>
            <div className="border border-[#0c0c14]/[0.12] bg-[#fbfaf6]">
              {/* ask (desktop — on mobile the prompt already sits in the intro) */}
              <div className="hidden items-center gap-5 border-b border-[#0c0c14]/[0.1] px-8 py-4 lg:flex">
                <span className="h-[28px] w-[2px] bg-[#0c0c14]" />
                <div>
                  <Mono className="text-[#71717a]">Ask NORYX</Mono>
                  <div className="mt-2 text-[1.25rem] leading-none tracking-[-0.02em]">
                    <span className="xp-type">Prepare me for this account.</span>
                    <span className="xp-caret ml-[3px] inline-block h-[1.05em] w-px translate-y-[0.18em] bg-[#0c0c14]" aria-hidden />
                  </div>
                </div>
              </div>

              {/* account + synthesis */}
              <div className="px-4 pb-5 pt-5 sm:px-6 lg:px-8 lg:pb-6 lg:pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div className="text-[24px] font-bold leading-none tracking-[-0.045em] lg:text-[30px]">Acme Corp</div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#52525b]">
                    <span>12 sources</span>
                    <span aria-hidden>·</span>
                    <span>27 signals</span>
                    <span aria-hidden>·</span>
                    <span className="flex items-center gap-1.5 text-[#0c0c14]">
                      <span className="h-[6px] w-[6px] rounded-full bg-[#0c0c14]" />
                      Brief ready
                    </span>
                  </div>
                </div>

                <Mono className="mt-5 text-[#52525b] lg:mt-7">Why this account, why now?</Mono>
                <p className="mt-3 max-w-[40ch] text-[1.375rem] font-bold leading-[1.22] tracking-[-0.035em] lg:mt-4 lg:max-w-[46ch] lg:text-[1.875rem] lg:leading-[1.2]">
                  ACME is expanding into two new markets while building its Revenue Operations function.
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-[#3f3f46] lg:mt-5">
                  {["New VP Revenue", "RevOps hiring", "International expansion"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-[5px] w-[5px] rounded-full bg-[#71717a]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* question rail */}
              <div className="border-t border-[#0c0c14]/[0.1]">
                <div className="flex items-center justify-between gap-4 px-4 pt-4 sm:px-6 lg:px-8 lg:pt-5">
                  <span className="flex items-center gap-2.5 text-[13px] text-[#3f3f46]">
                    <span className={`block h-[6px] w-[6px] rounded-full bg-accent ${touched ? "" : "xp-ping"}`} aria-hidden />
                    <span className="lg:hidden">Tap a question to see its answer</span>
                    <span className="hidden lg:inline">Click any question to see its answer</span>
                  </span>
                  <span className="hidden items-center gap-2 text-[12px] text-[#71717a] lg:flex" aria-hidden>
                    <kbd className="border border-[#0c0c14]/20 px-1.5 py-[2px] text-[11px]">←</kbd>
                    <kbd className="border border-[#0c0c14]/20 px-1.5 py-[2px] text-[11px]">→</kbd>
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
                        className="group relative flex w-[132px] shrink-0 cursor-pointer items-start gap-2 py-4 pr-3 text-left focus-visible:outline-none lg:w-auto lg:pr-4"
                      >
                        <span className={`text-[13.5px] leading-[1.3] tracking-[-0.005em] transition-colors duration-300 ${i === k ? "font-bold text-[#0c0c14]" : "text-[#52525b] group-hover:text-[#0c0c14]"}`}>
                          {s.q}
                        </span>
                        {k === i + 1 && !touched && <span className="xp-ping mt-[6px] block h-[6px] w-[6px] shrink-0 rounded-full bg-accent" aria-hidden />}
                        <span className="pointer-events-none absolute bottom-[-1px] left-0 right-3 h-[2px] origin-left scale-x-0 bg-[#0c0c14]/30 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-focus-visible:bg-accent" aria-hidden />
                      </button>
                    ))}
                    <span
                      className="xp-ind pointer-events-none absolute bottom-[-1px] left-0 h-[2px] bg-accent"
                      style={{ transform: `translateX(${ind.x}px)`, width: ind.w }}
                      aria-hidden
                    />
                  </div>
                </div>

                {/* one answer at a time */}
                <div className="px-4 pb-2 pt-6 sm:px-6 lg:px-8 lg:pt-7" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ touchAction: "pan-y" }}>
                  <div className="grid min-h-[320px] sm:min-h-[280px] lg:min-h-[236px]">
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
                  <div className={`mt-4 flex items-center justify-center gap-3 text-[13px] text-[#71717a] transition-opacity duration-500 lg:hidden ${touched ? "opacity-0" : "opacity-100"}`} aria-hidden>
                    <Arrow className="xp-hint-l h-[7px] w-[16px] rotate-180" />
                    Swipe for the next answer
                    <Arrow className="xp-hint-r h-[7px] w-[16px]" />
                  </div>
                </div>

                {/* controls */}
                <div className="flex items-center justify-between gap-4 border-t border-[#0c0c14]/[0.1] px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
                  <button
                    type="button"
                    onClick={() => go(i - 1)}
                    disabled={i === 0}
                    className="flex h-[44px] items-center gap-3 text-[14px] text-[#52525b] transition-colors enabled:hover:text-[#0c0c14] disabled:opacity-30"
                  >
                    <Arrow className="h-[7px] w-[16px] rotate-180" />
                    Back
                  </button>
                  <div className="hidden items-center gap-1.5 sm:flex" role="img" aria-label={`Question ${i + 1} of ${STEPS.length}`}>
                    {STEPS.map((s, k) => (
                      <span key={s.q} className={`h-[3px] rounded-full transition-all duration-300 ${k === i ? "w-6 bg-[#0c0c14]" : "w-[10px] bg-[#0c0c14]/20"}`} />
                    ))}
                  </div>
                  {i < last ? (
                    <button
                      type="button"
                      onClick={() => go(i + 1)}
                      className="btn-primary group !h-[48px] !gap-4 !px-5"
                    >
                      <span className="sm:hidden">Next</span>
                      <span className="hidden text-left sm:block">
                        <span className="block text-[11px] uppercase leading-none tracking-[0.12em] opacity-70">Next question</span>
                        <span className="mt-1 hidden max-w-[24ch] text-[14px] leading-none lg:block">{STEPS[i + 1].q}</span>
                      </span>
                      <Arrow className={`h-[8px] w-[18px] shrink-0 ${touched ? "transition-transform duration-300 group-hover:translate-x-1" : "xp-bounce"}`} />
                    </button>
                  ) : (
                    <button type="button" onClick={() => go(0)} className="flex h-[44px] items-center text-[14px] text-[#52525b] transition-colors hover:text-[#0c0c14]">
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
