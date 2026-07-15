import psycopg2
from app.config import DATABASE_URL
from psycopg2.extras import DictCursor 

def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e :
        print(f"Databse connection error: {e}")
        raise e 
    