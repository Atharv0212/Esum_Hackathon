export const mockProducts = [
  {
    id: "1",
    name: "Organic Honey Oat Granola",
    brand: "Nature's Blend",
    image: "https://images.unsplash.com/photo-1722239312633-e0e82c8c60a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFub2xhJTIwY2VyZWFsJTIwYm94JTIwcGFja2FnZXxlbnwxfHx8fDE3NzM0MDI0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    healthScore: 72,
    scanDate: "2026-03-12",
    alerts: ["Contains Tree Nuts"],
    packagingScore: 85,
    recallStatus: null,
    ingredients: [
      {
        name: "Whole Grain Oats",
        simplified: "Natural grain high in fiber",
        status: "safe"
      },
      {
        name: "Honey",
        simplified: "Natural sweetener",
        status: "safe"
      },
      {
        name: "Almonds",
        simplified: "Tree nuts - high in healthy fats",
        status: "warning",
        reason: "Contains allergen from your profile"
      },
      {
        name: "Sunflower Oil",
        simplified: "Plant-based oil for texture",
        status: "caution"
      },
      {
        name: "Natural Vanilla Extract",
        simplified: "Flavoring from vanilla beans",
        status: "safe"
      }
    ]
  },
  {
    id: "2",
    name: "Greek Yogurt Vanilla",
    brand: "Mountain Fresh",
    image: "https://images.unsplash.com/photo-1763825613390-287a9db0803d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIweW9ndXJ0JTIwY29udGFpbmVyfGVufDF8fHx8MTc3MzQwMjQwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    healthScore: 88,
    scanDate: "2026-03-11",
    alerts: [],
    packagingScore: 78,
    recallStatus: null,
    ingredients: [
      {
        name: "Cultured Pasteurized Milk",
        simplified: "Fermented milk with probiotics",
        status: "safe"
      },
      {
        name: "Natural Vanilla Flavor",
        simplified: "Vanilla flavoring",
        status: "safe"
      },
      {
        name: "Pectin",
        simplified: "Natural thickener from fruit",
        status: "safe"
      }
    ]
  },
  {
    id: "3",
    name: "Chocolate Peanut Protein Bar",
    brand: "FitFuel",
    image: "https://images.unsplash.com/photo-1704650312560-4414980bab95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwYmFyJTIwc25hY2slMjBudXRyaXRpb258ZW58MXx8fHwxNzczNDAyNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    healthScore: 45,
    scanDate: "2026-03-10",
    alerts: ["Contains Peanuts", "High Added Sugar"],
    packagingScore: 65,
    recallStatus: null,
    ingredients: [
      {
        name: "Peanuts",
        simplified: "Legume protein source",
        status: "warning",
        reason: "Contains allergen from your profile"
      },
      {
        name: "Soy Protein Isolate",
        simplified: "Processed soy protein",
        status: "caution"
      },
      {
        name: "Sugar",
        simplified: "Refined sweetener (12g per serving)",
        status: "danger",
        reason: "Exceeds recommended daily sugar intake"
      },
      {
        name: "Palm Kernel Oil",
        simplified: "Saturated fat from palm",
        status: "caution"
      },
      {
        name: "Natural and Artificial Flavors",
        simplified: "Flavor additives",
        status: "caution"
      }
    ]
  },
  {
    id: "4",
    name: "Unsweetened Almond Milk",
    brand: "PurePlant",
    image: "https://images.unsplash.com/photo-1663652851591-e3d9bfb6d8c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG1vbmQlMjBtaWxrJTIwY2FydG9uJTIwcGFja2FnZXxlbnwxfHx8fDE3NzM0MDI0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    healthScore: 82,
    scanDate: "2026-03-09",
    alerts: ["Contains Tree Nuts"],
    packagingScore: 92,
    recallStatus: null,
    ingredients: [
      {
        name: "Filtered Water",
        simplified: "Purified water base",
        status: "safe"
      },
      {
        name: "Almonds",
        simplified: "Tree nut - main ingredient",
        status: "warning",
        reason: "Contains allergen from your profile"
      },
      {
        name: "Calcium Carbonate",
        simplified: "Calcium supplement for bone health",
        status: "safe"
      },
      {
        name: "Sea Salt",
        simplified: "Natural mineral salt",
        status: "safe"
      }
    ]
  },
  {
    id: "5",
    name: "Organic Marinara Sauce",
    brand: "Nonna's Kitchen",
    image: "https://images.unsplash.com/photo-1760445529098-949fcfc7c9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHNhdWNlJTIwamFyJTIwZm9vZHxlbnwxfHx8fDE3NzM0MDI0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    healthScore: 91,
    scanDate: "2026-03-08",
    alerts: [],
    packagingScore: 88,
    recallStatus: null,
    ingredients: [
      {
        name: "Organic Tomatoes",
        simplified: "Fresh organic tomatoes",
        status: "safe"
      },
      {
        name: "Organic Basil",
        simplified: "Fresh herb for flavor",
        status: "safe"
      },
      {
        name: "Organic Garlic",
        simplified: "Natural flavor enhancer",
        status: "safe"
      },
      {
        name: "Organic Olive Oil",
        simplified: "Heart-healthy oil",
        status: "safe"
      },
      {
        name: "Sea Salt",
        simplified: "Natural seasoning",
        status: "safe"
      }
    ]
  }
];

export const healthProfile = {
  completeness: 75,
  allergies: ["Tree Nuts", "Peanuts"],
  dietaryRestrictions: ["Gluten-Free"],
  conditions: ["Type 2 Diabetes"],
  preferences: ["Organic", "Low Sugar"]
};
