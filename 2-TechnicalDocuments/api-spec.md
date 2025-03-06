# API Specification for RPF Enterprise Application

## 1. Introduction

This document outlines the API endpoints, request/response formats, and authentication mechanisms for the RPF Enterprise Application. The API follows RESTful principles and uses JSON for data exchange.

## 2. API Base URL

All API endpoints are relative to the base URL:

```
https://api.rpf-enterprise.com/v1
```

## 3. Authentication

### 3.1 Authentication Endpoints

#### 3.1.1 Login

- **Endpoint**: `/auth/login`
- **Method**: POST
- **Description**: Authenticates a user and returns an access token
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": "number",
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "string"
    }
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Invalid credentials
  - 500: Server error

#### 3.1.2 SSO Login (Google)

- **Endpoint**: `/auth/google`
- **Method**: GET
- **Description**: Initiates Google SSO login flow
- **Response**: Redirects to Google authentication page
- **Status Codes**:
  - 302: Redirect to Google

#### 3.1.3 SSO Login (Microsoft)

- **Endpoint**: `/auth/microsoft`
- **Method**: GET
- **Description**: Initiates Microsoft SSO login flow
- **Response**: Redirects to Microsoft authentication page
- **Status Codes**:
  - 302: Redirect to Microsoft

#### 3.1.4 SSO Callback

- **Endpoint**: `/auth/callback`
- **Method**: GET
- **Description**: Callback endpoint for SSO providers
- **Query Parameters**:
  - `code`: Authorization code from provider
  - `state`: State parameter for CSRF protection
