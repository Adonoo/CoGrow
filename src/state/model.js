function id() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function randomBudStyle() {
  const n = 1 + Math.floor(Math.random() * 4);
  return `v${n}`;
}

function randomRotation() {
  return Math.floor(Math.random() * 360);
}

export function createEvent(title, day) {
  return {
    id: id(),
    title,
    day,
    bud: {
      x: Math.random(),
      y: Math.random(),
      style: randomBudStyle(),
      rot: randomRotation(),
    },
    todos: [],
  };
}

export function createTodo(text) {
  return {
    id: id(),
    text,
    done: false,
    weight: 1,
    notes: "",
    dueDay: null,
    subtasks: [],
  };
}

export function createSubtask(text) {
  return {
    id: id(),
    text,
    done: false,
  };
}
