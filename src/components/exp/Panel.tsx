import type { ReactNode } from "react";
import { Avatar } from "../problem/cards";

const MUTED = "text-[#8a8b96]";
const HAIR = "border-[#ebe8e1]";
const BLUE = "#3b78ee";
const GREEN = "#2fa56a";
const RED = "#ee2f2f";

/* ---------- icons (light stroke) ---------- */
const ico = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const BuildingIcon = () => (
  <svg viewBox="0 0 20 20" className="h-[16px] w-[16px]" {...ico} aria-hidden>
    <path d="M4 17V4h8v13M12 8h4v9M2 17h16M7 7h2M7 10h2M7 13h2" />
  </svg>
);
const GrowthIcon = () => (
  <svg viewBox="0 0 20 20" className="h-[16px] w-[16px]" {...ico} aria-hidden>
    <path d="M3 16h14M5 13l4-4 3 3 4-6M12 6h4v4" />
  </svg>
);
const DeskPerson = () => (
  <svg viewBox="0 0 20 20" className="h-[16px] w-[16px]" {...ico} aria-hidden>
    <circle cx="10" cy="6.500" r="3" />
    <path d="M3.500 17c0-3 3-5 6.500-5s6.500 2 6.500 5" />
  </svg>
);
const PersonIcon = () => (
  <svg viewBox="0 0 20 20" className="h-[16px] w-[16px]" {...ico} aria-hidden>
    <circle cx="10" cy="6.500" r="3.200" />
    <path d="M4 17c0-3.500 2.700-5.500 6-5.500s6 2 6 5.500z" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 20 20" className="h-[16px] w-[16px]" {...ico} aria-hidden>
    <path d="M10 18s-5.500-5-5.500-9a5.500 5.500 0 0 1 11 0c0 4-5.500 9-5.500 9z" />
    <circle cx="10" cy="9" r="2" />
  </svg>
);
const Warn = () => (
  <svg viewBox="0 0 28 28" className="h-[22px] w-[22px]" fill="none" stroke="#0c0c14" strokeWidth="1.4" strokeLinejoin="round" aria-hidden>
    <path d="M14 3.500 26 24.500H2z" />
    <path d="M14 11v6.500M14 20.500v.5" strokeLinecap="round" />
  </svg>
);
const Plane = () => (
  <svg viewBox="0 0 28 28" className="h-[26px] w-[26px]" aria-hidden>
    <path d="M26 3 3 11.500l8 3.200L13.500 24l3.800-6.500z" fill={RED} />
    <path d="M11 14.700 21 7" stroke="#fff" strokeWidth="1.2" fill="none" />
  </svg>
);
const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 22 10" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
    <path d="M0 5h19M15 1l4 4-4 4" />
  </svg>
);

function AcmeMarkLight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 5 5 35h5.600l2.400-5h14l2.400 5H35zM15 25l5-10.500L25 25z" fill="#fff" fillRule="evenodd" />
      <path d="M17 33c4-2 8-2 12 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- building blocks ---------- */
function Block({ n, title, children, className = "" }: { n: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`border-t pt-[20px] ${HAIR} ${className}`}>
      <header className="flex items-baseline gap-[14px]">
        <span className="font-cond text-[14px] font-semibold leading-none text-[#ee2f2f]">{n}</span>
        <h3 className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-[#0c0c14]">{title}</h3>
      </header>
      <div className="mt-[22px]">{children}</div>
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className={`text-[8.5px] font-medium uppercase leading-none tracking-[0.2em] ${MUTED}`}>{children}</div>;
}

function Bullet({ color, children }: { color: string; children: ReactNode }) {
  return (
    <li className="flex items-center gap-[12px] text-[12px] leading-none text-[#262735]">
      <span className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: color }} />
      {children}
    </li>
  );
}

