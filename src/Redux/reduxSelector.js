import { createSelector } from "@reduxjs/toolkit";

// Selector to get the auth state
const selectAuthState = (state) => state.auth;

/**
 * // Selector to get the token from the auth state
export const selectToken = createSelector(
  selectAuthState,
  (auth) => auth.token
);    // this format make error if undefined or null intead use: &&  like bellow                         
 */

// Selector to get the token from the auth state
export const selectToken = createSelector(
  selectAuthState,
  (auth) => auth && auth.token
);

// Selector to get the fullname from the auth state
export const selectFullName = createSelector(
  selectAuthState,
  (auth) => auth && auth.name
);

// Selector to get the expiration from the auth state
export const selectExpiration = createSelector(
  selectAuthState,
  (auth) => auth && auth.expiration
);

export const selectProducts = createSelector(
  (state) => state.products,
  (products) => ({
    data: products && products.data,
    loading: products ? products.loading : true, // Assuming products.loading indicates loading state
    error: products ? products.error : null, // Assuming products.error holds any error information
  })
);
/***
 * note:
 * if auth is falsy (e.g., null or undefined), the expressions auth && auth.token,
 * auth && auth.name, and auth && auth.expiration will evaluate to null (or undefined),
 * effectively preventing any potential errors when accessing properties of auth.
 * This is a common pattern in JavaScript for guarding against null or undefined values.
 *
 */
