# API Specification

## 1. Overview

This document outlines the API specifications for the enterprise application that integrates job scheduling, assignment, and data collection functionalities with Airtable as the primary data source. The API will serve as the communication layer between the frontend application, Airtable, and various third-party services.

## 2. API Architecture

### 2.1 General Architecture

- **API Style**: RESTful
- **Data Format**: JSON
- **Authentication**: JWT (JSON Web Tokens)
- **Versioning**: URI-based versioning (e.g., `/api/v1/resource`)
- **Base URL**: `https://api.enterpriseapp.com/v1`

### 2.2 Authentication

All API endpoints (except for authentication endpoints) require authentication through JWT tokens. These tokens are obtained via SSO through Google or Microsoft authentication services.

#### Authentication Headers
```
Authorization: Bearer {jwt_token}
```

### 2.3 Response Format

All API responses follow a consistent format:

#### Success Response
```json
{
  "status": "success",
  "data": {
    // Response data here
  },
  "meta": {
    "pagination": {
      "total": 100,
      "per_page": 25,
      "current_page": 1,
      "last_page": 4,
      "from": 1,
      "to": 25
    }
  }
}
```

#### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Additional error details when available
    }
  }
}
```

### 2.4 Rate Limiting

The API implements rate limiting to prevent abuse:

- Standard users: 100 requests per minute
- Service accounts: 1000 requests per minute

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1620000000
```

## 3. API Endpoints

### 3.1 Authentication Endpoints

#### 3.1.1 Initiate Google SSO

- **Endpoint**: `POST /auth/google/init`
- **Description**: Initiates the Google SSO authentication flow
- **Request Body**: None
- **Response**: Redirect URL to Google authentication

#### 3.1.2 Initiate Microsoft SSO

- **Endpoint**: `POST /auth/microsoft/init`
- **Description**: Initiates the Microsoft SSO authentication flow
- **Request Body**: None
- **Response**: Redirect URL to Microsoft authentication

#### 3.1.3 SSO Callback

- **Endpoint**: `GET /auth/callback`
- **Description**: Callback endpoint for SSO providers
- **Query Parameters**:
  - `code`: Authorization code from the provider
  - `state`: State parameter for CSRF protection
- **Response**: JWT token and user information

#### 3.1.4 Refresh Token

- **Endpoint**: `POST /auth/refresh`
- **Description**: Refreshes an expired JWT token
- **Request Headers**: `Authorization: Bearer {refresh_token}`
- **Response**: New JWT token

#### 3.1.5 Logout

- **Endpoint**: `POST /auth/logout`
- **Description**: Invalidates the current JWT token
- **Request Headers**: `Authorization: Bearer {jwt_token}`
- **Response**: Success message

### 3.2 User Management Endpoints

#### 3.2.1 Get Current User

- **Endpoint**: `GET /users/me`
- **Description**: Retrieves the current user's profile information
- **Response**: User profile data

#### 3.2.2 Update Current User

- **Endpoint**: `PATCH /users/me`
- **Description**: Updates the current user's profile
- **Request Body**: User profile fields to update
- **Response**: Updated user profile

#### 3.2.3 List Users (Admin)

- **Endpoint**: `GET /users`
- **Description**: Lists all users (admin only)
- **Query Parameters**:
  - `page`: Page number
  - `limit`: Items per page
  - `search`: Search term
  - `role`: Filter by role
  - `status`: Filter by status
- **Response**: Paginated list of users

#### 3.2.4 Get User (Admin)

- **Endpoint**: `GET /users/{userId}`
- **Description**: Retrieves a specific user's details (admin only)
- **Response**: User details

#### 3.2.5 Create User (Admin)

- **Endpoint**: `POST /users`
- **Description**: Creates a new user (admin only)
- **Request Body**: User details
- **Response**: Created user details

#### 3.2.6 Update User (Admin)

