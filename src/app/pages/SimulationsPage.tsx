import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BookIcon, PlayIcon } from "../../components/ui/Icons";
import { quantumConcepts, quantumLearningPhases } from "../../content/quantum";
import { simulations } from "../../simulations/registry";

const categories = [
  { title: "Mechanics", detail: "Motion, forces, energy", icon: "orbit", accent: "green" },
  { title: "Waves", detail: "Light, sound, interference", icon: "wave", accent: "blue" },
  { title: "Electromagnetism", detail: "Fields, charge, circuits", icon: "field", accent: "amber" },
  { title: "Modern Physics", detail: "Relativity and quantum", icon: "rings", accent: "violet", routeCategory: "Quantum Physics" },
  { title: "Mathematics", detail: "Calculus, vectors, algebra", icon: "axes", accent: "blue" },
  { title: "Quantum Computing", detail: "Qubits, gates, circuits", icon: "atom", accent: "violet" },
];

function DashboardHeroVisual() {
  return (
    <svg className="dashboard-hero-visual" viewBox="0 0 720 240" aria-hidden="true">
      <defs>
        <linearGradient id="dashboard-orbit-gradient" x1="0" x2="1"><stop stopColor="#14b8a6" /><stop offset="1" stopColor="#7c3aed" /></linearGradient>
        <radialGradient id="dashboard-core"><stop stopColor="#c4b5fd" /><stop offset=".45" stopColor="#6d28d9" /><stop offset="1" stopColor="#172033" /></radialGradient>
      </defs>
      <path d="M10 174 C52 174 48 116 76 116 S101 205 130 205 157 94 186 94 211 187 239 187 264 144 292 144" className="dashboard-wave" />
      {[0, 1, 2, 3, 4].map((index) => <ellipse key={index} cx="505" cy="116" rx={72 + index * 37} ry={22 + index * 11} transform={`rotate(${index * 12 - 22} 505 116)`} className="dashboard-orbit" />)}
      <circle cx="505" cy="116" r="22" fill="url(#dashboard-core)" />
      {["370,113", "419,73", "466,164", "559,70", "622,137", "675,91"].map((point) => { const [cx, cy] = point.split(","); return <circle key={point} cx={cx} cy={cy} r="4" className="dashboard-particle" />; })}
    </svg>
  );
}

