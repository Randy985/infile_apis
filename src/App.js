import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Ping from "./components/Ping";
import Profile from "./components/Profile";
import UploadCV from "./components/UploadCV";
import ShowCV from "./components/ShowCV";

function App() {
  const isLoggedIn = localStorage.getItem("token"); // Checar si hay un token guardado

  return (
    <Router>
      <div>
        <Routes>
          {/* Si el usuario no está logueado, lo redirigimos al login */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/ping" element={<Ping />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/upload-cv" element={isLoggedIn ? <UploadCV /> : <Navigate to="/login" />} />
          <Route path="/show-cv" element={isLoggedIn ? <ShowCV /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