- **Endpoint**: `PATCH /users/{userId}`
- **Description**: Updates a user's details (admin only)
- **Request Body**: User fields to update
- **Response**: Updated user details

#### 3.2.7 Delete User (Admin)

- **Endpoint**: `DELETE /users/{userId}`
- **Description**: Deletes a user (admin only)
- **Response**: Success confirmation

### 3.3 Job Management Endpoints

#### 3.3.1 List Jobs

- **Endpoint**: `GET /jobs`
- **Description**: Lists jobs according to user's permissions
- **Query Parameters**:
  - `page`: Page number
  - `limit`: Items per page
  - `search`: Search term
  - `status`: Filter by status
  - `assigned_to`: Filter by assignee
  - `date_from`: Filter by date range start
  - `date_to`: Filter by date range end
  - `type`: Filter by job type
- **Response**: Paginated list of jobs

#### 3.3.2 Get Job

- **Endpoint**: `GET /jobs/{jobId}`
- **Description**: Retrieves details for a specific job
- **Response**: Job details

#### 3.3.3 Create Job

- **Endpoint**: `POST /jobs`
- **Description**: Creates a new job
- **Request Body**: Job details
- **Response**: Created job details

#### 3.3.4 Update Job

- **Endpoint**: `PATCH /jobs/{jobId}`
- **Description**: Updates a job's details
- **Request Body**: Job fields to update
- **Response**: Updated job details

#### 3.3.5 Delete Job

- **Endpoint**: `DELETE /jobs/{jobId}`
- **Description**: Deletes a job
- **Response**: Success confirmation

#### 3.3.6 Assign Job

- **Endpoint**: `POST /jobs/{jobId}/assignments`
- **Description**: Assigns a user to a job
- **Request Body**:
  ```json
  {
    "user_id": "user123",
    "role": "inspector",
    "notification": true
  }
  ```
- **Response**: Assignment details

#### 3.3.7 Unassign Job

- **Endpoint**: `DELETE /jobs/{jobId}/assignments/{assignmentId}`
- **Description**: Removes a user assignment from a job
- **Response**: Success confirmation

#### 3.3.8 Get Job Calendar

- **Endpoint**: `GET /calendar/jobs`
- **Description**: Retrieves job calendar events
- **Query Parameters**:
  - `start_date`: Calendar range start
  - `end_date`: Calendar range end
  - `user_id`: Filter by assigned user
- **Response**: Calendar events

### 3.4 Form Management Endpoints

#### 3.4.1 List Form Templates

- **Endpoint**: `GET /forms/templates`
- **Description**: Lists available form templates
- **Query Parameters**:
  - `page`: Page number
  - `limit`: Items per page
  - `search`: Search term
  - `category`: Filter by category
  - `status`: Filter by status
- **Response**: Paginated list of form templates

#### 3.4.2 Get Form Template

- **Endpoint**: `GET /forms/templates/{templateId}`
- **Description**: Retrieves details for a specific form template
- **Response**: Form template details with field definitions

#### 3.4.3 Create Form Template

- **Endpoint**: `POST /forms/templates`
- **Description**: Creates a new form template
- **Request Body**: Form template definition
- **Response**: Created form template

#### 3.4.4 Update Form Template

- **Endpoint**: `PATCH /forms/templates/{templateId}`
- **Description**: Updates a form template
- **Request Body**: Form template fields to update
- **Response**: Updated form template

#### 3.4.5 Delete Form Template

- **Endpoint**: `DELETE /forms/templates/{templateId}`
- **Description**: Deletes a form template
- **Response**: Success confirmation

#### 3.4.6 List Forms

- **Endpoint**: `GET /forms`
- **Description**: Lists form instances
- **Query Parameters**:
  - `page`: Page number
  - `limit`: Items per page
  - `search`: Search term
  - `status`: Filter by status
  - `job_id`: Filter by job
  - `template_id`: Filter by template
  - `created_by`: Filter by creator
- **Response**: Paginated list of forms

