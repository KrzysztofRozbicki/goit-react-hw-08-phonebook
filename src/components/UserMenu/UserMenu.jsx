import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/authorization/operations';
import { useAuthorization } from '../../hooks';
import { openAddContact } from '../../redux/menu/menuSlice';

import { NavLink } from 'react-router-dom';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuthorization();

  return (
    <>
      {/* TUTAJ ZMIENIĆ I DODAĆ OPCJE KONTA! */}
      <NavLink to="/contacts" className="navigation-link" end>
        <ion-icon name="person-circle-outline"></ion-icon>
        {user.name}
      </NavLink>

      <NavLink to="/contacts" className="navigation-link" end>
        <ion-icon name="people-outline"></ion-icon>
        Contacts
      </NavLink>

      <p
        className="navigation-link hover:cursor-pointer"
        onClick={() => dispatch(openAddContact())}
      >
        <ion-icon name="person-add-outline"></ion-icon>
        Add Contact
      </p>

      <button onClick={() => dispatch(logOut())} className="navigation-link">
        <ion-icon name="log-out-outline"></ion-icon>
        Logout
      </button>
    </>
  );
};
