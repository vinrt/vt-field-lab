export interface BookReference {
  title: string;
  author: string;
  area: string[];
  level: "popular" | "beginner" | "undergraduate" | "advanced";
  description: string;
  relatedSimulationIds?: string[];
}

export const books: BookReference[] = [
  {
    title: "Six Easy Pieces",
    author: "Richard P. Feynman",
    area: ["Foundations", "Mechanics"],
    level: "beginner",
    description: "A vivid introduction to the physical ideas behind motion, energy, gravitation, and quantum behavior.",
    relatedSimulationIds: ["projectile-motion", "simple-pendulum"],
  },
  {
    title: "The Character of Physical Law",
    author: "Richard P. Feynman",
    area: ["Foundations"],
    level: "popular",
    description: "An unusually clear meditation on how physical laws connect mathematics, observation, and symmetry.",
  },
  {
    title: "Classical Mechanics",
    author: "John R. Taylor",
    area: ["Mechanics"],
    level: "undergraduate",
    description: "A friendly but rigorous path from Newtonian motion to oscillations, rotating systems, and Lagrangian mechanics.",
    relatedSimulationIds: ["projectile-motion", "simple-pendulum"],
  },
  {
    title: "Infinite Powers",
    author: "Steven Strogatz",
    area: ["Calculus", "Mathematics"],
    level: "popular",
    description: "A conceptual history of calculus and why continuous change is one of science’s most powerful ideas.",
  },
  {
    title: "Vibrations and Waves",
    author: "A. P. French",
    area: ["Waves", "Oscillations"],
    level: "undergraduate",
    description: "A compact, physical treatment of oscillations, normal modes, traveling waves, and interference.",
    relatedSimulationIds: ["standing-waves", "simple-pendulum"],
  },
  {
    title: "The Road to Reality",
    author: "Roger Penrose",
    area: ["Mathematics", "Relativity", "Quantum Physics"],
    level: "advanced",
    description: "A broad and demanding tour of the mathematical structures underlying modern theoretical physics.",
  },
];
