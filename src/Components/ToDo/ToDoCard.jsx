import { useMemo, useState } from "react";
import "./ToDo.css";

export function TodoCard({ eventId, todo, actions }) {
const [subText, setSubText] = useState("");

return (
    <div className="todo-card-container">
        <div className="todo-main">
            <input
                className="todo-subtask-add-check"
                type="checkbox"
                checked={todo.done}
                onChange={() => actions.toggleTodo(eventId, todo.id)}
            />
            <div>
                <strong>{todo.text}</strong>
                <span>(weight: {todo.weight})</span>
            </div>
            <button className="todo-delete" onClick={() => actions.deleteTodo(eventId, todo.id)}>
            Delete Todo
            </button>
        </div>

        <div className="todo-subtask-add">
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

        <div className="todo-notes">
            <textarea
                value={todo.notes ?? ""}
                onChange={(e) => actions.setTodoNotes(eventId, todo.id, e.target.value)}
                placeholder="Notes..."
                rows={3}
            />
        </div>

        <div className="subtasks">
        {todo.subtasks.length > 0 && (
            <ul>
            {todo.subtasks.map(st => (
                <li key={st.id}>
                <input
                    type="checkbox"
                    checked={st.done}
                    onChange={() => actions.toggleSubtask(eventId, todo.id, st.id)}
                />
                <div>{st.text}</div>
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
    </div>
);
}
