import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const postResponse = await axios.post('/contacts', contact);
      return postResponse.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const deleteResponse = await axios.delete(`/contacts/${id}`);
      return deleteResponse.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (id, thunkAPI) => {
    try {
      console.log(`this is id`, id);
      const editResponse = await axios.patch(`/contacts/${id}`);
      console.log(`this is reponse patch data`, editResponse.data);
      return editResponse.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
