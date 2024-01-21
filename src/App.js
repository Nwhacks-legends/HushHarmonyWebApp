import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MappedInPage from './components/MappedInPage';
import GoogleMapsPage from './components/GoogleMapsPage';

function App() {

  return (
    <BrowserRouter>
      <div className="sidebar">
        <ul>
          <li><Link to="/mappedin">MappedIn Page</Link></li>
          <li><Link to="/overlay">Google Maps Overlay</Link></li>
        </ul>
      </div>

      <div className="content">
        <Routes>
          <Route path="/mappedin" element={<MappedInPage />} />
          <Route path="/overlay" element={<GoogleMapsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
