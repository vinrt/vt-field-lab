import { useEffect, useMemo, useRef } from "react";
import { planets, type PlanetDefinition } from "./solarSystemData";
import { orbitPositionAtDay } from "./solarSystemModel";

interface SolarSystemCanvasProps {
  day: number;
  selectedPlanetId: string;
  onSelectPlanet: (planetId: string) => void;
}

interface ScreenPoint {
  x: number;
  y: number;
}

function buildStars(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const seed = Math.sin(index * 9283.73) * 10000;
    const next = Math.sin((index + 1) * 5317.19) * 10000;
    const third = Math.sin((index + 2) * 1439.91) * 10000;
    return {
      x: seed - Math.floor(seed),
      y: next - Math.floor(next),
      radius: 0.45 + (third - Math.floor(third)) * 1.2,
      alpha: 0.28 + (seed - Math.floor(seed)) * 0.62,
    };
  });
}

function drawPlanet(
  context: CanvasRenderingContext2D,
  planet: PlanetDefinition,
  point: ScreenPoint,
  selected: boolean,
) {
  context.save();
  context.shadowColor = planet.glow;
  context.shadowBlur = selected ? 26 : 16;
  context.fillStyle = planet.color;
  context.beginPath();
  context.arc(point.x, point.y, planet.radius + (selected ? 2 : 0), 0, Math.PI * 2);
  context.fill();

  if (planet.id === "saturn") {
    context.strokeStyle = "rgba(231, 196, 111, 0.58)";
    context.lineWidth = 1.4;
    context.beginPath();
    context.ellipse(point.x, point.y, planet.radius * 1.8, planet.radius * 0.55, -0.28, 0, Math.PI * 2);
    context.stroke();
  }

  context.shadowBlur = 0;
  context.fillStyle = selected ? "#ffffff" : "rgba(255, 255, 255, 0.76)";
  context.font = selected ? "700 12px Inter, system-ui, sans-serif" : "600 10px Inter, system-ui, sans-serif";
  context.fillText(planet.name, point.x + planet.radius + 7, point.y - planet.radius - 3);
  context.restore();
}

export function SolarSystemCanvas({ day, selectedPlanetId, onSelectPlanet }: SolarSystemCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planetHitMap = useRef<Array<{ id: string; x: number; y: number; radius: number }>>([]);
  const stars = useMemo(() => buildStars(190), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;

    const draw = () => {
      if (width === 0 || height === 0) return;

      const center = { x: width * 0.5, y: height * 0.52 };
      const orbitScale = Math.min(width, height) * 0.46;
      const selectedPlanet = planets.find((planet) => planet.id === selectedPlanetId);

      context.clearRect(0, 0, width, height);
      const background = context.createRadialGradient(center.x, center.y, 8, center.x, center.y, Math.max(width, height) * 0.75);
      background.addColorStop(0, "#17100a");
      background.addColorStop(0.2, "#06090f");
      background.addColorStop(1, "#010207");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        context.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        context.beginPath();
        context.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
        context.fill();
      });

      context.save();
      context.translate(center.x, center.y);
      context.strokeStyle = "rgba(255, 255, 255, 0.16)";
      context.lineWidth = 1;
      planets.forEach((planet) => {
        context.save();
        context.rotate((planet.orbitTiltDeg * Math.PI) / 180);
        context.beginPath();
        context.ellipse(0, 0, planet.orbitRadius * orbitScale, planet.orbitRadius * orbitScale * 0.62, 0, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      });

      context.strokeStyle = "rgba(255, 255, 255, 0.42)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(-orbitScale * 1.08, orbitScale * 0.38);
      context.bezierCurveTo(-orbitScale * 0.55, -orbitScale * 0.42, orbitScale * 0.34, orbitScale * 0.7, orbitScale * 1.1, -orbitScale * 0.28);
      context.stroke();
      context.restore();

      context.save();
      context.shadowColor = "rgba(255, 170, 31, 0.9)";
      context.shadowBlur = 38;
      context.fillStyle = "#ffc338";
      context.beginPath();
      context.arc(center.x, center.y, 28, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
      context.fillStyle = "rgba(255, 255, 255, 0.86)";
      context.font = "700 12px Inter, system-ui, sans-serif";
      context.fillText("Sun", center.x + 36, center.y + 4);
      context.restore();

      const hitMap: Array<{ id: string; x: number; y: number; radius: number }> = [];
      planets.forEach((planet) => {
        const position = orbitPositionAtDay(planet, day);
        const point = {
          x: center.x + position.x * orbitScale,
          y: center.y + position.y * orbitScale,
        };
        const isSelected = selectedPlanet?.id === planet.id;
        drawPlanet(context, planet, point, isSelected);
        hitMap.push({ id: planet.id, x: point.x, y: point.y, radius: planet.radius + 18 });
      });
      planetHitMap.current = hitMap;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(320, rect.width);
      height = Math.max(360, rect.height);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    return () => observer.disconnect();
  }, [day, selectedPlanetId, stars]);

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hit = planetHitMap.current.find((planet) => {
      const distance = Math.hypot(planet.x - x, planet.y - y);
      return distance <= planet.radius;
    });

    if (hit) onSelectPlanet(hit.id);
  };

  return (
    <canvas
      ref={canvasRef}
      className="solar-system-canvas"
      role="img"
      aria-label="Animated Solar System with planets orbiting the Sun."
      onPointerDown={handlePointerDown}
    />
  );
}
