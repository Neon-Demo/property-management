# Screen Breakdown for RPF Enterprise Application

## 1. Authentication & Onboarding Screens

### 1.1 Login Screen
- **Purpose**: Allow users to sign in to the application
- **Components**:
  - Email and password input fields
  - "Sign in with Google" button
  - "Sign in with Microsoft" button
  - "Forgot Password" link
  - Remember me checkbox
- **Actions**:
  - Authenticate user credentials
  - Redirect to dashboard upon success
  - Show appropriate error messages

### 1.2 Forgot Password Screen
- **Purpose**: Enable users to reset their password
- **Components**:
  - Email input field
  - Submit button
- **Actions**:
  - Send password reset email
  - Confirm email sent

### 1.3 User Profile Setup Screen
- **Purpose**: Complete user profile information
- **Components**:
  - Personal information fields (name, contact details)
  - Profile picture upload
  - Job role selection
  - Notification preferences
- **Actions**:
  - Save profile information
  - Upload profile picture
  - Set notification preferences

## 2. Dashboard Screens

### 2.1 Main Dashboard
- **Purpose**: Provide overview of user's projects and tasks
- **Components**:
  - Summary statistics (active projects, pending reports, etc.)
  - Recent activities feed
  - Calendar view of scheduled inspections
  - Quick action buttons (new project, new form, etc.)
  - Notifications area
- **Actions**:
  - Navigate to projects, forms, reports
  - View activity history
  - Acknowledge notifications

### 2.2 Project Dashboard
- **Purpose**: View all projects assigned to user or team
- **Components**:
  - Project list with filtering options
  - Project status indicators
  - Search functionality
  - Sorting options (by date, client, status)
  - Project type indicators
- **Actions**:
  - Filter and sort projects
  - Search for specific projects
  - Select project for detailed view
  - Export project list

## 3. Project Management Screens

### 3.1 Project Details Screen
- **Purpose**: View comprehensive information about a specific project
- **Components**:
  - Project header with key information (number, client, location)
  - Project description
  - Status timeline
  - Associated forms and reports
  - Team members assigned
  - Map view of location
- **Actions**:
  - Update project status
  - Access related forms
  - Generate reports
  - Assign team members

### 3.2 New Project Screen
- **Purpose**: Create a new project manually (fallback option)
- **Components**:
  - Project details form
  - Client selection
  - Location input with map integration
  - Project type selection
  - Required forms checklist
- **Actions**:
  - Create new project record
  - Associate with client
  - Set initial project status

### 3.3 Project Planning Screen
- **Purpose**: Plan inspection details and requirements
- **Components**:
  - Equipment checklist based on project type
  - Required forms list
  - Travel planning with map and directions
  - Team assignment section
  - Schedule selection
- **Actions**:
  - Mark equipment as packed
  - Assign team members
  - Schedule inspection date/time
  - Calculate travel requirements

## 4. Form Management Screens

### 4.1 Form Library Screen
- **Purpose**: Access all available form templates
- **Components**:
  - Form categories
  - Search functionality
  - Recently used forms
  - Form status indicators
- **Actions**:
  - Search and filter forms
  - Select form template
  - View form details

### 4.2 Form Selection Screen
- **Purpose**: Select appropriate form for current project
- **Components**:
  - Project-specific recommended forms
  - Form descriptions
  - Required vs. optional indicators
- **Actions**:
  - Select forms for completion
  - View form requirements
  - Start new form

### 4.3 Form Editor Screen
- **Purpose**: Create or modify form templates (admin only)
- **Components**:
  - Drag-and-drop form builder
  - Field type selection
  - Conditional logic editor
  - Validation rules editor
- **Actions**:
  - Create new form templates
  - Modify existing templates
  - Set validation rules
  - Establish conditional logic

## 5. Data Collection Screens

### 5.1 Bulk Sampling Form
- **Purpose**: Record bulk material sampling information
- **Components**:
  - Auto-populated project fields
  - Material type selection
  - Condition assessment
  - Location fields
  - Quantity estimation
  - Sample ID generator
  - Photo attachment
- **Actions**:
  - Record sample information
  - Take and attach photos
  - Generate unique sample IDs
  - Save partial forms for later completion

### 5.2 HMI Inventory Form
- **Purpose**: Document hazardous materials inventory
- **Components**:
  - Material category selection
  - Location mapping
  - Condition assessment
  - Quantity estimation
  - Risk assessment
  - Photo attachment
- **Actions**:
  - Document material presence
  - Assess and record conditions
  - Attach supporting photos
  - Mark areas on floor plan

### 5.3 XRF Testing Form
- **Purpose**: Record XRF testing results
- **Components**:
  - Testing location fields
  - Reading values input
  - Material substrate selection
  - Color/condition documentation
  - Calibration verification
  - Result interpretation
