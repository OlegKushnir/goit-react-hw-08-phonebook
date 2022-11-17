import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import css from './Contacts.module.css';

export const FilterContacts = ({ inputFilter, value }) => {
  return (
    <TextField
      className={css.filterInput}
      onChange={inputFilter}
      label="filter contacts"
      variant="standard"
      type="text"
      name="filter"
      value={value}
    />
  );
};

FilterContacts.propTypes = {
  inputFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
