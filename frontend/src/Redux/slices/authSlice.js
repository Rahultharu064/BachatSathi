import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../Utils/Api.jsx';
import toast from 'react-hot-toast';

const initialState = {
  userId: null,
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
  otpRequired: false,
  userRole: null, // Add user role to state
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const normalized = {
        email: String(payload?.email || '').trim().toLowerCase(),
        password: payload?.password,
      };
      
      console.log('🔐 Attempting login with:', { email: normalized.email, password: normalized.password ? '***' : 'missing' });
      
      const { data } = await authApi.login(normalized);
      console.log('✅ Login successful:', data);
      toast.success('OTP sent to your email. Please verify.');
      return data; // expects { message, userId }
    } catch (err) {
      console.error('❌ Login error:', err);
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message;
      let message = 'Login failed';
      
      if (status === 401) {
        message = 'Invalid email or password. Please check your credentials.';
      } else if (status === 400 && serverMsg) {
        message = serverMsg; // e.g., Google sign-in required
      } else if (!err?.response && err?.request) {
        message = 'Network error: could not reach server. Please check your connection.';
      } else if (serverMsg) {
        message = serverMsg;
      }
      
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const sendOtpThunk = createAsyncThunk(
  'auth/sendOtp',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const userId = state?.auth?.userId;
      const body = userId
        ? { userId }
        : { email: String(payload?.email || '').trim().toLowerCase() };
      const { data } = await authApi.sendOtp(body);
      return data; // expects { message, userId }
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message || 'Failed to send OTP';
      
      if (status === 404) {
        toast.error('User not found. Please register first or check your email address.');
      } else {
        toast.error(message);
      }
      
      return rejectWithValue(message);
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.verifyOtp(payload);
      toast.success('Logged in');
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || 'Invalid OTP';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const normalized = {
        ...payload,
        email: String(payload?.email || '').trim().toLowerCase(),
      };
      const { data } = await authApi.register(normalized);
      toast.success('Account created');
      return data; // expects { user }
    } catch (err) {
      const status = err?.response?.status;
      const detailed = err?.response?.data?.error;
      const message = err?.response?.data?.message || detailed || 'Registration failed';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const normalized = {
        email: String(payload?.email || '').trim().toLowerCase(),
      };
      const { data } = await authApi.forgotPassword(normalized);
      toast.success('OTP sent to your email');
      return data; // expects { message, userId }
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to send reset OTP';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const verifyResetOtpThunk = createAsyncThunk(
  'auth/verifyResetOtp',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.verifyResetOtp(payload);
      toast.success('OTP verified successfully');
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || 'Invalid OTP';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.resetPassword(payload);
      toast.success('Password reset successfully');
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to reset password';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.otpRequired = false;
      state.user = null;
      state.userRole = null;
    },
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true; // cookie set by backend
        state.user = action.payload?.user || null;
        state.userId = action.payload?.user?.id || null;
        state.userRole = action.payload?.user?.role || null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      })
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userId = action.payload?.userId || null;
        state.otpRequired = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })
      .addCase(sendOtpThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendOtpThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.otpRequired = true;
        if (action.payload?.userId) {
          state.userId = action.payload.userId;
        }
      })
      .addCase(sendOtpThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to send OTP';
      })
      .addCase(verifyOtpThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.otpRequired = false;
        state.user = action.payload?.user || null;
        state.userRole = action.payload?.user?.role || null;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'OTP verification failed';
      });
  },
});

export const { logoutSuccess, resetAuth } = authSlice.actions;
export default authSlice.reducer;

