import { useCallback, useEffect, useRef, useState } from "react";
import { pendulumStateAtTime } from "./pendulumModel";
import type { PendulumParameters, PendulumPhase, PendulumState } from "./pendulumTypes";

export interface PendulumSimulationController {
  phase: PendulumPhase;
  state: PendulumState;
  run: () => void;
  pause: () => void;
  reset: () => void;
}

export function usePendulumSimulation(parameters: PendulumParameters): PendulumSimulationController {
  const [phase, setPhase] = useState<PendulumPhase>("idle");
  const [state, setState] = useState(() => pendulumStateAtTime(parameters, 0));
  const timeRef = useRef(0);

  const reset = useCallback(() => {
    timeRef.current = 0;
    setState(pendulumStateAtTime(parameters, 0));
    setPhase("idle");
  }, [parameters]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (phase !== "running") return;

    let frame = 0;
    let previousTime = performance.now();
    let lastMeasurement = previousTime;

    const animate = (now: number) => {
      const elapsedSeconds = Math.min((now - previousTime) / 1000, 0.08);
      previousTime = now;
      timeRef.current += elapsedSeconds;
      if (now - lastMeasurement >= 33) {
        setState(pendulumStateAtTime(parameters, timeRef.current));
        lastMeasurement = now;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [parameters, phase]);

  return {
    phase,
    state,
    run: () => setPhase("running"),
    pause: () => setPhase("paused"),
    reset,
  };
}
