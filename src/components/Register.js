import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Hook para redirigir

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    // Hacer la solicitud de registro
    fetch("https://candidates-exam.herokuapp.com/api/v1/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((response) => {
        console.log("Raw response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Solo parsea a JSON si la respuesta fue exitosa
      })
      .then((data) => {
        console.log("Parsed response data:", data);
        if (data.tipo) {
          setMessage("Registro exitoso. Por favor, inicia sesión.");
          navigate("/login");
        } else {
          setMessage("Error en el registro: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        setMessage("Error en el registro.");
      });
    
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmar Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          <i className="fas fa-user-plus"></i> Registrarse
        </button>
      </form>

      <p className="text-center mt-3">{message}</p>
    </div>
  );
}

export default Register;
