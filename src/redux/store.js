import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contactsSlice';
import { filterReducer } from './contacts/filterSlice';
import { menuReducer } from './menu/menuSlice';
import { authorizationReducer } from './authorization/authorizationSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    authorization: authorizationReducer,
    menu: menuReducer,
  },
});

export default store;
