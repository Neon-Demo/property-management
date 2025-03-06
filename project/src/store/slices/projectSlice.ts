import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/services/api';

interface Project {
  id: string;
  number: string;
  name: string;
  client: {
    id: string;
    name: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call when backend is ready
      // const response = await api.get('/projects');
      // return response.data.projects;
      
      // Mock data for now
      return [
        {
          id: '1',
          number: 'PRJ-001',
          name: 'Downtown Office Inspection',
          client: {
            id: '1',
            name: 'ABC Corporation',
          },
          location: {
            address: '123 Main St',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
          },
          type: 'Inspection',
          status: 'Active',
          createdAt: '2025-01-15T00:00:00.000Z',
          updatedAt: '2025-01-15T00:00:00.000Z',
        },
        {
          id: '2',
          number: 'PRJ-002',
          name: 'Residential Building Assessment',
          client: {
            id: '2',
            name: 'XYZ Properties',
          },
          location: {
            address: '456 Park Ave',
            city: 'New York',
            state: 'NY',
            zipCode: '10022',
          },
          type: 'Assessment',
          status: 'Pending',
          createdAt: '2025-02-01T00:00:00.000Z',
          updatedAt: '2025-02-01T00:00:00.000Z',
        },
      ];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (projectId: string, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call when backend is ready
      // const response = await api.get(`/projects/${projectId}`);
      // return response.data;
      
      // Mock data for now
      return {
        id: projectId,
        number: 'PRJ-001',
        name: 'Downtown Office Inspection',
        description: 'Complete inspection of downtown office building',
        client: {
          id: '1',
          name: 'ABC Corporation',
          contact: {
            name: 'John Smith',
            email: 'john@abccorp.com',
            phone: '555-123-4567',
          },
        },
        location: {
          address: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          coordinates: {
            latitude: 37.7749,
            longitude: -122.4194,
          },
        },
        type: 'Inspection',
        status: 'Active',
        assignedUsers: [
          {
            id: '1',
            name: 'Jane Doe',
            role: 'Inspector',
          },
        ],
        createdAt: '2025-01-15T00:00:00.000Z',
        updatedAt: '2025-01-15T00:00:00.000Z',
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch project');
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentProject, clearCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;