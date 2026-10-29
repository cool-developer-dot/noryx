import type { CSSProperties, ReactNode } from "react";
import Reveal from "./Reveal";
import { Rv, SectionHead } from "./ui";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Card({ title, body, children, i }: { title: string; body: string; children: ReactNode; i: number }) {
  return (
    <Rv d={0.06 * i} className="card flex flex-col overflow-hidden">
      <div className="px-6 pt-6 sm:px-8 sm:pt-8">
        <h3 className="text-[20px] font-bold tracking-[-0.025em] text-fg">{title}</h3>
        <p className="mt-2.5 max-w-[46ch] text-[15px] leading-[1.6] text-muted">{body}</p>
      </div>
      <div className="relative mt-7 flex-1 px-4 pb-4 sm:px-8 sm:pb-8">{children}</div>
    </Rv>
  );
}

function Tag({ children, hot = false, dim = false }: { children: ReactNode; hot?: boolean; dim?: boolean }) {
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-[3px] text-[10.5px] font-bold ${
        hot ? "bg-accent/15 text-[#ff6a5c] ring-1 ring-accent/40" : dim ? "text-dim ring-1 ring-white/10" : "bg-white/[0.06] text-fg-2 ring-1 ring-white/10"
      }`}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- signals */

const SIGNALS = [
  { co: "Northwind Market", what: "Launched payouts in Germany", when: "2 Oct", tag: "Act now", hot: true },
  { co: "Helix Group", what: "Appointed a new VP Finance", when: "14 Oct", tag: "Monitor" },
  { co: "Arcadia Labs", what: "Hiring 30 operations roles", when: "9 Oct", tag: "Monitor" },
  { co: "Kestrel Freight", what: "Series B announcement", when: "Mar 2023", tag: "Old news", old: true },
];

function Signals() {
  return (
    <div className="ui h-full p-3 sm:p-4">
      <div className="flex items-center gap-1 border-b border-white/[0.08] pb-3 text-[12.5px]">
        <span className="relative whitespace-nowrap rounded-full bg-white/[0.07] px-3 py-1.5 font-bold text-fg">
          Act now <span className="text-accent">1</span>
        </span>
        <span className="whitespace-nowrap px-3 py-1.5 text-muted">Monitor 2</span>
        <span className="whitespace-nowrap px-3 py-1.5 text-muted">Background 4</span>
      </div>
      <ul className="mt-2">
        {SIGNALS.map((s, k) => (
          <li key={s.co} className="loop-row flex items-center gap-3 border-b border-white/[0.06] py-3 last:border-b-0" style={d(k * 0.25)}>
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] bg-[#1b1c22] text-[12px] font-bold text-fg-2">{s.co[0]}</span>
            <span className="relative min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-bold text-fg">{s.co}</span>
              <span className={`relative mt-0.5 inline-block max-w-full truncate text-[12.5px] ${s.old ? "text-dim" : "text-muted"}`}>
                {s.what} · {s.when}
                {s.old && <span className="strike absolute left-0 right-0 top-1/2 h-px bg-fg/60" />}
              </span>
            </span>
            <Tag hot={s.hot} dim={s.old}>
              {s.tag}
            </Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- brief */

function Brief() {
  return (
    <div className="ui h-full p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-[13.5px] font-bold text-fg">Northwind Market</span>
        <span className="shrink-0 text-[11.5px] text-dim">Researched today</span>
      </div>
      <div className="mt-4 space-y-3 text-[13.5px] leading-[1.55]">
        <p className="text-fg-2">
          <Tag>Observed</Tag>{" "}
          <span className="ml-1">Northwind Market started paying sellers in Germany and France this month</span>{" "}
          <span className="cite rounded px-1 text-muted" style={d(0)}>
            [1]
          </span>
          <span className="cite rounded px-1 text-muted" style={d(3)}>
            [2]
          </span>
        </p>
        <p className="text-muted">
          <Tag dim>Inferred</Tag> <span className="ml-1">New payout corridors usually mean new reconciliation work.</span>
        </p>
      </div>
      <div className="mt-4 rounded-[10px] border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] uppercase tracking-[0.12em] text-dim">Recommended angle</span>
          <Tag hot>Act now</Tag>
        </div>
        <p className="mt-2 text-[13px] leading-[1.5] text-fg-2">Open with the Germany launch and how sellers get paid in euros. Ask the Head of Payments how they reconcile it today.</p>
      </div>
      <ul className="mt-3 space-y-1 text-[12px]">
        <li className="cite flex items-center justify-between gap-3 rounded px-1.5 py-1 text-muted" style={d(0)}>
          <span className="truncate">[1] northwind-market.example</span>
          <span className="shrink-0">Happened 2 Oct 2026</span>
        </li>
        <li className="cite flex items-center justify-between gap-3 rounded px-1.5 py-1 text-muted" style={d(3)}>
          <span className="truncate">[2] Industry news</span>
          <span className="shrink-0">Published 3 Oct 2026</span>
        </li>
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- people */

const PEOPLE = [
  { i: "PR", name: "Priya R.", role: "Head of Payments" },
  { i: "DK", name: "Daniel K.", role: "VP Finance" },
  { i: "MS", name: "Maya S.", role: "Payments Operations" },
];

function Pointer() {
  return (
    <svg viewBox="0 0 12 12" className="h-[15px] w-[15px] drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]" aria-hidden>
      <path d="M1 1l10 4-4.2 1.4L5.4 11z" fill="#f4efe6" stroke="#07080a" strokeWidth=".8" strokeLinejoin="round" />
    </svg>
  );
}

function People() {
  return (
    <div className="ui relative h-full min-h-[262px] overflow-hidden p-3 sm:p-4">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-1 pb-3 text-[12px]">
        <span className="text-fg-2">Apollo people search</span>
        <span className="text-dim">0 credits</span>
      </div>
      <ul>
        {PEOPLE.map((p, k) => (
          <li key={p.name} className="flex items-center gap-3 border-b border-white/[0.06] px-1 py-2.5 last:border-b-0">
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#1f2027] text-[11px] font-bold text-fg-2">{p.i}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-bold text-fg">{p.name}</span>
              <span className="block truncate text-[12px] text-muted">{p.role}</span>
            </span>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11.5px] ring-1 ${k === 0 ? "text-fg ring-white/30" : "text-muted ring-white/10"}`}>Reveal email</span>
          </li>
        ))}
      </ul>

      {/* approval bound to the person, the field and the credits */}
      <div className="approval absolute bottom-3 right-3 w-[min(272px,calc(100%-24px))] rounded-[12px] border border-white/15 bg-[#17181e] p-3.5 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.95)]">
        <p className="text-[13px] font-bold text-fg">Look up Priya&apos;s email?</p>
        <p className="mt-1 text-[11.5px] leading-[1.5] text-muted">Your Apollo connection · 1 credit if an email is found. Nothing is asked of Apollo until you approve.</p>
        <div className="mt-3 flex justify-end gap-2 text-[12px]">
          <span className="rounded-full px-3 py-1.5 text-muted">Cancel</span>
          <span className="rounded-full bg-accent px-3 py-1.5 font-bold text-[#14080a]">Approve once</span>
        </div>
      </div>

      <div className="found absolute bottom-3 left-3 right-3 flex items-center gap-2.5 rounded-[10px] border border-white/15 bg-[#17181e] px-3 py-2.5 text-[12.5px] text-fg">
        <svg viewBox="0 0 16 16" className="h-[14px] w-[14px] text-fg" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 8.5l3 3 7-7" />
        </svg>
        Email found for Priya R. · 1 credit used · logged
      </div>

      <span className="cursor pointer-events-none absolute right-[34px] top-[60px]" style={{ "--cx": "-24px", "--cy": "158px" } as CSSProperties}>
        <Pointer />
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- drafts */

