import { useMemo } from "react";
import { useAppState } from "./state/AppStateContext.jsx";
import { getTodoProgress } from "./state/selectors.js";
import "./Display.css";

import stage0 from "./assets/stages/pflanze1.svg";
import stage1 from "./assets/stages/pflanze2.svg";
import stage2 from "./assets/stages/pflanze3.svg";
import stage3 from "./assets/stages/pflanze4.svg";
import stage4 from "./assets/stages/pflanze5.svg";

const STAGES = [
  { label: "Seed", img: stage0 },
  { label: "Sprout", img: stage1 },
  { label: "Stem", img: stage2 },
  { label: "Leaves", img: stage3 },
  { label: "Bloom", img: stage4 },
];

export function Display() {
  const { state } = useAppState();

  const stageIndex = clampInt(state.stageIndex ?? 0, 0, STAGES.length - 1);
  const selectedEventId = state.selectedEventId;

  const events = useMemo(() => {
    return (state.events ?? []).map((e) => ({
      ...e,
      bud: e.bud ?? { x: Math.random(), y: Math.random(), style: "default" },
      todos: Array.isArray(e.todos) ? e.todos : [],
    }));
  }, [state.events]);

  const plantSrc = STAGES[stageIndex].img;

  return (
    <div className="display">
      <div className="display__canvas">
        {/* KEY: frame sizes to the image; buds overlay matches this frame */}
        <div className="display__frame">
          <img
            className="display__plant"
            src={plantSrc}
            alt={STAGES[stageIndex].label}
          />

          <div className="display__buds">
            {events.map((event) => (
              <Bud
                key={event.id}
                event={event}
                isSelected={event.id === selectedEventId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bud({ event, isSelected }) {
  const progress = clamp01(getTodoProgress(event));
  const percent = Math.round(progress * 100);

  const xPct = clamp01(event.bud?.x ?? 0.5) * 100;
  const yPct = clamp01(event.bud?.y ?? 0.5) * 100;

  const minSize = 12;
  const maxSize = 56;
  const size = minSize + (maxSize - minSize) * progress;

  const styleVars = {
    "--x": `${xPct}%`,
    "--y": `${yPct}%`,
    "--size": `${size}px`,
  };

  return (
    <div
      className={`bud ${isSelected ? "bud--selected" : ""}`}
      style={styleVars}
      title={`${event.title} – ${percent}%`}
    >
      <div className="bud__fill" />
    </div>
  );
}

function clamp01(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

function clampInt(n, min, max) {
  const v = Number(n);
  if (!Number.isFinite(v)) return min;
  return Math.max(min, Math.min(max, Math.round(v)));
}
