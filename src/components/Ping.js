import React, { useState, useEffect } from 'react';

function Ping() {
  const [pingResponse, setPingResponse] = useState("");

  useEffect(() => {
    // Hacemos la petición GET a la API de Ping
    fetch("https://candidates-exam.herokuapp.com/api/v1/ping")
      .then((response) => response.json())
      .then((data) => {
        setPingResponse(data.respuesta); // Mostramos la respuesta
      })
      .catch((error) => {
        console.error("Error al hacer el ping:", error);
        setPingResponse("Error al hacer el ping");
      });
  }, []);

  return (
    <div>
      <h2>Ping a la API</h2>
      <p>Respuesta:</p>
      <pre>{pingResponse}</pre>
    </div>
  );
}

export default Ping;
