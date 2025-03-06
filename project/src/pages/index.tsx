import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip,
  Avatar,
  Stack,
  CircularProgress
} from '@mui/material';
import { 
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckIcon,
  Schedule as PendingIcon,
  Warning as WarningIcon,
  Dangerous as DangerIcon, 
  Description as ReportIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layout/MainLayout';

// Sample data for upcoming jobs
const upcomingJobs = [
  {
    id: 'job-1',
    title: 'Annual Greenhouse Inspection',
    client: 'Sunrise Organics',
    location: '123 Farm Lane, Greenville',
    date: '2025-03-10T09:00:00',
    status: 'scheduled',
    priority: 'high'
  },
  {
    id: 'job-2',
    title: 'Pest Control Assessment',
    client: 'Green Valley Farms',
    location: '456 Harvest Road, Cropland',
    date: '2025-03-12T13:30:00',
    status: 'scheduled',
    priority: 'medium'
  },
  {
    id: 'job-3',
    title: 'Irrigation System Evaluation',
    client: 'Healthy Sprouts Inc.',
    location: '789 Growth Avenue, Plantersville',
    date: '2025-03-08T11:00:00',
    status: 'in-progress',
    priority: 'medium',
    progress: 45
  },
  {
    id: 'job-4',
    title: 'Emergency Structure Assessment',
    client: 'Fresh Harvest Cooperative',
    location: '234 Garden Boulevard, Seedtown',
    date: '2025-03-07T10:00:00',
    status: 'in-progress',
    priority: 'urgent',
    progress: 75
  }
];

// Sample data for forms that need to be completed
const pendingForms = [
  {
    id: 'form-1',
    title: 'Greenhouse Safety Inspection',
    job: 'Annual Greenhouse Inspection',
    client: 'Sunrise Organics',
    dueDate: '2025-03-10T17:00:00',
    status: 'not-started',
    type: 'inspection'
  },
  {
    id: 'form-2',
    title: 'Pest Assessment Report',
    job: 'Pest Control Assessment',
    client: 'Green Valley Farms',
    dueDate: '2025-03-12T17:00:00',
    status: 'in-progress',
    progress: 30,
    type: 'assessment'
  },
  {
    id: 'form-3',
    title: 'Irrigation Efficiency Form',
    job: 'Irrigation System Evaluation',
    client: 'Healthy Sprouts Inc.',
    dueDate: '2025-03-08T17:00:00',
    status: 'in-progress',
    progress: 80,
    type: 'evaluation'
  },
  {
    id: 'form-4',
    title: 'Structure Damage Assessment',
    job: 'Emergency Structure Assessment',
    client: 'Fresh Harvest Cooperative',
    dueDate: '2025-03-07T17:00:00',
    status: 'in-progress',
    progress: 60,
    type: 'emergency'
  }
];

// Sample data for recently generated reports
const recentReports = [
  {
    id: 'report-1',
    title: 'Annual Compliance Audit',
    client: 'Willow Creek Farms',
    date: '2025-03-02T14:23:00',
    type: 'compliance',
    size: '2.4 MB'
  },
  {
    id: 'report-2',
    title: 'Water Quality Assessment',
    client: 'Green Thumb Gardens',
    date: '2025-03-01T09:15:00',
    type: 'assessment',
    size: '1.8 MB'
  },
  {
    id: 'report-3',
    title: 'Carbon Footprint Analysis',
    client: 'Eco Growers Association',
    date: '2025-02-28T16:45:00',
    type: 'analysis',
    size: '3.2 MB'
  }
];

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  }).format(date);
};

// Helper to determine status color
const getStatusColor = (status: string, priority?: string) => {
  if (priority === 'urgent') return 'error';
  if (priority === 'high') return 'warning';
  
  switch (status) {
    case 'completed': return 'success';
    case 'in-progress': return 'info';
    case 'not-started': return 'default';
    case 'scheduled': return 'primary';
    default: return 'default';
  }
};

