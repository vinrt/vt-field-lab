import { useEffect, useMemo, useRef } from "react";
import {
  horizontalRange,
  maximumHeight,
  projectileStateAtTime,
  sampleTrajectory,
} from "./projectileModel";
import type {
  ProjectileParameters,
  ProjectileState,
  SimulationPhase,
} from "./projectileTypes";

interface ProjectileCanvasProps {
  parameters: ProjectileParameters;
  phase: SimulationPhase;
  timeRef: React.RefObject<number>;
  measuredState: ProjectileState;
}

interface CanvasPoint {
  x: number;
  y: number;
}

function niceStep(span: number): number {
  const rough = span / 6;
  const power = 10 ** Math.floor(Math.log10(Math.max(rough, 0.01)));
  const normalized = rough / power;
  if (normalized < 2) return 2 * power;
  if (normalized < 5) return 5 * power;
  return 10 * power;
}

export function ProjectileCanvas({
  parameters,
  phase,
  timeRef,
  measuredState,
}: ProjectileCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trajectory = useMemo(() => sampleTrajectory(parameters, 140), [parameters]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(320, rect.width);
      height = Math.max(280, rect.height);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    };

    const drawArrow = (from: CanvasPoint, to: CanvasPoint) => {
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.stroke();
      context.beginPath();
      context.moveTo(to.x, to.y);
      context.lineTo(to.x - 8 * Math.cos(angle - Math.PI / 6), to.y - 8 * Math.sin(angle - Math.PI / 6));
      context.lineTo(to.x - 8 * Math.cos(angle + Math.PI / 6), to.y - 8 * Math.sin(angle + Math.PI / 6));
      context.closePath();
      context.fill();
    };

    const draw = () => {
      if (width === 0 || height === 0) return;

      const styles = getComputedStyle(canvas);
      const background = styles.getPropertyValue("--canvas-bg").trim() || "#091525";
      const grid = styles.getPropertyValue("--canvas-grid").trim() || "rgba(164, 186, 205, .12)";
      const muted = styles.getPropertyValue("--canvas-muted").trim() || "#8092a7";
      const mint = styles.getPropertyValue("--canvas-mint").trim() || "#63e6be";
      const amber = styles.getPropertyValue("--canvas-amber").trim() || "#ffbd59";

      context.clearRect(0, 0, width, height);
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      const padding = { left: 52, right: 24, top: 24, bottom: 42 };
      const range = Math.max(horizontalRange(parameters) * 1.08, 10);
      const peak = Math.max(maximumHeight(parameters) * 1.28, 4);
      const availableWidth = width - padding.left - padding.right;
      const availableHeight = height - padding.top - padding.bottom;
      const scale = Math.min(availableWidth / range, availableHeight / peak);
      const plotWidth = range * scale;
      const originX = padding.left + Math.max(0, (availableWidth - plotWidth) / 2);
      const originY = height - padding.bottom;

      const toCanvas = (x: number, y: number): CanvasPoint => ({
        x: originX + x * scale,
        y: originY - y * scale,
      });

      context.lineWidth = 1;
      context.strokeStyle = grid;
      context.fillStyle = muted;
      context.font = "11px 'IBM Plex Mono', ui-monospace, monospace";

      const xStep = niceStep(range);
      for (let x = 0; x <= range + xStep / 2; x += xStep) {
        const point = toCanvas(x, 0);
        context.beginPath();
        context.moveTo(point.x, padding.top);
        context.lineTo(point.x, originY);
        context.stroke();
        context.fillText(`${Math.round(x)} m`, point.x + 4, originY + 19);
      }

      const yStep = niceStep(peak);
      for (let y = yStep; y <= peak + yStep / 2; y += yStep) {
        const point = toCanvas(0, y);
        context.beginPath();
        context.moveTo(originX, point.y);
        context.lineTo(originX + plotWidth, point.y);
        context.stroke();
        context.textAlign = "right";
        context.fillText(`${Math.round(y)} m`, originX - 8, point.y + 4);
      }
      context.textAlign = "left";

      context.strokeStyle = "rgba(164, 186, 205, .36)";
      context.lineWidth = 1.2;
      context.beginPath();
      context.moveTo(originX, padding.top);
      context.lineTo(originX, originY);
      context.lineTo(originX + plotWidth, originY);
      context.stroke();

      context.setLineDash([5, 7]);
      context.strokeStyle = "rgba(99, 230, 190, .22)";
      context.beginPath();
      trajectory.forEach((state, index) => {
        const point = toCanvas(state.x, state.y);
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      context.stroke();
      context.setLineDash([]);

      const currentState = projectileStateAtTime(parameters, timeRef.current);
      context.strokeStyle = mint;
      context.lineWidth = 2.5;
      context.shadowColor = "rgba(99, 230, 190, .28)";
      context.shadowBlur = 8;
      context.beginPath();
      let hasStarted = false;
      trajectory.forEach((state) => {
        if (state.time > currentState.time) return;
        const point = toCanvas(state.x, state.y);
        if (!hasStarted) {
          context.moveTo(point.x, point.y);
          hasStarted = true;
        } else context.lineTo(point.x, point.y);
      });
      context.stroke();
      context.shadowBlur = 0;

      const projectile = toCanvas(currentState.x, currentState.y);
      const gradient = context.createRadialGradient(
        projectile.x - 2,
        projectile.y - 3,
        1,
        projectile.x,
        projectile.y,
        12,
      );
      gradient.addColorStop(0, "#fff6d9");
      gradient.addColorStop(0.32, amber);
      gradient.addColorStop(1, "#d96f2b");
      context.fillStyle = gradient;
      context.shadowColor = "rgba(255, 189, 89, .48)";
      context.shadowBlur = 16;
      context.beginPath();
      context.arc(projectile.x, projectile.y, 7, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;

      if (!currentState.hasLanded && currentState.speed > 0) {
        const vectorScale = Math.min(2.2, 55 / currentState.speed);
        context.strokeStyle = amber;
        context.fillStyle = amber;
        context.lineWidth = 1.7;
        drawArrow(projectile, {
          x: projectile.x + currentState.vx * vectorScale,
          y: projectile.y - currentState.vy * vectorScale,
        });
      }

      context.fillStyle = muted;
      context.font = "10px 'IBM Plex Mono', ui-monospace, monospace";
      context.fillText("VELOCITY VECTOR", Math.max(originX, projectile.x - 22), Math.max(18, projectile.y - 20));
    };

    const animate = () => {
      draw();
      animationFrame = requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    if (phase === "running") animationFrame = requestAnimationFrame(animate);
    else draw();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [parameters, phase, timeRef, trajectory]);

  return (
    <div className="canvas-frame">
      <canvas
        ref={canvasRef}
        className="projectile-canvas"
        role="img"
        aria-label={`Projectile at ${measuredState.x.toFixed(1)} metres horizontal and ${measuredState.y.toFixed(1)} metres high.`}
      />
      <div className="canvas-status" aria-live="polite">
        <span className={`status-dot status-dot--${phase}`} />
        {phase === "complete" ? "Landed" : phase}
      </div>
      <div className="canvas-coordinate">x–y plane · SI units</div>
    </div>
  );
}
