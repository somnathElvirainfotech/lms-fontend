import React, { useEffect, useContext } from "react";
import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import UserService from '../../services/UserService';
import TokenHelper from '../../services/TokenHelper';

import { setCookie, getCookie, removeCookie } from '../../middleware/CookieSetup';
import { toast } from "react-toastify";

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

import MicrosoftLogin from "react-microsoft-login";

// languages
import English from "../ConverLanguages/English";
import SerbianCyrilic from "../ConverLanguages/SerbianCyrilic";
import SerbianLatin from "../ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from '../../routes/routes'

import { AuthContext } from '../../index';

export const Login2 = () => {

    const { user } = useContext(AuthContext);

    // google console client id
    var googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    // google console client id
    var msClientId = process.env.REACT_APP_MS_CLIENT_ID;

    const [inputs, setInputs] = useState({});
    const [error, seterror] = useState('');

    const navigate = useNavigate();

    function start() {
        gapi.client.init({
            clientId: googleClientId,
            scope: 'email',
        });
    }

    useEffect(() => {
        gapi.load('client:auth2', start);
    }, []);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();



            var response = await UserService.Login(inputs);

            console.log("kkkkkkkkkkk",response.data);
            if (response.data.status != false) {
                if (response.data.data.login_type == "local") {
                    TokenHelper.setToken(response.data.token);
                    TokenHelper.setEmail(response.data.data.email);
                    TokenHelper.setUsername(response.data.data.username)
                    TokenHelper.setUserId(response.data.data.id);
                    TokenHelper.setUserRoll(response.data.data.role);
                    TokenHelper.setFristName(response.data.data.firstname);
                    TokenHelper.setLastName(response.data.data.lastname);




                    var cdata = {
                        username: response.data.data.username,
                        email: response.data.data.email
                    }

                    setCookie('user_info', JSON.stringify(cdata))


                    var temp = [];
                    for (var item of response.data.data.group_details) {
                        temp.push(item.group_id)
                    }
                    TokenHelper.setUserGroup(temp)

                    inputs.email = '';
                    inputs.password = '';
                    
                    window.location.replace("/courses");
                    // navigate("/courses")
                } else {
                    toast.error("Invalid Login Type")
                }
            } else {
                toast.error(response.data.msg);
                inputs.email = '';
                inputs.password = '';
            }


        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))

    }

   
    const handleChange2 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs2(values => ({ ...values, [name]: value }))
    }

    const [formStatus, setFormStatus] = useState(false);
    const [inputs2, setInputs2] = useState({});

    
    // google
    var onSuccess = (res) => {
        LoginType(res.profileObj.email, "google")
        console.log("google login success", res);
    }

    var LoginType = async (email, l_type) => {
        var response = await UserService.loginType({ email: email });

        if (response.data.status != false) {
            console.log("kkkkkkkkkkk",response.data);
            if (response.data.data[0].login_type == l_type) {

                TokenHelper.setToken(response.data.token);
                TokenHelper.setEmail(response.data.data[0].email);
                TokenHelper.setUsername(response.data.data[0].username)
                TokenHelper.setUserId(response.data.data[0].id);
                TokenHelper.setUserRoll(response.data.data[0].role);
                TokenHelper.setFristName(response.data.data[0].firstname);
                TokenHelper.setLastName(response.data.data[0].lastname);




                var cdata = {
                    username: response.data.data[0].username,
                    email: response.data.data[0].email
                }

                setCookie('user_info', JSON.stringify(cdata))


                var temp = [];
                for (var item of response.data.data[0].group_details) {
                    temp.push(item.group_id)
                }
                TokenHelper.setUserGroup(temp)

                inputs.email = '';
                inputs.password = '';
             
              window.location.replace("/courses");
                // navigate("/courses")
            } else {
                toast.error("Invalid login type")
                deleteCookies()
            }


        } else {
            toast.error(response.data.msg);
            inputs.email = '';
            inputs.password = '';
            deleteCookies()
        }

        console.log("login type ", response.data);
    }

    var onFailure = (res) => {
        toast.error("google login failure");
        // LoginType()
        deleteCookies()
    }


    // microsoft
    var authHandler = (err, data) => {
        //LoginType(data.,"ms")
        console.log("ms error ", err);
        console.log("ms data ", data);

        if (data !== undefined) {
            if ("account" in data) {
                LoginType(data.account.userName, "ms")
            } else {
                toast.error("Invalid user")
                deleteCookies()
            }
        }
    }


    var forgetPassword = () => {
        var status = !formStatus;

        if (status) {
            inputs.email = '';
            inputs.password = '';
        } else {
            inputs2.email = '';
        }

        setFormStatus(status)
    }



    const handleSubmit2 = async (event) => {
        try {
            event.preventDefault();
            var response = await UserService.ForgetPassword(inputs2);
            if (response.data.status) {
                toast.success(response.data.msg)
            } else {
                toast.error(response.data.msg)
            }
        } catch (error) {
            console.log(error);
        }
    }

    function deleteCookies() {
        var allCookies = document.cookie.split(';');

        // The "expire" attribute of every cookie is 
        // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
        for (var i = 0; i < allCookies.length; i++)
            document.cookie = allCookies[i] + "=;expires="
                + new Date(0).toUTCString();


    }


    const { languageList } = useContext(LangContext);
    const [langObj, setLangObj] = useState({});

    useEffect(() => {

        if (languageList.language_name === "english") {
            setLangObj(English)
        } else if (languageList.language_name === "СРБ") {
            setLangObj(SerbianCyrilic)
        } else if (languageList.language_name === "SRB") {
            setLangObj(SerbianLatin)
        }

    }, [languageList.language_name])


    return (
        <>
            <div className="center_screen" style={{ "backgroundColor": "#d4d6d5" }}>
                <div className="card  mt-5" style={{ width: "28rem" }}>
                    <div className="card-body">
                        <div className="form-title text-center">
                            <div className="logo" style={{ paddingBottom: "40px" }}><NavLink to="/"><img src="images/logo.png" alt="header image" /></NavLink><h4 /></div>
                        </div>

                        {/** login form */}
                        {formStatus == false &&
                            <>
                                <form onSubmit={handleSubmit} >
                                    {error &&
                                        <div className="alert alert-danger alert-dismissible">
                                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                                            {error}
                                        </div>
                                    }
                                    <div className="form-group text-left">
                                        <label htmlFor="email">{langObj.username}</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            value={inputs.email || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group text-left">
                                        <label htmlFor="pwd">{langObj.password}</label>
                                        <input
                                            id="pwd"
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter password"
                                            value={inputs.password || ""}
                                            onChange={handleChange} />
                                    </div>

                                    <div className="form-group" style={{ marginTop: "40px" }}>
                                        <button id='loginformbtn' type="submit" className="btn btn-primary form-control">{langObj.login}</button>

                                    </div>
                                    <div className="form-group" style={{ marginTop: "10px" }}>
                                        <p onClick={forgetPassword} style={{ color: "#007bff", cursor: "pointer" }} >Forgotten password?</p>
                                    </div>

                                </form>


                                <div className="form-group">
                                    <GoogleLogin
                                        clientId={googleClientId}
                                        buttonText="Sign in with Google"
                                        onSuccess={onSuccess}
                                        onFailure={onFailure}
                                        cookiePolicy={'single_host_origin'}
                                        style={{ marginTop: "15px", color: "#3b3d3d" }}
                                    />

                                </div>

                                <div className="form-group">
                                    <MicrosoftLogin clientId={msClientId} authCallback={authHandler} />
                                </div>

                            </>


                        }

                        {/** forget password form */}
                        {formStatus == true && <form onSubmit={handleSubmit2} >
                            {error &&
                                <div className="alert alert-danger alert-dismissible">
                                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    {error}
                                </div>
                            }
                            <div className="form-group text-left">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={inputs2.email || ""}
                                    onChange={handleChange2}
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: "40px" }}>
                                <button id='loginformbtn' type="submit" className="btn btn-primary form-control">Send</button>

                            </div>
                            <div className="form-group" style={{ marginTop: "10px" }}>
                                <p onClick={forgetPassword} style={{ color: "#007bff", cursor: "pointer" }} >Back</p>
                            </div>
                        </form>}
                    </div>
                </div>
            </div>
        </>
    );
}