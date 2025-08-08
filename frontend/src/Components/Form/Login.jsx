import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { FcGoogle } from 'react-icons/fc'; // Google icon
// import logo from '../assets/bachatsathi-logo.png'; // Update path to your logo

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    method: "password" // 'password' or 'otp'
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.method === "password" && !formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.method === "otp" && !otp) {
      newErrors.otp = "OTP is required";
    }
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
        console.log("Login data:", formData.method === "otp" ? { email: formData.email, otp } : formData);
        navigate("/dashboard");
      } catch (error) {
        setErrors({ submit: "Login failed. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSendOtp = () => {
    if (!formData.email) {
      setErrors({ email: "Email is required to send OTP" });
      return;
    }
    // Simulate OTP sending
    setOtpSent(true);
    console.log("OTP sent to:", formData.email);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
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
              {/* <div className="flex justify-center mb-3">
                <img 
                  src={logo} 
                  alt="BachatSathi Logo" 
                  className="h-14 w-auto"
                />
              </div> */}
              <h1 className="text-2xl font-bold text-white">Welcome to <span className="text-amber-300">BachatSathi</span></h1>
              <p className="text-emerald-100 mt-1">Your smart savings companion</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Login Method Toggle */}
              <div className="flex border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, method: "password" }))}
                  className={`flex-1 py-2 font-medium ${
                    formData.method === "password"
                      ? "text-emerald-600 border-b-2 border-emerald-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Password
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, method: "otp" }))}
                  className={`flex-1 py-2 font-medium ${
                    formData.method === "otp"
                      ? "text-emerald-600 border-b-2 border-emerald-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  OTP Login
                </button>
              </div>

              {errors.submit && (
                <div className="p-3 bg-rose-50 text-rose-600 rounded-lg text-center">
                  {errors.submit}
                </div>
              )}

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

              {/* Password or OTP Field */}
              {formData.method === "password" ? (
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
                  <div className="text-right mt-2">
                    <button
                      type="button"
                      className="text-sm text-emerald-600 hover:underline"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="otp" className="block text-gray-700 mb-2 font-medium">
                    OTP
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className={`flex-1 p-3 bg-gray-50 border ${
                        errors.otp ? "border-rose-400" : "border-gray-200"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent`}
                      placeholder="Enter 6-digit OTP"
                      disabled={!otpSent}
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={otpSent}
                      className={`px-4 rounded-lg font-medium ${
                        otpSent
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      }`}
                    >
                      {otpSent ? "Sent" : "Get OTP"}
                    </button>
                  </div>
                  {errors.otp && (
                    <p className="mt-1 text-sm text-rose-600">{errors.otp}</p>
                  )}
                </div>
              )}

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
                    {formData.method === "otp" ? "Verifying..." : "Logging in..."}
                  </span>
                ) : (
                  formData.method === "otp" ? "Verify OTP" : "Login"
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Google Sign-In */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>
            </form>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-gray-600">
                New to BachatSathi?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
                >
                  Create account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;