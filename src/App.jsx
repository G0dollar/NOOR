import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Landing from "./pages/Landing";
import SeniorLayout from "./pages/senior/SeniorLayout";
import FamilyLayout from "./pages/family/FamilyLayout";
import OrganizerPage from "./pages/OrganizerPage";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/senior" element={<SeniorLayout />} />
          <Route path="/family" element={<FamilyLayout />} />
          <Route path="/organizer" element={<OrganizerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
