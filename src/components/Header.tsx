"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

const NAV = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Integrations", href: "#integrations" },
  { label: "For teams", href: "#teams" },
  { label: "FAQ", href: "#faq" },
];

/** Sections the nav highlights while you scroll through them. */
const TRACKED = ["product", "how-it-works", "integrations", "teams", "faq"];

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
    /* page height is read when it changes, not on every scroll frame (reading it mid-scroll can force layout) */
    let max = document.documentElement.scrollHeight - window.innerHeight;
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    const update = () => {
      raf = 0;
      const y = window.scrollY;
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
      ro.disconnect();
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
    `nav-link relative py-2 text-[14px] tracking-[-0.005em] transition-colors ${
      active === href ? "text-white" : "text-[#c4c4cc] hover:text-white"
    } ${active === href ? "is-active" : ""}`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-out ${
          scrolled || open
            ? "border-b border-white/[0.1] bg-[#07080a]"
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
              className="text-[26px] font-bold leading-none tracking-[-0.05em] text-cream lg:text-[28px]"
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
              className="hidden text-[14px] tracking-[-0.005em] text-[#c4c4cc] transition-colors hover:text-white lg:block"
            >
              Sign in
            </a>
            <a
              href="#demo"
              className="btn-primary group !hidden !h-[40px] !px-5 !text-[15px] sm:!inline-flex lg:!h-[46px]"
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
              <span className="hidden text-[12px] uppercase tracking-[0.16em] text-[#c4c4cc] sm:block">
                <span className="relative block h-[14px] w-[54px] overflow-hidden text-right">
                  <span className="burger-label-in absolute inset-x-0 top-0 block leading-[14px]">Menu</span>
                  <span className="burger-label-out absolute inset-x-0 top-0 block leading-[14px] text-cream">Close</span>
                </span>
              </span>
              <span className="relative block h-[46px] w-[46px]">
                <span className="burger-ring absolute inset-0 rounded-full border border-white/25" />
                <span className="burger-ring-fill absolute inset-0 rounded-full border border-accent" />
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
            className="block h-full w-full origin-left bg-accent"
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
        <span className="menu-orb pointer-events-none absolute -right-24 top-[28%] h-[320px] w-[320px] rounded-full bg-white/[0.07] blur-[90px]" />
        <span className="menu-ghost pointer-events-none absolute -bottom-[7vw] left-[-2vw] select-none font-display text-[44vw] leading-[0.8] text-transparent" aria-hidden>
          NORYX
        </span>

        <div className="relative mx-auto flex h-full max-w-[720px] flex-col overflow-y-auto px-5 pb-8 pt-[92px] sm:px-8 sm:pt-[110px]">
          {/* brand rail */}
          <span className="menu-rail pointer-events-none absolute bottom-8 left-[14px] top-[96px] w-px bg-gradient-to-b from-white/40 via-white/10 to-transparent sm:left-[22px]" aria-hidden />

          <p className="menu-fade eyebrow" style={{ ["--i" as string]: 0 }}>
            Menu
          </p>

          <ul className="mt-6 sm:mt-8">
            {NAV.map((n, i) => (
              <li key={n.href} className="menu-item border-b border-white/[0.09]" style={{ ["--i" as string]: i }}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={n.href}
                  onClick={(e) => go(e, n.href)}
                  className={`menu-link group flex items-center gap-4 py-[16px] sm:py-[20px] ${active === n.href ? "text-accent" : "text-cream"}`}
                >
                  <span className="text-[clamp(2.25rem,10.4vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.045em] transition-[transform,color] duration-500 ease-out group-hover:translate-x-3 group-hover:text-white">
                    {n.label}
                  </span>
                  <svg
                    viewBox="0 0 12 12"
                    className="ml-auto h-[16px] w-[16px] shrink-0 -translate-x-2 text-cream/70 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
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
              className="menu-fade btn-primary group !flex !h-[58px] !w-full !justify-between !px-6 !text-[18px]"
              style={{ ["--i" as string]: 6 }}
            >
              Book a demo
              <Arrow className="h-3 w-7 transition-transform duration-500 group-hover:translate-x-2" />
            </a>

            <div className="menu-fade mt-6 flex items-center justify-between text-[13px] text-[#a1a1aa]" style={{ ["--i" as string]: 7 }}>
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
