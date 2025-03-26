import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";

export default function AuthStoryboard() {
  const [showLogin, setShowLogin] = React.useState(true);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setShowLogin(true)}
          className={`px-4 py-2 rounded-lg ${showLogin ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Login Page
        </button>
        <button
          onClick={() => setShowLogin(false)}
          className={`px-4 py-2 rounded-lg ${!showLogin ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Signup Page
        </button>
      </div>

      <BrowserRouter>
        <AuthProvider>
          {showLogin ? <LoginPage /> : <SignupPage />}
        </AuthProvider>
      </BrowserRouter>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 max-w-md">
        <p className="font-medium">Important:</p>
        <p className="mt-1">
          To use authentication, you need to set up Supabase credentials in your
          environment variables:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>VITE_SUPABASE_URL</li>
          <li>VITE_SUPABASE_ANON_KEY</li>
        </ul>
      </div>
    </div>
  );
}
