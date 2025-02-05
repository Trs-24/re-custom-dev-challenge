# Re-Custom Dev Challenge

This is a **Dev Challenge** application built with **Nest.js (backend)** and **React + Vite (frontend)**. The application allows user management, PDF report generation, and activity tracking, deployed with **Docker** and **PostgreSQL**.

## Features

### Frontend (React + Vite)

- **User Management**:
  - Display a table of users fetched from the backend
  - Add, edit, and delete users (Name, Email, Role)
- **PDF Report Generation**:
  - Download a user-specific PDF report with activity details
- **Activity Metrics**:
  - Show login and download activity in the UI
  - Charts for visualizing user activity

### Backend (Nest.js + PostgreSQL)

- **REST API Endpoints**:
  - Fetch all users (For admin role only)
  - Create a new user
  - Edit user details
  - Delete a user (For admin role only)
  - Generate and download a PDF report
- **Activity Logging**:
  - Track login attempts
  - Track PDF downloads
- **Pre-seeded Data**:
  - Database is pre-populated with sample users and activity logs

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Material UI
- **Backend**: Nest.js, TypeORM, PostgreSQL
- **Database**: PostgreSQL (with pgAdmin)
- **PDF Generation**: PDFKit
- **Deployment**: Docker & Docker Compose

## Setup & Installation

### Prerequisites

- Docker & Docker Compose installed

### Run with Docker

```bash
docker-compose up --build
```

This will start:

- **PostgreSQL** (with persistent storage)
- **pgAdmin** (for database management)
- **Backend (Nest.js)**
- **Frontend (React + Vite)**

### Run Locally (Without Docker)

1. **Backend**
   ```bash
   cd backend
   npm install
   npm run start
   ```
2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables

Create the following `.env` files in the respective directories:

### **Root `.env` (for Docker)**

Create a `.env` file in the root directory with:

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=database_name
PGADMIN_DEFAULT_EMAIL=user@domainname.com
PGADMIN_DEFAULT_PASSWORD=password
PGADMIN_LISTEN_PORT=80
DATABASE_URL=postgres://user:password@db:5432/database_name
```

### **Backend `.env`**

Create a `.env` file inside the `backend` directory with:

```env
DB_HOST=db
DB_PORT=5432
DB_SSL=false
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=database_name
JWT_SECRET=some_secret_key

ADMIN_EMAIL=default@admin.com
ADMIN_PASSWORD=12345678
```

### **Frontend `.env`**

Create a `.env` file inside the `frontend` directory with:

```env
VITE_API_URL=http://localhost:3000
```

## Testing

- Basic unit tests for React components (`Jest + React Testing Library`)
- API tests for backend endpoints (`Jest + Supertest`)

## Future Improvements

- CI/CD setup for automatic deployment
