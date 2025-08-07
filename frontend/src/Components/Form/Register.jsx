import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
// import logo from '../assets/bachatsathi-logo.png'; // Update path to your logo

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user" // Default role
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.password.length < 8) newErrors.password = "Password must be 8+ characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (!["user", "vendor"].includes(formData.role)) newErrors.role = "Invalid role";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Registration data:", formData);
      navigate("/verify-email");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-6">
          {/* <div className="flex justify-center mb-3">
            <img 
              src={logo} 
              alt="BachatSathi Logo" 
              className="h-16 w-auto"
            />
          </div> */}
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Join BachatSathi</h1>
          <p className="text-gray-600">Your smart savings companion</p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#f0fff4] p-6 rounded-xl shadow-lg border border-green-100"
        >
          {/* Role Selection */}
          <div className="mb-5">
            <label className="block text-gray-700 mb-2">I am a:</label>
            <div className="flex gap-4">
              <label className="flex-1">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className={`p-3 border rounded-lg text-center cursor-pointer ${
                  formData.role === "user" 
                    ? "bg-green-500 text-white border-green-500" 
                    : "bg-white border-green-200 hover:border-green-300"
                }`}>
                  Regular User
                </div>
              </label>
              <label className="flex-1">
                <input
                  type="radio"
                  name="role"
                  value="vendor"
                  checked={formData.role === "vendor"}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className={`p-3 border rounded-lg text-center cursor-pointer ${
                  formData.role === "vendor" 
                    ? "bg-green-500 text-white border-green-500" 
                    : "bg-white border-green-200 hover:border-green-300"
                }`}>
                  Business Vendor
                </div>
              </label>
            </div>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-3 bg-white border ${
                errors.username ? "border-red-300" : "border-green-200"
              } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 bg-white border ${
                errors.email ? "border-red-300" : "border-green-200"
              } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 bg-white border ${
                errors.password ? "border-red-300" : "border-green-200"
              } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 bg-white border ${
                errors.confirmPassword ? "border-red-300" : "border-green-200"
              } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-md"
          >
            Create {formData.role === "vendor" ? "Vendor" : "User"} Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-600 hover:underline font-medium"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;