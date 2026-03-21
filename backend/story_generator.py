from transformers import pipeline
from typing import List

generator = pipeline("text-generation", model="facebook/opt-1.3b")


def generate_story(captions: List[str]) -> str:
    scenes = "\n".join(f"- {c}" for c in captions)
    prompt = (
        "Write a short, fun story in 2-3 paragraphs based only on these scenes. "
        "Do not list the scenes. Just write the story.\n\n"
        f"Scenes:\n{scenes}\n\nStory:\n"
    )

    result = generator(
        prompt,
        max_new_tokens=350,
        do_sample=True,
        temperature=0.8,
        top_p=0.9,
        repetition_penalty=1.3,
        num_return_sequences=1,
    )

    generated = result[0]["generated_text"]
    story = generated[len(prompt):].strip()

    # Cut off at a sentence boundary to avoid trailing incomplete sentences
    for end in [". ", "! ", "? "]:
        last = story.rfind(end)
        if last != -1:
            story = story[:last + 1]
            break

    return story
