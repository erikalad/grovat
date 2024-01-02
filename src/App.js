import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Menu from "./Componentes/Menu"
import Login from "./Contenedores/Login";

function App() {

  const ProtectedRoute = ({ element }) => {
    const isLoggedIn = localStorage.getItem("username") && localStorage.getItem("password");
    return isLoggedIn ? element : <Navigate to="/" />;
  };

  useEffect(() => {
    localStorage.removeItem("invitacionesData");
  }, []);


  return (
<div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Menu />}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
