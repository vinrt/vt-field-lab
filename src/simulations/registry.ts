export interface SimulationDefinition {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  route: string;
  status: "available" | "planned";
  featured?: boolean;
  accent?: "green" | "blue" | "violet" | "amber";
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
    featured: true,
    accent: "amber",
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
    featured: true,
    accent: "violet",
  },
  {
    id: "solar-system-motion",
    title: "Solar System motion",
    description: "Watch simplified planetary orbits and compare how each world moves around the Sun.",
    category: "Astronomy",
    difficulty: "beginner",
    tags: ["orbits", "solar system", "gravity", "astronomy"],
    route: "/simulations/solar-system-motion",
    status: "available",
    featured: true,
    accent: "blue",
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
    featured: true,
    accent: "amber",
  },
  {
    id: "qubit-bloch-sphere",
    title: "Qubit Explorer",
    description: "Prepare a one-qubit state, apply gates, and connect its Bloch vector to measurement probabilities.",
    category: "Quantum Computing",
    difficulty: "beginner",
    tags: ["qubits", "bloch sphere", "measurement", "gates"],
    route: "/simulations/qubit-bloch-sphere",
    status: "available",
    featured: true,
    accent: "violet",
  },
  {
    id: "double-slit-interference",
    title: "Double-slit interference",
    description: "Explore how probability amplitudes create an interference pattern.",
    category: "Quantum Physics",
    difficulty: "intermediate",
    tags: ["interference", "amplitude", "measurement"],
    route: "/simulations/double-slit-interference",
    status: "planned",
    featured: true,
    accent: "violet",
  },
  {
    id: "electric-fields",
    title: "Electric fields",
    description: "Map force direction and field strength around electric charges.",
    category: "Electromagnetism",
    difficulty: "beginner",
    tags: ["electric field", "force", "charge"],
    route: "/simulations/electric-fields",
    status: "planned",
    featured: true,
    accent: "green",
  },
  {
    id: "vector-addition",
    title: "Vector addition",
    description: "Build resultant vectors from components, magnitude, and direction.",
    category: "Mathematics",
    difficulty: "beginner",
    tags: ["vectors", "components", "linear algebra"],
    route: "/simulations/vector-addition",
    status: "planned",
    featured: true,
    accent: "blue",
  },
];

export function getSimulation(id: string): SimulationDefinition | undefined {
  return simulations.find((simulation) => simulation.id === id);
}
