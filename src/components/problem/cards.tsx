import type { ReactNode } from "react";
import {
  ApolloLogo,
  CalendarLogo,
  GmailLogo,
  LinkedInLogo,
  SalesforceLogo,
  ZoomLogo,
} from "../icons";
import { Thumb } from "./art";
import { CountUp } from "./Motion";

const Dots = () => (
  <span className="flex items-center gap-[2.5px]" aria-hidden>
    {[0, 1, 2].map((i) => (
      <span key={i} className="h-[2.5px] w-[2.5px] rounded-full bg-[#33344a]" />
    ))}
  </span>
);

function Head({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[9px]">
        <span className="flex h-[20px] w-[22px] items-center justify-center">{icon}</span>
        <span className="font-cond text-[12.5px] font-semibold uppercase leading-none tracking-[0.06em] text-[#0b0b22]">
          {title}
        </span>
      </div>
      <Dots />
    </div>
  );
}

const MUTED = "text-[#6b6c7a]";

/* ---------- 01 CRM ---------- */
export function CrmCard() {
  return (
    <div className="pcard h-full px-[17px] pb-[14px] pt-[15px]">
      <Head icon={<SalesforceLogo className="h-[18px] w-[26px]" />} title="CRM" />
      <div className="mt-[22px] font-cond text-[15px] font-semibold uppercase leading-none tracking-[0.03em] text-[#0b0b22]">
        Acme Corp
      </div>
      <dl className="mt-[14px] space-y-[11px] text-[10.5px]">
        <div className="flex items-center justify-between">
          <dt className={MUTED}>Stage</dt>
          <dd className="flex w-[78px] items-center gap-[7px] text-[#0b0b22]">
            <span className="h-[6px] w-[6px] rounded-full bg-[#2f6fed]" />
            Discovery
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className={MUTED}>Deal value</dt>
          <dd className="w-[78px] text-[#0b0b22]">$120,000</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className={MUTED}>Last activity</dt>
          <dd className="w-[78px] text-[#0b0b22]">4 days ago</dd>
        </div>
      </dl>
    </div>
  );
}

/* ---------- 02 Sales Navigator ---------- */
export function Avatar({ className = "", tone = "#c9a58a", hair = "#1b1410", short = false }: { className?: string; tone?: string; hair?: string; short?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" fill="#d9d4cb" />
      <path d="M6 40c1-9 7-12 14-12s13 3 14 12z" fill="#2a2a33" />
      <ellipse cx="20" cy="18" rx="7" ry="8.4" fill={tone} />
      <path d="M12 17c0-8 4-11 9-11 5 0 8 3 7 11-1-4-3-6-7-6s-7 2-9 6z" fill={hair} />
      {!short && <path d="M12 16c-2 6-1 13 1 15 0-4 1-9 0-15zM28 16c2 6 1 13-1 15 0-4-1-9 0-15z" fill={hair} />}
    </svg>
  );
}

export function SalesNavCard() {
  return (
    <div className="pcard h-full px-[17px] pb-[14px] pt-[15px]">
      <Head icon={<LinkedInLogo className="h-[20px] w-[20px]" />} title="Sales Navigator" />
      <div className="mt-[17px] flex gap-[11px]">
        <Avatar className="h-[38px] w-[38px] shrink-0 rounded-full" />
        <div className="min-w-0">
          <div className="text-[11px] font-semibold leading-none text-[#0b0b22]">Sarah Chen</div>
          <div className={`mt-[5px] text-[9.5px] leading-none ${MUTED}`}>VP Revenue</div>
          <span className="mt-[8px] inline-block whitespace-nowrap rounded-[3px] bg-[#e6eefc] px-[6px] py-[3.5px] text-[9px] font-medium leading-none text-[#2858c4]">
            New role · 2 months
          </span>
        </div>
      </div>
      <p className={`mt-[9px] text-[9.5px] leading-[1.35] ${MUTED}`}>
        Recently posted about
        <br />
        go-to-market expansion
      </p>
    </div>
  );
}

