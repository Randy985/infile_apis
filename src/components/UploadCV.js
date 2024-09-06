import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para navegar al perfil

const UploadCV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Para regresar al perfil

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const url = localStorage.getItem("cvUrl");

    if (!file) {
      setError("Por favor selecciona un archivo PDF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("El archivo es demasiado grande. Debe ser menor a 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("curriculum", file);

    try {
      const response = await axios.post(
        `https://candidates-exam.herokuapp.com/api/v1/usuarios/${url}/cargar_cv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("CV subido exitosamente.");
    } catch (error) {
      setError("Error al subir el CV. Inténtalo de nuevo.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2>Subir CV</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <form onSubmit={handleUpload}>
          <div className="mb-3">
            <label className="form-label">Selecciona tu CV (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Subir CV
          </button>
        </form>

        <div className="d-flex justify-content-between mt-4">
  <button className="btn btn-secondary" onClick={() => navigate("/profile")}>
    Regresar al Perfil
  </button>
  <button className="btn btn-info" onClick={() => window.location.reload()}>
    Refrescar Página
  </button>
</div>

      </div>
    </div>
  );
};

export default UploadCV;
