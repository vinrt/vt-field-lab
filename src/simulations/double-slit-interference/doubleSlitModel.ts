import type { DoubleSlitParameters } from "./doubleSlitTypes";

const NM_TO_M = 1e-9;
const UM_TO_M = 1e-6;

function sinc(value: number): number {
  return Math.abs(value) < 1e-12 ? 1 : Math.sin(value) / value;
}

export function doubleSlitIntensity(parameters: DoubleSlitParameters, screenPositionM: number): number {
  const wavelength = parameters.wavelengthNm * NM_TO_M;
  const separation = parameters.slitSeparationUm * UM_TO_M;
  const width = parameters.slitWidthUm * UM_TO_M;
  const theta = Math.atan2(screenPositionM, parameters.screenDistanceM);
  const sinTheta = Math.sin(theta);
  const interferencePhase = Math.PI * separation * sinTheta / wavelength;
  const diffractionPhase = Math.PI * width * sinTheta / wavelength;
  const interference = Math.cos(interferencePhase) ** 2;
  const envelope = sinc(diffractionPhase) ** 2;
  return interference * envelope;
}

export function fringeSpacingM(parameters: DoubleSlitParameters): number {
  return parameters.wavelengthNm * NM_TO_M * parameters.screenDistanceM / (parameters.slitSeparationUm * UM_TO_M);
}

export function firstDiffractionMinimumM(parameters: DoubleSlitParameters): number {
  return parameters.wavelengthNm * NM_TO_M * parameters.screenDistanceM / (parameters.slitWidthUm * UM_TO_M);
}

export function sampleDetectionPosition(
  parameters: DoubleSlitParameters,
  sample: number,
  halfScreenHeightM = 0.03,
): number {
  const clampedSample = Math.min(1, Math.max(0, sample));
  const steps = 600;
  const step = (2 * halfScreenHeightM) / steps;
  const weights = Array.from({ length: steps + 1 }, (_, index) => {
    const position = -halfScreenHeightM + index * step;
    return doubleSlitIntensity(parameters, position);
  });
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let accumulated = 0;

  for (let index = 0; index < weights.length; index += 1) {
    accumulated += weights[index] / total;
    if (accumulated >= clampedSample) return -halfScreenHeightM + index * step;
  }

  return halfScreenHeightM;
}

export function wavelengthColor(wavelengthNm: number): string {
  const normalized = Math.min(1, Math.max(0, (wavelengthNm - 380) / 320));
  const hue = 270 - normalized * 270;
  return `hsl(${hue.toFixed(0)} 88% 62%)`;
}
