from app.services.document import saveDocumentToDB
from app.database import get_db_connection

# A real world scenario: simulating a rock music club handbook page
sample_handbook = """
RAAG Music Club Guidelines:
All members must attend mandatory rehearsal sessions on Wednesday evenings space allocations.
The drum kits (Tama and Pearl) must be completely tuned down after every multi-band session.
When preparing for inter-college battles like GL Bajaj, playlists must be locked in 14 days prior.
Always secure the performance gear trunks and check stick inventory before leaving campus premises.
RAAG Music Club Guidelines:
All members must attend mandatory rehearsal sessions on Wednesday evenings space allocations.
The drum kits (Tama and Pearl) must be completely tuned down after every multi-band session.
When preparing for inter-college battles like GL Bajaj, playlists must be locked in 14 days prior.
Always secure the performance gear trunks and check stick inventory before leaving campus premises.
RAAG Music Club Guidelines:
All members must attend mandatory rehearsal sessions on Wednesday evenings space allocations.
The drum kits (Tama and Pearl) must be completely tuned down after every multi-band session.
When preparing for inter-college battles like GL Bajaj, playlists must be locked in 14 days prior.
Always secure the performance gear trunks and check stick inventory before leaving campus premises.
"""

print("🔄 Executing mock file upload ingestion pipeline...")


doc_id = saveDocumentToDB("club_handbook.txt", sample_handbook)


print("🔍 Double checking Neon cloud storage states...")
conn = get_db_connection()
cur = conn.cursor()

cur.execute("SELECT * FROM documents WHERE id = %s;", (doc_id,))
print(f"Parent Document Record Found: {cur.fetchone()}")

cur.execute("SELECT COUNT(*) FROM document_chunks WHERE document_id = %s;", (doc_id,))
print(f"Total Text Chunks successfully generated in Cloud: {cur.fetchone()[0]}")

cur.close()
conn.close()
print("🔒 Test completed successfully.")