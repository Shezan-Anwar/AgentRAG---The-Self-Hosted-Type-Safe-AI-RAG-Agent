import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings

embeddingModel = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    output_dimensionality=384  # 👈 Enforces 384 dimensions
)

def makeEmbeddings(text: str) -> list[float]:
    try:
        vector = embeddingModel.embed_query(text)
        return vector
    except Exception as e:
        print(f"Error in making embeddings: {e}")
        raise e