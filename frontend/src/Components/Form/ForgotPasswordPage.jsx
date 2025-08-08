import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { forgotPasswordThunk, verifyResetOtpThunk, resetPasswordThunk } from '../../Redux/slices/authSlice.js';

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [currentStep, setCurrentStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();

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

  // Step 1: Send forgot password email
  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await dispatch(forgotPasswordThunk({ email: formData.email })).unwrap();
      setUserId(result.userId);
      setCurrentStep(2);
      toast.success('OTP sent to your email');
    } catch (error) {
      // Error handled in thunk
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!validateOtp(formData.otp)) {
      setErrors({ otp: 'Please enter a valid OTP' });
      toast.error('Please enter a valid OTP');
      return;
    }

    setIsLoading(true);
    
    try {
      await dispatch(verifyResetOtpThunk({ 
        otp: formData.otp, 
        userId: userId 
      })).unwrap();
      setCurrentStep(3);
      toast.success('OTP verified successfully');
    } catch (error) {
      // Error handled in thunk
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Set new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validatePassword(formData.newPassword)) {
      setErrors({ newPassword: 'Password must be at least 6 characters' });
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      await dispatch(resetPasswordThunk({ 
        userId: userId,
        newPassword: formData.newPassword 
      })).unwrap();
      toast.success('Password reset successfully');
      // Redirect to login
      window.location.href = '/login';
    } catch (error) {
      // Error handled in thunk
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">Forgot Password</h2>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Enter your email address and we'll send you an OTP to reset your password.
        </p>
      </div>

      <form onSubmit={handleSendResetEmail} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="mt-1 relative">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your email"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Send Reset OTP'
          )}
        </button>
      </form>

      <div className="text-center">
        <Link
          to="/login"
          className="text-sm text-blue-600 hover:text-blue-500 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">Verify OTP</h2>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Enter the 6-digit OTP sent to your email address.
        </p>
      </div>

      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            OTP Code
          </label>
          <div className="mt-1">
            <input
              id="otp"
              name="otp"
              type="text"
              required
              maxLength={6}
              value={formData.otp}
              onChange={handleInputChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                errors.otp ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest`}
              placeholder="000000"
            />
          </div>
          {errors.otp && (
            <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Verify OTP'
          )}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setCurrentStep(1)}
          className="text-sm text-blue-600 hover:text-blue-500 flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Email
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">Reset Password</h2>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="mt-1">
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                errors.newPassword ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter new password"
            />
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`appearance-none block w-full px-3 py-2 border ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Confirm new password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Reset Password
            </>
          )}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setCurrentStep(2)}
          className="text-sm text-blue-600 hover:text-blue-500 flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to OTP
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
