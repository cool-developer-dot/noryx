import Reveal from "./Reveal";

/** Where the "Book a demo" button should send people (booking page, Calendly link, mailto: …). */
const DEMO_URL = "#demo";

const VB_W = 560;
const VB_H = 430;

type Node = { id: string; x: number; y: number; label: string; tone: "blue" | "red" | "white"; d: string; dx?: number; dy?: number };

const NODES: Node[] = [
  { id: "crm", x: 110, y: 12, label: "CRM", tone: "blue", d: "M110 12 H214 C228 12 228 20 228 34 V150 C228 215 330 215 330 300", dx: 0, dy: -14 },
  { id: "email", x: 98, y: 82, label: "EMAIL", tone: "blue", d: "M98 82 H200 C232 82 240 100 240 130 V170 C240 232 330 232 330 300", dx: 0, dy: -14 },
  { id: "people", x: 119, y: 165, label: "PEOPLE", tone: "red", d: "M119 165 H165 C192 165 206 184 216 206 C236 250 330 246 330 300", dx: 0, dy: -14 },
  { id: "research", x: 453, y: 83, label: "RESEARCH", tone: "white", d: "M453 83 H398 C360 83 338 102 338 142 V300", dy: -14, dx: -8 },
  { id: "calls", x: 491, y: 157, label: "CALLS", tone: "red", d: "M491 157 H398 C352 157 336 190 334 230 V300" },
  { id: "signals", x: 489, y: 231, label: "SIGNALS", tone: "red", d: "M489 231 H398 C360 231 336 252 332 300" },
];

const TONE = { blue: "#5aa0ff", red: "#ff3b3b", white: "#ffffff" } as const;
const TRUNK = "M330 300 V352 Q330 417 266 417 H4";

function Diagram() {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <filter id="cta-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <g fill="none" strokeLinecap="round">
          {NODES.map((n, i) => (
            <g key={n.id}>
              <path id={`cta-${n.id}`} d={n.d} pathLength={1} className="draw" stroke={n.tone === "red" ? "#ff3b3b" : "#9aa3cf"} strokeOpacity={n.tone === "red" ? 0.55 : 0.5} strokeWidth="1" style={{ ["--d" as string]: `${0.5 + i * 0.12}s` }} />
              <path d={n.d} stroke="#fff" strokeOpacity=".35" strokeWidth="1" className="flow-line" style={{ animationDelay: `${i * -0.3}s` }} />
            </g>
          ))}
          <path id="cta-trunk" d={TRUNK} pathLength={1} className="draw" stroke="#ff3b3b" strokeWidth="1.3" style={{ ["--d" as string]: "1.3s" }} />
        </g>

        {NODES.map((n) => (
          <g key={`n-${n.id}`}>
            <circle cx={n.x} cy={n.y} r="6" fill={TONE[n.tone]} opacity=".35" filter="url(#cta-glow)" />
            <circle cx={n.x} cy={n.y} r="3" fill={TONE[n.tone]} />
          </g>
        ))}
        <circle cx="330" cy="300" r="9" fill="#ff2a2a" opacity=".55" filter="url(#cta-glow)" />
        <circle cx="330" cy="300" r="4" fill="#ff2a2a" />

        {/* travelling pulses */}
        <g className="pulses">
          {NODES.map((n, i) => (
            <circle key={`p-${n.id}`} r="2.4" fill="#fff" opacity=".9">
              <animateMotion dur={`${3.6 + (i % 3) * 0.5}s`} begin={`${2 + i * 0.55}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1">
                <mpath href={`#cta-${n.id}`} />
              </animateMotion>
            </circle>
          ))}
          <circle r="3" fill="#ff3b3b">
            <animateMotion dur="3.2s" begin="3s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1">
              <mpath href="#cta-trunk" />
            </animateMotion>
          </circle>
        </g>
      </svg>

      {/* labels stay a readable size at every width */}
      {NODES.map((n) => (
        <span
          key={`l-${n.id}`}
          className="pfade absolute whitespace-nowrap text-[8px] font-medium uppercase leading-none tracking-[0.2em] text-cream/75 sm:text-[9px]"
          style={{
            left: `${((n.x + (n.dx ?? 0)) / VB_W) * 100}%`,
            top: `${((n.y + (n.dy ?? 0)) / VB_H) * 100}%`,
            transform: `translate(${n.dx !== undefined ? "0" : "16px"}, -50%)`,
            ["--d" as string]: "1.2s",
          }}
        >
          {n.label}
        </span>
      ))}
      <span
        className="pfade absolute whitespace-pre text-[7.5px] font-medium uppercase leading-[1.9] tracking-[0.2em] text-cream/65 sm:text-[8.5px]"
        style={{ left: `${(342 / VB_W) * 100}%`, top: `${(300 / VB_H) * 100}%`, transform: "translateY(-50%)", ["--d" as string]: "1.5s" }}
      >
        {"Context found\nContext connected\nIntelligence ready"}
      </span>
    </div>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 10" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M0 5h19M15 1l4 4-4 4" />
    </svg>
  );
}

