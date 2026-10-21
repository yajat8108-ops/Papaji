import asyncio
import edge_tts
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

dialogues = [
    {
        "id": "dialogue_1",
        "text": "पड़ेगी सिर पे तो हगेगा गिर पे!",
        "filename": "audio_dialogue_1.mp3"
    },
    {
        "id": "dialogue_2",
        "text": "कमरे की बत्तियां और पंखा किसने खुला छोड़ा?! बिजली का बिल क्या कोई और भरेगा?!",
        "filename": "audio_dialogue_2.mp3"
    },
    {
        "id": "dialogue_3",
        "text": "सुबह पांच बजे उठो! सब ठीक हो जाएगा!",
        "filename": "audio_dialogue_3.mp3"
    },
    {
        "id": "dialogue_4",
        "text": "पैसा क्या पेड़ पे उगता है?!",
        "filename": "audio_dialogue_4.mp3"
    },
    {
        "id": "dialogue_5",
        "text": "मैं सिर्फ लेट रहा हूँ दो घंटे तक... सो नहीं रहा हूँ... उठाना मत!",
        "filename": "audio_dialogue_5.mp3"
    }
]

async def generate():
    voice = "hi-IN-MadhurNeural"
    for d in dialogues:
        communicate = edge_tts.Communicate(d['text'], voice, rate="+2%", pitch="-1Hz")
        await communicate.save(d['filename'])
        print(f"Generated {d['filename']}")

if __name__ == "__main__":
    asyncio.run(generate())
