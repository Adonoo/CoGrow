import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./Event.css";

function timeUntilDay(dayStr) {
  // "YYYY-MM-DD"
  const [y, m, d] = dayStr.split("-").map(Number);

  const target = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target - today) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > 1) return `in ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
}

function formatDayDE(dayStr) {
  // "YYYY-MM-DD" -> "DD.MM.YYYY"
  if (!dayStr) return "";
  const [y, m, d] = dayStr.split("-");
  return `${d}.${m}.${y}`;
}


export function EventCard({ event, selectedEventId, actions }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!expanded) return;

    function handlePointerDown(e) {
      const cardEl = cardRef.current;
      if (!cardEl) return;
      if (!cardEl.contains(e.target)) setExpanded(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [expanded]);

  const isSelected = selectedEventId === event.id;
  const todoCount = event.todos?.length ?? 0;

  return (
    <div
      ref={cardRef}
      className={`event-card-container ${expanded ? "is-expanded" : ""}`}
      onClick={() => setExpanded(true)}
    >
      <div className="event-main">
        <button
          className="button"
          onClick={(e) => {
            e.stopPropagation();
            actions.selectEvent(event.id);
            navigate(`/events/${event.id}`);
          }}
        >
          {isSelected ? "Open" : "Select"}
        </button>

        <div className="event-title">
          {event.title} 
          <span style={{ opacity: 0.7 }}>
              {formatDayDE(event.day)} ({timeUntilDay(event.day)})
          </span>
        </div>

        <button
          className="event-delete button"
          onClick={(e) => {
            e.stopPropagation();
            actions.deleteEvent(event.id);
          }}
        >
          Delete Event
        </button>
      </div>

      {expanded && (
        <div className="event-details">
          <div>
            <strong>When:</strong>{" "}
            <span style={{ opacity: 0.7 }}>
              {formatDayDE(event.day)} ({timeUntilDay(event.day)})
            </span>
          </div>
          <div>
            <strong>Todos:</strong>{" "}
            <span style={{ opacity: 0.7 }}>{todoCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
