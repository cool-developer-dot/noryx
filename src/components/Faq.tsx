"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const FAQS: { q: string; lead?: string; a: string; chips?: string[]; cta?: boolean }[] = [
  {
    q: "What exactly does NORYX do?",
    lead: "One connected layer for your revenue team.",
    a: "NORYX brings together prospecting data, account research, conversations, CRM history, and calendar context — then turns it into a clear brief: who to engage, what matters, why now, what to say, and what to do next.",
  },
  {
    q: "Does NORYX replace our existing sales tools?",
    lead: "No. Your tools stay.",
    a: "NORYX connects intelligence across the systems your revenue team already uses — carrying context from research and conversations into preparation, follow-up, and next actions.",
    chips: ["CRM", "Sales Navigator", "Apollo", "Conversations", "Calendar", "AI"],
  },
  {
    q: "What information can NORYX bring together?",
    lead: "Everything that already exists — in one place.",
    a: "Account and deal data from your CRM, people and role insights, intent signals, email and call context, calendar touchpoints, and public company research. Every insight is traceable to its source.",
  },
  {
    q: "Who is NORYX built for?",
    lead: "Everyone who touches revenue.",
    a: "Account executives, SDRs, sales leaders, and revenue operations — each seeing the context they need, at the moment they need it.",
    chips: ["Account Executives", "SDRs", "Sales Leaders", "Revenue Operations"],
  },
  {
    q: "Does NORYX make decisions for sellers?",
    lead: "No. NORYX recommends. People decide.",
    a: "Every suggested next step is explainable, editable, and rooted in sources your team can verify. The seller always stays in control of the conversation.",
  },
  {
    q: "How do we see NORYX in action?",
    lead: "Best seen on a real account.",
    a: "Book a short demo. We’ll walk through a real account — from the first question to the next best action.",
    cta: true,
  },
];

function Icon({ open }: { open: boolean }) {
  return (
    <span
      className={`relative block h-[18px] w-[18px] shrink-0 text-[#ee2f2f] transition-transform duration-500 ease-out ${open ? "rotate-45" : ""}`}
      aria-hidden
    >
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
    </span>
  );
}

