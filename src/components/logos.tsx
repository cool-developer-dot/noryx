/* Brand marks for the tools NORYX connects to. They keep their own colours on purpose. */

type P = { className?: string };

export function Salesforce({ className }: P) {
  return (
    <svg viewBox="0 0 48 34" className={className} aria-hidden>
      <path
        fill="#00A1E0"
        d="M20 3.2c1.9-2 4.6-3.2 7.6-3.2 4 0 7.5 2.2 9.3 5.5a12.5 12.5 0 0 1 5-1c6.2 0 11.1 5 11.1 11.2S48 27 41.8 27c-.8 0-1.5-.1-2.2-.2a8.6 8.6 0 0 1-11.5 1.4 9.9 9.9 0 0 1-18.3-.7c-.5.1-1 .1-1.6.1C3.5 27.6 0 24 0 19.6c0-3 1.7-5.7 4.1-7-.4-1-.6-2-.6-3.1C3.5 5 6.7 2 10.7 2c3.8 0 7 1.2 9.3 1.2z"
        transform="translate(0 2) scale(.96 .9)"
      />
      <text x="24" y="19" textAnchor="middle" fontFamily="Arial, sans-serif" fontStyle="italic" fontWeight="700" fontSize="8.2" fill="#fff">
        salesforce
      </text>
    </svg>
  );
}

export function LinkedIn({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="7" fill="#0A66C2" />
      <rect x="7" y="15" width="5.6" height="18" fill="#fff" />
      <circle cx="9.8" cy="9.6" r="3.3" fill="#fff" />
      <path fill="#fff" d="M16.5 15h5.4v2.5c.9-1.7 3-2.9 5.5-2.9 5 0 6.6 3 6.6 7.6V33h-5.6v-9.5c0-2.3-.5-4-2.8-4-2.4 0-3.5 1.7-3.5 4.2V33h-5.6z" />
    </svg>
  );
}

export function Apollo({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path fill="#F6C21B" fillRule="evenodd" d="M20 2 3 36h6.4l2.9-6h15.4l2.9 6H37zM15.4 24.5 20 15l4.6 9.5z" />
    </svg>
  );
}

/** Gmail, current multicolour "M" mark. */
export function Gmail({ className }: P) {
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

export function Zoom({ className }: P) {
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

export function GoogleCalendar({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#fff" />
      <path fill="#EA4335" d="M4 8a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v2H4z" />
      <path fill="#4285F4" d="M4 10h5v26H8a4 4 0 0 1-4-4z" />
      <path fill="#34A853" d="M31 36h1a4 4 0 0 0 4-4v-1h-5z" />
      <path fill="#188038" d="M31 25h5v6h-5z" />
      <path fill="#FBBC04" d="M31 10h5v15h-5z" />
      <text x="20" y="28.6" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" fill="#4285F4">
        31
      </text>
    </svg>
  );
}

export function HubSpot({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <g fill="#FF7A59">
        <circle cx="25" cy="24" r="6.6" fill="none" stroke="#FF7A59" strokeWidth="3.6" />
        <rect x="23.2" y="7" width="3.6" height="11" rx="1.8" />
        <circle cx="25" cy="7.4" r="3.4" />
        <path d="M8.5 9.2a2.6 2.6 0 0 1 3.6-.6l9 6.6-2.2 2.9-9-6.6a2.6 2.6 0 0 1-1.4-2.3z" />
        <circle cx="9.6" cy="9.6" r="3" />
        <path d="M14 33.6 19.8 28l2.4 2.4-5.8 5.6z" />
        <circle cx="14.4" cy="34" r="2.6" />
      </g>
    </svg>
  );
}

export function Outlook({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="14" y="8" width="22" height="24" rx="3" fill="#28A8EA" />
      <rect x="14" y="8" width="22" height="8" rx="3" fill="#50D9FF" />
      <path d="M14 18h22v11a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3z" fill="#0078D4" />
      <rect x="4" y="11" width="18" height="18" rx="3" fill="#0A5BB4" />
      <ellipse cx="13" cy="20" rx="4.6" ry="5.4" fill="none" stroke="#fff" strokeWidth="2.4" />
    </svg>
  );
}

export function Gong({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="10" fill="#8039DF" />
      <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          const r1 = i % 2 ? 5 : 4;
          const r2 = i % 2 ? 11 : 13;
          return (
            <line
              key={i}
              x1={(20 + Math.cos(a) * r1).toFixed(2)}
              y1={(20 + Math.sin(a) * r1).toFixed(2)}
              x2={(20 + Math.cos(a) * r2).toFixed(2)}
              y2={(20 + Math.sin(a) * r2).toFixed(2)}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function Dynamics({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M9 4l14 5v13L9 17z" fill="#0B53CE" />
      <path d="M9 17l14 5v14L9 31z" fill="#2266E3" />
      <path d="M23 9l9 4.6v19L23 36V22z" fill="#5E9AFF" />
    </svg>
  );
}

export function Globe({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18M4.5 7.5h15M4.5 16.5h15" />
    </svg>
  );
}

export function FileCsv({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
      <path d="M6 3h8l5 5v13H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h7M9 16.5h7" strokeLinecap="round" />
    </svg>
  );
}
