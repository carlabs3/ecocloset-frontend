function ResultCard({ carbon, water, category }) {
  const categoriaInfo = {
    bajo: {
      emoji: "🌿",
      titulo: "Huella baja",
      color: "#7d9e7a",
      fondo: "#f0f5ee",
      descripcion:
        "Ropa duradera y consumo consciente. Eres un modelo de sostenibilidad.",
    },
    medio: {
      emoji: "🍃",
      titulo: "Huella media",
      color: "#5a8a57",
      fondo: "#e8f2e6",
      descripcion:
        "Buen equilibrio. Alargar la vida útil o usar más segunda mano reduciría aún más tu impacto.",
    },
    "medio-alto": {
      emoji: "🌍",
      titulo: "Huella media-alta",
      color: "#b07a30",
      fondo: "#f5ede0",
      descripcion: "Hay margen de mejora en frecuencia de compra y lavado.",
    },
    alto: {
      emoji: "🔥",
      titulo: "Huella alta",
      color: "#cc4444",
      fondo: "#fff0f0",
      descripcion:
        "No es cuestión de culpa: conocerlo permite tomar decisiones informadas.",
    },
  };

  const info = categoriaInfo[category] || categoriaInfo["medio"];

  return (
    <div>
      <div
        className="results-header"
        style={{ background: info.fondo, border: `0.5px solid ${info.color}` }}
      >
        <p className="results-emoji">{info.emoji}</p>
        <p className="results-tag" style={{ color: info.color }}>
          TU HUELLA
        </p>
        <h1 className="results-title">{info.titulo}</h1>
        <p className="results-description">{info.descripcion}</p>
      </div>

      <div className="results-metrics">
        <div className="results-metric">
          <p className="results-metric-label">CO₂ EQUIVALENTE</p>
          <p className="results-metric-value" style={{ color: "var(--negro)" }}>
            {carbon}t
          </p>
          <p className="results-metric-unit">toneladas / año</p>
        </div>
        <div className="results-metric">
          <p className="results-metric-label">HUELLA DE AGUA</p>
          <p className="results-metric-value" style={{ color: "#4a7aaa" }}>
            {(water / 1000).toFixed(0)}K
          </p>
          <p className="results-metric-unit">litros / año</p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
