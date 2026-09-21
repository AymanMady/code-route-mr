// ───────────────────────────────────────────────────────────────────────────
//  IDENTITÉ & LOCALISATION — source unique de vérité (version mauritanienne).
//  Tout ce qui est « pays » vit ici : nom, autorité, villes, devise, moyens de
//  paiement, libellés de catégories, paliers de niveau, format d'examen.
//  Changer de pays = ne changer QUE ce fichier (+ le dataset de questions).
// ───────────────────────────────────────────────────────────────────────────

export const BRAND = {
  word1: 'CODE',                       // encre
  word2: 'ROUTE',                      // or
  tagline: 'permis mauritanien · ATTM',
  name: 'Coderoute MR',
  authority: 'ATTM',
  country: 'Mauritanie',
  countryAr: 'موريتانيا',
  site: 'https://code-route-mr.vercel.app',
  repo: 'https://github.com/AymanMady/code-route-mr',
  author: { name: 'Bechir Mady', url: 'https://github.com/AymanMady' },
};

// Couleurs du drapeau — réutilisées par le thème CSS (cf. styles/theme-mr.css).
export const FLAG = { green: '#006233', gold: '#FFC400', red: '#CD2A3E' };

// ── Hero ───────────────────────────────────────────────────────────────────
export const HERO = {
  eyebrow: 'Épreuve théorique · Mauritanie · toutes catégories',
  title1: 'Route de Nouakchott ou désert du Trarza,',
  title2: 'apprends à conduire partout.',
  lead:
    "Entraîne-toi sur des séries adaptées à la réalité routière mauritanienne. " +
    "Code de la route, panneaux spécifiques, et épreuves de conduite en ville et sur piste.",
  photoAlt: 'Au volant sur la route de Nouakchott, en fin de journée',
};

// ── Stockage local (namespacé MR — repart d'une progression vierge) ────────
export const STORE_KEY = 'coderoutemr:v1';
export const CAT_KEY = 'coderoutemr:cat';
export const LANG_KEY = 'coderoutemr:lang';

// ── Format de l'examen blanc ───────────────────────────────────────────────
// Format d'ENTRAÎNEMENT retenu par l'application (30 questions, 24 pour passer,
// 20 min). Ce n'est pas une reprise d'un barème officiel ATTM : si tu disposes
// du format réel, c'est ici — et nulle part ailleurs — qu'il se règle.
export const EXAM_SIZE = 30;
export const EXAM_PASS = 24;
export const EXAM_TIME = 20 * 60;

// ── Paliers de niveau (XP) ────────────────────────────────────────────────
export const PERMIS = [
  'Piéton',            // 1
  'Apprenti',          // 2
  'Élève conducteur',  // 3
  'Code en poche',     // 4
  'Permis B',          // 5
  'Conducteur sûr',    // 6
  'Habitué de la piste',// 7
  'Moniteur',          // 8
];
export const permisLabel = (level) => PERMIS[Math.min(level, PERMIS.length) - 1] || 'Moniteur';

// ── Pass VIP ───────────────────────────────────────────────────────────────
export const PRICE = '200 MRU';
// Services de paiement mobile courants en Mauritanie + règlement en auto-école.
export const PAYMENTS = ['Bankily', 'Masrvi', 'Sedad', 'Click', 'Espèces (auto-école)'];

// ── Catégories de permis ───────────────────────────────────────────────────
// Libellé court = affiché dans le chip ; l'indice (hint) part dans le title,
// c'est là qu'on loge la terminologie locale (piste, 4×4, interurbain…).
export const CAT_NAMES = {
  fr: {
    A: 'Moto', B: 'Voiture', G: 'Tracteur / engin', C: 'Poids lourd',
    CE: 'Poids lourd + remorque', D: 'Transport en commun', BE: 'Voiture + remorque',
    DE: 'Bus + remorque', txt: 'Voiture · fiches',
  },
  ar: {
    A: 'دراجة نارية', B: 'سيارة', G: 'جرّار / آلية', C: 'شاحنة ثقيلة',
    CE: 'شاحنة + مقطورة', D: 'نقل جماعي', BE: 'سيارة + مقطورة',
    DE: 'حافلة + مقطورة', txt: 'سيارة · بطاقات',
  },
};
export const CAT_HINTS = {
  A: 'Moto et tricycle — circulation urbaine et quartiers',
  B: 'Voiture et 4×4 — ville, route bitumée et piste',
  G: 'Tracteur et engin agricole — hors agglomération',
  C: 'Camion — transport de marchandises, axes interurbains',
  CE: 'Camion avec remorque — convois et longue distance',
  D: 'Bus et transport de voyageurs — urbain et interurbain',
  BE: 'Voiture tractant une remorque',
  DE: 'Bus tractant une remorque',
  txt: 'Fiches de révision au format texte',
};
// Libellé long « CODE — nom », utilisé dans le hero et les titres d'examen.
export const catLabel = (cat, lang = 'fr') => {
  if (!cat) return '';
  const name = CAT_NAMES[lang]?.[cat.id] || CAT_NAMES.fr[cat.id];
  if (!name) return cat.label;
  return cat.id === 'txt' ? name : `${cat.id.toUpperCase()} — ${name.toLowerCase()}`;
};

// ── Témoignages ────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { name: 'Mohamed Lemine', who: '22 ans · Nouakchott',
    quote: 'Eu le code du premier coup. Je révisais entre deux cours, dans le taxi.' },
  { name: 'Aichetou', who: '19 ans · Nouadhibou',
    quote: "L'examen blanc chronométré m'a appris à gérer le stress du jour J." },
  { name: 'Sidi Brahim', who: '25 ans · Rosso',
    quote: 'La révision des erreurs m’a fait progresser en une semaine.' },
];

// ── Conseils du Coach ──────────────────────────────────────────────────────
// Micro-copie locale : « لاباس » est la salutation hassaniya usuelle.
export const COACH_HELLO = 'لاباس ؟';
export const COACH_TIPS = [
  { t: 'Sable sur la chaussée', d: "Hors agglomération, le sable qui déborde sur le bitume réduit l'adhérence : lève le pied avant, pas pendant." },
  { t: 'Priorité aux carrefours', d: 'Révise les priorités à droite et les giratoires — c’est le bloc de questions qui recale le plus.' },
  { t: 'Sur piste', d: 'Hors du bitume, la distance de freinage s’allonge. Garde des intervalles larges et anticipe la poussière du véhicule devant.' },
  { t: 'Animaux sur la route', d: 'Troupeaux et dromadaires en bord de route : ralentis franchement, ils traversent sans prévenir.' },
  { t: 'Questions éliminatoires', d: 'Une seule erreur sur une question éliminatoire peut suffire à te recaler. Repère-les et apprends-les par cœur.' },
];

// ── Pied de page ───────────────────────────────────────────────────────────
export const FOOTER_LEAD =
  'entraînement au code de la route mauritanien, toutes catégories. Progression stockée sur cet appareil.';
