import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "../App";

export function ProjectRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/control" element={<App />} />
                <Route path="/display" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}