import { doubleSlitIntensity, wavelengthColor } from "./doubleSlitModel";
import type { DetectionEvent, DoubleSlitParameters, DoubleSlitPhase } from "./doubleSlitTypes";

interface DoubleSlitSvgProps {
  parameters: DoubleSlitParameters;
  phase: DoubleSlitPhase;
  detections: DetectionEvent[];
}

const SCREEN_HALF_HEIGHT_M = 0.03;

export function DoubleSlitSvg({ parameters, phase, detections }: DoubleSlitSvgProps) {
  const color = wavelengthColor(parameters.wavelengthNm);
  const screenY = (positionM: number) => 260 - positionM / SCREEN_HALF_HEIGHT_M * 190;
  const intensityBands = Array.from({ length: 191 }, (_, index) => {
    const position = SCREEN_HALF_HEIGHT_M - index / 190 * SCREEN_HALF_HEIGHT_M * 2;
    return { y: 70 + index * 2, intensity: doubleSlitIntensity(parameters, position) };
  });

  return (
    <div className="canvas-frame double-slit-frame" style={{ "--wave-color": color } as React.CSSProperties}>
      <div className="canvas-status"><span className={`status-dot status-dot--${phase}`} />{phase}</div>
      <div className="canvas-coordinate">Schematic · not to scale</div>
      <svg className="double-slit-svg" viewBox="0 0 800 520" role="img" aria-label={`Double-slit apparatus with ${detections.length} visible detection events`}>
        <g className="double-slit-grid">{Array.from({ length: 11 }, (_, index) => <line key={index} x1={index * 80} y1="0" x2={index * 80} y2="520" />)}</g>
        <g className={`wave-source wave-source--${phase}`}>
          {[38, 72, 106, 140, 174].map((radius) => <path key={radius} d={`M 82 ${260 - radius} A ${radius} ${radius} 0 0 1 82 ${260 + radius}`} />)}
          <circle cx="82" cy="260" r="9" />
          <text x="45" y="294">SOURCE</text>
        </g>
        <g className="slit-barrier">
          <line x1="310" y1="55" x2="310" y2="224" /><line x1="310" y1="239" x2="310" y2="281" /><line x1="310" y1="296" x2="310" y2="465" />
          <text x="270" y="490">DOUBLE SLIT</text>
        </g>
        <g className={`slit-waves slit-waves--${phase}`}>
          {[70, 130, 190, 250, 310].map((radius) => <path key={`top-${radius}`} d={`M 310 231 A ${radius} ${radius} 0 0 1 ${310 + radius} ${231 + radius * 0.42}`} />)}
          {[70, 130, 190, 250, 310].map((radius) => <path key={`bottom-${radius}`} d={`M 310 289 A ${radius} ${radius} 0 0 0 ${310 + radius} ${289 - radius * 0.42}`} />)}
        </g>
        <rect className="detection-screen" x="704" y="62" width="36" height="396" rx="5" />
        {intensityBands.map((band) => <line key={band.y} x1="709" x2="735" y1={band.y} y2={band.y} stroke={color} strokeOpacity={0.08 + band.intensity * 0.82} strokeWidth="2.2" />)}
        <g className="detection-events">
          {detections.map((event) => <circle key={event.id} cx={710 + event.jitter * 24} cy={screenY(event.positionM)} r="1.7" fill={color} />)}
        </g>
        <text className="screen-label" x="684" y="490">DETECTION SCREEN</text>
        <line className="apparatus-axis" x1="40" y1="260" x2="754" y2="260" />
      </svg>
    </div>
  );
}
