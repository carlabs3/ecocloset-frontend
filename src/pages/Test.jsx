import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

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
    id: "washTemp",
    pregunta: "¿A qué temperatura lavas la ropa?",
    subtitulo: "El agua fría ahorra hasta un 10% de energía",
    opciones: [
      { label: "Siempre en frío (30°C o menos)", value: "siempre" },
      { label: "A veces en frío", value: "aveces" },
      { label: "Siempre en caliente", value: "nunca" },
    ],
  },
  {
    id: "dryer",
    pregunta: "¿Usas secadora?",
    subtitulo: "Tu hábito habitual de secado",
    opciones: [
      { label: "Nunca, siempre al aire", value: "nunca" },
      { label: "Ocasionalmente", value: "ocasionalmente" },
      { label: "Habitualmente", value: "habitualmente" },
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
  const { id } = useParams();

  // Si hay id → cargar respuestas previas
  useEffect(() => {
    if (id) {
      const fetchResultado = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/results/${id}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          const data = await response.json();
          if (response.ok) {
            setRespuestas(data.answers);
          }
        } catch (err) {
          console.error("Error cargando respuestas previas");
        }
      };
      fetchResultado();
    }
  }, [id]);

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
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Si hay id → PUT (actualizar), si no → POST (crear)
          const url = id
            ? `${import.meta.env.VITE_API_URL}/api/results/${id}`
            : `${import.meta.env.VITE_API_URL}/api/results`;
          const method = id ? "PUT" : "POST";

          const response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ answers: nuevasRespuestas }),
          });
          const data = await response.json();
          if (!response.ok) {
            setError("Error al guardar el resultado.");
            setLoading(false);
            return;
          }
          navigate(`/results/${data._id}`);
        } catch (err) {
          setError("Error de conexión con el servidor");
          setLoading(false);
        }
      } else {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/results/calculate`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ answers: nuevasRespuestas }),
            },
          );
          const data = await response.json();
          navigate(
            `/results/preview?carbon=${data.carbonKg}&water=${data.waterLitres}&category=${data.category}`,
          );
        } catch (err) {
          setError("Error de conexión con el servidor");
          setLoading(false);
        }
      }
    }
  };

  const handleAtras = () => {
    if (paso > 0) setPaso(paso - 1);
  };

  if (loading) {
    return (
      <div className="test-loading">
        <p className="test-loading-emoji">🌿</p>
        <p className="test-loading-title">
          {id ? "Actualizando tu huella..." : "Calculando tu huella..."}
        </p>
        <p className="test-loading-subtitle">
          Analizando tus hábitos de consumo
        </p>
      </div>
    );
  }

  return (
    <div className="test-page">
      <div className="test-container">
        <div className="test-progress-header">
          <span className="test-progress-tag">
            PREGUNTA {paso + 1} DE {preguntas.length}
          </span>
          <span className="test-progress-percent">{Math.round(progreso)}%</span>
        </div>
        <div className="test-progress-bar">
          <div
            className="test-progress-fill"
            style={{ width: `${progreso}%` }}
          />
        </div>

        <QuestionCard
          pregunta={preguntaActual.pregunta}
          subtitulo={preguntaActual.subtitulo}
          opciones={preguntaActual.opciones}
          onRespuesta={handleRespuesta}
        />

        {error && (
          <div className="error-box" style={{ marginTop: "16px" }}>
            {error}
          </div>
        )}

        {paso > 0 && (
          <button className="test-back-btn" onClick={handleAtras}>
            ← Pregunta anterior
          </button>
        )}
      </div>
    </div>
  );
}

export default Test;
