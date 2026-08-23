import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PauseIcon, PlayIcon, ResetIcon } from "../../components/ui/Icons";
import { planets } from "./solarSystemData";
import { orbitalProgress } from "./solarSystemModel";
import { SolarSystemCanvas } from "./SolarSystemCanvas";

type SimulationPhase = "running" | "paused";

const speedOptions = [
  { label: "Slow", daysPerSecond: 8 },
  { label: "Normal", daysPerSecond: 32 },
  { label: "Fast", daysPerSecond: 120 },
];

export function SolarSystemMotionPage() {
  const [phase, setPhase] = useState<SimulationPhase>("running");
  const [speed, setSpeed] = useState(speedOptions[1].daysPerSecond);
  const [day, setDay] = useState(0);
  const [selectedPlanetId, setSelectedPlanetId] = useState("earth");

  useEffect(() => {
    document.title = "Solar System Motion — VT Field Lab";
  }, []);

  useEffect(() => {
    if (phase !== "running") return;

    let frame = 0;
    let previousTime = performance.now();

    const animate = (time: number) => {
      const elapsedSeconds = Math.min((time - previousTime) / 1000, 0.08);
      previousTime = time;
      setDay((current) => current + elapsedSeconds * speed);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase, speed]);

  const selectedPlanet = useMemo(
    () => planets.find((planet) => planet.id === selectedPlanetId) ?? planets[2],
    [selectedPlanetId],
  );

  const progress = orbitalProgress(selectedPlanet, day);

  return (
    <main className="page solar-system-page">
      <section className="solar-system-shell" aria-label="Solar System motion laboratory">
        <div className="solar-system-topbar">
          <Link to="/simulations">Simulations</Link>
          <span>Astronomy</span>
          <strong>Solar System motion</strong>
        </div>

        <div className="solar-system-stage">
          <SolarSystemCanvas
            day={day}
            selectedPlanetId={selectedPlanet.id}
            onSelectPlanet={setSelectedPlanetId}
          />

          <section className="solar-system-overlay solar-system-overlay--intro">
            <span>Interactive astronomy</span>
            <h1>Solar System motion</h1>
            <p>Watch simplified orbital paths, compare planetary years, and select a planet to inspect its motion.</p>
          </section>

          <aside className="solar-system-overlay solar-system-panel" aria-label="Selected planet">
            <span>Selected planet</span>
            <h2>{selectedPlanet.name}</h2>
            <p>{selectedPlanet.note}</p>
            <dl>
              <div><dt>Order</dt><dd>{selectedPlanet.order}</dd></div>
              <div><dt>Distance</dt><dd>{selectedPlanet.distanceAu.toFixed(2)} AU</dd></div>
              <div><dt>Orbital period</dt><dd>{Math.round(selectedPlanet.orbitalPeriodDays)} days</dd></div>
              <div><dt>Orbit progress</dt><dd>{Math.round(progress * 100)}%</dd></div>
            </dl>
          </aside>

          <div className="solar-system-controls" aria-label="Simulation controls">
            <button
              type="button"
              className="solar-control-button"
              onClick={() => setPhase((current) => (current === "running" ? "paused" : "running"))}
            >
              {phase === "running" ? <PauseIcon /> : <PlayIcon />}
              {phase === "running" ? "Pause" : "Run"}
            </button>
            <button
              type="button"
              className="solar-control-button"
              onClick={() => {
                setDay(0);
                setSelectedPlanetId("earth");
              }}
            >
              <ResetIcon /> Reset
            </button>
            <div className="solar-speed-control" role="group" aria-label="Time speed">
              {speedOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  className={speed === option.daysPerSecond ? "is-active" : undefined}
                  onClick={() => setSpeed(option.daysPerSecond)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <span className="solar-day-readout">Day {Math.round(day).toLocaleString()}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
