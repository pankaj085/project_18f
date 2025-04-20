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
        prompt = f"Write an engaging, detailed paragraph about {topic} (300-600 characters)."
    else:
        prompt = (
            f"Continue expanding on this topic in detail: {topic}. "
            f"This is continuation #{count + 1}. "
            f"Maintain the same writing style and add new information on {topic}."
        )

    data = {
        "model": "command",
        "prompt": prompt,
        "max_tokens": 200,
        "temperature": 0.7
    }

    response = requests.post(COHERE_API_URL, json=data, headers=headers)
    response_json = response.json()
    
    if "generations" in response_json:
        return {"description": response_json["generations"][0]["text"]}
    return {"error": "Failed to generate text"}