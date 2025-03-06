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
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  AssignmentTurnedIn as CompleteIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
  CloudDownload as DownloadIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layout/MainLayout';

// Sample data
const forms = [
  {
    id: 'form-1',
    title: 'Greenhouse Safety Inspection',
    job: 'Annual Greenhouse Inspection',
    client: 'Sunrise Organics',
    dueDate: '2025-03-10T17:00:00',
    status: 'not-started',
    type: 'inspection',
    assignedTo: 'John Doe'
  },
  {
    id: 'form-2',
    title: 'Pest Assessment Report',
    job: 'Pest Control Assessment',
    client: 'Green Valley Farms',
    dueDate: '2025-03-12T17:00:00',
    status: 'in-progress',
    progress: 30,
    type: 'assessment',
    assignedTo: 'Jane Smith'
  },
  {
    id: 'form-3',
    title: 'Irrigation Efficiency Form',
    job: 'Irrigation System Evaluation',
    client: 'Healthy Sprouts Inc.',
    dueDate: '2025-03-08T17:00:00',
    status: 'in-progress',
    progress: 80,
    type: 'evaluation',
    assignedTo: 'Mike Johnson'
  },
  {
    id: 'form-4',
    title: 'Structure Damage Assessment',
    job: 'Emergency Structure Assessment',
    client: 'Fresh Harvest Cooperative',
    dueDate: '2025-03-07T17:00:00',
    status: 'in-progress',
    progress: 60,
    type: 'emergency',
    assignedTo: 'Sarah Wilson'
  },
  {
    id: 'form-5',
    title: 'Annual Safety Compliance',
    job: 'Regulatory Compliance Audit',
    client: 'Eco Growers Association',
    dueDate: '2025-03-15T17:00:00',
    status: 'completed',
    type: 'compliance',
    assignedTo: 'John Doe',
    completedDate: '2025-03-01T14:35:00'
  },
  {
    id: 'form-6',
    title: 'Greenhouse Gas Emissions',
    job: 'Environmental Impact Assessment',
    client: 'Green Thumb Gardens',
    dueDate: '2025-03-20T17:00:00',
    status: 'not-started',
    type: 'assessment',
    assignedTo: 'Mike Johnson'
  },
  {
    id: 'form-7',
    title: 'Worker Safety Checklist',
    job: 'Worker Safety Audit',
    client: 'Willow Creek Farms',
    dueDate: '2025-03-05T17:00:00',
    status: 'completed',
    type: 'checklist',
    assignedTo: 'Jane Smith',
    completedDate: '2025-03-04T16:22:00'
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
    case 'completed': return 'success';
    case 'in-progress': return 'info';
    case 'not-started': return 'default';
    default: return 'default';
  }
};

export default function Forms() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, formId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedFormId(formId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFormId(null);
  };

  const handleFormClick = (formId: string) => {
    router.push(`/forms/${formId}`);
  };

  const handleAddForm = () => {
    router.push('/forms/new');
  };

  // Filter forms based on search term and filters
  const filteredForms = forms.filter((form) => {
    const matchesSearch = searchTerm === '' || 
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.job.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(form.status);
    const matchesType = typeFilter.length === 0 || typeFilter.includes(form.type);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get all unique form types for the type filter
  const formTypes = Array.from(new Set(forms.map(form => form.type)));

  // Show loading state until mounted (client-side only)
  if (!mounted) {
    return (
      <>
        <Head>
          <title>Forms | Greenhouse Management System</title>
          <meta name="description" content="Manage and complete forms in the Greenhouse Management System" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', flexDirection: 'column', gap: 2 }}>
              <CircularProgress size={40} />
              <Typography variant="h6">Loading forms...</Typography>
            </Box>
          </Container>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Forms | Greenhouse Management System</title>
        <meta name="description" content="Manage and complete forms in the Greenhouse Management System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Forms
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage and complete digital forms for your assigned jobs
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleAddForm}
            >
              New Form
            </Button>
          </Box>

          {/* Filter and Search Bar */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <TextField
                placeholder="Search forms..."
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
                          label={value.replace('-', ' ')} 
                          size="small"
                          color={getStatusColor(value)}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {['not-started', 'in-progress', 'completed'].map((status) => (
                    <MenuItem key={status} value={status}>
                      <Chip 
                        label={status.replace('-', ' ')}
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
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {formTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>

          {/* Forms Table */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Form Title</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredForms
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((form) => (
                    <TableRow
                      key={form.id}
                      hover
                      sx={{ 
                        cursor: 'pointer',
                        '&:last-child td, &:last-child th': { border: 0 } 
                      }}
                      onClick={() => handleFormClick(form.id)}
                    >
                      <TableCell component="th" scope="row">
                        <Typography variant="subtitle2">{form.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {form.job}
                        </Typography>
                      </TableCell>
                      <TableCell>{form.client}</TableCell>
                      <TableCell>
                        {formatDate(form.dueDate)}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Chip 
                            label={form.status.replace('-', ' ')} 
                            size="small"
                            color={getStatusColor(form.status)}
                            sx={{ textTransform: 'capitalize' }}
                          />
                          {form.status === 'in-progress' && 'progress' in form && (
                            <Box sx={{ width: '100%', mt: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={form.progress as number} 
                                sx={{ height: 4, borderRadius: 2 }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {form.progress}% complete
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={form.type} 
                          size="small"
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>{form.assignedTo}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuOpen(e, form.id);
                          }}
                        >
                          <MoreIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredForms.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No forms found matching your criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredForms.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>

          {/* Form Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {
              handleMenuClose();
              if (selectedFormId) router.push(`/forms/${selectedFormId}`);
            }}>
              <ListItemIcon>
                <ViewIcon fontSize="small" />
              </ListItemIcon>
              View Form
            </MenuItem>
            <MenuItem onClick={() => {
              handleMenuClose();
              if (selectedFormId) router.push(`/forms/${selectedFormId}/edit`);
            }}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Edit Form
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <CompleteIcon fontSize="small" />
              </ListItemIcon>
              Mark Complete
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <DownloadIcon fontSize="small" />
              </ListItemIcon>
              Download PDF
            </MenuItem>
          </Menu>
        </Container>
      </MainLayout>
    </>
  );
}