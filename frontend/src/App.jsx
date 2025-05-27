import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, loading } = useAuth(); 
  const location = useLocation();
   console.log(`App.jsx: loading=${loading}, isAuthenticated=${isAuthenticated}, path=${location.pathname}`);

  if (loading) {
    return null; 
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route
        path="/home"
        element={
          isAuthenticated ? (
            <Home />
          ) : ( 
            <Navigate to="/auth" state={{ from: location }} replace />
          )
        }
      />

      <Route
        path="/profile"
        element={
          isAuthenticated ? ( 
            <Profile />
          ) : (
            <Navigate to="/auth" state={{ from: location }} replace />
          )
        }
      />

      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace /> 
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;