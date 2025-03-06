import { Box, Container, Typography, Card, CardContent, Grid, Avatar, Paper, Divider, CircularProgress } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { RootState } from '@/store';

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <>
        <Head>
          <title>Profile | Greenhouse Management System</title>
          <meta name="description" content="User profile in the Greenhouse Management System" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column', gap: 2 }}>
              <CircularProgress size={40} />
              <Typography variant="h6">Loading user information...</Typography>
            </Box>
          </Container>
        </MainLayout>
      </>
    );
  }
  
  if (!user) {
    return (
      <>
        <Head>
          <title>Profile | Greenhouse Management System</title>
          <meta name="description" content="User profile in the Greenhouse Management System" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
              <Typography variant="h6" color="text.secondary">User information not available</Typography>
            </Box>
          </Container>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Profile | Greenhouse Management System</title>
        <meta name="description" content="User profile in the Greenhouse Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              User Profile
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              View and manage your account information
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: '3rem',
                    }}
                  >
                    {user.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h5" align="center">
                    {user.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    {user.email}
                  </Typography>
                  <Box 
                    sx={{ 
                      mt: 1, 
                      px: 2, 
                      py: 0.5, 
                      bgcolor: 'primary.light', 
                      borderRadius: 1,
                      color: 'primary.contrastText',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {user.role}
                  </Box>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Account Information
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ID
                    </Typography>
                    <Typography variant="body1">
                      {user.id}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1">
                      {user.name}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {user.email}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Role
                    </Typography>
                    <Typography variant="body1">
                      {user.role}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'success.main' }}>
                      Active
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Authentication Type
                    </Typography>
                    <Typography variant="body1">
                      {user.id.includes('demo') ? 'Demo Account' : 'Single Sign-On (SSO)'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </MainLayout>
    </>
  );
}