import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Hook para redirigir

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Por favor, complete todos los campos.");
      return;
    }

    // Hacer la solicitud de login
    fetch("https://candidates-exam.herokuapp.com/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.tipo) {
          setMessage("Login exitoso");
          localStorage.setItem("token", data.token);  // Guardar token en localStorage
          localStorage.setItem("url", data.url);  // Guardar la URL para subir CV
          navigate("/profile");  // Redirigir al perfil
        } else {
          setMessage("Login fallido: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error en el login:", error);
        setMessage("Error en el login.");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
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
        <button type="submit" className="btn btn-primary w-100">
          <i className="fas fa-sign-in-alt"></i> Login
        </button>
      </form>

      <p className="text-center mt-3">{message}</p>

      <div className="text-center">
        <p>¿No tienes cuenta?</p>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate("/register")}
        >
          <i className="fas fa-user-plus"></i> Registrarse
        </button>
      </div>
    </div>
  );
}

export default Login;
