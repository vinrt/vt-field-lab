import type { BlochVector } from "./qubitModel";

interface QubitBlochSphereProps {
  vector: BlochVector;
}

export function QubitBlochSphere({ vector }: QubitBlochSphereProps) {
  const centerX = 210;
  const centerY = 190;
  const radius = 132;
  const projectedX = centerX + radius * (vector.x * 0.82 + vector.y * 0.28);
  const projectedY = centerY - radius * (vector.z * 0.86 - vector.y * 0.2);

  return (
    <svg
      className="bloch-sphere"
      viewBox="0 0 420 380"
      role="img"
      aria-labelledby="bloch-title bloch-description"
    >
      <title id="bloch-title">Bloch sphere state visualization</title>
      <desc id="bloch-description">
        The state vector points to x {vector.x.toFixed(2)}, y {vector.y.toFixed(2)}, z {vector.z.toFixed(2)}.
      </desc>
      <defs>
        <radialGradient id="bloch-fill" cx="40%" cy="32%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.03" />
        </radialGradient>
        <linearGradient id="state-vector" x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#16a085" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <filter id="vector-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <circle cx={centerX} cy={centerY} r={radius} fill="url(#bloch-fill)" className="bloch-outline" />
      <ellipse cx={centerX} cy={centerY} rx={radius} ry="44" className="bloch-grid bloch-grid--solid" />
      <ellipse cx={centerX} cy={centerY} rx="44" ry={radius} className="bloch-grid" />
      <ellipse cx={centerX} cy={centerY} rx="44" ry={radius} className="bloch-grid" transform={`rotate(90 ${centerX} ${centerY})`} />
      <line x1={centerX} y1="34" x2={centerX} y2="346" className="bloch-axis" />
      <line x1="48" y1={centerY} x2="372" y2={centerY} className="bloch-axis" />
      <line x1="102" y1="280" x2="318" y2="100" className="bloch-axis bloch-axis--faint" />

      <text x={centerX + 10} y="38">|0⟩</text>
      <text x={centerX + 10} y="359">|1⟩</text>
      <text x="378" y={centerY + 5}>x</text>
      <text x="326" y="96">y</text>

      <line
        x1={centerX}
        y1={centerY}
        x2={projectedX}
        y2={projectedY}
        className="bloch-state-vector"
        filter="url(#vector-glow)"
      />
      <circle cx={projectedX} cy={projectedY} r="8" className="bloch-state-point" />
      <circle cx={centerX} cy={centerY} r="4" className="bloch-origin" />
    </svg>
  );
}
