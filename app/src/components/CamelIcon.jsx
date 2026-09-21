// Pictogramme de dromadaire stylisé — touche culturelle de l'onglet « Coach ».
// Silhouette pleine en currentColor : suit la couleur de l'onglet (actif / repos).
export default function CamelIcon({ className = 'camel-ic', size = 22, title }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 48"
      width={size}
      height={(size * 48) / 64}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {/* queue + touffe */}
      <path d="M46.2 20.6 C 49.6 22.2 50.9 24.6 50.8 27.0"
        fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <ellipse cx="50.8" cy="28.4" rx="1.35" ry="2.2" transform="rotate(10 50.8 28.4)" />
      {/* pattes */}
      <rect x="25.2" y="22" width="3.4" height="22" rx="1.7" />
      <rect x="29.8" y="22" width="3.4" height="22" rx="1.7" />
      <rect x="41.0" y="22" width="3.4" height="22" rx="1.7" />
      <rect x="45.4" y="22" width="3.4" height="22" rx="1.7" />
      {/* tête, encolure, bosse et corps en une seule silhouette */}
      <path d="M7.4 8.0
               C 8.0 6.0 9.8 4.8 11.6 4.6
               C 12.2 4.55 12.7 4.5 13.1 4.5
               L 13.9 2.0 L 15.6 4.5
               C 17.6 5.6 19.4 8.4 20.9 12.2
               C 22.2 15.6 23.3 17.0 24.9 18.2
               C 25.6 18.7 26.2 18.4 26.5 17.2
               C 27.6 12.2 30.4 9.0 33.5 9.0
               C 36.8 9.0 39.4 11.6 40.7 15.4
               C 41.5 17.7 42.9 19.4 44.8 20.6
               C 47.2 22.1 48.4 23.4 48.4 25.0
               C 48.4 26.2 47.5 26.9 46.0 26.9
               C 39.4 27.5 33.0 27.6 27.0 27.0
               C 24.4 26.7 22.9 25.1 22.8 22.8
               C 22.7 19.0 20.6 14.8 17.4 11.0
               C 16.2 9.6 14.8 9.0 13.2 8.9
               C 11.4 8.8 9.6 9.4 8.4 10.1
               C 7.4 10.7 6.8 9.9 7.0 8.9
               C 7.1 8.5 7.25 8.2 7.4 8.0 Z" />
    </svg>
  );
}
