from fastapi import FastAPI , HTTPException ,Form, File, UploadFile
from typing import List , Optional
import io
import pypdf
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.services.document import saveDocumentToDB
from app.services.llm import generateResponse

app = FastAPI(
    title = "AgentRAG API",
    description = "An API for AgentRAG for document ingestion and answer generation",
    version = "1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

class ChatRequest(BaseModel):
    question : str

class IngestionRequest(BaseModel):
    file_name : str
    text_content : str

@app.get("/")
def read_root():
    return {"status": "online", "message": "AgentRAG API is running"}

@app.post("/ingest")
async def ingestTextData(
    files: List[UploadFile] = File(...),  # 👈 MUST be List[UploadFile], NOT just UploadFile
    file_name: Optional[str] = Form(None)
):
    try:
        ingested_docs = []

        for file in files:  # 👈 Now Python knows this is a list and can iterate cleanly
            contentBytes = await file.read()
            text_content = ""

            if file.filename.endswith(".pdf"):
                pdf_reader = pypdf.PdfReader(io.BytesIO(contentBytes))
                for page in pdf_reader.pages:
                    extracted = page.extract_text()
                    if extracted:
                        text_content += extracted + "\n"
            else:
                text_content = contentBytes.decode("utf-8")

            if not text_content.strip():
                continue

            title = file_name.strip() if (file_name and len(files) == 1) else file.filename.split('.')[0]

            doc_id = saveDocumentToDB(title, text_content)
            ingested_docs.append({"filename": file.filename, "document_id": doc_id, "title": title})

        if not ingested_docs:
            raise HTTPException(status_code=400, detail="Could not extract readable text from document(s).")

        return {
            "success": True,
            "message": f"Successfully ingested {len(ingested_docs)} document(s).",
            "documents": ingested_docs
        }

    except Exception as e:
        print("🚨 INGESTION ERROR TRACE:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/ask")
def askQuest(payload : ChatRequest):
    """this will take the question of user to the agentRAG"""
    try:
        answer = generateResponse(payload.question)
        return {"question" : payload.question , "answer":answer.strip() }
    except Exception as e:
        if "503" in str(e) or "UNAVAILABLE" in str(e):
            return {
                "question": payload.question,
                "answer": "⚠️ The AI service is currently experiencing high demand. Please try sending your query again in a few seconds."
            }
        raise HTTPException(status_code=500, detail=str(e))