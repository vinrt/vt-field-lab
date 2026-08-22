import { Route, Routes } from "react-router-dom";
import { ProjectileMotionPage } from "../simulations/projectile-motion/ProjectileMotionPage";
import { AppShell } from "./layout/AppShell";
import { AboutPage } from "./pages/AboutPage";
import { BooksPage } from "./pages/BooksPage";
import { HomePage } from "./pages/HomePage";
import { LearnPage } from "./pages/LearnPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SimulationsPage } from "./pages/SimulationsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="simulations" element={<SimulationsPage />} />
        <Route path="simulations/projectile-motion" element={<ProjectileMotionPage />} />
        <Route path="learn" element={<LearnPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
