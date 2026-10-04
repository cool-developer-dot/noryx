"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Panel from "./exp/Panel";
import { Skyscraper } from "./problem/art";

const W = 1536;
const H = 1360;

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

function Eyebrow() {
  return (
    <div className="flex items-center gap-[22px]">
      <span className="h-[3px] w-[28px] bg-[#ee2f2f]" />
      <span className="text-[10.5px] font-medium uppercase tracking-[0.3em] text-[#0c0c14]">04 / The NORYX experience</span>
    </div>
  );
}

const STEPS = [
  { n: "01", t: "One simple request", d: "You ask. NORYX connects the context." },
  { n: "02", t: "A complete brief", d: "Clear, structured and ready to use." },
  { n: "03", t: "Built from real data", d: "Every insight is traceable to its source." },
];

const NOTES = [
  { t: "NORYX Synthesis", d: ["Multiple signals", "combined into a", "clear point of", "opportunity."], y: 400, x: 1411 },
  { t: "Key stakeholders", d: ["People to engage", "based on role, influence", "and recent changes."], y: 700, x: 1411 },
  { t: "Action ready", d: ["Turn your next", "move into your next", "conversation."], y: 1200, x: 1411 },
];

function Headline({ flow = false }: { flow?: boolean }) {
  const line = flow
    ? "pfade block whitespace-nowrap text-[clamp(3rem,19vw,7.4rem)] leading-[1]"
    : "pfade block text-[80px] leading-[88px]";
  return (
    <h2 className="font-display uppercase text-[#14141f]" style={{ letterSpacing: "-0.03em" }}>
      <span className={line}>From</span>
      <span className={line} style={{ ["--d" as string]: "0.12s" }}>Research</span>
      <span className={line} style={{ ["--d" as string]: "0.24s" }}>
        To revenue
        <span className="ml-[0.06em] inline-block rounded-full bg-[#ee2f2f]" style={{ width: "0.15em", height: "0.15em" }} />
      </span>
    </h2>
  );
}

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
        {/* art: a quiet, faded tower */}
        <Fade
          x={0}
          y={1080}
          w={250}
          h={280}
          d={0.3}
          className="overflow-hidden opacity-50"
          style={{ maskImage: "linear-gradient(to top, #000 35%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, #000 35%, transparent 100%)" }}
        >
          <Skyscraper className="h-full w-full" />
        </Fade>

        {/* rails & leaders */}
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="pointer-events-none absolute inset-0" aria-hidden>
          <path d="M64 636 V880" stroke="#0c0c14" strokeOpacity=".16" strokeWidth="1" fill="none" />
          <g stroke="#0c0c14" strokeOpacity=".22" strokeWidth="1" fill="none">
            {NOTES.map((n) => (
              <path key={n.t} d={`M1394 ${n.y - 70} V${n.y + 4} H1403`} />
            ))}
          </g>
          <path d="M276 1200 C 340 1196 390 1204 436 1216" stroke="#0c0c14" strokeOpacity=".28" strokeDasharray="1.6 3.4" fill="none" />
          <circle cx="276" cy="1200" r="2.2" fill="#f7f5f0" stroke="#0c0c14" strokeOpacity=".4" />
        </svg>

        {/* header */}
        <div className="absolute" style={{ left: 62, top: 40 }}>
          <Eyebrow />
        </div>
        <div className="absolute" style={{ left: 60, top: 96 }}>
          <Headline />
        </div>
        <Fade x={62} y={410} d={0.35} className="font-serif text-[#14141f]">
          <p className="text-[20px] leading-[30px] text-[#4a4b58]">Open an account and ask:</p>
          <p className="text-[24px] font-medium leading-[34px]">“Prepare me for this account.”</p>
          <p className="mt-[28px] max-w-[340px] text-[19px] font-light leading-[28px] text-[#6c6d7a]">
            NORYX brings together the available context and gives you a clear answer.
          </p>
        </Fade>

        {/* steps */}
        {STEPS.map((s, i) => {
          const y = [660, 752, 844][i];
          const on = i === 0;
          return (
            <div key={s.n}>
              <div className="pfade absolute" style={abs(on ? 56 : 58, y - 5, undefined, undefined, 0.45 + i * 0.12)}>
                {on ? (
                  <span className="block h-[17px] w-[17px] rounded-full border border-[#ee2f2f] bg-[#f7f5f0] p-[4px]">
                    <span className="block h-full w-full rounded-full bg-[#ee2f2f]" />
                  </span>
                ) : (
                  <span className="block h-[9px] w-[9px] rounded-full bg-[#cfcbc2]" />
                )}
              </div>
              <Fade x={96} y={y - 12} d={0.45 + i * 0.12}>
                <div className={`font-cond text-[17px] font-semibold uppercase leading-none tracking-[0.06em] ${on ? "text-[#ee2f2f]" : "text-[#8d8b85]"}`}>
                  {s.t}
                </div>
                <div className={`mt-[11px] font-serif text-[15px] font-light leading-none ${on ? "text-[#4a4b57]" : "text-[#a4a29b]"}`}>
                  {s.d}
                </div>
              </Fade>
            </div>
          );
        })}

        {/* clarity */}
        <Fade x={275} y={1130} d={0.6}>
          <div className="text-[9px] font-medium uppercase leading-[18px] tracking-[0.26em] text-[#14141f]">
            Complexity in.
            <br />
            Clarity out.
          </div>
        </Fade>

        {/* panel */}
        <Fade x={442} y={60} w={935} h={1250} d={0.2}>
          <Panel />
        </Fade>

        {/* annotations */}
        {NOTES.map((n, i) => (
          <Fade key={n.t} x={n.x} y={n.y - 8} d={0.5 + i * 0.12}>
            <div className="text-[9px] font-semibold uppercase leading-none tracking-[0.2em] text-[#14141f]">{n.t}</div>
            <p className="mt-[10px] whitespace-nowrap text-[10.5px] leading-[1.5] text-[#8a8b96]">
              {n.d.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </Fade>
        ))}
      </div>
    </div>
  );
}

