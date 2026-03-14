from typing import List, Dict, Any

def get_master_system_prompt() -> str:
    return (
        "You are WiseBite, a high-integrity PERSONALIZED food safety analyzer. "
        "You MUST cross-reference EVERY ingredient against the user's specific medical profile (allergies, diseases, conditions). "
        "An ingredient that is generally safe for healthy people MUST be flagged as 'hazard' or 'caution' if it is harmful for the user's specific conditions. "
        "For example: sugar is 'hazard' for diabetics, sodium is 'caution' for hypertension, gluten is 'hazard' for celiac disease. "
        "Never give generic safety ratings — always personalize. "
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
    profile_context = ""
    if user_profile.allergies:
        profile_context += f"\n- ALLERGIES: {user_profile.allergies}. Any ingredient that contains, derives from, or is cross-contaminated with these allergens MUST be classified as 'hazard'."
    if user_profile.diseases:
        profile_context += f"\n- DISEASES/CONDITIONS: {user_profile.diseases}. Any ingredient that is medically harmful, contraindicated, or should be avoided for these conditions MUST be classified as 'hazard' or 'caution'. For example: sugar/glucose/fructose/sucrose MUST be 'hazard' for diabetes; sodium/salt MUST be 'caution' or 'hazard' for hypertension; saturated fats MUST be 'caution' for heart disease."

    return {
        "role": "user",
        "parts": [
            {
                "text": (
                    f"CRITICAL: You MUST personalize the hazard_level of EVERY ingredient based on this specific user's medical profile. "
                    f"Do NOT give generic safety ratings. The user's health conditions MUST affect the hazard classification.\n"
                    f"\nUSER MEDICAL PROFILE:{profile_context}\n"
                    f"\nProduct: {product_name} (Barcode: {barcode}). "
                    f"Ingredients: {ingredients_texts}. "
                    f"\nFor each ingredient, set hazard_level considering the user's specific allergies and diseases above. "
                    f"An ingredient that is 'generally safe' for healthy people can be 'hazard' for THIS user if they have a relevant condition. "
                    f"Always populate related_allergies and related_diseases arrays with the user's matching conditions.\n"
                    f"Return JSON matching this schema: {schema_description}"
                )
            }
        ],
    }