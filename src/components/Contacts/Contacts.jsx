import css from './Contacts.module.css';
import React from 'react';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { Filter } from '../Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { filterValue } from 'redux/store';
import { fetchContacts } from 'redux/operations/operations';
import { useEffect } from 'react';
import {Typography} from '@mui/material';


const Contacts = () => {
  const dispatch = useDispatch();
  const { isLoading, items } = useSelector(state => state.myContacts);
  const filter = useSelector(state => state.filterTask);
  const inputFilter = e => {
    dispatch(filterValue(e.target.value));
  };

  const filterContacts = () => {
    return items.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  useEffect(() => {
    dispatch(fetchContacts());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
        <span className={css.title}>Phonebook</span>
      </Typography>
      
      <ContactForm />
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
      <span className={css.title}>Contacts</span>
      </Typography>
      <Filter inputFilter={inputFilter} value={filter} />
      {isLoading && <h3>Loading...</h3>}
      {items && <ContactList filtered={filterContacts()} />}
    </>
  );
};

export default Contacts;
