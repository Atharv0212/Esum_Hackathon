import { Link } from "react-router";
import { useNavigate } from "react-router";
import { WiseBiteLogo } from "../components/WiseBiteLogo";
import { Home as HomeIcon, GitCompare, User, Menu, Settings, ScanLine, History, Bell, Lock, Globe, Palette, ChevronRight, AlertTriangle, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { useState, useEffect } from "react";
import { getUserProfile, saveUserProfile, UserProfile } from "../utils/api";

export function SettingsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // User Profile State
  const [profile, setProfile] = useState<UserProfile>({ allergies: [], diseases: [] });
  const [allergyInput, setAllergyInput] = useState("");
  const [diseaseInput, setDiseaseInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load profile on mount
    const savedProfile = getUserProfile();
    setProfile(savedProfile);
  }, []);

  const handleAddAllergy = () => {
    if (allergyInput.trim() && !profile.allergies.includes(allergyInput.trim().toLowerCase())) {
      setProfile(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergyInput.trim().toLowerCase()]
      }));
      setAllergyInput("");
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy)
    }));
  };

  const handleAddDisease = () => {
    if (diseaseInput.trim() && !profile.diseases.includes(diseaseInput.trim().toLowerCase())) {
      setProfile(prev => ({
        ...prev,
        diseases: [...prev.diseases, diseaseInput.trim().toLowerCase()]
      }));
      setDiseaseInput("");
    }
  };

  const handleRemoveDisease = (disease: string) => {
    setProfile(prev => ({
      ...prev,
      diseases: prev.diseases.filter(d => d !== disease)
    }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    saveUserProfile(profile);
    setTimeout(() => setIsSaving(false), 500); // UI feedback
  };

  const handleLogout = () => {
    navigate("/");
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
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 cursor-pointer transition-all">
              <User className="w-5 h-5 text-emerald-600" />
              {sidebarOpen && <span className="font-medium">Profile</span>}
            </div>
          </Link>

          <Link to="/settings">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md cursor-pointer">
              <Settings className="w-5 h-5" />
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
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  WiseBite
                </span>
                <WiseBiteLogo size={45} />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <p className="text-gray-600 mb-2">
                Manage your account preferences and health profile
              </p>
            </div>
          </div>

          {/* Scrollable Rectangular Cards for Settings Sections */}
          <div className="space-y-6">
            
            {/* Health Profile Settings */}
            <Card className="border-3 border-emerald-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-200 flex flex-row items-center justify-between py-4">
                <CardTitle className="flex items-center gap-3 text-xl m-0">
                  <User className="w-6 h-6 text-emerald-600" />
                  Health Profile
                </CardTitle>
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={isSaving}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Profile"}
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* Allergies Section */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Allergies</h4>
                  <p className="text-sm text-gray-600 mb-2">Add your allergies to trigger warnings during scans.</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={allergyInput}
                      onChange={(e) => setAllergyInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddAllergy()}
                      placeholder="e.g. peanuts, dairy, gluten" 
                      className="flex-1 p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Button onClick={handleAddAllergy} variant="outline" className="border-emerald-500 text-emerald-700 hover:bg-emerald-50">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profile.allergies.map(allergy => (
                      <div key={allergy} className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium">
                        {allergy}
                        <button onClick={() => handleRemoveAllergy(allergy)} className="text-red-500 hover:text-red-800 font-bold">×</button>
                      </div>
                    ))}
                    {profile.allergies.length === 0 && <span className="text-sm text-gray-400 italic">No allergies added.</span>}
                  </div>
                </div>

                <hr className="border-emerald-100" />

                {/* Diseases Section */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Underlying Diseases / Dietary Restrictions</h4>
                  <p className="text-sm text-gray-600 mb-2">Add conditions to avoid risky ingredients (e.g. diabetes, hypertension).</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={diseaseInput}
                      onChange={(e) => setDiseaseInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddDisease()}
                      placeholder="e.g. diabetes, high blood pressure" 
                      className="flex-1 p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Button onClick={handleAddDisease} variant="outline" className="border-emerald-500 text-emerald-700 hover:bg-emerald-50">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profile.diseases.map(disease => (
                      <div key={disease} className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium">
                        {disease}
                        <button onClick={() => handleRemoveDisease(disease)} className="text-amber-500 hover:text-amber-800 font-bold">×</button>
                      </div>
                    ))}
                    {profile.diseases.length === 0 && <span className="text-sm text-gray-400 italic">No restrictions added.</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="border-3 border-emerald-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-200">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Lock className="w-6 h-6 text-emerald-600" />
                  Account details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer">
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Address</h4>
                    <p className="text-sm text-gray-600">user@wisebite.com</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer">
                  <div>
                    <h4 className="font-semibold text-gray-900">Change Password</h4>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-3 border-emerald-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-200">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Bell className="w-6 h-6 text-emerald-600" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-emerald-100">
                  <div>
                    <h4 className="font-semibold text-gray-900">Push Notifications</h4>
                    <p className="text-sm text-gray-600">Receive alerts about product recalls</p>
                  </div>
                  <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-emerald-100">
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Alerts</h4>
                    <p className="text-sm text-gray-600">Get weekly health summaries</p>
                  </div>
                  <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                </div>
              </CardContent>
            </Card>

            {/* App Preferences */}
            <Card className="border-3 border-emerald-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-200">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Palette className="w-6 h-6 text-emerald-600" />
                  App Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-emerald-100">
                  <div>
                    <h4 className="font-semibold text-gray-900">Dark Mode</h4>
                    <p className="text-sm text-gray-600">Switch to dark theme</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-3 border-red-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200">
                <CardTitle className="flex items-center gap-3 text-xl text-red-700">
                  <AlertTriangle className="w-6 h-6" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div onClick={handleLogout} className="flex justify-between items-center p-4 bg-white rounded-xl border-2 border-red-100 hover:border-red-300 transition-all cursor-pointer">
                  <div>
                    <h4 className="font-semibold text-gray-900">Log Out</h4>
                    <p className="text-sm text-gray-600">Sign out of your account</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* App Version */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>WiseBite v1.0.0</p>
            <p className="mt-1">© 2026 WiseBite. All rights reserved.</p>
          </div>
        </main>
      </div>
    </div>
  );
}