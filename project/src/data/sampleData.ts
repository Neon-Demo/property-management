// This file contains sample data for development purposes

// Projects
export const projects = [
  {
    id: '1',
    number: 'PRJ-001',
    name: 'Downtown Office Inspection',
    description: 'Complete inspection of downtown office building for environmental hazards.',
    client: {
      id: '1',
      name: 'ABC Corporation',
      contact: {
        name: 'John Smith',
        email: 'john@abccorp.com',
        phone: '555-123-4567',
      }
    },
    location: {
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      }
    },
    type: 'Inspection',
    status: 'Active',
    assignedUsers: [
      {
        id: '1',
        name: 'Jane Doe',
        role: 'Inspector',
      }
    ],
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z',
  },
  {
    id: '2',
    number: 'PRJ-002',
    name: 'Residential Building Assessment',
    description: 'Assessment of residential building for potential lead and asbestos.',
    client: {
      id: '2',
      name: 'XYZ Properties',
      contact: {
        name: 'Sarah Johnson',
        email: 'sarah@xyzprops.com',
        phone: '555-987-6543',
      }
    },
    location: {
      address: '456 Park Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060,
      }
    },
    type: 'Assessment',
    status: 'Pending',
    assignedUsers: [
      {
        id: '2',
        name: 'Mark Wilson',
        role: 'Senior Inspector',
      }
    ],
    createdAt: '2025-02-01T00:00:00.000Z',
    updatedAt: '2025-02-01T00:00:00.000Z',
  },
  {
    id: '3',
    number: 'PRJ-003',
    name: 'Industrial Facility Compliance Check',
    description: 'Regulatory compliance inspection for industrial manufacturing facility.',
    client: {
      id: '3',
      name: 'Industrial Manufacturing Co.',
      contact: {
        name: 'Robert Chen',
        email: 'robert@indmanufacturing.com',
        phone: '555-222-3333',
      }
    },
    location: {
      address: '789 Factory Blvd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60607',
      coordinates: {
        latitude: 41.8781,
        longitude: -87.6298,
      }
    },
    type: 'Compliance',
    status: 'Completed',
    assignedUsers: [
      {
        id: '3',
        name: 'Emily Rodriguez',
        role: 'Compliance Specialist',
      }
    ],
    createdAt: '2025-01-10T00:00:00.000Z',
    updatedAt: '2025-01-25T00:00:00.000Z',
  }
];

// Form Templates
export const formTemplates = [
  {
    id: '1',
    name: 'Bulk Sampling Form',
    type: 'sampling',
    description: 'Form for recording bulk material sampling information',
    schema: {
      fields: [
        { id: 'materialType', type: 'select', label: 'Material Type', required: true, options: ['Drywall', 'Insulation', 'Tile', 'Pipe Material', 'Other'] },
        { id: 'location', type: 'text', label: 'Location Description', required: true },
        { id: 'condition', type: 'select', label: 'Material Condition', required: true, options: ['Good', 'Fair', 'Poor', 'Damaged'] },
        { id: 'quantity', type: 'number', label: 'Estimated Quantity', required: true },
        { id: 'unit', type: 'select', label: 'Unit', required: true, options: ['sq.ft.', 'linear ft.', 'cu.ft.'] },
        { id: 'samplingMethod', type: 'select', label: 'Sampling Method', required: true, options: ['Core Sample', 'Bulk Collection', 'Surface Wipe', 'Air Sample'] },
        { id: 'notes', type: 'textarea', label: 'Notes', required: false },
        { id: 'photos', type: 'file', label: 'Photos', required: false, multiple: true }
      ]
    }
  },
  {
    id: '2',
    name: 'HMI Inventory Form',
    type: 'inventory',
    description: 'Form for documenting hazardous materials inventory',
    schema: {
      fields: [
        { id: 'materialCategory', type: 'select', label: 'Material Category', required: true, options: ['Asbestos', 'Lead', 'PCBs', 'Mercury', 'Other'] },
        { id: 'location', type: 'text', label: 'Location Description', required: true },
        { id: 'condition', type: 'select', label: 'Material Condition', required: true, options: ['Good', 'Fair', 'Poor', 'Damaged'] },
        { id: 'quantity', type: 'number', label: 'Estimated Quantity', required: true },
        { id: 'unit', type: 'select', label: 'Unit', required: true, options: ['sq.ft.', 'linear ft.', 'cu.ft.', 'each'] },
        { id: 'accessibility', type: 'select', label: 'Accessibility', required: true, options: ['High', 'Moderate', 'Low'] },
        { id: 'disturbance', type: 'select', label: 'Potential for Disturbance', required: true, options: ['High', 'Moderate', 'Low'] },
        { id: 'notes', type: 'textarea', label: 'Notes', required: false },
        { id: 'photos', type: 'file', label: 'Photos', required: false, multiple: true }
      ]
    }
  },
  {
    id: '3',
    name: 'XRF Testing Form',
    type: 'testing',
    description: 'Form for recording XRF testing results',
    schema: {
      fields: [
        { id: 'substrate', type: 'select', label: 'Substrate', required: true, options: ['Drywall', 'Wood', 'Metal', 'Concrete', 'Brick', 'Other'] },
        { id: 'component', type: 'select', label: 'Component', required: true, options: ['Wall', 'Door', 'Window', 'Trim', 'Floor', 'Ceiling', 'Other'] },
        { id: 'color', type: 'text', label: 'Color', required: true },
        { id: 'location', type: 'text', label: 'Location Description', required: true },
        { id: 'reading', type: 'number', label: 'XRF Reading (mg/cm²)', required: true },
        { id: 'calibration', type: 'text', label: 'Calibration Check', required: true },
        { id: 'result', type: 'select', label: 'Result', required: true, options: ['Positive', 'Negative', 'Inconclusive'] },
        { id: 'notes', type: 'textarea', label: 'Notes', required: false }
      ]
    }
  },
  {
    id: '4',
    name: 'General Service Log',
    type: 'service',
    description: 'Form for documenting general inspection activities',
    schema: {
      fields: [
        { id: 'activityType', type: 'select', label: 'Activity Type', required: true, options: ['Initial Assessment', 'Follow-up Inspection', 'Monitoring', 'Clearance Testing', 'Other'] },
        { id: 'startTime', type: 'time', label: 'Start Time', required: true },
        { id: 'endTime', type: 'time', label: 'End Time', required: true },
        { id: 'location', type: 'text', label: 'Location Description', required: true },
        { id: 'personnel', type: 'text', label: 'Personnel Present', required: true },
        { id: 'observations', type: 'textarea', label: 'Observations', required: true },
        { id: 'actionItems', type: 'textarea', label: 'Action Items', required: false },
        { id: 'followUpRequired', type: 'checkbox', label: 'Follow-up Required', required: false },
        { id: 'photos', type: 'file', label: 'Photos', required: false, multiple: true }
      ]
    }
  }
];

