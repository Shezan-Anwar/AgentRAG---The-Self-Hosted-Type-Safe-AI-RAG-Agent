from fastapi import FastAPI , HTTPException ,Form, File, UploadFile
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
async def ingestTextData(file_name: str = Form(...), file: UploadFile = File(...)):
    """This will ingest the request and store it to neon server"""
    try :
        contentBytes = await file.read()
        text_content = ""

        # 📄 Check if file is a PDF or standard Text
        if file.filename.endswith(".pdf"):
            pdf_reader = pypdf.PdfReader(io.BytesIO(contentBytes))
            for page in pdf_reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text_content += extracted + "\n"
        else:
            
            text_content = contentBytes.decode("utf-8")

        if not text_content.strip():
                raise HTTPException(status_code=400, detail="Could not extract readable text from document.")

        doc_id = saveDocumentToDB(file_name, text_content)
        return {
            "success": True,
            "message": f"document {file_name} ingested successfully ",
            "document_Id":doc_id
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
        HTTPException(status_code=500,detail=str(e))
