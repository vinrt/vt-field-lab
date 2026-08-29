import { describe, expect, it } from "vitest";
import {
  BASIS_ONE,
  BASIS_ZERO,
  applyGate,
  blochVector,
  measure,
  normalizeState,
  probabilities,
  stateFromAngles,
} from "./qubitModel";

describe("qubit model", () => {
  it("normalizes an arbitrary state", () => {
    const state = normalizeState({ alpha: { re: 3, im: 0 }, beta: { re: 4, im: 0 } });
    const result = probabilities(state);
    expect(result.zero + result.one).toBeCloseTo(1, 12);
    expect(result.zero).toBeCloseTo(0.36, 12);
  });

  it("creates basis states from Bloch angles", () => {
    expect(probabilities(stateFromAngles(0, 0))).toEqual({ zero: 1, one: 0 });
    expect(probabilities(stateFromAngles(Math.PI, 0)).one).toBeCloseTo(1, 12);
  });

  it("maps the equal superposition to the positive x axis", () => {
    const vector = blochVector(stateFromAngles(Math.PI / 2, 0));
    expect(vector.x).toBeCloseTo(1, 12);
    expect(vector.y).toBeCloseTo(0, 12);
    expect(vector.z).toBeCloseTo(0, 12);
  });

  it("applies X, Z, and H gates", () => {
    expect(applyGate(BASIS_ZERO, "X")).toEqual(BASIS_ONE);
    expect(applyGate(BASIS_ONE, "Z").beta.re).toBe(-1);
    const plus = applyGate(BASIS_ZERO, "H");
    expect(probabilities(plus).zero).toBeCloseTo(0.5, 12);
    expect(probabilities(plus).one).toBeCloseTo(0.5, 12);
    expect(applyGate(plus, "H").alpha.re).toBeCloseTo(1, 12);
  });

  it("uses an explicit sample and collapses measurement", () => {
    const plus = stateFromAngles(Math.PI / 2, 0);
    const zeroResult = measure(plus, 0.2);
    const oneResult = measure(plus, 0.8);
    expect(zeroResult.outcome).toBe(0);
    expect(zeroResult.state).toEqual(BASIS_ZERO);
    expect(oneResult.outcome).toBe(1);
    expect(oneResult.state).toEqual(BASIS_ONE);
  });
});
