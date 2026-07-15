from fastapi import FastAPI , HTTPException
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
def ingestTextData(payload : IngestionRequest):
    """This will ingest the request and store it to neon server"""
    try :
        doc_id = saveDocumentToDB(payload.file_name,payload.text_content)
        return {
            "success": True,
            "message": f"document {payload.file_name} ingested successfully ",
            "document_Id":doc_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/ask")
def askQuest(payload : ChatRequest):
    """this will take the question of user to the agentRAG"""
    try:
        answer = generateResponse(payload.question)
        return {"question" : payload.question , "answer":answer.strip() }
    except Exception as e:
        HTTPException(status_code=500,detail=str(e))
