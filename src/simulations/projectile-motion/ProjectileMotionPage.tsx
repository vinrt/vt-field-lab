import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ParameterControl } from "../../components/controls/ParameterControl";
import { ProjectileEquations } from "../../components/equations/ProjectileEquations";
import { MeasurementCard } from "../../components/simulation/MeasurementCard";
import { PauseIcon, PlayIcon, ResetIcon } from "../../components/ui/Icons";
import { useProjectileSimulation } from "../../hooks/useProjectileSimulation";
import { horizontalRange, maximumHeight, timeOfFlight } from "./projectileModel";
import {
  DEFAULT_PROJECTILE_PARAMETERS,
  GRAVITY_PRESETS,
} from "./projectilePresets";
import { ProjectileCanvas } from "./ProjectileCanvas";
import type { ProjectileParameters } from "./projectileTypes";
import { VelocityChart } from "./VelocityChart";

export function ProjectileMotionPage() {
  const [parameters, setParameters] = useState<ProjectileParameters>(
    DEFAULT_PROJECTILE_PARAMETERS,
  );
  const simulation = useProjectileSimulation(parameters);

  useEffect(() => {
    document.title = "Projectile Motion — VT Field Lab";
  }, []);

  const summary = useMemo(
    () => ({
      flightTime: timeOfFlight(parameters),
      range: horizontalRange(parameters),
      peak: maximumHeight(parameters),
    }),
    [parameters],
  );

  const updateParameter = <K extends keyof ProjectileParameters>(
    key: K,
    value: ProjectileParameters[K],
  ) => setParameters((current) => ({ ...current, [key]: value }));

  const selectedPreset = GRAVITY_PRESETS.find(
    (preset) => Math.abs(preset.gravity - parameters.gravity) < 0.005,
  );

  return (
    <main className="page page--simulation">
      <div className="page-width">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/simulations">Simulations</Link>
          <span aria-hidden="true">/</span>
          <span>Mechanics</span>
        </nav>

        <header className="simulation-header">
          <div>
            <div className="eyebrow-row">
              <span className="eyebrow">Experiment 001</span>
              <span className="difficulty-pill">Beginner</span>
            </div>
            <h1>Projectile motion</h1>
            <p>
              Launch an object, track its velocity, and see exactly how gravity bends a straight-line motion into a parabola.
            </p>
          </div>
          <dl className="experiment-meta">
            <div><dt>Model</dt><dd>Analytical</dd></div>
            <div><dt>Dimensions</dt><dd>2D</dd></div>
            <div><dt>Units</dt><dd>SI</dd></div>
          </dl>
        </header>

        <section className="lab-workspace" aria-label="Projectile motion laboratory">
          <div className="simulation-stage">
            <ProjectileCanvas
              parameters={parameters}
              phase={simulation.phase}
              timeRef={simulation.timeRef}
              measuredState={simulation.state}
            />

            <div className="measurement-strip" aria-label="Live measurements">
              <MeasurementCard label="Time" value={simulation.state.time} unit="s" accent />
              <MeasurementCard label="Position x" value={simulation.state.x} unit="m" />
              <MeasurementCard label="Position y" value={simulation.state.y} unit="m" />
              <MeasurementCard label="Velocity x" value={simulation.state.vx} unit="m/s" />
              <MeasurementCard label="Velocity y" value={simulation.state.vy} unit="m/s" />
              <MeasurementCard label="Speed" value={simulation.state.speed} unit="m/s" />
            </div>
          </div>

          <aside className="control-panel" aria-labelledby="controls-title">
            <div className="control-panel-heading">
              <div>
                <span className="eyebrow">Input parameters</span>
                <h2 id="controls-title">Controls</h2>
              </div>
              <span className="control-readout">{selectedPreset?.label ?? "Custom"}</span>
            </div>

            <div className="preset-group">
              <span>Gravity presets</span>
              <div className="segmented-control">
                {GRAVITY_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={selectedPreset?.id === preset.id ? "is-active" : ""}
                    aria-pressed={selectedPreset?.id === preset.id}
                    onClick={() => updateParameter("gravity", preset.gravity)}
                  >
                    <strong>{preset.label}</strong>
                    <small>{preset.note}</small>
                  </button>
                ))}
              </div>
            </div>

            <ParameterControl
              id="initial-speed"
              label="Initial speed"
              symbol="v₀"
              value={parameters.initialSpeed}
              min={5}
              max={80}
              step={1}
              unit="m/s"
              onChange={(value) => updateParameter("initialSpeed", value)}
            />
            <ParameterControl
              id="launch-angle"
              label="Launch angle"
              symbol="θ"
              value={parameters.launchAngleDeg}
              min={5}
              max={85}
              step={1}
              unit="°"
              onChange={(value) => updateParameter("launchAngleDeg", value)}
            />
            <ParameterControl
              id="gravity"
              label="Gravity"
              symbol="g"
              value={parameters.gravity}
              min={1}
              max={20}
              step={0.01}
              unit="m/s²"
              onChange={(value) => updateParameter("gravity", value)}
            />

            <div className="projected-results" aria-label="Predicted results">
              <span>Predicted outcome</span>
              <dl>
                <div><dt>Flight time</dt><dd>{summary.flightTime.toFixed(2)} s</dd></div>
                <div><dt>Range</dt><dd>{summary.range.toFixed(1)} m</dd></div>
                <div><dt>Peak height</dt><dd>{summary.peak.toFixed(1)} m</dd></div>
              </dl>
            </div>

            <div className="transport-controls">
              {simulation.phase === "running" ? (
                <button type="button" className="button button--primary" onClick={simulation.pause}>
                  <PauseIcon /> Pause
                </button>
              ) : (
                <button type="button" className="button button--primary" onClick={simulation.run}>
                  <PlayIcon /> {simulation.phase === "paused" ? "Resume" : "Run"}
                </button>
              )}
              <button type="button" className="button button--secondary" onClick={simulation.reset}>
                <ResetIcon /> Reset
              </button>
            </div>
          </aside>
        </section>

        <div className="analysis-grid">
          <VelocityChart parameters={parameters} state={simulation.state} />
          <ProjectileEquations />
        </div>

        <section className="explanation-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">What to notice</span>
              <h2>One motion, two independent directions</h2>
            </div>
          </div>
          <div className="explanation-grid">
            <article>
              <span>01</span>
              <h3>Horizontal motion stays steady</h3>
              <p>With no air resistance, there is no horizontal force. The horizontal velocity therefore remains constant from launch to landing.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Gravity changes vertical velocity</h3>
              <p>Gravity subtracts the same amount from vertical velocity every second. At the peak, vᵧ is exactly zero for an instant.</p>
            </article>
            <article>
              <span>03</span>
              <h3>The path becomes a parabola</h3>
              <p>Horizontal position grows linearly while vertical position changes quadratically. Combining them produces the familiar arc.</p>
            </article>
          </div>
          <p className="assumptions-note">
            <strong>Assumptions:</strong> uniform gravitational field, flat ground, point-like projectile, zero launch height, and no aerodynamic drag. All calculations use SI units.
          </p>
        </section>

        <section className="learn-further">
          <div>
            <span className="eyebrow">Continue learning</span>
            <h2>Build a firmer intuition for mechanics</h2>
            <p>Connect this experiment to a concise, carefully chosen reading list.</p>
          </div>
          <Link className="text-link" to="/books">Explore the bookshelf <span aria-hidden="true">→</span></Link>
        </section>
      </div>
    </main>
  );
}
