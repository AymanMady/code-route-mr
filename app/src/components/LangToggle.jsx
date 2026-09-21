// Bascule de langue des questions : français ⇄ arabe.
// Les séries mauritaniennes sont rédigées en arabe standard ; le hassaniya
// reste la langue parlée et n'apparaît que dans la micro-copie de l'interface.
export default function LangToggle({ lang, onPick, available }) {
  // available = liste des langues dispo pour la catégorie courante (ex. ['fr','ar'] ou ['ar'])
  const opts = [
    { id: 'fr', label: 'Français', title: 'Questions en français' },
    { id: 'ar', label: 'العربية', title: 'Questions en arabe' },
  ];
  return (
    <div className="langtoggle" role="group" aria-label="Langue des questions">
      {opts.map((o) => {
        const dispo = available.includes(o.id);
        return (
          <button
            key={o.id}
            className={`langbtn ${lang === o.id ? 'active' : ''}`}
            aria-pressed={lang === o.id}
            title={dispo ? o.title : `${o.label} — indisponible pour cette catégorie`}
            onClick={() => onPick(o.id)}
          >
            {o.label}
            {!dispo && <span className="langbtn-x" aria-hidden>∅</span>}
          </button>
        );
      })}
    </div>
  );
}
