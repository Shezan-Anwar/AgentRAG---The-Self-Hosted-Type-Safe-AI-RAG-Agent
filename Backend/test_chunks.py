from app.services.vector import breakIntoChunks

# Simulate a long document text input
sample_document = """
The drum kit is a collection of drums, cymbals, and other percussion instruments.
It is typically played by a single musician, known as a drummer, using wooden drumsticks.
A standard rock drum kit includes a bass drum, a snare drum, tom-toms, and a hi-hat cymbal.
Advanced setups might include double bass pedals, multiple crash cymbals, and specialized percussion blocks.
Learning to play requires coordination across all four limbs to maintain tempo and polyrhythmic stability.
he drum kit is a collection of drums, cymbals, and other percussion instruments.
It is typically played by a single musician, known as a drummer, using wooden drumsticks.
A standard rock drum kit includes a bass drum, a snare drum, tom-toms, and a hi-hat cymbal.
Advanced setups might include double bass pedals, multiple crash cymbals, and specialized percussion blocks.
Learning to play requires coordination across all four limbs to maintain tempo and polyrhythmic stability.
he drum kit is a collection of drums, cymbals, and other percussion instruments.
It is typically played by a single musician, known as a drummer, using wooden drumsticks.
A standard rock drum kit includes a bass drum, a snare drum, tom-toms, and a hi-hat cymbal.
Advanced setups might include double bass pedals, multiple crash cymbals, and specialized percussion blocks.
Learning to play requires coordination across all four limbs to maintain tempo and polyrhythmic stability.
he drum kit is a collection of drums, cymbals, and other percussion instruments.
It is typically played by a single musician, known as a drummer, using wooden drumsticks.
A standard rock drum kit includes a bass drum, a snare drum, tom-toms, and a hi-hat cymbal.
Advanced setups might include double bass pedals, multiple crash cymbals, and specialized percussion blocks.
Learning to play requires coordination across all four limbs to maintain tempo and polyrhythmic stability.
"""

print("🔄 Testing chunking extraction logic...")
text_slices = breakIntoChunks(sample_document)

print(f"✅ Success! Document divided into {len(text_slices)} logical chunks.\n")
for index, chunk in enumerate(text_slices):
    print(f"--- Chunk {index + 1} ---")
    print(chunk.strip())