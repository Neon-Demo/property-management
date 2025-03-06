# RPF Enterprise Application

A comprehensive system designed to digitize RPF's current workflow and integrate with their existing systems. This application enables field inspectors to collect data, generate reports, and manage environmental inspection projects.

## Features

- **Authentication & User Management**
  - SSO with Google and Microsoft
  - Role-based access control
  - Profile management

- **Project Management**
  - Create and view projects
  - Assign team members
  - Track project status

- **Form Management**
  - Multiple form templates
  - Online/offline form completion
  - Photo and location attachment

- **Sample Management**
  - Sample tracking
  - Lab results integration
  - Bulk sample import

- **Report Generation**
  - Customizable templates
  - PDF export
  - Digital signing

- **Integration**
  - Airtable integration
  - API for third-party services

## Getting Started

### Prerequisites

- Node.js 14.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/rpf-enterprise.git
cd rpf-enterprise
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
/src
  /app             # App router pages and layouts
  /components      # Reusable components
    /layout        # Layout components
    /ui            # UI components
    /forms         # Form components
  /services        # API services
  /store           # Redux store and slices
  /types           # TypeScript types
  /hooks           # Custom React hooks
  /utils           # Utility functions
  /styles          # Global styles
/public            # Static assets
```

## Authentication

The application uses NextAuth.js for authentication with the following providers:

- Google OAuth
- Microsoft OAuth
- Demo login (for development purposes)

To configure authentication:

1. Create OAuth credentials with Google and Microsoft
2. Add the credentials to your `.env.local` file
3. Set up the callback URLs in your OAuth providers:
   - Google: `http://localhost:3000/api/auth/callback/google`
   - Microsoft: `http://localhost:3000/api/auth/callback/microsoft`

## Demo Login

For testing purposes, you can use the demo login option on the login page. This does not require any OAuth configuration and lets you explore the application with a test user.

## Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Offline Support

This application features offline support for field work:

- Forms can be filled out offline
- Data is stored locally and synchronized when online
- Photos can be captured and stored locally
- Automatic conflict resolution for data syncing

## License

This project is proprietary and confidential. All rights reserved.