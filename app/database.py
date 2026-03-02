from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()  # Reads variables from your .env file

DATABASE_URL = os.getenv("DATABASE_URL")

# The engine is the actual connection to your database
engine = create_engine(DATABASE_URL)

# Each request to the API gets its own session (like a conversation with the DB)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class that all our models (tables) will inherit from
Base = declarative_base()


# This is a "dependency" — FastAPI will call this to give each
# route its own DB session, then close it when the request is done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()