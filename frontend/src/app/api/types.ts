export type HazardLevel = "safe" | "caution" | "hazard";

export interface IngredientRisk {
  ingredient: string;
  hazard_level: HazardLevel;
  explanation: string;
  related_allergies: string[];
  related_diseases: string[];
}

export interface ProductAnalysisResponse {
  product_name: string | null;
  barcode: string;
  ingredients: string[];
  ingredient_risks: IngredientRisk[];
  summary: string;
  warnings: string[];
  raw_openfoodfacts: {
    code?: string;
    product?: {
      product_name?: string | null;
      ingredients_text?: string | null;
    };
  };
}

export interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  source: string;
  publishedAt: string;
}

export interface ProductNewsResponse {
  articles: NewsArticle[];
}
