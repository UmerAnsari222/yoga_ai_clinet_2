import {createSlice} from '@reduxjs/toolkit';
import {
  getToken,
  removeToken,
  storeToken,
} from '../services/async-storage.service';

const initialState = {
  user: null,
  token: '',
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {user, token} = action.payload;

      if (user == null || token == null || token == undefined || token == '') {
        return;
      }

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      storeToken(action.payload.token);
    },
    getUser: (state, action) => {
      return state;
    },
    setToken: (state, action) => {
      const {token} = action.payload;
      if (token == null || token == undefined || token == '') return;
      state.token = token;
      state.isAuthenticated = true;
      storeToken(action.payload.token);
    },
    setOnlyUser: (state, action) => {
      const {user} = action.payload;
      if (user == null) return;
      state.user = user;
    },
    logout: state => {
      state.token = '';
      state.isAuthenticated = false;
    },
  },
});

export const {setUser, logout, getUser, setToken, setOnlyUser} =
  authSlice.actions;
export default authSlice.reducer;
