import { Navigate } from "react-router-dom";


class TokenHelper {

  state = {
    language_type: '',
  };



  constructor() {
    // this._accessToken = "oko";
  }

  getHeader() {
    return {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.getToken()
      }
    }
  }

  getXapiHeader() {
    return {
      headers: {
        "Authorization": "Basic NzFiODE2MDJhMzcwNThjZjhlMDZhYWE2ZDk3MDNlMTBjZmE2YmNjMTo1NTI2NzBmOTc4NGFlZGVmZDM3YWUwNjI0ZGE2ZWM5Njk0MDM3YmYx",
        "X-Experience-API-Version": "1.0.1"
      }
    }
  }

  getXapiAuth() {
    return {
      auth: {
        username: "71b81602a37058cf8e06aaa6d9703e10cfa6bcc1",
        password: "552670f9784aedefd37ae0624da6ec9694037bf1"
      }
    }
  }

  setToken(accessToken) {
    localStorage.setItem("token", accessToken);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setEmail(data) {
    localStorage.setItem("email", data)
  }

  getEmail() {
    return localStorage.getItem("email");
  }

  setUsername(data) {
    localStorage.setItem("username", data)
  }

  getUsername() {
    return localStorage.getItem("username");
  }

  setUserId(data) {
    localStorage.setItem("userId", data)
  }

  getUserId() {
    return localStorage.getItem("userId");
  }

  setUserRoll(data) {
    localStorage.setItem("role", data);
  }

  getUserRoll() {
    return localStorage.getItem("role");
  }


  setUserGroup(data) {
    localStorage.setItem('group_details', data)
  }

  getUserGroup() {
    return localStorage.getItem("group_details");
  }

  Logout() {
    localStorage.clear();
    window.location.replace('/')

  }

  setLanguage(data) {
   
    localStorage.setItem("language_type", data);
  }

  getLanguage() {

    return localStorage.getItem("language_type");
     
  }

  setFristName(data) {
    localStorage.setItem('frist_name', data)
  }

  getFristName() {
    return localStorage.getItem("frist_name");
  }

  setLastName(data) {
    localStorage.setItem('last_name', data)
  }

  getLastName() {
    return localStorage.getItem("last_name");
  }

}

export default new TokenHelper();