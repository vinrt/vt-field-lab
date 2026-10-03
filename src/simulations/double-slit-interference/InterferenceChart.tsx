import { doubleSlitIntensity, wavelengthColor } from "./doubleSlitModel";
import type { DoubleSlitParameters } from "./doubleSlitTypes";

interface InterferenceChartProps { parameters: DoubleSlitParameters; }

export function InterferenceChart({ parameters }: InterferenceChartProps) {
  const halfRangeMm = 30;
  const points = Array.from({ length: 241 }, (_, index) => {
    const positionMm = -halfRangeMm + index / 240 * halfRangeMm * 2;
    return { positionMm, intensity: doubleSlitIntensity(parameters, positionMm / 1000) };
  });
  const x = (positionMm: number) => 45 + ((positionMm + halfRangeMm) / (halfRangeMm * 2)) * 470;
  const y = (intensity: number) => 170 - intensity * 125;
  const path = points.map((point, index) => `${index ? "L" : "M"}${x(point.positionMm).toFixed(2)},${y(point.intensity).toFixed(2)}`).join(" ");
  const color = wavelengthColor(parameters.wavelengthNm);

  return (
    <section className="chart-card" aria-labelledby="interference-chart-title">
      <div className="section-heading section-heading--compact"><div><span className="eyebrow">Predicted screen</span><h2 id="interference-chart-title">Normalized intensity</h2></div><span className="assumption-chip">Far field</span></div>
      <svg className="velocity-chart interference-chart" viewBox="0 0 550 205" role="img" aria-label="Predicted double-slit intensity across the screen">
        {[45, 107.5, 170].map((lineY) => <line key={lineY} className="chart-grid" x1="45" y1={lineY} x2="515" y2={lineY} />)}
        <line className="chart-axis" x1="45" y1="170" x2="515" y2="170" />
        <text className="chart-label" x="38" y="193">−30</text><text className="chart-label" x="272" y="193">0</text><text className="chart-label" x="496" y="193">30 mm</text>
        <text className="chart-label" x="8" y="49">1.0</text><text className="chart-label" x="15" y="174">0</text>
        <path d={path} fill="none" stroke={color} strokeWidth="2.4" />
      </svg>
    </section>
  );
}
