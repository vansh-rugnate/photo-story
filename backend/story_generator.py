from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
from typing import List
import re

# Use Phi-2 which is better at instruction following
model_id = "microsoft/Phi-2"
tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(model_id, trust_remote_code=True)
generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    device_map="auto",
)


def generate_story(captions: List[str]) -> str:
    scenes = " | ".join(captions)
    prompt = (
        "Write a short, coherent story (max 60 words) based on the following scene descriptions. "
        "Output ONLY the story, nothing else. "
        "Scenes: "
        f"{scenes}\n"
        "Story:"
    )

    result = generator(
        prompt,
        max_new_tokens=80,
        do_sample=True,
        temperature=0.7,
        top_p=0.9,
        repetition_penalty=1.2,
    )

    generated = result[0]["generated_text"]
    story = generated[len(prompt):].strip()

    # Clean up common issues
    story = re.sub(r'^\d+\.\s*', '', story)  # Remove numbered lists
    story = re.sub(r'^-\s*', '', story)  # Remove bullet points
    story = re.sub(r'^"', '', story).rstrip('"')  # Remove quotes
    story = re.sub(r'\s+', ' ', story)  # Normalize whitespace

    # Hard word cap
    words = story.split()
    if len(words) > 60:
        story = " ".join(words[:60])

    # End at sentence boundary
    for end in [". ", "! ", "? "]:
        last = story.rfind(end)
        if last != -1 and last > 20:  # Ensure at least some content
            story = story[:last + 1]
            break

    return story