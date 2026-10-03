import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ParameterControl } from "../../components/controls/ParameterControl";
import { MeasurementCard } from "../../components/simulation/MeasurementCard";
import { PauseIcon, PlayIcon, ResetIcon } from "../../components/ui/Icons";
import { firstDiffractionMinimumM, fringeSpacingM } from "./doubleSlitModel";
import { DEFAULT_DOUBLE_SLIT_PARAMETERS, WAVELENGTH_PRESETS } from "./doubleSlitPresets";
import type { DoubleSlitParameters } from "./doubleSlitTypes";
import { DoubleSlitSvg } from "./DoubleSlitSvg";
import { InterferenceChart } from "./InterferenceChart";
import { useDoubleSlitSimulation } from "./useDoubleSlitSimulation";

export function DoubleSlitPage() {
  const [parameters, setParameters] = useState<DoubleSlitParameters>(DEFAULT_DOUBLE_SLIT_PARAMETERS);
  const simulation = useDoubleSlitSimulation(parameters);
  useEffect(() => { document.title = "Double-slit Interference — VT Field Lab"; }, []);

  const summary = useMemo(() => ({
    fringeSpacingMm: fringeSpacingM(parameters) * 1000,
    firstMinimumMm: firstDiffractionMinimumM(parameters) * 1000,
  }), [parameters]);
  const selectedPreset = WAVELENGTH_PRESETS.find((preset) => preset.wavelengthNm === parameters.wavelengthNm);
  const updateParameter = <K extends keyof DoubleSlitParameters>(key: K, value: DoubleSlitParameters[K]) => setParameters((current) => ({ ...current, [key]: value }));

  return (
    <main className="page page--simulation">
      <div className="page-width">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/simulations">Simulations</Link><span aria-hidden="true">/</span><span>Quantum physics</span></nav>
        <header className="simulation-header"><div><div className="eyebrow-row"><span className="eyebrow">Experiment 005</span><span className="difficulty-pill">Intermediate</span></div><h1>Double-slit interference</h1><p>Send detections through two narrow slits and watch individual events build the wave-like interference pattern predicted by their amplitudes.</p></div><dl className="experiment-meta"><div><dt>Model</dt><dd>Fraunhofer</dd></div><div><dt>Display</dt><dd>Events</dd></div><div><dt>Units</dt><dd>SI</dd></div></dl></header>

        <section className="lab-workspace" aria-label="Double-slit interference laboratory">
          <div className="simulation-stage"><DoubleSlitSvg parameters={parameters} phase={simulation.phase} detections={simulation.detections} /><div className="measurement-strip" aria-label="Live measurements"><MeasurementCard label="Elapsed time" value={simulation.elapsedTime} unit="s" accent /><MeasurementCard label="Detections" value={simulation.totalDetections} unit="events" precision={0} /><MeasurementCard label="Wavelength" value={parameters.wavelengthNm} unit="nm" precision={0} /><MeasurementCard label="Fringe spacing" value={summary.fringeSpacingMm} unit="mm" /><MeasurementCard label="First envelope zero" value={summary.firstMinimumMm} unit="mm" /><MeasurementCard label="Screen distance" value={parameters.screenDistanceM} unit="m" /></div></div>
          <aside className="control-panel" aria-labelledby="double-slit-controls-title">
            <div className="control-panel-heading"><div><span className="eyebrow">Apparatus parameters</span><h2 id="double-slit-controls-title">Controls</h2></div><span className="control-readout">{selectedPreset?.label ?? "Custom"}</span></div>
            <div className="preset-group"><span>Wavelength presets</span><div className="segmented-control">{WAVELENGTH_PRESETS.map((preset) => <button key={preset.id} type="button" className={selectedPreset?.id === preset.id ? "is-active" : ""} aria-pressed={selectedPreset?.id === preset.id} onClick={() => updateParameter("wavelengthNm", preset.wavelengthNm)}><strong>{preset.label}</strong><small>{preset.note}</small></button>)}</div></div>
            <ParameterControl id="double-slit-wavelength" label="Wavelength" symbol="λ" value={parameters.wavelengthNm} min={380} max={700} step={1} unit="nm" onChange={(value) => updateParameter("wavelengthNm", value)} />
            <ParameterControl id="double-slit-separation" label="Slit separation" symbol="d" value={parameters.slitSeparationUm} min={40} max={160} step={1} unit="μm" onChange={(value) => updateParameter("slitSeparationUm", value)} />
            <ParameterControl id="double-slit-width" label="Slit width" symbol="a" value={parameters.slitWidthUm} min={8} max={35} step={1} unit="μm" onChange={(value) => updateParameter("slitWidthUm", value)} />
            <ParameterControl id="double-slit-distance" label="Screen distance" symbol="L" value={parameters.screenDistanceM} min={0.5} max={3} step={0.1} unit="m" onChange={(value) => updateParameter("screenDistanceM", value)} />
            <div className="projected-results" aria-label="Predicted results"><span>Predicted pattern</span><dl><div><dt>Bright-fringe spacing</dt><dd>{summary.fringeSpacingMm.toFixed(2)} mm</dd></div><div><dt>Central-envelope half-width</dt><dd>{summary.firstMinimumMm.toFixed(2)} mm</dd></div></dl></div>
            <div className="transport-controls">{simulation.phase === "running" ? <button type="button" className="button button--primary" onClick={simulation.pause}><PauseIcon /> Pause</button> : <button type="button" className="button button--primary" onClick={simulation.run}><PlayIcon /> {simulation.phase === "paused" ? "Resume" : "Run"}</button>}<button type="button" className="button button--secondary" onClick={simulation.reset}><ResetIcon /> Reset</button></div>
          </aside>
        </section>

        <div className="analysis-grid"><InterferenceChart parameters={parameters} /><section className="equation-card" aria-labelledby="double-slit-equations-title"><div className="section-heading section-heading--compact"><div><span className="eyebrow">The model</span><h2 id="double-slit-equations-title">Interference and diffraction</h2></div><span className="assumption-chip">Coherent source</span></div><div className="equation-grid"><div><span>Intensity</span><p>I = cos²(α) sinc²(β)</p></div><div><span>Interference phase</span><p>α = πd sinθ / λ</p></div><div><span>Diffraction phase</span><p>β = πa sinθ / λ</p></div><div><span>Fringe spacing</span><p>Δy ≈ λL / d</p></div></div></section></div>

        <section className="explanation-section"><div className="section-heading"><div><span className="eyebrow">What to notice</span><h2>Single events reveal a collective pattern</h2></div></div><div className="explanation-grid"><article><span>01</span><h3>Each event is localized</h3><p>Every simulated detection appears as one point. Its position is sampled from the normalized screen intensity.</p></article><article><span>02</span><h3>Wavelength controls spacing</h3><p>A longer wavelength or a more distant screen spreads adjacent bright fringes farther apart.</p></article><article><span>03</span><h3>Each slit has finite width</h3><p>The broad single-slit diffraction envelope suppresses interference fringes far from the center.</p></article></div><p className="assumptions-note"><strong>Assumptions:</strong> monochromatic coherent illumination, identical narrow rectangular slits, uniform slit illumination, far-field observation, and small screen angles for the spacing estimate. Detection points are pedagogical samples from the Fraunhofer intensity distribution; the apparatus drawing and event rate are not to scale.</p></section>
        <section className="learn-further"><div><span className="eyebrow">Continue learning</span><h2>From amplitudes to measurement</h2><p>Connect interference with the quantum concepts and curated reading already in the lab.</p></div><Link className="text-link" to="/concepts/quantum-physics">Explore quantum basics <span aria-hidden="true">→</span></Link></section>
      </div>
    </main>
  );
}
