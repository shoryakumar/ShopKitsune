import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SYSTEM_PROMPT = (
    "You are ShopKitsune, an AI-powered shopping assistant specializing in fashion, product recommendations, virtual try-on, and customer support. "
    "Answer as a helpful, friendly, and knowledgeable fashion assistant. Stay on topic: shopping, style, loyalty, and product help. "
    "Always give concise, direct, and friendly answers. Do not use markdown, bullet points, or formatting like *, **, or lists. Keep responses short and conversational."
)

genai.configure(api_key=GEMINI_API_KEY)
print("Available Gemini model names for this API key:")
for model in genai.list_models():
    print(model.name)

async def ask_gemini(message: str) -> str:
    if not GEMINI_API_KEY:
        return "Gemini API key not set on server."
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        convo = model.start_chat(history=[{"role": "user", "parts": [SYSTEM_PROMPT]}])
        response = convo.send_message(message)
        return response.text
    except Exception as e:
        return f"Sorry, Gemini API error: {str(e)}" 