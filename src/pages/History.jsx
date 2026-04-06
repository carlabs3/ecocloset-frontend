import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const categoriaColor = {
  bajo: "#7d9e7a",
  medio: "#5a8a57",
  "medio-alto": "#b07a30",
  alto: "#cc4444",
};

const categoriaEmoji = {
  bajo: "🌿",
  medio: "🍃",
  "medio-alto": "🌍",
  alto: "🔥",
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
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await response.json();
        if (!response.ok) {
          setError("No se pudieron cargar los resultados");
          return;
        }
        setResultados(data);
      } catch (err) {
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };
    fetchResultados();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/results/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!response.ok) {
        setError("No se pudo eliminar el resultado");
        return;
      }
      setResultados(resultados.filter((r) => r._id !== id));
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  if (loading)
    return (
      <div className="page-center">
        <p style={{ color: "var(--texto-muted)" }}>Cargando historial...</p>
      </div>
    );

  return (
    <div className="history-page">
      <div className="history-container">
        <p className="history-tag">TU HISTORIAL</p>
        <h1 className="history-title">Mis resultados</h1>

        {error && <div className="error-box">{error}</div>}

        {resultados.length === 0 ? (
          <div className="history-empty">
            <p className="history-empty-emoji">🌿</p>
            <p className="history-empty-title">Aún no tienes resultados</p>
            <p className="history-empty-text">
              Haz el test para descubrir tu huella
            </p>
            <button className="auth-btn" onClick={() => navigate("/test")}>
              Hacer el test
            </button>
          </div>
        ) : (
          <div className="history-list">
            {resultados.map((resultado) => (
              <div
                key={resultado._id}
                className="history-item"
                onClick={() => navigate(`/results/${resultado._id}`)}
              >
                <div className="history-item-left">
                  <span className="history-item-emoji">
                    {categoriaEmoji[resultado.category] || "🌿"}
                  </span>
                  <div>
                    <p
                      className="history-item-category"
                      style={{
                        color:
                          categoriaColor[resultado.category] || "var(--verde)",
                      }}
                    >
                      Huella {resultado.category}
                    </p>
                    <p className="history-item-metrics">
                      {resultado.carbonFootprint}t CO₂ ·{" "}
                      {(resultado.waterFootprint / 1000).toFixed(0)}K litros
                    </p>
                    <p className="history-item-date">
                      {new Date(resultado.createdAt).toLocaleDateString(
                        "es-ES",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>
                <button
                  className="history-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(resultado._id);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className="history-new-btn"
              onClick={() => navigate("/test")}
            >
              Hacer nuevo test
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
