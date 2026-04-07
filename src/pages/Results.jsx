import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import ResultCard from "../components/ResultCard";

const MAX_CARBONO = 4;
const MAX_AGUA_K = 3000;

const getWaterEquivalence = (litros) => {
  const piscinaStandard = 50000; // 50.000L
  const cantidad = (litros / piscinaStandard).toFixed(1);

  return (
    <>
      EQUIVALE A <span className="highlight-num">{cantidad}</span> PISCINAS
      ESTÁNDAR
    </>
  );
};

const getCarbonEquivalence = (toneladas) => {
  const trayectos = (toneladas / 0.15).toFixed(1);
  return (
    <>
      EQUIVALE A <span className="highlight-num">{trayectos}</span> TRAYECTOS
      MADRID-PARÍS
    </>
  );
};

const getFeedbackMessage = (userVal, avgVal, type) => {
  const isBelow = userVal < avgVal;
  const ratio = userVal / avgVal;

  if (isBelow) {
    if (ratio < 0.5)
      return "¡Increíble! Tu huella es ejemplar, muy por debajo de la media.";
    return "¡Buen trabajo! Estás por debajo de la media global.";
  } else {
    if (ratio > 1.5)
      return "Cuidado, tu impacto es crítico. Necesitas cambios urgentes.";
    return "Estás por encima de la media. Hay margen de mejora.";
  }
};
const ComparisonBarChart = ({
  title,
  userValue,
  avgValue,
  unit,
  maxValue,
  color,
  equivalence,
  feedback,
}) => {
  const userHeight = Math.min((userValue / maxValue) * 100, 100);
  const avgHeight = Math.min((avgValue / maxValue) * 100, 100);

  return (
    <div className="bar-chart-container">
      <h4 className="bar-chart-title">{title}</h4>
      <div className="bar-chart-area">
        <div className="bar-wrapper">
          <div className="bar-value">
            {userValue.toLocaleString()}
            {unit}
          </div>
          <div
            className="bar-pill user-bar"
            style={{ height: `${userHeight}%`, backgroundColor: color }}
          ></div>
          <div className="bar-label">TÚ</div>
        </div>
        <div className="bar-wrapper">
          <div className="bar-value">
            {avgValue.toLocaleString()}
            {unit}
          </div>
          <div
            className="bar-pill global-bar"
            style={{ height: `${avgHeight}%` }}
          ></div>
          <div className="bar-label">GLOBAL</div>
        </div>
      </div>

      <p className="bar-feedback-msg">{feedback}</p>

      <div className="equivalence-tag">
        <p>{equivalence}</p>
      </div>
    </div>
  );
};

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
        console.log("Error stats");
      }
    };

    const fetchDatos = async () => {
      if (esPreview) {
        setResultado({
          carbonFootprint: parseFloat(searchParams.get("carbon")),
          waterFootprint: parseInt(searchParams.get("water")),
          category: searchParams.get("category"),
        });
        setLoading(false);
      } else {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/results/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const data = await response.json();
          setResultado(data);
        } catch (err) {
          setError("Error");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStats();
    fetchDatos();
  }, [id, esPreview, searchParams]);

  if (loading) return <div className="page-center">CARGANDO...</div>;

  return (
    <div className="results-page">
      <div className="results-container">
        {esPreview && (
          <div
            className="results-header"
            style={{
              background: "var(--negro)",
              color: "white",
              marginBottom: "20px",
            }}
          >
            <h2>¿GUARDAR RESULTADO?</h2>
            <Link
              to="/register"
              className="home-hero-btn"
              style={{
                marginTop: "20px",
                background: "var(--verde-lima)",
                color: "var(--negro)",
              }}
            >
              REGISTRARSE
            </Link>
          </div>
        )}

        <ResultCard
          carbon={resultado.carbonFootprint}
          water={resultado.waterFootprint}
          category={resultado.category}
        />

        {stats && stats.totalTests >= 2 && (
          <div className="comparison-infographic">
            <h3 className="info-title">TU IMPACTO VS COMUNIDAD</h3>
            <div className="charts-grid">
              <ComparisonBarChart
                title="HUELLA DE CARBONO"
                userValue={resultado.carbonFootprint}
                avgValue={stats.avgCarbon}
                unit="t CO₂"
                maxValue={
                  Math.max(resultado.carbonFootprint, stats.avgCarbon) * 1.3
                }
                color="var(--verde)"
                equivalence={getCarbonEquivalence(resultado.carbonFootprint)}
                feedback={getFeedbackMessage(
                  resultado.carbonFootprint,
                  stats.avgCarbon,
                  "carbon",
                )}
              />
              <ComparisonBarChart
                title="HUELLA DE AGUA"
                userValue={resultado.waterFootprint}
                avgValue={stats.avgWater}
                unit="L"
                maxValue={
                  Math.max(resultado.waterFootprint, stats.avgWater) * 1.3
                }
                color="#4a7aaa"
                equivalence={getWaterEquivalence(resultado.waterFootprint)}
                feedback={getFeedbackMessage(
                  resultado.waterFootprint,
                  stats.avgWater,
                  "water",
                )}
              />
            </div>
            <p className="stats-footer">
              Basado en {stats.totalTests} análisis realizados.
            </p>
          </div>
        )}

        <div className="results-actions">
          <button
            className="results-btn-primary"
            onClick={() => navigate("/test")}
          >
            REPETIR TEST
          </button>
          {!esPreview && (
            <Link to="/history" className="results-btn-secondary">
              HISTORIAL
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;
