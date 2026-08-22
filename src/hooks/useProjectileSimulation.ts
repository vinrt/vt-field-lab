import { useCallback, useEffect, useRef, useState } from "react";
import {
  projectileStateAtTime,
  timeOfFlight,
} from "../simulations/projectile-motion/projectileModel";
import type {
  ProjectileParameters,
  ProjectileState,
  SimulationPhase,
} from "../simulations/projectile-motion/projectileTypes";

const MAX_FRAME_DELTA_SECONDS = 0.05;
const MEASUREMENT_REFRESH_MS = 50;

export interface ProjectileSimulationController {
  phase: SimulationPhase;
  state: ProjectileState;
  timeRef: React.RefObject<number>;
  run: () => void;
  pause: () => void;
  reset: () => void;
}

export function useProjectileSimulation(
  parameters: ProjectileParameters,
): ProjectileSimulationController {
  const [phase, setPhase] = useState<SimulationPhase>("idle");
  const [state, setState] = useState(() => projectileStateAtTime(parameters, 0));
  const timeRef = useRef(0);
  const parametersRef = useRef(parameters);

  useEffect(() => {
    parametersRef.current = parameters;
    timeRef.current = 0;
    setState(projectileStateAtTime(parameters, 0));
    setPhase("idle");
  }, [parameters]);

  useEffect(() => {
    if (phase !== "running") return;

    let animationFrame = 0;
    let previousTimestamp = performance.now();
    let lastMeasurementUpdate = previousTimestamp;

    const tick = (timestamp: number) => {
      const deltaSeconds = Math.min(
        (timestamp - previousTimestamp) / 1000,
        MAX_FRAME_DELTA_SECONDS,
      );
      previousTimestamp = timestamp;

      const nextTime = timeRef.current + deltaSeconds;
      const nextState = projectileStateAtTime(parametersRef.current, nextTime);
      timeRef.current = nextState.time;

      if (
        timestamp - lastMeasurementUpdate >= MEASUREMENT_REFRESH_MS ||
        nextState.hasLanded
      ) {
        setState(nextState);
        lastMeasurementUpdate = timestamp;
      }

      if (nextState.hasLanded) {
        setPhase("complete");
        return;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [phase]);

  const run = useCallback(() => {
    if (timeOfFlight(parametersRef.current) <= 0) return;
    if (phase === "complete") {
      timeRef.current = 0;
      setState(projectileStateAtTime(parametersRef.current, 0));
    }
    setPhase("running");
  }, [phase]);

  const pause = useCallback(() => setPhase("paused"), []);

  const reset = useCallback(() => {
    timeRef.current = 0;
    setState(projectileStateAtTime(parametersRef.current, 0));
    setPhase("idle");
  }, []);

  return { phase, state, timeRef, run, pause, reset };
}