function Flow() {
  return (
    <div className="px-5 pb-16 pt-10 sm:px-8 md:pt-14">
      <Eyebrow />
      <div className="mt-6">
        <Headline flow />
      </div>
      <div className="pfade mt-8 max-w-[560px] font-serif text-[#0c0c14]" style={{ ["--d" as string]: "0.2s" }}>
        <p className="text-[clamp(1.1rem,4.4vw,1.4rem)] leading-[1.35]">Open an account and ask:</p>
        <p className="text-[clamp(1.2rem,4.8vw,1.55rem)] font-semibold leading-[1.35]">“Prepare me for this account.”</p>
        <p className="mt-5 text-[clamp(1.1rem,4.4vw,1.4rem)] font-light leading-[1.35] text-[#2b2c3a]">
          NORYX brings together the available context and gives you a clear answer.
        </p>
      </div>

      <ol className="relative mt-10 space-y-6 pl-[42px]">
        <span className="absolute bottom-2 left-[3px] top-2 w-px bg-[#0c0c14]/40" />
        {STEPS.map((s, i) => (
          <li key={s.n} className="pfade relative">
            <span className="absolute -left-[42px] top-[1px] flex w-[22px] justify-center text-[11px] text-[#8c8b86]">
              {i === 0 ? <span className="mt-[2px] block h-[14px] w-[14px] rounded-full bg-[#ee2f2f]" /> : s.n}
            </span>
            <div className={`font-cond text-[19px] font-semibold uppercase leading-none tracking-[0.03em] ${i === 0 ? "text-[#ee2f2f]" : "text-[#a4a29b]"}`}>{s.t}</div>
            <div className={`mt-2 font-serif text-[15px] font-light leading-none ${i === 0 ? "text-[#4a4b57]" : "text-[#a4a29b]"}`}>{s.d}</div>
          </li>
        ))}
      </ol>

      <div className="pfade mt-12">
        <div className="overflow-hidden rounded-[6px]">
          <Panel />
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {NOTES.map((n) => (
          <div key={n.t} className="border-l border-[#0c0c14]/40 pl-4">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em]">{n.t}</div>
            <p className="mt-2 text-[11.5px] leading-[1.45] text-[#7a7b86]">{n.d.join(" ")}</p>
            <span className="mt-3 block h-[2px] w-[15px] bg-[#ee2f2f]" />
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-start gap-3 text-[9px] font-medium uppercase leading-[1.9] tracking-[0.24em]">
        <span className="mt-[9px] h-[2px] w-[17px] shrink-0 bg-[#ee2f2f]" />
        <span>
          Complexity in.
          <br />
          Clarity out.
        </span>
      </div>
    </div>
  );
}

export default function Experience() {
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
    <section ref={ref} id="product" className="relative overflow-hidden bg-[#f7f5f0] text-[#0c0c14]">
      <div className="relative hidden xl:block">
        <Stage />
      </div>
      <div className="relative xl:hidden">
        <Flow />
      </div>
    </section>
  );
}
