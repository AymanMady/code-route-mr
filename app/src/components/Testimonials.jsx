import { TESTIMONIALS } from '../lib/brand.js';

// Preuve sociale. Monogrammes plutôt que portraits : les témoignages sont
// illustratifs (projet portfolio), on ne leur prête pas de visages réels.
const initials = (name) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export default function Testimonials() {
  return (
    <section className="testi">
      <h3>Ils ont décroché leur code</h3>
      <div className="testi-grid">
        {TESTIMONIALS.map((p) => (
          <figure className="testi-card" key={p.name}>
            <span className="testi-mono" aria-hidden>{initials(p.name)}</span>
            <blockquote>« {p.quote} »</blockquote>
            <figcaption><b>{p.name}</b> · {p.who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
