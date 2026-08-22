import { describe, expect, it } from "vitest";
import { DEFAULT_PROJECTILE_PARAMETERS } from "./projectilePresets";
import {
  horizontalRange,
  initialVelocity,
  projectileStateAtTime,
  timeOfFlight,
} from "./projectileModel";

describe("projectile model", () => {
  it("returns the initial position and velocity at t = 0", () => {
    const state = projectileStateAtTime(DEFAULT_PROJECTILE_PARAMETERS, 0);
    const velocity = initialVelocity(DEFAULT_PROJECTILE_PARAMETERS);

    expect(state.x).toBe(0);
    expect(state.y).toBe(0);
    expect(state.vx).toBeCloseTo(velocity.vx, 10);
    expect(state.vy).toBeCloseTo(velocity.vy, 10);
  });

  it("keeps horizontal velocity constant without drag", () => {
    const start = projectileStateAtTime(DEFAULT_PROJECTILE_PARAMETERS, 0);
    const later = projectileStateAtTime(DEFAULT_PROJECTILE_PARAMETERS, 1.5);
    expect(later.vx).toBeCloseTo(start.vx, 12);
  });

  it("produces a longer flight on the Moon than on Earth", () => {
    const earth = DEFAULT_PROJECTILE_PARAMETERS;
    const moon = { ...earth, gravity: 1.62 };
    expect(timeOfFlight(moon)).toBeGreaterThan(timeOfFlight(earth));
  });

  it("treats a ground-level horizontal launch as an immediate intersection", () => {
    const parameters = { ...DEFAULT_PROJECTILE_PARAMETERS, launchAngleDeg: 0 };
    expect(timeOfFlight(parameters)).toBe(0);
    expect(projectileStateAtTime(parameters, 1).hasLanded).toBe(true);
  });

  it("matches the canonical analytical range at ground level", () => {
    const parameters = { ...DEFAULT_PROJECTILE_PARAMETERS, launchAngleDeg: 38 };
    const angle = (parameters.launchAngleDeg * Math.PI) / 180;
    const expected =
      (parameters.initialSpeed ** 2 * Math.sin(2 * angle)) / parameters.gravity;
    expect(horizontalRange(parameters)).toBeCloseTo(expected, 10);
  });

  it("clamps the projectile to the ground after landing", () => {
    const state = projectileStateAtTime(DEFAULT_PROJECTILE_PARAMETERS, 999);
    expect(state.y).toBe(0);
    expect(state.time).toBeCloseTo(timeOfFlight(DEFAULT_PROJECTILE_PARAMETERS), 10);
    expect(state.hasLanded).toBe(true);
  });
});
