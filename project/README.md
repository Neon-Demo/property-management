# Greenhouse Management System

Enterprise application for job scheduling, assignment, and data collection to streamline workflow processes currently managed through Airtable and paper forms.

## Features

- Single Sign-On (SSO) with Google and Microsoft authentication
- Job scheduling and assignment with calendar integration
- Digital forms with offline capability
- Automated report generation from collected data
- Integration with Airtable as primary data store

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Material-UI
- **State Management**: Redux Toolkit
- **Form Handling**: Formik with Yup validation
- **API**: RESTful API with Axios for HTTP requests
- **Authentication**: JWT-based authentication with SSO support

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd greenhouse-management-system
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run all tests
- `npm test -- -t "test name"` - Run specific test
- `npm run lint` - Run ESLint

## Project Structure

- `/src/components` - React components
- `/src/hooks` - Custom React hooks
- `/src/pages` - Next.js pages and API routes
- `/src/services` - API services
- `/src/store` - Redux store and slices
- `/src/styles` - Global styles and theme
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions

## Testing Authentication

The application uses Single Sign-On (SSO) with Google and Microsoft. For testing and demonstration purposes, there are two ways to access the system:

1. **Demo Login**: Click the "Login as Demo User" button to instantly access the system with a demo account (admin privileges)
2. **SSO Login**: Use the Google or Microsoft sign-in buttons (these use mock implementations in the development environment)

## License

This project is licensed under the ISC License.