export default function Faq() {
  // All questions are closed by default.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Reveal id="faq" className="relative bg-[#f9f7f2] text-[#0c0c14]">
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-12 sm:px-8 md:pt-16 lg:px-[6vw] lg:pb-20 lg:pt-[64px] xl:px-[64px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-0">
          {/* left */}
          <div className="relative lg:pr-[4vw] lg:pb-4">
            <div className="pfade flex items-center gap-[21px]">
              <span className="h-[3px] w-[35px] bg-[#ee2f2f]" />
              <span className="text-[10.5px] font-medium uppercase tracking-[0.3em]">06 / Before we talk</span>
            </div>

            <h2
              className="pfade mt-8 font-league uppercase text-[#0c0c14] lg:mt-[34px]"
              style={{ ["--d" as string]: "0.1s", letterSpacing: "-0.035em", fontSize: "clamp(4.4rem,19.5vw,13rem)", lineHeight: 0.86 }}
            >
              <span className="block lg:text-[min(11.6vw,12rem)]">Questions,</span>
              <span className="block whitespace-nowrap lg:text-[min(11.6vw,12rem)]">
                Answered
                <span className="ml-[0.04em] inline-block rounded-full bg-[#ee2f2f]" style={{ width: "0.14em", height: "0.14em" }} />
              </span>
            </h2>

            <p
              className="pfade mt-8 max-w-[420px] font-serif text-[clamp(1.35rem,5.2vw,1.9rem)] font-light leading-[1.22] text-[#14141f] lg:mt-[44px]"
              style={{ ["--d" as string]: "0.2s" }}
            >
              Everything you need to know before seeing NORYX in action.
            </p>

            <div className="pfade mt-10 hidden border-l border-[#0c0c14]/40 pl-[18px] text-[9px] font-medium uppercase leading-[2] tracking-[0.26em] lg:mt-[120px] lg:block" style={{ ["--d" as string]: "0.3s" }}>
              6 questions
              <br />
              02 min read
            </div>
          </div>

          {/* right */}
          <div className="relative lg:border-l lg:border-[#0c0c14]/20 lg:pl-[4vw] xl:pl-[64px]">
            <ul className="border-t border-[#0c0c14]/20 lg:border-t-0" role="list">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                const n = String(i + 1).padStart(2, "0");
                return (
                  <li
                    key={f.q}
                    className={`pfade border-b transition-colors duration-500 ${isOpen ? "border-[#ee2f2f]/70" : "border-[#0c0c14]/20"} ${i === 0 ? "lg:border-t lg:border-t-transparent" : ""}`}
                    style={{ ["--d" as string]: `${0.1 + i * 0.07}s` }}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="group flex w-full items-start gap-5 py-6 text-left sm:gap-8 lg:py-[30px]"
                      >
                        <span className={`w-6 shrink-0 pt-[6px] text-[11px] font-medium leading-none tracking-[0.1em] transition-colors duration-300 ${isOpen ? "text-[#ee2f2f]" : "text-[#0c0c14]/70"}`}>
                          {n}
                        </span>
                        <span className="flex-1 font-cond text-[clamp(1.05rem,4.4vw,1.3rem)] font-bold uppercase leading-[1.25] tracking-[0.035em] text-[#0c0c14] transition-transform duration-300 group-hover:translate-x-1">
                          {f.q}
                        </span>
                        <span className="pt-[3px]">
                          <Icon open={isOpen} />
                        </span>
                      </button>
                    </h3>

                    <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} data-open={isOpen} className="faq-panel">
                      <div>
                        <div className="pb-8 pl-[44px] pr-2 sm:pl-[56px] sm:pr-10">
                          {f.lead && <p className="font-serif text-[clamp(1.35rem,5vw,1.65rem)] font-normal leading-[1.2] text-[#0c0c14]">{f.lead}</p>}
                          <p className="mt-4 max-w-[560px] font-serif text-[clamp(1rem,3.7vw,1.1rem)] font-light leading-[1.55] text-[#4a4b58]">{f.a}</p>
                          {f.chips && (
                            <ul className="mt-6 flex flex-wrap items-center gap-y-2 text-[8.5px] font-medium uppercase tracking-[0.2em] text-[#0c0c14]">
                              {f.chips.map((c, k) => (
                                <li key={c} className={`pr-4 ${k > 0 ? "border-l border-[#0c0c14]/30 pl-4" : ""}`}>
                                  {c}
                                </li>
                              ))}
                            </ul>
                          )}
                          {f.cta && (
                            <a
                              href="#demo"
                              className="mt-6 inline-flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#ee2f2f] transition-[gap] hover:gap-5"
                            >
                              Book a demo
                              <svg viewBox="0 0 22 10" className="h-[9px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                                <path d="M0 5h19M15 1l4 4-4 4" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* hand-off strip */}
        <div className="pfade relative mt-14 flex items-center gap-4 text-[9px] font-medium uppercase tracking-[0.24em] sm:gap-6 lg:mt-[84px]" style={{ ["--d" as string]: "0.5s" }}>
          <span className="relative hidden h-[7px] w-[7px] shrink-0 rounded-full bg-[#ee2f2f] shadow-[0_0_0_4px_rgba(238,47,47,0.15)] lg:block">
            <span className="absolute left-1/2 top-full h-[88px] w-px -translate-x-1/2 bg-[#ee2f2f]/70" />
          </span>
          <span className="leading-[1.8]">The next question is better seen than answered.</span>
          <span className="hidden h-px flex-1 bg-[#0c0c14]/25 sm:block" />
          <a href="#demo" className="group ml-auto inline-flex shrink-0 items-center gap-3 whitespace-nowrap text-[#0c0c14] transition-colors hover:text-[#ee2f2f]">
            See NORYX in action
            <svg viewBox="0 0 10 22" className="h-[18px] w-[8px] transition-transform group-hover:translate-y-1" fill="none" stroke="#ee2f2f" strokeWidth="1.3" aria-hidden>
              <path d="M5 1v18M1.500 15.500 5 19l3.500-3.500" />
            </svg>
          </a>
        </div>
      </div>
    </Reveal>
  );
}
