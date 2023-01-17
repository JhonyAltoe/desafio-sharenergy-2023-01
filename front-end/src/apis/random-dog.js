import axios from 'axios';

const URL = 'https://random.dog/';

export const randomDogFetch = async () => {
  const response = await axios.get(
    `${URL}`,
  );

  return response;
};
