import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Email o contraseña incorrectos");
        return;
      }
      login(data.token, data.email);
      navigate("/history");
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-tag">ECOCLOSET</p>
        <h1 className="auth-title">Bienvenida de nuevo</h1>
        <p className="auth-subtitle">Accede a tu historial de resultados</p>

        {error && <div className="error-box">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="auth-label">Contraseña</label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="auth-footer-link">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
