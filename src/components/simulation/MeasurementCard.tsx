interface MeasurementCardProps {
  label: string;
  value: number;
  unit: string;
  accent?: boolean;
}

export function MeasurementCard({ label, value, unit, accent }: MeasurementCardProps) {
  return (
    <div className={`measurement-card${accent ? " measurement-card--accent" : ""}`}>
      <span>{label}</span>
      <strong>{Number.isFinite(value) ? value.toFixed(2) : "—"}</strong>
      <small>{unit}</small>
    </div>
  );
}
