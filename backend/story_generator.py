from transformers import pipeline
from typing import List

generator = pipeline("text-generation", model="facebook/opt-1.3b")


def generate_story(captions: List[str]) -> str:
    scenes = "\n".join(f"- {c}" for c in captions)
    prompt = (
        "Write a fun story in under 60 words based only on these scenes. "
        "Do not list the scenes. Just write the story. Stop after 60 words.\n\n"
        f"Scenes:\n{scenes}\n\nStory:\n"
    )

    prompt = (
        "Write a fun story in under 60 words based only on these scenes. "
        "Do not list the scenes. Just write the story. Stop after 60 words.\n\n"
        f"Scenes:\n{scenes}\n\nStory:\n"
    )

    result = generator(
        prompt,
        max_new_tokens=100,
        do_sample=True,
        temperature=0.8,
        top_p=0.9,
        repetition_penalty=1.3,
        num_return_sequences=1,
    )

    generated = result[0]["generated_text"]
    story = generated[len(prompt):].strip()

    # Hard cap at 60 words
    words = story.split()
    if len(words) > 60:
        story = " ".join(words[:60])

    # Cut off at last sentence boundary
    for end in [". ", "! ", "? "]:
        last = story.rfind(end)
        if last != -1:
            story = story[:last + 1]
            break

    return story