function Row({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-[14px] text-[12px] leading-none text-[#262735]">
      <span className="text-[#9b9ca7]">{icon}</span>
      {children}
    </li>
  );
}

function Person({ name, role, note, tone, hair, short }: { name: string; role: string; note: string; tone?: string; hair?: string; short?: boolean }) {
  return (
    <div className="flex items-center gap-[14px]">
      <Avatar className="h-[38px] w-[38px] shrink-0 rounded-full" tone={tone} hair={hair} short={short} />
      <div className="min-w-0">
        <div className="text-[12px] font-semibold leading-none text-[#0c0c14]">
          {name}
          <span className="ml-[8px] font-normal text-[#6c6d7a]">{role}</span>
        </div>
        <div className={`mt-[6px] truncate text-[10px] leading-none ${MUTED}`}>{note}</div>
      </div>
    </div>
  );
}

/* ---------- panel ---------- */
export default function Panel() {
  return (
    <div className="@container h-full w-full">
      <div className="exp-panel flex h-full w-full flex-col rounded-[8px] px-6 py-8 @2xl:px-[40px] @4xl:py-[34px]">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[22px]">
            <span className="font-display text-[27px] leading-none tracking-[-0.01em] text-[#0c0c14]">NORYX</span>
            <span className={`hidden text-[8.5px] font-medium uppercase tracking-[0.2em] @md:block ${MUTED}`}>Account intelligence</span>
          </div>
          <div className={`hidden items-center gap-[14px] text-[8.5px] font-medium uppercase tracking-[0.16em] @2xl:flex ${MUTED}`}>
            <span>12 sources</span>
            <span className="h-[3px] w-[3px] rounded-full bg-[#c9c6bd]" />
            <span>27 signals</span>
            <span className="h-[3px] w-[3px] rounded-full bg-[#c9c6bd]" />
            <span>Updated 08:42</span>
          </div>
        </div>

        {/* ask */}
        <div className="mt-[26px] flex flex-col gap-4 rounded-[6px] border border-[#e6e3db] bg-white p-4 shadow-[0_1px_2px_rgba(10,10,35,0.03)] @md:flex-row @md:items-center @md:justify-between @md:py-[14px] @md:pl-[22px] @md:pr-[14px]">
          <div className="flex min-w-0 items-center gap-[14px] @md:gap-[18px]">
            <span className="h-[34px] w-[2px] shrink-0 bg-[#ee2f2f]" />
            <div className="min-w-0">
              <div className={`text-[8.5px] font-medium uppercase leading-none tracking-[0.2em] ${MUTED}`}>Ask NORYX</div>
              <div className="mt-[9px] font-serif text-[clamp(1.05rem,5.2vw,1.3rem)] font-normal leading-[1.15] text-[#0c0c14] @md:whitespace-nowrap @md:text-[21px] @md:leading-none">
                Prepare me for this account.
              </div>
            </div>
          </div>
          <span className="inline-flex h-[42px] w-full shrink-0 items-center justify-center gap-[10px] bg-[#ee2f2f] px-[22px] font-cond text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white @md:h-[40px] @md:w-auto">
            Prepare
            <Arrow className="h-[8px] w-[14px]" />
          </span>
        </div>

        {/* account */}
        <div className="mt-[44px] flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-[18px]">
            <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center bg-[#14141c]">
              <AcmeMarkLight className="h-[24px] w-[24px]" />
            </span>
            <div className="min-w-0">
              <div className="font-display text-[29px] uppercase leading-none tracking-[-0.005em] text-[#0c0c14]">Acme Corp</div>
              <div className={`mt-[9px] flex flex-wrap items-center gap-x-[10px] gap-y-1 text-[8.5px] font-medium uppercase tracking-[0.16em] ${MUTED}`}>
                <span>B2B Software</span>
                <span>·</span>
                <span>1,240 employees</span>
                <span className="hidden @md:inline">·</span>
                <span className="hidden @md:inline">San Francisco, CA</span>
              </div>
            </div>
          </div>
          <div className="hidden shrink-0 items-center gap-[9px] text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#1c8f50] @2xl:flex">
            <span className="h-[6px] w-[6px] rounded-full bg-[#2fa56a]" />
            Brief ready
            <span className={`ml-[6px] font-medium ${MUTED}`}>· Fit 92%</span>
          </div>
        </div>

        {/* 01 */}
        <section className={`mt-[34px] grid gap-8 border-t pt-[22px] @4xl:grid-cols-[1fr_250px] @4xl:gap-[48px] ${HAIR}`}>
          <div>
            <header className="flex items-baseline gap-[14px]">
              <span className="font-cond text-[14px] font-semibold leading-none text-[#ee2f2f]">01</span>
              <h3 className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-[#0c0c14]">Why this account, why now</h3>
            </header>
            <p className="mt-[20px] max-w-[520px] font-serif text-[24px] font-normal leading-[1.28] text-[#0c0c14]">
              ACME is expanding into two new markets while building its Revenue Operations function.
            </p>
            <p className={`mt-[14px] max-w-[430px] font-serif text-[14px] leading-[1.5] ${MUTED}`}>
              A recently appointed VP Revenue suggests the team may be reassessing forecasting and pipeline processes.
            </p>
          </div>
          <ul className="space-y-[18px] self-center">
            <Row icon={<GrowthIcon />}>Expansion into 2 new markets</Row>
            <Row icon={<DeskPerson />}>Revenue Operations hiring</Row>
            <Row icon={<PersonIcon />}>New VP Revenue</Row>
            <Row icon={<BuildingIcon />}>Headcount +18%</Row>
          </ul>
        </section>

        {/* 02–04 */}
        <div className="mt-[34px] grid gap-x-[44px] gap-y-[34px] @2xl:grid-cols-2 @4xl:grid-cols-3">
          <Block n="02" title="Who are they?">
            <ul className="space-y-[15px]">
              <Row icon={<BuildingIcon />}>Enterprise software company</Row>
              <Row icon={<DeskPerson />}>1,240 employees</Row>
              <Row icon={<PinIcon />}>San Francisco, CA</Row>
            </ul>
            <div className="mt-[26px]">
              <Label>Current context</Label>
              <ul className="mt-[14px] space-y-[11px]">
                <Bullet color={BLUE}>International expansion</Bullet>
                <Bullet color={BLUE}>Revenue team growth</Bullet>
                <Bullet color={BLUE}>New leadership</Bullet>
              </ul>
            </div>
          </Block>

          <Block n="03" title="What are they focused on?">
            <ul className="space-y-[17px]">
              {[
                ["01", "International expansion", "High"],
                ["02", "Building Revenue Operations", "High"],
                ["03", "Improving pipeline visibility", "Medium"],
                ["04", "Scaling forecasting processes", "Medium"],
              ].map(([n, t, p]) => (
                <li key={n} className="flex items-center gap-[10px] whitespace-nowrap text-[11.5px] leading-none text-[#262735]">
                  <span className={`w-[14px] text-[9px] ${MUTED}`}>{n}</span>
                  <span className="flex-1">{t}</span>
                  <span className={`w-[42px] text-right text-[8px] font-semibold uppercase tracking-[0.14em] ${p === "High" ? "text-[#e0463c]" : "text-[#a3a4af]"}`}>{p}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block n="04" title="Who should I speak with?" className="@2xl:max-[895px]:col-span-2">
            <div className="space-y-[22px]">
              <div>
                <Person name="Sarah Chen" role="VP Revenue" note="Primary stakeholder · new role, 2 months" />
                <p className={`mt-[10px] pl-[52px] text-[10px] leading-[1.5] ${MUTED}`}>
                  Likely mandate: improve predictability across the revenue organization.
                </p>
              </div>
              <Person name="Mark Williams" role="CRO" note="Executive sponsor potential" short tone="#b08467" hair="#1c1612" />
              <Person name="Priya Desai" role="RevOps Director" note="Operational stakeholder" tone="#a9744f" hair="#120d0a" />
            </div>
          </Block>
        </div>

        {/* 05–07 */}
        <div className="mt-[34px] grid gap-x-[44px] gap-y-[34px] @2xl:grid-cols-2 @4xl:grid-cols-3">
          <Block n="05" title="What might matter to them?">
            <div className="space-y-[24px]">
              <div>
                <Label>Confirmed signals</Label>
                <ul className="mt-[13px] space-y-[11px]">
                  <Bullet color={GREEN}>Revenue Operations hiring</Bullet>
                  <Bullet color={GREEN}>Expansion into two markets</Bullet>
                </ul>
              </div>
              <div>
                <Label>Likely priorities</Label>
                <ul className="mt-[13px] space-y-[11px]">
                  <Bullet color={BLUE}>Forecast accuracy</Bullet>
                  <Bullet color={BLUE}>Pipeline visibility</Bullet>
                  <Bullet color={BLUE}>Scalable processes</Bullet>
                </ul>
              </div>
              <div>
                <Label>Potential pain</Label>
                <ul className="mt-[13px]">
                  <Bullet color={RED}>Fragmented forecasting inputs</Bullet>
                </ul>
              </div>
            </div>
          </Block>

          <Block n="06" title="What should I ask?">
            <ol className="space-y-[22px]">
              {[
                ["“How are forecasting inputs currently consolidated across regions?”", "Tests whether expansion is creating visibility problems."],
                ["“Where does your team lose the most time between pipeline review and forecast submission?”", "Surfaces process friction without assuming the problem."],
                ["“What would need to change for your team to trust the forecast earlier in the quarter?”", "Connects operational pain to business impact."],
              ].map(([q, s]) => (
                <li key={q}>
                  <p className="font-serif text-[14px] leading-[1.35] text-[#0c0c14]">{q}</p>
                  <p className={`mt-[7px] text-[9.5px] leading-[1.4] ${MUTED}`}>{s}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block n="07" title="What should I avoid?" className="@2xl:max-[895px]:col-span-2">
            <div className="rounded-[6px] bg-[#fbf5e3] px-[18px] py-[18px]">
              <div className="flex gap-[14px]">
                <span className="shrink-0 pt-[1px]">
                  <Warn />
                </span>
                <div>
                  <div className="text-[8.5px] font-semibold uppercase leading-none tracking-[0.18em] text-[#d33a2c]">Don&apos;t lead with</div>
                  <p className="mt-[9px] font-serif text-[14px] leading-[1.35] text-[#0c0c14]">“Replace your current revenue stack.”</p>
                </div>
              </div>
              <div className="mt-[20px] space-y-[16px] pl-[36px]">
                <div>
                  <Label>Why</Label>
                  <p className="mt-[8px] text-[10.5px] leading-[1.5] text-[#4a4b58]">Available context suggests ACME is investing in its existing systems.</p>
                </div>
                <div>
                  <Label>Better frame</Label>
                  <p className="mt-[8px] text-[10.5px] leading-[1.5] text-[#4a4b58]">Connect the intelligence already inside the tools they use.</p>
                </div>
              </div>
            </div>
          </Block>
        </div>

        {/* 08 */}
        <section className={`mt-[34px] border-t pt-[20px] ${HAIR}`}>
          <header className="flex items-baseline gap-[14px]">
            <span className="font-cond text-[14px] font-semibold leading-none text-[#ee2f2f]">08</span>
            <h3 className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-[#0c0c14]">What should I do next?</h3>
          </header>
          <div className="mt-[22px] flex flex-col gap-6 @3xl:flex-row @3xl:items-center @3xl:justify-between">
            <div className="flex items-center gap-[18px]">
              <Plane />
              <div>
                <div className="text-[8.5px] font-semibold uppercase leading-none tracking-[0.18em] text-[#ee2f2f]">Next best action</div>
                <div className="mt-[9px] text-[17px] font-semibold leading-none text-[#0c0c14]">Speak with Sarah Chen.</div>
                <div className="mt-[8px] text-[10.5px] leading-[1.4] text-[#6c6d7a]">Lead with forecast visibility during international expansion.</div>
              </div>
            </div>
            <span className="inline-flex h-[42px] shrink-0 items-center justify-center gap-[12px] bg-[#ee2f2f] px-[22px] font-cond text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white">
              Prepare discovery questions
              <Arrow className="h-[8px] w-[14px]" />
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
