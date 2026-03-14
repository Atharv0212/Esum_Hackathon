export interface UserProfile {
  allergies: string[];
  diseases: string[];
}

export interface IngredientRisk {
  ingredient: string;
  hazard_level: "safe" | "caution" | "hazard";
  explanation: string;
  related_allergies: string[];
  related_diseases: string[];
}

export interface ProductAnalysisResponse {
  product_name: string;
  barcode: string;
  category: string;
  ingredients: string[];
  ingredient_risks: IngredientRisk[];
  summary: string;
  warnings: string[];
  raw_openfoodfacts?: any;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

export interface ProductNewsResponse {
  articles: NewsArticle[];
}

// Helper to get saved profile from localStorage
export const getSavedProfile = (): UserProfile => {
  const profileStr = localStorage.getItem('wisebite_profile');
  if (profileStr) {
    try {
      return JSON.parse(profileStr);
    } catch (e) {
      console.error("Failed to parse profile", e);
    }
  }
  return { allergies: [], diseases: [] };
};

// Alias for SettingsPage usage
export const getUserProfile = getSavedProfile;

// Save profile to localStorage
export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem('wisebite_profile', JSON.stringify(profile));
};

// 1. Analyze Label via Image Upload
export const analyzeLabelImage = async (imageFile: File, userProfile?: UserProfile): Promise<ProductAnalysisResponse> => {
  const profile = userProfile || getSavedProfile();
  
  const formData = new FormData();
  formData.append("label_image", imageFile);
  formData.append("allergies", profile.allergies.join(","));
  formData.append("diseases", profile.diseases.join(","));

  const response = await fetch('/api/analyze-label', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to analyze image (Status: ${response.status})`);
  }

  return response.json();
};

// 2. Extract Barcode from Image
export const extractBarcodeFromImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch('/api/extract-barcode', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to extract barcode (Status: ${response.status})`);
  }

  const data = await response.json();
  return data.barcode;
};

// 3. Analyze Product by Barcode
export const analyzeProduct = async (barcode: string, userProfile?: UserProfile): Promise<ProductAnalysisResponse> => {
  const profile = userProfile || getSavedProfile();

  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      barcode,
      user_profile: profile
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to analyze product (Status: ${response.status})`);
  }

  return response.json();
};

// 4. Get Product News
export const getProductNews = async (query: string): Promise<ProductNewsResponse> => {
  const response = await fetch(`/api/product-news?query=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product news (Status: ${response.status})`);
  }

  return response.json();
};