- **Actions**:
  - Record test results
  - Verify calibration
  - Document testing conditions
  - Flag concerning results

### 5.4 General Service Log
- **Purpose**: Document general inspection activities
- **Components**:
  - Activity type selection
  - Time tracking
  - Location documentation
  - Observations text area
  - Action items
  - Follow-up requirements
- **Actions**:
  - Log inspection activities
  - Record observations
  - Document recommended actions
  - Set follow-up requirements

## 6. Results Management Screens

### 6.1 Sample Tracking Screen
- **Purpose**: Track samples and their laboratory results
- **Components**:
  - Sample list with status indicators
  - Lab selection
  - Result input fields
  - Result status (positive/negative)
  - Date tracking (collected, submitted, results received)
- **Actions**:
  - Update sample status
  - Record lab results
  - Flag positive results
  - Link results to samples

### 6.2 Results Import Screen
- **Purpose**: Import laboratory results in batch
- **Components**:
  - File upload area
  - Sample ID mapping
  - Result preview
  - Validation warnings
- **Actions**:
  - Upload results file
  - Map imported data to samples
  - Validate and confirm import
  - Handle exceptions

### 6.3 Results Review Screen
- **Purpose**: Review and verify laboratory results
- **Components**:
  - Results summary by project
  - Positive results highlighting
  - Verification checklist
  - Notes section
- **Actions**:
  - Review result accuracy
  - Verify completeness
  - Add notes or observations
  - Approve results for reporting

## 7. Report Generation Screens

### 7.1 Report Template Selection
- **Purpose**: Select appropriate report template
- **Components**:
  - Template categories
  - Preview thumbnails
  - Template descriptions
  - Recently used templates
- **Actions**:
  - Select report template
  - View template details
  - Start report generation

### 7.2 Report Configuration
- **Purpose**: Configure report settings before generation
- **Components**:
  - Report sections toggle
  - Optional content selection
  - Client information verification
  - Appendix configuration
- **Actions**:
  - Select report sections
  - Configure report options
  - Verify client information
  - Set report parameters

### 7.3 Report Preview & Edit
- **Purpose**: Preview and modify generated report
- **Components**:
  - Report preview pane
  - Section navigation
  - Inline text editor
  - Table editor
  - Image placement editor
- **Actions**:
  - Preview report sections
  - Make text edits
  - Adjust tables and data
  - Reposition images
  - Add annotations

### 7.4 Report Approval & Submission
- **Purpose**: Review, approve, and submit final report
- **Components**:
  - Final report preview
  - Approval checklist
  - Digital signature area
  - Submission options
  - Distribution list
- **Actions**:
  - Complete approval checklist
  - Apply digital signature
  - Select distribution method
  - Submit final report

## 8. Administration Screens

### 8.1 User Management
- **Purpose**: Manage system users and permissions
- **Components**:
  - User list with roles
  - User creation form
  - Permission assignment
  - Status controls (active/inactive)
- **Actions**:
  - Create new users
  - Modify user roles
  - Set permissions
  - Activate/deactivate users

### 8.2 System Configuration
- **Purpose**: Configure system settings
- **Components**:
  - Airtable integration settings
  - Notification preferences
  - Default settings
  - System branding
- **Actions**:
  - Configure integration parameters
  - Set system defaults
  - Customize notifications
  - Apply branding elements

### 8.3 Analytics Dashboard
- **Purpose**: View system usage and performance metrics
- **Components**:
  - Usage statistics
  - Performance metrics
  - User activity reports
  - Project completion trends
- **Actions**:
  - View analytics data
  - Export reports
  - Set date ranges
  - Filter by categories

## 9. Mobile-Specific Screens

### 9.1 Offline Mode Indicator
- **Purpose**: Indicate offline status and sync queue
- **Components**:
  - Connection status indicator
  - Pending sync count
  - Last sync timestamp
  - Manual sync button
- **Actions**:
  - View sync status
  - Initiate manual sync
  - View offline data

### 9.2 Photo Capture Screen
- **Purpose**: Capture and annotate photos in the field
- **Components**:
  - Camera viewfinder
  - Capture button
  - Gallery access
  - Annotation tools
  - Sample/location tagging
- **Actions**:
  - Capture photos
  - Add annotations
  - Tag with sample ID
  - Associate with location

### 9.3 Location Marking Screen
- **Purpose**: Mark and record precise locations
- **Components**:
  - Interactive map
  - GPS coordinates
  - Location search
  - Marking tools
  - Floor plan overlay option
- **Actions**:
  - Mark sampling locations
  - Record GPS coordinates
  - Select from floor plan
  - Add location notes
