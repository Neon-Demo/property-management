import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  CircularProgress,
  Button,
  IconButton,
  Tooltip,
  TablePagination,
  Menu,
  MenuItem,
  ListItemIcon,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  SelectChangeEvent,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Assignment as AssignmentIcon,
  Visibility as ViewIcon,
  Done as DoneIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layout/MainLayout';

// Sample data for jobs
const jobs = [
  {
    id: 'job-1',
    title: 'Annual Greenhouse Inspection',
    client: 'Sunrise Organics',
    location: '123 Farm Lane, Greenville',
    date: '2025-03-10T09:00:00',
    endDate: '2025-03-10T15:00:00',
    status: 'scheduled',
    priority: 'high',
    description: 'Conduct annual safety and compliance inspection for all greenhouse facilities.',
    assignedTo: ['John Doe'],
    forms: [
      { id: 'form-1', title: 'Greenhouse Safety Inspection', status: 'not-started' }
    ]
  },
  {
    id: 'job-2',
    title: 'Pest Control Assessment',
    client: 'Green Valley Farms',
    location: '456 Harvest Road, Cropland',
    date: '2025-03-12T13:30:00',
    endDate: '2025-03-12T17:00:00',
    status: 'scheduled',
    priority: 'medium',
    description: 'Evaluate current pest control measures and provide recommendations for improvements.',
    assignedTo: ['Jane Smith'],
    forms: [
      { id: 'form-2', title: 'Pest Assessment Report', status: 'not-started' }
    ]
  },
  {
    id: 'job-3',
    title: 'Irrigation System Evaluation',
    client: 'Healthy Sprouts Inc.',
    location: '789 Growth Avenue, Plantersville',
    date: '2025-03-08T11:00:00',
    endDate: '2025-03-08T16:00:00',
    status: 'in-progress',
    priority: 'medium',
    progress: 45,
    description: 'Check irrigation systems for efficiency and recommend improvements to reduce water usage.',
    assignedTo: ['Mike Johnson'],
    forms: [
      { id: 'form-3', title: 'Irrigation Efficiency Form', status: 'in-progress', progress: 80 }
    ]
  },
  {
    id: 'job-4',
    title: 'Emergency Structure Assessment',
    client: 'Fresh Harvest Cooperative',
    location: '234 Garden Boulevard, Seedtown',
    date: '2025-03-07T10:00:00',
    endDate: '2025-03-07T14:00:00',
    status: 'in-progress',
    priority: 'urgent',
    progress: 75,
    description: 'Assess greenhouse structure damage following recent storm and provide repair recommendations.',
    assignedTo: ['Sarah Wilson', 'John Doe'],
    forms: [
      { id: 'form-4', title: 'Structure Damage Assessment', status: 'in-progress', progress: 60 }
    ]
  },
  {
    id: 'job-5',
    title: 'Environmental Impact Assessment',
    client: 'Green Thumb Gardens',
    location: '567 Eco Drive, Growthville',
    date: '2025-03-20T09:00:00',
    endDate: '2025-03-20T17:00:00',
    status: 'scheduled',
    priority: 'low',
    description: 'Complete environmental impact assessment for planned greenhouse expansion.',
    assignedTo: ['Mike Johnson'],
    forms: [
      { id: 'form-6', title: 'Greenhouse Gas Emissions', status: 'not-started' }
    ]
  },
  {
    id: 'job-6',
    title: 'Worker Safety Audit',
    client: 'Willow Creek Farms',
    location: '890 Safe Lane, Protectville',
    date: '2025-03-05T09:00:00',
    endDate: '2025-03-05T14:00:00',
    status: 'completed',
    priority: 'high',
    description: 'Conduct audit of worker safety protocols and equipment.',
    assignedTo: ['Jane Smith'],
    completedDate: '2025-03-05T14:30:00',
    forms: [
      { id: 'form-7', title: 'Worker Safety Checklist', status: 'completed' }
    ]
  },
  {
    id: 'job-7',
    title: 'Regulatory Compliance Audit',
    client: 'Eco Growers Association',
    location: '123 Regulation Road, Standardville',
    date: '2025-03-01T10:00:00',
    endDate: '2025-03-01T16:00:00',
    status: 'completed',
    priority: 'high',
    description: 'Review compliance with current agricultural regulations and certifications.',
    assignedTo: ['John Doe'],
    completedDate: '2025-03-01T16:45:00',
    forms: [
      { id: 'form-5', title: 'Annual Safety Compliance', status: 'completed' }
    ]
  }
];

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Helper function to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  }).format(date);
};

