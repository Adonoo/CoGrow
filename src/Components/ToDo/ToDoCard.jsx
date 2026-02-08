import { useEffect, useRef, useState } from "react";
import "./ToDo.css";

export function TodoCard({ eventId, todo, actions }) {
  const [subText, setSubText] = useState("");
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    if (!expanded) return;

    function handlePointerDown(e) {
      const cardEl = cardRef.current;
      if (!cardEl) return;

      // If click is outside the card -> collapse
      if (!cardEl.contains(e.target)) {
        setExpanded(false);
      }
    }

    // Use pointerdown/mousedown so it feels instant
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [expanded]);

  return (
    <div
      ref={cardRef}
      className={`todo-card-container ${expanded ? "is-expanded" : ""}`}
      onClick={() => setExpanded(true)}   // only expand (no toggle)
    >
      <div className="todo-main">
        <input
          className="todo-subtask-add-check"
          type="checkbox"
          checked={todo.done}
          onChange={() => actions.toggleTodo(eventId, todo.id)}
        />
        <div className="todo-title">{todo.text}</div>
        <button
          className="todo-delete button"
          onClick={() => actions.deleteTodo(eventId, todo.id)}
        >
          Delete Todo
        </button>
      </div>

      {expanded && (
        <>
          <div className="todo-notes">
            <textarea
              value={todo.notes ?? ""}
              onChange={(e) =>
                actions.setTodoNotes(eventId, todo.id, e.target.value)
              }
              placeholder="Notes..."
              rows={6}
            />
          </div>

          <div className="todo-subtask-add">
            <input
              value={subText}
              onChange={(e) => setSubText(e.target.value)}
              placeholder="New subtask..."
            />
            <button
            className="button"
              onClick={() => {
                actions.addSubtask(eventId, todo.id, subText);
                setSubText("");
              }}
            >
              Add Subtask
            </button>
          </div>

          {todo.subtasks.length > 0 && (
            <ul className="subtask-list">
              {todo.subtasks.map((st) => (
                <li key={st.id}>
                  <input
                    type="checkbox"
                    checked={st.done}
                    onChange={() =>
                      actions.toggleSubtask(eventId, todo.id, st.id)
                    }
                  />
                  <div>{st.text}</div>
                  <button
                  className="button"
                    onClick={() =>
                      actions.deleteSubtask(eventId, todo.id, st.id)
                    }
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
