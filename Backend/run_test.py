from app.database import get_db_connection

print("testing database connection ")

try:
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT version();")
    row = cur.fetchone()
    print("it worked perfectly")
    print(f"connected to : {row[0]}")

    cur.close()
    conn.close()
except Exception as e :
    print(f"Database connection error: {e}")