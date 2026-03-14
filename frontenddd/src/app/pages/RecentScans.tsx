import { Link } from "react-router";
import { WiseBiteLogo } from "../components/WiseBiteLogo";
import { AlertTriangle, CheckCircle, Clock, Home as HomeIcon, GitCompare, User, Menu, Settings, ScanLine, History, Package } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { mockProducts } from "../data/mockData";
import { useState } from "react";

export function RecentScans() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 text-gray-700 cursor-pointer transition-all">
            <ScanLine className="w-5 h-5 text-emerald-600" />
            {sidebarOpen && <span className="font-medium">Scan</span>}
          </div>

          <Link to="/recent-scans">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md cursor-pointer">
              <History className="w-5 h-5" />
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
              <h1 className="text-2xl font-bold text-gray-900">Recent Scans</h1>
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
          <div className="mb-6">
            <p className="text-gray-600">
              View all your scanned products and their health analyses
            </p>
          </div>

          {/* Scrollable Rectangular Cards */}
          <div className="space-y-5">
            {mockProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="border-3 border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl overflow-hidden border-2 border-emerald-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600">{product.brand}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-gray-500">Health Score:</span>
                              <span
                                className="text-3xl font-bold"
                                style={{
                                  color:
                                    product.healthScore >= 80
                                      ? "#10b981"
                                      : product.healthScore >= 60
                                      ? "#f59e0b"
                                      : product.healthScore >= 40
                                      ? "#f97316"
                                      : "#ef4444",
                                }}
                              >
                                {product.healthScore}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">/ 100</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-3">
                          {/* Risk Level */}
                          <div className="bg-gradient-to-br from-emerald-50 to-white p-3 rounded-lg border border-emerald-200">
                            <p className="text-xs text-gray-600 mb-1">Risk Level</p>
                            <Badge 
                              className={`${
                                product.healthScore >= 80
                                  ? "bg-green-500"
                                  : product.healthScore >= 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              } text-white border-none`}
                            >
                              {product.healthScore >= 80 ? "Low" : product.healthScore >= 60 ? "Moderate" : "High"}
                            </Badge>
                          </div>

                          {/* Ingredient Alerts */}
                          <div className="bg-gradient-to-br from-white to-emerald-50 p-3 rounded-lg border border-emerald-200">
                            <p className="text-xs text-gray-600 mb-1">Ingredient Alerts</p>
                            {product.alerts.length > 0 ? (
                              <div className="flex items-center gap-1 text-red-600">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="font-bold">{product.alerts.length}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-bold">None</span>
                              </div>
                            )}
                          </div>

                          {/* Packaging */}
                          <div className="bg-gradient-to-br from-emerald-50 to-white p-3 rounded-lg border border-emerald-200">
                            <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              Packaging
                            </p>
                            <span className="font-bold text-emerald-600">{product.packagingScore}/100</span>
                          </div>
                        </div>

                        {/* Scan Date & Alerts */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Scanned {new Date(product.scanDate).toLocaleDateString()}
                          </span>
                          {product.alerts.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {product.alerts.slice(0, 2).map((alert, idx) => (
                                <Badge key={idx} className="bg-red-100 text-red-700 border-red-300 text-xs">
                                  {alert}
                                </Badge>
                              ))}
                              {product.alerts.length > 2 && (
                                <Badge className="bg-gray-100 text-gray-700 text-xs">
                                  +{product.alerts.length - 2} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}