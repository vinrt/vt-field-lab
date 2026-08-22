export interface ProjectileParameters {
  initialSpeed: number;
  launchAngleDeg: number;
  gravity: number;
  initialHeight: number;
}

export interface ProjectileState {
  time: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  hasLanded: boolean;
}

export type SimulationPhase = "idle" | "running" | "paused" | "complete";

export interface GravityPreset {
  id: "earth" | "moon" | "mars";
  label: string;
  gravity: number;
  note: string;
}
