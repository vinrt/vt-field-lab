export function ProjectileEquations() {
  return (
    <section className="equation-card" aria-labelledby="equations-title">
      <div className="section-heading section-heading--compact">
        <div>
          <span className="eyebrow">The model</span>
          <h2 id="equations-title">Governing equations</h2>
        </div>
        <span className="assumption-chip">No air resistance</span>
      </div>
      <div className="equation-grid">
        <div>
          <span>Horizontal position</span>
          <p>x(t) = v₀ cos(θ) t</p>
        </div>
        <div>
          <span>Vertical position</span>
          <p>y(t) = v₀ sin(θ) t − ½gt²</p>
        </div>
        <div>
          <span>Horizontal velocity</span>
          <p>vₓ(t) = v₀ cos(θ)</p>
        </div>
        <div>
          <span>Vertical velocity</span>
          <p>vᵧ(t) = v₀ sin(θ) − gt</p>
        </div>
      </div>
    </section>
  );
}
