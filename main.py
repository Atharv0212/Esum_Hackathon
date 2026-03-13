import os
from enum import Enum
from typing import List, Optional, Dict, Any

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import google.generativeai as genai


# Load environment variables from .env
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set. Please configure it in your .env file.")

genai.configure(api_key=GEMINI_API_KEY)


def get_master_system_prompt() -> str:
    """
    Returns the WiseBite Master System Prompt.
    """
    return (
        "You are WiseBite, a high-integrity food safety analyzer. "
        "You cross-reference Open Food Facts data with a user's medical profile "
        "(allergies, diseases) and prioritize safety. Any ingredient flagged as a "
        "hazard must be clearly explained with its chemical impact. "
        "You MUST respond with valid JSON ONLY, matching exactly this schema:\n"
        "{\n"
        '  "product_name": "string or null",\n'
        '  "barcode": "string",\n'
        '  "ingredients": ["string"],\n'
        '  "ingredient_risks": [\n'
        "    {\n"
        '      "ingredient": "string",\n'
        '      "hazard_level": "safe" | "caution" | "hazard",\n'
        '      "explanation": "string",\n'
        '      "related_allergies": ["string"],\n'
        '      "related_diseases": ["string"]\n'
        "    }\n"
        "  ],\n"
        '  "summary": "string",\n'
        '  "warnings": ["string"]\n'
        "}\n"
        "Do not include any extra keys or commentary outside the JSON. "
    )


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
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(url)
        if resp.status_code == 404:
            raise HTTPException(status_code=404, detail="Product not found in Open Food Facts.")
        try:
            data = resp.json()
        except ValueError:
            raise HTTPException(status_code=502, detail="Invalid response from Open Food Facts.")

        if data.get("status") != 1:
            raise HTTPException(status_code=404, detail="Product not found in Open Food Facts.")

        return data


import json
import google.generativeai as genai
from fastapi import HTTPException

async def analyze_with_gemini(
    product_data: Dict[str, Any],
    user_profile: UserProfile,
    barcode: str,
) -> ProductAnalysisResponse:
    
    # 1. Safely extract raw data from Open Food Facts
    product = product_data.get("product", {})
    product_name = product.get("product_name") or product.get("product_name_en") or "Unknown Product"

    # Clean up the ingredients list for the prompt
    ingredients_texts = []
    for ing in product.get("ingredients", []):
        if isinstance(ing, dict) and "text" in ing:
            ingredients_texts.append(ing["text"])
        elif isinstance(ing, str):
            ingredients_texts.append(ing)

    # 2. Initialize Gemini 2.5 Flash (Higher quota for hackathons)
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=get_master_system_prompt()
    )

    # 3. Construct the User Prompt
    user_prompt = f"""
    Analyze this product for the user.
    Allergies: {user_profile.allergies}
    Diseases: {user_profile.diseases}
    Product: {product_name}
    Ingredients: {ingredients_texts}
    """

    # 4. Call Gemini with Strict JSON Enforcement
    try:
        response = await model.generate_content_async(
            contents=user_prompt,
            generation_config=genai.types.GenerationConfig(
                response_mime_type="application/json"
            )
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Gemini API error: {str(e)}")

    # 5. Clean up and Parse the Response
    raw_text = response.text.strip()
    
    # Remove Markdown code fences if Flash adds them (invincibility logic)
    if raw_text.startswith("```"):
        # Split by backticks and take the middle part
        parts = raw_text.split("```")
        if len(parts) >= 3:
            raw_text = parts[1]
            # Remove "json" language identifier if present
            if raw_text.lower().startswith("json"):
                raw_text = raw_text[4:].strip()

    try:
        ai_data = json.loads(raw_text)
        
        # Inject required fields to ensure Pydantic validation passes
        ai_data["barcode"] = barcode
        ai_data["product_name"] = ai_data.get("product_name") or product_name
        ai_data["ingredients"] = ai_data.get("ingredients") or ingredients_texts
        ai_data["raw_openfoodfacts"] = {
            "product_name": product_name,
            "code": barcode
        }

        # Validate against the Response Schema
        return ProductAnalysisResponse(**ai_data)

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail=f"AI returned invalid JSON formatting: {raw_text[:100]}...")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Schema Mismatch: {str(e)}")

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

