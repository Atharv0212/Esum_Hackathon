import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Sparkles, Mail } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to home dashboard after form submission
    navigate("/home");
  };

  const handleSocialLogin = (provider: string) => {
    // In a real app, this would handle OAuth
    console.log(`Login with ${provider}`);
    navigate("/home");
  };

  const toggleSignInMode = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 relative overflow-hidden flex items-center justify-center p-8 lg:p-12">
          {/* Content */}
          <div className="relative text-center max-w-lg">
            {/* Logo */}
            <div className="mb-8 inline-block relative group">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border-2 border-white/30 shadow-2xl">
                <svg width="100" height="100" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="loginLeafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  
                  {/* Bamboo leaf */}
                  <path
                    d="M 60 10 Q 40 30 40 60 Q 40 90 60 110 Q 80 90 80 60 Q 80 30 60 10 Z"
                    fill="url(#loginLeafGradient)"
                  />
                  
                  {/* Veins */}
                  <path d="M 60 10 L 60 110" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
                  <path d="M 60 30 Q 50 40 45 50 M 60 30 Q 70 40 75 50" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                  <path d="M 60 60 Q 50 70 45 80 M 60 60 Q 70 70 75 80" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                  
                  {/* Bite mark */}
                  <path d="M 75 40 Q 85 50 75 60" fill="rgba(5,150,105,0.3)" stroke="white" strokeWidth="2"/>
                  <ellipse cx="80" cy="50" rx="8" ry="12" fill="rgba(5,150,105,0.3)"/>
                </svg>
              </div>
            </div>

            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
              WiseBite
            </h1>
            <p className="text-2xl text-white/90 font-medium leading-relaxed mb-6">
              Know your food before your first bite.
            </p>
            
            <div className="flex items-center gap-3 justify-center my-8">
              <div className="h-px w-12 bg-white/30"></div>
              <span className="text-3xl">🎋</span>
              <div className="h-px w-12 bg-white/30"></div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-white/80 text-sm">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <div className="text-xl mb-1">🔍</div>
                <p className="font-medium">Scan & Analyze</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <div className="text-xl mb-1">🛡️</div>
                <p className="font-medium">Stay Protected</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <div className="text-xl mb-1">✨</div>
                <p className="font-medium">Live Healthier</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Panel */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 mb-4">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">
                    {isSignIn ? "Welcome Back" : "Get Started"}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {isSignIn ? "Sign In" : "Create Account"}
                </h2>
                <p className="text-gray-600">
                  {isSignIn ? "Continue your health journey" : "Start your health journey today"}
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 rounded-xl border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 rounded-xl border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
                  onClick={() => handleSocialLogin("Apple")}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 rounded-xl border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
                  onClick={() => handleSocialLogin("Email")}
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Continue with Email
                </Button>
              </div>

              {/* Separator */}
              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                  OR
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isSignIn && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 rounded-xl border-2 focus:border-emerald-400 bg-gray-50"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700">
                    {isSignIn ? "Email or Username" : "Username"}
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder={isSignIn ? "your@email.com" : "@username"}
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="h-12 rounded-xl border-2 focus:border-emerald-400 bg-gray-50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-12 rounded-xl border-2 focus:border-emerald-400 bg-gray-50"
                    required
                  />
                </div>

                {isSignIn && (
                  <div className="text-right">
                    <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {isSignIn ? "Sign In" : "Create Account"}
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </form>

              {/* Toggle Sign In / Sign Up */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={toggleSignInMode}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    {isSignIn ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>

              {/* Terms */}
              {!isSignIn && (
                <p className="mt-6 text-xs text-center text-gray-500 leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}