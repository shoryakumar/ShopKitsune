from typing import Optional
from fastapi import UploadFile

def virtual_tryon_logic(image: UploadFile, product_id: Optional[str]) -> dict:
    """
    AI-powered try-on logic: if product_id is provided, return a mock composite image URL.
    In a real app, you would use AI to combine the user image and product image.
    """
    if product_id:
        composite_url = f"https://dummyimage.com/400x400/4F46E5/fff&text=User+with+Product+{product_id}"
        return {
            "result": "AI try-on success",
            "image_filename": image.filename,
            "composite_url": composite_url,
        }
    return {
        "result": "virtual try-on success",
        "image_filename": image.filename,
    } 