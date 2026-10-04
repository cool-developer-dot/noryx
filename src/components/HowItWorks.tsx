"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Dashboard from "./how/Dashboard";
import { ActionPanel, SOURCES, SourceCard, STEPS, StepNode, StepText, Terrain } from "./how/Pieces";

const W = 1536;
const H = 1024;
const RED = "#ff2a2a";

const abs = (x: number, y: number, w: number, h: number, d = 0): CSSProperties =>
  ({ left: x, top: y, width: w, height: h, "--d": `${d}s` }) as CSSProperties;

function Fade({ x, y, w, h, d, className = "", style, children }: { x: number; y: number; w?: number; h?: number; d?: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  const base = abs(x, y, w ?? 0, h ?? 0, d);
  if (w === undefined) delete base.width;
  if (h === undefined) delete base.height;
  return (
    <div className={`pfade absolute ${className}`} style={{ ...base, ...style }}>
      {children}
    </div>
  );
}

function Eyebrow() {
  return (
    <div className="flex items-center gap-[21px]">
      <span className="h-[3px] w-[28px] bg-[#ff2a2a]" />
      <span className="text-[10.5px] font-medium uppercase tracking-[0.3em] text-cream">03 / How NORYX works</span>
    </div>
  );
}

function RedDot({ className = "" }: { className?: string }) {
  return <span className={`inline-block rounded-full bg-[#ff2a2a] ${className}`} />;
}

/* ---------- connector layer ---------- */

const SRC_Y = [272, 331, 392, 455, 519, 583, 648, 712];
const SRC_TILT = 4;
const dotY = (i: number) => SRC_Y[i] + 28 + 5;
const endY = (i: number) => 425 + i * 16.5;

function Connectors() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="pointer-events-none absolute inset-0" aria-hidden>
      <defs>
        <filter id="how-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* rails */}
      <path d="M60 245 V958" stroke="#fff" strokeOpacity=".22" strokeWidth="1" fill="none" />
      <path d="M1306 0 V256" stroke="#fff" strokeOpacity=".2" strokeWidth="1" fill="none" />
      <path d="M1300 88 H1326" stroke={RED} strokeWidth="3" />

      {/* source -> panel */}
      {SRC_Y.map((_, i) => {
        const y0 = dotY(i);
        const y1 = endY(i);
        const d = `M427 ${y0} C 468 ${y0}, 492 ${y1}, 530 ${y1}`;
        const hot = i === 0 || i === 2;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={hot ? RED : "#fff"} strokeOpacity={hot ? 0.9 : 0.7} strokeWidth="1" />
            <circle cx="530" cy={y1} r="2.2" fill="#fff" />
          </g>
        );
      })}
      <path d="M432 805 C 482 800 506 756 507 690 C 507 672 516 664 530 662" fill="none" stroke="#fff" strokeOpacity=".65" strokeWidth="1" />
      {[[473, 350], [486, 461], [490, 611]].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="6" fill={RED} opacity=".6" filter="url(#how-glow)" />
          <circle cx={x} cy={y} r="2.6" fill={RED} />
        </g>
      ))}

      {/* bottom flow */}
      <path d="M258 960 H636" stroke="#fff" strokeOpacity=".3" fill="none" />
      <path d="M640 963 l-6 -3.500 v7z" fill={RED} />
      <circle cx="543" cy="977" r="2" fill="#fff" opacity=".7" />
      <path d="M543 977 C 560 977 568 962 590 962" stroke="#fff" strokeOpacity=".25" fill="none" />
      <path d="M893 962 C 940 962 952 974 993 974 H1271" stroke={RED} strokeWidth="1.2" fill="none" />
      <path d="M1271 972 H1000" stroke="#fff" strokeOpacity=".2" fill="none" />
      <circle cx="993" cy="974" r="2.4" fill={RED} />
      <circle cx="1271" cy="972" r="9" fill={RED} opacity=".55" filter="url(#how-glow)" />
      <circle cx="1271" cy="972" r="5" fill={RED} />
      <circle cx="896" cy="963" r="2" fill={RED} />
      <circle cx="64" cy="964" r="5" fill="#07080a" stroke="#fff" strokeOpacity=".6" />
    </svg>
  );
}

