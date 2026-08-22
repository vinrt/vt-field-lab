export interface SimulationDefinition {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  route: string;
  status: "available" | "planned";
}

export const simulations: SimulationDefinition[] = [
  {
    id: "projectile-motion",
    title: "Projectile motion",
    description: "Launch an object and measure how gravity shapes its path.",
    category: "Mechanics",
    difficulty: "beginner",
    tags: ["kinematics", "gravity", "vectors"],
    route: "/simulations/projectile-motion",
    status: "available",
  },
  {
    id: "simple-pendulum",
    title: "Simple pendulum",
    description: "Explore periodic motion, energy exchange, and small-angle behavior.",
    category: "Mechanics",
    difficulty: "beginner",
    tags: ["oscillation", "energy"],
    route: "/simulations/simple-pendulum",
    status: "planned",
  },
  {
    id: "standing-waves",
    title: "Standing waves",
    description: "See nodes, antinodes, harmonics, and resonance emerge.",
    category: "Waves",
    difficulty: "intermediate",
    tags: ["waves", "resonance", "harmonics"],
    route: "/simulations/standing-waves",
    status: "planned",
  },
];

export function getSimulation(id: string): SimulationDefinition | undefined {
  return simulations.find((simulation) => simulation.id === id);
}
