import { useEffect, useMemo, useState } from "react";
import { AppStateContext } from "./AppStateContext.jsx";
import { loadState, saveState } from "./persist.js";
import { createEvent, createTodo, createSubtask } from "./model.js";
import { broadcastState, subscribeToState } from "./sync.js";

export function AppStateProvider({ children }) {
  const [state, setState] = useState(() => loadState());

  const isDisplay = window.location.pathname.startsWith("/display");

  // Persistenz: bei jeder State-Änderung speichern
  useEffect(() => {
    if (isDisplay) return;
    saveState(state);
  }, [state, isDisplay]);

  // Übertragung
  useEffect(() => {
    if (isDisplay) return;
    broadcastState(state);
  }, [state, isDisplay]);

  // Subscribe Effect
  useEffect(() => {
    if (!isDisplay) return;

    const unsubscribe = subscribeToState((incomingState) => {
      setState(incomingState);
    });

    return unsubscribe;
  }, [isDisplay]);

  const actions = useMemo(() => {
    return {
      addEvent(title, day) {
        const t = title.trim();
        if (!t) return;
        if (!day) return; // require a selected day: "YYYY-MM-DD"

        const event = createEvent(t, day);

        setState((prev) => ({
          ...prev,
          selectedEventId: event.id,
          events: [...prev.events, event],
        }));
      },

      selectEvent(eventId) {
        setState((prev) => ({ ...prev, selectedEventId: eventId }));
      },

      deleteEvent(eventId) {
        setState((prev) => {
          const remaining = prev.events.filter((e) => e.id !== eventId);

          // selectedEventId sinnvoll nachziehen
          const nextSelected =
            prev.selectedEventId === eventId
              ? remaining[0]?.id ?? null
              : prev.selectedEventId;

          return {
            ...prev,
            events: remaining,
            selectedEventId: nextSelected,
          };
        });
      },

      addTodo(eventId, text) {
        const t = text.trim();
        if (!t) return;

        const todo = createTodo(t);

        setState((prev) => ({
          ...prev,
          events: prev.events.map((e) =>
            e.id !== eventId ? e : { ...e, todos: [...e.todos, todo] }
          ),
        }));
      },

      toggleTodo(eventId, todoId) {
        setState((prev) => ({
          ...prev,
          events: prev.events.map((e) => {
            if (e.id !== eventId) return e;
            return {
              ...e,
              todos: e.todos.map((td) =>
                td.id !== todoId ? td : { ...td, done: !td.done }
              ),
            };
          }),
        }));
      },

      setTodoNotes(eventId, todoId, notes) {
        setState((prev) => ({
          ...prev,
          events: prev.events.map((e) => {
            if (e.id !== eventId) return e;
            return {
              ...e,
              todos: e.todos.map((td) =>
                td.id !== todoId ? td : { ...td, notes }
              ),
            };
          }),
        }));
      },

      deleteTodo(eventId, todoId) {
        setState((prev) => ({
          ...prev,
          events: prev.events.map((e) => {
            if (e.id !== eventId) return e;
            return {
              ...e,
              todos: e.todos.filter((td) => td.id !== todoId),
            };
          }),
        }));
      },

      addSubtask(eventId, todoId, text) {
        const t = text.trim();
        if (!t) return;

        const sub = createSubtask(t);

        setState((prev) => ({
          ...prev,
          events: prev.events.map((e) => {
            if (e.id !== eventId) return e;
            return {
              ...e,
              todos: e.todos.map((td) =>
                td.id !== todoId
                  ? td
                  : { ...td, subtasks: [...td.subtasks, sub] }
              ),
            };
          }),
        }));
      },

      toggleSubtask(eventId, todoId, subtaskId) {
        setState((prev) => ({
          ...prev,
          events: prev.events.map((e) => {
            if (e.id !== eventId) return e;
            return {
              ...e,
              todos: e.todos.map((td) => {
                if (td.id !== todoId) return td;
                return {
                  ...td,
                  subtasks: td.subtasks.map((st) =>
                    st.id !== subtaskId ? st : { ...st, done: !st.done }
                  ),
                };
              }),
            };
          }),
        }));
      },

      deleteSubtask(eventId, todoId, subtaskId) {
        setState((prev) => ({
          ...prev,
          events: prev.events.map((e) => {
            if (e.id !== eventId) return e;
            return {
              ...e,
              todos: e.todos.map((td) => {
                if (td.id !== todoId) return td;
                return {
                  ...td,
                  subtasks: td.subtasks.filter((st) => st.id !== subtaskId),
                };
              }),
            };
          }),
        }));
      },
    };
  }, []);

  return (
    <AppStateContext.Provider value={{ state, actions }}>
      {children}
    </AppStateContext.Provider>
  );
}
