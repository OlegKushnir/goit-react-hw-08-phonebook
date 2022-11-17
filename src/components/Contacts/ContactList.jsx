import PropTypes from 'prop-types';
import css from './Contacts.module.css';
import { deleteContact } from 'redux/operations/operations';
import { useDispatch } from 'react-redux';
import { IconButton, ListItem, List } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export const ContactList = ({ filtered }) => {
  const dispatch = useDispatch();
  return (
    <List>
      {filtered.map(({ id, name, number }) => (
        <ListItem key={id} className={css.text}>
        <PersonRoundedIcon fontSize="small" className={css.callIcon} />
        {name}: {number}
        <IconButton
          type="button"
          aria-label="delete"
          size="standart"
          onClick={() => dispatch(deleteContact(id))}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </ListItem>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  filtered: PropTypes.arrayOf(
    PropTypes.PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

