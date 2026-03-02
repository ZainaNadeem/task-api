from dotenv import load_dotenv
load_dotenv()  # Must be first before any other app imports

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app import models
from app.routers import users, auth, tasks

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Management API")

# Allows our React frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost",
        "task-frontend-production-7e2e.up.railway.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(users.admin_router)
app.include_router(auth.router)
app.include_router(tasks.router)


@app.get("/")
def root():
    return {"message": "API is running!"}