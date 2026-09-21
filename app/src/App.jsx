import { useEffect, useMemo, useState } from 'react';
import TopBar from './components/TopBar.jsx';
import CategoryBar from './components/CategoryBar.jsx';
import LangToggle from './components/LangToggle.jsx';
import SeriesView from './components/SeriesView.jsx';
import ExamView from './components/ExamView.jsx';
import VipView from './components/VipView.jsx';
import CoachView from './components/CoachView.jsx';
import Testimonials from './components/Testimonials.jsx';
import StatsView from './components/StatsView.jsx';
import QuizPlayer from './components/QuizPlayer.jsx';
import CamelIcon from './components/CamelIcon.jsx';
import { DesertScene } from './components/Brand.jsx';
import { groupBySubcat } from './lib/helpers.js';
import { BRAND, HERO, CAT_KEY, LANG_KEY, FOOTER_LEAD, catLabel } from './lib/brand.js';

const TABS = ['series', 'examen', 'vip', 'coach', 'stats'];
const hashTab = () => { const h = location.hash.replace('#', ''); return TABS.includes(h) ? h : 'series'; };

// Catégorie « historique » : fiches texte voiture (elpermis) — datamodel différent (texte+options).
const LEGACY = {
  id: 'txt', icon: '', label: 'Voiture · fiches (texte)',
  kind: 'text', data: 'data/questions.json', langs: ['ar'], subcatsByLang: {},
};

