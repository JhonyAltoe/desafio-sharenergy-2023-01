import axios from 'axios';

const URL = 'https://randomuser.me/api';

export const randomUserFetch = async (page) => {
  const response = await axios.get(
    `${URL}/?page=${page}&results=12&seed=abc&inc=picture,name,email,login,dob`,
  );

  return { data: response.data.results, page: response.data.info.page };
};
