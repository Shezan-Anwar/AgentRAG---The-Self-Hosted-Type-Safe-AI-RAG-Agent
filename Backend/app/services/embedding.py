import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings

embeddingModel = GoogleGenerativeAIEmbeddings(
    model="models/text-embedding-004",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

def makeEmbeddings(text: str) -> list[float]:
    try:
        vector = embeddingModel.embed_query(text)
        return vector
    except Exception as e:
        print(f"Error in making embeddings: {e}")
        raise e