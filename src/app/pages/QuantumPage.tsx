import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../../components/ui/Icons";
import { quantumLearningPhases } from "../../content/quantum";

export function QuantumPage() {
  useEffect(() => { document.title = "Quantum learning — VT Field Lab"; }, []);
  return (
    <main className="page quantum-hub-page">
      <div className="page-width">
        <header className="quantum-hub-hero"><span>Quantum learning area</span><h1>From amplitudes to circuits, one idea at a time.</h1><p>Start with the physical meaning of a state. Then use qubits, gates, measurement, and entanglement to build the language of quantum computing.</p><div><Link to="/concepts/quantum-physics">Start with the basics <ArrowRightIcon /></Link><Link to="/simulations/qubit-bloch-sphere">Open Qubit Explorer</Link></div></header>
        <section className="quantum-hub-grid">
          <div className="quantum-sequence" aria-label="Quantum learning sequence">
            <div className="dashboard-section-heading"><h2>Learning sequence</h2><span>Foundations first</span></div>
            <ol>{quantumLearningPhases.map((phase) => <li key={phase.number} className={phase.status === "Available" || phase.status === "In progress" ? "is-active" : undefined}><b>{phase.number}</b><div><small>Phase {phase.number}</small><h3>{phase.title}</h3><p>{phase.detail}</p></div><span>{phase.status}</span></li>)}</ol>
          </div>
          <aside className="quantum-now-panel"><span>Available now</span><div className="quantum-now-orbit" aria-hidden="true"><i /><b /></div><h2>Qubit Explorer</h2><p>Connect the state equation, Bloch geometry, gates, and measurement probabilities in one focused lab.</p><Link to="/simulations/qubit-bloch-sphere">Open experiment <ArrowRightIcon /></Link></aside>
        </section>
      </div>
    </main>
  );
}