// Helper to get status icon
const getStatusIcon = (status: string, priority?: string) => {
  if (priority === 'urgent') return <DangerIcon color="error" />;
  
  switch (status) {
    case 'completed': return <CheckIcon color="success" />;
    case 'in-progress': return <TimeIcon color="info" />;
    case 'not-started': return <PendingIcon color="action" />;
    case 'scheduled': return <CalendarIcon color="primary" />;
    default: return <PendingIcon />;
  }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleJobClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  const handleFormClick = (formId: string) => {
    router.push(`/forms/${formId}`);
  };

  const handleReportClick = (reportId: string) => {
    router.push(`/reports/${reportId}`);
  };

  // Show loading state until mounted (client-side only)
  if (!mounted) {
    return (
      <>
        <Head>
          <title>Dashboard | Greenhouse Management System</title>
          <meta name="description" content="Enterprise application for job scheduling, assignment, and data collection" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column', gap: 2 }}>
              <CircularProgress size={40} />
              <Typography variant="h6">Loading dashboard...</Typography>
            </Box>
          </Container>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | Greenhouse Management System</title>
        <meta name="description" content="Enterprise application for job scheduling, assignment, and data collection" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Welcome to the Greenhouse Management System. Here you can manage jobs, forms, and reports.
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {/* Upcoming Jobs */}
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%' }}>
                <CardHeader 
                  title="Upcoming Jobs" 
                  titleTypographyProps={{ variant: 'h6' }}
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <CalendarIcon />
                    </Avatar>
                  }
                />
                <Divider />
                <CardContent sx={{ pt: 0, pb: 1 }}>
                  <List disablePadding>
                    {upcomingJobs.map((job) => (
                      <ListItem 
                        key={job.id} 
                        disablePadding 
                        sx={{ 
                          py: 1.5, 
                          borderBottom: '1px solid rgba(0,0,0,0.06)',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.03)'
                          }
                        }}
                        onClick={() => handleJobClick(job.id)}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                              <Typography variant="subtitle2" noWrap sx={{ maxWidth: '180px' }}>
                                {job.title}
                              </Typography>
                              <Chip 
                                size="small" 
                                label={job.status.replace('-', ' ')} 
                                color={getStatusColor(job.status, job.priority)}
                                icon={getStatusIcon(job.status, job.priority)}
                                sx={{ textTransform: 'capitalize' }}
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                <LocationIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem', color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: '0.8rem' }}>
                                  {job.client}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem', color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                  {formatDate(job.date)}
                                </Typography>
                              </Box>
                              {job.status === 'in-progress' && 'progress' in job && (
                                <Box sx={{ width: '100%', mt: 1 }}>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={job.progress} 
                                    sx={{ height: 4, borderRadius: 2 }}
                                  />
                                </Box>
                              )}
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Forms to Complete */}
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%' }}>
                <CardHeader 
                  title="Forms to Complete" 
                  titleTypographyProps={{ variant: 'h6' }}
                  avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <AssignmentIcon />
                    </Avatar>
                  }
                />
                <Divider />
                <CardContent sx={{ pt: 0, pb: 1 }}>
                  <List disablePadding>
                    {pendingForms.map((form) => (
                      <ListItem 
                        key={form.id} 
                        disablePadding 
                        sx={{ 
                          py: 1.5, 
                          borderBottom: '1px solid rgba(0,0,0,0.06)',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.03)'
                          }
                        }}
                        onClick={() => handleFormClick(form.id)}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                              <Typography variant="subtitle2" noWrap sx={{ maxWidth: '180px' }}>
                                {form.title}
                              </Typography>
                              <Chip 
                                size="small" 
                                label={form.status.replace('-', ' ')} 
                                color={getStatusColor(form.status)}
                                icon={getStatusIcon(form.status)}
                                sx={{ textTransform: 'capitalize' }}
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: '0.8rem' }}>
                                {form.job}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem', color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                  Due: {formatDate(form.dueDate)}
                                </Typography>
                              </Box>
                              {form.status === 'in-progress' && 'progress' in form && (
                                <Box sx={{ width: '100%', mt: 1 }}>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={form.progress} 
                                    sx={{ height: 4, borderRadius: 2 }}
                                  />
                                </Box>
                              )}
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Recent Reports */}
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ height: '100%' }}>
                <CardHeader 
                  title="Recent Reports" 
                  titleTypographyProps={{ variant: 'h6' }}
                  avatar={
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <ReportIcon />
                    </Avatar>
                  }
                />
                <Divider />
                <CardContent sx={{ pt: 0, pb: 1 }}>
                  <List disablePadding>
                    {recentReports.map((report) => (
                      <ListItem 
                        key={report.id} 
                        disablePadding 
                        sx={{ 
                          py: 1.5, 
                          borderBottom: '1px solid rgba(0,0,0,0.06)',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.03)'
                          }
                        }}
                        onClick={() => handleReportClick(report.id)}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                              <Typography variant="subtitle2" noWrap sx={{ maxWidth: '180px' }}>
                                {report.title}
                              </Typography>
                              <Chip 
                                size="small" 
                                label={report.type} 
                                color="success"
                                sx={{ textTransform: 'capitalize' }}
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: '0.8rem' }}>
                                {report.client} ({report.size})
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem', color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                  Generated: {formatDate(report.date)}
                                </Typography>
                              </Box>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </MainLayout>
    </>
  );
}