from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum


class UserRole(str, Enum):
    admin = "admin"
    standard = "standard"


# User Schemas 

class UserCreate(BaseModel):
    """What we expect when someone registers"""
    username: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.standard


class UserResponse(BaseModel):
    """What we send back, never expose the password!"""
    id: int
    username: str
    email: str
    role: UserRole
    is_active: bool

    class Config:
        from_attributes = True  # Lets Pydantic read SQLAlchemy objects


# Task Schemas 

class TaskCreate(BaseModel):
    """What we expect when someone creates a task"""
    title: str
    description: Optional[str] = None


class TaskResponse(BaseModel):
    """What we send back for a task"""
    id: int
    title: str
    description: Optional[str]
    completed: bool
    owner_id: int

    class Config:
        from_attributes = True


# Auth Schemas

class Token(BaseModel):
    """The JWT token returned after login"""
    access_token: str
    token_type: str


class LoginRequest(BaseModel):
    username: str
    password: str