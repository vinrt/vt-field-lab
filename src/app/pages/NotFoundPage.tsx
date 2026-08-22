import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="page not-found-page">
      <div>
        <span className="eyebrow">404 · Outside the field</span>
        <h1>This coordinate has no experiment.</h1>
        <p>The page may have moved, or the simulation is still being built.</p>
        <Link className="button button--primary" to="/">Return to the lab</Link>
      </div>
    </main>
  );
}
