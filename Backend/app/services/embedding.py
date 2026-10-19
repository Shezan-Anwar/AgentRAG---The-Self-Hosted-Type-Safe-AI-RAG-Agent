import os
from typing import List
from langchain_huggingface import HuggingFaceEmbeddings

embeddingModel = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def makeEmbeddings(text: str) -> list[float]:
    try:
        vector = embeddingModel.embed_query(text)
        return vector
    except Exception as e:
        print(f"Error in making embeddings: {e}")
        raise e