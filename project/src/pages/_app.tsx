import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@/styles/theme';
import { store } from '@/store';
import { useEffect, useState } from 'react';
import { setCredentials } from '@/store/slices/authSlice';
import '@/styles/globals.css';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Client-side only
    const initAuth = () => {
      try {
        // Check for stored user and token
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          // Set the user in Redux store
          store.dispatch(
            setCredentials({
              user: JSON.parse(storedUser),
              token: storedToken
            })
          );
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setInitialized(true);
      }
    };

    initAuth();
  }, []);

  // Render children when we're on server or auth is initialized
  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthInitializer>
          <Component {...pageProps} />
        </AuthInitializer>
      </ThemeProvider>
    </Provider>
  );
}