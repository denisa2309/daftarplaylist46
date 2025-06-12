import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // jika ada
import DaftarPlaylist from "./pages/DaftarPlaylist/Index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DaftarPlaylist />} />
        <Route path="/tambah-playlist" element={<DaftarPlaylist />} />
      </Routes>
    </div>
  );
}

export default App;
