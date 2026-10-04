"use client";

import { useEffect, useId, useRef, useState } from "react";

/* Grayscale "photography" drawn in SVG: glass facades and rock slabs. */

type Tone = "dark" | "mid" | "light";

const TONES: Record<Tone, { base: string; glass: string; edge: string }> = {
  dark: { base: "#0f1013", glass: "#2a2c32", edge: "#5d5f67" },
  mid: { base: "#3a3c42", glass: "#6b6e76", edge: "#a2a5ad" },
  light: { base: "#8d9098", glass: "#c4c6cc", edge: "#eceef1" },
};

function FacadePattern({ id, tone, skew, w = 14, h = 11 }: { id: string; tone: Tone; skew: number; w?: number; h?: number }) {
  const t = TONES[tone];
  return (
    <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse" patternTransform={`skewY(${skew})`}>
      <rect width={w} height={h} fill={t.base} />
      <rect x="1" y="1" width={w - 2} height={h - 2} fill={t.glass} />
      <rect x="1" y="1" width={w - 2} height="1.6" fill={t.edge} opacity=".55" />
      <rect x={w / 2} y="1" width=".7" height={h - 2} fill={t.base} opacity=".7" />
    </pattern>
  );
}

/** Wide diagonal facade, e.g. under the CRM card. */
export function Facade({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 265 110" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <FacadePattern id={`${id}-p`} tone="dark" skew={-17} w={13} h={10} />
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".05" />
          <stop offset="1" stopColor="#000" stopOpacity=".75" />
        </linearGradient>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".4" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="265" height="110" fill={`url(#${id}-p)`} />
      <polygon points="0,0 265,0 265,110 0,110" fill={`url(#${id}-g)`} />
      <polygon points="0,0 120,0 40,110 0,110" fill={`url(#${id}-l)`} />
    </svg>
  );
}

/** Two glass towers (top right, behind the Research card). */
export function Towers({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 184 126" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <defs>
        <FacadePattern id={`${id}-a`} tone="mid" skew={-4} w={9} h={8} />
        <FacadePattern id={`${id}-b`} tone="dark" skew={3} w={8} h={7} />
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".15" />
          <stop offset="1" stopColor="#000" stopOpacity=".5" />
        </linearGradient>
      </defs>
      <rect width="184" height="126" fill="#c9cbd0" />
      <polygon points="0,126 0,6 78,0 78,126" fill={`url(#${id}-a)`} />
      <polygon points="78,126 78,0 118,10 118,126" fill="#1b1c20" />
      <polygon points="78,126 78,0 118,10 118,126" fill={`url(#${id}-b)`} />
      <polygon points="118,126 118,10 184,30 184,126" fill={`url(#${id}-a)`} />
      <rect width="184" height="126" fill={`url(#${id}-f)`} />
    </svg>
  );
}

/** Small building thumbnail used inside the Research card. */
export function Thumb({ className = "" }: { className?: string }) {
  const id = `thumb${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 92 42" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <FacadePattern id={`${id}-p`} tone="dark" skew={-6} w={7} h={6} />
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9dbe0" />
          <stop offset="1" stopColor="#9fa2aa" />
        </linearGradient>
      </defs>
      <rect width="92" height="42" fill={`url(#${id}-g)`} />
      <polygon points="8,42 8,14 46,8 46,42" fill={`url(#${id}-p)`} />
      <polygon points="46,42 46,8 84,16 84,42" fill="#2c2e34" />
      <polygon points="46,42 46,8 84,16 84,42" fill={`url(#${id}-p)`} opacity=".7" />
    </svg>
  );
}