// Report Templates
export const reportTemplates = [
  {
    id: '1',
    name: 'Inspection Report',
    type: 'inspection',
    description: 'Standard inspection report template'
  },
  {
    id: '2',
    name: 'Assessment Report',
    type: 'assessment',
    description: 'Detailed assessment report template'
  },
  {
    id: '3',
    name: 'Lab Results Report',
    type: 'lab-results',
    description: 'Laboratory results report template'
  }
];

// Forms
export const forms = [
  {
    id: '1',
    templateId: '1',
    projectId: '1',
    name: 'Bulk Sampling Form',
    type: 'sampling',
    status: 'completed',
    data: {
      materialType: 'Drywall',
      location: 'Northeast corner, 2nd floor',
      condition: 'Good',
      quantity: 10,
      unit: 'sq.ft.',
      samplingMethod: 'Core Sample',
      notes: 'Sample appears to be in good condition'
    },
    createdAt: '2025-01-20T00:00:00.000Z',
    updatedAt: '2025-01-20T00:00:00.000Z',
  },
  {
    id: '2',
    templateId: '2',
    projectId: '1',
    name: 'HMI Inventory Form',
    type: 'inventory',
    status: 'in-progress',
    data: {
      materialCategory: 'Asbestos',
      location: 'Ceiling tiles, 3rd floor conference room',
      condition: 'Fair',
      quantity: 500,
      unit: 'sq.ft.',
      accessibility: 'Moderate',
      disturbance: 'Low'
    },
    createdAt: '2025-01-21T00:00:00.000Z',
    updatedAt: '2025-01-21T00:00:00.000Z',
  }
];

// Reports
export const reports = [
  {
    id: '1',
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
  },
  {
    id: '2',
    projectId: '1',
    templateId: '3',
    name: 'Lab Results Summary',
    type: 'lab-results',
    status: 'completed',
    content: {
      sections: [
        {
          id: 'sec1',
          title: 'Overview',
          content: 'This report summarizes the laboratory results from samples collected...',
        },
        {
          id: 'sec2',
          title: 'Methodology',
          content: 'Samples were analyzed using polarized light microscopy (PLM)...',
        },
        {
          id: 'sec3',
          title: 'Results Summary',
          content: 'Of the 15 samples collected, 3 were found to contain asbestos...',
        },
        {
          id: 'sec4',
          title: 'Recommendations',
          content: 'Based on the laboratory results, we recommend the following actions...',
        },
      ],
      tables: [
        {
          id: 'tbl1',
          title: 'Laboratory Results',
          data: [
            ['Sample ID', 'Material', 'Asbestos Content', 'Result'],
            ['S001', 'Ceiling Tile', 'None Detected', 'Negative'],
            ['S002', 'Wall Material', '2% Chrysotile', 'Positive'],
            ['S003', 'Pipe Insulation', '5% Amosite', 'Positive'],
          ],
        },
      ],
      appendices: [
        {
          id: 'app1',
          title: 'Laboratory Analysis Reports',
          content: 'Detailed laboratory analysis reports...',
        },
      ],
    },
    createdAt: '2025-01-28T00:00:00.000Z',
    updatedAt: '2025-01-30T00:00:00.000Z',
    approvedAt: '2025-01-30T00:00:00.000Z',
  }
];