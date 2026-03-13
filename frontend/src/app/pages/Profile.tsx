import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { BlossomDecoration } from "../components/BlossomDecoration";
import { ShieldCheck, Plus, X, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { healthProfile } from "../data/mockData";

const commonAllergies = [
  "Peanuts",
  "Tree Nuts",
  "Milk",
  "Eggs",
  "Soy",
  "Wheat",
  "Fish",
  "Shellfish",
  "Sesame"
];

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo",
  "Low-Sodium",
  "Low-Sugar"
];

const healthConditions = [
  "Type 1 Diabetes",
  "Type 2 Diabetes",
  "Hypertension",
  "High Cholesterol",
  "Celiac Disease",
  "IBS",
  "Heart Disease",
  "Kidney Disease"
];

export function Profile() {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(healthProfile.allergies);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(healthProfile.dietaryRestrictions);
  const [selectedConditions, setSelectedConditions] = useState<string[]>(healthProfile.conditions);
  const [customAllergy, setCustomAllergy] = useState("");

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((a) => a !== allergy)
        : [...prev, allergy]
    );
  };

  const toggleDiet = (diet: string) => {
    setSelectedDiets((prev) =>
      prev.includes(diet)
        ? prev.filter((d) => d !== diet)
        : [...prev, diet]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim() && !selectedAllergies.includes(customAllergy.trim())) {
      setSelectedAllergies([...selectedAllergies, customAllergy.trim()]);
      setCustomAllergy("");
    }
  };

  const removeAllergy = (allergy: string) => {
    setSelectedAllergies(selectedAllergies.filter((a) => a !== allergy));
  };

  const completeness = Math.min(
    100,
    Math.round(
      (selectedAllergies.length * 20 +
        selectedDiets.length * 15 +
        selectedConditions.length * 25 +
        20) // Base score
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white relative overflow-hidden">
      <BlossomDecoration />
      <Navigation />
      
      {/* Decorative cherry blossom */}
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1651472989304-a2b2390617ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVycnklMjBibG9zc29tJTIwc2FrdXJhJTIwcGluayUyMGZsb3dlcnN8ZW58MXx8fHwxNzczNDA1MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="w-full h-full object-cover transform -scale-x-100"
        />
      </div>
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
              <ShieldCheck className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Profile
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600">
            Customize your health profile for personalized analysis 🌸
          </p>
        </div>

        {/* Completeness Indicator */}
        <Card className="mb-6 border-4 border-pink-300 overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="profile-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#ec4899"/>
                <circle cx="10" cy="10" r="1.5" fill="#a855f7"/>
                <circle cx="50" cy="50" r="1.5" fill="#ec4899"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#profile-pattern)" />
            </svg>
          </div>
          <CardContent className="p-8 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-pink-500 animate-sakura-bloom" />
                Profile Completeness
              </span>
              <span className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{completeness}%</span>
            </div>
            <div className="relative h-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${completeness}%` }}
              >
                {completeness > 20 && (
                  <span className="text-white text-xs font-bold">🌸</span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3 text-center">
              {completeness < 50 && "🌱 Add more information to bloom your profile"}
              {completeness >= 50 && completeness < 80 && "🌿 Growing beautifully! Keep going"}
              {completeness >= 80 && "🌸 Your profile is in full bloom!"}
            </p>
          </CardContent>
        </Card>

        {/* Allergies Section */}
        <Card className="mb-6 border-3 border-pink-200 overflow-hidden shadow-xl">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b-2 border-pink-100">
            <CardTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">🥜</span>
              Severe Allergies
            </CardTitle>
            <CardDescription className="text-base">
              Select all allergens that trigger severe reactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Selected Allergies */}
            {selectedAllergies.length > 0 && (
              <div>
                <Label className="mb-3 block text-lg">Your Allergies</Label>
                <div className="flex flex-wrap gap-3">
                  {selectedAllergies.map((allergy) => (
                    <Badge
                      key={allergy}
                      className="px-4 py-2 text-sm bg-gradient-to-r from-red-400 to-pink-400 border-none text-white shadow-md"
                    >
                      {allergy}
                      <button
                        onClick={() => removeAllergy(allergy)}
                        className="ml-2 hover:bg-red-500 rounded-full p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Common Allergies */}
            <div>
              <Label className="mb-4 block text-lg">Common Allergens</Label>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {commonAllergies.map((allergy) => (
                  <div
                    key={allergy}
                    className={`flex items-center space-x-2 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedAllergies.includes(allergy)
                        ? "border-pink-400 bg-gradient-to-br from-pink-100 to-purple-100 shadow-md"
                        : "border-pink-200 bg-white hover:border-pink-300 hover:bg-pink-50"
                    }`}
                    onClick={() => toggleAllergy(allergy)}
                  >
                    <Checkbox
                      id={allergy}
                      checked={selectedAllergies.includes(allergy)}
                      onCheckedChange={() => toggleAllergy(allergy)}
                      className="border-pink-300"
                    />
                    <label
                      htmlFor={allergy}
                      className="font-medium text-gray-700 cursor-pointer flex-1"
                    >
                      {allergy}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Allergy Input */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl border-2 border-pink-200">
              <Label className="mb-3 block text-lg">Add Custom Allergy</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter allergy name"
                  value={customAllergy}
                  onChange={(e) => setCustomAllergy(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCustomAllergy()}
                  className="border-pink-300 focus:border-pink-500 rounded-xl"
                />
                <Button onClick={addCustomAllergy} className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-xl">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dietary Restrictions */}
        <Card className="mb-6 border-3 border-purple-200 overflow-hidden shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-100">
            <CardTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">🍱</span>
              Dietary Restrictions
            </CardTitle>
            <CardDescription className="text-base">
              Select your dietary preferences and restrictions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryOptions.map((diet) => (
                <div
                  key={diet}
                  className={`flex items-center space-x-2 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedDiets.includes(diet)
                      ? "border-purple-400 bg-gradient-to-br from-purple-100 to-pink-100 shadow-md"
                      : "border-purple-200 bg-white hover:border-purple-300 hover:bg-purple-50"
                  }`}
                  onClick={() => toggleDiet(diet)}
                >
                  <Checkbox
                    id={`diet-${diet}`}
                    checked={selectedDiets.includes(diet)}
                    onCheckedChange={() => toggleDiet(diet)}
                    className="border-purple-300"
                  />
                  <label
                    htmlFor={`diet-${diet}`}
                    className="font-medium text-gray-700 cursor-pointer flex-1"
                  >
                    {diet}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Conditions */}
        <Card className="mb-8 border-3 border-pink-200 overflow-hidden shadow-xl">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b-2 border-pink-100">
            <CardTitle className="text-2xl flex items-center gap-2">
              <span className="text-3xl">💊</span>
              Chronic Health Conditions
            </CardTitle>
            <CardDescription className="text-base">
              Select any chronic conditions for personalized ingredient analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 gap-3">
              {healthConditions.map((condition) => (
                <div
                  key={condition}
                  className={`flex items-center space-x-2 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedConditions.includes(condition)
                      ? "border-pink-400 bg-gradient-to-br from-pink-100 to-purple-100 shadow-md"
                      : "border-pink-200 bg-white hover:border-pink-300 hover:bg-pink-50"
                  }`}
                  onClick={() => toggleCondition(condition)}
                >
                  <Checkbox
                    id={`condition-${condition}`}
                    checked={selectedConditions.includes(condition)}
                    onCheckedChange={() => toggleCondition(condition)}
                    className="border-pink-300"
                  />
                  <label
                    htmlFor={`condition-${condition}`}
                    className="font-medium text-gray-700 cursor-pointer flex-1"
                  >
                    {condition}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button size="lg" className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 px-16 py-6 text-lg rounded-full shadow-2xl">
            <ShieldCheck className="w-6 h-6 mr-2" />
            Save Profile 🌸
          </Button>
        </div>
      </main>
    </div>
  );
}