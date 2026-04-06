import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="home-hero">
        <p className="home-hero-tag">MODA CONSCIENTE *</p>
        <h1 className="home-hero-title">
          Tu ropa
          <br />
          deja huella
        </h1>
        <p className="home-hero-subtitle">
          Descubre el impacto real de tu armario en el planeta en menos de 3
          minutos.
        </p>
        <Link to="/test" className="home-hero-btn">
          Calcular mi huella
        </Link>
      </div>

      <div className="home-stats">
        <div className="home-stat">
          <p className="home-stat-number">20%</p>
          <p className="home-stat-text">
            Del agua mundial se ve afectada por la industria textil.
          </p>
        </div>
        <div className="home-stat">
          <p className="home-stat-number">2.5K</p>
          <p className="home-stat-text">
            Litros de agua para fabricar una sola camiseta.
          </p>
        </div>
        <div className="home-stat">
          <p className="home-stat-number">10%</p>
          <p className="home-stat-text">
            De las emisiones globales provienen de la moda.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
