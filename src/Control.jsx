import { useMemo, useState } from "react";
import { useAppState } from "./state/AppStateContext.jsx";
import { ToDoList } from "./Components/ToDo/ToDoList.jsx";
import { EventList } from "./Components/Event/EventList.jsx";
import { Navbar } from "./Components/Navbar/Navbar.jsx";
import { DebugJSON } from "./JSON.jsx";

export function Control() {
  const { state, actions } = useAppState();

  const [eventTitle, setEventTitle] = useState("Test Event");

  const selected = useMemo(
    () => state.events.find(e => e.id === state.selectedEventId),
    [state.events, state.selectedEventId]
  );

  return (
    <>
      <h2>Events</h2>
      
      <EventList />
    </>
  );
}
