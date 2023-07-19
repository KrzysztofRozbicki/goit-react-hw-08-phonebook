import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoading } from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';

import { ContactForm } from '../../components/ContactForm';
import { ContactList } from '../../components/ContactList';
import { Filter } from '../../components/Filter';

export const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <ContactForm />
      <h2>Contacts</h2>
      {isLoading ?? <div>Request in Progress...</div>}
      <Filter />
      <ContactList />
    </>
  );
};
