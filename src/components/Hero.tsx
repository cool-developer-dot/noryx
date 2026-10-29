import HeroNetwork from "./HeroNetwork";
import Reveal from "./Reveal";
import { Arrow, PILOT_URL } from "./ui";

export default function Hero() {
  return (
    <Reveal id="top" className="relative overflow-hidden">
      <div className="frame">
        <div className="dots pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)]" aria-hidden />

        <div className="pad-x relative pb-12 pt-[100px] text-center sm:pt-[124px] lg:pb-12 lg:pt-[132px]">
          <div className="hero-in inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.03] py-1.5 pl-2.5 pr-3.5 text-[12.5px] text-fg-2" style={{ ["--d" as string]: "0.05s" }}>
            <span className="ping-dot h-[7px] w-[7px] rounded-full bg-accent" />
            Now in private pilot
          </div>

          <h1 className="hero-in display mx-auto mt-6 max-w-[920px] text-[clamp(2.1rem,11vw,3.5rem)] text-fg sm:text-[clamp(3.5rem,7.4vw,4.9rem)]" style={{ ["--d" as string]: "0.12s" }}>
            One engine <br className="sm:hidden" />
            for your <span className="whitespace-nowrap text-accent">next best action.</span>
          </h1>

          <p className="hero-in lede mx-auto mt-5 max-w-[620px] !text-[16.5px] sm:mt-6 sm:!text-[19px]" style={{ ["--d" as string]: "0.22s" }}>
            NORYX connects your sales tools with what you sell, checks the evidence, and tells you which account to work, who to contact, why now and what to say.
          </p>

          <div className="hero-in mt-8 flex flex-wrap items-center justify-center gap-3" style={{ ["--d" as string]: "0.3s" }}>
            <a href={PILOT_URL} className="btn btn-accent">
              Join the pilot
              <Arrow className="h-[10px] w-[15px]" />
            </a>
            <a href="#how" className="btn btn-ghost">
              See how it works
            </a>
          </div>

          <div className="mt-10 sm:mt-12 lg:mt-14">
            <HeroNetwork />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
