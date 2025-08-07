import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';

// Import your logo (replace with actual path)
// import logo from '../assets/bachatsathi-logo.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log("Logging in with:", { email, password });
      navigate("/dashboard");
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          {/* <div className="flex justify-center mb-4">
            <img 
              src={logo} 
              alt="BachatSathi Logo" 
              className="h-16 w-auto" // Adjust size as needed
            />
          </div> */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to BachatSathi</h1>
          <p className="text-gray-600">Your smart savings companion</p>
        </div>

        {/* Login Form */}
        <form 
          onSubmit={handleSubmit}
          className="bg-[#f0fff4] p-8 rounded-xl shadow-lg border border-green-100"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white border border-green-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="user@example.com"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white border border-green-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-md"
          >
            Login
          </button>

          {/* OTP Login Option */}
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-green-600 hover:underline"
              onClick={() => navigate("/login/otp")}
            >
              Login with OTP instead
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600">
          New to BachatSathi?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-green-600 hover:underline font-medium"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;