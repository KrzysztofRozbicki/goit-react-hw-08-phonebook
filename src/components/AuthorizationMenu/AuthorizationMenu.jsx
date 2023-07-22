import { NavLink } from 'react-router-dom';

export const AuthorizationMenu = () => {
  return (
    <>
      <NavLink to="/login" className="navigation-link">
        <ion-icon name="log-in-outline"></ion-icon>
        Login
      </NavLink>
      <NavLink to="/register" className="navigation-link">
        <ion-icon name="reader-outline"></ion-icon>
        Register
      </NavLink>
    </>
  );
};
