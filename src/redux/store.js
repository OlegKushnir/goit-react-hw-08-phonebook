import { configureStore, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import {
  fetchContacts,
  addContact,
  deleteContact,
  register,
  logIn,
  logOut,
  fetchCurrentUser
} from 'redux/operations/operations';

const filterSlice = createSlice({
  name: 'myFilter',
  initialState: '',
  reducers: {
    filterValue(state, action) {
      return action.payload;
    },
  },
});
export const { filterValue } = filterSlice.actions;

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const setPending = state => {
  state.isLoading = true;
  state.error = null;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [fetchContacts.pending]: setPending,
    [deleteContact.pending]: setPending,
    [addContact.pending]: setPending,
    [fetchContacts.rejected]: setError,
    [deleteContact.rejected]: setError,
    [addContact.rejected]: setError,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    [addContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = [...state.items, action.payload];
    },
    
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isFetchingCurrent: false
  },
  extraReducers: {
    [register.fulfilled](state,action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logIn.fulfilled](state,action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [fetchCurrentUser.pending](state) {
      state.isFetchingCurrent = true
    },
    [fetchCurrentUser.fulfilled](state,action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetchingCurrent = false
    },
    [fetchCurrentUser.rejected](state) {
      state.isFetchingCurrent = false
    },

  },
});

export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getUserName = state => state.auth.user.name;
export const getIsFetchingCurrent = state => state.auth.isFetchingCurrent;

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token']
}

const middleware = (getDefaultMiddleware) =>
getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});


export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig,authSlice.reducer) ,
    myContacts: tasksSlice.reducer,
    filterTask: filterSlice.reducer,
  },
  middleware,
});

export const persistor = persistStore(store);
