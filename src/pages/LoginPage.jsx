import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/search", { replace: true }); // Redirect if already logged in
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    await login(name, email);
  }

  return (
    <div className={styles.form}>
      <form className={styles.loginForm} onSubmit={(e) => handleLogin(e)}>
        <img src="./fetch-logo.png" />
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
