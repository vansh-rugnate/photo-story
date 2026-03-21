from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
from typing import List
import torch

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
model.eval()


def generate_captions(images: List[Image.Image]) -> List[str]:
    captions = []
    for img in images:
        inputs = processor(images=img, return_tensors="pt")
        with torch.no_grad():
            output = model.generate(**inputs, max_new_tokens=60, num_beams=5)
        caption = processor.decode(output[0], skip_special_tokens=True)
        captions.append(caption)
    return captions
