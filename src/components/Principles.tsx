import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { Rv, SectionHead } from "./ui";

const ico = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const ITEMS: { say: string; who: string; why: string; icon: ReactNode }[] = [
  {
    say: "No strong signal is a valid answer. We never pad your list to look busy.",
    who: "Honest results",
    why: "Quiet accounts are reported as quiet.",
    icon: <path d="M10 3a7 7 0 1 0 0 14a7 7 0 1 0 0-14M6.5 10h7" />,
  },
  {
    say: "Nothing is looked up in Apollo until you approve the exact person, field and cost.",
    who: "Approval before spend",
    why: "Approval is enforced on the server, not a button.",
    icon: <path d="M10 2.5l6 2.5v4.5c0 4-2.6 6.8-6 8-3.4-1.2-6-4-6-8V5zM7.2 10l2 2 3.6-4" />,
  },
  {
    say: "Every claim carries its source and its date. Old news is never presented as new.",
    who: "Evidence and dates",
    why: "Event, publish and fetch dates are kept apart.",
    icon: <path d="M5 3h7l4 4v10H5zM12 3v4h4M8 11h5M8 14h5" />,
  },
  {
    say: "Your workspace's data stays in your workspace. Nothing is pooled across customers.",
    who: "Workspace isolation",
    why: "Checked by automated cross-access tests.",
    icon: <path d="M4 9V6.5a6 6 0 0 1 12 0V9M3 9h14v9H3zM10 12.5v2" />,
  },
  {
    say: "NORYX writes the draft. You decide what is sent, and from where.",
    who: "You stay in control",
    why: "Drafts are copied or exported, never sent for you.",
    icon: <path d="M4 15.5V18h2.5L15 9.5 12.5 7zM14 5.5l2.5 2.5" />,
  },
];

function Item({ it, i, className = "" }: { it: (typeof ITEMS)[number]; i: number; className?: string }) {
  return (
    <Rv d={0.05 * i} className={`flex flex-col justify-between gap-7 border-white/[0.08] px-6 py-8 sm:px-10 lg:px-12 lg:py-11 ${className}`}>
      <p className="text-[clamp(1.3rem,3.1vw,1.7rem)] leading-[1.3] tracking-[-0.025em] text-fg">&ldquo;{it.say}&rdquo;</p>
      <div className="flex items-center gap-4">
        <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] border border-white/12 bg-[#14151b] text-fg">
          <svg viewBox="0 0 20 20" className="h-[19px] w-[19px]" {...ico} aria-hidden>
            {it.icon}
          </svg>
        </span>
        <span>
          <span className="block text-[14.5px] font-bold text-fg">{it.who}</span>
          <span className="block text-[13.5px] text-muted">{it.why}</span>
        </span>
      </div>
    </Rv>
  );
}

export default function Principles() {
  return (
    <Reveal id="principles" className="relative">
      <div className="frame">
        <div className="pad-x pb-10 pt-14 lg:pb-12 lg:pt-20">
          <SectionHead
            eyebrow="Principles"
            title="Not another chat assistant."
            lede="General AI tools answer questions. NORYX does the account work, with rules you can check."
          />
        </div>
        <div className="border-t border-white/[0.08]">
          <div className="grid lg:grid-cols-3">
            {ITEMS.slice(0, 3).map((it, k) => (
              <Item key={it.who} it={it} i={k} className={`border-b ${k < 2 ? "lg:border-r" : ""}`} />
            ))}
          </div>
          <div className="grid lg:grid-cols-2">
            {ITEMS.slice(3).map((it, k) => (
              <Item key={it.who} it={it} i={k + 3} className={`border-b ${k === 0 ? "lg:border-r" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
