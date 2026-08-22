import type { ProjectileParameters, ProjectileState } from "./projectileTypes";

const EPSILON = 1e-10;

export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function initialVelocity(parameters: ProjectileParameters): {
  vx: number;
  vy: number;
} {
  const angle = degreesToRadians(parameters.launchAngleDeg);
  return {
    vx: parameters.initialSpeed * Math.cos(angle),
    vy: parameters.initialSpeed * Math.sin(angle),
  };
}

export function timeOfFlight(parameters: ProjectileParameters): number {
  const { vy } = initialVelocity(parameters);
  const discriminant = vy * vy + 2 * parameters.gravity * parameters.initialHeight;

  if (parameters.gravity <= 0 || discriminant < 0) return 0;
  const flightTime = (vy + Math.sqrt(discriminant)) / parameters.gravity;
  return flightTime > EPSILON ? flightTime : 0;
}

export function maximumHeight(parameters: ProjectileParameters): number {
  const { vy } = initialVelocity(parameters);
  if (parameters.gravity <= 0 || vy <= 0) return parameters.initialHeight;
  return parameters.initialHeight + (vy * vy) / (2 * parameters.gravity);
}

export function horizontalRange(parameters: ProjectileParameters): number {
  return initialVelocity(parameters).vx * timeOfFlight(parameters);
}

export function projectileStateAtTime(
  parameters: ProjectileParameters,
  requestedTime: number,
): ProjectileState {
  const flightTime = timeOfFlight(parameters);
  const time = Math.min(Math.max(requestedTime, 0), flightTime);
  const { vx, vy: initialVy } = initialVelocity(parameters);
  const rawY =
    parameters.initialHeight + initialVy * time - 0.5 * parameters.gravity * time * time;
  const vy = initialVy - parameters.gravity * time;
  const hasLanded = flightTime === 0 || requestedTime >= flightTime;

  return {
    time,
    x: vx * time,
    y: hasLanded ? 0 : Math.max(0, rawY),
    vx,
    vy,
    speed: Math.hypot(vx, vy),
    hasLanded,
  };
}

export function sampleTrajectory(
  parameters: ProjectileParameters,
  sampleCount = 100,
): ProjectileState[] {
  const count = Math.max(2, Math.floor(sampleCount));
  const flightTime = timeOfFlight(parameters);
  return Array.from({ length: count }, (_, index) =>
    projectileStateAtTime(parameters, (flightTime * index) / (count - 1)),
  );
}
