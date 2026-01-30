import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email || null);
      } catch (err) {
        setEmail(null);
      }
    } else {
      setEmail(null);
    }
  }, [token]);

  const login = (tk) => {
    localStorage.setItem("token", tk);
    setToken(tk);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);