import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  addContact: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: state => {
      state.isOpen = !state.isOpen;
    },
    closeMenu: state => {
      state.isOpen = false;
    },
    openAddContact: state => {
      state.addContact = true;
    },
    closeAddContact: state => {
      state.addContact = false;
    },
  },
});

export const { toggleMenu, closeMenu, openAddContact, closeAddContact } =
  menuSlice.actions;
export const menuReducer = menuSlice.reducer;
