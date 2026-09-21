import { BRAND } from '../lib/brand.js';

// ── Drapeau mauritanien ────────────────────────────────────────────────────
// Version officielle 2017 : champ vert, deux bandes rouges (haut / bas),
// croissant d'or ouvert vers le haut surmonté d'une étoile à cinq branches.
export function FlagMR({ className = 'flag-mr', title = 'Drapeau mauritanien' }) {
  return (
    <svg className={className} viewBox="0 0 90 60" role="img" aria-label={title}>
      <defs>
        <clipPath id="mr-flag-clip"><rect width="90" height="60" rx="6" /></clipPath>
        {/* croissant = grand disque moins un disque décalé vers le haut */}
        <mask id="mr-crescent">
          <rect width="90" height="60" fill="#000" />
          <circle cx="45" cy="30" r="16" fill="#fff" />
          <circle cx="45" cy="25" r="14" fill="#000" />
        </mask>
      </defs>
      <g clipPath="url(#mr-flag-clip)">
        <rect width="90" height="60" fill="#006233" />
        <rect width="90" height="9" fill="#CD2A3E" />
        <rect y="51" width="90" height="9" fill="#CD2A3E" />
        <rect width="90" height="60" fill="#FFC400" mask="url(#mr-crescent)" />
        <path
          fill="#FFC400"
          d="M45 19 L46.29 22.72 L50.23 22.80 L47.09 25.18 L48.23 28.95 L45 26.70 L41.77 28.95 L42.91 25.18 L39.77 22.80 L43.71 22.72 Z"
        />
      </g>
    </svg>
  );
}

// ── Bloc-marque : drapeau + CODEROUTE + « permis mauritanien · ATTM » ──────
export function Wordmark() {
  return (
    <div className="brand">
      <span className="brand-flag" aria-hidden><FlagMR /></span>
      <span className="brand-word">
        {BRAND.word1}<span className="gold">{BRAND.word2}</span>
        <small>{BRAND.tagline}</small>
      </span>
    </div>
  );
}

// ── Scène de repli du hero ────────────────────────────────────────────────
// Affichée si la photo du hero manque (asset à remplacer par un visuel local) :
// piste, dunes et soleil rasant, dans les tons de la marque.
export function DesertScene({ className = 'hero-fallback' }) {
  return (
    <svg className={className} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="mr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d1809" />
          <stop offset="55%" stopColor="#5d4212" />
          <stop offset="100%" stopColor="#c58c22" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#mr-sky)" />
      <circle cx="300" cy="244" r="46" fill="#f5d264" opacity=".85" />
      {/* dunes */}
      <path d="M0 258 C 90 226 160 272 250 258 C 330 245 380 268 460 252 C 520 240 560 256 600 248 L600 400 L0 400 Z" fill="#8a6524" />
      <path d="M0 288 C 110 264 190 300 300 288 C 400 277 470 302 600 286 L600 400 L0 400 Z" fill="#4f3a15" />
      {/* piste en perspective + marquage central */}
      <path d="M282 286 L318 286 L410 400 L190 400 Z" fill="#241d10" />
      <g fill="#e6b422" opacity=".9">
        <rect x="298" y="292" width="4" height="10" rx="2" />
        <rect x="297" y="314" width="6" height="14" rx="3" />
        <rect x="295" y="344" width="9" height="19" rx="4" />
        <rect x="293" y="378" width="13" height="22" rx="5" />
      </g>
    </svg>
  );
}
