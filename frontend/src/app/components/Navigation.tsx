import { Link, useLocation } from "react-router";
import { Home, FileText, User, GitCompare, Sparkles } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gradient-to-r from-pink-50 via-white to-purple-50 border-b-2 border-pink-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative wave pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="wave" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="#ec4899" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#wave)" />
          </svg>
        </div>
        
        <div className="flex justify-between items-center h-20 relative">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-white animate-sakura-bloom" />
              </div>
              {/* Blossom petals around logo */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-300 rounded-full opacity-70"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-300 rounded-full opacity-70"></div>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                WiseBite
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive("/") && location.pathname === "/"
                  ? "text-pink-600 bg-gradient-to-br from-pink-100 to-purple-100 shadow-md"
                  : "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/compare"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive("/compare")
                  ? "text-pink-600 bg-gradient-to-br from-pink-100 to-purple-100 shadow-md"
                  : "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
              }`}
            >
              <GitCompare className="w-5 h-5" />
              <span className="text-xs hidden sm:inline">Compare</span>
            </Link>
            <Link
              to="/profile"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive("/profile")
                  ? "text-pink-600 bg-gradient-to-br from-pink-100 to-purple-100 shadow-md"
                  : "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs hidden sm:inline">Profile</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative border */}
      <div className="h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300"></div>
    </nav>
  );
}