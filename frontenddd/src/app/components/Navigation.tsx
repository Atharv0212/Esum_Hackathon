import { Link, useLocation } from "react-router";
import { Home, FileText, User, GitCompare, Sparkles } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/home") {
      return location.pathname === "/home";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-50 via-white to-green-50 border-b-2 border-emerald-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative bamboo pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="bamboo-nav" x="0" y="0" width="40" height="60" patternUnits="userSpaceOnUse">
              <rect x="15" y="0" width="2" height="60" fill="#10b981" rx="1"/>
              <rect x="23" y="0" width="2" height="60" fill="#10b981" rx="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#bamboo-nav)" />
          </svg>
        </div>
        
        <div className="flex justify-between items-center h-20 relative">
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-white animate-bamboo-sway" />
              </div>
              {/* Bamboo leaves around logo */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full opacity-70"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-300 rounded-full opacity-70"></div>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                WiseBite
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive("/home") && location.pathname === "/home"
                  ? "text-emerald-600 bg-gradient-to-br from-emerald-100 to-green-100 shadow-md"
                  : "text-gray-600 hover:text-emerald-500 hover:bg-emerald-50"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/compare"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive("/compare")
                  ? "text-emerald-600 bg-gradient-to-br from-emerald-100 to-green-100 shadow-md"
                  : "text-gray-600 hover:text-emerald-500 hover:bg-emerald-50"
              }`}
            >
              <GitCompare className="w-5 h-5" />
              <span className="text-xs hidden sm:inline">Compare</span>
            </Link>
            <Link
              to="/profile"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive("/profile")
                  ? "text-emerald-600 bg-gradient-to-br from-emerald-100 to-green-100 shadow-md"
                  : "text-gray-600 hover:text-emerald-500 hover:bg-emerald-50"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs hidden sm:inline">Profile</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative border */}
      <div className="h-1 bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-300"></div>
    </nav>
  );
}