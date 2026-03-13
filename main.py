import os
from enum import Enum
from typing import List, Optional, Dict, Any

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import google.generativeai as genai

from prompts import get_master_system_prompt, build_off_user_instruction


# Load environment variables from .env
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set. Please configure it in your .env file.")

genai.configure(api_key=GEMINI_API_KEY)


class HazardLevel(str, Enum):
    SAFE = "safe"
    CAUTION = "caution"
    HAZARD = "hazard"


class UserProfile(BaseModel):
    allergies: List[str] = Field(
        default_factory=list,
        description="Known allergies (e.g., 'peanuts', 'gluten').",
    )
    diseases: List[str] = Field(
        default_factory=list,
        description="Known diseases or conditions (e.g., 'diabetes', 'celiac disease').",
    )


class ProductRequest(BaseModel):
    barcode: str = Field(..., description="Product barcode to look up in Open Food Facts.")
    user_profile: UserProfile


class IngredientRisk(BaseModel):
    ingredient: str
    hazard_level: HazardLevel
    explanation: str
    related_allergies: List[str] = Field(default_factory=list)
    related_diseases: List[str] = Field(default_factory=list)


class ProductAnalysisResponse(BaseModel):
    product_name: Optional[str]
    barcode: str
    ingredients: List[str] = Field(default_factory=list)
    ingredient_risks: List[IngredientRisk] = Field(default_factory=list)
    summary: str
    warnings: List[str] = Field(default_factory=list)
    raw_openfoodfacts: Dict[str, Any] = Field(
        default_factory=dict,
        description="Subset of raw data from Open Food Facts used for this analysis.",
    )


app = FastAPI(title="WiseBite Backend", version="0.1.0")


# CORS configuration for React frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


OPENFOODFACTS_PRODUCT_URL = "https://world.openfoodfacts.org/api/v2/product/{barcode}.json"


async def fetch_open_food_facts_product(barcode: str) -> Dict[str, Any]:
    url = OPENFOODFACTS_PRODUCT_URL.format(barcode=barcode)
    try:
        async with httpx.AsyncClient(timeout=20.0) as client:
            resp = await client.get(url)
    except httpx.ReadTimeout:
        raise HTTPException(
            status_code=504,
            detail="Timed out while contacting Open Food Facts. Please try again or check your internet connection.",
        )
    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Error contacting Open Food Facts: {exc}",
        )

    if resp.status_code == 404:
        raise HTTPException(status_code=404, detail="Product not found in Open Food Facts.")
    try:
        data = resp.json()
    except ValueError:
        raise HTTPException(status_code=502, detail="Invalid response from Open Food Facts.")

    if data.get("status") != 1:
        raise HTTPException(status_code=404, detail="Product not found in Open Food Facts.")

    return data


import json # <--- MAKE SURE THIS IS AT THE TOP
import google.generativeai as genai
from fastapi import HTTPException

async def analyze_with_gemini(
    product_data: Dict[str, Any],
    user_profile: UserProfile,
    barcode: str,
) -> ProductAnalysisResponse:
    # 1. Extract raw data safely
    product = product_data.get("product", {}) or {}
    product_name = product.get("product_name") or product.get("product_name_en") or "Unknown Product"

    ingredients_texts = []
    for ing in product.get("ingredients", []):
        if isinstance(ing, dict) and "text" in ing:
            ingredients_texts.append(str(ing["text"]))
        elif isinstance(ing, str):
            ingredients_texts.append(ing)

    # 2. Initialize Gemini 2.5 Flash with System Prompt
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=get_master_system_prompt()
    )

    # 3. Build User Instruction
    # We define the schema here to ensure it's always available
    schema = {
        "type": "object",
        "properties": {
            "product_name": {"type": "string"},
            "barcode": {"type": "string"},
            "ingredients": {"type": "array", "items": {"type": "string"}},
            "ingredient_risks": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "ingredient": {"type": "string"},
                        "hazard_level": {"type": "string", "enum": ["safe", "caution", "hazard"]},
                        "explanation": {"type": "string"},
                        "related_allergies": {"type": "array", "items": {"type": "string"}},
                        "related_diseases": {"type": "array", "items": {"type": "string"}}
                    },
                    "required": ["ingredient", "hazard_level", "explanation", "related_allergies", "related_diseases"]
                }
            },
            "summary": {"type": "string"},
            "warnings": {"type": "array", "items": {"type": "string"}}
        },
        "required": ["product_name", "barcode", "ingredients", "ingredient_risks", "summary", "warnings"]
    }

    user_instruction = build_off_user_instruction(
        user_profile=user_profile,
        barcode=barcode,
        product_name=product_name,
        ingredients_texts=ingredients_texts,
        product_subset={"product_name": product_name},
        schema_description=schema
    )

    # 4. Generate and Parse
    try:
        response = await model.generate_content_async(user_instruction["parts"])
        text = response.text.strip()
        
        # Strip markdown fences
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"): text = text[4:]
        text = text.strip("`").strip()

        parsed = json.loads(text)
        
        # Inject metadata to ensure Pydantic doesn't fail
        parsed.update({
            "barcode": barcode,
            "product_name": product_name,
            "ingredients": ingredients_texts,
            "raw_openfoodfacts": {"code": barcode, "product_name": product_name}
        })

        return ProductAnalysisResponse(**parsed)

    except Exception as e:
        print(f"ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))
@app.post("/analyze", response_model=ProductAnalysisResponse)
async def analyze_product(request: ProductRequest) -> ProductAnalysisResponse:
    """
    Analyze a product's safety for a given user profile.

    - Fetches product data from Open Food Facts using the barcode.
    - Cross-references ingredients against the user's allergies and diseases via Gemini.
    - Returns a strictly structured JSON payload safe for the React frontend.
    """
    product_data = await fetch_open_food_facts_product(request.barcode)
    analysis = await analyze_with_gemini(
        product_data=product_data,
        user_profile=request.user_profile,
        barcode=request.barcode,
    )
    return analysis


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

