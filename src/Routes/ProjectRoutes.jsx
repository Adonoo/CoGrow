import React from "react";
import { Routes, Route, Outlet } from "react-router";
import { Navbar } from "../Components/Navbar/Navbar.jsx";

import App from "../App";
import { Control } from "../Control";
import { Display } from "../Display";
import { ToDoList } from "../Components/ToDo/ToDoList";
import { DebugJSON } from "../JSON";
import { Calendar } from "../Calendar";
import { Plant } from "../Components/Plant/Plant";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

function DisplayLayout() {
  return (
    <main className="display-shell">
      <Outlet />
    </main>
  );
}

export function ProjectRoutes() {
  return (
    <Routes>
      {/* DISPLAY: no navbar, no container */}
      <Route element={<DisplayLayout />}>
        <Route path="/display" element={<Display />} />
      </Route>

      {/* EVERYTHING ELSE: has navbar + container */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/control" element={<Control />} />
        <Route path="/events/:eventId" element={<ToDoList />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/json" element={<DebugJSON />} />
        <Route path="/plant" element={<Plant />} />
      </Route>
    </Routes>
  );
}
