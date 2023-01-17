import axios from 'axios';

const URL = 'https://http.cat/';

export const catFetch = async (code) => {
  const response = await axios.get(
    `${URL}/${code}`,
  );

  return response;
};
