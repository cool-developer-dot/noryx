import { Arrow } from "./Header";
import HeroDiagram from "./HeroDiagram";
import { PlayIcon } from "./icons";
import Reveal from "./Reveal";
import Rock from "./Rock";

const STATS = [
  { value: "3x", label: "Faster research" },
  { value: "40%", label: "More meaningful conversations" },
  { value: "28%", label: "Higher win rates" },
];

export default function Hero() {
  return (
    <Reveal className="hero-bg relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* ---------- background ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* rock monolith */}
        <Rock className="reveal-fade absolute bottom-0 right-0 h-[440px] w-full opacity-70 sm:h-[640px] md:h-[720px] md:opacity-100 xl:h-[72%] xl:w-[62%]" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-grain absolute inset-0" />
      </div>

      {/* ---------- content ---------- */}
      <div className="section-x relative flex flex-1 flex-col pb-10 pt-[104px] lg:pt-[136px]">
        {/* headline: two lines on desktop */}
        <div className="reveal max-w-[1100px]" style={{ animationDelay: "0.05s" }}>
          <p className="eyebrow">The connected revenue system</p>
          <h1 className="h-display h-hero mt-5 text-cream lg:mt-6">
            <span className="block">Sell with context.</span>
            <span className="block">Close with intelligence.</span>
          </h1>
        </div>

        <div className="mt-10 grid flex-1 items-start gap-14 lg:mt-14 xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] xl:gap-[3vw]">
          {/* copy + actions */}
          <div className="flex min-w-0 flex-col">
            <div className="reveal max-w-[560px]" style={{ animationDelay: "0.2s" }}>
              <p className="text-[18px] leading-[1.55] text-[#e4e4e7] lg:text-[20px]">
                NORYX turns fragmented sales data, research, conversations, and workflows into one intelligent revenue system.
              </p>
              <p className="body-copy mt-4">
                One connected layer across prospecting, account research, conversations, CRM, and follow-up.
              </p>
            </div>

            <div className="reveal mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 lg:mt-10" style={{ animationDelay: "0.3s" }}>
              <a href="#demo" className="btn-primary group">
                Book a demo
                <Arrow className="h-3 w-6 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#how-it-works" className="btn-text group">
                <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-white/40 text-cream transition-colors group-hover:border-white group-hover:bg-white group-hover:text-ink">
                  <PlayIcon className="ml-[2px] h-[14px] w-[14px]" />
                </span>
                See how it works
              </a>
            </div>

            <dl className="reveal mt-12 grid max-w-[560px] grid-cols-3 gap-x-5 border-t border-white/[0.14] pt-7 lg:mt-14" style={{ animationDelay: "0.4s" }}>
              {STATS.map((s) => (
                <div key={s.value} className="min-w-0">
                  <dt className="text-[34px] font-bold leading-none tracking-[-0.04em] text-cream sm:text-[40px]">{s.value}</dt>
                  <dd className="mt-3 text-[13px] leading-[1.45] text-[#a1a1aa]">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* product diagram */}
          <div className="relative z-10 min-w-0">
            <div className="mx-auto w-full max-w-[860px] md:max-w-[900px] xl:max-w-none">
              <HeroDiagram />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- bottom bar ---------- */}
      <div className="relative z-20 border-t border-white/[0.14]">
        <div className="section-x flex items-center gap-5 py-5 text-[12px] text-[#a1a1aa]">
          <a href="#problem" className="group hidden shrink-0 items-center gap-4 text-[#d4d4d8] transition-colors hover:text-white sm:flex" aria-label="Scroll to the next section">
            <span className="flex h-[36px] w-[36px] items-start justify-center rounded-full border border-white/45 pt-[9px] transition-colors group-hover:border-white">
              <span className="scroll-tick block h-[10px] w-px bg-cream" />
            </span>
            <span className="hidden uppercase tracking-[0.16em] md:block">Scroll to explore</span>
          </a>
          <span className="hidden h-px flex-1 bg-white/20 md:block" />
          <p className="flex-1 text-center leading-[1.6] text-[#d4d4d8] md:flex-none">
            The information exists. The intelligence is fragmented.
          </p>
          <span className="hidden h-px flex-1 bg-white/20 md:block" />
        </div>
      </div>
    </Reveal>
  );
}
