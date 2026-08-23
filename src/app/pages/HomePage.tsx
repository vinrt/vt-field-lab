import { useEffect } from "react";
import { Link } from "react-router-dom";
import { books } from "../../content/books";
import { ArrowRightIcon, BookIcon, CompassIcon } from "../../components/ui/Icons";
import { simulations } from "../../simulations/registry";

export function HomePage() {
  useEffect(() => {
    document.title = "VT Field Lab — Interactive science";
  }, []);

  const featured = simulations[0];

  return (
    <main className="page home-page">
      <section className="hero">
        <div className="page-width hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Explore. Measure. Understand.</span>
            <h1>Experiments for <em>curious</em> minds.</h1>
            <p>
              Interactive models that connect real-world behavior with the mathematics beneath it.
              Explore. Measure. Understand.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary button--large" to={featured.route}>
                Explore simulations <ArrowRightIcon />
              </Link>
              <Link className="button button--ghost button--large" to="/simulations">
                How it works
              </Link>
            </div>
            <div className="feature-list" aria-label="Lab qualities">
              <div><CompassIcon /><strong>Interactive</strong><span>Visual models you can experiment with.</span></div>
              <div><CompassIcon /><strong>Measurable</strong><span>Collect data and see variables in action.</span></div>
              <div><CompassIcon /><strong>Mathematical</strong><span>Connect observations to the math.</span></div>
            </div>
          </div>

          <Link className="featured-instrument" to={featured.route} aria-label="Open Projectile Motion experiment">
            <div className="instrument-topbar">
              <span><i /> Instrument online</span>
              <span>EXP · 001</span>
            </div>
            <div className="instrument-screen" aria-hidden="true">
              <svg viewBox="0 0 620 380">
                <defs>
                  <linearGradient id="trail" x1="0" x2="1">
                    <stop offset="0" stopColor="#63e6be" stopOpacity=".2" />
                    <stop offset="1" stopColor="#63e6be" />
                  </linearGradient>
                  <radialGradient id="projectile">
                    <stop offset="0" stopColor="#fff6d9" />
                    <stop offset=".45" stopColor="#ffbd59" />
                    <stop offset="1" stopColor="#dd7636" />
                  </radialGradient>
                </defs>
                {Array.from({ length: 7 }).map((_, index) => (
                  <line key={`v-${index}`} x1={50 + index * 85} y1="30" x2={50 + index * 85} y2="330" className="instrument-grid-line" />
                ))}
                {Array.from({ length: 5 }).map((_, index) => (
                  <line key={`h-${index}`} x1="50" y1={70 + index * 65} x2="570" y2={70 + index * 65} className="instrument-grid-line" />
                ))}
                <path d="M50 320 Q255 12 565 320" className="instrument-ghost-path" />
                <path d="M50 320 Q190 108 365 83" className="instrument-live-path" />
                <line x1="365" y1="83" x2="425" y2="108" className="instrument-vector" />
                <path d="m425 108-12-12m12 12-17 3" className="instrument-vector" />
                <circle cx="365" cy="83" r="10" fill="url(#projectile)" className="instrument-projectile" />
                <text x="52" y="352">0 m</text>
                <text x="516" y="352">80 m</text>
                <text x="366" y="63">v = 28.00 m/s</text>
              </svg>
            </div>
            <div className="instrument-data">
              <div><span>Range</span><strong>18.2</strong><small>m</small></div>
              <div><span>Max height</span><strong>5.1</strong><small>m</small></div>
              <div><span>Time of flight</span><strong>2.6</strong><small>s</small></div>
              <div className="instrument-cta"><CompassIcon /><span>Featured simulation<strong>Projectile motion</strong></span></div>
            </div>
          </Link>
        </div>
      </section>

      <section className="library-preview">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <div>
              <h2>Simulations</h2>
            </div>
            <Link className="text-link" to="/simulations">View all simulations <span>→</span></Link>
          </div>
          <div className="simulation-card-grid">
            {simulations.map((simulation, index) => (
              <article key={simulation.id} className={`simulation-card simulation-card--${index + 1}`}>
                <div className="simulation-card-visual" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i />
                </div>
                <div className="simulation-card-body">
                  <div><span>{simulation.category}</span><small>{simulation.status === "available" ? "Available" : "Coming soon"}</small></div>
                  <h3>{simulation.title}</h3>
                  <p>{simulation.description}</p>
                  {simulation.status === "available" ? (
                    <Link className="card-link" to={simulation.route}>Open simulation <ArrowRightIcon /></Link>
                  ) : (
                    <span className="card-link card-link--disabled">In development</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="library-preview library-preview--books">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <div>
              <h2>Books & References</h2>
            </div>
            <Link className="text-link" to="/books">View all books <span>→</span></Link>
          </div>
          <div className="book-preview-grid">
            {books.slice(0, 3).map((book) => (
              <article key={book.title} className="book-preview-card">
                <div className="book-preview-cover" aria-hidden="true"><BookIcon /></div>
                <div>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <span>{book.description}</span>
                </div>
                <ArrowRightIcon />
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
