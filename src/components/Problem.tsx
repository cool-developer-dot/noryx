"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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
const H = 1024;

const INK = "#0b0b22";
const RED = "#ee3b3b";

/* ---------- small building blocks ---------- */

function Eyebrow() {
  return (
    <div className="flex items-center gap-[21px]">
      <span className="h-[3px] w-[28px] bg-[#ee3b3b]" />
      <span className="text-[10.5px] font-medium uppercase tracking-[0.3em] text-[#0b0b22]">
        02 / The problem
      </span>
    </div>
  );
}

function Dot({ className = "" }: { className?: string }) {
  return <span className={`inline-block rounded-full bg-[#ee3b3b] ${className}`} />;
}

function Label({ n, lines, style }: { n: string; lines: string[]; style?: CSSProperties }) {
  return (
    <div className="absolute flex h-[52px] flex-col justify-center pl-[11px]" style={style}>
      <span className="grow-line absolute left-0 top-0 h-full w-px bg-[#0b0b22]" />
      <span className="text-[13.5px] font-bold leading-none tracking-[0.08em] text-[#0b0b22]">{n}</span>
      <span className="mt-[8px] text-[8.5px] font-medium uppercase leading-[1.55] tracking-[0.22em] text-[#33344a]">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </span>
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
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="pointer-events-none absolute inset-0" aria-hidden>
      <g fill="none" stroke="#8b8c97" strokeWidth="1" strokeDasharray="1.6 3.2" strokeLinecap="round" strokeLinejoin="round">
        {LINES.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d="M1332 940 V1000" stroke={RED} strokeDasharray="none" strokeWidth="1.2" />
        <path d="M1327 992 L1332 1000 L1337 992" stroke={RED} strokeDasharray="none" strokeWidth="1.2" />
      </g>
      {RING.map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3.2" fill="#f4f2ec" stroke="#6f707c" strokeWidth="1" />
      ))}
      {REDRING.map(([x, y]) => (
        <circle key={`r${x}${y}`} cx={x} cy={y} r="3.4" fill="#f4f2ec" stroke={RED} strokeWidth="1.3" />
      ))}
      {CROSS.map(([x, y], k) => (
        <path
          key={`x${x}${y}`}
          d={`M${x - 3.2} ${y - 3.2} l6.4 6.4 M${x + 3.2} ${y - 3.2} l-6.4 6.4`}
          stroke={RED}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="x-blink"
          style={{ animationDelay: `${(k * 0.47) % 3.4}s` }}
        />
      ))}
      {/* signals try to travel, then die at the break */}
      <g className="pulses">
        {LINES.map((d, k) => (
          <circle key={`s${k}`} r="2.4" fill={RED}>
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
      <div className="drift h-full w-full">
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
      <div className={`drift h-full w-full overflow-hidden ${clip}`}>{children}</div>
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

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    inner.current?.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    inner.current?.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  const leave = () => {
    inner.current?.style.setProperty("--mx", "0");
    inner.current?.style.setProperty("--my", "0");
  };

  return (
    <div ref={wrap} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[1920px]" style={{ aspectRatio: `${W} / ${H}` }}>
      <div
        ref={inner}
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale ?? 1})`, opacity: scale === null ? 0 : 1 }}
      >
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

        {/* header */}
        <div className="absolute" style={{ left: 70, top: 31 }}>
          <Eyebrow />
        </div>
        <h2 className="absolute font-display uppercase text-[#0b0b22]" style={{ left: 69, top: 64, letterSpacing: "-0.035em" }}>
          <span className="mask-line text-[56px] leading-[1.2]">
            <span>The information exists.</span>
          </span>
          <span className="mask-line text-[110px] leading-[0.985]">
            <span style={{ ["--d" as string]: "0.15s" }}>The intelligence</span>
          </span>
          <span className="mask-line text-[110px] leading-[0.985]">
            <span style={{ ["--d" as string]: "0.3s" }}>
              <span className="glitch" data-text="is fragmented.">
                is fragmented.
              </span>
              <Dot className="pop-dot ml-[8px] h-[27px] w-[27px]" />
            </span>
          </span>
        </h2>

        <div className="pfade absolute font-serif font-light text-[#0b0b22]" style={{ left: 877, top: 132, ["--d" as string]: "0.25s" }}>
          <p className="text-[24.4px] leading-[1.2]">
            Your sales team does not need another isolated tool.
            <br />
            They need the right information at the right moment.
          </p>
          <p className="mt-[34px] text-[19px] leading-[1.3]">
            Sellers move between Sales Navigator, Apollo, CRM, email,
            <br />
            conversation intelligence, spreadsheets, search, and AI copilots.
          </p>
        </div>

        {/* company note */}
        <div className="pfade absolute" style={{ left: 1426, top: 382, ["--d" as string]: "0.3s" }}>
          <div className="font-cond text-[17px] font-semibold uppercase leading-none tracking-[0.04em]">Acme Corp</div>
          <div className="mt-[10px] text-[10px] leading-[1.55] text-[#85869a]">
            Software
            <br />
            1,200+ employees
            <br />
            San Francisco, CA
          </div>
          <span className="mt-[11px] block h-[2px] w-[14px] bg-[#ee3b3b]" />
        </div>

        {/* labels */}
        <Label n="01" lines={["ACCOUNT", "DATA"]} style={{ left: 59, top: 426 }} />
        <Label n="02" lines={["PEOPLE", "DATA"]} style={{ left: 759, top: 376 }} />
        <Label n="03" lines={["CONVERSATION", "DATA"]} style={{ left: 105, top: 596 }} />
        <Label n="04" lines={["INTENT", "SIGNAL"]} style={{ left: 1087, top: 349 }} />
        <Label n="05" lines={["DEAL", "CONTEXT"]} style={{ left: 95, top: 851 }} />
        <Label n="06" lines={["TIMING", "AND NEXT", "STEPS"]} style={{ left: 956, top: 766, height: 62 }} />
        <Label n="07" lines={["COMPANY", "CONTEXT"]} style={{ left: 1426, top: 549 }} />
        <Label n="08" lines={["ISOLATED", "OUTPUTS"]} style={{ left: 1423, top: 722 }} />

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

        {/* footer notes */}
        <div className="pfade absolute flex items-start gap-[21px]" style={{ left: 65, top: 970, ["--d" as string]: "0.5s" }}>
          <span className="mt-[3px] h-[3px] w-[28px] bg-[#ee3b3b]" />
          <span className="ml-[0px] text-[8.5px] font-medium uppercase leading-[1.8] tracking-[0.2em] text-[#0b0b22]">
            Data exists.
            <br />
            Context doesn&apos;t flow.
          </span>
        </div>
        <div className="pfade absolute text-[8.5px] font-medium uppercase leading-[1.8] tracking-[0.15em]" style={{ left: 1354, top: 957, ["--d" as string]: "0.5s" }}>
          <span className="text-[#33344a]">Next</span>
          <br />
          <span className="font-semibold text-[#0b0b22]">The intelligence layer</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- tablet / phone flow layout ---------- */

const FLOW: { n: string; label: string; node: ReactNode }[] = [
  { n: "01", label: "Account data", node: <CrmCard /> },
  { n: "02", label: "People data", node: <SalesNavCard /> },
  { n: "03", label: "Conversation data", node: <EmailCard /> },
  { n: "04", label: "Intent signal", node: <ApolloCard /> },
  { n: "05", label: "Deal context", node: <CallCard /> },
  { n: "06", label: "Timing and next steps", node: <CalendarCard /> },
  { n: "07", label: "Company context", node: <ResearchCard /> },
  { n: "08", label: "Isolated outputs", node: <CopilotCard /> },
];

function Flow() {
  return (
    <div className="px-5 pb-12 pt-10 sm:px-8 md:pt-14">
      <Eyebrow />

      <h2 className="mt-6 font-display uppercase text-[#0b0b22]" style={{ letterSpacing: "-0.035em" }}>
        <span className="pfade block text-[clamp(1.6rem,7.2vw,3.6rem)] leading-[1.15]">The information exists.</span>
        <span className="pfade block whitespace-nowrap text-[clamp(2.5rem,14.2vw,7.4rem)] leading-[0.95]" style={{ ["--d" as string]: "0.1s" }}>
          The intelligence
        </span>
        <span className="pfade block whitespace-nowrap text-[clamp(2.5rem,14.2vw,7.4rem)] leading-[0.95]" style={{ ["--d" as string]: "0.2s" }}>
          is fragmented.
          <Dot className="ml-[0.08em] h-[0.24em] w-[0.24em]" />
        </span>
      </h2>

      <div className="pfade mt-8 max-w-[640px] font-serif font-light text-[#0b0b22]" style={{ ["--d" as string]: "0.25s" }}>
        <p className="text-[clamp(1.2rem,4.6vw,1.6rem)] leading-[1.25]">
          Your sales team does not need another isolated tool. They need the right information at the right moment.
        </p>
        <p className="mt-5 text-[clamp(1rem,3.9vw,1.2rem)] leading-[1.4]">
          Sellers move between Sales Navigator, Apollo, CRM, email, conversation intelligence, spreadsheets, search, and AI copilots.
        </p>
      </div>

      <div className="mt-10 grid gap-x-5 gap-y-7 sm:grid-cols-2">
        {FLOW.map((f, i) => (
          <div key={f.n} className="pfade" style={{ ["--d" as string]: `${(i % 2) * 0.08}s` }}>
            <div className="mb-3 flex items-center gap-3 border-l border-[#0b0b22] pl-3">
              <span className="text-[13px] font-bold tracking-[0.08em]">{f.n}</span>
              <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#33344a]">{f.label}</span>
            </div>
            <div className="min-h-[150px]">{f.node}</div>
          </div>
        ))}
      </div>

      <div className="pfade mt-10 h-[170px] max-w-[560px] sm:mx-auto">
        <GapBox />
      </div>
      <div className="pfade mt-8">
        <Banner />
      </div>

      <div className="mt-8 flex items-start justify-between gap-6 text-[9.5px] font-medium uppercase leading-[1.75] tracking-[0.2em]">
        <div className="flex items-start gap-4">
          <span className="mt-[7px] h-[3px] w-[22px] shrink-0 bg-[#ee3b3b]" />
          <span>
            Data exists.
            <br />
            Context doesn&apos;t flow.
          </span>
        </div>
        <span className="text-right">
          <span className="text-[#33344a]">Next</span>
          <br />
          <span className="font-semibold">The intelligence layer</span>
        </span>
      </div>
    </div>
  );
}

export default function Problem() {
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
    <section ref={ref} id="problem" className="relative overflow-hidden bg-[#f4f2ec] text-[#0b0b22]">
      <div className="problem-grain pointer-events-none absolute inset-0" />
      <div className="relative hidden xl:block">
        <Stage />
      </div>
      <div className="relative xl:hidden">
        <Flow />
      </div>
    </section>
  );
}
