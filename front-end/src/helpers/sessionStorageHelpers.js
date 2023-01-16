export const setSessionStorage = (key, data) => {
  const jsonData = JSON.stringify(data);
  sessionStorage.setItem(key, jsonData);
};

export const getSessionStorage = (key) => {
  const data = sessionStorage.getItem(key);
  return JSON.parse(data);
};
