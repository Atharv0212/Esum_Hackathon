import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Sparkles } from "lucide-react";
import { WiseBiteLogo } from "../components/WiseBiteLogo";

export function Intro() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#E0FFF5] relative overflow-hidden flex items-center justify-center">
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-3xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-emerald-50 to-green-100 p-8 rounded-full border-4 border-white shadow-2xl">
            <WiseBiteLogo />
          </div>
        </div>

        {/* WiseBite branding */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-5 py-2 rounded-full border-2 border-emerald-200 shadow-lg mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-bamboo-sway" />
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              AI-Powered Food Intelligence
            </span>
          </div>
          <h1 className="text-7xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent mb-6 tracking-tight">
            WiseBite
          </h1>
          <p className="text-3xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto">
            Know your food before your first bite.
          </p>
        </div>

        {/* Decorative element */}
        <div className="my-8 flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
          <span className="text-3xl animate-bamboo-sway">🎋</span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl">
          <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-emerald-200 shadow-md">
            <div className="text-2xl mb-2">🔍</div>
            <p className="text-sm font-semibold text-gray-700">Ingredient Analysis</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-emerald-200 shadow-md">
            <div className="text-2xl mb-2">❤️</div>
            <p className="text-sm font-semibold text-gray-700">Health Protection</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-emerald-200 shadow-md">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm font-semibold text-gray-700">Instant Results</p>
          </div>
        </div>

        {/* Start button */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <Button
            onClick={handleStart}
            size="lg"
            className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white px-16 py-8 text-2xl font-bold rounded-full shadow-2xl transform transition-all hover:scale-105 border-2 border-white/20"
          >
            Start Your Journey
            <Sparkles className="ml-3 w-6 h-6 animate-bamboo-sway" />
          </Button>
        </div>

        {/* Bottom decorative text */}
        <p className="mt-8 text-sm text-gray-600">
          Join thousands making healthier food choices
        </p>
      </div>
    </div>
  );
}