export function SimulationsPage() {
  useEffect(() => { document.title = "Interactive simulations — VT Field Lab"; }, []);
  const featured = simulations.filter((simulation) => simulation.featured).slice(0, 8);
  const quantumSimulations = simulations.filter((simulation) => simulation.category.includes("Quantum"));

  return (
    <main className="page dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="dashboard-kicker">Interactive science laboratory</span>
          <h1>Explore the laws of nature through <em>interactive</em> simulations.</h1>
          <p>Visualize physics, mathematics, and quantum phenomena in real time. Experiment, measure, and build intuitive understanding.</p>
          <div>
            <Link className="dashboard-primary-action" to="/simulations/library"><PlayIcon /> Explore simulations</Link>
            <Link className="dashboard-secondary-action" to="/concepts"><BookIcon /> View concepts</Link>
          </div>
        </div>
        <DashboardHeroVisual />
      </section>

      <section className="dashboard-section dashboard-category-section">
        <div className="dashboard-section-heading"><h2>Explore by category</h2><Link to="/simulations/library">View all <ArrowRightIcon /></Link></div>
        <div className="dashboard-category-grid">
          {categories.map((category) => (
            <Link key={category.title} to={`/simulations/library?category=${encodeURIComponent(category.routeCategory ?? category.title)}`} className={`dashboard-category dashboard-accent--${category.accent}`}>
              <span className={`dashboard-category-icon dashboard-category-icon--${category.icon}`}><i /></span>
              <span><strong>{category.title}</strong><small>{category.detail}</small></span>
              {category.title === "Quantum Computing" && <b>New</b>}
            </Link>
          ))}
        </div>
      </section>

      <div className="dashboard-main-grid">
        <section className="dashboard-section dashboard-featured-section">
          <div className="dashboard-section-heading"><h2>Featured simulations</h2><Link to="/simulations/library">View all <ArrowRightIcon /></Link></div>
          <div className="dashboard-simulation-grid">
            {featured.map((simulation) => {
              const content = <><div className={`dashboard-simulation-visual dashboard-simulation-visual--${simulation.id}`} aria-hidden="true"><i /><b /></div><div className="dashboard-simulation-copy"><span>{simulation.category}</span><h3>{simulation.title}</h3><p>{simulation.description}</p><small>{simulation.status === "available" ? "Open lab" : "Coming soon"}</small></div></>;
              return simulation.status === "available" ? <Link key={simulation.id} className="dashboard-simulation-card" to={simulation.route}>{content}</Link> : <article key={simulation.id} className="dashboard-simulation-card dashboard-simulation-card--planned">{content}</article>;
            })}
          </div>
          <Link className="dashboard-wide-link" to="/simulations/library">View all simulations <ArrowRightIcon /></Link>
        </section>

        <aside className="dashboard-quantum-column">
          <section className="dashboard-section dashboard-quantum-basics">
            <div className="dashboard-section-heading"><h2>Quantum Physics Basics</h2><Link to="/concepts/quantum-physics">View all <ArrowRightIcon /></Link></div>
            <div className="quantum-basics-strip">
              {quantumConcepts.filter((concept) => concept.id !== "amplitude").map((concept) => <Link key={concept.id} to={`/concepts/quantum-physics#${concept.id}`} className={`quantum-basic-item quantum-basic-item--${concept.accent}`}><i aria-hidden="true" /><strong>{concept.title}</strong><span>{concept.shortDescription}</span></Link>)}
            </div>
          </section>

          <section className="dashboard-section dashboard-quantum-preview">
            <div className="dashboard-section-heading"><h2>Quantum Computing Preview</h2><Link to="/quantum">View all <ArrowRightIcon /></Link></div>
            <div className="quantum-preview-grid">
              {quantumSimulations.map((simulation) => simulation.status === "available" ? <Link to={simulation.route} key={simulation.id}><i className="quantum-preview-orbit" /><strong>{simulation.title}</strong><span>{simulation.description}</span><small>Available</small></Link> : <article key={simulation.id}><i className="quantum-preview-orbit" /><strong>{simulation.title}</strong><span>{simulation.description}</span><small>Planned</small></article>)}
              <article><i className="quantum-preview-gate">H</i><strong>Quantum gates</strong><span>Apply X, Z, H, and more to one qubit.</span><small>Upcoming</small></article>
              <article><i className="quantum-preview-circuit" /><strong>Quantum circuits</strong><span>Build and step through small circuits.</span><small>Upcoming</small></article>
            </div>
          </section>

          <section className="dashboard-section dashboard-roadmap">
            <div className="dashboard-section-heading"><h2>Quantum learning path</h2><Link to="/quantum">View plan <ArrowRightIcon /></Link></div>
            <ol>{quantumLearningPhases.map((phase) => <li key={phase.number}><b>{phase.number}</b><span><strong>{phase.title}</strong><small>{phase.detail}</small></span><em>{phase.status}</em></li>)}</ol>
          </section>
        </aside>
      </div>

      <section className="dashboard-values" aria-label="VT Field Lab qualities">
        <div><i>01</i><span><strong>Interactive</strong><small>Real-time simulations for deeper understanding.</small></span></div>
        <div><i>02</i><span><strong>Accurate</strong><small>Built with explicit physics and mathematics.</small></span></div>
        <div><i>03</i><span><strong>Open learning</strong><small>Concepts, experiments, and reading connected.</small></span></div>
        <div><i>04</i><span><strong>Modern</strong><small>Responsive and designed for every screen.</small></span></div>
      </section>
    </main>
  );
}
