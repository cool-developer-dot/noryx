/**
 * Procedural monolith: faceted polygons + SVG lighting filters for a rough,
 * wet-stone surface, with a red rim light along the upper-left edges.
 */
export default function Rock({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMaxYMax slice"
      className={className}
      aria-hidden
    >
      <defs>
        {/* rough surface texture */}
        <filter id="rock-tex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.03" numOctaves="5" seed="7" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="22" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="5" seed="3" result="bump" />
          <feDiffuseLighting in="bump" lightingColor="#9a9aa2" surfaceScale="5" diffuseConstant="1.15" result="lit">
            <feDistantLight azimuth="215" elevation="38" />
          </feDiffuseLighting>
          <feComposite in="lit" in2="shape" operator="in" result="litShape" />
          <feBlend in="litShape" in2="shape" mode="multiply" />
        </filter>

        {/* red glow */}
        <filter id="rock-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="rock-glow-lg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="26" />
        </filter>

        <linearGradient id="g-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#66666f" />
          <stop offset=".5" stopColor="#3a3a41" />
          <stop offset="1" stopColor="#17171b" />
        </linearGradient>
        <linearGradient id="g-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b1a1c" />
          <stop offset=".5" stopColor="#141417" />
          <stop offset="1" stopColor="#09090b" />
        </linearGradient>
        <linearGradient id="g-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1b20" />
          <stop offset=".6" stopColor="#0c0c0f" />
          <stop offset="1" stopColor="#050506" />
        </linearGradient>
        <linearGradient id="g-back" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a3a42" />
          <stop offset="1" stopColor="#0f0f12" />
        </linearGradient>
        <linearGradient id="g-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff3030" stopOpacity="0" />
          <stop offset=".3" stopColor="#ff3030" />
          <stop offset=".75" stopColor="#ff5a4a" />
          <stop offset="1" stopColor="#ff3030" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset=".72" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".75" />
        </linearGradient>
      </defs>

      {/* red ambient bloom behind the rock */}
      <g filter="url(#rock-glow-lg)" opacity=".75">
        <path d="M470 250 L470 470 L780 470 L760 250 Z" fill="#ff1e1e" opacity=".35" />
        <path d="M180 520 L430 495 L790 466 L850 520 L560 575 L250 585 Z" fill="#ff2a2a" opacity=".35" />
      </g>

      <g filter="url(#rock-tex)">
        {/* back block (behind the intelligence card) */}
        <polygon points="470,270 500,70 560,22 650,4 705,52 740,220 770,470 420,498" fill="url(#g-back)" />
        <polygon points="560,22 650,4 705,52 690,110 600,96" fill="#52525a" opacity=".7" />

        {/* left face */}
        <polygon points="10,800 110,650 190,524 255,586 340,800" fill="url(#g-left)" />

        {/* top plate */}
        <polygon points="190,524 420,498 770,470 835,520 570,566 255,586" fill="url(#g-top)" />

        {/* right slope */}
        <polygon points="770,470 925,498 1000,548 1000,600 835,520" fill="url(#g-top)" opacity=".9" />

        {/* front mass */}
        <polygon points="255,586 570,566 835,520 1000,600 1000,800 340,800" fill="url(#g-front)" />

        {/* crack accents */}
        <polygon points="420,640 560,566 600,640 540,760 470,800 400,800" fill="#070709" opacity=".7" />
        <polygon points="700,560 835,520 900,600 860,700 760,640" fill="#0a0a0d" opacity=".6" />
      </g>

      {/* red rim light along upper-left edges */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g filter="url(#rock-glow)" opacity=".9">
          <path d="M110 650 L190 524 L420 498 L770 470" stroke="url(#g-rim)" strokeWidth="5" />
          <path d="M770 470 L925 498 L1000 548" stroke="#ff3a2a" strokeWidth="6" />
          <path d="M470 270 L500 70" stroke="#ff2a2a" strokeWidth="6" />
        </g>
        <path d="M110 650 L190 524 L420 498 L770 470" stroke="url(#g-rim)" strokeWidth="2" opacity=".95" />
        <path d="M770 470 L925 498 L1000 548" stroke="#ff6a55" strokeWidth="2" opacity=".9" />
        <path d="M470 270 L500 70 L560 22" stroke="#ff4a3a" strokeWidth="1.600" opacity=".85" />
      </g>

      {/* bottom fade into page */}
      <rect width="1000" height="800" fill="url(#g-fade)" />
    </svg>
  );
}
