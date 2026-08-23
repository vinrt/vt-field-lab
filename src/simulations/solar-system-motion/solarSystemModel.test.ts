import { describe, expect, it } from "vitest";
import { planets } from "./solarSystemData";
import { orbitalProgress, orbitPositionAtDay } from "./solarSystemModel";

describe("solar system model", () => {
  it("returns the same visual position after one orbital period", () => {
    const earth = planets.find((planet) => planet.id === "earth");
    expect(earth).toBeDefined();

    const start = orbitPositionAtDay(earth!, 0);
    const afterOneYear = orbitPositionAtDay(earth!, earth!.orbitalPeriodDays);

    expect(afterOneYear.x).toBeCloseTo(start.x, 8);
    expect(afterOneYear.y).toBeCloseTo(start.y, 8);
  });

  it("normalizes progress into the zero-to-one range", () => {
    const mars = planets.find((planet) => planet.id === "mars");
    expect(mars).toBeDefined();

    expect(orbitalProgress(mars!, -10)).toBeGreaterThanOrEqual(0);
    expect(orbitalProgress(mars!, -10)).toBeLessThan(1);
    expect(orbitalProgress(mars!, mars!.orbitalPeriodDays)).toBe(0);
  });
});
