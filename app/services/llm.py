import os
from google import genai
from app.config import GENAI_API_KEY
from app.services.search import searchSimilar

def generateResponse(userQuestion : str)->str:
    """
    Generates a relevant answer for user's question after retrieving the relevent context from document  
    """
    matchingChunks = searchSimilar(userQuestion, limit=1)
    if not matchingChunks:
        return "Sorry , I coudn't find any relevant information regarding this query"
    contextText = matchingChunks[0]['content']
    prompt = f"""
    You are an expert AI assistant answering questions based strictly on the provided context document.If the answer cannot be derived from the context , state clearly that you don't know.

    Context Document : 
    {contextText}

    Question : {userQuestion}
    Answer :
    """

    try :
        if not GENAI_API_KEY:
            raise ValueError("API key is not set. Please set the GENAI_API_KEY environment variable.")
        client = genai.Client(api_key=GENAI_API_KEY)

        response = client.models.generate_content(
            model = 'gemini-3.5-flash',
            contents = prompt ,
        )
        return response.text
    except Exception as e:
        print (f"Error during reseponse generation : {e}")
        raise e