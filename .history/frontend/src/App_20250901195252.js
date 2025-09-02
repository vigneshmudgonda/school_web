import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddSchool from "./pages/AddSchool";
import ShowSchools from "./pages/ShowSchools";

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/add">Add School</Link>
        <Link to="/show">Show Schools</Link>
      </nav>
      <Routes>
        <Route path="/add" element={<AddSchool />} />
        <Route path="/show" element={<ShowSchools />} />
      </Routes>
    </Router>
  );
};

export default App;