/** Grayscale rock slab. */
export function RockPhoto({ id, seed = 4, className = "" }: { id: string; seed?: number; className?: string }) {
  return (
    <svg viewBox="0 0 140 120" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <filter id={`${id}-f`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.05" numOctaves="5" seed={seed} result="n" />
          <feDiffuseLighting in="n" lightingColor="#c8c8cc" surfaceScale="6.5" diffuseConstant="0.95" result="l">
            <feDistantLight azimuth="235" elevation="42" />
          </feDiffuseLighting>
          <feColorMatrix in="l" type="saturate" values="0" />
        </filter>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".25" />
          <stop offset="1" stopColor="#000" stopOpacity=".78" />
        </linearGradient>
      </defs>
      <rect width="140" height="120" filter={`url(#${id}-f)`} />
      <rect width="140" height="120" fill={`url(#${id}-g)`} />
      <polygon points="0,0 70,0 20,120 0,120" fill="#000" opacity=".28" />
    </svg>
  );
}

/** Tall high-contrast tower with a diagonal front edge (bottom-left of the experience section). */
export function Skyscraper({ className = "" }: { className?: string }) {
  const id = `sky${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 265 290" preserveAspectRatio="xMinYMax slice" className={className} aria-hidden>
      <defs>
        <FacadePattern id={`${id}-a`} tone="light" skew={14} w={15} h={12} />
        <FacadePattern id={`${id}-b`} tone="dark" skew={-12} w={13} h={11} />
        <FacadePattern id={`${id}-c`} tone="mid" skew={-12} w={12} h={10} />
        <linearGradient id={`${id}-sh`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id={`${id}-lt`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* left mass (lit) */}
      <polygon points="0,52 112,118 112,290 0,290" fill={`url(#${id}-a)`} />
      <polygon points="0,52 112,118 112,290 0,290" fill={`url(#${id}-lt)`} />
      {/* far right mass (dark) */}
      <polygon points="112,118 265,40 265,290 112,290" fill={`url(#${id}-b)`} />
      {/* stepped crown */}
      <polygon points="150,100 265,40 265,92 150,150" fill={`url(#${id}-c)`} />
      <polygon points="112,118 150,100 150,150 112,168" fill="#050506" opacity=".85" />
      {/* hard vertical edge */}
      <rect x="111" y="118" width="2.5" height="172" fill="#e8e8ec" opacity=".85" />
      <polygon points="0,0 265,0 265,290 0,290" fill={`url(#${id}-sh)`} />
    </svg>
  );
}

/* ---------- illustrated portraits (swap for real photos via the `src` prop of <Portrait>) ---------- */
export type PortraitKind = "beard" | "long" | "glasses" | "wavy";

const PORTRAITS: Record<PortraitKind, { skin: string; hair: string; shirt: string; bg: [string, string] }> = {
  beard: { skin: "#c79a7b", hair: "#2a1d16", shirt: "#161c2a", bg: ["#d9d4cb", "#a9a398"] },
  long: { skin: "#d2a98a", hair: "#15110f", shirt: "#1b1d22", bg: ["#d6d2c9", "#b4aea3"] },
  glasses: { skin: "#c49a7d", hair: "#2b221c", shirt: "#20222a", bg: ["#d3cec5", "#a49e93"] },
  wavy: { skin: "#e0b99c", hair: "#8a5f3d", shirt: "#e8e4dc", bg: ["#d9d3c8", "#b9b0a2"] },
};

export function Portrait({ kind, src, alt = "", className = "" }: { kind: PortraitKind; src?: string; alt?: string; className?: string }) {
  const [ok, setOk] = useState(false);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth > 0) setOk(true);
  }, []);

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <PortraitArt kind={kind} alt={alt} className="h-full w-full" />
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={img}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setOk(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[50%_20%] transition-opacity duration-500 ${ok ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </span>
  );
}

