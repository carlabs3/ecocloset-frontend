import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const categoriaConfig = {
  bajo: { nombre: "Baja", emoji: "🌿", color: "#7d9e7a" },
  medio: { nombre: "Media", emoji: "🍃", color: "#5a8a57" },
  alto: { nombre: "Alta", emoji: "🌍", color: "#b07a30" },
  "muy alto": { nombre: "Muy alta", emoji: "🔥", color: "#cc4444" },
};

function History() {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/results`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = await response.json();
        if (!response.ok) {
          setError("No se pudieron cargar los resultados");
          return;
        }
        setResultados(data);
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };
    fetchResultados();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/results/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!response.ok) return;
      setResultados(resultados.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="page-center">Cargando historial...</div>;

  return (
    <div className="history-page">
      <div className="history-container">
        <p className="home-hero-tag">TU PROGRESO</p>
        <h1
          className="home-hero-title"
          style={{ fontSize: "4rem", marginBottom: "40px" }}
        >
          Mis Huellas
        </h1>

        {error && <div className="error-box">{error}</div>}

        {resultados.length === 0 ? (
          <div
            className="results-header"
            style={{ background: "var(--verde-lima)", textAlign: "center" }}
          >
            <p style={{ fontSize: "3rem" }}>🌿</p>
            <p>Aún no has calculado tu impacto ambiental.</p>
            <button
              className="results-btn-primary"
              style={{ marginTop: "30px" }}
              onClick={() => navigate("/test")}
            >
              Empezar Test
            </button>
          </div>
        ) : (
          <div className="history-list">
            {resultados.map((r) => {
              const config = categoriaConfig[r.category] || {
                nombre: r.category,
                emoji: "❓",
                color: "var(--texto-muted)",
              };

              return (
                <div
                  key={r._id}
                  className="history-item"
                  onClick={() => navigate(`/results/${r._id}`)}
                >
                  <div className="history-item-left">
                    <span className="history-item-emoji">{config.emoji}</span>
                    <div>
                      <p
                        className="history-item-category"
                        style={{ color: config.color }}
                      >
                        Huella {config.nombre}
                      </p>
                      <p className="history-item-metrics">
                        {r.carbonFootprint}t CO₂ /{" "}
                        {r.waterFootprint.toLocaleString()} L
                      </p>
                      <p className="history-item-date">
                        {new Date(r.createdAt).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    className="history-delete-btn"
                    onClick={(e) => handleDelete(e, r._id)}
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}
            <button
              className="results-btn-primary"
              style={{ marginTop: "40px", width: "100%" }}
              onClick={() => navigate("/test")}
            >
              Nuevo Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
