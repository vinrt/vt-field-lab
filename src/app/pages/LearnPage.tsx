import { useEffect } from "react";
import { Link } from "react-router-dom";

export function LearnPage() {
  useEffect(() => {
    document.title = "Learn — VT Field Lab";
  }, []);

  return (
    <main className="page content-page learn-page">
      <div className="page-width">
        <header className="content-hero">
          <span className="eyebrow">Learning paths</span>
          <h1>Follow an idea, not a syllabus.</h1>
          <p>Short sequences that connect experiments, mathematical tools, and deeper reading. The first path grows alongside the mechanics library.</p>
        </header>
        <section className="learning-path">
          <div className="learning-path-header">
            <span>Path 01 · Mechanics</span>
            <h2>Describing motion</h2>
            <p>Begin with position and velocity, add acceleration, then use those ideas to understand periodic and orbital motion.</p>
          </div>
          <ol>
            <li className="is-available"><span>01</span><div><small>Experiment</small><h3>Projectile motion</h3><p>Separate a two-dimensional path into independent motions.</p></div><Link to="/simulations/projectile-motion">Open →</Link></li>
            <li><span>02</span><div><small>Concept note</small><h3>Vectors and components</h3><p>Represent direction and magnitude without losing either.</p></div><em>Planned</em></li>
            <li><span>03</span><div><small>Experiment</small><h3>Simple pendulum</h3><p>Move from constant acceleration to restoring forces.</p></div><em>Planned</em></li>
          </ol>
        </section>
      </div>
    </main>
  );
}
