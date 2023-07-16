import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import { selectFilteredContacts } from '../../redux/selectors';

import css from './contactList.module.css';

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectFilteredContacts);

  //Renderowanie listy kontaktów na podstawie przefiltrowanej tablicy
  return (
    <ul className={css.contacts}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.contacts__item}>
          <p className={css.contacts__name}> {name} </p>
          <p className={css.contacts__number}>{number} </p>

          <button
            className={css.contacts__button}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete Contact
          </button>
        </li>
      ))}
    </ul>
  );
};
