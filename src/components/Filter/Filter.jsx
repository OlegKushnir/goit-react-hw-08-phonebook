import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

export const Filter = ({ inputFilter, value }) => {
  return (
    <TextField
      // className={css.contactInput}
      onChange={inputFilter}
      label="filter contacts"
      variant="standard"
      type="text"
      name="filter"
      value={value}
    />
  );
};

Filter.propTypes = {
  inputFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
