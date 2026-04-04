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
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "var(--crema)",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "0.5px solid var(--borde)",
          borderRadius: "16px",
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <p
          style={{
            color: "var(--verde)",
            fontSize: "12px",
            letterSpacing: "0.15em",
            marginBottom: "8px",
          }}
        >
          ECOCLOSET
        </p>
        <h1
          style={{ fontSize: "24px", fontWeight: "500", marginBottom: "8px" }}
        >
          Bienvenida de nuevo
        </h1>
        <p
          style={{
            color: "var(--texto-muted)",
            fontSize: "14px",
            marginBottom: "32px",
          }}
        >
          Accede a tu historial de resultados
        </p>

        {error && (
          <div
            style={{
              background: "#fff0f0",
              border: "0.5px solid #ffcccc",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "16px",
              fontSize: "14px",
              color: "#cc0000",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              style={{
                fontSize: "13px",
                color: "var(--texto-muted)",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              style={{
                width: "100%",
                padding: "12px",
                border: "0.5px solid var(--borde)",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontSize: "13px",
                color: "var(--texto-muted)",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "0.5px solid var(--borde)",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "var(--negro)",
              color: "#fff",
              padding: "14px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "500",
              opacity: loading ? 0.7 : 1,
              cursor: "pointer",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "14px",
            color: "var(--texto-muted)",
          }}
        >
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            style={{ color: "var(--verde)", fontWeight: "500" }}
          >
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
