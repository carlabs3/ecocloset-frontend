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
        ECOCLOSET
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/history" className="navbar-link-muted">
              Mi historial
            </Link>
            <Link to="/test" className="navbar-link-green">
              Nuevo test
            </Link>
            <button onClick={handleLogout} className="navbar-btn-logout">
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link-muted">
              Entrar
            </Link>
            <Link to="/register" className="navbar-btn-register">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
