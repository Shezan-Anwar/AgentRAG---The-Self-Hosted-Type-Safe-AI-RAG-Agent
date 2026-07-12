from app.services.search import searchSimilar

userQuery = "What are the rules for tuning drums ?"

print(f"Searching database for the query : {userQuery}...\n")

matchingRecords = searchSimilar(userQuery,limit=1)

print("Match records found:")
for i,match in enumerate(matchingRecords):
    print(f"--Top Match (Semantic Distance Score: {match['distance']:.4f})--")
    print(match['content'].strip())
    