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
      className={`relative block h-[18px] w-[18px] shrink-0 transition-[transform,color] duration-500 ease-out ${open ? "rotate-45 text-accent" : "text-[#52525b] group-hover:text-[#0c0c14]"}`}
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
      <div className="section-x section-y mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[6vw]">
          {/* left */}
          <div>
            <p className="eyebrow eyebrow-light pfade">FAQ</p>
            <h2 className="h-display h-section pfade mt-5 text-[#0c0c14] lg:mt-6" style={{ ["--d" as string]: "0.1s" }}>
              Questions, answered.
            </h2>
            <p className="body-copy body-copy-light pfade mt-6 max-w-[34ch] lg:mt-8" style={{ ["--d" as string]: "0.2s" }}>
              Everything you need to know before seeing NORYX in action.
            </p>
          </div>

          {/* right */}
          <ul className="border-t border-[#0c0c14]/20" role="list">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={f.q}
                  className={`pfade border-b transition-colors duration-500 ${isOpen ? "border-[#0c0c14]/60" : "border-[#0c0c14]/20"}`}
                  style={{ ["--d" as string]: `${0.1 + i * 0.07}s` }}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left lg:py-7"
                    >
                      <span className="text-[clamp(1.125rem,4.6vw,1.375rem)] font-bold leading-[1.3] tracking-[-0.025em] text-[#0c0c14]">{f.q}</span>
                      <span className="pt-[4px]">
                        <Icon open={isOpen} />
                      </span>
                    </button>
                  </h3>

                  <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} data-open={isOpen} className="faq-panel">
                    <div>
                      <div className="pb-8 pr-2 sm:pr-10">
                        {f.lead && <p className="text-[clamp(1.125rem,4.6vw,1.375rem)] leading-[1.35] tracking-[-0.02em] text-[#0c0c14]">{f.lead}</p>}
                        <p className="body-copy body-copy-light mt-3">{f.a}</p>
                        {f.chips && (
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {f.chips.map((c) => (
                              <li key={c} className="border border-[#0c0c14]/20 px-3 py-1.5 text-[13px] text-[#3f3f46]">
                                {c}
                              </li>
                            ))}
                          </ul>
                        )}
                        {f.cta && (
                          <a href="#demo" className="btn-primary group mt-6">
                            Book a demo
                            <svg viewBox="0 0 22 10" className="h-[9px] w-[20px] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
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
    </Reveal>
  );
}
