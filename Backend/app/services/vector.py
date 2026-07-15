# i created chunks in this file 
from langchain_text_splitters import RecursiveCharacterTextSplitter

def breakIntoChunks(rawText:str) -> List[str]:
    """
    It will take raw text and break it into chunks 
    chunk size= 500
    context sharing size = 50 characters
    """
    textSplitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
        length_function = len,
    )
    chunks = textSplitter.split_text(rawText)
    return chunks