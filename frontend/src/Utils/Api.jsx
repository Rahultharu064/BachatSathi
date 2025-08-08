import axios from 'axios';

// Normalize base URL to always include exactly one trailing /api
const RAW_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const TRIMMED = RAW_BASE.replace(/\/$/, '');
const BASE_URL = /\/api$/i.test(TRIMMED) ? TRIMMED : `${TRIMMED}/api`;

console.log('🔗 API Base URL:', BASE_URL);
console.log('🌐 Environment:', import.meta.env.MODE);
console.log('🔧 Backend URL from env:', import.meta.env.VITE_BACKEND_URL);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // send/receive cookies
});

// Optional: attach Authorization header if you also store a token (backend primarily uses cookies)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('🚨 API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Let caller handle redirect/toast
    }
    
    // Handle network errors specifically
    if (!error.response && error.request) {
      console.error('🌐 Network Error: Server is not reachable');
      error.message = 'Network error: could not reach server. Please check your connection.';
    }
    
    return Promise.reject(error);
  }
);

export const httpGet = (url, params) => apiClient.get(url, { params });
export const httpPost = (url, data, config) => apiClient.post(url, data, config);
export const httpPut = (url, data) => apiClient.put(url, data);
export const httpDelete = (url) => apiClient.delete(url);

// Convenience auth API wrappers
export const authApi = {
  login: (payload) => httpPost('/auth/login', payload),
  sendOtp: (payload) => httpPost('/auth/sendotp', payload),
  verifyOtp: (payload) => httpPost('/auth/verifyotp', payload),
  register: (payload) => httpPost('/auth/signup', payload),
  resendOtp: (payload) => httpPost('/auth/resendotp', payload),
  forgotPassword: (payload) => httpPost('/auth/forgotpassword', payload),
  verifyResetOtp: (payload) => httpPost('/auth/verifyresetotp', payload),
  resetPassword: (payload) => httpPost('/auth/resetpassword', payload),
  logout: () => httpPost('/auth/logout'),
};

export default apiClient;
