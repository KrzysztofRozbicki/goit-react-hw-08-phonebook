import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from './operations';

const initialState = {
  contacts: [],
  countryCode: null,
  editID: null,
  isLoading: false,
  error: null,
  sorting: null,
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setEditID: (state, action) => {
      state.editID = action.payload;
    },
    clearEditID: state => {
      state.editID = null;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    clearCountryCode: state => {
      state.countryCode = null;
    },
    toggleSort: state => {
      switch (state.sorting) {
        case 'ascending':
          state.sorting = 'descending';
          break;
        case 'descending':
          state.sorting = 'ascending';
          break;
        case null:
          state.sorting = 'ascending';
          break;
        default:
          state.sorting = null;
      }
    },
  },
  extraReducers: builder => {
    // Fetch contacts from database
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      handleFulfilled(state);
      state.contacts = action.payload;
    });

    // Add contacts to database
    builder.addCase(addContact.fulfilled, (state, action) => {
      handleFulfilled(state);
      state.contacts.push(action.payload);
    });

    //Delete contacts from database
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      handleFulfilled(state);
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload.id
      );
      state.contacts.splice(index, 1);
    });
    //Edit contact in database
    builder.addCase(editContact.fulfilled, (state, action) => {
      handleFulfilled(state);
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload.id
      );
      state.contacts[index] = action.payload;
    });

    //Add all for pending and rejected
    builder.addMatcher(
      isAnyOf(
        fetchContacts.pending,
        addContact.pending,
        deleteContact.pending,
        editContact.pending
      )
    ),
      state => {
        state.isLoading = true;
      };
    builder.addMatcher(
      isAnyOf(
        fetchContacts.rejected,
        addContact.rejected,
        deleteContact.rejected,
        editContact.rejected
      )
    ),
      (state, action) => {
        handleRejected(state, action);
      };
  },
});

export const {
  setEditID,
  clearEditID,
  setCountryCode,
  clearCountryCode,
  toggleSort,
} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
