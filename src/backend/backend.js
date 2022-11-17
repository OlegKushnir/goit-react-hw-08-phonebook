import axios from 'axios';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';
export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unSet(token) {
    axios.defaults.headers.common.Authorization = '';
  }
}

export async function fetchContactsAPI() {
  try {
    const result = await axios.get('contacts');
    const contacts = result.data;
    if (contacts.length > 0) {
      return contacts;
    }
  } catch (er) {
    console.log(er.message);
    throw new Error();
  }
}

export async function addContactAPI(contact) {
  try {
    const response = await axios.post('contacts', contact);
    return response.data;
  } catch (er) {
    console.log(er.message);
    throw new Error();
  }
}
export async function deleteContactAPI(id) {
  try {
 await axios({
      method: 'DELETE',
      url: `contacts/${id}`,
    });

  } catch (er) {
    console.log(er.message);
    throw new Error();
  }
}

export const registerAPI = async (credentials) => {
  try {
    const {data} =await axios.post('/users/signup', credentials);
    token.set(data.token);
    return data;
  } catch (er) {
    console.log(er.message);
    throw new Error();
  }
}

export const logInAPI = async (credentials) => {
  try {
    const {data} =await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (er) {
    console.log(er.message);
    throw new Error();
  }
}
export const logOutAPI = async (credentials) => {
  try {
    await axios.post('/users/logout', credentials);
    token.unSet();
  } catch (er) {
    console.log(er.message);
    throw new Error();
  }
}
export const refreshUser = async (_ ,{getState, rejectWithValue}) => {
  const state = getState();
  const persistedToken = state.auth.token;
  if (persistedToken === null) return rejectWithValue();
  token.set(persistedToken);
  try {
    const {data} = await axios.get('/users/current');
    return data;
  } catch (er) {
    console.log(er.message);
    throw new Error();
  }
}