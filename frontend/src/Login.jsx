import { useState } from "react";
import { login } from "./api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(username, password);
      sessionStorage.setItem("token", res.data.access_token);
      onLogin();
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Task Manager</h1>
        <p style={styles.subtitle}>Sign in to your account</p>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.button} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh", display: "flex", alignItems: "center",
    justifyContent: "center", background: "#f0f2f5",
  },
  card: {
    background: "white", padding: "2.5rem", borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.1)", width: "100%", maxWidth: "380px",
  },
  title: { margin: 0, fontSize: "1.8rem", color: "#1a1a2e" },
  subtitle: { color: "#666", marginBottom: "1.5rem" },
  input: {
    width: "100%", padding: "0.75rem", marginBottom: "1rem",
    border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem",
    boxSizing: "border-box",
  },
  button: {
    width: "100%", padding: "0.75rem", background: "#4f46e5",
    color: "white", border: "none", borderRadius: "8px",
    fontSize: "1rem", cursor: "pointer", fontWeight: "600",
  },
  error: { color: "#e53e3e", marginBottom: "1rem", fontSize: "0.9rem" },
};