/* ---------- desktop stage ---------- */

const STEP_Y = [292, 396, 503, 609, 716];

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
        {/* terrain + glow */}
        <div className="absolute" style={{ left: 0, top: 800, width: W, height: 224 }}>
          <Terrain className="h-full w-full" />
        </div>
        <div
          className="absolute"
          style={{ left: 380, top: 200, width: 1000, height: 760, background: "radial-gradient(50% 50% at 50% 50%, rgba(255,40,40,0.13), transparent 70%)" }}
        />

        <Connectors />

        {/* header */}
        <div className="absolute" style={{ left: 56, top: 28 }}>
          <Eyebrow />
        </div>
        <h2 className="absolute font-display uppercase text-cream" style={{ left: 54, top: 68, letterSpacing: "-0.035em" }}>
          <span className="pfade block text-[82px] leading-[0.975]">One intelligence layer.</span>
          <span className="pfade block text-[82px] leading-[0.975]" style={{ ["--d" as string]: "0.1s" }}>
            Every stage of the deal.
            <RedDot className="ml-[8px] h-[21px] w-[21px]" />
          </span>
        </h2>
        <Fade x={880} y={150} d={0.25} className="font-serif font-light text-cream">
          <p className="text-[18.8px] leading-[25px] text-cream/90">
            From finding the right account to taking
            <br />
            the next action, NORYX carries context
            <br />
            through the entire revenue workflow.
          </p>
        </Fade>
        <Fade x={1344} y={68} d={0.3} className="text-[8.5px] font-medium uppercase leading-[15px] tracking-[0.22em] text-cream/70">
          Disconnected data
          <br />
          becomes a continuous
          <br />
          intelligence flow.
        </Fade>

        {/* steps */}
        {STEPS.map((s, i) => (
          <div key={s.n}>
            <div className="pfade absolute" style={{ left: 50, top: STEP_Y[i] - 11, ["--d" as string]: `${0.1 + i * 0.07}s` }}>
              <StepNode active={i === 0} />
            </div>
            <Fade x={94} y={STEP_Y[i] - 24} d={0.1 + i * 0.07}>
              <StepText s={s} />
            </Fade>
          </div>
        ))}

        {/* sources */}
        {SOURCES.map((s, i) => (
          <Fade
            key={s.key}
            x={277}
            y={SRC_Y[i]}
            w={148}
            h={57}
            d={0.1 + i * 0.05}
            style={{ transform: `skewY(${SRC_TILT}deg)` }}
          >
            <SourceCard s={s} className="h-full w-full" />
          </Fade>
        ))}
        <Fade x={277} y={794} d={0.5} className="text-[8px] font-medium uppercase leading-[14px] tracking-[0.2em] text-cream/75">
          Disparate signals
          <br />
          from your existing tools
        </Fade>

        {/* dashboard */}
        <Fade x={533} y={256} w={768} h={617} d={0.2}>
          <Dashboard />
        </Fade>

        {/* data -> action */}
        <Fade x={1327} y={248} w={160} h={542} d={0.4} style={{ transform: "skewY(-4deg)" }}>
          <ActionPanel className="h-full w-full" />
        </Fade>

        {/* footer */}
        <Fade x={94} y={946} d={0.5} className="text-[8.5px] font-medium uppercase leading-[15px] tracking-[0.22em] text-cream/80">
          Scattered data
          <br />
          Fragmented context
        </Fade>
        <Fade x={657} y={940} d={0.55} className="text-[9px] font-medium uppercase leading-[16px] tracking-[0.2em]">
          <span className="block text-[#ff3b3b]">Research becomes context.</span>
          <span className="block text-[#ff3b3b]">Context becomes conversation.</span>
          <span className="block text-cream">Conversation becomes action.</span>
        </Fade>
        <Fade x={1297} y={949} d={0.6} className="text-[9px] font-medium uppercase leading-[17px] tracking-[0.2em] text-cream">
          One continuous
          <br />
          Revenue workflow
          <svg viewBox="0 0 20 10" className="ml-[10px] inline-block h-[8px] w-[16px] align-middle" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
            <path d="M0 5h17M13 1l4 4-4 4" />
          </svg>
        </Fade>
      </div>
    </div>
  );
}