export default function App() {
  const [tab, setTabState] = useState(hashTab);
  const setTab = (t) => { setTabState(t); history.replaceState(null, '', `#${t}`); };

  const [catalog, setCatalog] = useState(null);     // liste des catégories
  const [catId, setCatId] = useState(() => localStorage.getItem(CAT_KEY) || 'A');
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || 'ar'); // langue des questions
  const [rows, setRows] = useState(null);           // questions de la catégorie courante
  const [loadingCat, setLoadingCat] = useState(true);
  const [err, setErr] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [heroImgOk, setHeroImgOk] = useState(true);

  useEffect(() => {
    const onHash = () => setTabState(hashTab());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Catalogue des catégories (image, depuis R2) + la catégorie texte historique.
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/crt/index.json')
      .then((r) => r.json())
      .then((idx) => setCatalog([...idx.categories, LEGACY]))
      .catch(() => setCatalog([LEGACY]));   // au pire, juste les fiches texte
  }, []);

  const cat = useMemo(
    () => (catalog ? catalog.find((c) => c.id === catId) || catalog[0] : null),
    [catalog, catId]
  );

  // Charge les questions de la catégorie sélectionnée.
  useEffect(() => {
    if (!cat) return;
    setLoadingCat(true); setRows(null); setErr(null);
    const kind = cat.kind || 'image';
    fetch(import.meta.env.BASE_URL + cat.data)
      .then((r) => r.json())
      .then((data) => { setRows(data.map((q) => ({ ...q, kind }))); })
      .catch((e) => setErr(String(e)))
      .finally(() => setLoadingCat(false));
  }, [cat]);

  function pickCat(id) {
    setCatId(id);
    localStorage.setItem(CAT_KEY, id);
    setQuiz(null);
  }
  function pickLang(l) {
    setLang(l);
    localStorage.setItem(LANG_KEY, l);
    setQuiz(null);
  }

  const isImageCat = !!cat && cat.id !== 'txt';
  const catLangs = cat?.langs || ['ar'];
  const effLang = catLangs.includes(lang) ? lang : catLangs[0];   // fallback si langue absente
  const langFallback = isImageCat && !catLangs.includes(lang);
  // Libellé localisé de la catégorie (« B — voiture »), indépendant des données.
  const label = catLabel(cat, effLang === 'ar' ? 'ar' : 'fr');

  // Questions de la langue effective (les fiches texte ne se filtrent pas).
  const visibleRows = useMemo(() => {
    if (!rows) return null;
    return isImageCat ? rows.filter((q) => q.lang === effLang) : rows;
  }, [rows, effLang, isImageCat]);

  const subOrder = (cat?.subcatsByLang?.[effLang] || []).map((s) => s.slug);
  const groups = useMemo(() => (visibleRows ? groupBySubcat(visibleRows, subOrder) : []), [visibleRows, effLang, cat]);
  const seriesCount = groups.reduce((n, g) => n + g.series.length, 0);
  // Bassin pour l'examen blanc : les questions de type « examen », sinon tout.
  const examPool = useMemo(() => {
    if (!visibleRows) return [];
    const ex = visibleRows.filter((q) => q.subType === 'examen');
    return ex.length ? ex : visibleRows;
  }, [visibleRows]);
  // Bassin « éliminatoires » pour l'examen VIP spécial.
  const criticalPool = useMemo(() => (visibleRows ? visibleRows.filter((q) => q.critical) : []), [visibleRows]);

  function play(q) { setQuiz(q); window.scrollTo({ top: 0 }); }
  function exit() { setQuiz(null); }

  if (quiz) {
    return (
      <>
        <TopBar />
        <div className="wrap"><QuizPlayer quiz={quiz} onExit={exit} /></div>
      </>
    );
  }

  return (
    <>
      <TopBar />
      <div className="wrap">
        <section className="hero">
          <div className="hero-text">
            <span className="eyebrow">{HERO.eyebrow}</span>
            <h1>{HERO.title1}<br /><span className="gold">{HERO.title2}</span></h1>
            <p>{HERO.lead}</p>
            <div className="roadmark" aria-hidden />
            <div className="hero-points">
              {cat && <span>{label}</span>}
              {visibleRows && <span>{seriesCount} séries</span>}
              {visibleRows && <span>{visibleRows.length} questions</span>}
              <span>{effLang === 'fr' ? 'en français' : 'بالعربية'}</span>
            </div>
          </div>
          <figure className="hero-photo">
            <DesertScene />
            {heroImgOk && (
              <img
                src={import.meta.env.BASE_URL + 'images/people/hero.jpg'}
                alt={HERO.photoAlt}
                loading="eager"
                onError={() => setHeroImgOk(false)}
              />
            )}
          </figure>
        </section>

        <CategoryBar catalog={catalog} catId={cat?.id} onPick={pickCat} lang={lang} />
        {isImageCat && (
          <div className="lang-row">
            <LangToggle lang={lang} onPick={pickLang} available={catLangs} />
            {langFallback && (
              <span className="lang-note">Pas de version française pour cette catégorie — affichage en arabe.</span>
            )}
          </div>
        )}

        <div className="tabs">
          <button className={`tab ${tab === 'series' ? 'active' : ''}`} onClick={() => setTab('series')}>
            Séries{rows ? ` · ${seriesCount}` : ''}
          </button>
          <button className={`tab ${tab === 'examen' ? 'active' : ''}`} onClick={() => setTab('examen')}>
            Examen blanc
          </button>
          <button className={`tab tab-vip ${tab === 'vip' ? 'active' : ''}`} onClick={() => setTab('vip')}>
            ★ Examens VIP
          </button>
          <button className={`tab tab-coach ${tab === 'coach' ? 'active' : ''}`} onClick={() => setTab('coach')}>
            <CamelIcon size={22} />Coach
          </button>
          <button className={`tab ${tab === 'stats' ? 'active' : ''}`} onClick={() => setTab('stats')}>
            Ma progression
          </button>
        </div>

        {err && <div className="empty">Erreur de chargement des données : {err}</div>}
        {!err && (loadingCat || !visibleRows) && <div className="empty">Chargement de la catégorie {label}…</div>}

        {!err && visibleRows && (
          <>
            {tab === 'series' && <SeriesView groups={groups} catId={cat.id} lang={effLang} allQuestions={visibleRows} onPlay={play} />}
            {tab === 'examen' && <ExamView catId={cat.id} catLabel={label} lang={effLang} examPool={examPool} onPlay={play} />}
            {tab === 'vip' && <VipView catId={cat.id} catLabel={label} lang={effLang} examPool={examPool} criticalPool={criticalPool} onPlay={play} />}
            {tab === 'coach' && <CoachView groups={groups} catId={cat.id} catLabel={label} allQuestions={visibleRows} onPlay={play} />}
            {tab === 'stats' && <StatsView groups={groups} catId={cat.id} catLabel={label} />}
            {tab === 'series' && <Testimonials />}
          </>
        )}

        <div className="footer">
          <span className="credit">{BRAND.name}</span> — {FOOTER_LEAD}<br />
          Conçu par <a href={BRAND.author.url} target="_blank" rel="noopener">{BRAND.author.name}</a> ·{' '}
          <a href={BRAND.repo} target="_blank" rel="noopener">Code source sur GitHub</a>
        </div>
      </div>
    </>
  );
}
