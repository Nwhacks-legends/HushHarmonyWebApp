import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MappedInPage from './components/MappedInPage';
import GoogleMapsPage from './components/GoogleMapsPage';



function App() {

  return (
    <BrowserRouter>
      <div className="sidebar">
        <ul>
          <li><Link to="/">MappedIn Page</Link></li>
          <li><Link to="/other">Other Page</Link></li>
        </ul>
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<MappedInPage />} />
          <Route path="/other" element={<GoogleMapsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
