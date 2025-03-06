import axios from 'axios';
import { getSession } from 'next-auth/react';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add authentication token
api.interceptors.request.use(
  async (config) => {
    // Get session for server-side and client-side
    const session = await getSession();
    
    if (session?.user) {
      // Add authorization header
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Get a new session
        const session = await getSession();
        
        if (session?.user) {
          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export { api };