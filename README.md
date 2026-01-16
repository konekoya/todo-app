# Todo App

A full-stack todo application with user authentication, theme preferences, and filtering capabilities.

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Frontend**: React, TypeScript, Vite
- **Authentication**: JWT
- **Deployment**: Render

## Features

- User authentication (signup/login)
- Create, read, update, delete todos
- Filter todos (All, Active, Completed)
- Light and dark theme support
- Theme preference saved per user

## Development

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or Render)

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up backend environment variables:

   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your DATABASE_URL and JWT_SECRET
   ```

3. Run Prisma migrations:

   ```bash
   npm run prisma:migrate
   ```

4. Start development servers:

   ```bash
   npm run dev
   ```

   - Backend: http://localhost:3001
   - Frontend: http://localhost:5173

## Deployment to Render

### Backend

1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables:
   - `DATABASE_URL`: Your Render PostgreSQL connection string
   - `JWT_SECRET`: A secure random string
   - `NODE_ENV`: production

### Frontend

The backend serves the frontend static files in production. No separate frontend deployment needed.

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Todos

- `GET /api/todos?filter=all|active|completed` - Get todos
- `POST /api/todos` - Create todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### User Settings

- `GET /api/user/settings` - Get user settings
- `PATCH /api/user/settings` - Update user settings
