import Reveal from "./Reveal";

/** Where the "Book a demo" button should send people (booking page, Calendly link, mailto: …). */
const DEMO_URL = "#demo";

const VB_W = 560;
const VB_H = 430;

type Node = { id: string; x: number; y: number; label: string; d: string; dx?: number; dy?: number };

const NODES: Node[] = [
  { id: "crm", x: 110, y: 12, label: "CRM", d: "M110 12 H214 C228 12 228 20 228 34 V150 C228 215 330 215 330 300", dx: 0, dy: -14 },
  { id: "email", x: 98, y: 82, label: "Email", d: "M98 82 H200 C232 82 240 100 240 130 V170 C240 232 330 232 330 300", dx: 0, dy: -14 },
  { id: "people", x: 119, y: 165, label: "People", d: "M119 165 H165 C192 165 206 184 216 206 C236 250 330 246 330 300", dx: 0, dy: -14 },
  { id: "research", x: 453, y: 83, label: "Research", d: "M453 83 H398 C360 83 338 102 338 142 V300", dy: -14, dx: -8 },
  { id: "calls", x: 491, y: 157, label: "Calls", d: "M491 157 H398 C352 157 336 190 334 230 V300", dy: -14, dx: -8 },
  { id: "signals", x: 489, y: 231, label: "Signals", d: "M489 231 H398 C360 231 336 252 332 300", dy: -14, dx: -14 },
];

const NODE = "#d4d4d8";
const TRUNK = "M330 300 V352 Q330 417 266 417 H4";

function Diagram() {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        
        <g fill="none" strokeLinecap="round">
          {NODES.map((n, i) => (
            <g key={n.id}>
              <path id={`cta-${n.id}`} d={n.d} pathLength={1} className="draw" stroke="#a1a1aa" strokeOpacity={0.5} strokeWidth="1" style={{ ["--d" as string]: `${0.5 + i * 0.12}s` }} />
              <path d={n.d} stroke="#fff" strokeOpacity=".35" strokeWidth="1" className="flow-line" style={{ animationDelay: `${i * -0.3}s` }} />
            </g>
          ))}
          <path id="cta-trunk" d={TRUNK} pathLength={1} className="draw" stroke="#f4efe6" strokeOpacity=".8" strokeWidth="1.3" style={{ ["--d" as string]: "1.3s" }} />
        </g>

        {NODES.map((n) => (
          <g key={`n-${n.id}`}>
            <circle cx={n.x} cy={n.y} r="9" fill={NODE} opacity=".08" />
            <circle cx={n.x} cy={n.y} r="3" fill={NODE} />
          </g>
        ))}
        {/* the point where everything converges is the one accent mark here */}
        <circle cx="330" cy="300" r="4.5" fill="var(--accent)" />

        {/* travelling pulses */}
        <g className="pulses">
          {NODES.map((n, i) => (
            <circle key={`p-${n.id}`} r="2.4" fill="#fff" opacity="0">
              <set attributeName="opacity" to=".9" begin={`${2 + i * 0.55}s`} />
              <animateMotion dur={`${3.6 + (i % 3) * 0.5}s`} begin={`${2 + i * 0.55}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1">
                <mpath href={`#cta-${n.id}`} />
              </animateMotion>
            </circle>
          ))}
          <circle r="3" fill="#f4efe6" opacity="0">
            <set attributeName="opacity" to="1" begin="3s" />
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
          className="pfade absolute whitespace-nowrap text-[12px] leading-none text-[#c4c4cc]"
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
        className="pfade absolute whitespace-pre text-[12px] leading-[1.7] text-[#a1a1aa]"
        style={{ left: `${(352 / VB_W) * 100}%`, top: `${(300 / VB_H) * 100}%`, transform: "translateY(-50%)", ["--d" as string]: "1.5s" }}
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

      <div className="section-x section-y relative mx-auto max-w-[1600px]">
        {/* headline: two lines */}
        <div className="pfade">
          <p className="eyebrow">Your next step</p>
          <h2 className="h-display h-hero mt-5 text-cream lg:mt-6" style={{ ["--d" as string]: "0.1s" }}>
            <span className="block">Sell with context.</span>
            <span className="block">Close with intelligence.</span>
          </h2>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-[5vw]">
          {/* copy + action */}
          <div className="pfade" style={{ ["--d" as string]: "0.2s" }}>
            <p className="body-copy max-w-[44ch] !text-[#c4c4cc]">
              See how NORYX turns the context already inside your revenue stack into intelligence your team can act on.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
              <a href={DEMO_URL} className="btn-primary group !h-[56px] !px-8 !text-[18px]">
                Book a demo
                <Arrow className="h-[11px] w-[24px] transition-transform group-hover:translate-x-1.5" />
              </a>
              <span className="text-[14px] leading-[1.5] text-[#a1a1aa]">Human decision required.</span>
            </div>
          </div>

          <div className="w-full">
            <Diagram />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
