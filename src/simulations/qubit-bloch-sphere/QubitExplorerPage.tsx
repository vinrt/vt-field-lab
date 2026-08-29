import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookIcon, ResetIcon } from "../../components/ui/Icons";
import { QubitBlochSphere } from "./QubitBlochSphere";
import {
  applyGate,
  blochVector,
  measure,
  probabilities,
  stateFromAngles,
  type Complex,
  type QuantumGateId,
  type QubitState,
} from "./qubitModel";

const radiansToDegrees = (radians: number) => radians * 180 / Math.PI;
const degreesToRadians = (degrees: number) => degrees * Math.PI / 180;

function formatNumber(value: number): string {
  if (Math.abs(value) < 0.005) return "0";
  if (Math.abs(value - 1) < 0.005) return "1";
  if (Math.abs(value + 1) < 0.005) return "−1";
  return value.toFixed(2).replace("-", "−");
}

function formatComplex(value: Complex): string {
  if (Math.abs(value.im) < 0.005) return formatNumber(value.re);
  if (Math.abs(value.re) < 0.005) return `${formatNumber(value.im)}i`;
  return `${formatNumber(value.re)} ${value.im >= 0 ? "+" : "−"} ${formatNumber(Math.abs(value.im))}i`;
}

function anglesForState(state: QubitState) {
  const vector = blochVector(state);
  return {
    thetaDeg: radiansToDegrees(Math.acos(Math.min(1, Math.max(-1, vector.z)))),
    phiDeg: (radiansToDegrees(Math.atan2(vector.y, vector.x)) + 360) % 360,
  };
}

