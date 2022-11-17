import { useState } from 'react';
import css from './Auth.module.css';
import { register } from 'redux/operations/operations';
import { useDispatch } from 'react-redux';
import { Paper, TextField, Button } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const submitForm = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Paper elevation={3} className={css.container} >
    <h2>Registration</h2>
    <form onSubmit={submitForm} className={css.authForm}>
    <TextField
        onChange={e => setName(e.target.value)}
        helperText='name'
        variant="outlined"
        type="text"
        name="name"
        value={name}
        required
      />
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
        Register
      </Button>
    </form>
    </Paper>
  );
};
export default Register;
