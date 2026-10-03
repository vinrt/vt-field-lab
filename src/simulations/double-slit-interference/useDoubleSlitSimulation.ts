import { useCallback, useEffect, useRef, useState } from "react";
import { sampleDetectionPosition } from "./doubleSlitModel";
import type { DetectionEvent, DoubleSlitParameters, DoubleSlitPhase } from "./doubleSlitTypes";

interface DoubleSlitController {
  phase: DoubleSlitPhase;
  elapsedTime: number;
  detections: DetectionEvent[];
  totalDetections: number;
  run: () => void;
  pause: () => void;
  reset: () => void;
}

const DETECTIONS_PER_SECOND = 35;
const MAX_VISIBLE_DETECTIONS = 700;

export function useDoubleSlitSimulation(parameters: DoubleSlitParameters): DoubleSlitController {
  const [phase, setPhase] = useState<DoubleSlitPhase>("idle");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [detections, setDetections] = useState<DetectionEvent[]>([]);
  const [totalDetections, setTotalDetections] = useState(0);
  const timeRef = useRef(0);
  const nextIdRef = useRef(0);
  const carryRef = useRef(0);

  const reset = useCallback(() => {
    timeRef.current = 0;
    nextIdRef.current = 0;
    carryRef.current = 0;
    setElapsedTime(0);
    setDetections([]);
    setTotalDetections(0);
    setPhase("idle");
  }, []);

  useEffect(() => { reset(); }, [parameters, reset]);

  useEffect(() => {
    if (phase !== "running") return;
    let frame = 0;
    let previous = performance.now();
    let lastReadout = previous;

    const animate = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.08);
      previous = now;
      timeRef.current += delta;
      carryRef.current += delta * DETECTIONS_PER_SECOND;
      const newCount = Math.floor(carryRef.current);
      carryRef.current -= newCount;

      if (newCount > 0) {
        const additions = Array.from({ length: newCount }, () => ({
          id: nextIdRef.current++,
          positionM: sampleDetectionPosition(parameters, Math.random()),
          jitter: Math.random(),
        }));
        setDetections((current) => [...current, ...additions].slice(-MAX_VISIBLE_DETECTIONS));
        setTotalDetections((current) => current + newCount);
      }
      if (now - lastReadout >= 100) {
        setElapsedTime(timeRef.current);
        lastReadout = now;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [parameters, phase]);

  return { phase, elapsedTime, detections, totalDetections, run: () => setPhase("running"), pause: () => setPhase("paused"), reset };
}
