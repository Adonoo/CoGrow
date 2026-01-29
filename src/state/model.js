import { createId } from "./ids.js";

export function createEvent(title, dateTimeISO) {
    return {
        id: createId(),
        title: title.trim(),
        dateTime: dateTimeISO,
        bud: {x: Math.random(), y: Math.random(), style: "default"},
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

