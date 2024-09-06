import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No se encontró un token. Inicia sesión primero.");
      return;
    }

    // Solicitud para obtener el perfil
    axios
      .get("https://candidates-exam.herokuapp.com/api/v1/usuarios/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        setError("Error al obtener el perfil.");
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Limpia los datos de localStorage
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Perfil del Usuario</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {profileData ? (
            <div>
              <p className="card-text">
                <strong>Nombre:</strong> {profileData.nombre}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {profileData.email}
              </p>
              <div className="d-flex justify-content-between mt-4">
                <button
                  onClick={() => navigate("/upload-cv")}
                  className="btn btn-primary"
                >
                  <i className="fas fa-upload me-2"></i> Subir CV
                </button>
                <button
                  onClick={() => navigate("/show-cv")}
                  className="btn btn-info"
                >
                  <i className="fas fa-file-alt me-2"></i> Mostrar CV
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger"
                >
                  <i className="fas fa-sign-out-alt me-2"></i> Cerrar sesión
                </button>
              </div>

            </div>
          ) : (
            <div className="text-center">
              <p className="mb-3">Cargando el perfil...</p>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