#### 3.4.7 Get Form

- **Endpoint**: `GET /forms/{formId}`
- **Description**: Retrieves details for a specific form instance
- **Response**: Form details with field values

#### 3.4.8 Create Form

- **Endpoint**: `POST /forms`
- **Description**: Creates a new form instance
- **Request Body**:
  ```json
  {
    "template_id": "template123",
    "job_id": "job456",
    "title": "Site Inspection - 123 Main St"
  }
  ```
- **Response**: Created form instance (empty)

#### 3.4.9 Update Form

- **Endpoint**: `PATCH /forms/{formId}`
- **Description**: Updates a form instance (partial or complete)
- **Request Body**: Form fields to update
- **Response**: Updated form instance

#### 3.4.10 Submit Form

- **Endpoint**: `POST /forms/{formId}/submit`
- **Description**: Submits a completed form
- **Request Body**: Optional submission notes
- **Response**: Submitted form with status update

#### 3.4.11 Upload Form Attachment

- **Endpoint**: `POST /forms/{formId}/attachments`
- **Description**: Uploads an attachment for a form
- **Request Body**: Multipart form data with file
- **Response**: Attachment details

### 3.5 Report Generation Endpoints

#### 3.5.1 List Report Templates

- **Endpoint**: `GET /reports/templates`
- **Description**: Lists available report templates
- **Query Parameters**:
  - `page`: Page number
  - `limit`: Items per page
  - `search`: Search term
  - `category`: Filter by category
- **Response**: Paginated list of report templates

#### 3.5.2 Get Report Template

- **Endpoint**: `GET /reports/templates/{templateId}`
- **Description**: Retrieves details for a specific report template
- **Response**: Report template details

#### 3.5.3 List Reports

- **Endpoint**: `GET /reports`
- **Description**: Lists generated reports
- **Query Parameters**:
  - `page`: Page number
  - `limit`: Items per page
  - `search`: Search term
  - `status`: Filter by status
  - `job_id`: Filter by job
  - `created_by`: Filter by creator
- **Response**: Paginated list of reports

#### 3.5.4 Get Report

- **Endpoint**: `GET /reports/{reportId}`
- **Description**: Retrieves details for a specific report
- **Response**: Report details

#### 3.5.5 Generate Report

- **Endpoint**: `POST /reports`
- **Description**: Generates a new report
- **Request Body**:
  ```json
  {
    "template_id": "template123",
    "form_ids": ["form123", "form456"],
    "job_id": "job789",
    "title": "Hazmat Assessment Report - 123 Main St"
  }
  ```
- **Response**: Generated report details

#### 3.5.6 Download Report

- **Endpoint**: `GET /reports/{reportId}/download`
- **Description**: Downloads a report as PDF
- **Query Parameters**:
  - `version`: Report version (optional)
- **Response**: PDF file stream

#### 3.5.7 Approve Report

- **Endpoint**: `POST /reports/{reportId}/approve`
- **Description**: Approves a report
- **Request Body**: Optional approval notes
- **Response**: Updated report with approval status

#### 3.5.8 Reject Report

- **Endpoint**: `POST /reports/{reportId}/reject`
- **Description**: Rejects a report
- **Request Body**: Rejection reason and notes
- **Response**: Updated report with rejection status

### 3.6 Airtable Sync Endpoints

#### 3.6.1 Sync Status

- **Endpoint**: `GET /sync/status`
- **Description**: Retrieves the current sync status with Airtable
- **Response**: Sync status details including last sync time, sync health, and pending changes

#### 3.6.2 Trigger Sync

- **Endpoint**: `POST /sync/trigger`
- **Description**: Manually triggers an Airtable synchronization
- **Request Body**:
  ```json
  {
    "tables": ["jobs", "clients", "forms"],  // Optional, sync specific tables only
    "force": false  // Force full sync instead of incremental
  }
  ```
- **Response**: Sync job details

