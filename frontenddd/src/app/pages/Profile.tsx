import { useState } from "react";
import { Link } from "react-router";
import { WiseBiteLogo } from "../components/WiseBiteLogo";
import { ShieldCheck, Plus, X, Sparkles, Home as HomeIcon, GitCompare, User, Menu, Settings, ScanLine, History } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#E0FFF5' }}>
      {/* Left Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 border-b border-emerald-200 flex items-center justify-between">
          {sidebarOpen && (
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Menu
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-emerald-50"
          >
            <Menu className="w-5 h-5 text-emerald-600" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          <Link to="/home">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 cursor-pointer transition-all">
              <HomeIcon className="w-5 h-5 text-emerald-600" />
              {sidebarOpen && <span className="font-medium">Home</span>}
            </div>
          </Link>

          <Link to="/scan">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 cursor-pointer transition-all">
              <ScanLine className="w-5 h-5 text-emerald-600" />
              {sidebarOpen && <span className="font-medium">Scan</span>}
            </div>
          </Link>

          <Link to="/recent-scans">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 cursor-pointer transition-all">
              <History className="w-5 h-5 text-emerald-600" />
              {sidebarOpen && <span className="font-medium">Recent Scans</span>}
            </div>
          </Link>

          <Link to="/compare">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 cursor-pointer transition-all">
              <GitCompare className="w-5 h-5 text-emerald-600" />
              {sidebarOpen && <span className="font-medium">Compare</span>}
            </div>
          </Link>

          <Link to="/profile">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md cursor-pointer">
              <User className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">Profile</span>}
            </div>
          </Link>

          <Link to="/settings">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 cursor-pointer transition-all">
              <Settings className="w-5 h-5 text-emerald-600" />
              {sidebarOpen && <span className="font-medium">Settings</span>}
            </div>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-emerald-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="inline-flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Profile
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  WiseBite
                </span>
                <WiseBiteLogo size={45} />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <p className="text-xl text-gray-600">
              Customize your health profile for personalized analysis 🎋
            </p>
          </div>

          {/* Profile Information Card */}
          <Card className="mb-8 border-3 border-emerald-300 overflow-hidden shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl text-white text-5xl font-bold">
                    AS
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                    Alex Smith
                  </h2>
                  <p className="text-gray-600 mb-4">Health-conscious foodie</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border-2 border-emerald-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Location</p>
                      <p className="text-gray-900 font-medium">San Francisco, CA</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Work</p>
                      <p className="text-gray-900 font-medium">Software Engineer</p>
                    </div>
                  </div>

                  {/* Social Icons */}
                  <div className="flex gap-3 justify-center md:justify-start">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-md">
                      <span className="text-white text-sm">📧</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-md">
                      <span className="text-white text-sm">🔗</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-md">
                      <span className="text-white text-sm">💼</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allergies Section */}
          <Card className="mb-6 border-3 border-emerald-200 overflow-hidden shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b-2 border-emerald-100">
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
                        className="px-4 py-2 text-sm bg-gradient-to-r from-red-400 to-orange-400 border-none text-white shadow-md"
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
                          ? "border-emerald-400 bg-gradient-to-br from-emerald-100 to-green-100 shadow-md"
                          : "border-emerald-200 bg-white hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                      onClick={() => toggleAllergy(allergy)}
                    >
                      <Checkbox
                        id={allergy}
                        checked={selectedAllergies.includes(allergy)}
                        onCheckedChange={() => toggleAllergy(allergy)}
                        className="border-emerald-300"
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
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-2xl border-2 border-emerald-200">
                <Label className="mb-3 block text-lg">Add Custom Allergy</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter allergy name"
                    value={customAllergy}
                    onChange={(e) => setCustomAllergy(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCustomAllergy()}
                    className="border-emerald-300 focus:border-emerald-500 rounded-xl"
                  />
                  <Button onClick={addCustomAllergy} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-xl">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dietary Restrictions */}
          <Card className="mb-6 border-3 border-green-200 overflow-hidden shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-100">
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
                        ? "border-green-400 bg-gradient-to-br from-green-100 to-emerald-100 shadow-md"
                        : "border-green-200 bg-white hover:border-green-300 hover:bg-green-50"
                    }`}
                    onClick={() => toggleDiet(diet)}
                  >
                    <Checkbox
                      id={`diet-${diet}`}
                      checked={selectedDiets.includes(diet)}
                      onCheckedChange={() => toggleDiet(diet)}
                      className="border-green-300"
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
          <Card className="mb-8 border-3 border-emerald-200 overflow-hidden shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b-2 border-emerald-100">
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
                        ? "border-emerald-400 bg-gradient-to-br from-emerald-100 to-green-100 shadow-md"
                        : "border-emerald-200 bg-white hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                    onClick={() => toggleCondition(condition)}
                  >
                    <Checkbox
                      id={`condition-${condition}`}
                      checked={selectedConditions.includes(condition)}
                      onCheckedChange={() => toggleCondition(condition)}
                      className="border-emerald-300"
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
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-600 px-16 py-6 text-lg rounded-full shadow-2xl">
              <ShieldCheck className="w-6 h-6 mr-2" />
              Save Profile 🎋
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}