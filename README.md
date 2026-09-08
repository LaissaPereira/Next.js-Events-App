# Next.js Events App

A full-stack Events application built with Next.js to explore modern full-stack architecture using the App Router, Server Components, Server Actions, Route Handlers, authentication, Prisma, and PostgreSQL.

This project started as a React Events application and was rebuilt with Next.js to understand how Next.js can handle the frontend, backend, API layer, authentication, and database access inside one application.

# Setup install and run

git clone 
cd events-nextjs
npm install
Create .env with DATABASE_URL and AUTH_SECRET
PostgreSQL Docker container docker start events-postgres
npm run dev

## Features

- View all events
- View event details
- Create events
- Edit events
- Delete events
- User registration
- User login and logout
- Authentication with Auth.js
- Authorization based on event ownership
- Protected event creation and management
- REST API endpoints for external clients
- Client-side and server-side validation
- PostgreSQL database running with Docker

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- App Router
- React Hook Form
- Zod

### Backend

- Next.js Server Actions
- Next.js Route Handlers
- Auth.js
- Service layer
- Repository layer

### Data

- Prisma ORM
- PostgreSQL
- Docker

## Architecture

The project separates UI, server logic, business logic, and data access.

```text
Client Components
        │
        ↓
Server Actions
        │
        ↓
Services
        │
        ↓
Repositories
        │
        ↓
Prisma
        │
        ↓
PostgreSQL

External Client / Postman / Mobile App
                 │
                 ↓
          Route Handler
                 │
                 ↓
              Service
                 │
                 ↓
            Repository
                 │
                 ↓
              Prisma
                 │
                 ↓
            PostgreSQL

