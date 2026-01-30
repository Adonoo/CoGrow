import { useMemo, useState } from "react";
import { useAppState } from "../../state/AppStateContext";
import { TodoCard } from "./ToDoCard";

export function ToDoList() {
  const { state, actions } = useAppState();
  const [todoText, setTodoText] = useState("");

  const selected = useMemo(
    () => state.events.find((e) => e.id === state.selectedEventId),
    [state.events, state.selectedEventId]
  );

  // Always safe: if no event is selected, todos is an empty array
  const todos = selected?.todos ?? [];

  return (
    <div className="todo-list">
      {selected ? (
        <div className="todo-add">
          <div className="todo-select-title">Selected: {selected.title}</div>

          {/* Todo create */}
          <div className="todo-add-controls">
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
        <div className="todo-noselect">Select an event to manage todos.</div>
      )}
    </div>
  );
}
