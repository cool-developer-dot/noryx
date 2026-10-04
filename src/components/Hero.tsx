import { Arrow } from "./Header";
import HeroDiagram from "./HeroDiagram";
import { PlayIcon } from "./icons";
import Rock from "./Rock";

const STATS = [
  { value: "3x", label: ["Faster", "research"] },
  { value: "40%", label: ["More", "meaningful conversations"] },
  { value: "28%", label: ["Higher", "win rates"] },
];

function Dot() {
  return (
    <span className="ml-[0.05em] inline-block h-[0.15em] w-[0.15em] translate-y-[-0.01em] rounded-full bg-brand align-baseline shadow-[0_0_24px_rgba(255,42,42,0.7)]" />
  );
}

export default function Hero() {
  return (
    <section className="hero-bg relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* ---------- background ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* faint construction lines */}
        <div className="absolute inset-x-0 top-[43%] hidden h-px bg-white/[0.06] md:block" />
        <div className="absolute inset-y-0 left-[62%] hidden w-px bg-white/[0.035] xl:block" />

        {/* rock monolith */}
        <Rock className="reveal-fade absolute bottom-0 right-0 h-[440px] w-full opacity-80 sm:h-[640px] md:h-[720px] md:opacity-100 xl:h-[78%] xl:w-[66%]" />

        <div className="hero-vignette absolute inset-0" />
        <div className="hero-grain absolute inset-0" />
      </div>

      {/* ---------- content ---------- */}
      <div className="relative flex flex-1 flex-col px-5 pb-28 pt-[96px] sm:px-8 md:pb-32 xl:px-16 xl:pb-0 xl:pt-[124px]">
        <div className="relative z-10 flex w-full min-w-0 max-w-[640px] flex-col xl:w-[42%] xl:max-w-none">
          {/* eyebrow */}
          <div className="reveal flex max-w-[550px] items-center gap-4 font-medium uppercase text-cream/85" style={{ animationDelay: "0.05s" }}>
            <span className="whitespace-nowrap text-[10px] tracking-[0.26em] sm:text-[11.5px]">
              The connected revenue system
            </span>
            <span className="hidden h-px flex-1 bg-white/25 sm:block" />
            <span className="hidden whitespace-nowrap text-[9.5px] tracking-[0.2em] text-cream/60 sm:block">
              01 / Context
            </span>
          </div>

          {/* headline */}
          <h1
            className="headline reveal mt-5 whitespace-nowrap font-display uppercase text-cream xl:mt-4"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="block">Sell with</span>
            <span className="block">
              Context
              <Dot />
            </span>
            <span className="block">Close with</span>
            <span className="block">
              Intelligence
              <Dot />
            </span>
          </h1>

          {/* copy */}
          <div className="reveal mt-8 max-w-[600px] xl:mt-[22px]" style={{ animationDelay: "0.3s" }}>
            <p className="text-[17px] leading-[1.4] text-cream sm:text-[19px] xl:text-[19.5px]">
              NORYX turns fragmented sales data, research, conversations, and workflows into one
              intelligent revenue system.
            </p>
            <p className="mt-3 text-[15.5px] font-light leading-[1.45] text-cream/50 sm:text-[18px] xl:text-[18.5px]">
              One connected layer across prospecting, account research, conversations, CRM, and
              follow-up.
            </p>
          </div>

          {/* CTAs */}
          <div className="reveal mt-9 flex flex-wrap items-center gap-x-9 gap-y-5 xl:mt-[30px]" style={{ animationDelay: "0.4s" }}>
            <a
              href="#demo"
              className="group inline-flex h-[54px] items-center gap-4 bg-brand px-8 font-cond text-[21px] font-semibold uppercase tracking-[0.2em] text-[#14080a] shadow-[0_10px_40px_-10px_rgba(255,42,42,0.7)] transition-all hover:bg-white hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] sm:h-[57px] sm:px-9 sm:text-[23px]"
            >
              Book a demo
              <Arrow className="h-3 w-7 transition-transform group-hover:translate-x-1.5" />
            </a>
            <a
              href="#how-it-works"
              className="group inline-flex items-center gap-[18px] text-[12px] font-medium uppercase tracking-[0.24em] text-cream/90 transition-colors hover:text-brand"
            >
              <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/50 text-cream transition-colors group-hover:border-brand group-hover:text-brand">
                <PlayIcon className="ml-[2px] h-[15px] w-[15px]" />
              </span>
              See how it works
            </a>
          </div>

          {/* stats */}
          <div
            className="reveal mt-10 flex max-w-[600px] flex-wrap justify-between gap-x-6 gap-y-5 border-t border-white/[0.14] pt-6 xl:mt-[34px]"
            style={{ animationDelay: "0.5s" }}
          >
            {STATS.map((s) => (
              <div key={s.value} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="font-display text-[34px] leading-none tracking-[-0.01em] text-cream sm:text-[36px]">
                  {s.value.toUpperCase()}
                </span>
                <span className="whitespace-nowrap text-[8.5px] font-medium uppercase leading-[1.6] tracking-[0.14em] text-cream/55 sm:text-[9.5px]">
                  {s.label[0]}
                  <br />
                  {s.label[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* diagram */}
        <div className="relative z-10 mt-14 w-full md:mt-16 xl:absolute xl:left-[44.3%] xl:right-[0.8%] xl:top-[150px] xl:mt-0 xl:w-auto">
          <div className="mx-auto w-full max-w-[860px] md:max-w-[900px] xl:max-w-none">
            <HeroDiagram />
          </div>
        </div>
      </div>

      {/* ---------- bottom bar ---------- */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-4 px-5 pb-8 text-[9.5px] font-medium uppercase tracking-[0.22em] text-cream/55 sm:px-8 xl:px-16 xl:pb-[34px] xl:text-[10.5px]">
        <span className="hidden h-[32px] w-[32px] shrink-0 items-start justify-center rounded-full border border-white/40 pt-2 sm:flex">
          <span className="scroll-tick block h-[10px] w-px bg-cream" />
        </span>
        <span className="hidden whitespace-nowrap font-mono text-[9.5px] tracking-[0.2em] md:block">
          Scroll to explore
        </span>
        <span className="hidden h-px flex-1 bg-white/20 md:block" />
        <span className="flex-1 text-center leading-[1.7] md:flex-none md:whitespace-nowrap">
          The problem — the information exists. The intelligence is fragmented.
        </span>
        <span className="hidden h-px flex-1 bg-white/20 md:block" />
        <span className="hidden whitespace-nowrap font-mono text-[9.5px] tracking-[0.2em] md:block">
          02 / Intelligence
        </span>
      </div>
    </section>
  );
}
