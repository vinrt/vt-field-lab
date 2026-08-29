export type Complex = {
  re: number;
  im: number;
};

export type QubitState = {
  alpha: Complex;
  beta: Complex;
};

export type QuantumGateId = "X" | "Z" | "H";
export type MeasurementOutcome = 0 | 1;

export interface QubitProbabilities {
  zero: number;
  one: number;
}

export interface BlochVector {
  x: number;
  y: number;
  z: number;
}

export interface MeasurementResult {
  outcome: MeasurementOutcome;
  state: QubitState;
  probabilities: QubitProbabilities;
}

const EPSILON = 1e-12;
const ONE_OVER_ROOT_TWO = 1 / Math.sqrt(2);

export const BASIS_ZERO: QubitState = {
  alpha: { re: 1, im: 0 },
  beta: { re: 0, im: 0 },
};

export const BASIS_ONE: QubitState = {
  alpha: { re: 0, im: 0 },
  beta: { re: 1, im: 0 },
};

export function magnitudeSquared(value: Complex): number {
  return value.re * value.re + value.im * value.im;
}

export function normalizeState(state: QubitState): QubitState {
  const norm = Math.sqrt(magnitudeSquared(state.alpha) + magnitudeSquared(state.beta));
  if (norm < EPSILON) return BASIS_ZERO;

  return {
    alpha: { re: state.alpha.re / norm, im: state.alpha.im / norm },
    beta: { re: state.beta.re / norm, im: state.beta.im / norm },
  };
}

export function probabilities(state: QubitState): QubitProbabilities {
  const normalized = normalizeState(state);
  return {
    zero: magnitudeSquared(normalized.alpha),
    one: magnitudeSquared(normalized.beta),
  };
}

export function stateFromAngles(theta: number, phi: number): QubitState {
  const halfTheta = theta / 2;
  return normalizeState({
    alpha: { re: Math.cos(halfTheta), im: 0 },
    beta: {
      re: Math.cos(phi) * Math.sin(halfTheta),
      im: Math.sin(phi) * Math.sin(halfTheta),
    },
  });
}

function add(first: Complex, second: Complex): Complex {
  return { re: first.re + second.re, im: first.im + second.im };
}

function subtract(first: Complex, second: Complex): Complex {
  return { re: first.re - second.re, im: first.im - second.im };
}

function scale(value: Complex, amount: number): Complex {
  return { re: value.re * amount, im: value.im * amount };
}

export function applyGate(state: QubitState, gate: QuantumGateId): QubitState {
  const normalized = normalizeState(state);

  if (gate === "X") {
    return { alpha: normalized.beta, beta: normalized.alpha };
  }

  if (gate === "Z") {
    return {
      alpha: normalized.alpha,
      beta: { re: -normalized.beta.re, im: -normalized.beta.im },
    };
  }

  return normalizeState({
    alpha: scale(add(normalized.alpha, normalized.beta), ONE_OVER_ROOT_TWO),
    beta: scale(subtract(normalized.alpha, normalized.beta), ONE_OVER_ROOT_TWO),
  });
}

export function blochVector(state: QubitState): BlochVector {
  const normalized = normalizeState(state);
  const alphaConjugateTimesBeta = {
    re: normalized.alpha.re * normalized.beta.re + normalized.alpha.im * normalized.beta.im,
    im: normalized.alpha.re * normalized.beta.im - normalized.alpha.im * normalized.beta.re,
  };

  return {
    x: 2 * alphaConjugateTimesBeta.re,
    y: 2 * alphaConjugateTimesBeta.im,
    z: magnitudeSquared(normalized.alpha) - magnitudeSquared(normalized.beta),
  };
}

export function measure(state: QubitState, sample: number): MeasurementResult {
  const currentProbabilities = probabilities(state);
  const boundedSample = Math.min(Math.max(sample, 0), 1 - Number.EPSILON);
  const outcome: MeasurementOutcome = boundedSample < currentProbabilities.zero ? 0 : 1;

  return {
    outcome,
    state: outcome === 0 ? BASIS_ZERO : BASIS_ONE,
    probabilities: currentProbabilities,
  };
}
