import type { PlanetDefinition } from "./solarSystemData";

export interface OrbitPosition {
  x: number;
  y: number;
}

const ellipseFlattening = 0.62;

export function orbitPositionAtDay(planet: PlanetDefinition, day: number): OrbitPosition {
  const angle = ((day / planet.orbitalPeriodDays) * Math.PI * 2) + planet.phaseOffset;
  const tilt = (planet.orbitTiltDeg * Math.PI) / 180;
  const rawX = Math.cos(angle) * planet.orbitRadius;
  const rawY = Math.sin(angle) * planet.orbitRadius * ellipseFlattening;

  return {
    x: rawX * Math.cos(tilt) - rawY * Math.sin(tilt),
    y: rawX * Math.sin(tilt) + rawY * Math.cos(tilt),
  };
}

export function orbitalProgress(planet: PlanetDefinition, day: number): number {
  const progress = (day % planet.orbitalPeriodDays) / planet.orbitalPeriodDays;
  return progress < 0 ? progress + 1 : progress;
}
