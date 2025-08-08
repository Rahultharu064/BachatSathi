import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Eye, EyeOff, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginThunk, sendOtpThunk, verifyOtpThunk } from '../../Redux/slices/authSlice.js';
import { useNavigate ,Link } from 'react-router-dom';

const LoginPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ''
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateOtp = (otp) => {
    return /^\d{4,6}$/.test(otp);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (showOtpField && !formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (showOtpField && !validateOtp(formData.otp)) {
      newErrors.otp = 'OTP must be 4-6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid for login
  const isFormValid = () => {
    const emailValid = validateEmail(formData.email);
    const passwordValid = validatePassword(formData.password);
    const otpValid = showOtpField ? validateOtp(formData.otp) : true;
    
    return emailValid && passwordValid && otpValid;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For OTP, only allow numbers
    if (name === 'otp' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle Send OTP
  const handleSendOtp = async () => {
    // Validate email first
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address to send OTP' });
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSendingOtp(true);
    
    try {
      // If password is present and valid, log in first (backend auto-sends OTP)
      const hasPassword = !!formData.password;
      const passwordOk = hasPassword && validatePassword(formData.password);
      if (passwordOk) {
        await dispatch(loginThunk({ email: formData.email, password: formData.password })).unwrap();
        toast.success('OTP sent after login');
      } else {
        // Send OTP directly (for existing users)
        await dispatch(sendOtpThunk({ email: formData.email })).unwrap();
        toast.success('OTP sent to your email');
      }
      setShowOtpField(true);
      setOtpSent(true);
    } catch (error) {
      // Error handled in thunk
      console.error('Send OTP error:', error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);
    
    try {
      await dispatch(loginThunk({ email: formData.email, password: formData.password })).unwrap();
      setShowOtpField(true);
      setOtpSent(true);
    } catch (error) {
      // toast handled in thunk
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!validateOtp(formData.otp)) {
      setErrors((prev) => ({ ...prev, otp: 'OTP must be 4-6 digits' }));
      toast.error('Enter a valid OTP');
      return;
    }
    setIsLoading(true);
    try {
      const result = await dispatch(verifyOtpThunk({ otp: formData.otp, userId: authState.userId })).unwrap();
      
      // Role-based navigation
      const userRole = result?.user?.role || authState.userRole;
      console.log('🔐 Login successful, user role:', userRole);
      
      if (userRole === 'Vendor') {
        console.log('🏪 Navigating Vendor to homepage');
        navigate('/');
      } else {
        console.log('👤 Navigating User to dashboard');
        navigate('/User-dashboard');
      }
    } catch (err) {
      // toast handled in thunk
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    
    try {
      // Build backend base by stripping a trailing /api if present
      const configured = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
      const backendBase = configured.replace(/\/?api\/?$/, '');
      const googleAuthUrl = `${backendBase}/api/auth/google`;
      
      // Redirect to Google OAuth endpoint
      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error('Google Sign-in error:', error);
      toast.error('Google Sign-in failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg mb-4">
            <span className="text-white font-bold text-xl">BS</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BacchatSathi</h1>
          <p className="text-gray-600">Sign in to your account</p>
          <p className="text-xs text-gray-500 mt-1">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-500">Register here</Link>
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Send OTP Section */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp || !validateEmail(formData.email)}
                className={`w-full py-3 px-4 rounded-md font-semibold transition-all duration-200 ${
                  isSendingOtp || !validateEmail(formData.email)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : otpSent
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md'
                }`}
              >
                {isSendingOtp ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending OTP...</span>
                  </div>
                ) : otpSent ? (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>OTP Sent ✓</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Send OTP</span>
                  </div>
                )}
              </button>

              {/* OTP Field - Shows only after Send OTP is clicked */}
              {showOtpField && (
                <div className="animate-fade-in">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      value={formData.otp}
                      onChange={handleInputChange}
                      maxLength="6"
                      className={`w-full pl-10 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-center text-lg tracking-wider ${
                        errors.otp ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter 4-6 digit OTP"
                    />
                  </div>
                  {errors.otp && (
                    <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
                  )}
                </div>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>



            {/* Verify OTP Button (visible when OTP requested) */}
            {showOtpField && (
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isLoading || !validateOtp(formData.otp)}
                className={`w-full py-3 px-4 rounded-md font-semibold transition-all duration-200 ${
                  isLoading || !validateOtp(formData.otp)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying OTP...</span>
                  </div>
                ) : (
                  <span>Verify OTP & Login</span>
                )}
              </button>
            )}

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className={`w-full py-3 px-4 border border-gray-300 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-3 ${
                isGoogleLoading
                  ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
              }`}
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  {/* Google Logo */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 hover:underline font-semibold"
              onClick={() => navigate('/register')}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>

      {/* Custom CSS for fade-in animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;