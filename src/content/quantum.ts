export interface QuantumConcept {
  id: string;
  title: string;
  shortDescription: string;
  explanation: string;
  equation: string;
  relatedSimulationId?: string;
  relatedBookTitles: string[];
  accent: "violet" | "blue" | "green";
}

export const quantumConcepts: QuantumConcept[] = [
  {
    id: "quantum-state",
    title: "Quantum state",
    shortDescription: "A compact description of what can be predicted about a system.",
    explanation: "For a qubit, two complex amplitudes describe the possible basis outcomes. The state is normalized so their probabilities add to one.",
    equation: "|ψ⟩ = α|0⟩ + β|1⟩",
    relatedSimulationId: "qubit-bloch-sphere",
    relatedBookTitles: ["QED", "Something Deeply Hidden"],
    accent: "violet",
  },
  {
    id: "amplitude",
    title: "Amplitude",
    shortDescription: "A complex number whose squared magnitude gives probability.",
    explanation: "Amplitudes carry both magnitude and phase. They can reinforce or cancel before a measurement turns them into observable probabilities.",
    equation: "P(0) = |α|²,  P(1) = |β|²",
    relatedSimulationId: "qubit-bloch-sphere",
    relatedBookTitles: ["QED", "Quantum Computing for the Very Curious"],
    accent: "blue",
  },
  {
    id: "superposition",
    title: "Superposition",
    shortDescription: "A state formed from multiple basis-state amplitudes.",
    explanation: "Superposition does not mean a classical bit secretly has two definite values. It means the complete state requires amplitudes for more than one possible outcome.",
    equation: "|+⟩ = (|0⟩ + |1⟩)/√2",
    relatedSimulationId: "qubit-bloch-sphere",
    relatedBookTitles: ["Helgoland", "Something Deeply Hidden"],
    accent: "violet",
  },
  {
    id: "measurement",
    title: "Measurement",
    shortDescription: "A probabilistic result that changes the prepared state.",
    explanation: "A basis measurement returns 0 or 1 according to the state's probabilities. Afterward, this simple model collapses to the observed basis state.",
    equation: "|ψ⟩ → |0⟩ or |1⟩",
    relatedSimulationId: "qubit-bloch-sphere",
    relatedBookTitles: ["Helgoland", "Quantum Computing: A Gentle Introduction"],
    accent: "green",
  },
  {
    id: "phase",
    title: "Phase",
    shortDescription: "Information that becomes observable through interference.",
    explanation: "Relative phase does not change basis probabilities by itself, but it changes how amplitudes combine after gates or interference.",
    equation: "β = eⁱφ sin(θ/2)",
    relatedSimulationId: "qubit-bloch-sphere",
    relatedBookTitles: ["QED", "Quantum Computing for the Very Curious"],
    accent: "blue",
  },
  {
    id: "entanglement",
    title: "Entanglement",
    shortDescription: "A shared state whose parts cannot be fully described independently.",
    explanation: "Entangled measurements can be correlated more strongly than classical models allow, but they cannot be used to send information faster than light.",
    equation: "|Φ⁺⟩ = (|00⟩ + |11⟩)/√2",
    relatedBookTitles: ["Something Deeply Hidden", "Quantum Computation and Quantum Information"],
    accent: "violet",
  },
];

export const quantumLearningPhases = [
  { number: 1, title: "Foundations", detail: "States, amplitudes, probability, phase", status: "In progress" },
  { number: 2, title: "Single qubit", detail: "Bloch sphere, gates, measurement", status: "Available" },
  { number: 3, title: "Multiple qubits", detail: "Joint states and entanglement", status: "Upcoming" },
  { number: 4, title: "Quantum circuits", detail: "Compose and step through operations", status: "Upcoming" },
  { number: 5, title: "Algorithms", detail: "Search, Fourier ideas, phase estimation", status: "Planned" },
];
