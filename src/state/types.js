/**
 * @typedef {{ id: string, text: string, done: boolean }} Subtask
 *
 * @typedef {{
 *   id: string,
 *   text: string,
 *   done: boolean,
 *   weight: number,
 *   subtasks: Subtask[]
 * }} Todo
 *
 * @typedef {{ x: number, y: number, style: string }} Bud
 *
 * @typedef {{
 *   id: string,
 *   title: string,
 *   dateTime: string, // ISO string
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
