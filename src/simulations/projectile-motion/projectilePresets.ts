import type { GravityPreset, ProjectileParameters } from "./projectileTypes";

export const GRAVITY_PRESETS: GravityPreset[] = [
  { id: "earth", label: "Earth", gravity: 9.81, note: "1.00 g" },
  { id: "moon", label: "Moon", gravity: 1.62, note: "0.17 g" },
  { id: "mars", label: "Mars", gravity: 3.71, note: "0.38 g" },
];

export const DEFAULT_PROJECTILE_PARAMETERS: ProjectileParameters = {
  initialSpeed: 28,
  launchAngleDeg: 45,
  gravity: GRAVITY_PRESETS[0].gravity,
  initialHeight: 0,
};
