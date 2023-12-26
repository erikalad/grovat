import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Componentes/Home";
import Metricas from "./Componentes/Metricas"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/metricas" element={<Metricas/>} />
      </Routes>
    </div>
  );
}

export default App;
