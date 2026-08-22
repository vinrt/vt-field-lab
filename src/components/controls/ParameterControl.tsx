interface ParameterControlProps {
  id: string;
  label: string;
  symbol: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}

export function ParameterControl({
  id,
  label,
  symbol,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: ParameterControlProps) {
  const progress = ((value - min) / (max - min)) * 100;

  const update = (rawValue: string) => {
    const next = Number(rawValue);
    if (Number.isFinite(next)) onChange(Math.min(max, Math.max(min, next)));
  };

  return (
    <div className="parameter-control">
      <div className="parameter-heading">
        <label htmlFor={id}>
          {label} <span className="parameter-symbol">{symbol}</span>
        </label>
        <div className="number-with-unit">
          <input
            aria-label={`${label} numerical value`}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => update(event.target.value)}
          />
          <span>{unit}</span>
        </div>
      </div>
      <input
        id={id}
        className="range-input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--range-progress": `${progress}%` } as React.CSSProperties}
        onChange={(event) => update(event.target.value)}
      />
      <div className="range-bounds" aria-hidden="true">
        <span>{min}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}
