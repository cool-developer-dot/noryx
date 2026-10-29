"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { APP_URL, Arrow, PILOT_URL, Wordmark } from "./ui";

const NAV = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Principles", href: "#principles" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  /* solid bar after a few pixels of scroll */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 12);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* highlight the section you are reading */
  useEffect(() => {
    const els = NAV.map((n) => document.querySelector(n.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
          else setActive((cur) => (cur === `#${e.target.id}` ? null : cur));
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* menu: lock scroll, close on Escape or when the screen becomes desktop */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open) button.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  const go = useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open ? "border-white/[0.08] bg-[#07080a]" : "border-transparent bg-transparent"
        }`}
      >
        <div className="frame pad-x flex h-[64px] items-center justify-between !border-y-0 lg:h-[68px]">
          <a href="#top" onClick={(e) => go(e, "#top")} aria-label="NORYX home" className="text-fg">
            <Wordmark />
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={`nav-link text-[14.5px] ${active === n.href ? "is-active" : ""}`}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={APP_URL} className="nav-link hidden px-3 text-[14.5px] lg:block">
              Sign in
            </a>
            <a href={PILOT_URL} className="btn btn-accent !h-[40px] !px-[18px] !text-[14px] max-[379px]:!hidden">
              Join the pilot
              <Arrow className="h-[9px] w-[14px]" />
            </a>
            <button
              ref={button}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`burger relative ml-1 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/15 lg:hidden ${open ? "is-open" : ""}`}
            >
              <span className="relative block h-[12px] w-[18px]">
                <span className="burger-line l1 absolute left-0 top-0 h-[1.5px] w-full bg-fg" />
                <span className="burger-line l2 absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-fg" />
                <span className="burger-line l3 absolute bottom-0 left-0 h-[1.5px] w-full bg-fg" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" role="dialog" aria-modal="true" aria-label="Menu" inert={!open} className={`menu bg-[#07080a] lg:hidden ${open ? "is-open" : ""}`}>
        <div className="dots absolute inset-0 opacity-60" aria-hidden />
        <div className="relative flex h-full flex-col px-5 pb-8 pt-[96px] sm:px-8">
          <ul>
            {NAV.map((n, i) => (
              <li key={n.href} className="mi border-b border-white/[0.08]" style={{ ["--i" as string]: i }}>
                <a href={n.href} onClick={(e) => go(e, n.href)} className="flex items-center justify-between py-5 text-[30px] font-bold tracking-[-0.04em] text-fg">
                  {n.label}
                  <Arrow className="h-[11px] w-[18px] text-muted" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mi mt-auto flex flex-col gap-3" style={{ ["--i" as string]: 5 }}>
            <a href={PILOT_URL} onClick={(e) => go(e, PILOT_URL)} className="btn btn-accent !h-[54px] w-full !text-[16px]">
              Join the pilot
              <Arrow className="h-[10px] w-[16px]" />
            </a>
            <a href={APP_URL} className="btn btn-ghost !h-[54px] w-full !text-[16px]">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
