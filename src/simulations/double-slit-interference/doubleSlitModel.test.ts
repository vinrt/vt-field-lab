import { describe, expect, it } from "vitest";
import { DEFAULT_DOUBLE_SLIT_PARAMETERS } from "./doubleSlitPresets";
import { doubleSlitIntensity, firstDiffractionMinimumM, fringeSpacingM, sampleDetectionPosition } from "./doubleSlitModel";

describe("double-slit interference model", () => {
  it("has unit intensity at the center of the screen", () => {
    expect(doubleSlitIntensity(DEFAULT_DOUBLE_SLIT_PARAMETERS, 0)).toBeCloseTo(1, 12);
  });

  it("is symmetric around the central maximum", () => {
    for (const position of [0.001, 0.004, 0.011, 0.025]) {
      expect(doubleSlitIntensity(DEFAULT_DOUBLE_SLIT_PARAMETERS, position)).toBeCloseTo(
        doubleSlitIntensity(DEFAULT_DOUBLE_SLIT_PARAMETERS, -position),
        12,
      );
    }
  });

  it("puts the first interference minimum halfway between bright fringes", () => {
    const firstDark = fringeSpacingM(DEFAULT_DOUBLE_SLIT_PARAMETERS) / 2;
    expect(doubleSlitIntensity(DEFAULT_DOUBLE_SLIT_PARAMETERS, firstDark)).toBeLessThan(0.001);
  });

  it("places the first diffraction minimum at wavelength times distance over slit width", () => {
    const minimum = firstDiffractionMinimumM(DEFAULT_DOUBLE_SLIT_PARAMETERS);
    expect(doubleSlitIntensity(DEFAULT_DOUBLE_SLIT_PARAMETERS, minimum)).toBeLessThan(0.001);
  });

  it("keeps sampled detections on the modeled screen", () => {
    for (const sample of [0, 0.1, 0.5, 0.9, 1]) {
      expect(Math.abs(sampleDetectionPosition(DEFAULT_DOUBLE_SLIT_PARAMETERS, sample))).toBeLessThanOrEqual(0.03);
    }
  });
});
