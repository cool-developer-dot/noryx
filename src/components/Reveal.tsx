"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Section wrapper with two jobs:
 *  - adds `in-view` once, the first time the section scrolls into view (drives entrance reveals);
 *  - toggles `is-live` while the section is on (or just next to) the screen. Looping animations are only
 *    declared under `.is-live`, and SMIL animations inside the section are paused when it leaves, so
 *    off-screen sections cost nothing while you scroll.
 */
export default function Reveal({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const once = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in-view");
          once.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    once.observe(el);

    const live = new IntersectionObserver(
      ([e]) => {
        const on = e.isIntersecting;
        el.classList.toggle("is-live", on);
        el.querySelectorAll("svg").forEach((svg) => {
          try {
            if (on) svg.unpauseAnimations();
            else svg.pauseAnimations();
          } catch {
            /* not an SVG root */
          }
        });
      },
      { threshold: 0, rootMargin: "140px 0px 140px 0px" },
    );
    live.observe(el);

    return () => {
      once.disconnect();
      live.disconnect();
    };
  }, []);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
