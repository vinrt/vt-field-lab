import { Route, Routes } from "react-router-dom";
import { ProjectileMotionPage } from "../simulations/projectile-motion/ProjectileMotionPage";
import { SolarSystemMotionPage } from "../simulations/solar-system-motion/SolarSystemMotionPage";
import { QubitExplorerPage } from "../simulations/qubit-bloch-sphere/QubitExplorerPage";
import { AppShell } from "./layout/AppShell";
import { AboutPage } from "./pages/AboutPage";
import { BooksPage } from "./pages/BooksPage";
import { HomePage } from "./pages/HomePage";
import { LearnPage } from "./pages/LearnPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SimulationsPage } from "./pages/SimulationsPage";
import { SimulationLibraryPage } from "./pages/SimulationLibraryPage";
import { ConceptsPage } from "./pages/ConceptsPage";
import { QuantumPhysicsPage } from "./pages/QuantumPhysicsPage";
import { QuantumPage } from "./pages/QuantumPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="simulations" element={<SimulationsPage />} />
        <Route path="simulations/library" element={<SimulationLibraryPage />} />
        <Route path="simulations/projectile-motion" element={<ProjectileMotionPage />} />
        <Route path="simulations/solar-system-motion" element={<SolarSystemMotionPage />} />
        <Route path="simulations/qubit-bloch-sphere" element={<QubitExplorerPage />} />
        <Route path="concepts" element={<ConceptsPage />} />
        <Route path="concepts/quantum-physics" element={<QuantumPhysicsPage />} />
        <Route path="quantum" element={<QuantumPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
