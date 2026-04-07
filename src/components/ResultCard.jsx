function ResultCard({ carbon, water, category }) {
  const categoriaInfo = {
    bajo: {
      emoji: "🌿",
      titulo: "Huella baja",
      descripcion:
        "Ropa duradera y consumo consciente. Eres un modelo de sostenibilidad.",
      color: "var(--verde-oscuro)",
      fondo: "var(--verde-lima)",
    },
    medio: {
      emoji: "🍃",
      titulo: "Huella media",
      descripcion:
        "Buen equilibrio. Alargar la vida útil o usar más segunda mano reduciría aún más tu impacto.",
      color: "var(--verde-oscuro)",
      fondo: "#e8f2e6",
    },
    alto: {
      emoji: "🌍",
      titulo: "Huella alta",
      descripcion: "Hay margen de mejora en frecuencia de compra y lavado.",
      color: "#b07a30",
      fondo: "#f5ede0",
    },
    "muy alto": {
      emoji: "🔥",
      titulo: "Huella muy alta",
      descripcion:
        "No es cuestión de culpa: conocerlo permite tomar decisiones informadas.",
      color: "#cc4444",
      fondo: "#fff0f0",
    },
  };

  const info = categoriaInfo[category] || categoriaInfo["medio"];

  return (
    <div>
      <div className="results-header" style={{ background: info.fondo }}>
        <p className="result-emoji">{info.emoji}</p>
        <p className="result-tag" style={{ color: info.color }}>
          TU HUELLA
        </p>
        <h1 className="results-title" style={{ color: info.color }}>
          {info.titulo}
        </h1>
        <p className="result-description">{info.descripcion}</p>
      </div>

      <div className="results-metrics">
        <div className="results-metric">
          <p className="results-metric-label">CO₂ EQUIVALENTE</p>
          <p className="results-metric-value">{carbon}</p>
          <p className="results-metric-unit">kg de CO₂ / año</p>
        </div>
        <div className="results-metric">
          <p className="results-metric-label">HUELLA DE AGUA</p>
          <p className="results-metric-value result-water-value">
            {water.toLocaleString("es-ES")}
          </p>
          <p className="results-metric-unit">litros de agua / año</p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
