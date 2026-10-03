interface MeasurementCardProps {
  label: string;
  value: number;
  unit: string;
  accent?: boolean;
  precision?: number;
}

export function MeasurementCard({ label, value, unit, accent, precision = 2 }: MeasurementCardProps) {
  return (
    <div className={`measurement-card${accent ? " measurement-card--accent" : ""}`}>
      <span>{label}</span>
      <strong>{Number.isFinite(value) ? value.toFixed(precision) : "—"}</strong>
      <small>{unit}</small>
    </div>
  );
}
