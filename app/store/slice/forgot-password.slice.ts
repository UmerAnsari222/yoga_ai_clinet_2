import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  otp: null,
  hash: null,
  email: null,
};

export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setOtpAndHashForVerify: (state, action) => {
      const {otp, hash, email} = action.payload;
      state.otp = otp;
      state.hash = hash;
      state.email = email;
    },
  },
});

export const {setOtpAndHashForVerify} = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
