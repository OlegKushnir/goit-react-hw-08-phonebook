import css from './Contacts.module.css';
import React from 'react';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { FilterContacts } from './FilterContacts';
import { useDispatch, useSelector } from 'react-redux';
import { filterValue } from 'redux/store';
import { fetchContacts } from 'redux/operations/operations';
import { useEffect } from 'react';
import { Typography, Skeleton, Box } from '@mui/material';

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
        <ContactForm />
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        <span className={css.title}>Contacts</span>
      </Typography>
      <FilterContacts inputFilter={inputFilter} value={filter} />
      {items &&  <ContactList filtered={filterContacts()} />  }
      {isLoading && (
        <Box sx={{ width: 300 }}>
          <Skeleton animation="wave" />
        </Box>
      )}
    
    </>
  );
};

export default Contacts;
