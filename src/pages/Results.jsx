import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const categoriaInfo = {
  bajo: {
    emoji: "🌿",
    titulo: "Huella baja",
    descripcion:
      "Ropa duradera y consumo consciente. Eres un modelo de sostenibilidad.",
    color: "#7d9e7a",
    fondo: "#f0f5ee",
  },
  medio: {
    emoji: "🍃",
    titulo: "Huella media",
    descripcion:
      "Buen equilibrio. Alargar la vida útil o usar más segunda mano reduciría aún más tu impacto.",
    color: "#5a8a57",
    fondo: "#e8f2e6",
  },
  "medio-alto": {
    emoji: "🌍",
    titulo: "Huella media-alta",
    descripcion: "Hay margen de mejora en frecuencia de compra y lavado.",
    color: "#b07a30",
    fondo: "#f5ede0",
  },
  alto: {
    emoji: "🔥",
    titulo: "Huella alta",
    descripcion:
      "No es cuestión de culpa: conocerlo permite tomar decisiones informadas.",
    color: "#cc4444",
    fondo: "#fff0f0",
  },
};

function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
  }, [id]);

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
        <p style={{ color: "var(--texto-muted)" }}>Cargando resultado...</p>
      </div>
    );
  }

  if (error) {
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
        <p style={{ color: "#cc0000" }}>{error}</p>
      </div>
    );
  }

  const info = categoriaInfo[resultado.category] || categoriaInfo["medio"];

  return (
    <div
      style={{
        background: "var(--crema)",
        minHeight: "90vh",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <div
          style={{
            background: info.fondo,
            border: `0.5px solid ${info.color}`,
            borderRadius: "16px",
            padding: "32px",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <p style={{ fontSize: "48px", marginBottom: "12px" }}>{info.emoji}</p>
          <p
            style={{
              fontSize: "12px",
              color: info.color,
              letterSpacing: "0.1em",
              marginBottom: "8px",
            }}
          >
            TU HUELLA
          </p>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "500",
              marginBottom: "12px",
            }}
          >
            {info.titulo}
          </h1>
          <p
            style={{
              color: "var(--texto-muted)",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            {info.descripcion}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "0.5px solid var(--borde)",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "var(--texto-muted)",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              CO₂ EQUIVALENTE
            </p>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "500",
                color: "var(--negro)",
                marginBottom: "4px",
              }}
            >
              {resultado.carbonFootprint}t
            </p>
            <p style={{ fontSize: "12px", color: "var(--texto-muted)" }}>
              toneladas / año
            </p>
          </div>
          <div
            style={{
              background: "#fff",
              border: "0.5px solid var(--borde)",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "var(--texto-muted)",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              HUELLA DE AGUA
            </p>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "500",
                color: "#4a7aaa",
                marginBottom: "4px",
              }}
            >
              {(resultado.waterFootprint / 1000).toFixed(0)}K
            </p>
            <p style={{ fontSize: "12px", color: "var(--texto-muted)" }}>
              litros / año
            </p>
          </div>
        </div>

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
            Claves para mejorar
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
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
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "16px" }}>{consejo.icono}</span>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--texto-muted)",
                    lineHeight: "1.5",
                  }}
                >
                  {consejo.texto}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/test")}
            style={{
              flex: 1,
              background: "var(--negro)",
              color: "#fff",
              padding: "14px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Repetir test
          </button>
          <Link
            to="/history"
            style={{
              flex: 1,
              border: "0.5px solid var(--negro)",
              color: "var(--negro)",
              padding: "14px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Ver historial
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Results;
