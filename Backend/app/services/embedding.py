#In this file ill be making the embeddings of the ducuments
from langchain_huggingface import HuggingFaceEmbeddings

embeddingModel = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def makeEmbeddings(text: str)-> List[float]:
    try:
        vector = embeddingModel.embed_query(text)
        return vector
    except Exception as e:
        print(f"Error in making embeddings : {e}")
        raise e
