import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  name: null,
  expiration: null,
  isShortTermExpiration: false, // New field to indicate short-term expiration
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.expiration = action.payload.expiration;

      // Calculate time difference in milliseconds
      const timeDifference = action.payload.expiration - Date.now();
      // Set isShortTermExpiration flag based on the duration (e.g., 1 minute)
      state.isShortTermExpiration =
        timeDifference < 2 * 60 * 1000 ? true : false;
    },
    logoutSuccess(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.name = null;
      state.expiration = null;
      state.isShortTermExpiration = false; // Reset isShortTermExpiration when logging out
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
