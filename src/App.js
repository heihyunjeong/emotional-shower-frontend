import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";


import Experimental from "./pages/experimental";
// pre-login
import Onboarding from "./pages/onboarding";
import Welcome from "./pages/welcome";
import EasyLogIn from "./pages/easyLogIn";
import Terms from "./pages/terms";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          {/* Welcome screen */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/easylogin" element={<EasyLogIn />} />
          <Route path="/experimental" element={<Experimental />} />
          <Route path="/terms" element={<Terms />} />
          {/* Redirect all other paths to /welcome */}
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
