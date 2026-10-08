"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "./Reveal";
import { Facade, RockPhoto, Towers } from "./problem/art";
import {
  ApolloCard,
  Banner,
  CalendarCard,
  CallCard,
  CopilotCard,
  CrmCard,
  EmailCard,
  GapBox,
  ResearchCard,
  SalesNavCard,
} from "./problem/cards";

/* Design space of the desktop composition (px). */
const W = 1536;
const TOP = 340; /* the headline now lives in normal page flow above the stage, so the composition starts here */
const H = 1024 - TOP;

const INK = "#0b0b22";
const MARK = "#0b0b22"; /* broken-link markers and travelling signals: ink, not colour */

/* ---------- small building blocks ---------- */

function Label({ lines, style }: { lines: string[]; style?: CSSProperties }) {
  return (
    <div className="absolute flex h-[40px] flex-col justify-center pl-[12px]" style={style}>
      <span className="grow-line absolute left-0 top-0 h-full w-px bg-[#0b0b22]/60" />
      <span className="text-[11px] uppercase leading-[1.5] tracking-[0.12em] text-[#52525b]">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </span>
    </div>
  );
}

/* ---------- shared header (headline + intro), used on every screen size ---------- */

function Header() {
  return (
    <div className="section-x section-y !pb-8 lg:!pb-10">
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-[6vw]">
        <div>
          <p className="eyebrow eyebrow-light pfade">The problem</p>
          <h2 className="h-display h-section mt-5 text-[#0b0b22] lg:mt-6">
            <span className="mask-line">
              <span>The information exists.</span>
            </span>
            <span className="mask-line">
              <span style={{ ["--d" as string]: "0.15s" }}>
                The intelligence is{" "}
                <span className="glitch" data-text="fragmented.">
                  fragmented.
                </span>
              </span>
            </span>
          </h2>
        </div>
        <div className="pfade" style={{ ["--d" as string]: "0.25s" } as CSSProperties}>
          <p className="text-[18px] leading-[1.5] text-[#0b0b22] lg:text-[20px]">
            Your sales team does not need another isolated tool. They need the right information at the right moment.
          </p>
          <p className="body-copy body-copy-light mt-4">
            Sellers move between Sales Navigator, Apollo, CRM, email, conversation intelligence, spreadsheets, search, and AI copilots.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- connector layer (design-space coordinates) ---------- */

const LINES = [
  "M425 454 H519",
  "M446 521 V535 Q446 548 460 548 H506 Q514 548 514 556 V598 Q514 608 524 608 H587",
  "M820 538 V480 Q820 462 838 462 H858",
  "M753 462 H793",
  "M1077 436 H1150 Q1172 436 1172 458 V480",
  "M440 643 H486",
  "M107 648 V678 Q107 685 114 685 H233",
  "M987 627 H1060 Q1068 627 1068 618 V580",
  "M987 657 H1070 Q1080 657 1080 668 V722 Q1080 733 1092 733 H1174",
  "M1040 735 H1058 Q1066 735 1066 745 V805 Q1066 820 1080 820 H1174",
  "M631 783 H686",
  "M474 806 H540 Q548 806 548 798 V686 Q548 676 558 676 H585",
  "M1411 534 H1432 Q1443 534 1443 545 V690",
  "M1206 855 V872 Q1206 885 1218 885 H1320 Q1332 885 1332 897 V1000",
  "M1143 671 V700",
  "M1111 571 V560",
];
const RING: [number, number][] = [
  [425, 454], [519, 454], [860, 462], [233, 685], [793, 462], [440, 643], [686, 783],
  [585, 676], [1174, 733], [1174, 820], [1411, 534], [1143, 700], [508, 548], [987, 657],
];
const CROSS: [number, number][] = [
  [820, 538], [1172, 480], [488, 643], [587, 608], [1068, 580], [1040, 735], [631, 783],
  [1446, 690], [1206, 855], [1332, 907], [492, 478], [987, 627], [177, 779], [65, 404],
];
const REDRING: [number, number][] = [[446, 521], [753, 462], [1077, 436], [474, 806], [1143, 671]];

function Connectors() {
  return (
    <svg viewBox={`0 0 ${W} ${H + TOP}`} width={W} height={H + TOP} className="pointer-events-none absolute inset-0" aria-hidden>
      <g fill="none" stroke="#8b8c97" strokeWidth="1" strokeDasharray="1.6 3.2" strokeLinecap="round" strokeLinejoin="round">
        {LINES.map((d) => (
          <path key={d} d={d} />
        ))}
        
      </g>
      {RING.map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3.2" fill="#f4f2ec" stroke="#6f707c" strokeWidth="1" />
      ))}
      {REDRING.map(([x, y]) => (
        <circle key={`r${x}${y}`} cx={x} cy={y} r="3.4" fill="#f4f2ec" stroke="#6f707c" strokeWidth="1.3" />
      ))}
      {CROSS.map(([x, y], k) => (
        <path
          key={`x${x}${y}`}
          d={`M${x - 3.2} ${y - 3.2} l6.4 6.4 M${x + 3.2} ${y - 3.2} l-6.4 6.4`}
          stroke={MARK}
          strokeOpacity=".75"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="x-blink"
          style={{ animationDelay: `${(k * 0.47) % 3.4}s` }}
        />
      ))}
      {/* signals try to travel, then die at the break */}
      <g className="pulses">
        {LINES.map((d, k) => (
          <circle key={`s${k}`} r="2.4" fill={MARK} opacity="0">
            <animateMotion dur={`${3 + (k % 4) * 0.7}s`} begin={`${1.6 + k * 0.45}s`} repeatCount="indefinite" path={d} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1" dur={`${3 + (k % 4) * 0.7}s`} begin={`${1.6 + k * 0.45}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
      {/* scattered specks */}
      {[[153, 385], [57, 624]].map(([x, y]) => (
        <rect key={`s${x}`} x={x - 3} y={y - 3} width="6" height="6" fill={INK} />
      ))}
      {[[155, 405], [60, 645], [857, 384], [1006, 565], [610, 713], [535, 849], [558, 849], [1438, 827], [1437, 854], [957, 756], [1426, 468]].map(([x, y]) => (
        <circle key={`d${x}${y}`} cx={x} cy={y} r="1.1" fill={INK} opacity=".8" />
      ))}
    </svg>
  );
}

const abs = (x: number, y: number, w: number, h: number, d = 0): CSSProperties =>
  ({ left: x, top: y, width: w, height: h, "--d": `${d}s` }) as CSSProperties;

/* Cards enter from scattered offsets, then keep drifting independently (a fragmented feel)
   and react to the pointer at different depths. */
const SCATTER = [
  [-46, 30, -2.4],
  [38, -34, 1.8],
  [52, 26, -1.6],
  [-40, -28, 2.2],
  [-34, 40, -1.8],
  [30, 46, 2.6],
  [58, -22, -2.2],
  [44, 38, 1.6],
  [0, 54, 0],
  [-60, 0, 0],
];

function Item({ x, y, w, h, d = 0, i = 0, depth = 8, kind = "scatter", children }: { x: number; y: number; w: number; h: number; d?: number; i?: number; depth?: number; kind?: "scatter" | "wipe"; children: ReactNode }) {
  const [sx, sy, sr] = SCATTER[i % SCATTER.length];
  const style = { ...abs(x, y, w, h, d), "--sx": `${sx}px`, "--sy": `${sy}px`, "--sr": `${sr}deg`, "--depth": depth } as CSSProperties;
  const float = {
    "--fx": `${(i % 2 ? 1 : -1) * (2 + (i % 3))}px`,
    "--fy": `${-5 - (i % 4) * 1.5}px`,
    "--fr": `${(i % 2 ? 0.4 : -0.4) * (1 + (i % 3) * 0.3)}deg`,
    "--fd": `${6.5 + (i % 5) * 0.9}s`,
    "--fdl": `${-(i * 0.9)}s`,
  } as CSSProperties;
  return (
    <div className={`${kind === "wipe" ? "pwipe" : "pscatter"} absolute`} style={style}>
      <div className="drift h-full w-full" data-depth={depth}>
        <div className="floaty h-full w-full" style={float}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Photo({ x, y, w, h, d, depth, clip = "", children }: { x: number; y: number; w: number; h: number; d: number; depth: number; clip?: string; children: ReactNode }) {
  return (
    <div className="pscatter absolute" style={{ ...abs(x, y, w, h, d), "--sx": "0px", "--sy": "30px", "--sr": "0deg", "--depth": depth } as CSSProperties}>
      <div className={`drift h-full w-full overflow-hidden ${clip}`} data-depth={depth}>{children}</div>
    </div>
  );
}

/* ---------- desktop stage ---------- */

function Stage() {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
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

  /* Pointer parallax: write transforms straight onto the ~14 depth layers inside one rAF.
     (Changing a CSS variable on the stage root would invalidate style for every descendant.) */
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const apply = () => {
    raf.current = 0;
    const { x, y } = target.current;
    inner.current?.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
      const d = Number(el.dataset.depth || 0);
      el.style.transform = `translate3d(${(x * d).toFixed(2)}px, ${(y * d).toFixed(2)}px, 0)`;
    });
  };
  const schedule = () => {
    if (!raf.current) raf.current = requestAnimationFrame(apply);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    target.current = { x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 };
    schedule();
  };
  const leave = () => {
    target.current = { x: 0, y: 0 };
    schedule();
  };

  return (
    <div ref={wrap} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[1920px]" style={{ aspectRatio: `${W} / ${H}` }}>
      <div
        ref={inner}
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale ?? 1})`, opacity: scale === null ? 0 : 1 }}
      >
        <div className="absolute left-0 w-full" style={{ top: -TOP, height: H + TOP }}>
        {/* photography */}
        <Photo x={0} y={475} w={266} h={108} d={0.2} depth={-6} clip="[clip-path:polygon(0_22%,70%_0,100%_0,100%_100%,0_100%)]">
          <Facade id="fa" className="h-full w-full" />
        </Photo>
        <Photo x={33} y={712} w={105} h={119} d={0.3} depth={-9}>
          <RockPhoto id="r1" seed={9} className="h-full w-full" />
        </Photo>
        <Photo x={1211} y={370} w={184} h={126} d={0.2} depth={-7}>
          <Towers id="tw" className="h-full w-full" />
        </Photo>
        <Photo x={1472} y={818} w={64} h={100} d={0.3} depth={-10}>
          <RockPhoto id="r2" seed={21} className="h-full w-full" />
        </Photo>

        <Connectors />

        {/* company note */}
        <div className="pfade absolute" style={{ left: 1426, top: 382, ["--d" as string]: "0.3s" }}>
          <div className="text-[15px] font-bold leading-none tracking-[-0.01em]">Acme Corp</div>
          <div className="mt-[10px] text-[11px] leading-[1.55] text-[#71717a]">
            Software
            <br />
            1,200+ employees
            <br />
            San Francisco, CA
          </div>
        </div>

        {/* labels */}
        <Label lines={["ACCOUNT", "DATA"]} style={{ left: 59, top: 426 }} />
        <Label lines={["PEOPLE", "DATA"]} style={{ left: 759, top: 376 }} />
        <Label lines={["CONVERSATION", "DATA"]} style={{ left: 105, top: 596 }} />
        <Label lines={["INTENT", "SIGNAL"]} style={{ left: 1087, top: 349 }} />
        <Label lines={["DEAL", "CONTEXT"]} style={{ left: 95, top: 851 }} />
        <Label lines={["TIMING", "AND NEXT", "STEPS"]} style={{ left: 956, top: 766, height: 62 }} />
        <Label lines={["COMPANY", "CONTEXT"]} style={{ left: 1426, top: 549 }} />
        <Label lines={["ISOLATED", "OUTPUTS"]} style={{ left: 1423, top: 722 }} />

        {/* cards */}
        <Item i={0} depth={6} x={190} y={393} w={229} h={166} d={0.1}><CrmCard /></Item>
        <Item i={1} depth={10} x={523} y={376} w={207} h={149} d={0.15}><SalesNavCard /></Item>
        <Item i={2} depth={8} x={867} y={376} w={208} h={149} d={0.2}><ApolloCard /></Item>
        <Item i={3} depth={12} x={241} y={586} w={192} h={135} d={0.25}><EmailCard /></Item>
        <Item i={4} depth={7} x={190} y={747} w={245} h={170} d={0.3}><CallCard /></Item>
        <Item i={5} depth={14} x={696} y={726} w={229} h={139} d={0.35}><CalendarCard /></Item>
        <Item i={6} depth={9} x={1117} y={494} w={285} h={157} d={0.3}><ResearchCard /></Item>
        <Item i={7} depth={11} x={1181} y={691} w={229} h={141} d={0.4}><CopilotCard /></Item>

        <Item i={8} depth={3} x={614} y={558} w={346} h={137} d={0.5}><GapBox /></Item>
        <Item kind="wipe" i={9} depth={4} x={469} y={880} w={713} h={87} d={0.7}><Banner /></Item>

        </div>
      </div>
    </div>
  );
}

/* ---------- tablet / phone flow layout ---------- */

const FLOW: { label: string; node: ReactNode }[] = [
  { label: "Account data", node: <CrmCard /> },
  { label: "People data", node: <SalesNavCard /> },
  { label: "Conversation data", node: <EmailCard /> },
  { label: "Intent signal", node: <ApolloCard /> },
  { label: "Deal context", node: <CallCard /> },
  { label: "Timing and next steps", node: <CalendarCard /> },
  { label: "Company context", node: <ResearchCard /> },
  { label: "Isolated outputs", node: <CopilotCard /> },
];

function Flow() {
  return (
    <div className="section-x pb-11">
      <div className="mx-auto grid max-w-[1000px] gap-x-5 gap-y-8 sm:grid-cols-2">
        {FLOW.map((f, i) => (
          <div key={f.label} className="pfade" style={{ ["--d" as string]: `${(i % 2) * 0.08}s` }}>
            <div className="mb-3 border-l border-[#0b0b22]/50 pl-3 text-[12px] uppercase tracking-[0.12em] text-[#52525b]">{f.label}</div>
            <div className="min-h-[150px]">{f.node}</div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-[1000px]">
        <div className="pfade h-[170px] max-w-[560px] sm:mx-auto">
          <GapBox />
        </div>
        <div className="pfade mt-8">
          <Banner />
        </div>
      </div>
    </div>
  );
}

export default function Problem() {
  return (
    <Reveal id="problem" className="relative overflow-hidden bg-[#f4f2ec] text-[#0b0b22]">
      <div className="problem-grain pointer-events-none absolute inset-0" />
      <div className="relative">
        <Header />
      </div>
      <div className="relative hidden xl:block xl:pb-[72px]">
        <Stage />
      </div>
      <div className="relative xl:hidden">
        <Flow />
      </div>
    </Reveal>
  );
}
