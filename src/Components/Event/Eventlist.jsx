import { useMemo, useState } from "react";
import { useAppState } from "../../state/AppStateContext";
import { EventCard } from "./Eventcard";
import "./Event.css";

export function EventList() {
  const { state, actions } = useAppState();
  const [eventTitle, setEventTitle] = useState("");
  const [eventDay, setEventDay] = useState("");

  const sortedEvents = useMemo(() => {
    return [...state.events].sort((a, b) => a.day.localeCompare(b.day));
  }, [state.events]);

  return (
    <div className="event-list">
      <div className="event-add">
        <div className="event-add-controls">
          <input
            className="text-input"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="New event title..."
          />

          <input
            className="text-input"
            type="date"
            value={eventDay}
            onChange={(e) => setEventDay(e.target.value)}
          />

          <button
            className="button"
            onClick={() => {
              actions.addEvent(eventTitle, eventDay);
              setEventTitle("");
              setEventDay("");
            }}
            disabled={!eventTitle.trim() || !eventDay}
          >
            Add Event
          </button>
        </div>

        {sortedEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            selectedEventId={state.selectedEventId}
            actions={actions}
          />
        ))}
      </div>
    </div>
  );
}
