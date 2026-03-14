import { useState } from "react";
import { Link } from "react-router";
import { WiseBiteLogo } from "../components/WiseBiteLogo";
import { HealthScoreGauge } from "../components/HealthScoreGauge";
import { TrendingUp, AlertTriangle, Package, CheckCircle, Sparkles, Home as HomeIcon, GitCompare, User, Menu, Settings, ScanLine, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { mockProducts } from "../data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

export function Comparison() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedProductA, setSelectedProductA] = useState(mockProducts[1]); // Greek Yogurt
  const [selectedProductB, setSelectedProductB] = useState(mockProducts[2]); // Protein Bar
  const [isDialogAOpen, setIsDialogAOpen] = useState(false);
  const [isDialogBOpen, setIsDialogBOpen] = useState(false);

  const winner = selectedProductA.healthScore > selectedProductB.healthScore ? selectedProductA : selectedProductB;

  const ProductSelector = ({ 
    onSelect, 
    currentProductId, 
    position 
  }: { 
    onSelect: (product: typeof mockProducts[0]) => void;
    currentProductId: string;
    position: "A" | "B";
  }) => (
    <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
      {mockProducts
        .filter(p => p.id !== currentProductId)
        .map((product) => (
          <Card
            key={product.id}
            className="cursor-pointer hover:shadow-lg transition-all border-2 border-emerald-200 hover:border-emerald-400"
            onClick={() => {
              onSelect(product);
              if (position === "A") setIsDialogAOpen(false);
              else setIsDialogBOpen(false);
            }}
          >
            <CardContent className="p-3">
              <div className="aspect-square bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg mb-2 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                {product.name}
              </h4>
              <p className="text-xs text-gray-500">{product.brand}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">Score:</span>
                <span
                  className="text-lg font-bold"
                  style={{
                    color:
                      product.healthScore >= 80
                        ? "#10b981"
                        : product.healthScore >= 60
                        ? "#f59e0b"
                        : "#ef4444",
                  }}
                >
                  {product.healthScore}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

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
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md cursor-pointer">
              <GitCompare className="w-5 h-5" />
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

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-emerald-200">
          <div className="px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex justify-between items-center">
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <GitCompare className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Compare Products
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

        <main className="max-w-7xl mx-auto px-8 py-12">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 px-5 py-2 rounded-full border-2 border-emerald-300 shadow-lg">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Make the Wise Choice
                </span>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Side-by-side analysis to guide your decision 🎋
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {/* Product A Card */}
            <Card className={`border-4 overflow-hidden shadow-xl ${winner.id === selectedProductA.id ? 'border-emerald-500 ring-4 ring-emerald-200' : 'border-emerald-300'}`}>
              <CardHeader className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-none text-sm px-3 py-1">
                        Product A
                      </Badge>
                      {winner.id === selectedProductA.id && (
                        <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-none shadow-md text-sm px-3 py-1">
                          <TrendingUp className="w-3.5 h-3.5 mr-1" />
                          Winner
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-emerald-700 font-semibold mb-1">{selectedProductA.brand}</p>
                    <CardTitle className="text-2xl text-gray-900 leading-tight">{selectedProductA.name}</CardTitle>
                  </div>
                  
                  <Dialog open={isDialogAOpen} onOpenChange={setIsDialogAOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-lg font-semibold"
                      >
                        Change
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-gradient-to-br from-emerald-50 to-white border-4 border-emerald-300">
                      <DialogHeader>
                        <DialogTitle className="text-2xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                          Select Product A
                        </DialogTitle>
                        <DialogDescription>
                          Choose a product to compare
                        </DialogDescription>
                      </DialogHeader>
                      <ProductSelector 
                        onSelect={setSelectedProductA} 
                        currentProductId={selectedProductB.id}
                        position="A"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="aspect-video bg-white rounded-2xl overflow-hidden border-3 border-emerald-200 shadow-md">
                  <img
                    src={selectedProductA.image}
                    alt={selectedProductA.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="pt-8 pb-6 bg-white space-y-5">
                {/* Health Score */}
                <div className="flex justify-center">
                  <HealthScoreGauge score={selectedProductA.healthScore} size="small" />
                </div>

                {/* Allergen Alerts */}
                <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-2xl border-2 border-emerald-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                    <AlertTriangle className="w-5 h-5 text-emerald-600" />
                    Allergen Alerts
                  </h4>
                  {selectedProductA.alerts.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedProductA.alerts.map((alert, idx) => (
                        <Badge key={idx} className="bg-gradient-to-r from-red-400 to-orange-400 text-white border-none text-xs px-3 py-1">
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-green-600 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      No allergen alerts
                    </p>
                  )}
                </div>

                {/* Packaging Safety */}
                <div className="bg-gradient-to-br from-white to-emerald-50 p-5 rounded-2xl border-2 border-emerald-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                    <Package className="w-5 h-5 text-green-600" />
                    Packaging Safety
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                        style={{ width: `${selectedProductA.packagingScore}%` }}
                      />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      {selectedProductA.packagingScore}
                    </span>
                  </div>
                </div>

                {/* Key Ingredients */}
                <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-2xl border-2 border-emerald-200">
                  <h4 className="font-bold text-gray-900 mb-3 text-base">Key Ingredients</h4>
                  <div className="space-y-2.5">
                    {selectedProductA.ingredients.slice(0, 3).map((ing, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            ing.status === "safe"
                              ? "bg-green-400"
                              : ing.status === "warning"
                              ? "bg-amber-400"
                              : "bg-red-400"
                          }`}
                        />
                        <span className="text-sm text-gray-700 font-medium">{ing.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product B Card */}
            <Card className={`border-4 overflow-hidden shadow-xl ${winner.id === selectedProductB.id ? 'border-green-500 ring-4 ring-green-200' : 'border-green-300'}`}>
              <CardHeader className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none text-sm px-3 py-1">
                        Product B
                      </Badge>
                      {winner.id === selectedProductB.id && (
                        <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-none shadow-md text-sm px-3 py-1">
                          <TrendingUp className="w-3.5 h-3.5 mr-1" />
                          Winner
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-green-700 font-semibold mb-1">{selectedProductB.brand}</p>
                    <CardTitle className="text-2xl text-gray-900 leading-tight">{selectedProductB.name}</CardTitle>
                  </div>
                  
                  <Dialog open={isDialogBOpen} onOpenChange={setIsDialogBOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-2 border-green-300 text-green-700 hover:bg-green-50 rounded-lg font-semibold"
                      >
                        Change
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-gradient-to-br from-green-50 to-white border-4 border-green-300">
                      <DialogHeader>
                        <DialogTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          Select Product B
                        </DialogTitle>
                        <DialogDescription>
                          Choose a product to compare
                        </DialogDescription>
                      </DialogHeader>
                      <ProductSelector 
                        onSelect={setSelectedProductB} 
                        currentProductId={selectedProductA.id}
                        position="B"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="aspect-video bg-white rounded-2xl overflow-hidden border-3 border-green-200 shadow-md">
                  <img
                    src={selectedProductB.image}
                    alt={selectedProductB.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="pt-8 pb-6 bg-white space-y-5">
                {/* Health Score */}
                <div className="flex justify-center">
                  <HealthScoreGauge score={selectedProductB.healthScore} size="small" />
                </div>

                {/* Allergen Alerts */}
                <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-2xl border-2 border-green-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                    <AlertTriangle className="w-5 h-5 text-green-600" />
                    Allergen Alerts
                  </h4>
                  {selectedProductB.alerts.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedProductB.alerts.map((alert, idx) => (
                        <Badge key={idx} className="bg-gradient-to-r from-red-400 to-orange-400 text-white border-none text-xs px-3 py-1">
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-green-600 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      No allergen alerts
                    </p>
                  )}
                </div>

                {/* Packaging Safety */}
                <div className="bg-gradient-to-br from-white to-green-50 p-5 rounded-2xl border-2 border-green-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-base">
                    <Package className="w-5 h-5 text-emerald-600" />
                    Packaging Safety
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full"
                        style={{ width: `${selectedProductB.packagingScore}%` }}
                      />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {selectedProductB.packagingScore}
                    </span>
                  </div>
                </div>

                {/* Key Ingredients */}
                <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-2xl border-2 border-green-200">
                  <h4 className="font-bold text-gray-900 mb-3 text-base">Key Ingredients</h4>
                  <div className="space-y-2.5">
                    {selectedProductB.ingredients.slice(0, 3).map((ing, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            ing.status === "safe"
                              ? "bg-green-400"
                              : ing.status === "warning"
                              ? "bg-amber-400"
                              : "bg-red-400"
                          }`}
                        />
                        <span className="text-sm text-gray-700 font-medium">{ing.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Verdict Section */}
          <Card className="border-4 border-emerald-400 overflow-hidden shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-emerald-100 via-green-100 to-emerald-100 border-b-3 border-emerald-300 py-6">
              <CardTitle className="flex items-center gap-3 text-3xl">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  AI Verdict
                </span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-10 bg-white">
              <div className="space-y-8">
                {/* Recommendation Banner */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 border-3 border-emerald-300 shadow-lg">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-5xl">🎋</span>
                    <div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        Recommended: {winner.name}
                      </h3>
                      <p className="text-gray-600 mt-1">by {winner.brand}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    Based on your health profile and our comprehensive analysis, <strong>{winner.name}</strong> is the wiser choice for your wellbeing.
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-3 gap-6 pt-6 border-t-3 border-emerald-200">
                    <div className="text-center bg-white p-6 rounded-2xl border-2 border-emerald-300 shadow-md">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Health Score Difference</p>
                      <p className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        +{Math.abs(selectedProductA.healthScore - selectedProductB.healthScore)}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">points advantage</p>
                    </div>
                    
                    <div className="text-center bg-white p-6 rounded-2xl border-2 border-green-300 shadow-md">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Fewer Alerts</p>
                      <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {Math.max(selectedProductA.alerts.length, selectedProductB.alerts.length) - Math.min(selectedProductA.alerts.length, selectedProductB.alerts.length)}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">less warnings</p>
                    </div>
                    
                    <div className="text-center bg-white p-6 rounded-2xl border-2 border-emerald-300 shadow-md">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Packaging Quality</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mt-2">
                        {winner.packagingScore > (winner === selectedProductA ? selectedProductB.packagingScore : selectedProductA.packagingScore) ? '✓ Better' : '✓ Good'}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">safety rating</p>
                    </div>
                  </div>
                </div>

                {/* Why This Recommendation */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-3 border-green-300">
                  <h4 className="font-bold text-gray-900 mb-5 text-xl flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Why this recommendation?
                  </h4>
                  <ul className="space-y-4 text-gray-700">
                    {winner.id === selectedProductA.id ? (
                      <>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-base">Significantly higher overall health score ({selectedProductA.healthScore} vs {selectedProductB.healthScore})</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-base">Contains natural, minimally processed ingredients</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-base">Better aligns with your dietary preferences and health conditions</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-base">Higher overall health score ({selectedProductB.healthScore} vs {selectedProductA.healthScore})</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-base">Fewer allergen warnings based on your profile</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-base">Better packaging safety and ingredient transparency</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="flex justify-center pt-4">
                  <Link to={`/product/${winner.id}`}>
                    <Button size="lg" className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-600 px-12 py-7 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all">
                      View {winner.name} Details 🎋
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
