import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useAppState } from "./state/AppStateContext";
import { EventCard } from "./Components/Event/Eventcard";

import "./Calendar.css";

function formatDayDE(dayStr) {
  if (!dayStr) return "";
  const [y, m, d] = dayStr.split("-").map(Number);
  return `${d}.${m}.${y}`;
}

export function Calendar() {
  const { state, actions } = useAppState();
  const navigate = useNavigate();

  const todayKey = new Date().toISOString().slice(0, 10);
  const [selectedDay, setSelectedDay] = useState(todayKey);

  const [eventTitle, setEventTitle] = useState("");

  const calendarEvents = useMemo(() => {
    return state.events.map((e) => ({
      id: e.id,
      title: e.title,
      date: e.day,
    }));
  }, [state.events]);

  const eventsForSelectedDay = useMemo(() => {
    return state.events
      .filter((e) => e.day === selectedDay)
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [state.events, selectedDay]);

  function handleAddEvent() {
    if (!eventTitle.trim()) return;
    actions.addEvent(eventTitle, selectedDay);
    setEventTitle("");
  }

  return (
    <div className="calendar-container">
      <div className="calendar-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          dateClick={(info) => setSelectedDay(info.dateStr)} // "YYYY-MM-DD"
          eventClick={(info) => {
            const eventId = info.event.id;
            actions.selectEvent(eventId);
            navigate(`/events/${eventId}`);
          }}
          height="auto"
          firstDay={1}
        />
      </div>

      <div className="calendar-events">
        <h3>Events on {formatDayDE(selectedDay)}</h3>

        {eventsForSelectedDay.length === 0 ? (
          <div className="calendar-noevents" style={{ opacity: 0.7 }}>
            No events on this day.
          </div>
        ) : (
          <div className="calendar-eventcards">
            {eventsForSelectedDay.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                selectedEventId={state.selectedEventId}
                actions={actions}
              />
            ))}
          </div>
        )}

        {/* Add event for selected day */}
        <div className="event-add-controls">
          <input
            className="text-input"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder={`New event for ${formatDayDE(selectedDay)}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddEvent();
            }}
          />

          <button
            className="button"
            onClick={handleAddEvent}
            disabled={!eventTitle.trim()}
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
}