function PortraitArt({ kind, alt = "", className = "" }: { kind: PortraitKind; alt?: string; className?: string }) {
  const id = `pt${useId().replace(/:/g, "")}`;
  const p = PORTRAITS[kind];
  return (
    <svg viewBox="0 0 120 110" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={alt}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.bg[0]} />
          <stop offset="1" stopColor={p.bg[1]} />
        </linearGradient>
        <radialGradient id={`${id}-face`} cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#fff" stopOpacity=".18" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </radialGradient>
        <radialGradient id={`${id}-vig`} cx=".5" cy=".45" r=".75">
          <stop offset=".55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".35" />
        </radialGradient>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="5" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 0" />
        </filter>
      </defs>
      <rect width="120" height="110" fill={`url(#${id}-bg)`} />

      {/* hair behind head */}
      {kind === "long" && <path d="M30 40c-4 24-2 48 4 70h52c6-22 8-46 4-70-4-26-14-34-30-34S34 14 30 40z" fill={p.hair} />}
      {kind === "wavy" && (
        <path d="M30 38c-6 20-4 40-12 58 10 6 20 8 28 4V50zM90 38c6 20 4 40 12 58-10 6-20 8-28 4V50z" fill={p.hair} />
      )}

      {/* shoulders */}
      <path d="M8 110c2-22 20-30 40-33h24c20 3 38 11 40 33z" fill={p.shirt} />
      {kind === "wavy" && <path d="M48 77l12 14 12-14z" fill="#cfc9be" />}
      {/* neck */}
      <path d="M50 66h20v14c-4 5-16 5-20 0z" fill={p.skin} />
      <path d="M50 66h20v6c-6 4-14 4-20 0z" fill="#000" opacity=".18" />

      {/* head */}
      <ellipse cx="60" cy="46" rx="20" ry="25" fill={p.skin} />
      <ellipse cx="60" cy="46" rx="20" ry="25" fill={`url(#${id}-face)`} />
      <ellipse cx="39.500" cy="48" rx="3" ry="5" fill={p.skin} />
      <ellipse cx="80.500" cy="48" rx="3" ry="5" fill={p.skin} />

      {/* hair on top */}
      {kind === "beard" && <path d="M38 40c-2-18 8-26 22-26s24 8 22 26c-2-8-6-12-12-14-8 4-20 4-26 0-4 2-5 8-6 14z" fill={p.hair} />}
      {kind === "glasses" && <path d="M39 38c-2-16 8-24 21-24s23 8 21 24c-2-7-6-11-11-13-8 3-19 3-24 0-4 3-6 8-7 13z" fill={p.hair} />}
      {kind === "long" && <path d="M38 42c0-18 8-27 22-27s22 9 22 27c-4-10-12-16-22-16s-18 6-22 16z" fill={p.hair} />}
      {kind === "wavy" && <path d="M36 44c-2-20 8-30 24-30s26 10 24 30c-2-9-8-18-24-18S38 35 36 44z" fill={p.hair} />}

      {/* beard */}
      {(kind === "beard" || kind === "glasses") && (
        <path d="M41 54c1 14 8 22 19 22s18-8 19-22c-4 6-9 8-19 8s-15-2-19-8z" fill={p.hair} opacity=".92" />
      )}

      {/* features */}
      <g fill="#241812" opacity=".85">
        <ellipse cx="52" cy="46" rx="2" ry="1.200" />
        <ellipse cx="68" cy="46" rx="2" ry="1.200" />
      </g>
      <path d="M52 41.500c2-1.200 4-1.200 6 0M62 41.500c2-1.200 4-1.200 6 0" stroke={p.hair} strokeWidth="1.400" fill="none" strokeLinecap="round" />
      <path d="M60 48v7c-1.200 1-1.200 1.500 0 1.800" stroke="#000" strokeOpacity=".22" strokeWidth="1.200" fill="none" strokeLinecap="round" />
      <path d={kind === "beard" || kind === "glasses" ? "M54 62c4 2.200 8 2.200 12 0" : "M54 61c4 2.600 8 2.600 12 0"} stroke={kind === "long" || kind === "wavy" ? "#8a4a42" : "#e6c9b6"} strokeWidth="1.600" fill="none" strokeLinecap="round" />
      {kind === "glasses" && (
        <g fill="none" stroke="#14141a" strokeWidth="1.400">
          <rect x="44" y="40.500" width="13.500" height="10" rx="3.500" />
          <rect x="62.500" y="40.500" width="13.500" height="10" rx="3.500" />
          <path d="M57.500 45h5M44 44l-5-1.500M76 44l5-1.500" />
        </g>
      )}

      <rect width="120" height="110" fill={`url(#${id}-vig)`} />
      <rect width="120" height="110" filter={`url(#${id}-grain)`} opacity=".12" />
    </svg>
  );
}
