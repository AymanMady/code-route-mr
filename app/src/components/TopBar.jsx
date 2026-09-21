import { useStore, levelInfo } from '../lib/store.js';
import { permisLabel } from '../lib/brand.js';
import { Wordmark } from './Brand.jsx';

export default function TopBar() {
  const s = useStore();
  const lvl = levelInfo(s.xp);
  const acc = s.answered ? Math.round((s.correct / s.answered) * 100) : 0;

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Wordmark />
        <div className="stats">
          <div className="stat">
            <span className="big">{lvl.level}</span>
            <span>
              <span className="lbl">Niveau · {permisLabel(lvl.level)}</span>
              <span className="xpbar"><i style={{ width: `${lvl.pct}%` }} /></span>
            </span>
          </div>
          <div className="stat">
            <span className="big">{s.xp}</span>
            <span className="lbl">XP</span>
          </div>
          <div className="stat">
            <span className="big">{acc}%</span>
            <span className="lbl">{s.answered} réponses</span>
          </div>
          <div className="stat">
            <span className="big">{s.streak}</span>
            <span className="lbl">jours d'affilée</span>
          </div>
        </div>
      </div>
    </header>
  );
}
