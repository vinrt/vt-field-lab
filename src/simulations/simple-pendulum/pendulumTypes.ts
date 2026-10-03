export interface PendulumParameters {
  length: number;
  gravity: number;
  initialAngleDeg: number;
}

export interface PendulumState {
  time: number;
  angleRad: number;
  angleDeg: number;
  angularVelocity: number;
  tangentialSpeed: number;
  kineticEnergy: number;
  potentialEnergy: number;
}

export type PendulumPhase = "idle" | "running" | "paused";
