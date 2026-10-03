import type { PendulumParameters } from "./pendulumTypes";

export const DEFAULT_PENDULUM_PARAMETERS: PendulumParameters = {
  length: 1.5,
  gravity: 9.81,
  initialAngleDeg: 15,
};

export const PENDULUM_GRAVITY_PRESETS = [
  { id: "moon", label: "Moon", gravity: 1.62, note: "1.62 m/s²" },
  { id: "earth", label: "Earth", gravity: 9.81, note: "9.81 m/s²" },
  { id: "jupiter", label: "Jupiter", gravity: 24.79, note: "24.79 m/s²" },
] as const;
