import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const calcularLocal = (answers) => {
  let carbon = 0;
  let water = 0;

  if (answers.wardrobeSize === "menos40") {
    carbon = 200;
    water = 200000;
  } else if (answers.wardrobeSize === "40-80") {
    carbon = 400;
    water = 400000;
  } else if (answers.wardrobeSize === "81-150") {
    carbon = 700;
    water = 700000;
  } else if (answers.wardrobeSize === "mas150") {
    carbon = 1000;
    water = 1000000;
  }

  if (answers.fiberType === "algodon") {
    carbon *= 1.1;
    water *= 1.25;
  } else if (answers.fiberType === "sintetica") {
    carbon *= 1.2;
    water *= 0.8;
  } else if (answers.fiberType === "vaqueros") {
    carbon *= 1.3;
    water *= 1.4;
  } else if (answers.fiberType === "lana") {
    carbon *= 1.2;
    water *= 0.9;
  } else if (answers.fiberType === "organica") {
    carbon *= 0.85;
    water *= 0.85;
  }

  if (answers.newClothesPerYear === "menos5") {
    carbon *= 0.8;
    water *= 0.8;
  } else if (answers.newClothesPerYear === "5-10") {
    carbon *= 0.9;
    water *= 0.9;
  } else if (answers.newClothesPerYear === "mas20") {
    carbon *= 1.2;
    water *= 1.2;
  }

  if (answers.secondHand === "frecuentemente") {
    carbon *= 0.85;
    water *= 0.85;
  } else if (answers.secondHand === "ocasionalmente") {
    carbon *= 0.95;
    water *= 0.95;
  } else if (answers.secondHand === "nunca") {
    carbon *= 1.1;
    water *= 1.1;
  }

  if (answers.sustainableFabrics === "siempre") {
    carbon *= 0.85;
    water *= 0.85;
  } else if (answers.sustainableFabrics === "aveces") {
    carbon *= 0.95;
    water *= 0.95;
  }

  if (answers.clothingDuration === "mas6") {
    carbon *= 0.8;
    water *= 0.8;
  } else if (answers.clothingDuration === "4-6") {
    carbon *= 0.9;
    water *= 0.9;
  } else if (answers.clothingDuration === "menos1") {
    carbon *= 1.2;
    water *= 1.2;
  }

  if (answers.washFrequency === "pocousos") {
    water *= 1.05;
  } else if (answers.washFrequency === "siempre") {
    water *= 1.1;
  }

  if (answers.clothingDestination === "donar") {
    carbon *= 0.9;
    water *= 0.9;
  } else if (answers.clothingDestination === "basura") {
    carbon *= 1.1;
    water *= 1.1;
  }

  if (answers.recycling === "siempre") {
    carbon *= 0.95;
    water *= 0.95;
  } else if (answers.recycling === "nunca") {
    carbon *= 1.05;
    water *= 1.05;
  }

  const carbonTonnes = parseFloat((carbon / 1000).toFixed(3));
  const waterLitres = Math.round(water);

  let category;
  if (carbonTonnes < 0.4) category = "bajo";
  else if (carbonTonnes < 0.8) category = "medio";
  else if (carbonTonnes < 1.5) category = "medio-alto";
  else category = "alto";

  return { carbonTonnes, waterLitres, category };
};

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
      const token = localStorage.getItem("token");

      if (token) {
        // Usuario logueado → guarda en backend
        setLoading(true);
        setError("");
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/results`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ answers: nuevasRespuestas }),
            },
          );
          const data = await response.json();
          if (!response.ok) {
            setError("Error al guardar el resultado. Inténtalo de nuevo.");
            setLoading(false);
            return;
          }
          navigate(`/results/${data._id}`);
        } catch (err) {
          setError("Error de conexión con el servidor");
          setLoading(false);
        }
      } else {
        // Usuario no logueado → calcula en local y pasa datos por URL
        const resultado = calcularLocal(nuevasRespuestas);
        navigate(
          `/results/preview?carbon=${resultado.carbonTonnes}&water=${resultado.waterLitres}&category=${resultado.category}`,
        );
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
        <p className="test-loading-title">Calculando tu huella...</p>
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
