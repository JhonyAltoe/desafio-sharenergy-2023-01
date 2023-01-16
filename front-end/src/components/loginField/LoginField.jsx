import PropTypes from 'prop-types';
import {
  Button, Checkbox, FormControlLabel, FormHelperText, Grid, TextField,
} from '@mui/material';
import { CustonPaper } from './styles/loginField-styles';

export default function LoginField({
  handlerForm, formLogin, handlerLogin, messageAlert,
}) {
  return (
    <CustonPaper elevation={10}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Projeto Sharenergy</h2>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="login-email"
            name="email"
            label="Email"
            variant="outlined"
            placeholder="Insira seu email"
            fullWidth
            onChange={handlerForm}
            value={formLogin.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="login-password"
            name="password"
            label="Senha"
            variant="outlined"
            placeholder="Insira sua senha"
            fullWidth
            onChange={handlerForm}
            value={formLogin.password}
          />
          <FormHelperText error>{messageAlert}</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="rememberMe" checked={handlerForm.rememberMe} onClick={handlerForm} />}
            label="Lembrar-me"
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={handlerLogin}>Login</Button>
        </Grid>
      </Grid>
    </CustonPaper>
  );
}

LoginField.propTypes = {
  handlerForm: PropTypes.func.isRequired,
  formLogin: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    rememberMe: PropTypes.bool,
  }).isRequired,
  handlerLogin: PropTypes.func.isRequired,
  messageAlert: PropTypes.string,
};
