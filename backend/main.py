from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from PIL import Image
import io

from captioner import generate_captions
from story_generator import generate_story

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/process")
async def process_images(files: List[UploadFile] = File(...)):
    images = []
    for file in files:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")
        images.append(img)

    captions = generate_captions(images)
    story = generate_story(captions)

    return {"captions": captions, "story": story}