const LINES = [
  "Hi Priya, I saw Northwind Market now pays sellers in Germany and France.",
  "New corridors often mean new payout reconciliation work.",
  "Would a short call next week be useful to compare notes?",
];

function Draft() {
  return (
    <div className="ui h-full p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 text-[12px]">
        <span className="truncate text-muted">
          To <span className="text-fg-2">Priya R., Head of Payments</span>
        </span>
        <Tag>Draft · v1</Tag>
      </div>
      <p className="mt-3 truncate text-[13.5px] font-bold text-fg">Payouts to sellers in Germany and France</p>
      <div className="mt-3 space-y-1.5 text-[13px] leading-[1.55] text-fg-2">
        {LINES.map((l, k) => (
          <p key={l} className="loop-row" style={d(0.2 + k * 0.6)}>
            {l}
            {k === 0 && <span className="ml-1 text-muted">[1]</span>}
          </p>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-3">
        <span className="text-[12px] text-muted">3 sentences · 1 sourced · 0 flagged</span>
        <span className="flex gap-2 text-[12px]">
          <span className="rounded-full bg-fg px-3 py-1.5 font-bold text-ink">Copy draft</span>
          <span className="rounded-full px-3 py-1.5 text-fg-2 ring-1 ring-white/15">Export</span>
        </span>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <Reveal id="product" className="relative">
      <div className="frame pad-x py-14 lg:py-20">
        <SectionHead
          eyebrow="Product"
          title="From a target list to outreach worth sending."
          lede="One workflow, done well. Research real accounts, see why a signal matters to what you sell, approve any paid lookup, and leave with a draft you can trust."
        />

        <div className="mx-auto mt-10 grid max-w-[1150px] gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-5">
          <Card i={0} title="Signals, not a news feed" body="NORYX sorts what it finds into Act now, Monitor and Background. Old news stays old, and if nothing qualifies it says so.">
            <Signals />
          </Card>
          <Card i={1} title="Briefs with receipts" body="Every claim links to its source and its date. Facts and inferences are labelled, so you know what is known and what is a guess.">
            <Brief />
          </Card>
          <Card i={2} title="People, without burning credits" body="Find the right roles with a free Apollo search. Contact details are looked up only after you approve the exact person, field and cost.">
            <People />
          </Card>
          <Card i={3} title="Drafts you edit. Never auto-sent." body="Outreach is written only from cited evidence and your approved claims. Unsupported sentences are removed. You copy it and send it yourself.">
            <Draft />
          </Card>
        </div>
      </div>
    </Reveal>
  );
}
