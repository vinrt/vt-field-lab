import { pendulumPeriod, pendulumStateAtTime, totalPendulumEnergy } from "./pendulumModel";
import type { PendulumParameters, PendulumState } from "./pendulumTypes";

interface PendulumEnergyChartProps {
  parameters: PendulumParameters;
  state: PendulumState;
}

export function PendulumEnergyChart({ parameters, state }: PendulumEnergyChartProps) {
  const period = pendulumPeriod(parameters);
  const total = totalPendulumEnergy(parameters);
  const points = Array.from({ length: 81 }, (_, index) => {
    const time = period * index / 80;
    return { time, state: pendulumStateAtTime(parameters, time) };
  });
  const x = (time: number) => 45 + (time / period) * 470;
  const y = (energy: number) => 170 - (total > 0 ? energy / total : 0) * 125;
  const pathFor = (key: "kineticEnergy" | "potentialEnergy") => points.map(({ time, state: sample }, index) => `${index ? "L" : "M"}${x(time).toFixed(2)},${y(sample[key]).toFixed(2)}`).join(" ");
  const cursorTime = state.time % period;

  return (
    <section className="chart-card" aria-labelledby="pendulum-energy-title">
      <div className="section-heading section-heading--compact">
        <div><span className="eyebrow">Energy graph</span><h2 id="pendulum-energy-title">Energy changes form</h2></div>
        <div className="chart-legend"><span><i className="legend-line legend-line--mint" />Kinetic</span><span><i className="legend-line legend-line--amber" />Potential</span></div>
      </div>
      <svg className="velocity-chart" viewBox="0 0 550 205" role="img" aria-label="Kinetic and potential energy over one pendulum period">
        {[45, 107.5, 170].map((lineY) => <line key={lineY} className="chart-grid" x1="45" y1={lineY} x2="515" y2={lineY} />)}
        <line className="chart-axis" x1="45" y1="170" x2="515" y2="170" />
        <text className="chart-label" x="45" y="193">0</text><text className="chart-label" x="500" y="193">T</text>
        <text className="chart-label" x="8" y="49">100%</text><text className="chart-label" x="18" y="174">0%</text>
        <path className="chart-line chart-line--mint" d={pathFor("kineticEnergy")} />
        <path className="chart-line chart-line--amber" d={pathFor("potentialEnergy")} />
        <line className="chart-cursor" x1={x(cursorTime)} y1="40" x2={x(cursorTime)} y2="170" />
      </svg>
    </section>
  );
}
