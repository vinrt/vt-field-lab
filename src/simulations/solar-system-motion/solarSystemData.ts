export interface PlanetDefinition {
  id: string;
  name: string;
  color: string;
  glow: string;
  radius: number;
  orbitRadius: number;
  orbitTiltDeg: number;
  orbitalPeriodDays: number;
  distanceAu: number;
  order: number;
  phaseOffset: number;
  note: string;
}

export const planets: PlanetDefinition[] = [
  {
    id: "mercury",
    name: "Mercury",
    color: "#d8c7a6",
    glow: "rgba(216, 199, 166, 0.45)",
    radius: 4,
    orbitRadius: 0.12,
    orbitTiltDeg: -8,
    orbitalPeriodDays: 88,
    distanceAu: 0.39,
    order: 1,
    phaseOffset: 0.2,
    note: "Fastest orbit around the Sun.",
  },
  {
    id: "venus",
    name: "Venus",
    color: "#f1cf88",
    glow: "rgba(241, 207, 136, 0.5)",
    radius: 6,
    orbitRadius: 0.18,
    orbitTiltDeg: -4,
    orbitalPeriodDays: 225,
    distanceAu: 0.72,
    order: 2,
    phaseOffset: 1.1,
    note: "Similar in size to Earth, but much hotter.",
  },
  {
    id: "earth",
    name: "Earth",
    color: "#8bb8ff",
    glow: "rgba(139, 184, 255, 0.55)",
    radius: 6,
    orbitRadius: 0.25,
    orbitTiltDeg: 2,
    orbitalPeriodDays: 365,
    distanceAu: 1,
    order: 3,
    phaseOffset: 2.4,
    note: "One orbit defines one Earth year.",
  },
  {
    id: "mars",
    name: "Mars",
    color: "#e67f57",
    glow: "rgba(230, 127, 87, 0.48)",
    radius: 5,
    orbitRadius: 0.34,
    orbitTiltDeg: 6,
    orbitalPeriodDays: 687,
    distanceAu: 1.52,
    order: 4,
    phaseOffset: 3.2,
    note: "A smaller rocky planet with a longer year.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    color: "#f0a23d",
    glow: "rgba(240, 162, 61, 0.6)",
    radius: 13,
    orbitRadius: 0.52,
    orbitTiltDeg: -5,
    orbitalPeriodDays: 4333,
    distanceAu: 5.2,
    order: 5,
    phaseOffset: 4.1,
    note: "The largest planet in the Solar System.",
  },
  {
    id: "saturn",
    name: "Saturn",
    color: "#e7c46f",
    glow: "rgba(231, 196, 111, 0.55)",
    radius: 11,
    orbitRadius: 0.66,
    orbitTiltDeg: -12,
    orbitalPeriodDays: 10759,
    distanceAu: 9.58,
    order: 6,
    phaseOffset: 5.4,
    note: "A gas giant known for its ring system.",
  },
  {
    id: "uranus",
    name: "Uranus",
    color: "#4ed0bd",
    glow: "rgba(78, 208, 189, 0.5)",
    radius: 9,
    orbitRadius: 0.8,
    orbitTiltDeg: 8,
    orbitalPeriodDays: 30687,
    distanceAu: 19.2,
    order: 7,
    phaseOffset: 0.7,
    note: "An ice giant with a strongly tilted rotation axis.",
  },
  {
    id: "neptune",
    name: "Neptune",
    color: "#4c69ff",
    glow: "rgba(76, 105, 255, 0.5)",
    radius: 9,
    orbitRadius: 0.92,
    orbitTiltDeg: 13,
    orbitalPeriodDays: 60190,
    distanceAu: 30.05,
    order: 8,
    phaseOffset: 1.7,
    note: "The most distant major planet from the Sun.",
  },
];
