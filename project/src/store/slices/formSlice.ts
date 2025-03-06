import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/services/api';

interface FormTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface Form {
  id: string;
  templateId: string;
  projectId: string;
  name: string;
  type: string;
  status: string;
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface FormState {
  templates: FormTemplate[];
  forms: Form[];
  currentForm: Form | null;
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  templates: [],
  forms: [],
  currentForm: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchFormTemplates = createAsyncThunk(
  'forms/fetchFormTemplates',
  async (_, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call when backend is ready
      // const response = await api.get('/forms/templates');
      // return response.data.templates;
      
      // Mock data for now
      return [
        {
          id: '1',
          name: 'Bulk Sampling Form',
          type: 'sampling',
          description: 'Form for recording bulk material sampling information',
        },
        {
          id: '2',
          name: 'HMI Inventory Form',
          type: 'inventory',
          description: 'Form for documenting hazardous materials inventory',
        },
        {
          id: '3',
          name: 'XRF Testing Form',
          type: 'testing',
          description: 'Form for recording XRF testing results',
        },
        {
          id: '4',
          name: 'General Service Log',
          type: 'service',
          description: 'Form for documenting general inspection activities',
        },
      ];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch form templates');
    }
  }
);

export const fetchFormsByProject = createAsyncThunk(
  'forms/fetchFormsByProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call when backend is ready
      // const response = await api.get(`/projects/${projectId}/forms`);
      // return response.data.forms;
      
      // Mock data for now
      return [
        {
          id: '1',
          templateId: '1',
          projectId,
          name: 'Bulk Sampling Form',
          type: 'sampling',
          status: 'completed',
          data: {},
          createdAt: '2025-01-20T00:00:00.000Z',
          updatedAt: '2025-01-20T00:00:00.000Z',
        },
        {
          id: '2',
          templateId: '2',
          projectId,
          name: 'HMI Inventory Form',
          type: 'inventory',
          status: 'in-progress',
          data: {},
          createdAt: '2025-01-21T00:00:00.000Z',
          updatedAt: '2025-01-21T00:00:00.000Z',
        },
      ];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch forms');
    }
  }
);

export const fetchFormById = createAsyncThunk(
  'forms/fetchFormById',
  async (formId: string, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call when backend is ready
      // const response = await api.get(`/forms/${formId}`);
      // return response.data;
      
      // Mock data for now
      return {
        id: formId,
        templateId: '1',
        projectId: '1',
        name: 'Bulk Sampling Form',
        type: 'sampling',
        status: 'completed',
        data: {
          materialType: 'Drywall',
          location: 'Northeast corner, 2nd floor',
          condition: 'Good',
          quantity: {
            value: 10,
            unit: 'sq.ft.',
          },
          samplingMethod: 'Core sample',
          notes: 'Sample appears to be in good condition',
        },
        createdAt: '2025-01-20T00:00:00.000Z',
        updatedAt: '2025-01-20T00:00:00.000Z',
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch form');
    }
  }
);

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setCurrentForm: (state, action: PayloadAction<Form>) => {
      state.currentForm = action.payload;
    },
    clearCurrentForm: (state) => {
      state.currentForm = null;
    },
    updateFormData: (state, action: PayloadAction<{ formId: string; data: Record<string, any> }>) => {
      const { formId, data } = action.payload;
      
      if (state.currentForm && state.currentForm.id === formId) {
        state.currentForm.data = { ...state.currentForm.data, ...data };
      }
      
      const formIndex = state.forms.findIndex(form => form.id === formId);
      if (formIndex !== -1) {
        state.forms[formIndex].data = { ...state.forms[formIndex].data, ...data };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchFormTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFormsByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormsByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload;
      })
      .addCase(fetchFormsByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFormById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentForm = action.payload;
      })
      .addCase(fetchFormById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentForm, clearCurrentForm, updateFormData } = formSlice.actions;
export default formSlice.reducer;