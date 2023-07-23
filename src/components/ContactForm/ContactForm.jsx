import 'react-phone-number-input/style.css';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addContact, editContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import { closeAddContact } from '../../redux/menu/menuSlice';
import {
  selectEditID,
  selectSingleEditContact,
  selectCountryCode,
} from '../../redux/contacts/selectors';
import {
  clearEditID,
  setCountryCode,
  clearCountryCode,
} from '../../redux/contacts/contactsSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const editID = useSelector(selectEditID);
  const singleEditContact = useSelector(selectSingleEditContact);
  const countryCode = useSelector(selectCountryCode);

  const phoneInputRef = useRef(null);

  //funkcja tworzy kontakt i modyfikuje state dodajac do niego nowy kontakt
  const handleFormSubmit = event => {
    event.preventDefault();

    //Tworzy nowy obiekt - kontakt na podstawie danych z inputów
    const contact = {
      name: event.target.elements.name.value,
      number: phoneInputRef.current?.value || '',
    };

    // Walidacja - sprawdza czy kontakt jest już dodany (case insensitive)
    if (
      contacts.some(
        person => person.name.toLowerCase() === contact.name.toLowerCase()
      ) &&
      !editID
    ) {
      return alert(`${contact.name} already in contacts`);
    }
    if (editID) {
      console.log(`this is editID`, editID);
      console.log(`this is contact`, contact);
      dispatch(editContact({ id: editID, contact: contact }));
      dispatch(closeAddContact());
      dispatch(clearEditID());
      dispatch(clearCountryCode());
      return;
    }

    dispatch(addContact(contact));
    dispatch(closeAddContact());
    event.target.reset();
  };

  const handleCountryChange = country => {
    if (country) {
      dispatch(setCountryCode(getCountryCallingCode(country)));
    }
  };

  return (
    <div className="z-10 overflow-hidden absolute overscroll-none  top-0 right-0 h-screen w-screen bg-slate-700 bg-opacity-40">
      <form
        onSubmit={handleFormSubmit}
        className="z-10 authorization-form absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-400 rounded-lg pb-6 pt-12 px-8 shadow-xl shadow-slate-800 outline outline-2 outline-zinc-500 md:w-1/5"
      >
        <div
          onClick={() => {
            dispatch(closeAddContact());
            dispatch(clearEditID());
            dispatch(clearCountryCode());
          }}
          className="absolute top-2 right-2 text-2xl hover:cursor-pointer"
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
            defaultValue={editID ? singleEditContact.name : ''}
            required
          />
        </label>
        <label>
          <PhoneInput
            ref={phoneInputRef}
            className=""
            type="tel"
            name="number"
            placeholder="Contact number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={
              editID
                ? singleEditContact.number
                : countryCode
                ? `+${countryCode}`
                : `+48`
            }
            defaultCountry="PL"
            onChange={() => {}}
            onCountryChange={handleCountryChange}
            required
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
    </div>
  );
};
