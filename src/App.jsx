import { useMemo, useState } from "react";
import { useAppState } from "./state/AppStateContext.jsx";

export default function App() {
  const { state, actions } = useAppState();

  const [eventTitle, setEventTitle] = useState("Test Event");
  const [todoText, setTodoText] = useState("");

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

      {/* Selected event detail */}
      {selected ? (
        <div style={{ borderTop: "1px solid #ddd", paddingTop: 12 }}>
          <h3>Selected: {selected.title}</h3>

          {/* Todo create */}
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="New todo..."
            />
            <button
              onClick={() => {
                actions.addTodo(selected.id, todoText);
                setTodoText("");
              }}
            >
              Add Todo
            </button>
          </div>

          {/* Todo list */}
          {selected.todos.length === 0 ? (
            <div>No todos yet.</div>
          ) : (
            selected.todos.map(todo => (
              <TodoCard
                key={todo.id}
                eventId={selected.id}
                todo={todo}
                actions={actions}
              />
            ))
          )}
        </div>
      ) : (
        <div style={{ borderTop: "1px solid #ddd", paddingTop: 12 }}>
          Select an event to manage todos.
        </div>
      )}

      {/* Debug */}
      <details style={{ marginTop: 16 }}>
        <summary>Debug JSON</summary>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </details>
    </div>
  );
}

function TodoCard({ eventId, todo, actions }) {
  const [subText, setSubText] = useState("");

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
      }}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => actions.toggleTodo(eventId, todo.id)}
        />
        <div style={{ flex: 1 }}>
          <strong>{todo.text}</strong>{" "}
          <span style={{ opacity: 0.7 }}>(weight: {todo.weight})</span>
        </div>
        <button onClick={() => actions.deleteTodo(eventId, todo.id)}>
          Delete Todo
        </button>
      </div>

      {/* Subtask create */}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input
          value={subText}
          onChange={(e) => setSubText(e.target.value)}
          placeholder="New subtask..."
        />
        <button
          onClick={() => {
            actions.addSubtask(eventId, todo.id, subText);
            setSubText("");
          }}
        >
          Add Subtask
        </button>
      </div>

      {/* Subtask list */}
      {todo.subtasks.length > 0 && (
        <ul style={{ marginTop: 8 }}>
          {todo.subtasks.map(st => (
            <li key={st.id} style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <input
                type="checkbox"
                checked={st.done}
                onChange={() => actions.toggleSubtask(eventId, todo.id, st.id)}
              />
              <div style={{ flex: 1 }}>{st.text}</div>
              <button
                onClick={() => actions.deleteSubtask(eventId, todo.id, st.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
