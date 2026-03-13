import type { ProductAnalysisResponse } from "./types";

const API_BASE =
  (import.meta as any).env.VITE_API_BASE_URL ?? "http://localhost:8000";

export interface UserProfilePayload {
  allergies: string[];
  diseases: string[];
}

export async function analyzeProduct(
  barcode: string,
  profile: UserProfilePayload
): Promise<ProductAnalysisResponse> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      barcode,
      user_profile: profile,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Analyze request failed with ${res.status}`);
  }

  return (await res.json()) as ProductAnalysisResponse;
}

export async function analyzeImage(
  file: File,
  profile: UserProfilePayload
): Promise<ProductAnalysisResponse> {
  const formData = new FormData();
  formData.append("file", file);
  profile.allergies.forEach((a) => formData.append("allergies", a));
  profile.diseases.forEach((d) => formData.append("diseases", d));

  const res = await fetch(`${API_BASE}/analyze-image`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Analyze image request failed with ${res.status}`);
  }

  return (await res.json()) as ProductAnalysisResponse;
}

