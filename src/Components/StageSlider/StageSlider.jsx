import "./StageSlider.css";

export function StageSlider({ value, onChange, max }) {
  return (
    <div className="stageSlider">
      <input
        className="stageSlider__range"
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="stageSlider__meta">
        Stage {value + 1} / {max + 1}
      </div>
    </div>
  );
}