#### 3.6.3 Sync Configuration

- **Endpoint**: `GET /sync/config`
- **Description**: Retrieves the current Airtable sync configuration
- **Response**: Sync configuration details

#### 3.6.4 Update Sync Configuration

- **Endpoint**: `PATCH /sync/config`
- **Description**: Updates the Airtable sync configuration
- **Request Body**: Configuration parameters to update
- **Response**: Updated sync configuration

### 3.7 Notification Endpoints

#### 3.7.1 List Notifications

- **Endpoint**: `GET /notifications`
- **Description**: Lists notifications for the current user
- **Query Parameters**:
  - `page`: Page number
  - `limit`: Items per page
  - `read`: Filter by read status (true/false)
- **Response**: Paginated list of notifications

#### 3.7.2 Mark Notification as Read

- **Endpoint**: `PATCH /notifications/{notificationId}`
- **Description**: Marks a notification as read
- **Response**: Updated notification

#### 3.7.3 Mark All Notifications as Read

- **Endpoint**: `PATCH /notifications/read-all`
- **Description**: Marks all notifications as read
- **Response**: Success confirmation

#### 3.7.4 Delete Notification

- **Endpoint**: `DELETE /notifications/{notificationId}`
- **Description**: Deletes a notification
- **Response**: Success confirmation

### 3.8 Calendar Integration Endpoints

#### 3.8.1 Sync with Google Calendar

- **Endpoint**: `POST /calendar/google/sync`
- **Description**: Syncs jobs with Google Calendar
- **Request Body**:
  ```json
  {
    "direction": "both",  // 'push', 'pull', or 'both'
    "date_range": {
      "start": "2023-01-01",
      "end": "2023-12-31"
    }
  }
  ```
- **Response**: Sync results

#### 3.8.2 Connect Google Calendar

- **Endpoint**: `POST /calendar/google/connect`
- **Description**: Connects the user's Google Calendar
- **Request Body**: OAuth tokens from Google
- **Response**: Connection status

#### 3.8.3 Disconnect Google Calendar

- **Endpoint**: `POST /calendar/google/disconnect`
- **Description**: Disconnects the user's Google Calendar
- **Response**: Success confirmation

### 3.9 File Management Endpoints

#### 3.9.1 Upload File

- **Endpoint**: `POST /files`
- **Description**: Uploads a file to the system
- **Request Body**: Multipart form data with file
- **Response**: File details including URL

#### 3.9.2 Get File

- **Endpoint**: `GET /files/{fileId}`
- **Description**: Retrieves file metadata
- **Response**: File details

#### 3.9.3 Download File

- **Endpoint**: `GET /files/{fileId}/download`
- **Description**: Downloads a file
- **Response**: File stream

#### 3.9.4 Delete File

- **Endpoint**: `DELETE /files/{fileId}`
- **Description**: Deletes a file
- **Response**: Success confirmation

## 4. Webhook API

### 4.1 Webhook Registration

#### 4.1.1 List Webhooks

- **Endpoint**: `GET /webhooks`
- **Description**: Lists registered webhooks
- **Response**: List of webhooks

#### 4.1.2 Register Webhook

- **Endpoint**: `POST /webhooks`
- **Description**: Registers a new webhook
- **Request Body**:
  ```json
  {
    "url": "https://example.com/webhook",
    "events": ["job.created", "form.submitted", "report.approved"],
    "secret": "webhook_secret_key"
  }
  ```
- **Response**: Webhook details

#### 4.1.3 Update Webhook

- **Endpoint**: `PATCH /webhooks/{webhookId}`
- **Description**: Updates a webhook registration
- **Request Body**: Webhook parameters to update
- **Response**: Updated webhook details

#### 4.1.4 Delete Webhook

- **Endpoint**: `DELETE /webhooks/{webhookId}`
- **Description**: Deletes a webhook registration
- **Response**: Success confirmation

### 4.2 Webhook Events

