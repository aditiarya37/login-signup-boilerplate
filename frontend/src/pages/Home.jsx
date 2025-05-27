import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-700 px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl text-white font-bold mb-4">Welcome!</h1>
        <p className="mb-6 text-gray-200">
          This is the Home page. You are logged in.
        </p>
        <div className="flex flex-col gap-4">
          <Link
            to="/profile"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Go to Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full font-bold bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
