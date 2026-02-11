import { useRef } from "react";
import "./BudPlacer.css";


export function BudPlacer({ plantSrc, events, selectedEventId, onPlace }) {
  const frameRef = useRef(null);

  function handleClick(e) {
    if (!selectedEventId) return;
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const cx = clamp01(x);
    const cy = clamp01(y);

    onPlace(selectedEventId, cx, cy);
  }

  return (
    <div className="placer">
      <div className="placer__frame" ref={frameRef} onClick={handleClick}>
        <img className="placer__img" src={plantSrc} alt="Plant stage" />
        <div className="placer__overlay" aria-hidden="true">
          {(events ?? []).map((ev) => {
            const x = clamp01(ev?.bud?.x ?? 0.5) * 100;
            const y = clamp01(ev?.bud?.y ?? 0.5) * 100;

            return (
              <div
                key={ev.id}
                className={`placer-bud ${
                  ev.id === selectedEventId ? "placer-bud--selected" : ""
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
                title={ev.title}
              />
            );
          })}
        </div>
      </div>

      <div className="placer__hint">
        {selectedEventId
          ? "Click on the plant to place the selected event's bud."
          : "Select an event first, then click on the plant to place its bud."}
      </div>
    </div>
  );
}

function clamp01(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(1, v));
}
