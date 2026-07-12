#this file will be handeling the search queries from users 
#1. we will embed them and then we will search for nearest vectors in the database
from app.database import get_db_connection
from app.services.embedding import makeEmbeddings

def searchSimilar(queryText : str, limit : int = 2)-> list[dict]:
    queryVector = makeEmbeddings(queryText)
    conn = get_db_connection()
    cur = conn.cursor()
    try :
        searchQuery = """
            SELECT content , embedding <=> %s::vector AS distance
            FROM document_chunks
            ORDER BY distance ASC
            LIMIT %s;
        """
        cur.execute(searchQuery, (queryVector, limit))
        rows = cur.fetchall()

        results = []
        for row in rows:
            results.append({
                "content" : row[0],
                "distance" : float(row[1])
            })

        return results
    except Exception as e:
        print(f"Error during query search : {e}")
        raise e
    finally:
        cur.close()
        conn.close()
    