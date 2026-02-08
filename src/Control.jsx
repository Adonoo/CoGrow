import { useMemo, useState } from "react";
import { useAppState } from "./state/AppStateContext.jsx";
import { ToDoList } from "./Components/ToDo/ToDoList.jsx";
import { EventList } from "./Components/Event/EventList.jsx";
import { Navbar } from "./Components/Navbar/Navbar.jsx";
import { DebugJSON } from "./JSON.jsx";
import { StageSlider } from "./Components/StageSlider/StageSlider.jsx";
import { BudPlacer } from "./Components/BudPlacer/BudPlacer.jsx";

import stage0 from "./assets/stages/pflanze1.svg";
import stage1 from "./assets/stages/pflanze2.svg";
import stage2 from "./assets/stages/pflanze3.svg";
import stage3 from "./assets/stages/pflanze4.svg";
import stage4 from "./assets/stages/pflanze5.svg";

const STAGES = [stage0, stage1, stage2, stage3, stage4];

export function Control() {
  const { state, actions } = useAppState();

  const [eventTitle, setEventTitle] = useState("Test Event");

  const selected = useMemo(
    () => state.events.find(e => e.id === state.selectedEventId),
    [state.events, state.selectedEventId]
  );

  const stageIndex = Math.max(0, Math.min(STAGES.length - 1, state.stageIndex ?? 0));
  const plantSrc = STAGES[stageIndex];

  return (
    <>
      <h2>Events</h2>
      <StageSlider value={state.stageIndex ?? 0} onChange={actions.setStageIndex} max={4} />
      <EventList />
      <BudPlacer
        plantSrc={plantSrc}
        events={state.events}
        selectedEventId={state.selectedEventId}
        onPlace={(eventId, x, y) => actions.setBudPosition(eventId, x, y)}
      />
    </>
  );
}
