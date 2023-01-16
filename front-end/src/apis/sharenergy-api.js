import axios from 'axios';

const URL = 'http://localhost:3333';

export const login = async (email, password) => {
  const response = await axios.post(
    `${URL}/user/login`,
    { email, password },
  );

  return response.data;
};

export const isAuthenticated = async (token) => {
  const response = await axios.get(
    `${URL}/auth/is-authenticated`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response.data.message;
};
