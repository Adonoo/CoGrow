import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "../App";
import { Control } from "../Control";
import { Display } from "../Display";

export function ProjectRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/control" element={<Control />} />
                <Route path="/display" element={<Display />} />
            </Routes>
        </BrowserRouter>
    )
}