/* ---------- tablet / phone flow ---------- */

function Flow() {
  return (
    <div className="relative px-5 pb-16 pt-10 sm:px-8 md:pt-14">
      <Eyebrow />
      <h2 className="mt-6 font-display uppercase text-cream" style={{ letterSpacing: "-0.035em" }}>
        <span className="pfade block whitespace-nowrap text-[clamp(1.8rem,9.3vw,5.2rem)] leading-[0.98]">One intelligence layer.</span>
        <span className="pfade block whitespace-nowrap text-[clamp(1.8rem,9.3vw,5.2rem)] leading-[0.98]" style={{ ["--d" as string]: "0.1s" }}>
          Every stage of the deal.
          <RedDot className="ml-[0.08em] h-[0.24em] w-[0.24em]" />
        </span>
      </h2>
      <div className="pfade mt-7 max-w-[560px] font-serif text-[clamp(1.1rem,4.3vw,1.4rem)] font-light leading-[1.3] text-cream/90" style={{ ["--d" as string]: "0.2s" }}>
        From finding the right account to taking the next action, NORYX carries context through the entire revenue workflow.
      </div>
      <div className="mt-5 flex items-center gap-4 text-[8.5px] font-medium uppercase leading-[1.8] tracking-[0.22em] text-cream/60">
        <span className="h-[2px] w-6 shrink-0 bg-[#ff2a2a]" />
        Disconnected data becomes a continuous intelligence flow.
      </div>

      {/* steps */}
      <ol className="relative mt-12 space-y-8 pl-[46px]">
        <span className="absolute bottom-3 left-[10px] top-2 w-px bg-white/20" />
        {STEPS.map((s, i) => (
          <li key={s.n} className="pfade relative">
            <span className="absolute -left-[46px] top-[2px] flex w-[22px] justify-center">
              <StepNode active={i === 0} />
            </span>
            <StepText s={s} />
          </li>
        ))}
      </ol>

      {/* sources */}
      <div className="mt-12 text-[8px] font-medium uppercase tracking-[0.2em] text-cream/75">Disparate signals from your existing tools</div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {SOURCES.map((s) => (
          <SourceCard key={s.key} s={s} className="pfade h-[60px] w-full" />
        ))}
      </div>

      <div className="mx-auto my-6 h-10 w-px bg-gradient-to-b from-white/60 to-[#ff2a2a]" />

      {/* dashboard */}
      <div className="pfade hpanel-wrap">
        <Dashboard />
      </div>

      <div className="mx-auto my-6 h-10 w-px bg-gradient-to-b from-[#ff2a2a] to-white/40" />

      <div className="pfade mx-auto max-w-[420px]">
        <ActionPanel className="w-full" />
      </div>

      {/* closing statements */}
      <div className="mt-12 grid gap-8 text-[9px] font-medium uppercase leading-[1.9] tracking-[0.2em] md:grid-cols-3">
        <div className="text-cream/80">
          Scattered data
          <br />
          Fragmented context
        </div>
        <div>
          <span className="block text-[#ff3b3b]">Research becomes context.</span>
          <span className="block text-[#ff3b3b]">Context becomes conversation.</span>
          <span className="block text-cream">Conversation becomes action.</span>
        </div>
        <div className="text-cream md:text-right">
          One continuous
          <br />
          Revenue workflow →
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in-view");
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="how-it-works" className="relative overflow-hidden bg-[#07080a] text-cream">
      <div className="hero-grain pointer-events-none absolute inset-0" />
      <div className="relative hidden xl:block">
        <Stage />
      </div>
      <div className="relative xl:hidden">
        <Flow />
      </div>
    </section>
  );
}
