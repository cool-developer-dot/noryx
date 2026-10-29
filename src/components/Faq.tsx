"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { Rv } from "./ui";

const GROUPS: { name: string; items: { q: string; a: string }[] }[] = [
  {
    name: "Getting started",
    items: [
      {
        q: "What does NORYX do?",
        a: "NORYX takes your target accounts and what you sell, researches each account from permitted sources, and tells you which accounts deserve attention now, who to contact, why, and what to say. Every recommendation shows its evidence and dates.",
      },
      {
        q: "What do I need to start?",
        a: "A short description of what you sell and five to ten target companies. Apollo is optional and only needed for people search and contact lookups. You don't need a CRM, inbox access or your own AI subscription.",
      },
    ],
  },
  {
    name: "Data and credits",
    items: [
      {
        q: "Which tools does NORYX connect to?",
        a: "Apollo, with your own account, is live today. CRM, email, calendar and call tools come next, in the order our pilot users ask for them. We only show a tool as connected after checking that it actually works.",
      },
      {
        q: "Will NORYX spend my Apollo credits?",
        a: "Only when you approve it. People search is free. A contact lookup asks for your approval first, showing the person, the fields and the expected credits. Page loads, imports and refreshes never spend credits.",
      },
      {
        q: "Do I need my own AI subscription?",
        a: "No. NORYX runs and manages the AI engine for you, starting with Anthropic's Claude. Usage is measured for each workspace, against a budget you can see.",
      },
    ],
  },
  {
    name: "Trust",
    items: [
      {
        q: "Does NORYX send emails for me?",
        a: "No. NORYX writes an editable draft from cited evidence and your approved claims. You copy or export it and send it yourself.",
      },
      {
        q: "Is my data shared with other customers?",
        a: "No. Each workspace's accounts, research and recommendations stay in that workspace, and members only see what their role allows. We don't train models on your private data.",
      },
      {
        q: "How is this different from a general AI assistant?",
        a: "A general assistant answers the question you type. NORYX runs the account workflow for you: it checks evidence, dates events, qualifies signals against what you sell, asks before spending credits and keeps a history of every step.",
      },
    ],
  },
];

function Plus({ open }: { open: boolean }) {
  return (
    <span className={`relative block h-[16px] w-[16px] shrink-0 transition-transform duration-300 ${open ? "rotate-45 text-accent" : "text-fg-2"}`} aria-hidden>
      <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current" />
      <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current" />
    </span>
  );
}

export default function Faq() {
  /* every question starts closed */
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Reveal id="faq" className="relative border-t border-white/[0.08]">
      <div className="frame pad-x py-14 lg:py-20">
        <Rv>
          <h2 className="display text-[clamp(2.1rem,6.4vw,3.6rem)] text-fg">Questions, answered.</h2>
        </Rv>

        <div className="mt-8 lg:mt-10">
          {GROUPS.map((g, gi) => (
            <Rv key={g.name} d={0.05 * gi} className="grid gap-2 pb-8 last:pb-0 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10 lg:pb-10">
              <p className="eyebrow pt-1 lg:pt-6">{g.name}</p>
              <ul>
                {g.items.map((it) => {
                  const on = open === it.q;
                  const id = it.q.replace(/\W+/g, "-").toLowerCase();
                  return (
                    <li key={it.q} className="border-b border-white/[0.1]">
                      <h3>
                        <button
                          type="button"
                          id={`q-${id}`}
                          aria-expanded={on}
                          aria-controls={`a-${id}`}
                          onClick={() => setOpen(on ? null : it.q)}
                          className="flex w-full items-center justify-between gap-6 py-5 text-left text-[16.5px] text-fg transition-colors hover:text-white lg:py-6 lg:text-[17.5px]"
                        >
                          {it.q}
                          <Plus open={on} />
                        </button>
                      </h3>
                      <div id={`a-${id}`} role="region" aria-labelledby={`q-${id}`} className="faq-body" data-open={on}>
                        <div>
                          <p className="max-w-[64ch] pb-6 text-[15.5px] leading-[1.65] text-muted">{it.a}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Rv>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