// Helper function to get status color
const getStatusColor = (status: string, priority?: string) => {
  if (priority === 'urgent') return 'error';
  if (priority === 'high') return 'warning';
  
  switch (status) {
    case 'completed': return 'success';
    case 'in-progress': return 'info';
    case 'scheduled': return 'primary';
    default: return 'default';
  }
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`jobs-tabpanel-${index}`}
      aria-labelledby={`jobs-tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Jobs() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Ensure client-side rendering only
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setStatusFilter(value);
    setPage(0);
  };

  const handlePriorityFilterChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setPriorityFilter(value);
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, jobId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedJobId(jobId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJobId(null);
  };

  const handleJobClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  const handleAddJob = () => {
    router.push('/jobs/new');
  };

  // Filter jobs based on tab, search term, and filters
  const filteredJobs = jobs.filter((job) => {
    // Filter by tab
    if (tabValue === 1 && job.status !== 'scheduled') return false;
    if (tabValue === 2 && job.status !== 'in-progress') return false;
    if (tabValue === 3 && job.status !== 'completed') return false;
    
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.assignedTo.some(person => person.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(job.status);
    const matchesPriority = priorityFilter.length === 0 || 
      (job.priority && priorityFilter.includes(job.priority));
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Show loading state until mounted (client-side only)
  if (!mounted) {
    return (
      <>
        <Head>
          <title>Jobs | Greenhouse Management System</title>
          <meta name="description" content="Manage greenhouse inspection jobs and assignments" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column', gap: 2 }}>
              <CircularProgress size={40} />
              <Typography variant="h6">Loading jobs...</Typography>
            </Box>
          </Container>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Jobs | Greenhouse Management System</title>
        <meta name="description" content="Manage greenhouse inspection jobs and assignments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Jobs
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Schedule and manage greenhouse inspection jobs
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleAddJob}
            >
              New Job
            </Button>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                aria-label="job status tabs"
              >
                <Tab label="All Jobs" id="jobs-tab-0" />
                <Tab label="Scheduled" id="jobs-tab-1" />
                <Tab label="In Progress" id="jobs-tab-2" />
                <Tab label="Completed" id="jobs-tab-3" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              {/* Filter and Search Bar */}
              <Paper sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <TextField
                    placeholder="Search jobs..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ flexGrow: 1, minWidth: '200px' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <FormControl size="small" sx={{ minWidth: '150px' }}>
                    <InputLabel id="status-filter-label">Status</InputLabel>
                    <Select
                      labelId="status-filter-label"
                      multiple
                      value={statusFilter}
                      onChange={handleStatusFilterChange}
                      input={<OutlinedInput label="Status" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected as string[]).map((value) => (
                            <Chip 
                              key={value} 
                              label={value}
                              size="small"
                              color={getStatusColor(value)}
                              sx={{ textTransform: 'capitalize' }}
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {['scheduled', 'in-progress', 'completed'].map((status) => (
                        <MenuItem key={status} value={status}>
                          <Chip 
                            label={status}
                            size="small"
                            color={getStatusColor(status)}
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <FormControl size="small" sx={{ minWidth: '150px' }}>
                    <InputLabel id="priority-filter-label">Priority</InputLabel>
                    <Select
                      labelId="priority-filter-label"
                      multiple
                      value={priorityFilter}
                      onChange={handlePriorityFilterChange}
                      input={<OutlinedInput label="Priority" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {(selected as string[]).map((value) => (
                            <Chip 
                              key={value} 
                              label={value} 
                              size="small"
                              color={getStatusColor('scheduled', value)}
                              sx={{ textTransform: 'capitalize' }}
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {['urgent', 'high', 'medium', 'low'].map((priority) => (
                        <MenuItem key={priority} value={priority}>
                          <Chip 
                            label={priority}
                            size="small"
                            color={getStatusColor('scheduled', priority)}
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Paper>

              {/* Jobs as cards in grid */}
              <Grid container spacing={3}>
                {filteredJobs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((job) => (
                    <Grid item xs={12} md={6} key={job.id}>
                      <Card 
                        sx={{ 
                          height: '100%',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4
                          }
                        }}
                        onClick={() => handleJobClick(job.id)}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start', 
                            mb: 2
                          }}>
                            <Typography variant="h6" sx={{ mb: 0 }}>
                              {job.title}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              {job.priority && (
                                <Chip 
                                  label={job.priority}
                                  size="small"
                                  color={getStatusColor('scheduled', job.priority)}
                                  sx={{ textTransform: 'capitalize' }}
                                />
                              )}
                              <Chip 
                                label={job.status}
                                size="small"
                                color={getStatusColor(job.status)}
                                sx={{ textTransform: 'capitalize' }}
                              />
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMenuOpen(e, job.id);
                                }}
                              >
                                <MoreIcon />
                              </IconButton>
                            </Box>
                          </Box>
                          
                          <Stack spacing={1} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <BusinessIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">{job.client}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">{job.location}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">
                                {formatDate(job.date)} ({formatTime(job.date)} - {formatTime(job.endDate)})
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">
                                {job.assignedTo.join(', ')}
                              </Typography>
                            </Box>
                          </Stack>
                          
                          {job.status === 'in-progress' && 'progress' in job && (
                            <Box sx={{ width: '100%', mb: 2 }}>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                Progress: {job.progress}%
                              </Typography>
                              <LinearProgress 
                                variant="determinate" 
                                value={job.progress as number} 
                                sx={{ height: 6, borderRadius: 3 }}
                              />
                            </Box>
                          )}
                          
                          <Divider sx={{ my: 1 }} />
                          
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Forms ({job.forms.length})
                            </Typography>
                            {job.forms.map((form) => (
                              <Box 
                                key={form.id}
                                sx={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  mb: 0.5 
                                }}
                              >
                                <Typography variant="body2">
                                  {form.title}
                                </Typography>
                                <Chip 
                                  label={form.status.replace('-', ' ')} 
                                  size="small"
                                  color={getStatusColor(form.status)}
                                  sx={{ 
                                    textTransform: 'capitalize',
                                    fontSize: '0.6rem',
                                    height: '20px'
                                  }}
                                />
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                  
                {filteredJobs.length === 0 && (
                  <Grid item xs={12}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="body1" color="text.secondary">
                        No jobs found matching your criteria
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredJobs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {/* Scheduled Jobs - Same content structure as All Jobs but filtered */}
              <Grid container spacing={3}>
                {filteredJobs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((job) => (
                    <Grid item xs={12} md={6} key={job.id}>
                      <Card 
                        sx={{ 
                          height: '100%',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4
                          }
                        }}
                        onClick={() => handleJobClick(job.id)}
                      >
                        <CardContent>
                          {/* Card content as in tab 0 */}
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start', 
                            mb: 2
                          }}>
                            <Typography variant="h6" sx={{ mb: 0 }}>
                              {job.title}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              {job.priority && (
                                <Chip 
                                  label={job.priority}
                                  size="small"
                                  color={getStatusColor('scheduled', job.priority)}
                                  sx={{ textTransform: 'capitalize' }}
                                />
                              )}
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMenuOpen(e, job.id);
                                }}
                              >
                                <MoreIcon />
                              </IconButton>
                            </Box>
                          </Box>
                          
                          <Stack spacing={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <BusinessIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">{job.client}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">{job.location}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">
                                {formatDate(job.date)} ({formatTime(job.date)} - {formatTime(job.endDate)})
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                  
                {filteredJobs.length === 0 && (
                  <Grid item xs={12}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="body1" color="text.secondary">
                        No scheduled jobs found
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredJobs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              {/* In Progress Jobs */}
              <Grid container spacing={3}>
                {filteredJobs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((job) => (
                    <Grid item xs={12} md={6} key={job.id}>
                      <Card 
                        sx={{ 
                          height: '100%',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4
                          }
                        }}
                        onClick={() => handleJobClick(job.id)}
                      >
                        <CardContent>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start', 
                            mb: 2
                          }}>
                            <Typography variant="h6" sx={{ mb: 0 }}>
                              {job.title}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              {job.priority && (
                                <Chip 
                                  label={job.priority}
                                  size="small"
                                  color={getStatusColor('scheduled', job.priority)}
                                  sx={{ textTransform: 'capitalize' }}
                                />
                              )}
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMenuOpen(e, job.id);
                                }}
                              >
                                <MoreIcon />
                              </IconButton>
                            </Box>
                          </Box>
                          
                          {job.status === 'in-progress' && 'progress' in job && (
                            <Box sx={{ width: '100%', mb: 2 }}>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                Progress: {job.progress}%
                              </Typography>
                              <LinearProgress 
                                variant="determinate" 
                                value={job.progress as number} 
                                sx={{ height: 6, borderRadius: 3 }}
                              />
                            </Box>
                          )}
                          
                          <Stack spacing={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <BusinessIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">{job.client}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">{job.location}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">
                                {formatDate(job.date)} ({formatTime(job.date)} - {formatTime(job.endDate)})
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                  
                {filteredJobs.length === 0 && (
                  <Grid item xs={12}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="body1" color="text.secondary">
                        No jobs in progress
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredJobs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              {/* Completed Jobs */}
              <Grid container spacing={3}>
                {filteredJobs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((job) => (
                    <Grid item xs={12} md={6} key={job.id}>
                      <Card 
                        sx={{ 
                          height: '100%',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4
                          }
                        }}
                        onClick={() => handleJobClick(job.id)}
                      >
                        <CardContent>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start', 
                            mb: 2
                          }}>
                            <Typography variant="h6" sx={{ mb: 0 }}>
                              {job.title}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <Chip 
                                label="Completed"
                                size="small"
                                color="success"
                              />
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMenuOpen(e, job.id);
                                }}
                              >
                                <MoreIcon />
                              </IconButton>
                            </Box>
                          </Box>
                          
                          <Stack spacing={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <BusinessIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">{job.client}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2">{job.location}</Typography>
                            </Box>
                            {job.completedDate && (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <DoneIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
                                <Typography variant="body2">
                                  Completed on {formatDate(job.completedDate)}
                                </Typography>
                              </Box>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                  
                {filteredJobs.length === 0 && (
                  <Grid item xs={12}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="body1" color="text.secondary">
                        No completed jobs found
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
              
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredJobs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TabPanel>
          </Box>

          {/* Job Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {
              handleMenuClose();
              if (selectedJobId) router.push(`/jobs/${selectedJobId}`);
            }}>
              <ListItemIcon>
                <ViewIcon fontSize="small" />
              </ListItemIcon>
              View Job
            </MenuItem>
            <MenuItem onClick={() => {
              handleMenuClose();
              if (selectedJobId) router.push(`/jobs/${selectedJobId}/edit`);
            }}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Edit Job
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AssignmentIcon fontSize="small" />
              </ListItemIcon>
              View Forms
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <DoneIcon fontSize="small" />
              </ListItemIcon>
              Mark Complete
            </MenuItem>
          </Menu>
        </Container>
      </MainLayout>
    </>
  );
}