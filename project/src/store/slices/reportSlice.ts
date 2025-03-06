import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/services/api';

interface ReportTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface Report {
  id: string;
  projectId: string;
  templateId: string;
  name: string;
  type: string;
  status: string;
  content?: {
    sections: {
      id: string;
      title: string;
      content: string;
    }[];
    tables: {
      id: string;
      title: string;
      data: string[][];
    }[];
    appendices: {
      id: string;
      title: string;
      content: string;
    }[];
  };
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
}

interface ReportState {
  templates: ReportTemplate[];
  reports: Report[];
  currentReport: Report | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  templates: [],
  reports: [],
  currentReport: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchReportTemplates = createAsyncThunk(
  'reports/fetchReportTemplates',
  async (_, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call when backend is ready
      // const response = await api.get('/reports/templates');
      // return response.data.templates;
      
      // Mock data for now
      return [
        {
          id: '1',
          name: 'Inspection Report',
          type: 'inspection',
          description: 'Standard inspection report template',
        },
        {
          id: '2',
          name: 'Assessment Report',
          type: 'assessment',
          description: 'Detailed assessment report template',
        },
        {
          id: '3',
          name: 'Lab Results Report',
          type: 'lab-results',
          description: 'Laboratory results report template',
        },
      ];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch report templates');
    }
  }
);

export const fetchReportsByProject = createAsyncThunk(
  'reports/fetchReportsByProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call when backend is ready
      // const response = await api.get(`/projects/${projectId}/reports`);
      // return response.data.reports;
      
      // Mock data for now
      return [
        {
          id: '1',
          projectId,
          templateId: '1',
          name: 'Initial Inspection Report',
          type: 'inspection',
          status: 'draft',
          createdAt: '2025-01-25T00:00:00.000Z',
          updatedAt: '2025-01-25T00:00:00.000Z',
        },
        {
          id: '2',
          projectId,
          templateId: '3',
          name: 'Lab Results Summary',
          type: 'lab-results',
          status: 'completed',
          createdAt: '2025-01-28T00:00:00.000Z',
          updatedAt: '2025-01-30T00:00:00.000Z',
          approvedAt: '2025-01-30T00:00:00.000Z',
        },
      ];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reports');
    }
  }
);

export const fetchReportById = createAsyncThunk(
  'reports/fetchReportById',
  async (reportId: string, { rejectWithValue }) => {
    try {
      // This will be replaced with actual API call when backend is ready
      // const response = await api.get(`/reports/${reportId}`);
      // return response.data;
      
      // Mock data for now
      return {
        id: reportId,
        projectId: '1',
        templateId: '1',
        name: 'Initial Inspection Report',
        type: 'inspection',
        status: 'draft',
        content: {
          sections: [
            {
              id: 'sec1',
              title: 'Executive Summary',
              content: 'This report summarizes the findings of the initial inspection...',
            },
            {
              id: 'sec2',
              title: 'Methodology',
              content: 'The inspection was conducted using standard protocols...',
            },
            {
              id: 'sec3',
              title: 'Findings',
              content: 'Several areas of concern were identified during the inspection...',
            },
            {
              id: 'sec4',
              title: 'Recommendations',
              content: 'Based on the findings, we recommend the following actions...',
            },
          ],
          tables: [
            {
              id: 'tbl1',
              title: 'Sampling Results',
              data: [
                ['Sample ID', 'Location', 'Material', 'Result'],
                ['S001', 'Room 101', 'Ceiling Tile', 'Negative'],
                ['S002', 'Room 203', 'Wall Material', 'Positive'],
                ['S003', 'Basement', 'Pipe Insulation', 'Positive'],
              ],
            },
          ],
          appendices: [
            {
              id: 'app1',
              title: 'Laboratory Certificates',
              content: 'Laboratory certification information...',
            },
          ],
        },
        createdAt: '2025-01-25T00:00:00.000Z',
        updatedAt: '2025-01-25T00:00:00.000Z',
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch report');
    }
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setCurrentReport: (state, action: PayloadAction<Report>) => {
      state.currentReport = action.payload;
    },
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
    updateReportContent: (state, action: PayloadAction<{ 
      reportId: string; 
      content: Report['content'];
    }>) => {
      const { reportId, content } = action.payload;
      
      if (state.currentReport && state.currentReport.id === reportId) {
        state.currentReport.content = content;
      }
      
      const reportIndex = state.reports.findIndex(report => report.id === reportId);
      if (reportIndex !== -1) {
        state.reports[reportIndex].content = content;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchReportTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReportsByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportsByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReportsByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReport = action.payload;
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentReport, clearCurrentReport, updateReportContent } = reportSlice.actions;
export default reportSlice.reducer;