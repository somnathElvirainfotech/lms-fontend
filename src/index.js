import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import Routes from "./routes/routes";
import TokenHelper from "./services/TokenHelper";

import { CheckENV } from "./middleware/RequireAuth";
import { Maintenance } from "./middleware/RequireAuth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "react-cookie";

// import "bootstrap/dist/js/bootstrap.bundle.js";
// import "bootstrap/dist/css/bootstrap.css";

export const AuthContext = createContext();
const userData = {
  token: TokenHelper.getToken(),
  email: TokenHelper.getEmail(),
  username: TokenHelper.getUsername(),
  user_id: TokenHelper.getUserId(),
  user_role: TokenHelper.getUserRoll(),
  user_groups: TokenHelper.getUserGroup(),
  language_type: TokenHelper.getLanguage(),
  firstname: TokenHelper.getFristName(),
  lastname: TokenHelper.getLastName(),
  login_type:TokenHelper.getLoginType(),
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* Same as */}
    <ToastContainer
      position="top-right"
      autoClose={3000} 
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />

    <BrowserRouter>
      <AuthContext.Provider value={{ user: userData }}>
        <CookiesProvider>
          <Routes />
        </CookiesProvider>
      </AuthContext.Provider>
    </BrowserRouter>
    
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
