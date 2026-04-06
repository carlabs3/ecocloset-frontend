import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
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
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Error al registrarse");
        return;
      }
      login(data.token, data.email);
      navigate("/test");
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
        <h1 className="auth-title">Crea tu cuenta</h1>
        <p className="auth-subtitle">
          Guarda tus resultados y sigue tu progreso
        </p>

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
              placeholder="mínimo 6 caracteres"
            />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="auth-footer-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
