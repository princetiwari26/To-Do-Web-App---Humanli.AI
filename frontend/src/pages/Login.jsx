import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import {
  Eye,
  EyeOff,
  LayoutDashboard,
  CheckSquare,
  Pencil,
  Trash2,
  Zap,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async () => {
    if (!email || !password) {
      showToast("Please fill in all fields", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Invalid email address", "error");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      showToast("Login successful", "success");
      navigate("/boards");
    } catch {
      showToast("Invalid email or password", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") submit();
  };

  const features = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      text: "Organize work using boards",
      color: "text-blue-400",
    },
    {
      icon: <CheckSquare className="w-5 h-5" />,
      text: "Create and track todos",
      color: "text-green-400",
    },
    {
      icon: <Pencil className="w-5 h-5" />,
      text: "Edit tasks instantly",
      color: "text-yellow-400",
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      text: "Clean up completed work",
      color: "text-red-400",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-12">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* LEFT LOGIN SECTION */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                Sign in to manage your tasks and boards
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                className="w-full py-3 rounded-lg font-semibold text-base"
                onClick={submit}
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            <p className="text-center text-gray-600 text-sm sm:text-base mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-blue-700 text-white p-8 lg:p-12 flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold">Humanli.AI</h1>
              </div>

              <p className="text-lg text-white/90 mb-10">
                Plan your work, track your todos, and stay productive every day.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 group hover:translate-x-1 transition-transform duration-200"
                >
                  <div
                    className={`p-2 rounded-lg bg-white/10 group-hover:bg-white/20 ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <span className="text-lg font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}