export default function Cta() {
  return (
    <Reveal id="demo" className="cta-bg relative overflow-hidden text-cream">
      <div className="hero-grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-[30px] sm:px-8 lg:px-[6vw] lg:pb-[84px] xl:px-[64px]">
        {/* hand-off from the FAQ section */}
        <svg viewBox="0 0 40 44" className="absolute left-5 top-0 hidden h-[44px] w-[40px] sm:left-8 lg:left-[6vw] lg:block xl:left-[64px]" fill="none" aria-hidden>
          <path d="M3.500 0 V28 Q3.500 40 15.500 40 H40" stroke="#ff3b3b" strokeOpacity=".7" strokeWidth="1" />
        </svg>

        {/* eyebrow row */}
        <div className="pfade flex items-center justify-between gap-6">
          <div className="flex items-center gap-[22px] lg:pl-[40px]">
            <span className="h-[3px] w-[34px] bg-[#ff2a2a]" />
            <span className="text-[10.5px] font-medium uppercase tracking-[0.3em]">07 / Your next move</span>
          </div>
          <div className="hidden items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-cream/80 sm:flex">
            Context
            <Arrow className="h-[7px] w-[14px] text-[#ff3b3b]" />
            Intelligence
            <Arrow className="h-[7px] w-[14px] text-[#ff3b3b]" />
            Action
          </div>
        </div>

        {/* headline + diagram */}
        <div className="mt-10 grid items-end gap-12 lg:mt-[34px] lg:grid-cols-[1.05fr_1fr] lg:gap-0">
          <h2
            className="pfade font-display uppercase text-cream"
            style={{ ["--d" as string]: "0.1s", letterSpacing: "-0.012em", lineHeight: 0.92 }}
          >
            {["Sell with", "Context.", "Close with"].map((l) => (
              <span key={l} className="block whitespace-nowrap text-[clamp(3rem,18.5vw,8.5rem)] lg:text-[min(9.6vw,10rem)]">
                {l}
              </span>
            ))}
            <span className="block whitespace-nowrap text-[clamp(3rem,18.5vw,8.5rem)] lg:text-[min(9.6vw,10rem)]">
              Intelligence
              <span className="ml-[0.05em] inline-block rounded-full bg-[#ff2a2a] align-baseline shadow-[0_0_30px_rgba(255,42,42,0.6)]" style={{ width: "0.15em", height: "0.15em" }} />
            </span>
          </h2>

          <div className="w-full lg:-ml-[1vw] lg:pb-[2.4vw]">
            <Diagram />
          </div>
        </div>

        {/* copy + action */}
        <div className="mt-12 grid gap-10 lg:mt-[44px] lg:grid-cols-[1.05fr_1fr] lg:gap-0">
          <p className="pfade max-w-[480px] font-serif text-[clamp(1.1rem,4.3vw,1.3rem)] font-light leading-[1.4] text-cream/85" style={{ ["--d" as string]: "0.2s" }}>
            See how NORYX turns the context already inside your revenue stack into intelligence your team can act on.
          </p>

          <div className="pfade" style={{ ["--d" as string]: "0.3s" }}>
            <div className="flex max-w-[420px] items-center gap-4 text-[9px] font-medium uppercase tracking-[0.24em] text-cream/70">
              Next best action
              <span className="h-px flex-1 bg-cream/30" />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-6">
              <a
                href={DEMO_URL}
                className="group inline-flex h-[56px] items-center gap-5 bg-[#ff2a2a] px-8 font-cond text-[24px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_14px_44px_-14px_rgba(255,42,42,0.8)] transition-all hover:bg-white hover:text-[#0b0c17] sm:h-[58px] sm:text-[26px]"
              >
                Book a demo
                <Arrow className="h-[11px] w-[26px] transition-transform group-hover:translate-x-1.5" />
              </a>
              <div className="flex items-center gap-5">
                <span className="hidden h-10 w-px bg-cream/25 sm:block" />
                <span className="font-display text-[26px] leading-none text-cream">01</span>
                <span className="h-10 w-px bg-cream/25" />
                <span className="text-[8px] font-medium uppercase leading-[1.8] tracking-[0.2em] text-cream/65">
                  Human decision
                  <br />
                  required
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
