import { useId } from "react";

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
