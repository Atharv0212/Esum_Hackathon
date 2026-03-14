import { useParams, Link, useLocation, useNavigate } from "react-router";
import { WiseBiteLogo } from "../components/WiseBiteLogo";
import { ArrowLeft, AlertTriangle, Info, ShieldAlert, Leaf, Package, Sparkles, Home as HomeIcon, GitCompare, User, Menu, Settings, ScanLine, History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { useState, useEffect } from "react";
import { ProductAnalysisResponse, getProductNews, NewsArticle, analyzeProduct } from "../utils/api";

export function ProductAnalysis() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Data State
  const [productData, setProductData] = useState<ProductAnalysisResponse | null>(location.state?.analysisResult || null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(!productData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!productData && id && id !== 'IMAGE_SCAN') {
        try {
          // If we landed here via URL with a barcode and no state, fetch it
          setIsLoading(true);
          const data = await analyzeProduct(id);
          setProductData(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to load product");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    loadData();
  }, [id, productData]);

  useEffect(() => {
    async function loadNews() {
      if (productData && productData.product_name && productData.product_name !== "Unknown Image Product") {
        try {
          const newsData = await getProductNews(productData.product_name);
          setNews(newsData.articles || []);
        } catch (err) {
          console.error("Failed to load news", err);
        }
      }
    }
    loadNews();
  }, [productData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-xl" style={{ backgroundColor: '#E0FFF5' }}>
        <p className="animate-pulse font-semibold text-emerald-700">Analyzing product and building profile...</p>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-4" style={{ backgroundColor: '#E0FFF5' }}>
        <p className="text-xl text-red-600 font-semibold">{error || "Product not found"}</p>
        <Button onClick={() => navigate('/scan')}>Back to Scan</Button>
      </div>
    );
  }

  // Calculate generic health score (mock logic for UI display based on risks)
  const calculateHealthScore = () => {
    let score = 100;
    productData.ingredient_risks.forEach(risk => {
      if (risk.hazard_level === 'hazard') score -= 20;
      else if (risk.hazard_level === 'caution') score -= 10;
    });
    return Math.max(0, score);
  };

  const healthScore = calculateHealthScore();
  const hazards = productData.ingredient_risks.filter(r => r.hazard_level === 'hazard' || r.hazard_level === 'caution');
  const safeChoices = productData.ingredient_risks.filter(r => r.hazard_level === 'safe');

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
              <Link to="/scan">
                <Button variant="ghost" className="hover:bg-emerald-50 text-emerald-600 rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Scan
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  WiseBite
                </span>
                <WiseBiteLogo size={45} />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Product Header */}
          <Card className="mb-6 border-3 border-emerald-300 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎋</span>
                    <p className="text-sm text-emerald-600 font-semibold">{productData.category.toUpperCase().replace('_', ' ')}</p>
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
                    {productData.product_name}
                  </h1>
                  <p className="text-gray-700 mb-4 font-medium italic">{productData.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-2 border-emerald-300">
                      Scanned {new Date().toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Score */}
          <Card className="mb-6 border-3 border-emerald-300 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b-2 border-emerald-200">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-600" />
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Overall Health Assessment
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 text-center">
                  <div className="text-6xl font-bold mb-2" style={{
                    color:
                      healthScore >= 80
                        ? "#10b981"
                        : healthScore >= 60
                        ? "#f59e0b"
                        : healthScore >= 40
                        ? "#f97316"
                        : "#ef4444",
                  }}>
                    {healthScore}
                  </div>
                  <div className="text-sm text-gray-500">Estimated Safety Score</div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-2xl border-2 border-emerald-200">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Risk Assessment</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {healthScore >= 80 && " This is a safe choice for your dietary needs. 🎋"}
                      {healthScore >= 60 && healthScore < 80 && " This product contains some ingredients to be aware of. 🌿"}
                      {healthScore < 60 && " This product contains ingredients that may pose risks based on your health profile. ⚠️"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-center">
                    <div className="bg-gradient-to-br from-emerald-100 to-white p-3 rounded-2xl border-2 border-emerald-200">
                      <p className="text-xs text-emerald-600 font-semibold mb-1">Total Ingredients</p>
                      <p className="text-xl font-bold text-gray-900">{productData.ingredients.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-100 to-white p-3 rounded-2xl border-2 border-amber-200">
                      <p className="text-xs text-amber-600 font-semibold mb-1">Warnings</p>
                      <p className="text-xl font-bold text-gray-900">{productData.warnings.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-100 to-white p-3 rounded-2xl border-2 border-red-200">
                      <p className="text-xs text-red-600 font-semibold mb-1">Hazards</p>
                      <p className="text-xl font-bold text-gray-900">{hazards.filter(h => h.hazard_level === 'hazard').length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-white p-3 rounded-2xl border-2 border-green-200">
                      <p className="text-xs text-green-600 font-semibold mb-1">Safe Ingredients</p>
                      <p className="text-xl font-bold text-gray-900">{safeChoices.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Allergen & Global Alerts */}
            <Card className="border-3 border-red-300 shadow-xl">
              <CardHeader className="bg-gradient-to-br from-red-50 to-pink-50 border-b-2 border-red-200">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    Personalized Hazards & Warnings
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {hazards.length > 0 || productData.warnings.length > 0 ? (
                  <div className="space-y-3">
                    {productData.warnings.map((warning, idx) => (
                      <Alert key={`warn-${idx}`} className="border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <AlertTitle className="text-orange-800 font-bold">General Warning</AlertTitle>
                        <AlertDescription className="text-orange-700">
                          {warning}
                        </AlertDescription>
                      </Alert>
                    ))}
                    {hazards.map((hazard, idx) => (
                      <Alert key={idx} className={`border-2 ${hazard.hazard_level === 'hazard' ? 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50' : 'border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50'}`}>
                        <AlertTriangle className={`h-5 w-5 ${hazard.hazard_level === 'hazard' ? 'text-red-500' : 'text-amber-500'}`} />
                        <AlertTitle className={`font-bold ${hazard.hazard_level === 'hazard' ? 'text-red-800' : 'text-amber-800'}`}>{hazard.ingredient}</AlertTitle>
                        <AlertDescription className={hazard.hazard_level === 'hazard' ? 'text-red-700' : 'text-amber-700'}>
                          {hazard.explanation}
                          {hazard.related_allergies.length > 0 && <span className="block mt-1"><strong>Cross-reacts with:</strong> {hazard.related_allergies.join(", ")}</span>}
                          {hazard.related_diseases.length > 0 && <span className="block mt-1"><strong>Not recommended for:</strong> {hazard.related_diseases.join(", ")}</span>}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-green-600 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-300">
                    <Info className="w-6 h-6" />
                    <p className="font-semibold">No critical hazards or warnings detected for your profile 🌸</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* News and Controversies */}
            <Card className="border-3 border-emerald-300 shadow-xl overflow-hidden flex flex-col">
              <CardHeader className="bg-gradient-to-br from-emerald-50 to-green-50 border-b-2 border-emerald-200 flex-shrink-0">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    Brand News & Controversies
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-auto bg-gray-50/50">
                {news.length > 0 ? (
                  <div className="divide-y divide-emerald-100">
                    {news.map((item, idx) => (
                      <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="block p-5 hover:bg-emerald-50 transition-colors">
                        <p className="text-xs text-emerald-600 font-bold tracking-wide uppercase mb-1">{item.source}</p>
                        <h4 className="text-sm font-semibold text-gray-900 leading-snug mb-2">{item.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                      </a>
                    ))}
                  </div>
                ) : (
                   <div className="p-8 text-center text-gray-500">
                     <p className="mb-2">No major recent controversies found.</p>
                   </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Ingredient Analysis */}
          <Card className="border-3 border-emerald-300 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border-b-2 border-emerald-200">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-500" />
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Complete Ingredient Analysis
                </span>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Every scanned ingredient analyzed against your profile 🎋
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {productData.ingredient_risks.map((ingredient, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border-l-4 shadow-sm ${
                      ingredient.hazard_level === "safe"
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-green-500"
                        : ingredient.hazard_level === "caution"
                        ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-l-amber-500"
                        : ingredient.hazard_level === "hazard"
                        ? "bg-gradient-to-r from-red-50 to-pink-50 border-l-red-500"
                        : "bg-gradient-to-r from-gray-50 to-slate-50 border-l-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg capitalize">
                          {ingredient.ingredient}
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {ingredient.explanation}
                        </p>
                      </div>
                      <Badge
                        className={`px-3 py-1 ${
                          ingredient.hazard_level === "safe"
                            ? "bg-gradient-to-r from-green-400 to-emerald-400 text-white border-none"
                            : ingredient.hazard_level === "caution"
                            ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-white border-none"
                            : ingredient.hazard_level === "hazard"
                            ? "bg-gradient-to-r from-red-400 to-pink-400 text-white border-none"
                            : "bg-gradient-to-r from-gray-400 to-slate-400 text-white border-none"
                        }`}
                      >
                        {ingredient.hazard_level === "safe" && "Safe"}
                        {ingredient.hazard_level === "caution" && "Caution"}
                        {ingredient.hazard_level === "hazard" && "Hazard"}
                       </Badge>
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </main>
       </div>
     </div>
   );
}
