import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import AdminList from "./getAllUsers/getAllUsers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      <AdminList />
    </Provider>
  </React.StrictMode>
);
