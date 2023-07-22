import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import { setEditID } from '../../redux/contacts/contactsSlice';
import { openAddContact } from '../../redux/menu/menuSlice';

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectFilteredContacts);

  //Renderowanie listy kontaktów na podstawie przefiltrowanej tablicy
  return (
    <ul className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {contacts.map(({ id, name, number, email }) => (
        <li
          key={id}
          className="py-4 px-6 bg-slate-200 rounded-md font-semibold flex flex-col items-start gap-1"
        >
          <p className=""> {name} </p>
          <p className="italic">{number} </p>
          <p className="italic font-normal">{email}</p>
          <div className="flex gap-4">
            <button
              className="flex justify-center gap-2 w-24 items-center bg-rose-700 py-2 px-2 rounded-lg text-neutral-200 hover:bg-rose-400 hover:text-neutral-900"
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              <ion-icon name="trash-outline"></ion-icon>
              Delete
            </button>

            <button
              className="flex justify-center gap-2 w-24 items-center bg-amber-600 py-2 px-2 rounded-lg text-neutral-200 hover:bg-amber-400 hover:text-neutral-900"
              type="button"
              onClick={() => {
                dispatch(setEditID(id));
                dispatch(openAddContact());
              }}
            >
              <ion-icon name="create-outline"></ion-icon>
              Edit
            </button>
          </div>
        </li>
      ))}
      {contacts.length === 0 && (
        <p className="text-xl text-red-800 py-4 font-bold">
          NO CONTACTS FOUND!
        </p>
      )}
    </ul>
  );
};
