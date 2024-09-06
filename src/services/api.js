const API_BASE_URL = 'https://candidates-exam.herokuapp.com/api/v1';

export const ping = async () => {
  const response = await fetch(`${API_BASE_URL}/ping`);
  return response.json();
};

export const register = async (nombre, email, password, password_confirmation) => {
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre,
      email,
      password,
      password_confirmation,
    }),
  });
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return response.json();
};

export const getProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const uploadCV = async (token, url, file) => {
  const formData = new FormData();
  formData.append('curriculum', file);

  const response = await fetch(`${API_BASE_URL}/usuarios/${url}/cargar_cv`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return response.json();
};

export const showCV = async (token) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/mostrar_cv`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
