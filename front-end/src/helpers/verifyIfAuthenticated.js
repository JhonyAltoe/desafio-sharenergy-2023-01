import { isAuthFetch } from '../apis/sharenergy-api';
import { getLocalStorage } from './localStorageHelpers';

export const verifyIfAuthenticated = async (navigate) => {
  const token = getLocalStorage('auth');
  if (!token) navigate('/login');
  const isAuth = await isAuthFetch(token);
  if (isAuth === false) navigate('/login');
};
