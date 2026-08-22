import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CompassIcon } from "../../components/ui/Icons";
import { simulations } from "../../simulations/registry";

export function HomePage() {
  useEffect(() => {
    document.title = "VT Field Lab — Interactive science";
  }, []);

  const featured = simulations[0];

  return (
    <main className="page home-page">
      <section className="hero">
        <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
        <div className="page-width hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><i /> An interactive science laboratory</span>
            <h1>Don’t just read the equation. <em>See it move.</em></h1>
            <p>
              Explore physics and mathematics through simulations you can touch, measure, and understand—one variable at a time.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary button--large" to={featured.route}>
                Open the first experiment <ArrowRightIcon />
              </Link>
              <Link className="button button--ghost button--large" to="/simulations">
                Browse the lab
              </Link>
            </div>
            <dl className="hero-stats">
              <div><dt>01</dt><dd>Live experiment</dd></div>
              <div><dt>03</dt><dd>World presets</dd></div>
              <div><dt>100%</dt><dd>Browser-native</dd></div>
            </dl>
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
              <div><span>t</span><strong>1.72</strong><small>s</small></div>
              <div><span>x</span><strong>34.06</strong><small>m</small></div>
              <div><span>y</span><strong>19.56</strong><small>m</small></div>
              <div className="instrument-cta"><CompassIcon /><span>Projectile motion<strong>Enter lab →</strong></span></div>
            </div>
          </Link>
        </div>
      </section>

      <section className="method-section">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <div>
              <span className="eyebrow">The field method</span>
              <h2>From phenomenon to understanding</h2>
            </div>
            <p>Every experiment follows the same clear path, so visual intuition and mathematical reasoning grow together.</p>
          </div>
          <div className="method-grid">
            {[
              ["01", "Observe", "See the system evolve in real time with a precise, uncluttered visual model."],
              ["02", "Interact", "Change initial conditions and immediately compare cause with effect."],
              ["03", "Measure", "Follow positions, vectors, time, and graphs—not just a decorative animation."],
              ["04", "Understand", "Connect what you saw to the governing equations and their assumptions."],
            ].map(([number, title, description]) => (
              <article key={number} className="method-card">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="library-preview">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <div>
              <span className="eyebrow">Growing library</span>
              <h2>Start with mechanics. Go anywhere.</h2>
            </div>
            <Link className="text-link" to="/simulations">View all experiments <span>→</span></Link>
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
                    <Link className="card-link" to={simulation.route}>Open experiment <ArrowRightIcon /></Link>
                  ) : (
                    <span className="card-link card-link--disabled">In development</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
