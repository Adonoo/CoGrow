export function getTodoProgress(event) {
    const total = event.todos.length;
    if (total === 0) return 0;

    const done = event.todos.filter(t => t.done).length;
    return done / total;
}