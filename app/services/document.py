#In this file ill be saving the ingenstion data in the db
from app.database import get_db_connection

def saveDocumentToDB(file_name : str , rawText:str)-> int:
    from app.services.vector import breakIntoChunks
    chunks = breakIntoChunks(rawText)
    conn = get_db_connection()
    cur = conn.cursor()

    try : 
        Docquery = "INSERT INTO documents (file_name) VALUES (%s) RETURNING id;"
        cur.execute(Docquery, (file_name,))
        documentId = cur.fetchone()[0]

        Chunkquery = "INSERT INTO document_chunks (document_id , content , embedding) VALUES (%s, %s, %s);"

        dummy_vector = [0.0] * 1536
        for chunk in chunks: 
            cur.execute(Chunkquery ,(documentId , chunk , dummy_vector))

        conn.commit()
        print(f"Successfully ingested document '{file_name}' with (Id : {documentId}) with {len(chunks)} chunks into the database.")
        return documentId
    except Exception as e :
        conn.rollback()
        print(f"Error in ingesting the chunks :{e}")
        raise e
    finally : 
        cur.close()
        conn.close()

