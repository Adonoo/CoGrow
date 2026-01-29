import { useMemo, useState } from "react";
import { useAppState } from "./state/AppStateContext.jsx";
import { ToDoList } from "./Components/ToDo/ToDoList.jsx";

export default function App() {
  const { state, actions } = useAppState();

  const [eventTitle, setEventTitle] = useState("Test Event");

  const selected = useMemo(
    () => state.events.find(e => e.id === state.selectedEventId),
    [state.events, state.selectedEventId]
  );

  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h2>Quick Control UI (Test)</h2>

      {/* Event create */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Event title"
        />
        <button
          onClick={() =>
            actions.addEvent(eventTitle, new Date().toISOString())
          }
        >
          Add Event (now)
        </button>
      </div>

      {/* Event list + select */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 600 }}>Events</div>
        {state.events.length === 0 && <div>No events yet.</div>}

        {state.events.map(e => (
          <div key={e.id} style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <button onClick={() => actions.selectEvent(e.id)}>
              {state.selectedEventId === e.id ? "Selected" : "Select"}
            </button>
            <div style={{ flex: 1 }}>
              {e.title} <span style={{ opacity: 0.7 }}>({e.dateTime})</span>
            </div>
            <button onClick={() => actions.deleteEvent(e.id)}>Delete</button>
          </div>
        ))}
      </div>

      <ToDoList />
      
      {/* Debug */}
      <details style={{ marginTop: 16 }}>
        <summary>Debug JSON</summary>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </details>
    </div>
  );
}
