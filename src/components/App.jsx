import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Contacts } from '../pages/Contacts';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ContactForm } from './ContactForm/ContactForm';

import { Navigation } from './Navigation';
import { refreshUser } from '../redux/authorization/operations';
import { RestrictedRoute, PrivateRoute } from './Routes';
import { closeMenu } from '../redux/menu/menuSlice';
import { selectAddContact } from '../redux/menu/selectors';

const App = () => {
  const dispatch = useDispatch();
  const navigationRef = useRef(null);

  useEffect(() => {
    dispatch(refreshUser());

    const handleOutsideClick = e => {
      if (navigationRef.current && !navigationRef.current.contains(e.target)) {
        // Call your function here
        dispatch(closeMenu());
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dispatch]);

  const isAddContactOpen = useSelector(selectAddContact);

  return (
    <>
      {isAddContactOpen && <ContactForm />}
      <header className="bg-slate-200" ref={navigationRef}>
        <Navigation />
      </header>
      <main className="container mx-auto px-4 py-4 h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
          />
        </Routes>
      </main>
      <footer className="w-full z-[-1] text-sm relative text-center left-0 bottom-0  px-4 py-4 ">
        @Copyright Krzysztof Rozbicki for GoIT 07/2023
      </footer>
    </>
  );
};

export default App;
