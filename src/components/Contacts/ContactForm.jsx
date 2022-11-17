import css from './Contacts.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/operations/operations'; 
import { Paper, TextField, Button } from '@mui/material';


export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const submitForm = e => {
    e.preventDefault();
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <Paper elevation={3} className={css.container} >
      <form onSubmit={submitForm} className={css.contactForm}>
        <TextField
        className={css.contactInput}
         onChange={e => setName(e.target.value)}
          label='name'
          variant="standard"
          type="text"
          name="name"
          value={name}
          required
        />
        <TextField
        className={css.contactInput}
         onChange={e => setNumber(e.target.value)}
          label='number'
          variant="standard"
          type="tel"
          name="number"
          value={number}
          required
        />
        <Button variant="contained" type="submit" className={css.addBtn}>
        Add contact
        </Button>
      </form>
      </Paper>
  );
};
