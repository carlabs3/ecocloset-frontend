function QuestionCard({ pregunta, subtitulo, opciones, onRespuesta }) {
  return (
    <div>
      <h2 className="test-question">{pregunta}</h2>
      <p className="test-subtitle">{subtitulo}</p>
      <div className="test-options">
        {opciones.map((opcion) => (
          <button
            key={opcion.value}
            className="test-option"
            onClick={() => onRespuesta(opcion.value)}
          >
            <span className="test-option-text">{opcion.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
