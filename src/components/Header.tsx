"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

const NAV = [
  { label: "Product", href: "#product", n: "01" },
  { label: "How it works", href: "#how-it-works", n: "02" },
  { label: "Integrations", href: "#integrations", n: "03" },
  { label: "For teams", href: "#teams", n: "04" },
  { label: "FAQ", href: "#faq", n: "05" },
];

/** Sections the nav highlights while you scroll through them. */
const TRACKED = ["product", "how-it-works", "integrations", "faq"];

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 12" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M0 6h26M21 1l5 5-5 5" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const bar = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  /* ---- scroll: the bar stays pinned; it turns solid after a few pixels and shows page progress ---- */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("transform", `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`);
      setScrolled(y > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ---- active section ---- */
  useEffect(() => {
    const els = TRACKED.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
          else setActive((cur) => (cur === `#${e.target.id}` ? null : cur));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ---- menu: lock scroll, Esc, close when the viewport becomes desktop, focus management ---- */
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    const t = window.setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 450);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open) button.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  /* ---- anchor clicks from inside the menu: close first, then scroll ---- */
  const go = useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }, []);

  const linkCls = (href: string) =>
    `nav-link relative py-2 text-[11px] font-medium uppercase tracking-[0.17em] transition-colors ${
      active === href ? "text-white" : "text-cream/80 hover:text-white"
    } ${active === href ? "is-active" : ""}`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
          scrolled || open
            ? "border-b border-white/[0.1] bg-[#07080a]/94 backdrop-blur-xl"
            : "border-b border-white/[0.14] bg-transparent"
        }`}
      >
        <div className="flex h-[64px] items-center justify-between px-5 sm:px-8 lg:h-[77px] lg:px-[52px]">
          <div className="flex items-center gap-10 xl:gap-[146px]">
            <a
              href="#top"
              onClick={(e) => {
                if (open) go(e, "#top");
              }}
              className="font-display text-[34px] leading-none tracking-[-0.01em] text-cream lg:text-[38px]"
              aria-label="NORYX home"
            >
              NORYX
            </a>
            <nav className="hidden items-center gap-8 lg:flex xl:gap-[41px]" aria-label="Primary">
              {NAV.slice(0, 4).map((n) => (
                <a key={n.href} href={n.href} className={linkCls(n.href)} aria-current={active === n.href ? "true" : undefined}>
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 xl:gap-9">
            <a
              href="#signin"
              className="hidden text-[11px] font-medium uppercase tracking-[0.17em] text-cream/80 transition-colors hover:text-white lg:block"
            >
              Sign in
            </a>
            <a
              href="#demo"
              className="group hidden h-[40px] items-center gap-3 bg-brand px-5 font-cond text-[17px] font-semibold uppercase tracking-[0.14em] text-[#14080a] transition-all hover:bg-white sm:inline-flex lg:h-[50px] lg:px-[22px] lg:text-[18px]"
            >
              Book a demo
              <Arrow className="h-3 w-6 transition-transform group-hover:translate-x-1" />
            </a>

            {/* hamburger */}
            <button
              ref={button}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={`burger group relative flex h-[46px] items-center gap-3 pl-1 lg:hidden ${open ? "is-open" : ""}`}
            >
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.28em] text-cream/80 sm:block">
                <span className="relative block h-[12px] w-[54px] overflow-hidden text-right">
                  <span className="burger-label-in absolute inset-x-0 top-0 block leading-[12px]">Menu</span>
                  <span className="burger-label-out absolute inset-x-0 top-0 block leading-[12px] text-[#ff3b3b]">Close</span>
                </span>
              </span>
              <span className="relative block h-[46px] w-[46px]">
                <span className="burger-ring absolute inset-0 rounded-full border border-white/25" />
                <span className="burger-ring-fill absolute inset-0 rounded-full border border-[#ff2a2a]" />
                <span className="absolute left-1/2 top-1/2 block h-[14px] w-[20px] -translate-x-1/2 -translate-y-1/2">
                  <span className="burger-line burger-l1 absolute left-0 top-0 h-[1.5px] w-full bg-cream" />
                  <span className="burger-line burger-l2 absolute right-0 top-1/2 h-[1.5px] w-[68%] -translate-y-1/2 bg-cream" />
                  <span className="burger-line burger-l3 absolute bottom-0 left-0 h-[1.5px] w-full bg-cream" />
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* scroll progress */}
        <span className="pointer-events-none absolute inset-x-0 bottom-[-1px] block h-[2px] overflow-hidden" aria-hidden>
          <span
            ref={bar}
            className="block h-full w-full origin-left bg-gradient-to-r from-[#ff2a2a] via-[#ff5a4a] to-[#ff2a2a]"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
      </header>

      {/* full-screen menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`menu-overlay lg:hidden ${open ? "is-open" : ""}`}
      >
        <div className="menu-bg absolute inset-0" />
        <div className="hero-grain pointer-events-none absolute inset-0" />
        <span className="menu-orb pointer-events-none absolute -right-24 top-[28%] h-[320px] w-[320px] rounded-full bg-[#ff2a2a]/25 blur-[90px]" />
        <span className="menu-ghost pointer-events-none absolute -bottom-[7vw] left-[-2vw] select-none font-display text-[44vw] leading-[0.8] text-transparent" aria-hidden>
          NORYX
        </span>

        <div className="relative mx-auto flex h-full max-w-[720px] flex-col overflow-y-auto px-5 pb-8 pt-[92px] sm:px-8 sm:pt-[110px]">
          {/* brand rail */}
          <span className="menu-rail pointer-events-none absolute bottom-8 left-[14px] top-[96px] w-px bg-gradient-to-b from-[#ff2a2a] via-white/15 to-transparent sm:left-[22px]" aria-hidden />

          <p className="menu-fade font-mono text-[10px] uppercase tracking-[0.3em] text-cream/45" style={{ ["--i" as string]: 0 }}>
            <span className="mr-3 inline-block h-[3px] w-[22px] translate-y-[-3px] bg-[#ff2a2a]" />
            Navigate
          </p>

          <ul className="mt-6 sm:mt-8">
            {NAV.map((n, i) => (
              <li key={n.href} className="menu-item border-b border-white/[0.09]" style={{ ["--i" as string]: i }}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={n.href}
                  onClick={(e) => go(e, n.href)}
                  className={`menu-link group flex items-center gap-4 py-[14px] sm:gap-7 sm:py-[18px] ${active === n.href ? "text-[#ff3b3b]" : "text-cream"}`}
                >
                  <span className="w-7 font-mono text-[11px] tracking-[0.12em] text-cream/40 transition-colors group-hover:text-[#ff3b3b]">{n.n}</span>
                  <span className="font-display text-[clamp(2.4rem,11.4vw,4.6rem)] uppercase leading-[0.98] tracking-[-0.01em] transition-[transform,color] duration-500 ease-out group-hover:translate-x-3 group-hover:text-[#ff3b3b]">
                    {n.label}
                  </span>
                  <svg
                    viewBox="0 0 12 12"
                    className="ml-auto h-[16px] w-[16px] shrink-0 -translate-x-2 text-[#ff3b3b] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    aria-hidden
                  >
                    <path d="M2 10 10 2M4 2h6v6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <a
              href="#demo"
              onClick={(e) => go(e, "#demo")}
              className="menu-fade group flex h-[58px] items-center justify-between bg-[#ff2a2a] px-6 font-cond text-[24px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_50px_-16px_rgba(255,42,42,0.8)] transition-colors hover:bg-white hover:text-[#07080a]"
              style={{ ["--i" as string]: 6 }}
            >
              Book a demo
              <Arrow className="h-3 w-7 transition-transform duration-500 group-hover:translate-x-2" />
            </a>

            <div className="menu-fade mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-cream/50" style={{ ["--i" as string]: 7 }}>
              <a href="#signin" onClick={(e) => go(e, "#signin")} className="transition-colors hover:text-white">
                Sign in
              </a>
              <span>Connected revenue intelligence</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
