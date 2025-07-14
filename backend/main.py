from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI(title="ShopKitsune Backend")

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/profile/style")
async def style_profile(image: UploadFile = File(None), description: str = Form(None)):
    # Placeholder: return mock style profile
    return {"profile": "casual", "description": description, "image_filename": image.filename if image else None}

@app.get("/recommendations")
async def get_recommendations(profile: str = "casual"):
    # Placeholder: return mock recommendations
    return {"recommendations": [
        {"name": "Minimalist White Tee", "tags": ["Minimalist", "Casual"]},
        {"name": "Streetwear Hoodie", "tags": ["Streetwear", "Bold"]},
    ]}

@app.post("/virtual-tryon")
async def virtual_tryon(image: UploadFile = File(...)):
    # Placeholder: return mock AR result
    return {"result": "virtual try-on success", "image_filename": image.filename}

@app.post("/chatbot")
async def chatbot(message: str = Form(...)):
    # Placeholder: return mock chatbot response
    return {"response": f"You said: {message}"}

@app.get("/loyalty")
async def get_loyalty(user_id: int = 1):
    # Placeholder: return mock loyalty info
    return {"points": 320, "badges": ["First Purchase", "Fashion Reviewer"], "rewards": ["10% Off Coupon"]} 