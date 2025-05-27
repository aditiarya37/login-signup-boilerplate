import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) { 
    return <div className="text-center text-gray-200 mt-10">Loading authentication status...</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-200 mt-10">User not found. Please login.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700 px-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Profile</h2>
        <div className="mb-4">
          <div className="mb-2">
            <span className="font-semibold text-gray-200">Username: </span>
            <span className="text-gray-200">{user.username}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-200">Email: </span>
            <span className="text-gray-200">{user.email}</span>
          </div>
        </div>
        <Link
          to="/home"
          className="block w-full bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}