import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BookIcon } from "../../components/ui/Icons";
import { quantumConcepts } from "../../content/quantum";

export function QuantumPhysicsPage() {
  useEffect(() => { document.title = "Quantum Physics Basics — VT Field Lab"; }, []);
  return (
    <main className="page quantum-concepts-page">
      <div className="page-width">
        <nav className="breadcrumbs"><Link to="/concepts">Concepts</Link><span>/</span><span>Quantum physics</span></nav>
        <header className="quantum-concepts-hero">
          <div><span>Start here · Quantum foundations</span><h1>Quantum Physics Basics</h1><p>Before qubits and quantum computers, understand states, amplitudes, superposition, measurement, and phase.</p></div>
          <div className="quantum-hero-equation"><i>State</i><strong>|ψ⟩ = α|0⟩ + β|1⟩</strong><small>|α|² + |β|² = 1</small></div>
        </header>
        <section className="quantum-concept-grid" aria-label="Quantum physics concepts">
          {quantumConcepts.map((concept, index) => (
            <article id={concept.id} key={concept.id} className={`quantum-concept-card quantum-concept-card--${concept.accent}`}>
              <div><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true" /></div>
              <h2>{concept.title}</h2><p className="quantum-concept-summary">{concept.shortDescription}</p><p>{concept.explanation}</p>
              <code>{concept.equation}</code>
              <footer>
                {concept.relatedSimulationId && <Link to="/simulations/qubit-bloch-sphere">Open visual <ArrowRightIcon /></Link>}
                <Link to="/books"><BookIcon /> {concept.relatedBookTitles[0]}</Link>
              </footer>
            </article>
          ))}
        </section>
        <section className="quantum-next-step"><div><span>Ready to interact?</span><h2>Place a state on the Bloch sphere.</h2><p>Change its angles, apply X, Z, and H gates, then measure it.</p></div><Link to="/simulations/qubit-bloch-sphere">Open Qubit Explorer <ArrowRightIcon /></Link></section>
      </div>
    </main>
  );
}
