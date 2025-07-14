from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from gemini import ask_gemini
from fastapi.responses import JSONResponse
from virtual_tryon import virtual_tryon_logic

app = FastAPI(title="ShopKitsune Backend")

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory loyalty points for demo (per session, not persistent)
loyalty_points = 320

@app.post("/profile/style")
async def style_profile(image: UploadFile = File(None), description: str = Form(None)):
    return {"profile": "casual", "description": description, "image_filename": image.filename if image else None}

@app.get("/recommendations")
async def get_recommendations(profile: str = "casual"):
    return {"recommendations": [
        {"name": "Minimalist White Tee", "tags": ["Minimalist", "Casual"]},
        {"name": "Streetwear Hoodie", "tags": ["Streetwear", "Bold"]},
    ]}

@app.post("/virtual-tryon")
async def virtual_tryon(image: UploadFile = File(...), product_id: Optional[str] = Form(None)):
    return virtual_tryon_logic(image, product_id)

@app.post("/chatbot")
async def chatbot(message: str = Form(...)):
    response = await ask_gemini(message)
    return {"response": response}

@app.get("/loyalty")
async def get_loyalty(user_id: int = 1):
    return {"points": loyalty_points, "badges": ["First Purchase", "Fashion Reviewer"], "rewards": ["10% Off Coupon"]}

@app.post("/shop/buy")
async def shop_buy(request: Request):
    global loyalty_points
    data = await request.json()
    # For demo, every purchase gives 50 points
    loyalty_points += 50
    return JSONResponse({"success": True, "points": loyalty_points, "message": "Purchase successful! Loyalty points updated."}) 