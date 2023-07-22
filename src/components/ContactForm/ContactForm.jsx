import { useSelector, useDispatch } from 'react-redux';

import { addContact, editContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import { closeAddContact } from '../../redux/menu/menuSlice';
import { selectEditID } from '../../redux/contacts/selectors';
import { clearEditID } from '../../redux/contacts/contactsSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const editID = useSelector(selectEditID);

  //funkcja tworzy kontakt i modyfikuje state dodajac do niego nowy kontakt
  const handleFormSubmit = event => {
    event.preventDefault();

    //Tworzy nowy obiekt - kontakt na podstawie danych z inputów
    const contact = {
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    };

    // Walidacja - sprawdza czy kontakt jest już dodany (case insensitive)
    if (
      contacts.some(
        person => person.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      return alert(`${contact.name} already in contacts`);
    }
    if (editID) {
      dispatch(editContact(editID));
      dispatch(closeAddContact());
      dispatch(clearEditID());
      return;
    }

    dispatch(addContact(contact));
    dispatch(closeAddContact());
    event.target.reset();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="authorization-form absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-400 rounded-lg py-8 px-8"
    >
      <div
        onClick={() => dispatch(closeAddContact())}
        className="absolute top-2 right-2 text-xl hover:cursor-pointer"
      >
        <ion-icon name="close-outline"></ion-icon>
      </div>
      <label>
        <input
          className=""
          type="text"
          name="name"
          id=""
          placeholder="Contact name"
          pattern="^[a-zA-Z]+(([' \u2013][a-zA-Z])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <input
          className=""
          type="tel"
          name="number"
          placeholder="Contact number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
      </label>
      {editID ? (
        <button className="bg-amber-600" type="submit">
          Edit
        </button>
      ) : (
        <button className="" type="submit">
          Add Contact
        </button>
      )}
    </form>
  );
};
