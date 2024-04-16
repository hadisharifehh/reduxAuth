import { configureStore } from "@reduxjs/toolkit";
import articlesSliceOne from "./reducers/articleSliceOne";
import articlesSliceTwo from "./reducers/articleSliceTwo";
import counterSlice from "./newCounterApp/counterSlice";
import productSlice from "./fakeApi/productSlice";
import cartSlice from "./reducers/addToCart/cartSlice";
import authSlice from "./Login/authSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

export const store = configureStore({
  reducer: {
    articleOne: articlesSliceOne,
    articleTwo: articlesSliceTwo,
    counter: counterSlice,
    products: productSlice,
    cart: persistedReducer,
    auth: persistedAuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
