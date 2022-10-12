import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./context/auth-context";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import savedJobReducer from './Redux/savedJobs'

const store=configureStore({
  reducer:{
    savedJobs:savedJobReducer
  }
})

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
