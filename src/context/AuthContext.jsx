import { createContext, useContext, useEffect, useState } from "react";
import { login as userLogin, logout as userLogout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const navigate = useNavigate();

  async function login(name, email) {
    const result = await userLogin(name, email);
    if (result.status === 200) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("validTill", new Date().getTime() + 60 * 60 * 1000);
      setIsAuthenticated(true);
      navigate("/search");
    }
  }

  useEffect(() => {
    async function checkAuthentication() {
      const isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";
      const validTill = parseInt(localStorage.getItem("validTill"));

      if (isAuthenticated && validTill) {
        const currentTime = new Date().getTime();
        if (currentTime > validTill) {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("validTill");
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    }

    checkAuthentication();
  }, []);

  async function logout() {
    await userLogout();
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("validTill");
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("context being accessed outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
