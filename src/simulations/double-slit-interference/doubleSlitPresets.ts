import type { DoubleSlitParameters } from "./doubleSlitTypes";

export const DEFAULT_DOUBLE_SLIT_PARAMETERS: DoubleSlitParameters = {
  wavelengthNm: 532,
  slitSeparationUm: 80,
  slitWidthUm: 20,
  screenDistanceM: 1.5,
};

export const WAVELENGTH_PRESETS = [
  { id: "violet", label: "Violet", wavelengthNm: 405, note: "405 nm" },
  { id: "green", label: "Green", wavelengthNm: 532, note: "532 nm" },
  { id: "red", label: "Red", wavelengthNm: 650, note: "650 nm" },
] as const;
