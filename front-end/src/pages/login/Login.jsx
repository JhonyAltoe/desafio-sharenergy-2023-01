import { useState } from 'react';
import LoginField from '../../components/loginField/LoginField';
import { CustonContainer } from './styles/login-styles';
import { login } from '../../apis/sharenergy-api';
import { setLocalStorage } from '../../helpers/localStorageHelpers';

export default function Login() {
  const [formLogin, setformLogin] = useState({ email: '', password: '' });

  // useEffect(() => {
  //   login(email, password).then((result) => {
  //     console.log('>>>>>>', result);
  //   }).catch((error) => {
  //     console.log('catch >>>>>', error);
  //   });
  // }, []);

  const handlerLogin = async () => {
    const { email, password } = formLogin;
    const data = await login(email, password);
    setLocalStorage('auth', data.token);
  };

  const handlerForm = ({ target }) => {
    const { name, value } = target;
    setformLogin({ ...formLogin, [name]: value });
  };

  return (
    <CustonContainer>
      <LoginField handlerForm={handlerForm} formLogin={formLogin} handlerLogin={handlerLogin} />
    </CustonContainer>
  );
}
