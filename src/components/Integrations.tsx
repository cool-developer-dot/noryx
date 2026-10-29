import type { ReactNode } from "react";
import { Apollo, Dynamics, FileCsv, Gmail, Globe, Gong, GoogleCalendar, HubSpot, Salesforce } from "./logos";
import Reveal from "./Reveal";

type Tool = { name: string; logo: ReactNode };

/* What the pilot runs on today. */
const LIVE: Tool[] = [
  { name: "Apollo", logo: <Apollo className="h-[24px] w-[24px]" /> },
  { name: "CSV import", logo: <FileCsv className="h-[23px] w-[23px] text-fg-2" /> },
  { name: "Company websites", logo: <Globe className="h-[22px] w-[22px] text-fg-2" /> },
];

/* On the roadmap, added in the order pilot users ask for them. */
const NEXT: Tool[] = [
  { name: "HubSpot", logo: <HubSpot className="h-[25px] w-[25px]" /> },
  { name: "Salesforce", logo: <Salesforce className="h-[20px] w-[29px]" /> },
  { name: "Gmail", logo: <Gmail className="h-[18px] w-[24px]" /> },
  { name: "Google Calendar", logo: <GoogleCalendar className="h-[25px] w-[25px]" /> },
  { name: "Gong", logo: <Gong className="h-[23px] w-[23px]" /> },
  { name: "Dynamics 365", logo: <Dynamics className="h-[25px] w-[25px]" /> },
];

function Group({ label, live = false }: { label: string; live?: boolean }) {
  return (
    <li className="flex shrink-0 items-center px-7 lg:px-9">
      <span className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${live ? "bg-white/[0.08] text-fg ring-1 ring-white/15" : "text-dim ring-1 ring-dashed ring-white/15"}`}>
        <span className={`h-[6px] w-[6px] rounded-full ${live ? "bg-accent" : "ring-1 ring-dim"}`} />
        {label}
      </span>
    </li>
  );
}

function Row() {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden>
      <Group label="Live today" live />
      {LIVE.map((t) => (
        <li key={t.name} className="flex shrink-0 items-center gap-3 px-7 text-[16px] text-fg-2 lg:px-9">
          {t.logo}
          <span className="whitespace-nowrap">{t.name}</span>
        </li>
      ))}
      <Group label="Next, by pilot demand" />
      {NEXT.map((t) => (
        <li key={t.name} className="flex shrink-0 items-center gap-3 px-7 text-[16px] text-muted lg:px-9">
          {t.logo}
          <span className="whitespace-nowrap">{t.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Integrations() {
  return (
    <Reveal className="relative border-y border-white/[0.08]">
      <div className="frame flex flex-col lg:flex-row">
        <div className="pad-x shrink-0 border-b border-white/[0.08] py-6 lg:flex lg:w-[300px] lg:flex-col lg:justify-center lg:border-b-0 lg:border-r lg:py-0 lg:pr-8">
          <p className="text-[15px] text-fg">Works with your stack</p>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-muted">Apollo is live today. CRM, email and calls follow what pilots ask for.</p>
        </div>
        <div className="marquee-wrap relative min-w-0 flex-1 overflow-hidden py-6 lg:py-7">
          <p className="sr-only">Live today: Apollo, CSV import and company websites. Next, in the order pilot users ask for them: HubSpot, Salesforce, Gmail, Google Calendar, Gong and Dynamics 365.</p>
          <div className="marquee">
            <Row />
            <Row />
          </div>
          <span className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#07080a] to-transparent" aria-hidden />
          <span className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#07080a] to-transparent" aria-hidden />
        </div>
      </div>
    </Reveal>
  );
}
