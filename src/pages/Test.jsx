import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResult } from "../services/api";

const preguntas = [
  {
    id: "wardrobeSize",
    pregunta: "¿Cuántas prendas tienes aproximadamente?",
    subtitulo: "Sin contar ropa interior ni calcetines",
    opciones: [
      { label: "Menos de 40 prendas", value: "menos40" },
      { label: "Entre 40 y 80 prendas", value: "40-80" },
      { label: "Entre 81 y 150 prendas", value: "81-150" },
      { label: "Más de 150 prendas", value: "mas150" },
    ],
  },
  {
    id: "fiberType",
    pregunta: "¿Qué tipo de fibras predominan en tu armario?",
    subtitulo: "Piensa en la mayoría de tu ropa",
    opciones: [
      { label: "Mayoría algodón", value: "algodon" },
      { label: "Mayoría sintética (poliéster, licra...)", value: "sintetica" },
      { label: "Mayoría vaqueros o mezclilla", value: "vaqueros" },
      { label: "Mayoría lana o abrigos", value: "lana" },
      { label: "Tejidos orgánicos o reciclados", value: "organica" },
    ],
  },
  {
    id: "newClothesPerYear",
    pregunta: "¿Cuántas prendas nuevas compras al año?",
    subtitulo: "Cuenta todas las compras incluyendo rebajas",
    opciones: [
      { label: "Menos de 5 prendas", value: "menos5" },
      { label: "Entre 5 y 10 prendas", value: "5-10" },
      { label: "Entre 11 y 20 prendas", value: "11-20" },
      { label: "Más de 20 prendas", value: "mas20" },
    ],
  },
  {
    id: "secondHand",
    pregunta: "¿Compras o intercambias ropa de segunda mano?",
    subtitulo: "Incluye apps como Vinted, Wallapop o mercadillos",
    opciones: [
      { label: "Frecuentemente", value: "frecuentemente" },
      { label: "Ocasionalmente", value: "ocasionalmente" },
      { label: "Nunca", value: "nunca" },
    ],
  },
  {
    id: "sustainableFabrics",
    pregunta: "¿Te fijas en si los tejidos son sostenibles?",
    subtitulo: "Orgánicos, reciclados o con certificaciones",
    opciones: [
      { label: "Siempre lo compruebo", value: "siempre" },
      { label: "A veces me fijo", value: "aveces" },
      { label: "Nunca lo miro", value: "nunca" },
    ],
  },
  {
    id: "clothingDuration",
    pregunta: "¿Cuántos años sueles mantener una prenda?",
    subtitulo: "Antes de tirarla o sustituirla",
    opciones: [
      { label: "Más de 6 años", value: "mas6" },
      { label: "Entre 4 y 6 años", value: "4-6" },
      { label: "Entre 1 y 3 años", value: "1-3" },
      { label: "Menos de 1 año", value: "menos1" },
    ],
  },
  {
    id: "washFrequency",
    pregunta: "¿Con qué frecuencia lavas la ropa?",
    subtitulo: "Tu hábito habitual de lavado",
    opciones: [
      { label: "Solo cuando es necesario", value: "necesario" },
      { label: "Después de pocos usos", value: "pocousos" },
      { label: "Siempre tras un único uso", value: "siempre" },
    ],
  },
  {
    id: "clothingDestination",
    pregunta: "¿Qué haces con la ropa que dejas de usar?",
    subtitulo: "Tu opción más habitual",
    opciones: [
      { label: "La reparo o reutilizo", value: "reparar" },
      { label: "La dono o vendo", value: "donar" },
      { label: "La tiro a la basura", value: "basura" },
    ],
  },
  {
    id: "recycling",
    pregunta: "¿Llevas ropa a contenedores de reciclaje textil?",
    subtitulo: "Puntos limpios, contenedores de ropa usada...",
    opciones: [
      { label: "Siempre", value: "siempre" },
      { label: "A veces", value: "aveces" },
      { label: "Nunca", value: "nunca" },
    ],
  },
];

function Test() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const preguntaActual = preguntas[paso];
  const progreso = (paso / preguntas.length) * 100;

  const handleRespuesta = async (value) => {
    const nuevasRespuestas = { ...respuestas, [preguntaActual.id]: value };
    setRespuestas(nuevasRespuestas);

    if (paso < preguntas.length - 1) {
      setPaso(paso + 1);
    } else {
      setLoading(true);
      setError("");
      try {
        const res = await createResult({ answers: nuevasRespuestas });
        navigate(`/results/${res.data._id}`);
      } catch (err) {
        setError("Error al guardar el resultado. Inténtalo de nuevo.");
        setLoading(false);
      }
    }
  };

  const handleAtras = () => {
    if (paso > 0) setPaso(paso - 1);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          background: "var(--crema)",
        }}
      >
        <div style={{ fontSize: "32px" }}>🌿</div>
        <p style={{ fontSize: "18px", fontWeight: "500" }}>
          Calculando tu huella...
        </p>
        <p style={{ color: "var(--texto-muted)", fontSize: "14px" }}>
          Analizando tus hábitos de consumo
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "90vh",
        background: "var(--crema)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "560px" }}>
        {/* Barra de progreso */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "var(--verde)",
                letterSpacing: "0.1em",
              }}
            >
              PREGUNTA {paso + 1} DE {preguntas.length}
            </span>
            <span style={{ fontSize: "12px", color: "var(--texto-muted)" }}>
              {Math.round(progreso)}%
            </span>
          </div>
          <div
            style={{
              height: "3px",
              background: "var(--borde)",
              borderRadius: "2px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progreso}%`,
                background: "var(--verde)",
                borderRadius: "2px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Pregunta */}
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "500",
            marginBottom: "8px",
            lineHeight: "1.3",
          }}
        >
          {preguntaActual.pregunta}
        </h2>
        <p
          style={{
            color: "var(--texto-muted)",
            fontSize: "14px",
            marginBottom: "32px",
          }}
        >
          {preguntaActual.subtitulo}
        </p>

        {/* Opciones */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {preguntaActual.opciones.map((opcion) => (
            <button
              key={opcion.value}
              onClick={() => handleRespuesta(opcion.value)}
              style={{
                background: "#fff",
                border: "0.5px solid var(--borde)",
                borderRadius: "12px",
                padding: "18px 20px",
                fontSize: "15px",
                textAlign: "left",
                color: "var(--negro)",
                transition: "all 0.15s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "var(--verde)";
                e.target.style.background = "var(--verde-claro)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "var(--borde)";
                e.target.style.background = "#fff";
              }}
            >
              {opcion.label}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              marginTop: "16px",
              background: "#fff0f0",
              border: "0.5px solid #ffcccc",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "14px",
              color: "#cc0000",
            }}
          >
            {error}
          </div>
        )}

        {/* Botón atrás */}
        {paso > 0 && (
          <button
            onClick={handleAtras}
            style={{
              marginTop: "24px",
              background: "none",
              border: "none",
              color: "var(--texto-muted)",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            ← Pregunta anterior
          </button>
        )}
      </div>
    </div>
  );
}

export default Test;
