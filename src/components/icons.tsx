import type { ReactNode } from "react";

type P = { className?: string };

/* ---------- Source logos ---------- */
export function SalesforceLogo({ className }: P) {
  return (
    <svg viewBox="0 0 48 34" className={className} aria-hidden>
      <path
        fill="#00A1E0"
        d="M20 3.2c1.9-2 4.6-3.2 7.6-3.2 4 0 7.5 2.2 9.3 5.5a12.5 12.5 0 0 1 5-1c6.2 0 11.1 5 11.1 11.2S48 27 41.8 27c-.8 0-1.5-.1-2.2-.2a8.6 8.6 0 0 1-11.5 1.4 9.9 9.9 0 0 1-18.3-.7c-.5.1-1 .1-1.6.1C3.5 27.6 0 24 0 19.6c0-3 1.7-5.7 4.1-7-.4-1-.6-2-.6-3.1C3.5 5 6.7 2 10.7 2c3.8 0 7 1.2 9.3 1.2z"
        transform="translate(0 2) scale(.96 .9)"
      />
      <text
        x="24"
        y="19"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="8.2"
        fill="#fff"
      >
        salesforce
      </text>
    </svg>
  );
}

export function LinkedInLogo({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="6" fill="#0A66C2" />
      <rect x="7" y="15" width="5.6" height="18" fill="#fff" />
      <circle cx="9.8" cy="9.6" r="3.3" fill="#fff" />
      <path
        fill="#fff"
        d="M16.5 15h5.4v2.5c.9-1.7 3-2.9 5.5-2.9 5 0 6.6 3 6.6 7.6V33h-5.6v-9.5c0-2.3-.5-4-2.8-4-2.4 0-3.5 1.7-3.5 4.2V33h-5.6z"
      />
    </svg>
  );
}

export function ApolloLogo({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        fill="#F6C21B"
        d="M20 2 3 36h6.4l2.9-6h15.4l2.9 6H37zM15.4 24.5 20 15l4.6 9.5z"
        fillRule="evenodd"
      />
      <path fill="#F6C21B" d="M27 20c0 3-3.4 5.6-7 5.6V22c1.7 0 3.4-1 3.4-2z" opacity=".001" />
    </svg>
  );
}

/** Gmail — current (2020) multicolour "M" mark, no envelope. */
export function GmailLogo({ className }: P) {
  return (
    <svg viewBox="52 42 88 66" className={className} aria-hidden>
      <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
      <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
      <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
      <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
      <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
    </svg>
  );
}

export function ZoomLogo({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="10" fill="#2D8CFF" />
      <path
        fill="#fff"
        d="M9 14.5C9 13.1 10.1 12 11.5 12h10.8c1.4 0 2.5 1.1 2.5 2.5v11c0 1.4-1.1 2.5-2.5 2.5H11.5A2.5 2.5 0 0 1 9 25.5zm17.5 3 5.2-3.9c.7-.5 1.3-.3 1.3.6v11.6c0 .9-.6 1.1-1.3.6l-5.2-3.9z"
      />
    </svg>
  );
}

export function CalendarLogo({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#fff" />
      <path fill="#EA4335" d="M4 8a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v2H4z" />
      <path fill="#4285F4" d="M4 10h5v26H8a4 4 0 0 1-4-4z" />
      <path fill="#34A853" d="M31 36h1a4 4 0 0 0 4-4v-1h-5z" />
      <path fill="#188038" d="M31 25h5v6h-5z" />
      <path fill="#FBBC04" d="M31 10h5v15h-5z" />
      <path fill="#1967D2" d="M9 31h22v5H9z" opacity=".001" />
      <text
        x="20"
        y="28.6"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="15"
        fill="#4285F4"
      >
        31
      </text>
    </svg>
  );
}

/* ---------- Output icons (red) ---------- */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WhoIcon({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="12" cy="11" r="4.6" fill="currentColor" />
      <path d="M3 26c0-5 4-8 9-8s9 3 9 8z" fill="currentColor" />
      <circle cx="23" cy="12.5" r="3.4" fill="currentColor" opacity=".75" />
      <path d="M22 18.3c4.5-.4 8 1.8 8 6.2h-6.5c0-2.6-.5-4.700-1.500-6.200z" fill="currentColor" opacity=".75" />
    </svg>
  );
}

export function WhatIcon({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M8 3h11l7 7v17a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
      />
      <path d="M19 3v7h7" fill="#0d0e12" opacity=".35" />
      <path d="M10.500 15.500h11M10.500 19.500h11M10.500 23.500h7" stroke="#0d0e12" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function WhyIcon({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        {...stroke}
        d="M16 4a8.500 8.500 0 0 0-5 15.400c.9.700 1.500 1.700 1.500 2.800V24h7v-1.800c0-1.100.6-2.100 1.500-2.800A8.500 8.500 0 0 0 16 4z"
      />
      <path {...stroke} d="M12.500 27.500h7M14 30h4M16 11v7M13 15l3-3 3 3" />
    </svg>
  );
}

export function SayIcon({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M7 5h18a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H16l-6 5v-5H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z"
      />
      <circle cx="10.500" cy="14" r="1.700" fill="#0d0e12" />
      <circle cx="16" cy="14" r="1.700" fill="#0d0e12" />
      <circle cx="21.500" cy="14" r="1.700" fill="#0d0e12" />
    </svg>
  );
}

export function NextIcon({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path {...stroke} strokeWidth="2.600" d="M3 16h24M18 7l9 9-9 9" />
    </svg>
  );
}

/* ---------- Misc ---------- */
export function PersonGlyph({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path d="M4 21c0-4.500 3.500-7 8-7s8 2.500 8 7z" fill="currentColor" />
    </svg>
  );
}

export function PersonLines({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3.600" fill="none" stroke="currentColor" strokeWidth="1.600" />
      <path d="M2.500 20c0-3.800 3-6 6.500-6s6.500 2.200 6.500 6" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" />
      <path d="M16 6h6M17 10h5" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" />
    </svg>
  );
}

export function PlayIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M8 5.500v13l11-6.500z" fill="currentColor" />
    </svg>
  );
}

export function Wrap({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
