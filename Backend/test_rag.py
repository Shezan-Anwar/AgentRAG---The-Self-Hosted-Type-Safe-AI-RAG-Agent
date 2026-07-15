from app.services.llm import generateResponse

query = "What exactly do I need to do with the drum kits after a multi-band session?"

print(f"user query : {query}")
print("retrieving knowledge vectors and generation response ")
print("_"*60)

aiAnswer = generateResponse(query)
print("\nAgentRAG response :")
print(aiAnswer.strip())
print("_"*60)