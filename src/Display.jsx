import { useMemo } from "react";
import { useAppState } from "./state/AppStateContext.jsx";
import { getTodoProgress } from "./state/selectors.js";
import "./Display.css";

import stage0 from "./assets/stages/pflanze1.svg";
import stage1 from "./assets/stages/pflanze2.svg";
import stage2 from "./assets/stages/pflanze3.svg";
import stage3 from "./assets/stages/pflanze4.svg";
import stage4 from "./assets/stages/pflanze5.svg";

import v1s1 from "./assets/buds/v1_s1.svg";
import v1s2 from "./assets/buds/v1_s2.svg";
import v1s3 from "./assets/buds/v1_s3.svg";

import v2s1 from "./assets/buds/v2_s1.svg";
import v2s2 from "./assets/buds/v2_s2.svg";
import v2s3 from "./assets/buds/v2_s3.svg";

import v3s1 from "./assets/buds/v3_s1.svg";
import v3s2 from "./assets/buds/v3_s2.svg";
import v3s3 from "./assets/buds/v3_s3.svg";

import v4s1 from "./assets/buds/v4_s1.svg";
import v4s2 from "./assets/buds/v4_s2.svg";
import v4s3 from "./assets/buds/v4_s3.svg";

const STAGES = [
  { label: "Seed", img: stage0 },
  { label: "Sprout", img: stage1 },
  { label: "Stem", img: stage2 },
  { label: "Leaves", img: stage3 },
  { label: "Bloom", img: stage4 },
];

const BUD_IMAGES = {
  v1: [v1s1, v1s2, v1s3],
  v2: [v2s1, v2s2, v2s3],
  v3: [v3s1, v3s2, v3s3],
  v4: [v4s1, v4s2, v4s3],
};

export function Display() {
  const { state } = useAppState();

  const stageIndex = clampInt(state.stageIndex ?? 0, 0, STAGES.length - 1);
  const selectedEventId = state.selectedEventId;

  const events = useMemo(() => {
    return (state.events ?? []).map((e) => ({
      ...e,
      bud: {
        x: clamp01(e.bud?.x ?? 0.5),
        y: clamp01(e.bud?.y ?? 0.5),
        style: normalizeStyle(e.bud?.style),
        rot: clampRot(e.bud?.rot),
      },
      todos: Array.isArray(e.todos) ? e.todos : [],
    }));
  }, [state.events]);

  const plantSrc = STAGES[stageIndex].img;

  return (
    <div className="display">
      <div className="display__canvas">
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

  const minSize = 14;
  const maxSize = 64;
  const size = minSize + (maxSize - minSize) * progress;

  const stageIdx = progress <= 0 ? 0 : Math.min(2, Math.ceil(progress * 3) - 1);

  const styleKey = normalizeStyle(event.bud?.style);
  const budSrc = (BUD_IMAGES[styleKey] ?? BUD_IMAGES.v1)[stageIdx];

  const rotDeg = clampRot(event.bud?.rot);

  const styleVars = {
    "--x": `${xPct}%`,
    "--y": `${yPct}%`,
    "--size": `${size}px`,
    "--rot": `${rotDeg}deg`,
  };

  return (
    <div
      className={`bud ${isSelected ? "bud--selected" : ""}`}
      style={styleVars}
      title={`${event.title} - ${percent}%`}
    >
      <img className="bud__img" src={budSrc} alt="" draggable="false" />
    </div>
  );
}

function normalizeStyle(s) {
  const v = String(s || "").toLowerCase();
  if (v === "v1" || v === "v2" || v === "v3" || v === "v4") return v;
  return "v1";
}

function clampRot(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 0;
  const r = ((v % 360) + 360) % 360;
  return r;
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
