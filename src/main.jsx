import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { ProjectRoutes } from "./Routes/ProjectRoutes.jsx";
import { AppStateProvider } from "./state/AppStateProvider.jsx";
import { Navbar } from "./Components/Navbar/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppStateProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container">
          <ProjectRoutes />
        </main>
      </BrowserRouter>
    </AppStateProvider>
  </StrictMode>
);