Webhook payloads follow this format:

```json
{
  "event": "event.name",
  "timestamp": "2023-05-01T12:00:00Z",
  "data": {
    // Event-specific data
  }
}
```

#### 4.2.1 Job Events

- `job.created` - Triggered when a new job is created
- `job.updated` - Triggered when a job is updated
- `job.deleted` - Triggered when a job is deleted
- `job.assigned` - Triggered when a user is assigned to a job
- `job.unassigned` - Triggered when a user is unassigned from a job

#### 4.2.2 Form Events

- `form.created` - Triggered when a new form is created
- `form.updated` - Triggered when a form is updated
- `form.submitted` - Triggered when a form is submitted
- `form.deleted` - Triggered when a form is deleted

#### 4.2.3 Report Events

- `report.generated` - Triggered when a report is generated
- `report.updated` - Triggered when a report is updated
- `report.approved` - Triggered when a report is approved
- `report.rejected` - Triggered when a report is rejected

## 5. API Integration with Airtable

### 5.1 Airtable API Usage

The application uses the Airtable API for bi-directional synchronization. The following Airtable endpoints are utilized:

- **List Records**: `GET /v0/{baseId}/{tableId}`
- **Retrieve Record**: `GET /v0/{baseId}/{tableId}/{recordId}`
- **Create Records**: `POST /v0/{baseId}/{tableId}`
- **Update Records**: `PATCH /v0/{baseId}/{tableId}`
- **Delete Records**: `DELETE /v0/{baseId}/{tableId}`

### 5.2 Airtable Data Mapping

The API automatically maps Airtable fields to application entities according to the configuration. Field mappings can be customized through the administration interface.

### 5.3 Conflict Resolution

When conflicts occur during bi-directional synchronization, the system follows these rules:

1. Last-updated wins by default
2. Specific fields can be configured to prioritize either Airtable or the application
3. Conflicts are logged and can be manually resolved if needed

## 6. API Security

### 6.1 Authentication and Authorization

- All endpoints require JWT authentication except for the authentication endpoints
- Role-based access control is enforced for all endpoints
- Tokens expire after 1 hour, with refresh tokens valid for 7 days
- MFA challenges are issued for sensitive operations

### 6.2 Data Protection

- All API communications use TLS 1.2 or higher
- Sensitive data is encrypted in requests and responses
- Personal identifiable information (PII) is handled according to data protection regulations

### 6.3 API Access Controls

- IP whitelisting available for API access
- Rate limiting to prevent abuse
- Automatic lockout after multiple failed authentication attempts

## 7. API Development Guidelines

### 7.1 Versioning Strategy

- URI-based versioning (e.g., `/api/v1/resource`)
- Major version changes for breaking changes
- Minor version changes communicated via documentation
- Deprecation notices provided at least 6 months before endpoint removal

### 7.2 Error Handling

- Consistent error response format
- Meaningful error codes and messages
- Appropriate HTTP status codes
- Detailed error information in development environment

### 7.3 API Documentation

- OpenAPI/Swagger documentation available at `/api/docs`
- Interactive API explorer
- Code examples for common operations
- SDKs available for JavaScript and Python

## 8. Offline API Support

### 8.1 Offline Data Access

- IndexedDB used for client-side data storage
- Essential data automatically cached for offline use
- Background sync when connectivity returns

### 8.2 Conflict Resolution

- Client-side timestamps for tracking changes
- Automatic resolution of non-conflicting changes
- User prompts for conflicting changes

## 9. API Testing

### 9.1 Testing Endpoints

- `/api/test/ping` - Simple connectivity test
- `/api/test/auth` - Authentication test
- `/api/test/webhook` - Webhook delivery test

### 9.2 Sandbox Environment

- Sandbox environment available at `https://sandbox-api.enterpriseapp.com/v1`
- Test credentials provided for development and testing
- Reset sandbox data via `/api/sandbox/reset`