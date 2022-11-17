import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserName } from 'redux/store';
import { logOut } from 'redux/operations/operations';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserName);
  return (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <span className={css.link}>{user}</span>
        <NavLink to="contacts" className={css.link}>
          <Button color="inherit">Contacts</Button>
        </NavLink>
      </Typography>

      <Button
        color="inherit"
        type="button"
        onClick={() => dispatch(logOut(user))}
      >
        Logout
      </Button>
    </>
  );
};
