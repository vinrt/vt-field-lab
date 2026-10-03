export interface DoubleSlitParameters {
  wavelengthNm: number;
  slitSeparationUm: number;
  slitWidthUm: number;
  screenDistanceM: number;
}

export interface DetectionEvent {
  id: number;
  positionM: number;
  jitter: number;
}

export type DoubleSlitPhase = "idle" | "running" | "paused";
