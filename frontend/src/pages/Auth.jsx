import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();

  const from = location.state?.from?.pathname || "/home";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setForm({ email: "", username: "", password: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setError("");
    let result;

    try {
      if (isLogin) {
        result = await login(form.username, form.password);
      } else {
        result = await signup(form.email, form.username, form.password);
      }

      if (result && result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || "An unexpected error occurred.");
      }
    } catch (err) {
      setError("A critical error occurred. Please try again.");
      console.error("Submit error in Auth.jsx:", err);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700 dark:bg-gray-900 px-4 transition-colors">
      <div className="w-full max-w-md bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl text-white font-bold mb-6 text-center dark:text-gray-100">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-1 dark:text-gray-300" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 placeholder:text-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:border-blue-400"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1 dark:text-gray-300" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded placeholder:text-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:border-blue-400"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-1 dark:text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 placeholder:text-gray-700 dark:text-gray-100 focus:outline-none focus:ring focus:border-blue-400"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loadingSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition disabled:opacity-50"
          >
            {loadingSubmit ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>
        <div className="mt-4 text-center">
          {isLogin ? (
            <>
              <span className="text-gray-200 dark:text-gray-300">Don't have an account? </span>
              <button className="text-blue-400 hover:underline" onClick={handleToggle} disabled={loadingSubmit}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-200 dark:text-gray-300">Already have an account? </span>
              <button className="text-blue-400 hover:underline" onClick={handleToggle} disabled={loadingSubmit}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}