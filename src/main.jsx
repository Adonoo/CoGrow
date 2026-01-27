import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectRoutes } from './Routes/ProjectRoutes.jsx'
import { AppStateProvider } from './state/AppStateProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppStateProvider>
      <ProjectRoutes />
    </AppStateProvider>
  </StrictMode>,
)
