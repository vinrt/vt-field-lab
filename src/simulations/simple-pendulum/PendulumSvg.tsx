import { totalPendulumEnergy } from "./pendulumModel";
import type { PendulumParameters, PendulumPhase, PendulumState } from "./pendulumTypes";

interface PendulumSvgProps {
  parameters: PendulumParameters;
  phase: PendulumPhase;
  state: PendulumState;
}

export function PendulumSvg({ parameters, phase, state }: PendulumSvgProps) {
  const pivotX = 400;
  const pivotY = 72;
  const rodLength = 190 + (parameters.length / 3) * 105;
  const bobX = pivotX + Math.sin(state.angleRad) * rodLength;
  const bobY = pivotY + Math.cos(state.angleRad) * rodLength;
  const totalEnergy = totalPendulumEnergy(parameters);
  const kineticShare = totalEnergy > 0 ? state.kineticEnergy / totalEnergy : 0;
  const potentialShare = totalEnergy > 0 ? state.potentialEnergy / totalEnergy : 0;

  return (
    <div className="canvas-frame pendulum-frame">
      <div className="canvas-status"><span className={`status-dot status-dot--${phase}`} />{phase}</div>
      <div className="canvas-coordinate">θ = {state.angleDeg.toFixed(1)}°</div>
      <svg className="pendulum-svg" viewBox="0 0 800 520" role="img" aria-label={`Pendulum at ${state.angleDeg.toFixed(1)} degrees from vertical`}>
        <defs>
          <radialGradient id="pendulum-bob" cx="35%" cy="28%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.18" stopColor="var(--canvas-mint)" />
            <stop offset="1" stopColor="#147264" />
          </radialGradient>
        </defs>
        <g className="pendulum-grid">
          {Array.from({ length: 10 }, (_, index) => <line key={`v-${index}`} x1={index * 80} y1="0" x2={index * 80} y2="520" />)}
          {Array.from({ length: 7 }, (_, index) => <line key={`h-${index}`} x1="0" y1={index * 80} x2="800" y2={index * 80} />)}
        </g>
        <line className="pendulum-equilibrium" x1={pivotX} y1={pivotY} x2={pivotX} y2={pivotY + rodLength + 42} />
        <path className="pendulum-arc" d={`M ${pivotX - Math.sin(parameters.initialAngleDeg * Math.PI / 180) * rodLength} ${pivotY + Math.cos(parameters.initialAngleDeg * Math.PI / 180) * rodLength} A ${rodLength} ${rodLength} 0 0 0 ${pivotX + Math.sin(parameters.initialAngleDeg * Math.PI / 180) * rodLength} ${pivotY + Math.cos(parameters.initialAngleDeg * Math.PI / 180) * rodLength}`} />
        <line className="pendulum-support" x1="330" y1={pivotY} x2="470" y2={pivotY} />
        <circle className="pendulum-pivot" cx={pivotX} cy={pivotY} r="8" />
        <line className="pendulum-rod" x1={pivotX} y1={pivotY} x2={bobX} y2={bobY} />
        <circle className="pendulum-bob-glow" cx={bobX} cy={bobY} r="34" />
        <circle cx={bobX} cy={bobY} r="22" fill="url(#pendulum-bob)" />
        <g className="pendulum-energy" transform="translate(42 382)">
          <text x="0" y="0">ENERGY EXCHANGE · 1 KG BOB</text>
          <text x="0" y="34">KINETIC</text>
          <rect x="82" y="22" width="180" height="14" rx="7" />
          <rect className="pendulum-energy--kinetic" x="82" y="22" width={180 * kineticShare} height="14" rx="7" />
          <text x="0" y="66">POTENTIAL</text>
          <rect x="82" y="54" width="180" height="14" rx="7" />
          <rect className="pendulum-energy--potential" x="82" y="54" width={180 * potentialShare} height="14" rx="7" />
        </g>
      </svg>
    </div>
  );
}