/* ---------- 04 Apollo ---------- */
export function ApolloCard() {
  const row = "flex items-center justify-between";
  return (
    <div className="pcard h-full px-[17px] pb-[14px] pt-[15px]">
      <Head icon={<ApolloLogo className="h-[20px] w-[20px]" />} title="Apollo" />
      <dl className="mt-[22px] space-y-[13px] text-[10.5px]">
        <div className={row}>
          <dt className="text-[#33344a]">Headcount</dt>
          <dd className="w-[96px] font-medium text-[#1f9d55]">+18%</dd>
        </div>
        <div className={row}>
          <dt className="text-[#33344a]">Hiring</dt>
          <dd className="w-[96px] whitespace-nowrap font-medium text-[#0b0b22]">Revenue Operations</dd>
        </div>
        <div className={row}>
          <dt className="text-[#33344a]">Intent signal</dt>
          <dd className="w-[96px]">
            <span className="rounded-[3px] bg-[#fde3e1] px-[8px] py-[4px] text-[9.5px] font-medium text-[#d62d2d]">
              High
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}

/* ---------- 03 Email ---------- */
export function EmailCard() {
  return (
    <div className="pcard h-full px-[17px] pb-[13px] pt-[14px]">
      <Head icon={<GmailLogo className="h-[15px] w-[20px]" />} title="Email" />
      <div className="mt-[15px] flex items-center gap-[8px] text-[9.5px] font-semibold text-[#0b0b22]">
        <svg viewBox="0 0 20 16" className="h-[11px] w-[14px] shrink-0 text-[#8b8c99]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <rect x="1" y="1.5" width="18" height="13" rx="2" />
          <path d="m2 3.500 8 6 8-6" />
        </svg>
        Re: Forecasting process
      </div>
      <p className="mt-[8px] text-[10.5px] leading-[1.35] text-[#0b0b22]">
        “Forecasting is still
        <br />
        largely manual...”
      </p>
      <div className={`mt-[7px] text-[9px] ${MUTED}`}>3 days ago</div>
    </div>
  );
}

/* ---------- 05 Call intelligence ---------- */
const WAVE = [2, 3, 2, 5, 3, 9, 4, 14, 6, 10, 4, 12, 5, 8, 3, 6, 4, 9, 3, 5, 2, 7, 3, 4, 2, 6, 3, 2, 4, 2, 3, 2, 5, 2, 3, 2, 2, 3, 2, 2, 2, 3];

export function CallCard() {
  return (
    <div className="pcard h-full px-[17px] pb-[14px] pt-[15px]">
      <Head icon={<ZoomLogo className="h-[22px] w-[22px]" />} title="Call Intelligence" />
      <div className="mt-[17px] flex items-center gap-[7px] rounded-[3px] bg-[#fde8e6] px-[9px] py-[6px] text-[9.5px] font-medium text-[#d62d2d]">
        <span className="h-[7px] w-[7px] rounded-full bg-[#ee3b3b]" />
        Objection detected
      </div>
      <div className="mt-[11px] text-[11.5px] font-medium leading-none text-[#0b0b22]">Implementation complexity</div>
      <div className={`mt-[6px] text-[9.5px] leading-none ${MUTED}`}>Mentioned 3 times</div>
      <div className="mt-[14px] flex items-end justify-between">
        <svg viewBox="0 0 168 16" className="h-[16px] w-[168px]" aria-hidden>
          {WAVE.map((h, i) => (
            <rect key={i} x={i * 4} y={16 - h} width="1.6" height={h} fill={i > 25 ? "#b9bac4" : "#4d4e63"} />
          ))}
        </svg>
        <span className="text-[10px] font-medium leading-none text-[#0b0b22]">42:17</span>
      </div>
    </div>
  );
}

/* ---------- 06 Calendar ---------- */
export function CalendarCard() {
  return (
    <div className="pcard h-full px-[17px] pb-[12px] pt-[14px]">
      <Head icon={<CalendarLogo className="h-[22px] w-[22px]" />} title="Calendar" />
      <div className="mt-[15px] text-[9.5px] font-semibold leading-none text-[#0b0b22]">Next meeting</div>
      <div className="mt-[7px] text-[9.5px] font-medium leading-none text-[#0b0b22]">Thu, 14 Mar · 14:30</div>
      <div className={`mt-[7px] text-[9.5px] leading-none ${MUTED}`}>Product demo with buying team</div>
      <div className="mt-[11px] flex items-center gap-[4px]">
        <Avatar className="h-[22px] w-[22px] rounded-full border border-white" />
        <Avatar className="-ml-[2px] h-[22px] w-[22px] rounded-full border border-white" tone="#b98a6a" hair="#2a1b12" />
        <span className={`ml-[2px] text-[9px] ${MUTED}`}>+3</span>
      </div>
    </div>
  );
}

/* ---------- 07 Research ---------- */
function Globe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#2f5fd0" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18M4.500 7.500h15M4.500 16.500h15M12 3v18" />
    </svg>
  );
}

