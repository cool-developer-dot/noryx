"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "./Reveal";
import { Apollo } from "./logos";
import { SectionHead } from "./ui";

const DUR = 7; /* seconds each step stays on screen */

const pi = (i: number) => ({ "--i": i }) as CSSProperties;

function Pill({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "hot" | "solid" }) {
  const c =
    tone === "hot"
      ? "bg-accent/15 text-[#ff6a5c] ring-accent/40"
      : tone === "solid"
        ? "bg-fg text-ink ring-transparent font-bold"
        : "bg-white/[0.05] text-fg-2 ring-white/12";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] ring-1 ${c}`}>{children}</span>;
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="h-[14px] w-[14px] shrink-0 text-fg" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[11.5px] uppercase tracking-[0.12em] text-dim">{children}</p>;
}

/* ---------------------------------------------------------------- panels */

function Profile() {
  return (
    <>
      <div className="pi flex items-center justify-between gap-3" style={pi(0)}>
        <span className="text-[15px] font-bold text-fg">Seller profile</span>
        <Pill>Version 3 · approved</Pill>
      </div>
      <div className="pi mt-5" style={pi(1)}>
        <Label>What you sell</Label>
        <p className="mt-2 text-[16px] leading-[1.45] text-fg">Cross-border payouts for online marketplaces</p>
      </div>
      <div className="pi mt-5" style={pi(2)}>
        <Label>Who it is for</Label>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Marketplaces", "200 to 2,000 people", "EU and UK"].map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>
      <div className="pi mt-5" style={pi(3)}>
        <Label>Buyer roles</Label>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Head of Payments", "VP Finance", "CFO"].map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>
      <div className="pi mt-5 grid gap-2 sm:grid-cols-2" style={pi(4)}>
        <div className="rounded-[10px] border border-white/10 p-3">
          <Label>Approved proof point</Label>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-fg-2">Cuts payout costs by 30% across 120 marketplaces</p>
        </div>
        <div className="rounded-[10px] border border-white/10 p-3">
          <Label>Never claim</Label>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-fg-2">&ldquo;Guaranteed savings&rdquo;</p>
        </div>
      </div>
    </>
  );
}

const TARGETS = [
  { name: "Northwind Market", domain: "northwind-market.example", ok: true },
  { name: "Helix Group", domain: "helixgroup.example", ok: true },
  { name: "Arcadia", domain: "", ok: false },
  { name: "Kestrel Freight", domain: "kestrel-freight.example", ok: true },
];

function Targets() {
  return (
    <>
      <div className="pi flex items-center justify-between gap-3" style={pi(0)}>
        <span className="text-[15px] font-bold text-fg">Target accounts</span>
        <span className="text-[12.5px] text-muted">4 of 10 in your allowance</span>
      </div>
      <ul className="mt-4">
        {TARGETS.map((t, k) => (
          <li key={t.name} className="pi flex flex-wrap items-center gap-3 border-b border-white/[0.07] py-3.5 last:border-b-0" style={pi(k + 1)}>
            <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[#1b1c22] text-[12px] font-bold text-fg-2">{t.name[0]}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-bold text-fg">{t.name}</span>
              <span className="block truncate text-[12.5px] text-muted">{t.ok ? t.domain : "Two companies match this name"}</span>
            </span>
            {t.ok ? (
              <span className="flex items-center gap-1.5 text-[12.5px] text-fg-2">
                <Check /> Confirmed
              </span>
            ) : (
              <span className="flex w-full gap-1.5 sm:w-auto">
                <Pill tone="solid">Arcadia Labs</Pill>
                <Pill>Arcadia Health</Pill>
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

const RUN = [
  { t: "Confirm the company", w: 1 },
  { t: "Read 12 permitted sources", w: 1 },
  { t: "Date every event", w: 1 },
  { t: "Judge relevance to your offer", w: 0.72 },
  { t: "Write the brief", w: 0.2 },
];

function Research() {
  return (
    <>
      <div className="pi flex items-center justify-between gap-3" style={pi(0)}>
        <span className="text-[15px] font-bold text-fg">Researching Northwind Market</span>
        <span className="text-[12.5px] text-muted">Step 4 of 5</span>
      </div>
      <ul className="mt-5 space-y-4">
        {RUN.map((r, k) => (
          <li key={r.t} className="pi" style={pi(k + 1)}>
            <div className="flex items-center justify-between gap-3 text-[13.5px]">
              <span className={r.w === 1 ? "text-fg-2" : "text-fg"}>{r.t}</span>
              {r.w === 1 ? <Check /> : <span className="text-[12px] text-dim">{Math.round(r.w * 100)}%</span>}
            </div>
            <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/[0.07]">
              <div className={`bar h-full rounded-full ${r.w === 1 ? "bg-fg/70" : "bg-accent"}`} style={{ "--w": r.w, "--i": k } as CSSProperties} />
            </div>
          </li>
        ))}
      </ul>
      <div className="pi mt-6 flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-4" style={pi(6)}>
        <Pill tone="hot">Act now 1</Pill>
        <Pill>Monitor 2</Pill>
        <Pill>Background 4</Pill>
        <span className="ml-auto text-[12px] text-dim">Partial results are labelled</span>
      </div>
    </>
  );
}

function PeopleStep() {
  return (
    <>
      <div className="pi flex items-center justify-between gap-3" style={pi(0)}>
        <span className="text-[15px] font-bold text-fg">People to approach</span>
        <span className="flex items-center gap-2 text-[12.5px] text-muted">
          <Apollo className="h-[14px] w-[14px]" /> Free search
        </span>
      </div>
      <div className="pi mt-4 flex flex-wrap gap-1.5" style={pi(1)}>
        <Pill tone="solid">Head of Payments</Pill>
        <Pill>VP Finance</Pill>
        <Pill>CFO</Pill>
      </div>
      <ul className="mt-4">
        {[
          ["PR", "Priya R.", "Head of Payments", "Best match"],
          ["DK", "Daniel K.", "VP Finance", ""],
        ].map(([i, n, r, b], k) => (
          <li key={n} className="pi flex items-center gap-3 border-b border-white/[0.07] py-3" style={pi(k + 2)}>
            <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#1f2027] text-[11px] font-bold text-fg-2">{i}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-bold text-fg">{n}</span>
              <span className="block text-[12.5px] text-muted">{r}</span>
            </span>
            {b && <Pill>{b}</Pill>}
          </li>
        ))}
      </ul>
      <div className="pi mt-5 rounded-[12px] border border-white/15 bg-white/[0.03] p-4" style={pi(4)}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[14px] font-bold text-fg">Reveal Priya&apos;s email</span>
          <Pill>Awaiting you</Pill>
        </div>
        <p className="mt-2 text-[12.5px] leading-[1.55] text-muted">Your Apollo connection · 1 credit if an email is found · approval covers this person and this field only.</p>
      </div>
    </>
  );
}

function Act() {
  return (
    <>
      <div className="pi flex items-center justify-between gap-3" style={pi(0)}>
        <span className="text-[15px] font-bold text-fg">Draft for Priya R.</span>
        <Pill>Not sent</Pill>
      </div>
      <div className="pi mt-4 rounded-[12px] border border-white/10 p-4 text-[13.5px] leading-[1.6] text-fg-2" style={pi(1)}>
        I saw Northwind Market now pays sellers in Germany and France <span className="text-muted">[1]</span>. New corridors often mean new payout reconciliation work. Would a short call next week help?
      </div>
      <div className="pi mt-3 flex flex-wrap gap-2" style={pi(2)}>
        <span className="rounded-full bg-accent px-3.5 py-1.5 text-[12.5px] font-bold text-[#14080a]">Copy draft</span>
        <span className="rounded-full px-3.5 py-1.5 text-[12.5px] text-fg-2 ring-1 ring-white/15">Export .txt</span>
      </div>
      <div className="pi mt-6" style={pi(3)}>
        <Label>History</Label>
        <ul className="mt-2.5 space-y-2 text-[13px] text-fg-2">
          {[
            ["Lookup approved by you", "09:14"],
            ["Apollo returned an email", "09:14"],
            ["Draft checked: 3 sentences, 0 flagged", "09:15"],
          ].map(([t, w]) => (
            <li key={t} className="flex items-center gap-2.5">
              <Check />
              <span className="flex-1">{t}</span>
              <span className="text-[12px] text-dim">{w}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const STEPS = [
  {
    t: "Tell NORYX what you sell",
    d: "Describe your offering, ideal customers, buyer roles and approved proof points. NORYX suggests, you approve, and every recommendation records the version it used.",
    panel: <Profile />,
  },
  {
    t: "Add your target accounts",
    d: "Paste five to ten companies or import a CSV. When a name could mean two companies, NORYX asks you instead of guessing.",
    panel: <Targets />,
  },
  {
    t: "Research and qualify",
    d: "A bounded run reads permitted sources, dates every event and judges it against what you sell. Weak evidence is reported as weak.",
    panel: <Research />,
  },
  {
    t: "Find the right people",
    d: "See the roles worth approaching and candidates from a free Apollo search. Contact details wait for your approval.",
    panel: <PeopleStep />,
  },
  {
    t: "Approve and act",
    d: "Approve the exact action once, then get a draft checked sentence by sentence. Copy or export it. Nothing is sent for you.",
    panel: <Act />,
  },
];

export default function Steps() {
  const [i, setI] = useState(0);
  const [run, setRun] = useState(0); /* restarts the progress line on manual selection */
  const [paused, setPaused] = useState(true);
  const [hover, setHover] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  /* only advance while the section is on screen */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = (k: number) => {
    setI(k);
    setRun((r) => r + 1);
  };

  return (
    <Reveal id="how" className="relative border-t border-white/[0.08]">
      <div className="frame pad-x py-14 lg:py-20">
        <SectionHead
          eyebrow="How it works"
          title="One engine, from what you sell to who to contact."
          lede="NORYX does the research and the checking. You make the calls that matter: who to contact, what to spend and what to send."
        />

        <div ref={root} className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          {/* steps */}
          <ol className="rv" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {STEPS.map((s, k) => {
              const on = k === i;
              return (
                <li key={s.t} className={`relative ${on ? `step-active ${paused || hover ? "is-paused" : ""}` : k < i ? "step-done" : ""}`}>
                  <span className="absolute inset-x-0 top-0 h-px bg-white/[0.1]" />
                  <span
                    key={on ? `run-${run}` : "idle"}
                    className={`step-bar absolute inset-x-0 top-0 h-px ${on ? "bg-fg" : "bg-white/25"}`}
                    style={{ "--dur": `${DUR}s` } as CSSProperties}
                    onAnimationEnd={() => on && pick((i + 1) % STEPS.length)}
                  />
                  <button type="button" onClick={() => pick(k)} aria-expanded={on} className="group flex w-full items-baseline justify-between gap-6 py-5 text-left lg:py-6">
                    <span className={`text-[19px] font-bold tracking-[-0.025em] transition-colors duration-300 lg:text-[22px] ${on ? "text-fg" : "text-dim group-hover:text-fg-2"}`}>{s.t}</span>
                    <span className={`shrink-0 text-[13px] tabular-nums transition-colors duration-300 ${on ? "text-accent" : "text-dim"}`}>{String(k + 1).padStart(2, "0")}</span>
                  </button>
                  <div className="faq-body" data-open={on}>
                    <div>
                      <p className="max-w-[46ch] pb-6 text-[15px] leading-[1.6] text-muted">{s.d}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* product panel */}
          <div className="rv" style={{ "--d": "0.1s" } as CSSProperties} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="ui relative grid min-h-[420px] overflow-hidden p-2 sm:min-h-[432px] sm:p-3">
              {STEPS.map((s, k) => (
                <div key={s.t} className={`panel rounded-[10px] border border-white/[0.08] bg-[#0e0f13] p-5 sm:p-6 ${k === i ? "is-on" : ""}`} aria-hidden={k !== i} inert={k !== i}>
                  {s.panel}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
