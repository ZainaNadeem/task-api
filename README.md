# Task Management API

A full-stack task management application built with FastAPI, PostgreSQL, React, and Docker — deployed live on Railway.

![Task Manager Dashboard](https://github.com/user-attachments/assets/269f3e0f-ee9f-411c-a62c-35050e5fe696)

![Task Manager Login](https://github.com/user-attachments/assets/b1f1da5e-1848-499c-a430-eb0d1682c0b9)

---

## Live Demo

- **Frontend:** https://task-frontend-production-7e2e.up.railway.app
- **API Docs:** https://task-api-production-5152.up.railway.app/docs

> Demo credentials are available on the login page - no sign up needed.

---

## Features

- User registration and login with JWT authentication
- Role-based access control (admin and standard users)
- Full task CRUD - create, read, update, and delete tasks
- Mark tasks as complete
- Admin dashboard to view all users and tasks
- Stats overview - total, pending, and completed tasks
- Fully containerized with Docker
- Deployed and live on Railway

---

## Technologies

- **FastAPI** - REST API framework
- **PostgreSQL** - relational database
- **SQLAlchemy** - ORM for database queries
- **JWT + bcrypt** - authentication and password hashing
- **React + Vite** - frontend
- **Docker + Nginx** - containerization and production server
- **Railway** - cloud deployment

---

## Project Structure

- **app/main.py**: FastAPI app entry point — registers all routers and middleware
- **app/database.py**: Database connection and SQLAlchemy session management
- **app/models.py**: SQLAlchemy models defining the User and Task database tables
- **app/schemas.py**: Pydantic schemas for request and response validation
- **app/auth.py**: JWT token creation, verification, and role-based access control
- **app/routers/auth.py**: Login and current user endpoints
- **app/routers/users.py**: User registration and admin-only user management
- **app/routers/tasks.py**: Full CRUD endpoints for task management
- **frontend/src/App.jsx**: Root component handling login state and routing
- **frontend/src/Login.jsx**: Login page with demo credentials
- **frontend/src/Dashboard.jsx**: Main task board with create, complete, and delete
- **frontend/src/api.js**: Axios instance with JWT token interceptor
- **Dockerfile**: Container definition for the FastAPI backend
- **frontend/Dockerfile**: Multi-stage build for the React frontend with Nginx
- **docker-compose.yml**: Orchestrates the database, API, and frontend containers

---

## Usage

```bash
# Clone the repo
git clone https://github.com/ZainaNadeem/task-api.git
cd task-api

# Start all services with Docker
docker compose up --build
```

- Frontend: http://localhost
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs
