from typing import List, Dict, Any

def get_master_system_prompt() -> str:
    return (
        "You are WiseBite, a high-integrity food safety analyzer. "
        "You cross-reference food data with a user's medical profile. "
        "Respond with strictly formatted JSON ONLY. No conversational filler."
    )

def build_off_user_instruction(
    user_profile: Any,
    barcode: str,
    product_name: str,
    ingredients_texts: List[str],
    product_subset: Dict[str, Any],
    schema_description: Dict[str, Any],
) -> Dict[str, Any]:
    return {
        "role": "user",
        "parts": [
            {
                "text": (
                    f"Analyze safety for a user with allergies: {user_profile.allergies} "
                    f"and diseases: {user_profile.diseases}. "
                    f"Product: {product_name} (Barcode: {barcode}). "
                    f"Ingredients: {ingredients_texts}. "
                    f"Return JSON matching this schema: {schema_description}"
                )
            }
        ],
    }