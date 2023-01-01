import TokenHelper from "../services/TokenHelper";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import MaintenanceService from "../services/MaintenanceService";
import moment from "moment";
import UserService from "../services/UserService";
import { auth, gprovider, mprovider, firebase } from "../views/Firebase";
import { setCookie, getCookie, removeCookie } from "./CookieSetup";

export const RequireAuth = ({ children }) => {
  const token = TokenHelper.getToken();
  const location = useLocation();

  // // console.log("cvv", Date.parse(TokenHelper.getExpireTime())/1000);
  // var ss=moment().format("MM/DD/YYYY HH:mm:ss");
  // console.log("cvv", Date.parse(ss))

  if (token) {
    var currentDate = (Date.parse((moment().format("MM/DD/YYYY HH:mm:ss")))/1000);
    var expireDate = (Date.parse(TokenHelper.getExpireTime())/1000);

    console.log("currentDate " ,currentDate);

    if (currentDate > expireDate) {
        Logout();
        return;
    }
    
  }
 

  if (!token) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return children;
};

export const RequireAuthLogout = ({ children }) => {
  const token = TokenHelper.getToken();
  const location = useLocation();

  if (location.pathname == "/" && token) {
    return <Navigate to="/courses" state={{ path: location.pathname }} />;
  }
  return children;
};

export const CheckENV = ({ children }) => {
  const token = TokenHelper.getToken();
  const user = process.env.REACT_APP_PUBLIC_UNAUTHORIZED_USER;

  if (user == "true" && token != "") {
    return <Navigate to="/" />;
  }
  return children;
};

export const ActiveMaintenance = ({ children, data }) => {
  console.log(data);

  if (data.status == "active") {
    return <Navigate to="/maintenance" state={{ data: data }} />;
  }

  return children;
};

export const DisableMaintenance = ({ children, data }) => {
  if (data.status == "deactive") {
    return children;
  }
};

async function Logout() {
  await UserService.LoginStatus({
    email: TokenHelper.getEmail(),
    status: "inactive",
  });

  firebase
    .auth()
    .signOut()
    .then((e) => {
      console.log("Sign-out successful. ", e);
      TokenHelper.Logout();
      //  deleteCookies()
      removeCookie("user_info");
    })
    .catch((error) => {
      console.log(" An error happened. ", error);
    });
}
