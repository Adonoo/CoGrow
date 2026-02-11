/**
 * @typedef {{ id: string, text: string, done: boolean }} Subtask
 *
 * @typedef {{
 *   id: string,
 *   text: string,
 *   done: boolean,
 *   weight: number,
 *   notes: string,
 *   dueDay: string | null,   // "YYYY-MM-DD" or null
 *   subtasks: Subtask[]
 * }} Todo
 *
 * @typedef {{ x: number, y: number, style: string, rot: number }} Bud
 *
 * @typedef {{
 *   id: string,
 *   title: string,
 *   day: string,             // "YYYY-MM-DD"
 *   bud: Bud,
 *   todos: Todo[]
 * }} Event
 *
 * @typedef {{
 *   version: number,
 *   currentTime: string,
 *   selectedEventId: string | null,
 *   events: Event[]
 * }} AppState
 */
export {};
