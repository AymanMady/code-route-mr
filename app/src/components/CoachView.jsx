import { useStore } from '../lib/store.js';
import { qid, serieQuizId } from '../lib/helpers.js';
import { COACH_HELLO, COACH_TIPS, EXAM_PASS, EXAM_SIZE } from '../lib/brand.js';
import CamelIcon from './CamelIcon.jsx';

// Seuil de réussite ramené en pourcentage (24/30 → 80 %).
const READY_PCT = Math.round((EXAM_PASS / EXAM_SIZE) * 100);

export default function CoachView({ groups, catId, catLabel, allQuestions, onPlay }) {
  const s = useStore();
  const acc = s.answered ? Math.round((s.correct / s.answered) * 100) : 0;

  const wrongSet = new Set(s.wrongIds);
  const wrongQuestions = allQuestions.filter((q) => wrongSet.has(qid(q)));

  const allSeries = groups.flatMap((g) => g.series.map((sr) => ({ ...sr, slug: g.slug, label: g.label })));
  const bestOf = (sr) => s.best[serieQuizId(catId, sr.slug, sr.num)];

  // Prochaine série conseillée : la première jamais tentée, sinon la plus faible.
  const untouched = allSeries.find((sr) => !bestOf(sr));
  const weakest = allSeries
    .filter((sr) => { const b = bestOf(sr); return b && b.score < b.total; })
    .sort((a, b) => (bestOf(a).score / bestOf(a).total) - (bestOf(b).score / bestOf(b).total))[0];
  const nextSerie = untouched || weakest || allSeries[0];

  // Diagnostic : assez de volume ET un taux au-dessus du seuil ?
  const enough = s.answered >= EXAM_SIZE;
  const tone = !enough ? 'idle' : acc >= READY_PCT ? 'ok' : acc >= READY_PCT - 12 ? 'mid' : 'low';
  const verdict = !enough
    ? `Encore trop peu de réponses pour juger. Vise ${EXAM_SIZE} questions pour un premier diagnostic.`
    : acc >= READY_PCT
      ? `Tu es au-dessus du seuil de ${READY_PCT} %. Enchaîne les examens blancs pour confirmer.`
      : `Il te manque ${READY_PCT - acc} points pour atteindre le seuil de ${READY_PCT} %. Commence par tes erreurs.`;

  function playSerie(sr) {
    onPlay({
      id: serieQuizId(catId, sr.slug, sr.num),
      title: `Série ${sr.num}`,
      subtitle: `${sr.label} · conseillée par le coach`,
      mode: 'revision',
      questions: sr.questions,
    });
  }

  function playErrors() {
    onPlay({
      id: `${catId}:erreurs`,
      title: 'Révision des erreurs',
      subtitle: `${wrongQuestions.length} questions ratées`,
      mode: 'revision',
      questions: wrongQuestions,
    });
  }

  return (
    <section className="coach">
      <div className="coach-head">
        <span className="coach-avatar" aria-hidden><CamelIcon size={44} /></span>
        <div className="coach-head-txt">
          <p className="coach-hello" dir="rtl" lang="ar">{COACH_HELLO}</p>
          <h2>Ton coach fait le point</h2>
          <p>{verdict}</p>
        </div>
        <div className={`coach-ready ${tone}`}>
          <span className="big">{enough ? `${acc}%` : `${s.answered}/${EXAM_SIZE}`}</span>
          <span className="lbl">{enough ? 'de réussite' : 'avant diagnostic'}</span>
        </div>
      </div>

      <div className="grid">
        <article className="card">
          <div className="card-top">
            <div>
              <div className="matiere">À faire</div>
              <span className="route-num"><span className="hash">N°</span>{nextSerie ? nextSerie.num : '—'}</span>
            </div>
            <span className="badge badge-amber">Conseillé</span>
          </div>
          <div className="sub">
            {nextSerie
              ? (untouched
                  ? `Jamais tentée · ${nextSerie.label}`
                  : `Ton score le plus faible · ${nextSerie.label}`)
              : 'Aucune série disponible dans cette catégorie.'}
          </div>
          <div className="btnrow">
            <button className="btn primary full" disabled={!nextSerie} onClick={() => playSerie(nextSerie)}>
              Commencer cette série →
            </button>
          </div>
        </article>

        <article className={`card ${wrongQuestions.length ? 'card-wrong' : ''}`}>
          <div className="card-top">
            <div>
              <div className="matiere">À revoir</div>
              <span className="route-num">{wrongQuestions.length}</span>
            </div>
            <span className={`badge ${wrongQuestions.length ? 'badge-red' : 'badge-green'}`}>
              {wrongQuestions.length ? 'Erreurs' : 'À jour'}
            </span>
          </div>
          <div className="sub">
            {wrongQuestions.length
              ? 'Les questions que tu as ratées dans cette catégorie.'
              : 'Aucune erreur en attente — continue sur de nouvelles séries.'}
          </div>
          <div className="btnrow">
            <button className="btn primary full" disabled={!wrongQuestions.length} onClick={playErrors}>
              Réviser mes erreurs →
            </button>
          </div>
        </article>

        <article className="card">
          <div className="card-top">
            <div>
              <div className="matiere">Régularité</div>
              <span className="route-num">{s.streak}</span>
            </div>
            <span className="badge badge-amber">Jours</span>
          </div>
          <div className="sub">
            {s.streak > 1
              ? `${s.streak} jours d'affilée — ne casse pas la série.`
              : 'Réponds à quelques questions chaque jour : c’est ce qui fait la différence.'}
          </div>
          <div className="dots">
            Séries terminées&nbsp;: <b>{allSeries.filter(bestOf).length}/{allSeries.length}</b> · {catLabel}
          </div>
        </article>
      </div>

      <h3 style={{ marginTop: 10 }}>Les conseils du coach</h3>
      <div className="coach-tips">
        {COACH_TIPS.map((tip) => (
          <article className="coach-tip" key={tip.t}>
            <h4>{tip.t}</h4>
            <p>{tip.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
