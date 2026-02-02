import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "../App";
import { Control } from "../Control";
import { Display } from "../Display";
import { ToDoList } from "../Components/ToDo/ToDoList";
import { DebugJSON } from "../JSON";
import { Calendar } from "../Calendar";
import { Plant } from "../Components/Plant/Plant";

export function ProjectRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/control" element={<Control />} />
            <Route path="/events/:eventId" element={<ToDoList />} />
            <Route path="/display" element={<Display />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/json" element={<DebugJSON />} />
            <Route path="/plant" element={<Plant />} />
        </Routes>
    )
}