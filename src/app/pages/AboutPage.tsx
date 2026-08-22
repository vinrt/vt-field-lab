import { useEffect } from "react";
import { Link } from "react-router-dom";

export function AboutPage() {
  useEffect(() => {
    document.title = "About — VT Field Lab";
  }, []);

  return (
    <main className="page content-page about-page">
      <div className="page-width about-layout">
        <header className="content-hero">
          <span className="eyebrow">About the lab</span>
          <h1>Science becomes memorable when it responds to you.</h1>
        </header>
        <div className="about-copy">
          <p className="about-lead">VT Field Lab is a growing collection of interactive physics and mathematics experiments designed to connect intuition, measurement, and equations.</p>
          <p>Each simulation starts with a phenomenon you can see. Controls let you ask “what if?”, measurements show what changed, and concise notes connect that behavior to a model.</p>
          <p>The project begins with classical mechanics and is designed to expand into waves, electromagnetism, thermodynamics, relativity, quantum physics, and mathematical visualization.</p>
          <blockquote>See the phenomenon → interact with it → understand the mathematics → explore further.</blockquote>
          <Link className="button button--primary" to="/simulations/projectile-motion">Enter the first experiment</Link>
        </div>
      </div>
    </main>
  );
}
