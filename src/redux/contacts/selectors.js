import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.contacts;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectFilter = state => state.filter;
export const selectEditID = state => state.contacts.editID;
export const selectCountryCode = state => state.contacts.countryCode;
export const selectSorting = state => state.contacts.sorting;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter, selectSorting],
  (contacts, filterValue, sorting) => {
    const filteredArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    if (!sorting) {
      return filteredArray;
    }
    if (sorting === 'ascending') {
      return filteredArray.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sorting === 'descending') {
      return filteredArray.sort((a, b) => b.name.localeCompare(a.name));
    }
  }
);

export const selectSingleEditContact = createSelector(
  [selectContacts, selectEditID],
  (contacts, id) => {
    const contact = contacts.find(contact => contact.id === id);
    return contact;
  }
);
