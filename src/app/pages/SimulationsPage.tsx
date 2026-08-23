import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../../components/ui/Icons";
import { simulations } from "../../simulations/registry";

export function SimulationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All experiments");

  useEffect(() => {
    document.title = "Simulations — VT Field Lab";
  }, []);

  const categories = useMemo(() => {
    const counts = simulations.reduce<Record<string, number>>((accumulator, simulation) => {
      accumulator[simulation.category] = (accumulator[simulation.category] ?? 0) + 1;
      return accumulator;
    }, {});

    return [
      { label: "All experiments", count: simulations.length },
      ...Object.entries(counts).map(([label, count]) => ({ label, count })),
    ];
  }, []);

  const visibleSimulations = selectedCategory === "All experiments"
    ? simulations
    : simulations.filter((simulation) => simulation.category === selectedCategory);

  return (
    <main className="page content-page">
      <div className="page-width">
        <header className="content-hero">
          <span className="eyebrow">Simulation library</span>
          <h1>Experiments for curious minds.</h1>
          <p>Interactive models organized by subject. Each one pairs visual behavior with measurable quantities and the mathematics beneath it.</p>
        </header>
        <div className="filter-row" aria-label="Simulation categories">
          {categories.map((category) => (
            <button
              key={category.label}
              className={selectedCategory === category.label ? "is-active" : undefined}
              type="button"
              onClick={() => setSelectedCategory(category.label)}
            >
              {category.label} <span>{category.count}</span>
            </button>
          ))}
        </div>
        <div className="library-list">
          {visibleSimulations.map((simulation, index) => (
            <article key={simulation.id} className="library-row">
              <span className="library-index">{String(index + 1).padStart(2, "0")}</span>
              <div className={`library-icon library-icon--${simulation.id}`} aria-hidden="true"><i /></div>
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
