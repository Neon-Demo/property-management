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
      // Add authorization header - using JWT token from cookies or other source
      // This is a placeholder since accessToken isn't available in the default session type
      // In a real app, you would need to customize the session or retrieve the token differently
      config.headers.Authorization = `Bearer token`;
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
          // Update the authorization header - using JWT token from cookies or other source
          // This is a placeholder since accessToken isn't available in the default session type
          originalRequest.headers.Authorization = `Bearer token`;
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