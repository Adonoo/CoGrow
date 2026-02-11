import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAppState } from "./state/AppStateContext.jsx";
import "./App.css";

function formatDayDE(dayStr) {
  if (!dayStr) return "";
  const [y, m, d] = dayStr.split("-").map(Number);
  return `${d}.${m}.${y}`;
}

export default function App() {
  const { state, actions } = useAppState();
  const navigate = useNavigate();

  const nextEvent = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

    const upcoming = state.events
      .filter((e) => e.day >= today)
      .sort((a, b) => {
        if (a.day !== b.day) return a.day.localeCompare(b.day);
        return a.title.localeCompare(b.title);
      });

    return upcoming[0] ?? null;
  }, [state.events]);

  return (
    <>
    <div className="plan-event">
      Plant euer nächstes Event
      und wachst zusammen!
    </div>
    <div className="home-container">
      <div className="home-nextevent">
        {nextEvent ? (
          <>
          <div
            className="home-nextevent-card"
            onClick={() => {
              actions.selectEvent(nextEvent.id);
              navigate(`/events/${nextEvent.id}`);
            }}
          >
            <div className="home-nextevent-title">Nächstes Event</div>
            <div className="home-nextevent-infos">
              <div className="home-nextevent-date">{formatDayDE(nextEvent.day)}</div>
              <div className="home-nextevent-name">{nextEvent.title}</div>
            </div>
          </div>
          </>
        ) : (
          <div style={{ opacity: 0.7 }}>No upcoming events.</div>
        )}
      </div>

      <div className="home-other">
        <NavLink to="/calendar" className="home-other-1">
          Kalender
        </NavLink>
        <NavLink to="/control" className="home-other-2">
          Eventübersicht
        </NavLink>
      </div>
    </div>
    </>
  );
}
