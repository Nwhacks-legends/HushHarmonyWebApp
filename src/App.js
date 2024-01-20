import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MappedInPage from './MappedInPage';



function App() {

  return (
    <BrowserRouter>
    <Link to="/">Basic</Link>
    <Routes>
      <Route path="/" element={<MappedInPage />} />
    </Routes>
  </BrowserRouter>
    

  );
}

export default App;
