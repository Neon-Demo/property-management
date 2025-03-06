# Requirements for Zerion/RPF Enterprise Application

Based on the meeting notes and transcript, I'll outline a comprehensive set of requirements for the enterprise application that will digitize RPF's current workflow and integrate with their existing systems.

## 1. Authentication Requirements

### 1.1 Single Sign-On (SSO)
- Implement Google SSO for user authentication
- Implement Microsoft SSO for user authentication
- Support role-based access control with different permission levels (admin, inspector, manager)
- Enable secure password management and recovery

## 2. Integration Requirements

### 2.1 Airtable Integration
- Maintain Airtable as the primary data source for job information
- Establish secure API connections to pull project data from Airtable
- Support daily synchronization to retrieve newly opened projects
- Enable querying by project number to retrieve associated job details

### 2.2 Data Import/Export
- Allow for daily batch import of new projects via Excel if needed
- Generate PDF reports that can be shared with clients
- Support export of collected data in various formats

## 3. Form Digitization Requirements

### 3.1 Field Data Collection
- Digitize current pen-and-paper forms for field use:
  - Bulk sampling forms
  - HMI inventory forms
  - XRF testing forms
  - General service logs
- Support different form types based on job classification:
  - Asbestos-only surveys
  - Full hazmat inspections
  - Spot surveys

### 3.2 Form Functionality
- Auto-populate forms with job information from Airtable (job number, client, location)
- Include field validation to ensure complete and accurate data collection
- Support offline data collection with synchronization when connectivity is restored
- Enable photo/image attachment for visual documentation
- Implement conditional logic to show/hide form sections based on job type

## 4. Workflow Management Requirements

### 4.1 Job Preparation
- Display job details, location, and inspection requirements
- Provide checklists for equipment and forms needed based on job type
- Calculate travel distance and estimated arrival times

### 4.2 Inspection Process
- Guide inspectors through appropriate inspection protocols
- Track sample collection with unique identifiers
- Record material conditions, locations, and quantities
- Document sampling methods and observations

### 4.3 Results Management
- Record laboratory results for collected samples
- Flag positive/negative results
- Link lab data to collected samples

## 5. Report Generation Requirements

### 5.1 Automated Reporting
- Auto-generate reports based on field-collected data and lab results
- Support multiple report templates based on job type (full hazmat, asbestos-only, etc.)
- Automatically populate tables with sample data, locations, and results
- Include conditional sections based on findings (positive/negative results)

### 5.2 Report Customization
- Allow for manual adjustments and additions to auto-generated reports
- Support review and approval workflow before final submission
- Enable digital signature capabilities for report certification

## 6. Technical Requirements

### 6.1 Platform Compatibility
- Function on mobile devices for field use (iOS and Android)
- Support desktop access for office-based tasks
- Optimize interface for both touchscreen and keyboard/mouse input

### 6.2 Performance and Reliability
- Operate in areas with limited connectivity
- Maintain data integrity through synchronization protocols
- Implement regular data backup mechanisms

### 6.3 Security
- Encrypt all data at rest and in transit
- Implement secure API connections to third-party services
- Comply with relevant data protection regulations

## 7. Ownership and Maintenance

### 7.1 Software Ownership
- The completed application will be owned by RPF
- No ongoing user licensing fees

### 7.2 Maintenance and Updates
- Include AI-driven maintenance engine for automatic updates
- Support for ongoing operating system and security updates
- System adaptability for future workflow changes

## 8. Project Deliverables

### 8.1 Initial Phase
- Wireframes and visual prototype ($3,000 consulting fee)
- Detailed technical specifications
- Final cost estimate for complete development

### 8.2 Final Deliverables
- Fully functional application meeting all requirements
- Documentation and training materials
- Source code and ownership transfer

This requirements document outlines the foundational elements needed for the custom application based on the meeting discussion. The document can be refined during the wireframing process to ensure all specific needs are addressed.