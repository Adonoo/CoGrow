import { createInitialState } from "./initialState";

 export const KEY = "cogrow_state_v1";

 export function saveState(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
 }

 export function loadState() {
    const raw = localStorage.getItem(KEY);
    if (!raw) return createInitialState();

    try {
        const parsed = JSON.parse(raw);

        return parsed;
    } catch {
        return createInitialState();
    }
 }