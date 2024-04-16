import { createSelector } from "@reduxjs/toolkit";

// Selector to get the auth state
const selectAuthState = (state) => state.auth;

// Selector to get the token from the auth state
export const selectToken = createSelector(
  selectAuthState,
  (auth) => auth.token
);

// Selector to get the fullname from the auth state
export const selectFullName = createSelector(
  selectAuthState,
  (auth) => auth.name
);

// Selector to get the expiration from the auth state
export const selectExpiration = createSelector(
  selectAuthState,
  (auth) => auth.expiration
);
