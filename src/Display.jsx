import { useMemo } from "react";
import { useAppState } from "./state/AppStateContext.jsx";
import { getTodoProgress } from "./state/selectors.js";

export function Display() {
  const { state } = useAppState();

  const selected = useMemo(
    () => state.events.find(e => e.id === state.selectedEventId),
    [state.events, state.selectedEventId]
  );

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h2>Display</h2>

      {!selected ? (
        <div style={{ opacity: 0.7 }}>No event selected.</div>
      ) : (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>
            Selected: {selected.title}
          </div>
          <EventProgressRow event={selected} isSelected />
        </div>
      )}

      <h3 style={{ marginTop: 16 }}>All Events</h3>
      {state.events.length === 0 ? (
        <div style={{ opacity: 0.7 }}>No events yet.</div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {state.events.map(event => (
            <EventProgressRow
              key={event.id}
              event={event}
              isSelected={event.id === state.selectedEventId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EventProgressRow({ event, isSelected }) {
  const progress = getTodoProgress(event);
  const percent = Math.round(progress * 100);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 12,
        background: isSelected ? "rgba(0,0,0,0.04)" : "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontWeight: 600 }}>{event.title}</div>
        <div style={{ opacity: 0.7 }}>{percent}%</div>
      </div>

      <ProgressBar value={progress} />

      <div style={{ marginTop: 6, opacity: 0.7, fontSize: 12 }}>
        {event.todos.filter(t => t.done).length}/{event.todos.length} todos done
      </div>
    </div>
  );
}

function ProgressBar({ value }) {
  const v = Math.max(0, Math.min(1, value));

  return (
    <div
      style={{
        height: 12,
        borderRadius: 999,
        background: "#eee",
        overflow: "hidden",
        marginTop: 8,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${v * 100}%`,
          background: "#111",
          transition: "width 150ms ease",
        }}
      />
    </div>
  );
}
