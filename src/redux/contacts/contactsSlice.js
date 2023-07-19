import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
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

    //Add all for pending and rejected
    builder.addMatcher(
      isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.rejected)
    ),
      state => {
        state.isLoading = true;
      };
    builder.addMatcher(
      isAnyOf(
        fetchContacts.rejected,
        addContact.rejected,
        deleteContact.rejected
      )
    ),
      (state, action) => {
        handleRejected(state, action);
      };
  },
});

export const contactsReducer = contactsSlice.reducer;
