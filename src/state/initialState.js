export const STATE_VERSION = 1;

export function createInitialState() {
    return {
        version: STATE_VERSION,
        currentTime: new Date().toISOString(),
        selectedEventId: null,
        events: [],
    };
}