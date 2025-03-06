import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 error - redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // In a browser environment, redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;