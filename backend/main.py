from fastapi import FastAPI
import requests
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
COHERE_API_URL = os.getenv("COHERE_API_URL")

@app.get("/generate/")
async def generate_text(topic: str, count: int = 0):
    """
    Generates a short description based on the given topic using Cohere API.
    Generates text with context from previous generations.
    """
    headers = {
        "Authorization": f"Bearer {COHERE_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Different prompts based on generation count
    if count == 0:
        prompt = (
            f"Write a detailed, engaging, and informative paragraph about '{topic}'."
            f"Focus on providing unique insights, examples, and explanations."
            f"Ensure the content is concise, professional, and insightful."
            f"The content must be strictly between 200-250 characters, including spaces"
        )
    else:
        prompt = (
            f"Continue expanding on the topic '{topic}' in a detailed and engaging manner. "
            f"Provide new insights, examples, or explanations to enrich the content. "
            f"Ensure the writing is coherent, flows naturally, and maintains a professional tone. "
            f"The continuation content must be strictly between 200 and 250 characters, including spaces."
            f"This is continuation #{count + 1}. Avoid repeating previously mentioned points."
        )

    data = {
        "model": "command",
        "prompt": prompt,
        "max_tokens": 200,
        "temperature": 0.5
    }

    response = requests.post(COHERE_API_URL, json=data, headers=headers)
    response_json = response.json()
    
    if "generations" in response_json:
        return {"description": response_json["generations"][0]["text"]}
    return {"error": "Failed to generate text"}