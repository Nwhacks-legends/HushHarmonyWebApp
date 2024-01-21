import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from './components/LandingPage';
import MappedInPage from './components/MappedInPage';
import GoogleMapsPage from './components/GoogleMapsPage';
import MicrophonePage from './components/MicrophonePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mappedinview" element={<MappedInPage />} />
        <Route path="/googlemapview" element={<GoogleMapsPage />} />
        <Route path="/record" element ={<MicrophonePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
