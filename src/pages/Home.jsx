import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div>
      <div className="home-hero">
        <p className="home-hero-tag">MODA CONSCIENTE</p>
        <h1 className="home-hero-title">
          ¿Cuánto pesa tu armario en el planeta?
        </h1>
        <p className="home-hero-subtitle">
          Descubre tu huella de carbono y agua en menos de 3 minutos.
        </p>
        <Link to="/test" className="home-hero-btn">
          Calcular mi huella
        </Link>
      </div>

      <div className="home-stats">
        {[
          {
            numero: "30.000L",
            texto: "de agua para fabricar un par de vaqueros",
          },
          { numero: "5 kg", texto: "de CO₂ por cada prenda nueva de media" },
          { numero: "92M t", texto: "de residuos textiles al año en el mundo" },
        ].map((stat, i) => (
          <div key={i} className="home-stat">
            <p className="home-stat-number">{stat.numero}</p>
            <p className="home-stat-text">{stat.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
