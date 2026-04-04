import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          background: "var(--negro)",
          color: "#fff",
          padding: "80px 24px",
          textAlign: "center",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <p
          style={{
            color: "var(--verde)",
            fontSize: "12px",
            letterSpacing: "0.15em",
          }}
        >
          MODA CONSCIENTE
        </p>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "500",
            lineHeight: "1.2",
            maxWidth: "600px",
          }}
        >
          ¿Cuánto pesa tu armario en el planeta?
        </h1>
        <p
          style={{
            color: "#888",
            fontSize: "16px",
            maxWidth: "400px",
            lineHeight: "1.7",
          }}
        >
          Descubre tu huella de carbono y agua en menos de 3 minutos. Sin
          registro previo.
        </p>
        <Link
          to={user ? "/test" : "/register"}
          style={{
            background: "var(--verde)",
            color: "#fff",
            padding: "14px 32px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "500",
            marginTop: "8px",
          }}
        >
          Calcular mi huella
        </Link>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--borde)",
          borderTop: "1px solid var(--borde)",
          borderBottom: "1px solid var(--borde)",
        }}
      >
        {[
          {
            numero: "30.000L",
            texto: "de agua para fabricar un par de vaqueros",
          },
          { numero: "5 kg", texto: "de CO₂ por cada prenda nueva de media" },
          { numero: "92M t", texto: "de residuos textiles al año en el mundo" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: "32px 24px",
              background: "var(--crema)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "28px",
                fontWeight: "500",
                color: "var(--negro)",
                marginBottom: "8px",
              }}
            >
              {stat.numero}
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "var(--texto-muted)",
                lineHeight: "1.5",
              }}
            >
              {stat.texto}
            </p>
          </div>
        ))}
      </div>

      {/* CTA final */}
      <div
        style={{
          padding: "64px 24px",
          textAlign: "center",
          background: "var(--verde-claro)",
        }}
      >
        <h2
          style={{ fontSize: "28px", fontWeight: "500", marginBottom: "16px" }}
        >
          Pequeñas decisiones, gran impacto
        </h2>
        <p
          style={{
            color: "var(--texto-muted)",
            marginBottom: "32px",
            maxWidth: "400px",
            margin: "0 auto 32px",
            lineHeight: "1.7",
          }}
        >
          Conocer tu huella es el primer paso para reducirla. El test tarda
          menos de 3 minutos.
        </p>
        <Link
          to={user ? "/test" : "/register"}
          style={{
            background: "var(--negro)",
            color: "#fff",
            padding: "14px 32px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          Empezar ahora
        </Link>
      </div>
    </div>
  );
}

export default Home;
