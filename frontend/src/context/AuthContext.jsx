import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000";

  const verifyAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/profile`, { withCredentials: true });
      setUser(res.data.user);
      setIsAuthenticated(true);
      return { success: true, user: res.data.user };
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, error: "Not authenticated" };
    }
  }, []);

  useEffect(() => {
    const checkLoggedIn = async () => {
      console.log("AuthContext: useEffect - Running checkLoggedIn. Initial loading:", loading, "isAuthenticated:", isAuthenticated);
      setLoading(true);
      await verifyAuth();
      console.log("AuthContext: useEffect - checkLoggedIn complete. Final loading:", loading, "isAuthenticated:", isAuthenticated);
      setLoading(false);
    };
    checkLoggedIn();
  }, [verifyAuth]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/login`,
        { username, password },
        { withCredentials: true }
      );
      const authResult = await verifyAuth();
      setLoading(false);
      return authResult.success ? { success: true } : { success: false, error: "Login succeeded but profile fetch failed." };
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      const errorMessage = err.response?.data?.message || err.response?.data || "Login failed";
      if (err.response?.status === 401) {
        return { success: false, error: "Invalid username or password." };
      }
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (email, username, password) => {
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/register`,
        { email, username, password },
        { withCredentials: true }
      );
      const authResult = await verifyAuth();
      setLoading(false);
      return authResult.success ? { success: true } : { success: false, error: "Signup succeeded but profile fetch failed." };
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || "Signup failed";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.get(`${API_URL}/logout`, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed on server:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading }}>
      {!loading ? children : (
        null
      )}
    </AuthContext.Provider>
  );
};