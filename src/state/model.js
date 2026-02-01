import { createId } from "./ids.js";

export function createEvent(title, day) {
  return {
    id: createId(),
    title: title.trim(),
    day: day, // "YYYY-MM-DD"
    bud: { x: Math.random(), y: Math.random(), style: "default" },
    todos: [],
  };
}

export function createTodo(text) {
  return {
    id: createId(),
    text: text.trim(),
    done: false,
    weight: 1,
    notes: "",
    dueDay: null, // "YYYY-MM-DD" or null
    subtasks: [],
  };
}

export function createSubtask(text) {
  return {
    id: createId(),
    text: text.trim(),
    done: false,
  };
}