export function ResearchCard() {
  return (
    <div className="pcard h-full px-[18px] pb-[14px] pt-[15px]">
      <Head icon={<Globe className="h-[22px] w-[22px]" />} title="Research" />
      <div className="mt-[20px] flex justify-between">
        <div>
          <div className="text-[12.5px] font-semibold leading-[1.35] text-[#0b0b22]">
            Expansion into
            <br />2 new markets
          </div>
          <ul className="mt-[12px] space-y-[6px] text-[9.5px] text-[#33344a]">
            <li className="flex items-center gap-[7px]">
              <span className="h-[5px] w-[5px] rounded-full bg-[#2f6fed]" />
              UK (2025)
            </li>
            <li className="flex items-center gap-[7px]">
              <span className="h-[5px] w-[5px] rounded-full bg-[#2f6fed]" />
              DACH (2025)
            </li>
          </ul>
        </div>
        <div className="w-[92px] shrink-0 whitespace-nowrap pt-[1px]">
          <Thumb className="h-[42px] w-[92px]" />
          <div className="mt-[10px] text-[9px] leading-[1.35] text-[#33344a]">
            Public funding round
            <br />
            $50M · Jan 2024
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 08 AI copilot ---------- */
function Knot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="#0b0b22" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
      {[0, 60, 120].map((r) => (
        <path key={r} transform={`rotate(${r} 16 16)`} d="M16 3.500 24.500 8.400v9.800L16 23.100 7.500 18.200V8.400z" />
      ))}
    </svg>
  );
}

export function CopilotCard() {
  return (
    <div className="pcard h-full px-[17px] pb-[14px] pt-[15px]">
      <Head icon={<Knot className="h-[24px] w-[24px]" />} title="AI Copilot" />
      <div className="mt-[20px] text-[12px] font-semibold leading-[1.45] text-[#0b0b22]">
        Previous isolated
        <br />
        account summary
      </div>
      <p className={`mt-[11px] text-[9.5px] leading-[1.4] ${MUTED}`}>
        Based on public information.
        <br />
        May be incomplete.
      </p>
    </div>
  );
}

/* ---------- Context gap ---------- */
export function GapBox() {
  const c = "gap-corner absolute h-[16px] w-[16px] border-[#ee3b3b]";
  return (
    <div className="relative h-full w-full overflow-hidden text-center text-[#0b0b22]">
      {/* marching dashed outline */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <rect x=".5" y=".5" rx="0" fill="none" stroke="#b9b8c2" strokeWidth="1" strokeDasharray="3 5" className="flow-line gap-rect" />
      </svg>
      <span className={`${c} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${c} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${c} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${c} bottom-0 right-0 border-b-2 border-r-2`} />
      {/* radar sweep */}
      <span className="scan-line pointer-events-none absolute inset-x-[10px] top-0 h-px bg-gradient-to-r from-transparent via-[#ee3b3b] to-transparent shadow-[0_0_14px_2px_rgba(238,59,59,0.45)]" />
      <div className="relative flex h-full flex-col items-center justify-center">
        <div className="gap-blink text-[8.5px] font-medium uppercase tracking-[0.24em] text-[#ee3b3b]">No shared context</div>
        <div className="mt-[12px] font-cond text-[24px] font-semibold uppercase leading-none tracking-[0.1em]">Context gap</div>
        <div className="mt-[6px] text-[12px] leading-none text-[#999aa6]">—</div>
        <div className="mt-[14px] text-[8.5px] font-medium uppercase leading-[1.7] tracking-[0.2em] text-[#33344a]">
          Signals found: <CountUp to={27} />
          <br />
          Connected: <span className="gap-zero font-semibold text-[#ee3b3b]">0</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Banner ---------- */
export function Banner() {
  return (
    <div className="relative flex h-full w-full flex-col items-stretch gap-4 overflow-hidden bg-[#fad96a] px-6 py-5 text-[#0b0b22] md:flex-row md:items-center md:gap-0 md:px-0 md:py-0">
      <span className="banner-shine pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/45 to-transparent" aria-hidden />
      <div className="flex items-center md:contents">
        <div className="flex shrink-0 items-center md:w-[72px] md:justify-center">
          <svg viewBox="0 0 28 28" className="warn-pulse h-[26px] w-[26px]" fill="none" stroke="#0b0b22" strokeWidth="1.7" strokeLinejoin="round" aria-hidden>
            <path d="M14 3.500 26 24.500H2z" />
            <path d="M14 11v6.500M14 20.500v.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="mx-5 hidden h-[52px] w-px bg-[#0b0b22]/45 md:block" />
        <div className="ml-4 font-cond text-[21px] font-bold uppercase leading-[1.18] tracking-[0.015em] md:ml-0 md:text-[22px]">
          Scattered context
          <br />
          creates missed moments.
        </div>
      </div>
      <span className="mx-[30px] hidden h-[52px] w-px bg-[#0b0b22]/45 md:block" />
      <div className="font-serif text-[16px] font-normal leading-[1.3] md:text-[17.5px]">
        The signal exists.
        <br />
        The seller has to assemble it manually.
      </div>
    </div>
  );
}
