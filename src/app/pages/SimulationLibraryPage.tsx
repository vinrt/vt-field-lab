import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRightIcon } from "../../components/ui/Icons";
import { simulations } from "../../simulations/registry";

export function SimulationLibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category") ?? "All experiments";
  const [selectedCategory, setSelectedCategory] = useState(requestedCategory);

  useEffect(() => {
    document.title = "Simulation library — VT Field Lab";
  }, []);

  const categories = useMemo(() => {
    const counts = simulations.reduce<Record<string, number>>((accumulator, simulation) => {
      accumulator[simulation.category] = (accumulator[simulation.category] ?? 0) + 1;
      return accumulator;
    }, {});
    return [{ label: "All experiments", count: simulations.length }, ...Object.entries(counts).map(([label, count]) => ({ label, count }))];
  }, []);

  useEffect(() => {
    setSelectedCategory(categories.some((category) => category.label === requestedCategory) ? requestedCategory : "All experiments");
  }, [categories, requestedCategory]);

  const chooseCategory = (category: string) => {
    setSelectedCategory(category);
    setSearchParams(category === "All experiments" ? {} : { category });
  };

  const visibleSimulations = selectedCategory === "All experiments" ? simulations : simulations.filter((simulation) => simulation.category === selectedCategory);

  return (
    <main className="page content-page">
      <div className="page-width">
        <header className="content-hero library-content-hero">
          <span className="eyebrow">Simulation library</span>
          <h1>Experiments for curious minds.</h1>
          <p>Interactive models organized by subject. Available labs open immediately; planned experiments show where the library is heading.</p>
        </header>
        <div className="filter-row" aria-label="Simulation categories">
          {categories.map((category) => (
            <button key={category.label} className={selectedCategory === category.label ? "is-active" : undefined} type="button" onClick={() => chooseCategory(category.label)}>
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
                <h2>{simulation.title}</h2><p>{simulation.description}</p>
                <ul>{simulation.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
              {simulation.status === "available" ? <Link className="button button--secondary" to={simulation.route}>Open <ArrowRightIcon /></Link> : <span className="coming-soon">Coming soon</span>}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
