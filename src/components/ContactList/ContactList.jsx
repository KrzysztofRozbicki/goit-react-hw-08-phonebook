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
    <ul className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {contacts.map(({ id, name, number }) => (
        <li
          key={id}
          className="shadow-md shadow-slate-400 py-3 px-3 sm:py-4 sm:px-6 bg-slate-200 rounded-md font-semibold flex flex-col items-start gap-1"
        >
          <div className="grid-container">
            <p className=""> Name: </p>
            <p className="capitalize"> {name} </p>
            <p className="">Tel: </p>
            <p className="italic"> {number} </p>
            <button
              className="shadow-md shadow-rose-400 flex justify-center gap-2 w-24 items-center bg-rose-700 py-2 px-2 rounded-lg text-neutral-200 hover:bg-rose-400 hover:text-neutral-900 hover:shadow-rose-700"
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              <ion-icon name="trash-outline"></ion-icon>
              Delete
            </button>

            <button
              className="shadow-md shadow-amber-400 flex justify-center gap-2 w-24 items-center bg-amber-600 py-2 px-2 rounded-lg text-neutral-200 hover:bg-amber-400 hover:text-neutral-900 hover:shadow-amber-600"
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
      <li
        key="addContact"
        className="text-slate-200 text-5xl shadow-md shadow-teal-700 border-2 border-stone-600 py-8 px-6 bg-teal-700 rounded-md font-semibold flex flex-col items-center justify-center gap-1 hover:cursor-pointer hover:bg-teal-900 hover:border-slate-200 hover:text-white"
        onClick={() => dispatch(openAddContact())}
      >
        <ion-icon name="add-outline"></ion-icon>
      </li>
    </ul>
  );
};
