import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address";
    if (formData.password.length < 8) newErrors.password = "Password must be 8+ characters";
    if (!/[A-Z]/.test(formData.password)) newErrors.password = "Include at least one uppercase letter";
    if (!/[0-9]/.test(formData.password)) newErrors.password = "Include at least one number";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Registration data:", formData);
        navigate("/verify-email");
      } catch (error) {
        setErrors({ submit: "Registration failed. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Advanced color palette
  const colors = {
    primary: {
      light: "#a7f3d0",
      DEFAULT: "#10b981",
      dark: "#059669"
    },
    secondary: {
      light: "#e9d5ff",
      DEFAULT: "#8b5cf6",
      dark: "#7c3aed"
    },
    accent: {
      light: "#fef08a",
      DEFAULT: "#f59e0b",
      dark: "#d97706"
    },
    dark: {
      light: "#6b7280",
      DEFAULT: "#1f2937",
      dark: "#111827"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Animated Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-emerald-500 rounded-xl blur opacity-25"></div>
          <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-center">
              <h1 className="text-3xl font-bold text-white">Join <span className="text-amber-300">BachatSathi</span></h1>
              <p className="text-emerald-100 mt-1">Your smart savings companion</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Role Selection */}
              <div>
                <label className="block text-gray-700 mb-3 font-medium">Register as:</label>
                <div className="grid grid-cols-2 gap-3">
                  {["user", "vendor"].map((role) => (
                    <div key={role} className="relative">
                      <input
                        type="radio"
                        id={role}
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor={role}
                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.role === role
                            ? "border-emerald-500 bg-emerald-50 shadow-md"
                            : "border-gray-200 hover:border-emerald-300"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${
                          formData.role === role
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-200 text-transparent"
                        }`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-medium capitalize">
                          {role === "user" ? "User" : "Vendor"}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          {role === "user" ? "Personal savings" : "Sell products"}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                {errors.role && (
                  <p className="mt-2 text-sm text-rose-600">{errors.role}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-gray-700 mb-2 font-medium">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 bg-gray-50 border ${
                      errors.username ? "border-rose-400" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent`}
                    placeholder="yourname"
                  />
                  <div className="absolute left-3 top-3.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-rose-600">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 bg-gray-50 border ${
                      errors.email ? "border-rose-400" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent`}
                    placeholder="you@example.com"
                  />
                  <div className="absolute left-3 top-3.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-rose-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 bg-gray-50 border ${
                      errors.password ? "border-rose-400" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  <div className="absolute left-3 top-3.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-rose-600">{errors.password}</p>
                )}
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[
                    { label: "8+ chars", valid: formData.password.length >= 8 },
                    { label: "1 uppercase", valid: /[A-Z]/.test(formData.password) },
                    { label: "1 number", valid: /[0-9]/.test(formData.password) },
                    { label: "Match", valid: formData.password === formData.confirmPassword && formData.password !== "" }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className={`h-1 rounded-full mb-1 ${
                        item.valid ? "bg-emerald-400" : "bg-gray-200"
                      }`}></div>
                      <p className={`text-xs ${
                        item.valid ? "text-emerald-600" : "text-gray-400"
                      }`}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full p-3 pl-10 bg-gray-50 border ${
                      errors.confirmPassword ? "border-rose-400" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  <div className="absolute left-3 top-3.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-rose-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all shadow-md ${
                  isSubmitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Create ${formData.role === "vendor" ? "Business" : "Personal"} Account`
                )}
              </button>

              {errors.submit && (
                <div className="mt-3 p-3 bg-rose-50 text-rose-600 rounded-lg text-center">
                  {errors.submit}
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;