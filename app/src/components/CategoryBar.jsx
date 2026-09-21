import CatIcon from './CatIcon.jsx';
import { CAT_NAMES, CAT_HINTS } from '../lib/brand.js';

// Sélecteur de catégorie de permis. Les libellés viennent de lib/brand.js :
// le chip reste court, la terminologie locale (piste, 4×4, interurbain…)
// part dans l'info-bulle.
export default function CategoryBar({ catalog, catId, onPick, lang = 'fr' }) {
  if (!catalog) return null;
  const ar = lang === 'ar';
  return (
    <div className="catbar" role="tablist" aria-label="Catégorie de permis">
      <span className="catbar-lbl">{ar ? 'الصنف' : 'Catégorie'}</span>
      <div className="catchips">
        {catalog.map((c) => {
          const name = CAT_NAMES[lang]?.[c.id] || CAT_NAMES.fr[c.id] || c.label;
          const hint = CAT_HINTS[c.id];
          const code = c.id === 'txt' ? 'TXT' : c.id.toUpperCase();
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={c.id === catId}
              className={`catchip ${c.id === catId ? 'active' : ''}`}
              onClick={() => onPick(c.id)}
              title={hint ? `${name} — ${hint}` : name}
            >
              <CatIcon id={c.id} />
              <span className="catchip-code">{code}</span>
              <span className="catchip-lbl" dir={ar ? 'rtl' : 'ltr'}>{name}</span>
              {typeof c.questions === 'number' && <span className="catchip-n">{c.questions}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