export function QubitExplorerPage() {
  const [thetaDeg, setThetaDeg] = useState(60);
  const [phiDeg, setPhiDeg] = useState(35);
  const [state, setState] = useState(() => stateFromAngles(degreesToRadians(60), degreesToRadians(35)));
  const [measurement, setMeasurement] = useState<string>("Not measured");

  useEffect(() => {
    document.title = "Qubit Explorer — VT Field Lab";
  }, []);

  const vector = useMemo(() => blochVector(state), [state]);
  const stateProbabilities = useMemo(() => probabilities(state), [state]);

  const prepareFromAngles = (nextTheta: number, nextPhi: number) => {
    setThetaDeg(nextTheta);
    setPhiDeg(nextPhi);
    setState(stateFromAngles(degreesToRadians(nextTheta), degreesToRadians(nextPhi)));
    setMeasurement("Not measured");
  };

  const runGate = (gate: QuantumGateId) => {
    const nextState = applyGate(state, gate);
    const angles = anglesForState(nextState);
    setState(nextState);
    setThetaDeg(angles.thetaDeg);
    setPhiDeg(angles.phiDeg);
    setMeasurement(`${gate} gate applied`);
  };

  const reset = () => prepareFromAngles(60, 35);

  const performMeasurement = () => {
    const result = measure(state, Math.random());
    const angles = anglesForState(result.state);
    setState(result.state);
    setThetaDeg(angles.thetaDeg);
    setPhiDeg(angles.phiDeg);
    setMeasurement(`Measured |${result.outcome}⟩ and collapsed to that basis state`);
  };

  return (
    <main className="page quantum-lab-page">
      <div className="quantum-page-width">
        <nav className="breadcrumbs quantum-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/simulations">Simulations</Link><span>/</span>
          <Link to="/quantum">Quantum</Link><span>/</span><span>Qubit Explorer</span>
        </nav>

        <header className="quantum-lab-header">
          <div>
            <span className="quantum-kicker">Quantum lab · Experiment 003</span>
            <h1>Qubit Explorer</h1>
            <p>Prepare a single-qubit state, rotate it with gates, and connect its state vector to measurement probabilities.</p>
          </div>
          <div className="quantum-state-equation" aria-live="polite">
            <span>Current state</span>
            <strong>|ψ⟩ = ({formatComplex(state.alpha)})|0⟩ + ({formatComplex(state.beta)})|1⟩</strong>
          </div>
        </header>

        <section className="qubit-workspace" aria-label="Interactive qubit laboratory">
          <div className="bloch-panel">
            <div className="bloch-panel-heading">
              <div><span>State geometry</span><h2>Bloch sphere</h2></div>
              <span className="live-indicator"><i /> Live state</span>
            </div>
            <QubitBlochSphere vector={vector} />
            <div className="bloch-coordinates" aria-label="Bloch vector coordinates">
              <span>x <strong>{formatNumber(vector.x)}</strong></span>
              <span>y <strong>{formatNumber(vector.y)}</strong></span>
              <span>z <strong>{formatNumber(vector.z)}</strong></span>
            </div>
          </div>

          <aside className="qubit-controls" aria-labelledby="qubit-controls-title">
            <div className="qubit-controls-heading">
              <div><span>Prepare and transform</span><h2 id="qubit-controls-title">Controls</h2></div>
              <button type="button" className="qubit-reset" onClick={reset}><ResetIcon /> Reset</button>
            </div>

            <label className="quantum-range-control" htmlFor="theta-control">
              <span>Polar angle <strong>θ = {Math.round(thetaDeg)}°</strong></span>
              <input
                id="theta-control"
                type="range"
                min="0"
                max="180"
                step="1"
                value={thetaDeg}
                onChange={(event) => prepareFromAngles(Number(event.target.value), phiDeg)}
              />
              <input
                aria-label="Polar angle in degrees"
                type="number"
                min="0"
                max="180"
                step="1"
                value={Math.round(thetaDeg)}
                onChange={(event) => prepareFromAngles(Math.min(180, Math.max(0, Number(event.target.value))), phiDeg)}
              />
            </label>

            <label className="quantum-range-control" htmlFor="phi-control">
              <span>Azimuthal angle <strong>φ = {Math.round(phiDeg)}°</strong></span>
              <input
                id="phi-control"
                type="range"
                min="0"
                max="360"
                step="1"
                value={phiDeg}
                onChange={(event) => prepareFromAngles(thetaDeg, Number(event.target.value))}
              />
              <input
                aria-label="Azimuthal angle in degrees"
                type="number"
                min="0"
                max="360"
                step="1"
                value={Math.round(phiDeg)}
                onChange={(event) => prepareFromAngles(thetaDeg, Math.min(360, Math.max(0, Number(event.target.value))))}
              />
            </label>

            <div className="gate-control-group">
              <span>Apply a gate</span>
              <div>
                {(["X", "Z", "H"] as QuantumGateId[]).map((gate) => (
                  <button key={gate} type="button" onClick={() => runGate(gate)}>
                    <strong>{gate}</strong><small>{gate === "X" ? "Bit flip" : gate === "Z" ? "Phase flip" : "Superpose"}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="probability-display" aria-label="Measurement probabilities">
              <div><span>P(|0⟩)</span><strong>{(stateProbabilities.zero * 100).toFixed(1)}%</strong></div>
              <div className="probability-track"><i style={{ width: `${stateProbabilities.zero * 100}%` }} /></div>
              <div><span>P(|1⟩)</span><strong>{(stateProbabilities.one * 100).toFixed(1)}%</strong></div>
              <div className="probability-track probability-track--one"><i style={{ width: `${stateProbabilities.one * 100}%` }} /></div>
            </div>

            <button type="button" className="measure-button" onClick={performMeasurement}>Measure in the computational basis</button>
            <p className="measurement-result" aria-live="polite">{measurement}</p>
          </aside>
        </section>

        <section className="quantum-lab-notes">
          <article><span>01</span><h2>Amplitude is not probability</h2><p>The state stores complex amplitudes. Measurement probabilities are their squared magnitudes, and always sum to one.</p></article>
          <article><span>02</span><h2>Phase changes interference</h2><p>Changing φ may leave P(0) and P(1) unchanged until another gate converts relative phase into a measurable difference.</p></article>
          <article><span>03</span><h2>Measurement changes the state</h2><p>This model performs an ideal computational-basis measurement and then displays the resulting basis state.</p></article>
        </section>

        <aside className="qubit-reading-link"><BookIcon /><div><span>Continue learning</span><strong>Pair this lab with the Quantum Physics collection.</strong></div><Link to="/books">Browse books →</Link></aside>
      </div>
    </main>
  );
}
