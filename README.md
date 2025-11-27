# MERN Job (JobSphere)

A full-stack job board built with MongoDB, Express, React, and Node.js featuring public job browsing and an admin dashboard for managing listings and reviewing applicants.

## Features

- JWT-protected admin dashboard with role-based access
- CRUD job management with status, job type, and salary metadata
- Public job search with keyword, location, and job type filters
- Application workflow capturing resume links and cover letters
- Applicant confirmation email via Nodemailer (SMTP/SendGrid compatible)
- Seed script for creating/updating the default admin user

## Project Structure

```
job-portal/
├── backend/      Express + TypeScript API (auth, jobs, applications)
├── frontend/     React + Vite client (public site + admin UI)
└── README.md     This file
```

## Requirements

- Node.js 20+
- MongoDB 6+
- SMTP credentials (e.g., Gmail, SendGrid) for outbound email

## Environment Variables

Copy the provided `env.example` files and update the secrets.

```bash
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env
```

Backend `.env` values:

- `PORT` – API port (default `5000`)
- `MONGODB_URI` – Mongo connection string
- `JWT_SECRET` – token signing secret
- `CLIENT_URL` – origin allowed by CORS (default frontend dev URL)
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM` – SMTP details
- `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` – seed admin credentials

Frontend `.env` values:

- `VITE_API_BASE_URL` – API root (`http://localhost:5000/api` for local dev)

## Backend Setup

```bash
cd backend
npm install
cp env.example .env
npm run dev         # start the API in watch mode
```

Build & run in production:

```bash
npm run build
npm start
```

### Seed the admin user

After configuring the `.env`, run:

```bash
npm run seed
```

The script will create or update the admin using `ADMIN_EMAIL`/`ADMIN_PASSWORD`.

## Frontend Setup

```bash
cd frontend
npm install
cp env.example .env
npm run dev         # starts Vite on http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview
```

## API Overview

- `POST /api/auth/login` – Admin login, returns JWT
- `GET /api/jobs` – Public job list with filters (`q`, `location`, `jobType`)
- `GET /api/jobs/:id` – Single job detail
- `POST /api/jobs` – Create job (admin)
- `PUT /api/jobs/:id` – Update job (admin)
- `DELETE /api/jobs/:id` – Remove job (admin)
- `POST /api/applications` – Submit application & send email
- `GET /api/applications/job/:jobId` – Applicants for a job (admin)

All admin routes require the `Authorization: Bearer <token>` header.

## Development Notes

- Backend is written in TypeScript with separate build and runtime steps.
- Frontend uses React Context to manage auth state and protected routes.
- Emails gracefully degrade if SMTP credentials are missing (message logged instead).
- Remember to configure CORS (`CLIENT_URL`) if you change the frontend origin.

