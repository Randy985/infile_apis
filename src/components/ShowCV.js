import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowCV = () => {
  const [cvUrl, setCvUrl] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://candidates-exam.herokuapp.com/api/v1/usuarios/mostrar_cv", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCvUrl(response.data.url);
      })
      .catch((error) => {
        setError("Error al obtener el CV.");
        console.error(error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2>Mostrar CV</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {cvUrl ? (
          <div>
            <iframe
              src={`https://docs.google.com/gview?url=${cvUrl}&embedded=true`}
              width="100%"
              height="600px"
              title="CV"
              frameBorder="0"
            />
          </div>
        ) : (
          <p>Cargando CV...</p>
        )}
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/profile")}>
          Regresar al Perfil
        </button>
      </div>
    </div>
  );
};

export default ShowCV;
