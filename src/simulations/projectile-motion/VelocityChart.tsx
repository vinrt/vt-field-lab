import { initialVelocity, timeOfFlight } from "./projectileModel";
import type { ProjectileParameters, ProjectileState } from "./projectileTypes";

interface VelocityChartProps {
  parameters: ProjectileParameters;
  state: ProjectileState;
}

export function VelocityChart({ parameters, state }: VelocityChartProps) {
  const width = 720;
  const height = 250;
  const padding = { left: 52, right: 24, top: 24, bottom: 38 };
  const flightTime = Math.max(timeOfFlight(parameters), 0.1);
  const initial = initialVelocity(parameters);
  const finalVy = initial.vy - parameters.gravity * flightTime;
  const maxVelocity = Math.max(Math.abs(initial.vx), Math.abs(initial.vy), Math.abs(finalVy), 1) * 1.18;

  const x = (time: number) =>
    padding.left + (time / flightTime) * (width - padding.left - padding.right);
  const y = (velocity: number) =>
    padding.top +
    ((maxVelocity - velocity) / (2 * maxVelocity)) *
      (height - padding.top - padding.bottom);

  const ticks = [-maxVelocity, 0, maxVelocity];
  const safeTime = Math.min(state.time, flightTime);

  return (
    <section className="chart-card" aria-labelledby="velocity-chart-title">
      <div className="section-heading section-heading--compact">
        <div>
          <span className="eyebrow">Live graph</span>
          <h2 id="velocity-chart-title">Velocity over time</h2>
        </div>
        <div className="chart-legend" aria-label="Chart legend">
          <span><i className="legend-line legend-line--mint" />v<sub>x</sub></span>
          <span><i className="legend-line legend-line--amber" />v<sub>y</sub></span>
        </div>
      </div>
      <svg
        className="velocity-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Horizontal velocity remains constant while vertical velocity decreases linearly under gravity."
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line className="chart-grid" x1={padding.left} y1={y(tick)} x2={width - padding.right} y2={y(tick)} />
            <text className="chart-label" x={padding.left - 10} y={y(tick) + 4} textAnchor="end">
              {tick.toFixed(0)}
            </text>
          </g>
        ))}
        {[0, flightTime / 2, flightTime].map((tick) => (
          <g key={tick}>
            <line className="chart-grid" x1={x(tick)} y1={padding.top} x2={x(tick)} y2={height - padding.bottom} />
            <text className="chart-label" x={x(tick)} y={height - 13} textAnchor="middle">
              {tick.toFixed(1)} s
            </text>
          </g>
        ))}
        <line className="chart-axis" x1={padding.left} y1={y(0)} x2={width - padding.right} y2={y(0)} />
        <path className="chart-line chart-line--mint" d={`M ${x(0)} ${y(initial.vx)} L ${x(flightTime)} ${y(initial.vx)}`} />
        <path className="chart-line chart-line--amber" d={`M ${x(0)} ${y(initial.vy)} L ${x(flightTime)} ${y(finalVy)}`} />
        <line className="chart-cursor" x1={x(safeTime)} y1={padding.top} x2={x(safeTime)} y2={height - padding.bottom} />
        <circle className="chart-point chart-point--mint" cx={x(safeTime)} cy={y(state.vx)} r="5" />
        <circle className="chart-point chart-point--amber" cx={x(safeTime)} cy={y(state.vy)} r="5" />
        <text className="chart-axis-title" x="12" y="16">m/s</text>
      </svg>
    </section>
  );
}
