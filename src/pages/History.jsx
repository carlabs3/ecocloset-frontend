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

  if (loading) {
    return (
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--crema)",
        }}
      >
        <p style={{ color: "var(--texto-muted)" }}>Cargando historial...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--crema)",
        minHeight: "90vh",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "12px",
            color: "var(--verde)",
            letterSpacing: "0.1em",
            marginBottom: "8px",
          }}
        >
          TU HISTORIAL
        </p>
        <h1
          style={{ fontSize: "28px", fontWeight: "500", marginBottom: "32px" }}
        >
          Mis resultados
        </h1>

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

        {resultados.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "0.5px solid var(--borde)",
              borderRadius: "12px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "32px", marginBottom: "12px" }}>🌿</p>
            <p style={{ fontWeight: "500", marginBottom: "8px" }}>
              Aún no tienes resultados
            </p>
            <p
              style={{
                color: "var(--texto-muted)",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              Haz el test para descubrir tu huella
            </p>
            <button
              onClick={() => navigate("/test")}
              style={{
                background: "var(--negro)",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Hacer el test
            </button>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {resultados.map((resultado) => (
              <div
                key={resultado._id}
                style={{
                  background: "#fff",
                  border: "0.5px solid var(--borde)",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/results/${resultado._id}`)}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <span style={{ fontSize: "24px" }}>
                    {categoriaEmoji[resultado.category] || "🌿"}
                  </span>
                  <div>
                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "15px",
                        color:
                          categoriaColor[resultado.category] || "var(--verde)",
                        marginBottom: "4px",
                        textTransform: "capitalize",
                      }}
                    >
                      Huella {resultado.category}
                    </p>
                    <p
                      style={{ fontSize: "13px", color: "var(--texto-muted)" }}
                    >
                      {resultado.carbonFootprint}t CO₂ ·{" "}
                      {(resultado.waterFootprint / 1000).toFixed(0)}K litros
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--texto-muted)",
                        marginTop: "2px",
                      }}
                    >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(resultado._id);
                  }}
                  style={{
                    background: "none",
                    color: "#ccc",
                    fontSize: "18px",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}

            <button
              onClick={() => navigate("/test")}
              style={{
                background: "var(--negro)",
                color: "#fff",
                padding: "14px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "8px",
                cursor: "pointer",
              }}
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
