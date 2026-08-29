import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../../components/ui/Icons";

const conceptAreas = [
  { title: "Mechanics", description: "Motion, forces, energy, momentum, and the mathematical language used to describe change.", status: "Growing", route: "/learn" },
  { title: "Waves and optics", description: "Oscillation, interference, resonance, and the behavior of light and sound.", status: "Planned", route: "/simulations/library?category=Waves" },
  { title: "Quantum physics", description: "States, amplitudes, probability, measurement, phase, and entanglement.", status: "Available", route: "/concepts/quantum-physics" },
  { title: "Mathematics", description: "Vectors, calculus, complex numbers, probability, and linear algebra for physical systems.", status: "Planned", route: "/simulations/library?category=Mathematics" },
];

export function ConceptsPage() {
  useEffect(() => { document.title = "Concepts — VT Field Lab"; }, []);
  return (
    <main className="page concept-index-page">
      <div className="page-width">
        <header className="concept-hero"><span>Concept library</span><h1>Build the idea before using the equation.</h1><p>Concise learning notes connect visual intuition, mathematical form, related experiments, and deeper reading.</p></header>
        <section className="concept-area-grid" aria-label="Concept areas">
          {conceptAreas.map((area, index) => <Link key={area.title} to={area.route} className={area.status === "Planned" ? "is-planned" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><small>{area.status}</small><h2>{area.title}</h2><p>{area.description}</p><strong>Explore <ArrowRightIcon /></strong></Link>)}
        </section>
      </div>
    </main>
  );
}
