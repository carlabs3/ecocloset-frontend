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
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ECOCLOSET <span style={{ color: "var(--verde)" }}>*</span>
      </Link>

      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/history" className="navbar-link">
              Historial
            </Link>
            <Link to="/test" className="navbar-link-btn">
              Nuevo Test
            </Link>
            <button onClick={handleLogout} className="navbar-logout">
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register" className="navbar-link-btn">
              Unirme
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
