import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAppState } from "../../state/AppStateContext";
import { TodoCard } from "./ToDoCard";

export function ToDoList() {
  const { state, actions } = useAppState();
  const { eventId } = useParams();
  const [todoText, setTodoText] = useState("");

  // Optional but nice: keep your selectedEventId in sync with the URL
  useEffect(() => {
    if (eventId) actions.selectEvent(eventId);
  }, [eventId]);

  const selected = useMemo(
    () => state.events.find((e) => e.id === eventId),
    [state.events, eventId]
  );

  const todos = selected?.todos ?? [];

  return (
    <div className="todo-list">
      {selected ? (
        <div className="todo-add">
          <div className="todo-select-title">Selected: {selected.title}</div>

          <div className="todo-add-controls">
            <input
              className="text-input"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="New todo..."
            />
            <button
              className="button"
              onClick={() => {
                actions.addTodo(selected.id, todoText);
                setTodoText("");
              }}
              disabled={!todoText.trim()}
            >
              Add Todo
            </button>
          </div>

          {todos.length === 0 ? (
            <div className="todo-notodos">No todos yet.</div>
          ) : (
            todos.map((todo) => (
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
        <div className="todo-noselect">Event not found.</div>
      )}
    </div>
  );
}
