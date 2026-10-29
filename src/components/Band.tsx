import Reveal from "./Reveal";
import { Arrow, PILOT_URL, Rv } from "./ui";

/** Ivory statement band between the dark sections. */
export default function Band() {
  return (
    <Reveal className="on-ivory relative bg-ivory text-ink">
      <div className="frame dots-ink pad-x py-14 text-center lg:py-20">
        <Rv>
          <h2 className="display mx-auto max-w-[820px] text-[clamp(2.2rem,6.6vw,3.9rem)] text-ink">Give every seller a researched next step.</h2>
        </Rv>
        <Rv d={0.08}>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.6] text-ink-muted lg:text-[18px]" style={{ color: "var(--ink-muted)" }}>
            Not more dashboards. One clear recommendation per account, with the evidence behind it.
          </p>
        </Rv>
        <Rv d={0.14} className="mt-8">
          <a href={PILOT_URL} className="btn btn-ink">
            Join the pilot
            <Arrow className="h-[10px] w-[15px]" />
          </a>
        </Rv>
      </div>
    </Reveal>
  );
}
