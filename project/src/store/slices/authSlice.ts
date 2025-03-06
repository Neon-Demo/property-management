import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Helper to get stored user data from localStorage
const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error parsing stored user:', error);
    return null;
  }
};

// Helper to get stored token from localStorage
const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: typeof window !== 'undefined' ? Boolean(localStorage.getItem('token')) : false,
  isLoading: false,
  error: null,
};

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (token: string, { rejectWithValue }) => {
    try {
      // This would be a real API call in production
      const response = await axios.post('/api/auth/google', { token });
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const microsoftLogin = createAsyncThunk(
  'auth/microsoftLogin',
  async (token: string, { rejectWithValue }) => {
    try {
      // This would be a real API call in production
      const response = await axios.post('/api/auth/microsoft', { token });
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Microsoft login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  if (typeof window !== 'undefined') {
    // Clear both token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear cookie
    document.cookie = 'token=; path=/; max-age=0;';
    
    console.log('Logout: Cleared all auth data');
  }
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        // Store both token and user object in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Also set cookie for middleware auth
        document.cookie = `token=${token}; path=/; max-age=86400;`;
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        // Clear both token and user from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Clear cookie
        document.cookie = 'token=; path=/; max-age=0;';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', action.payload.token);
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          document.cookie = `token=${action.payload.token}; path=/; max-age=86400;`;
        }
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Microsoft Login
      .addCase(microsoftLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(microsoftLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', action.payload.token);
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          document.cookie = `token=${action.payload.token}; path=/; max-age=86400;`;
        }
      })
      .addCase(microsoftLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;