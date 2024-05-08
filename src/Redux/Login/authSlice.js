import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  name: null,
  expiration: null,
  expirationRefToken: null,
  isShortTermExpiration: false,
  isShortTermExpirationRefreshToken: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken; // Store refresh token
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.expiration = action.payload.expiration;
      state.expirationRefToken = action.payload.expirationRefreshToken;

      // Calculate time difference for access token expiration
      const timeDifference = action.payload.expiration - Date.now();
      // Set isShortTermExpiration flag based on the duration (e.g., 2 minutes)
      state.isShortTermExpiration = timeDifference < 2 * 60 * 1000;

      // Calculate time difference for refresh token expiration
      const timeDifferenceRefreshToken =
        action.payload.expirationRefreshToken - Date.now();
      // Set isShortTermExpirationRefreshToken flag based on the duration (e.g., 7 days)
      state.isShortTermExpirationRefreshToken =
        timeDifferenceRefreshToken < 10 * 60 * 1000;
    },

    logoutSuccess(state) {
      Object.assign(state, initialState);
    },

    updateAccessToken(state, action) {
      state.token = action.payload; // Update access token
    },
  },
});

export const { loginSuccess, logoutSuccess, updateAccessToken } =
  authSlice.actions;

export default authSlice.reducer;
