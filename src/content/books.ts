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
    title: "QED",
    author: "Richard P. Feynman",
    area: ["Quantum Physics", "Electromagnetism"],
    level: "beginner",
    description: "A compact explanation of light, matter, photons, and quantum electrodynamics from one of the field's clearest teachers.",
  },
  {
    title: "Hyperspace",
    author: "Michio Kaku",
    area: ["Cosmology", "Higher Dimensions"],
    level: "popular",
    description: "A popular introduction to higher dimensions, unification, and the speculative geometry behind modern theoretical physics.",
  },
  {
    title: "The Biggest Ideas in the Universe",
    author: "Sean Carroll",
    area: ["Foundations", "Theoretical Physics"],
    level: "popular",
    description: "A guided tour through the central mathematical ideas that shape physics, written for readers ready to meet the equations.",
  },
  {
    title: "The Order of Time",
    author: "Carlo Rovelli",
    area: ["Time", "Relativity"],
    level: "popular",
    description: "A short, thoughtful exploration of what modern physics says about time, entropy, and our experience of the present.",
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
  {
    title: "The Emperor's New Mind",
    author: "Roger Penrose",
    area: ["Mathematics", "Consciousness", "Physics"],
    level: "advanced",
    description: "A wide-ranging argument about computation, mind, mathematics, and the physical laws that may underlie consciousness.",
  },
];
