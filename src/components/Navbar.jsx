import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        background: "var(--negro)",
        color: "#fff",
      }}
    >
      <Link
        to="/"
        style={{ color: "#fff", fontWeight: "500", letterSpacing: "0.05em" }}
      >
        ECOCLOSET
      </Link>
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          fontSize: "13px",
        }}
      >
        {user ? (
          <>
            <Link to="/history" style={{ color: "#aaa" }}>
              Mi historial
            </Link>
            <Link to="/test" style={{ color: "var(--verde)" }}>
              Nuevo test
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                color: "#aaa",
                fontSize: "13px",
              }}
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#aaa" }}>
              Entrar
            </Link>
            <Link
              to="/register"
              style={{
                background: "var(--verde)",
                color: "#fff",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "13px",
              }}
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
