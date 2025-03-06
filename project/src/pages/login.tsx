import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import { 
  Google as GoogleIcon,
  LockOpenOutlined as DemoIcon
} from '@mui/icons-material';
import MicrosoftIcon from '@mui/icons-material/Science'; // Using Science icon as a placeholder for Microsoft
import Head from 'next/head';
import { googleLogin, microsoftLogin, setCredentials } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      // In a real implementation, this would use the Google OAuth flow
      // and receive a token from Google
      const mockGoogleToken = 'google-oauth-token';
      const resultAction = await dispatch(googleLogin(mockGoogleToken));
      if (googleLogin.fulfilled.match(resultAction)) {
        router.push('/');
      } else {
        setError('Google sign in failed');
      }
    } catch (error) {
      setError('An error occurred during Google sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      setIsLoading(true);
      // In a real implementation, this would use the Microsoft OAuth flow
      // and receive a token from Microsoft
      const mockMicrosoftToken = 'microsoft-oauth-token';
      const resultAction = await dispatch(microsoftLogin(mockMicrosoftToken));
      if (microsoftLogin.fulfilled.match(resultAction)) {
        router.push('/');
      } else {
        setError('Microsoft sign in failed');
      }
    } catch (error) {
      setError('An error occurred during Microsoft sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setIsLoading(true);
      
      // Create a demo user with admin privileges
      const demoUser = {
        id: 'demo-user-1',
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'admin'
      };
      
      // Create a mock JWT token
      const demoToken = 'demo-jwt-token-' + Math.random().toString(36).substring(2);
      
      // We'll let the Redux action handle localStorage and cookie setting
      
      // Use the setCredentials action to directly set the user in Redux state
      dispatch(setCredentials({ user: demoUser, token: demoToken }));
      
      // Small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Redirect to dashboard
      router.push('/');
      
      // Log for debugging
      console.log('Demo login successful, redirecting to dashboard...');
    } catch (error) {
      console.error('Demo login error:', error);
      setError('An error occurred with the demo login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Greenhouse Management System</title>
        <meta name="description" content="Login to the Greenhouse Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Greenhouse Management System
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
              Sign in with your organizational account
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  sx={{ py: 1.5 }}
                >
                  Sign in with Google
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<MicrosoftIcon />}
                  onClick={handleMicrosoftLogin}
                  disabled={isLoading}
                  sx={{ py: 1.5 }}
                >
                  Sign in with Microsoft
                </Button>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <DemoIcon />}
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  sx={{ py: 1.5 }}
                >
                  Login as Demo User
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
}