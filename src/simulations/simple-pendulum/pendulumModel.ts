import type { PendulumParameters, PendulumState } from "./pendulumTypes";

const BOB_MASS_KG = 1;

function toRadians(angleDeg: number): number {
  return angleDeg * Math.PI / 180;
}

export function angularFrequency(parameters: PendulumParameters): number {
  return Math.sqrt(parameters.gravity / parameters.length);
}

export function pendulumPeriod(parameters: PendulumParameters): number {
  return 2 * Math.PI / angularFrequency(parameters);
}

export function pendulumStateAtTime(parameters: PendulumParameters, time: number): PendulumState {
  const safeTime = Math.max(0, time);
  const initialAngle = toRadians(parameters.initialAngleDeg);
  const frequency = angularFrequency(parameters);
  const angleRad = initialAngle * Math.cos(frequency * safeTime);
  const angularVelocity = -initialAngle * frequency * Math.sin(frequency * safeTime);
  const tangentialSpeed = parameters.length * angularVelocity;

  // The small-angle model uses U ≈ 1/2 m g L θ², which keeps total model energy constant.
  const potentialEnergy = 0.5 * BOB_MASS_KG * parameters.gravity * parameters.length * angleRad ** 2;
  const kineticEnergy = 0.5 * BOB_MASS_KG * tangentialSpeed ** 2;

  return {
    time: safeTime,
    angleRad,
    angleDeg: angleRad * 180 / Math.PI,
    angularVelocity,
    tangentialSpeed,
    kineticEnergy,
    potentialEnergy,
  };
}

export function totalPendulumEnergy(parameters: PendulumParameters): number {
  const initialAngle = toRadians(parameters.initialAngleDeg);
  return 0.5 * BOB_MASS_KG * parameters.gravity * parameters.length * initialAngle ** 2;
}
