import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import EditorLayout from "./layouts/EditorLayout";

import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Generation from "./pages/Generation";
import Voices from "./pages/Voices";
import Assets from "./pages/Assets";
import Settings from "./pages/Settings";
import { VoiceProvider } from "./context/VoiceContext";

function App() {
  return (
    <BrowserRouter>
    <VoiceProvider>

      <Routes>

        {/* Dashboard */}

        <Route element={<DashboardLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/create" element={<Create />} />

          <Route path="/projects" element={<Projects />} />

          <Route path="/voices" element={<Voices />} />

          <Route path="/assets" element={<Assets />} />

          <Route path="/settings" element={<Settings />} />

        </Route>

        {/* Editor */}

        <Route element={<EditorLayout />}>

          <Route
            path="/generation/:projectId"
            element={<Generation />}
          />

          <Route
            path="/project/:id"
            element={<Project />}
          />

        </Route>

      </Routes>
      </VoiceProvider>
    </BrowserRouter>
  );
}

export default App;