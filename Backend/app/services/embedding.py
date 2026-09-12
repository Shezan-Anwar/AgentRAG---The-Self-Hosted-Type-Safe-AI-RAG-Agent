import os
from typing import List
from langchain_huggingface import HuggingFaceEndpointEmbeddings

embeddingModel = HuggingFaceEndpointEmbeddings(
    model="sentence-transformers/all-MiniLM-L6-v2",
    task="feature-extraction",
    huggingfacehub_api_token=os.getenv("HF_TOKEN"),
)

def makeEmbeddings(text: str) -> List[float]:
    try:
        vector = embeddingModel.embed_query(text)
        return vector
    except Exception as e:
        print(f"Error in making embeddings: {e}")
        raise e