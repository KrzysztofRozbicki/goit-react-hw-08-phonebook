import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.contacts;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectFilter = state => state.filter;
export const selectEditID = state => state.contacts.editID;
export const selectCountryCode = state => state.contacts.countryCode;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filterValue) => {
    const filteredArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    return filteredArray;
  }
);

export const selectSingleEditContact = createSelector(
  [selectContacts, selectEditID],
  (contacts, id) => {
    const contact = contacts.find(contact => contact.id === id);
    return contact;
  }
);