- **Response**:
  ```json
  {
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": "number",
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "string"
    }
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Invalid credentials
  - 500: Server error

#### 3.1.5 Refresh Token

- **Endpoint**: `/auth/refresh`
- **Method**: POST
- **Description**: Refreshes an expired access token
- **Request Body**:
  ```json
  {
    "refreshToken": "string"
  }
  ```
- **Response**:
  ```json
  {
    "accessToken": "string",
    "refreshToken": "string",
    "expiresIn": "number"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Invalid refresh token
  - 500: Server error

#### 3.1.6 Logout

- **Endpoint**: `/auth/logout`
- **Method**: POST
- **Description**: Invalidates the current access token
- **Request Headers**:
  - `Authorization`: Bearer {accessToken}
- **Response**:
  ```json
  {
    "success": true
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 500: Server error

### 3.2 Authentication Mechanism

All protected endpoints require the following header:
```
Authorization: Bearer {accessToken}
```

## 4. User Management API

### 4.1 Get Current User

- **Endpoint**: `/users/me`
- **Method**: GET
- **Description**: Returns the current user's profile
- **Response**:
  ```json
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "profileImage": "string",
    "preferences": {
      "notifications": {
        "email": "boolean",
        "push": "boolean"
      },
      "theme": "string"
    }
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 500: Server error

### 4.2 Update User Profile

- **Endpoint**: `/users/me`
- **Method**: PATCH
- **Description**: Updates the current user's profile
- **Request Body**:
  ```json
  {
    "name": "string",
    "profileImage": "string",
    "preferences": {
      "notifications": {
        "email": "boolean",
        "push": "boolean"
      },
      "theme": "string"
    }
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "profileImage": "string",
    "preferences": {
      "notifications": {
        "email": "boolean",
        "push": "boolean"
      },
      "theme": "string"
    }
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400: Invalid request
  - 401: Unauthorized
  - 500: Server error

### 4.3 List Users (Admin only)

- **Endpoint**: `/users`
- **Method**: GET
- **Description**: Returns a list of all users
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)
  - `role`: Filter by role
- **Response**:
  ```json
  {
    "total": "number",
    "page": "number",
    "limit": "number",
    "users": [
      {
        "id": "string",
        "email": "string",
        "name": "string",
        "role": "string",
        "status": "string"
      }
    ]
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 403: Forbidden
  - 500: Server error

## 5. Project API

### 5.1 List Projects

- **Endpoint**: `/projects`
- **Method**: GET
- **Description**: Returns a list of projects
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 20)
  - `status`: Filter by status
  - `type`: Filter by type
  - `search`: Search term
  - `sortBy`: Sort field
  - `sortDir`: Sort direction (asc/desc)
- **Response**:
  ```json
  {
    "total": "number",
    "page": "number",
    "limit": "number",
    "projects": [
      {
        "id": "string",
        "number": "string",
        "name": "string",
        "client": {
          "id": "string",
          "name": "string"
        },
        "location": {
          "address": "string",
          "city": "string",
          "state": "string",
          "zipCode": "string",
          "coordinates": {
            "latitude": "number",
            "longitude": "number"
          }
        },
        "type": "string",
        "status": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 500: Server error

### 5.2 Get Project

- **Endpoint**: `/projects/{projectId}`
- **Method**: GET
- **Description**: Returns a specific project
- **Path Parameters**:
  - `projectId`: Project ID
- **Response**:
  ```json
  {
    "id": "string",
    "number": "string",
    "name": "string",
    "description": "string",
    "client": {
      "id": "string",
      "name": "string",
      "contact": {
        "name": "string",
        "email": "string",
        "phone": "string"
      }
    },
    "location": {
      "address": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    },
    "type": "string",
    "status": "string",
    "assignedUsers": [
      {
        "id": "string",
        "name": "string",
        "role": "string"
      }
    ],
    "forms": [
      {
        "id": "string",
        "type": "string",
        "status": "string",
        "createdAt": "string"
      }
    ],
    "reports": [
      {
        "id": "string",
        "type": "string",
        "status": "string",
        "createdAt": "string"
      }
    ],
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 404: Project not found
  - 500: Server error

### 5.3 Create Project

- **Endpoint**: `/projects`
- **Method**: POST
- **Description**: Creates a new project
- **Request Body**:
  ```json
  {
    "number": "string",
    "name": "string",
    "description": "string",
    "clientId": "string",
    "location": {
      "address": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    },
    "type": "string",
    "assignedUserIds": ["string"]
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "number": "string",
    "name": "string",
    "description": "string",
    "client": {
      "id": "string",
      "name": "string"
    },
    "location": {
      "address": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    },
    "type": "string",
    "status": "string",
    "assignedUsers": [
      {
        "id": "string",
        "name": "string",
        "role": "string"
      }
    ],
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 201: Created
  - 400: Invalid request
  - 401: Unauthorized
  - 500: Server error

### 5.4 Update Project

- **Endpoint**: `/projects/{projectId}`
- **Method**: PATCH
- **Description**: Updates a project
- **Path Parameters**:
  - `projectId`: Project ID
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "location": {
      "address": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    },
    "status": "string",
    "assignedUserIds": ["string"]
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "number": "string",
    "name": "string",
    "description": "string",
    "client": {
      "id": "string",
      "name": "string"
    },
    "location": {
      "address": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    },
    "type": "string",
    "status": "string",
    "assignedUsers": [
      {
        "id": "string",
        "name": "string",
        "role": "string"
      }
    ],
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400: Invalid request
  - 401: Unauthorized
  - 404: Project not found
  - 500: Server error

## 6. Form API

### 6.1 List Form Templates

- **Endpoint**: `/forms/templates`
- **Method**: GET
- **Description**: Returns a list of form templates
- **Query Parameters**:
  - `type`: Filter by form type
  - `search`: Search term
- **Response**:
  ```json
  {
    "templates": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "description": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 500: Server error

### 6.2 Get Form Template

- **Endpoint**: `/forms/templates/{templateId}`
- **Method**: GET
- **Description**: Returns a specific form template
- **Path Parameters**:
  - `templateId`: Template ID
- **Response**:
  ```json
  {
    "id": "string",
    "name": "string",
    "type": "string",
    "description": "string",
    "schema": {
      "fields": [
        {
          "id": "string",
          "type": "string",
          "label": "string",
          "required": "boolean",
          "options": ["string"],
          "validations": {
            "type": "string",
            "params": ["string"]
          },
          "conditionalDisplay": {
            "dependsOn": "string",
            "value": "string"
          }
        }
      ],
      "sections": [
        {
          "id": "string",
          "title": "string",
          "fields": ["string"]
        }
      ]
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 404: Template not found
  - 500: Server error

### 6.3 Create Form Template (Admin only)

- **Endpoint**: `/forms/templates`
- **Method**: POST
- **Description**: Creates a new form template
- **Request Body**:
  ```json
  {
    "name": "string",
    "type": "string",
    "description": "string",
    "schema": {
      "fields": [
        {
          "id": "string",
          "type": "string",
          "label": "string",
          "required": "boolean",
          "options": ["string"],
          "validations": {
            "type": "string",
            "params": ["string"]
          },
          "conditionalDisplay": {
            "dependsOn": "string",
            "value": "string"
          }
        }
      ],
      "sections": [
        {
          "id": "string",
          "title": "string",
          "fields": ["string"]
        }
      ]
    }
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "name": "string",
    "type": "string",
    "description": "string",
    "schema": {
      "fields": [
        {
          "id": "string",
          "type": "string",
          "label": "string",
          "required": "boolean",
          "options": ["string"],
          "validations": {
            "type": "string",
            "params": ["string"]
          },
          "conditionalDisplay": {
            "dependsOn": "string",
            "value": "string"
          }
        }
      ],
      "sections": [
        {
          "id": "string",
          "title": "string",
          "fields": ["string"]
        }
      ]
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 201: Created
  - 400: Invalid request
  - 401: Unauthorized
  - 403: Forbidden
  - 500: Server error

### 6.4 List Forms for Project

- **Endpoint**: `/projects/{projectId}/forms`
- **Method**: GET
- **Description**: Returns a list of forms for a project
- **Path Parameters**:
  - `projectId`: Project ID
- **Query Parameters**:
  - `status`: Filter by status
  - `type`: Filter by form type
- **Response**:
  ```json
  {
    "forms": [
      {
        "id": "string",
        "templateId": "string",
        "name": "string",
        "type": "string",
        "status": "string",
        "createdBy": {
          "id": "string",
          "name": "string"
        },
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 404: Project not found
  - 500: Server error

### 6.5 Create Form for Project

- **Endpoint**: `/projects/{projectId}/forms`
- **Method**: POST
- **Description**: Creates a new form for a project
- **Path Parameters**:
  - `projectId`: Project ID
- **Request Body**:
  ```json
  {
    "templateId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "templateId": "string",
    "projectId": "string",
    "name": "string",
    "type": "string",
    "status": "draft",
    "data": {},
    "createdBy": {
      "id": "string",
      "name": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 201: Created
  - 400: Invalid request
  - 401: Unauthorized
  - 404: Project or template not found
  - 500: Server error

### 6.6 Get Form

- **Endpoint**: `/forms/{formId}`
- **Method**: GET
- **Description**: Returns a specific form
- **Path Parameters**:
  - `formId`: Form ID
- **Response**:
  ```json
  {
    "id": "string",
    "templateId": "string",
    "projectId": "string",
    "name": "string",
    "type": "string",
    "status": "string",
    "data": {
      "field1": "value1",
      "field2": "value2"
    },
    "attachments": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "url": "string",
        "createdAt": "string"
      }
    ],
    "createdBy": {
      "id": "string",
      "name": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 404: Form not found
  - 500: Server error

### 6.7 Update Form

- **Endpoint**: `/forms/{formId}`
- **Method**: PATCH
- **Description**: Updates a form
- **Path Parameters**:
  - `formId`: Form ID
- **Request Body**:
  ```json
  {
    "data": {
      "field1": "value1",
      "field2": "value2"
    },
    "status": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "templateId": "string",
    "projectId": "string",
    "name": "string",
    "type": "string",
    "status": "string",
    "data": {
      "field1": "value1",
      "field2": "value2"
    },
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400: Invalid request
  - 401: Unauthorized
  - 404: Form not found
  - 500: Server error

### 6.8 Upload Form Attachment

- **Endpoint**: `/forms/{formId}/attachments`
- **Method**: POST
- **Description**: Uploads an attachment for a form
- **Path Parameters**:
  - `formId`: Form ID
- **Request Body**:
  - Content-Type: multipart/form-data
  - `file`: File to upload
  - `type`: Attachment type
  - `description`: Attachment description
- **Response**:
  ```json
  {
    "id": "string",
    "name": "string",
    "type": "string",
    "url": "string",
    "size": "number",
    "description": "string",
    "createdAt": "string"
  }
  ```
- **Status Codes**:
  - 201: Created
  - 400: Invalid request
  - 401: Unauthorized
  - 404: Form not found
  - 500: Server error

## 7. Sample API

### 7.1 List Samples for Project

- **Endpoint**: `/projects/{projectId}/samples`
- **Method**: GET
- **Description**: Returns a list of samples for a project
- **Path Parameters**:
  - `projectId`: Project ID
- **Query Parameters**:
  - `status`: Filter by status
  - `formId`: Filter by form ID
- **Response**:
  ```json
  {
    "samples": [
      {
        "id": "string",
        "sampleId": "string",
        "formId": "string",
        "materialType": "string",
        "location": "string",
        "status": "string",
        "hasLabResults": "boolean",
        "createdAt": "string"
      }
    ]
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 404: Project not found
  - 500: Server error

### 7.2 Get Sample

- **Endpoint**: `/samples/{sampleId}`
- **Method**: GET
- **Description**: Returns a specific sample
- **Path Parameters**:
  - `sampleId`: Sample ID
- **Response**:
  ```json
  {
    "id": "string",
    "sampleId": "string",
    "projectId": "string",
    "formId": "string",
    "materialType": "string",
    "location": {
      "description": "string",
      "coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    },
    "condition": "string",
    "quantity": {
      "value": "number",
      "unit": "string"
    },
    "samplingMethod": "string",
    "status": "string",
    "labResults": {
      "labId": "string",
      "resultDate": "string",
      "results": [
        {
          "substanceType": "string",
          "concentration": "number",
          "unit": "string",
          "isPositive": "boolean"
        }
      ],
      "attachments": [
        {
          "id": "string",
          "name": "string",
          "url": "string"
        }
      ]
    },
    "attachments": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "url": "string"
      }
    ],
    "createdBy": {
      "id": "string",
      "name": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 404: Sample not found
  - 500: Server error

### 7.3 Update Sample

- **Endpoint**: `/samples/{sampleId}`
- **Method**: PATCH
- **Description**: Updates a sample
- **Path Parameters**:
  - `sampleId`: Sample ID
- **Request Body**:
  ```json
  {
    "materialType": "string",
    "location": {
      "description": "string",
      "coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    },
    "condition": "string",
    "quantity": {
      "value": "number",
      "unit": "string"
    },
    "samplingMethod": "string",
    "status": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "sampleId": "string",
    "materialType": "string",
    "location": {
      "description": "string",
      "coordinates": {
        "latitude": "number",
        "longitude": "number"
      }
    },
    "condition": "string",
    "quantity": {
      "value": "number",
      "unit": "string"
    },
    "samplingMethod": "string",
    "status": "string",
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400: Invalid request
  - 401: Unauthorized
  - 404: Sample not found
  - 500: Server error

### 7.4 Add Lab Results to Sample

- **Endpoint**: `/samples/{sampleId}/lab-results`
- **Method**: POST
- **Description**: Adds lab results to a sample
- **Path Parameters**:
  - `sampleId`: Sample ID
- **Request Body**:
  ```json
  {
    "labId": "string",
    "resultDate": "string",
    "results": [
      {
        "substanceType": "string",
        "concentration": "number",
        "unit": "string",
        "isPositive": "boolean"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "sampleId": "string",
    "labId": "string",
    "resultDate": "string",
    "results": [
      {
        "substanceType": "string",
        "concentration": "number",
        "unit": "string",
        "isPositive": "boolean"
      }
    ],
    "createdAt": "string"
  }
  ```
- **Status Codes**:
  - 201: Created
  - 400: Invalid request
  - 401: Unauthorized
  - 404: Sample not found
  - 500: Server error

## 8. Report API

### 8.1 List Report Templates

- **Endpoint**: `/reports/templates`
- **Method**: GET
- **Description**: Returns a list of report templates
- **Query Parameters**:
  - `type`: Filter by report type
- **Response**:
  ```json
  {
    "templates": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "description": "string",
        "createdAt": "string"
      }
    ]
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 500: Server error

### 8.2 Generate Report

- **Endpoint**: `/projects/{projectId}/reports`
- **Method**: POST
- **Description**: Generates a new report for a project
- **Path Parameters**:
  - `projectId`: Project ID
- **Request Body**:
  ```json
  {
    "templateId": "string",
    "configuration": {
      "includeSections": ["string"],
      "includeAppendices": ["string"]
    }
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "projectId": "string",
    "templateId": "string",
    "name": "string",
    "type": "string",
    "status": "draft",
    "createdBy": {
      "id": "string",
      "name": "string"
    },
    "createdAt": "string"
  }
  ```
- **Status Codes**:
  - 201: Created
  - 400: Invalid request
  - 401: Unauthorized
  - 404: Project or template not found
  - 500: Server error

### 8.3 Get Report

- **Endpoint**: `/reports/{reportId}`
- **Method**: GET
- **Description**: Returns a specific report
- **Path Parameters**:
  - `reportId`: Report ID
- **Response**:
  ```json
  {
    "id": "string",
    "projectId": "string",
    "templateId": "string",
    "name": "string",
    "type": "string",
    "status": "string",
    "content": {
      "sections": [
        {
          "id": "string",
          "title": "string",
          "content": "string"
        }
      ],
      "tables": [
        {
          "id": "string",
          "title": "string",
          "data": [
            ["string"]
          ]
        }
      ],
      "appendices": [
        {
          "id": "string",
          "title": "string",
          "content": "string"
        }
      ]
    },
    "createdBy": {
      "id": "string",
      "name": "string"
    },
    "approvedBy": {
      "id": "string",
      "name": "string"
    },
    "createdAt": "string",
    "updatedAt": "string",
    "approvedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 404: Report not found
  - 500: Server error

### 8.4 Update Report

- **Endpoint**: `/reports/{reportId}`
- **Method**: PATCH
- **Description**: Updates a report
- **Path Parameters**:
  - `reportId`: Report ID
- **Request Body**:
  ```json
  {
    "content": {
      "sections": [
        {
          "id": "string",
          "content": "string"
        }
      ],
      "tables": [
        {
          "id": "string",
          "data": [
            ["string"]
          ]
        }
      ]
    },
    "status": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "status": "string",
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400: Invalid request
  - 401: Unauthorized
  - 404: Report not found
  - 500: Server error

### 8.5 Export Report

- **Endpoint**: `/reports/{reportId}/export`
- **Method**: GET
- **Description**: Exports a report as PDF
- **Path Parameters**:
  - `reportId`: Report ID
- **Query Parameters**:
  - `format`: Export format (pdf, docx)
- **Response**:
  - Binary file content
- **Status Codes**:
  - 200: Success
  - 400: Invalid request
  - 401: Unauthorized
  - 404: Report not found
  - 500: Server error

### 8.6 Approve Report

- **Endpoint**: `/reports/{reportId}/approve`
- **Method**: POST
- **Description**: Approves a report
- **Path Parameters**:
  - `reportId`: Report ID
- **Request Body**:
  ```json
  {
    "signature": "string",
    "comments": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "string",
    "status": "approved",
    "approvedBy": {
      "id": "string",
      "name": "string"
    },
    "approvedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400: Invalid request
  - 401: Unauthorized
  - 403: Forbidden
  - 404: Report not found
  - 500: Server error

## 9. Integration API

### 9.1 Sync Airtable Projects

- **Endpoint**: `/integrations/airtable/sync`
- **Method**: POST
- **Description**: Triggers a manual synchronization with Airtable
- **Request Body**:
  ```json
  {
    "syncType": "full | incremental",
    "syncDate": "string"
  }
  ```
- **Response**:
  ```json
  {
    "jobId": "string",
    "status": "queued",
    "createdAt": "string"
  }
  ```
- **Status Codes**:
  - 202: Accepted
  - 400: Invalid request
  - 401: Unauthorized
  - 403: Forbidden
  - 500: Server error

### 9.2 Check Sync Status

- **Endpoint**: `/integrations/jobs/{jobId}`
- **Method**: GET
- **Description**: Checks the status of a sync job
- **Path Parameters**:
  - `jobId`: Job ID
- **Response**:
  ```json
  {
    "jobId": "string",
    "type": "string",
    "status": "string",
    "progress": "number",
    "results": {
      "totalRecords": "number",
      "processedRecords": "number",
      "createdRecords": "number",
      "updatedRecords": "number",
      "failedRecords": "number",
      "errors": [
        {
          "record": "string",
          "error": "string"
        }
      ]
    },
    "createdAt": "string",
    "updatedAt": "string",
    "completedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 404: Job not found
  - 500: Server error

## 10. Configuration API

### 10.1 Get System Configuration

- **Endpoint**: `/config`
- **Method**: GET
- **Description**: Returns the system configuration
- **Response**:
  ```json
  {
    "airtable": {
      "baseId": "string",
      "apiKey": "string (masked)",
      "syncFrequency": "string",
      "lastSyncTime": "string"
    },
    "notifications": {
      "email": {
        "enabled": "boolean",
        "sender": "string"
      },
      "push": {
        "enabled": "boolean"
      }
    },
    "reporting": {
      "companyName": "string",
      "companyLogo": "string",
      "contactInformation": "string",
      "certificationText": "string"
    }
  }
  ```
- **Status Codes**:
  - 200: Success
  - 401: Unauthorized
  - 403: Forbidden
  - 500: Server error

### 10.2 Update System Configuration

- **Endpoint**: `/config`
- **Method**: PATCH
- **Description**: Updates the system configuration
- **Request Body**:
  ```json
  {
    "airtable": {
      "baseId": "string",
      "apiKey": "string",
      "syncFrequency": "string"
    },
    "notifications": {
      "email": {
        "enabled": "boolean",
        "sender": "string"
      },
      "push": {
        "enabled": "boolean"
      }
    },
    "reporting": {
      "companyName": "string",
      "companyLogo": "string",
      "contactInformation": "string",
      "certificationText": "string"
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "updatedAt": "string"
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400: Invalid request
  - 401: Unauthorized
  - 403: Forbidden
  - 500: Server error

## 11. Error Handling

### 11.1 Error Response Format

All API errors follow this format:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object | null"
  }
}
```

### 11.2 Common Error Codes

- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `BAD_REQUEST`: Invalid request parameters
- `VALIDATION_ERROR`: Request validation failed
- `INTERNAL_ERROR`: Server error

## 12. Versioning

API versioning is included in the base URL path. The current version is `v1`.

## 13. Rate Limiting

API requests are limited to 100 requests per minute per user. Rate limit information is included in the response headers:

- `X-RateLimit-Limit`: Maximum requests per minute
- `X-RateLimit-Remaining`: Remaining requests in the current minute
- `X-RateLimit-Reset`: Time (in seconds) until the rate limit resets

## 14. Pagination

List endpoints support pagination with the following query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Response includes pagination metadata:

```json
{
  "total": "number",
  "page": "number",
  "limit": "number",
  "items": []
}
```
