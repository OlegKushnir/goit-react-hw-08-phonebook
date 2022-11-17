import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
export const AuthNav = () => {
  return (
    <>
      <NavLink to="register" className={css.link}>
        <Button color="inherit">Register</Button>
      </NavLink>
      <NavLink to="login" className={css.link}>
        <Button color="inherit">Login</Button>
      </NavLink>
    </>
  );
};

