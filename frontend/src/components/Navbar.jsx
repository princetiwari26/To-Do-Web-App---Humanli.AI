import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { logout, email } = useAuth();

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <h1 className="text-xl font-bold">Assessment</h1>

      <div className="flex items-center gap-4">
        {email && (
          <span className="text-gray-600 text-sm font-medium">{email}</span>
        )}

        <button onClick={logout} className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium text-sm sm:text-base transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
