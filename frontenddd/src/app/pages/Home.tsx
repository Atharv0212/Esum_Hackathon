import { Link } from "react-router";
import { WiseBiteLogo } from "../components/WiseBiteLogo";
import { Camera, Upload, AlertTriangle, CheckCircle, Clock, Sparkles, Home as HomeIcon, GitCompare, User, Menu, AlertCircle, Leaf, Heart, Settings, ScanLine, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { mockProducts } from "../data/mockData";
import { useState } from "react";
import { CircularProgress } from "../components/CircularProgress";

export function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Get the most recent scan for AI insights
  const latestScan = mockProducts[0];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#E0FFF5' }}>
      {/* Left Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Sidebar Header */}
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

        {/* Sidebar Menu Items */}
        <nav className="p-4 space-y-2">
          <Link to="/home">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md cursor-pointer">
              <HomeIcon className="w-5 h-5" />
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
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 cursor-pointer transition-all">
              <Settings className="w-5 h-5 text-emerald-600" />
              {sidebarOpen && <span className="font-medium">Settings</span>}
            </div>
          </Link>
        </nav>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex">
        {/* Dashboard Main Content */}
        <div 
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-20'
          }`}
        >
          {/* Header with Logo in Top Right */}
          <header className="bg-white shadow-sm border-b border-emerald-200">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-end items-center gap-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  WiseBite
                </span>
                <WiseBiteLogo size={45} />
              </div>
            </div>
          </header>

          <div className="flex">
            {/* Main Dashboard Content */}
            <div className="flex-1 px-8 py-10">
              {/* Hero Section */}
              <div className="mb-12 text-center">
                <div className="inline-block mb-4">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 px-5 py-2 rounded-full border-2 border-emerald-300 shadow-lg">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      Your AI-powered health guardian
                    </span>
                  </div>
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  Welcome to WiseBite
                </h1>
                <p className="text-xl text-gray-600">
                  Your journey to mindful eating starts here
                </p>
              </div>

              {/* Feature Cards - Gateway Navigation */}
              <div className="grid grid-cols-2 gap-6">
                {/* Scan Food Card */}
                <Link to="/scan">
                  <Card className="border-3 border-emerald-300 hover:border-emerald-500 transition-all cursor-pointer group overflow-hidden relative shadow-lg hover:shadow-xl h-full">
                    <CardContent className="p-10">
                      <div className="flex flex-col items-center text-center gap-5">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <Camera className="w-12 h-12 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Scan Food
                          </h3>
                          <p className="text-gray-600">
                            Instantly analyze products with barcode scanning or photo upload
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Recent Scans Card */}
                <Link to="/recent-scans">
                  <Card className="border-3 border-green-300 hover:border-green-500 transition-all cursor-pointer group overflow-hidden relative shadow-lg hover:shadow-xl h-full">
                    <CardContent className="p-10">
                      <div className="flex flex-col items-center text-center gap-5">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <History className="w-12 h-12 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Recent Scans
                          </h3>
                          <p className="text-gray-600">
                            View your scanning history and past product analyses
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Compare Products Card */}
                <Link to="/compare">
                  <Card className="border-3 border-emerald-300 hover:border-emerald-500 transition-all cursor-pointer group overflow-hidden relative shadow-lg hover:shadow-xl h-full">
                    <CardContent className="p-10">
                      <div className="flex flex-col items-center text-center gap-5">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <GitCompare className="w-12 h-12 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Compare Products
                          </h3>
                          <p className="text-gray-600">
                            Side-by-side comparison to make the wisest choice
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                {/* Personalized Insights Card */}
                <Card className="border-3 border-green-300 hover:border-green-500 transition-all cursor-pointer group overflow-hidden relative shadow-lg hover:shadow-xl">
                  <CardContent className="p-10">
                    <div className="flex flex-col items-center text-center gap-5">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Sparkles className="w-12 h-12 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          Personalized Insights
                        </h3>
                        <p className="text-gray-600">
                          AI-powered recommendations based on your health profile
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right AI Insight Panel - Stacked Cards */}
            <div className="w-96 px-8 py-10">
              <div className="mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  AI Insights
                </h2>
                <p className="text-sm text-gray-600">Based on your latest scan</p>
              </div>

              {latestScan ? (
                <Card className="border-3 border-emerald-300 shadow-xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-br from-emerald-50 to-green-50 border-b-2 border-emerald-200 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{latestScan.name}</h3>
                    <p className="text-sm text-gray-600">{latestScan.brand}</p>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-5">
                    {/* Row 1: Health Score and Risk Level */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Health Score with Circular Progress */}
                      <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border-2 border-emerald-200 flex flex-col items-center">
                        <span className="text-xs font-semibold text-gray-700 mb-3">Health Score</span>
                        <CircularProgress score={latestScan.healthScore} size={100} />
                      </div>

                      {/* Risk Level */}
                      <div className="bg-gradient-to-br from-white to-emerald-50 p-4 rounded-xl border-2 border-emerald-200 flex flex-col justify-center">
                        <h4 className="text-xs font-semibold text-gray-700 mb-3 text-center">Risk Level</h4>
                        <Badge 
                          className={`w-full justify-center text-sm py-2 ${
                            latestScan.healthScore >= 80
                              ? "bg-gradient-to-r from-green-400 to-emerald-400"
                              : latestScan.healthScore >= 60
                              ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                              : "bg-gradient-to-r from-orange-400 to-red-400"
                          } text-white border-none`}
                        >
                          {latestScan.healthScore >= 80 ? "Low" : latestScan.healthScore >= 60 ? "Moderate" : "High"}
                        </Badge>
                      </div>
                    </div>

                    {/* Row 2: Allergen Alerts and Packaging Safety */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Allergen Alerts */}
                      <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border-2 border-emerald-200">
                        <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                          Allergen Alerts
                        </h4>
                        {latestScan.alerts.length > 0 ? (
                          <div className="space-y-1.5">
                            {latestScan.alerts.slice(0, 2).map((alert, idx) => (
                              <div key={idx} className="text-xs text-gray-700 bg-red-50 px-2.5 py-1.5 rounded border border-red-200">
                                {alert}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-green-600 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            None
                          </p>
                        )}
                      </div>

                      {/* Packaging Safety */}
                      <div className="bg-gradient-to-br from-white to-emerald-50 p-4 rounded-xl border-2 border-emerald-200">
                        <h4 className="text-xs font-semibold text-gray-700 mb-3">Packaging Safety</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${latestScan.packagingScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-emerald-600">
                            {latestScan.packagingScore}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {latestScan.packagingScore >= 80 
                            ? "Safe materials" 
                            : "Avoid heat"}
                        </p>
                      </div>
                    </div>

                    {/* Ingredient Warnings - Compact List */}
                    <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border-2 border-emerald-200">
                      <h4 className="text-xs font-semibold text-gray-700 mb-3">Ingredient Warnings</h4>
                      <div className="space-y-2">
                        {latestScan.ingredients.slice(0, 3).map((ing, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                ing.status === "safe"
                                  ? "bg-green-400"
                                  : ing.status === "warning"
                                  ? "bg-amber-400"
                                  : ing.status === "caution"
                                  ? "bg-orange-400"
                                  : "bg-red-400"
                              }`}
                            />
                            <span className="text-xs text-gray-700">{ing.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link to={`/product/${latestScan.id}`}>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl text-sm py-2.5 shadow-md hover:shadow-lg transition-all">
                        View Full Analysis
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-emerald-200 shadow-sm">
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-3">🔍</div>
                    <p className="text-sm text-gray-600">
                      Scan a product to see AI insights.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}