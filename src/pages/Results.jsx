import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import ResultCard from "../components/ResultCard";

function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resultado, setResultado] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const esPreview = id === "preview";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/results/stats`,
        );
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.log("No se pudieron cargar las estadísticas");
      }
    };

    fetchStats();

    if (esPreview) {
      setResultado({
        carbonFootprint: parseFloat(searchParams.get("carbon")),
        waterFootprint: parseInt(searchParams.get("water")),
        category: searchParams.get("category"),
      });
      setLoading(false);
    } else {
      const fetchResultado = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/results/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const data = await response.json();
          if (!response.ok) {
            setError("No se pudo cargar el resultado");
            return;
          }
          setResultado(data);
        } catch (err) {
          setError("Error de conexión con el servidor");
        } finally {
          setLoading(false);
        }
      };
      fetchResultado();
    }
  }, [id]);

  if (loading)
    return (
      <div className="page-center">
        <p style={{ color: "var(--texto-muted)" }}>Cargando resultado...</p>
      </div>
    );

  if (error)
    return (
      <div className="page-center">
        <p style={{ color: "#cc0000" }}>{error}</p>
      </div>
    );

  const porDebajoMedia = stats && resultado.carbonFootprint < stats.avgCarbon;

  return (
    <div className="results-page">
      <div className="results-container">
        {esPreview && (
          <div
            style={{
              background: "var(--negro)",
              color: "#fff",
              borderRadius: "12px",
              padding: "20px 24px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p style={{ fontWeight: "500", marginBottom: "4px" }}>
                ¿Quieres guardar tu resultado?
              </p>
              <p style={{ fontSize: "13px", color: "#aaa" }}>
                Crea una cuenta gratuita para ver tu historial y seguir tu
                progreso
              </p>
            </div>
            <Link
              to="/register"
              style={{
                background: "var(--verde)",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            >
              Crear cuenta
            </Link>
          </div>
        )}

        <ResultCard
          carbon={resultado.carbonFootprint}
          water={resultado.waterFootprint}
          category={resultado.category}
        />

        {/* Comparación con la media */}
        {stats && stats.totalTests > 1 && (
          <div
            style={{
              background: "#fff",
              border: "0.5px solid var(--borde)",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "16px",
              }}
            >
              Tu huella vs la media de usuarios
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  background: "var(--crema)",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    color: "var(--texto-muted)",
                    letterSpacing: "0.08em",
                    marginBottom: "6px",
                  }}
                >
                  MEDIA USUARIOS
                </p>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: "var(--negro)",
                    marginBottom: "2px",
                  }}
                >
                  {stats.avgCarbon}t
                </p>
                <p style={{ fontSize: "11px", color: "var(--texto-muted)" }}>
                  CO₂ / año
                </p>
              </div>
              <div
                style={{
                  background: "var(--crema)",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    color: "var(--texto-muted)",
                    letterSpacing: "0.08em",
                    marginBottom: "6px",
                  }}
                >
                  TU HUELLA
                </p>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: porDebajoMedia ? "var(--verde)" : "#cc4444",
                    marginBottom: "2px",
                  }}
                >
                  {resultado.carbonFootprint}t
                </p>
                <p style={{ fontSize: "11px", color: "var(--texto-muted)" }}>
                  CO₂ / año
                </p>
              </div>
            </div>
            <div
              style={{
                background: porDebajoMedia ? "var(--verde-claro)" : "#fff0f0",
                border: `0.5px solid ${porDebajoMedia ? "var(--verde)" : "#ffcccc"}`,
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "14px",
                color: porDebajoMedia ? "#2a4a27" : "#cc0000",
              }}
            >
              {porDebajoMedia
                ? `✅ Tu huella está por debajo de la media. ¡Buen trabajo!`
                : `⚠️ Tu huella está por encima de la media. Pequeños cambios marcan la diferencia.`}
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "var(--texto-muted)",
                marginTop: "12px",
                textAlign: "center",
              }}
            >
              Basado en {stats.totalTests} tests realizados en EcoCloset
            </p>
          </div>
        )}

        <div className="results-tips">
          <h3 className="results-tips-title">Claves para mejorar</h3>
          <div className="results-tips-list">
            {[
              {
                icono: "👕",
                texto: "Menos es mejor: reduce cantidad, no estilo",
              },
              {
                icono: "💧",
                texto: "Lava menos y en frío: ahorra agua y energía",
              },
              {
                icono: "🔁",
                texto: "Alarga la vida útil: repara, personaliza, intercambia",
              },
              { icono: "♻️", texto: "Usa la segunda mano y recicla textil" },
            ].map((consejo, i) => (
              <div key={i} className="results-tip">
                <span style={{ fontSize: "16px" }}>{consejo.icono}</span>
                <p className="results-tip-text">{consejo.texto}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="results-actions">
          <button
            className="results-btn-primary"
            onClick={() => navigate("/test")}
          >
            Repetir test
          </button>
          {!esPreview && (
            <Link to="/history" className="results-btn-secondary">
              Ver historial
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;
