import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginField from '../../components/loginField/LoginField';
import { CustonContainer } from './styles/login-styles';
import { isAuthFetch, loginFetch } from '../../apis/sharenergy-api';
import { getLocalStorage, setLocalStorage } from '../../helpers/localStorageHelpers';
import { setSessionStorage } from '../../helpers/sessionStorageHelpers';

export default function Login() {
  const [formLogin, setFormLogin] = useState({ email: '', password: '', rememberMe: false });
  const [messageAlert, setMessageAlert] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const navigateIfAuthentidated = async () => {
      const token = getLocalStorage('auth');
      if (!token) return;
      const bool = await isAuthFetch(token);
      if (bool) {
        navigate('/lista-de-usuarios');
      }
    };
    navigateIfAuthentidated();
  }, []);

  const handlerLogin = async () => {
    setLocalStorage('rememberMe', formLogin.rememberMe);
    const { email, password } = formLogin;
    if (!email ?? !password) {
      setMessageAlert('Usuário ou senha não podem estar vazios');
      return;
    }

    try {
      const data = await loginFetch(email, password);
      if (formLogin.rememberMe) setLocalStorage('auth', data.token);
      else setSessionStorage('auth', data.token);
      navigate('/lista-de-usuarios');
    } catch (error) {
      setMessageAlert('Email ou senha inválidos');
    }
  };

  const handlerForm = (e) => {
    const { name, value, checked } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: name === 'rememberMe' ? checked : value,
    });
  };

  return (
    <CustonContainer>
      <LoginField
        handlerForm={handlerForm}
        formLogin={formLogin}
        handlerLogin={handlerLogin}
        messageAlert={messageAlert}
      />
    </CustonContainer>
  );
}
