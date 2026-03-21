from transformers import pipeline
from typing import List

# GPT-2 text generation pipeline — swap model name to fine-tune later
generator = pipeline("text-generation", model="gpt2", max_new_tokens=300)


def generate_story(captions: List[str]) -> str:
    # Build a prompt from the captions
    caption_text = " ".join(f"[{i+1}] {c}" for i, c in enumerate(captions))
    prompt = (
        "Write a fun and engaging short story based on these image descriptions:\n"
        f"{caption_text}\n\nStory:"
    )

    result = generator(prompt, do_sample=True, temperature=0.9, num_return_sequences=1)
    generated = result[0]["generated_text"]

    # Strip the prompt prefix, return only the story
    story = generated[len(prompt):].strip()
    return story
