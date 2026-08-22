import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../../components/ui/Icons";
import { simulations } from "../../simulations/registry";

export function SimulationsPage() {
  useEffect(() => {
    document.title = "Simulations — VT Field Lab";
  }, []);

  return (
    <main className="page content-page">
      <div className="page-width">
        <header className="content-hero">
          <span className="eyebrow">Simulation library</span>
          <h1>Experiments for curious minds.</h1>
          <p>Interactive models organized by subject. Each one pairs visual behavior with measurable quantities and the mathematics beneath it.</p>
        </header>
        <div className="filter-row" aria-label="Simulation categories">
          <button className="is-active" type="button">All experiments <span>{simulations.length}</span></button>
          <button type="button">Mechanics <span>2</span></button>
          <button type="button">Waves <span>1</span></button>
        </div>
        <div className="library-list">
          {simulations.map((simulation, index) => (
            <article key={simulation.id} className="library-row">
              <span className="library-index">{String(index + 1).padStart(2, "0")}</span>
              <div className={`library-icon library-icon--${index + 1}`} aria-hidden="true"><i /></div>
              <div className="library-row-copy">
                <div><span>{simulation.category}</span><span>·</span><span>{simulation.difficulty}</span></div>
                <h2>{simulation.title}</h2>
                <p>{simulation.description}</p>
                <ul>{simulation.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
              {simulation.status === "available" ? (
                <Link className="button button--secondary" to={simulation.route}>Open <ArrowRightIcon /></Link>
              ) : (
                <span className="coming-soon">Coming soon</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
