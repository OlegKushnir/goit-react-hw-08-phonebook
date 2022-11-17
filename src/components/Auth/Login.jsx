import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/operations/operations';
import { Paper, TextField, Button } from '@mui/material';

import css from './Auth.module.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const submitForm = e => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
      <Paper elevation={3} className={css.container} >
      <h2>Login</h2>
      <form onSubmit={submitForm} className={css.authForm}>
        <TextField
          onChange={e => setEmail(e.target.value)}
          helperText='email'
          variant="outlined"
          type="email"
          name="email"
          value={email}
          required
        />
        <TextField
         onChange={e => setPassword(e.target.value)}
          helperText='password'
          variant="outlined"
          type="password"
          name="password"
          value={password}
          required
        />
        <Button variant="contained" type="submit" className={css.authBtn}>
          Login
        </Button>
      </form>
      </Paper>
  );
};
export default Login;
