import { describe, expect, it } from "vitest";
import { DEFAULT_PENDULUM_PARAMETERS } from "./pendulumPresets";
import { pendulumPeriod, pendulumStateAtTime, totalPendulumEnergy } from "./pendulumModel";

describe("simple pendulum model", () => {
  it("starts at the chosen angle with zero speed", () => {
    const state = pendulumStateAtTime(DEFAULT_PENDULUM_PARAMETERS, 0);
    expect(state.angleDeg).toBeCloseTo(DEFAULT_PENDULUM_PARAMETERS.initialAngleDeg, 10);
    expect(state.angularVelocity).toBeCloseTo(0, 10);
    expect(state.kineticEnergy).toBeCloseTo(0, 10);
  });

  it("returns to the initial state after one period", () => {
    const period = pendulumPeriod(DEFAULT_PENDULUM_PARAMETERS);
    const state = pendulumStateAtTime(DEFAULT_PENDULUM_PARAMETERS, period);
    expect(state.angleDeg).toBeCloseTo(DEFAULT_PENDULUM_PARAMETERS.initialAngleDeg, 10);
    expect(state.angularVelocity).toBeCloseTo(0, 10);
  });

  it("reaches maximum speed at the equilibrium position", () => {
    const quarterPeriod = pendulumPeriod(DEFAULT_PENDULUM_PARAMETERS) / 4;
    const state = pendulumStateAtTime(DEFAULT_PENDULUM_PARAMETERS, quarterPeriod);
    expect(state.angleDeg).toBeCloseTo(0, 10);
    expect(Math.abs(state.tangentialSpeed)).toBeGreaterThan(0);
    expect(state.potentialEnergy).toBeCloseTo(0, 10);
  });

  it("conserves energy throughout the analytical model", () => {
    const expected = totalPendulumEnergy(DEFAULT_PENDULUM_PARAMETERS);
    for (const fraction of [0, 0.13, 0.25, 0.61, 1]) {
      const time = pendulumPeriod(DEFAULT_PENDULUM_PARAMETERS) * fraction;
      const state = pendulumStateAtTime(DEFAULT_PENDULUM_PARAMETERS, time);
      expect(state.kineticEnergy + state.potentialEnergy).toBeCloseTo(expected, 10);
    }
  });

  it("swings more slowly when its length increases", () => {
    const longer = { ...DEFAULT_PENDULUM_PARAMETERS, length: DEFAULT_PENDULUM_PARAMETERS.length * 4 };
    expect(pendulumPeriod(longer)).toBeCloseTo(pendulumPeriod(DEFAULT_PENDULUM_PARAMETERS) * 2, 10);
  });
});
