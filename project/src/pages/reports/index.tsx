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
  Divider
} from '@mui/material';
import {
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Assignment as AssignmentIcon,
  Visibility as ViewIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Description as ReportIcon,
  Print as PrintIcon,
  FileCopy as DuplicateIcon,
  Add as AddIcon,
  BusinessCenter as ClientIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layout/MainLayout';

// Sample data
const reports = [
  {
    id: 'report-1',
    title: 'Annual Compliance Audit',
    client: 'Willow Creek Farms',
    date: '2025-03-02T14:23:00',
    type: 'compliance',
    size: '2.4 MB',
    author: 'John Doe',
    status: 'approved',
    jobId: 'job-7'
  },
  {
    id: 'report-2',
    title: 'Water Quality Assessment',
    client: 'Green Thumb Gardens',
    date: '2025-03-01T09:15:00',
    type: 'assessment',
    size: '1.8 MB',
    author: 'Mike Johnson',
    status: 'approved',
    jobId: 'job-5'
  },
  {
    id: 'report-3',
    title: 'Carbon Footprint Analysis',
    client: 'Eco Growers Association',
    date: '2025-02-28T16:45:00',
    type: 'analysis',
    size: '3.2 MB',
    author: 'Jane Smith',
    status: 'approved',
    jobId: 'job-6'
  },
  {
    id: 'report-4',
    title: 'Irrigation System Efficiency Report',
    client: 'Healthy Sprouts Inc.',
    date: '2025-03-05T11:30:00',
    type: 'evaluation',
    size: '2.1 MB',
    author: 'Mike Johnson',
    status: 'pending',
    jobId: 'job-3'
  },
  {
    id: 'report-5',
    title: 'Structural Damage Assessment',
    client: 'Fresh Harvest Cooperative',
    date: '2025-03-06T15:45:00',
    type: 'emergency',
    size: '4.5 MB',
    author: 'Sarah Wilson',
    status: 'draft',
    jobId: 'job-4'
  },
  {
    id: 'report-6',
    title: 'Pest Control Recommendations',
    client: 'Green Valley Farms',
    date: '2025-03-09T10:20:00',
    type: 'assessment',
    size: '1.5 MB',
    author: 'Jane Smith',
    status: 'draft',
    jobId: 'job-2'
  },
  {
    id: 'report-7',
    title: 'Greenhouse Safety Compliance',
    client: 'Sunrise Organics',
    date: '2025-03-08T16:15:00',
    type: 'inspection',
    size: '3.8 MB',
    author: 'John Doe',
    status: 'pending',
    jobId: 'job-1'
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'success';
    case 'pending': return 'warning';
    case 'draft': return 'info';
    default: return 'default';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'compliance': return 'primary';
    case 'assessment': return 'secondary';
    case 'analysis': return 'warning';
    case 'evaluation': return 'info';
    case 'emergency': return 'error';
    case 'inspection': return 'success';
    default: return 'default';
  }
};

export default function Reports() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  // Ensure client-side rendering only
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleTypeFilterChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setTypeFilter(value);
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, reportId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedReportId(reportId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReportId(null);
  };

  const handleReportClick = (reportId: string) => {
    router.push(`/reports/${reportId}`);
  };

  const handleAddReport = () => {
    router.push('/reports/new');
  };

  // Filter reports based on search term and filters
  const filteredReports = reports.filter((report) => {
    const matchesSearch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(report.status);
    const matchesType = typeFilter.length === 0 || typeFilter.includes(report.type);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get all unique report types for the type filter
  const reportTypes = Array.from(new Set(reports.map(report => report.type)));

  // Get all unique status values for the status filter
  const statusTypes = Array.from(new Set(reports.map(report => report.status)));

  // Show loading state until mounted (client-side only)
  if (!mounted) {
    return (
      <>
        <Head>
          <title>Reports | Greenhouse Management System</title>
          <meta name="description" content="Manage and view reports in the Greenhouse Management System" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column', gap: 2 }}>
              <CircularProgress size={40} />
              <Typography variant="h6">Loading reports...</Typography>
            </Box>
          </Container>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Reports | Greenhouse Management System</title>
        <meta name="description" content="Manage and view reports in the Greenhouse Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Reports
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View, download, and share greenhouse inspection reports
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleAddReport}
            >
              New Report
            </Button>
          </Box>

          {/* Filter and Search Bar */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <TextField
                placeholder="Search reports..."
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
                  {statusTypes.map((status) => (
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
                <InputLabel id="type-filter-label">Type</InputLabel>
                <Select
                  labelId="type-filter-label"
                  multiple
                  value={typeFilter}
                  onChange={handleTypeFilterChange}
                  input={<OutlinedInput label="Type" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip 
                          key={value} 
                          label={value} 
                          size="small"
                          color={getTypeColor(value)}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {reportTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      <Chip 
                        label={type}
                        size="small"
                        color={getTypeColor(type)}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>

          {/* Reports as cards in grid */}
          <Grid container spacing={3}>
            {filteredReports
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((report) => (
                <Grid item xs={12} md={6} key={report.id}>
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
                    onClick={() => handleReportClick(report.id)}
                  >
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start', 
                        mb: 2
                      }}>
                        <Box>
                          <Typography variant="h6" sx={{ mb: 0 }}>
                            {report.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {report.size}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Chip 
                            label={report.status}
                            size="small"
                            color={getStatusColor(report.status)}
                            sx={{ textTransform: 'capitalize' }}
                          />
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMenuOpen(e, report.id);
                            }}
                          >
                            <MoreIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', mb: 2, gap: 2, flexWrap: 'wrap' }}>
                        <Chip 
                          label={report.type}
                          size="small"
                          color={getTypeColor(report.type)}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </Box>
                      
                      <Stack spacing={1} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ClientIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">{report.client}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            Generated: {formatDate(report.date)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AssignmentIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            Author: {report.author}
                          </Typography>
                        </Box>
                      </Stack>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="View">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReportClick(report.id);
                            }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Download logic would go here
                            }}
                          >
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Share">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Share logic would go here
                            }}
                          >
                            <ShareIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              
            {filteredReports.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No reports found matching your criteria
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredReports.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* Report Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {
              handleMenuClose();
              if (selectedReportId) handleReportClick(selectedReportId);
            }}>
              <ListItemIcon>
                <ViewIcon fontSize="small" />
              </ListItemIcon>
              View Report
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <DownloadIcon fontSize="small" />
              </ListItemIcon>
              Download PDF
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <PrintIcon fontSize="small" />
              </ListItemIcon>
              Print Report
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <ShareIcon fontSize="small" />
              </ListItemIcon>
              Share Report
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <DuplicateIcon fontSize="small" />
              </ListItemIcon>
              Duplicate
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <Typography color="error">Delete</Typography>
            </MenuItem>
          </Menu>
        </Container>
      </MainLayout>
    </>
  );
}