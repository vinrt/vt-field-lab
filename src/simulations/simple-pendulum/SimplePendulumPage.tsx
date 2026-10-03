import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ParameterControl } from "../../components/controls/ParameterControl";
import { MeasurementCard } from "../../components/simulation/MeasurementCard";
import { PauseIcon, PlayIcon, ResetIcon } from "../../components/ui/Icons";
import { pendulumPeriod, totalPendulumEnergy } from "./pendulumModel";
import { DEFAULT_PENDULUM_PARAMETERS, PENDULUM_GRAVITY_PRESETS } from "./pendulumPresets";
import type { PendulumParameters } from "./pendulumTypes";
import { PendulumEnergyChart } from "./PendulumEnergyChart";
import { PendulumSvg } from "./PendulumSvg";
import { usePendulumSimulation } from "./usePendulumSimulation";

export function SimplePendulumPage() {
  const [parameters, setParameters] = useState<PendulumParameters>(DEFAULT_PENDULUM_PARAMETERS);
  const simulation = usePendulumSimulation(parameters);

  useEffect(() => { document.title = "Simple Pendulum — VT Field Lab"; }, []);

  const summary = useMemo(() => ({
    period: pendulumPeriod(parameters),
    frequency: 1 / pendulumPeriod(parameters),
    energy: totalPendulumEnergy(parameters),
  }), [parameters]);

  const updateParameter = <K extends keyof PendulumParameters>(key: K, value: PendulumParameters[K]) => {
    setParameters((current) => ({ ...current, [key]: value }));
  };

  const selectedPreset = PENDULUM_GRAVITY_PRESETS.find((preset) => Math.abs(preset.gravity - parameters.gravity) < 0.005);

  return (
    <main className="page page--simulation">
      <div className="page-width">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/simulations">Simulations</Link><span aria-hidden="true">/</span><span>Mechanics</span></nav>
        <header className="simulation-header">
          <div><div className="eyebrow-row"><span className="eyebrow">Experiment 002</span><span className="difficulty-pill">Beginner</span></div><h1>Simple pendulum</h1><p>Change length, gravity, and release angle to see what controls the rhythm of a pendulum and how its energy moves.</p></div>
          <dl className="experiment-meta"><div><dt>Model</dt><dd>Small-angle</dd></div><div><dt>Dimensions</dt><dd>2D</dd></div><div><dt>Units</dt><dd>SI</dd></div></dl>
        </header>

        <section className="lab-workspace" aria-label="Simple pendulum laboratory">
          <div className="simulation-stage">
            <PendulumSvg parameters={parameters} phase={simulation.phase} state={simulation.state} />
            <div className="measurement-strip" aria-label="Live measurements">
              <MeasurementCard label="Time" value={simulation.state.time} unit="s" accent />
              <MeasurementCard label="Angle" value={simulation.state.angleDeg} unit="°" />
              <MeasurementCard label="Angular velocity" value={simulation.state.angularVelocity} unit="rad/s" />
              <MeasurementCard label="Bob speed" value={Math.abs(simulation.state.tangentialSpeed)} unit="m/s" />
              <MeasurementCard label="Kinetic energy" value={simulation.state.kineticEnergy} unit="J" />
              <MeasurementCard label="Potential energy" value={simulation.state.potentialEnergy} unit="J" />
            </div>
          </div>

          <aside className="control-panel" aria-labelledby="pendulum-controls-title">
            <div className="control-panel-heading"><div><span className="eyebrow">Input parameters</span><h2 id="pendulum-controls-title">Controls</h2></div><span className="control-readout">{selectedPreset?.label ?? "Custom"}</span></div>
            <div className="preset-group"><span>Gravity presets</span><div className="segmented-control">{PENDULUM_GRAVITY_PRESETS.map((preset) => <button key={preset.id} type="button" className={selectedPreset?.id === preset.id ? "is-active" : ""} aria-pressed={selectedPreset?.id === preset.id} onClick={() => updateParameter("gravity", preset.gravity)}><strong>{preset.label}</strong><small>{preset.note}</small></button>)}</div></div>
            <ParameterControl id="pendulum-length" label="Pendulum length" symbol="L" value={parameters.length} min={0.3} max={3} step={0.1} unit="m" onChange={(value) => updateParameter("length", value)} />
            <ParameterControl id="pendulum-angle" label="Release angle" symbol="θ₀" value={parameters.initialAngleDeg} min={3} max={25} step={1} unit="°" onChange={(value) => updateParameter("initialAngleDeg", value)} />
            <ParameterControl id="pendulum-gravity" label="Gravity" symbol="g" value={parameters.gravity} min={1} max={25} step={0.01} unit="m/s²" onChange={(value) => updateParameter("gravity", value)} />
            <div className="projected-results" aria-label="Predicted results"><span>Predicted outcome</span><dl><div><dt>Period</dt><dd>{summary.period.toFixed(2)} s</dd></div><div><dt>Frequency</dt><dd>{summary.frequency.toFixed(2)} Hz</dd></div><div><dt>Total energy</dt><dd>{summary.energy.toFixed(2)} J</dd></div></dl></div>
            <div className="transport-controls">{simulation.phase === "running" ? <button type="button" className="button button--primary" onClick={simulation.pause}><PauseIcon /> Pause</button> : <button type="button" className="button button--primary" onClick={simulation.run}><PlayIcon /> {simulation.phase === "paused" ? "Resume" : "Run"}</button>}<button type="button" className="button button--secondary" onClick={simulation.reset}><ResetIcon /> Reset</button></div>
          </aside>
        </section>

        <div className="analysis-grid">
          <PendulumEnergyChart parameters={parameters} state={simulation.state} />
          <section className="equation-card" aria-labelledby="pendulum-equations-title"><div className="section-heading section-heading--compact"><div><span className="eyebrow">The model</span><h2 id="pendulum-equations-title">Governing equations</h2></div><span className="assumption-chip">θ₀ ≤ 25°</span></div><div className="equation-grid"><div><span>Angular motion</span><p>θ(t) = θ₀ cos(ωt)</p></div><div><span>Angular frequency</span><p>ω = √(g / L)</p></div><div><span>Period</span><p>T = 2π√(L / g)</p></div><div><span>Model energy</span><p>E = ½mgLθ₀²</p></div></div></section>
        </div>

        <section className="explanation-section"><div className="section-heading"><div><span className="eyebrow">What to notice</span><h2>Length and gravity set the rhythm</h2></div></div><div className="explanation-grid"><article><span>01</span><h3>A longer pendulum moves more slowly</h3><p>Increasing length increases the period. Four times the length produces twice the period in this model.</p></article><article><span>02</span><h3>Mass does not set the period</h3><p>The bob is fixed at 1 kg for the energy display, but mass cancels from the equation of motion.</p></article><article><span>03</span><h3>Energy trades places</h3><p>Potential energy is greatest at each turning point. Kinetic energy peaks as the bob passes through equilibrium.</p></article></div><p className="assumptions-note"><strong>Assumptions:</strong> point-like 1 kg bob, massless rigid rod, no friction or air resistance, uniform gravity, and a release angle no larger than 25°. The analytical model uses sin(θ) ≈ θ, so larger real pendulums have a slightly longer period.</p></section>
        <section className="learn-further"><div><span className="eyebrow">Continue learning</span><h2>Connect oscillation to mechanics</h2><p>Explore the mechanics reading list and compare energy, forces, and periodic motion.</p></div><Link className="text-link" to="/books">Explore the bookshelf <span aria-hidden="true">→</span></Link></section>
      </div>
    </main>
  );
}
