export const setLocalStorage = (key, data) => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem(key, jsonData);
};

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
};
