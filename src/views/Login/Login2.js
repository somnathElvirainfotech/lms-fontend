import React, { useEffect, useContext } from "react";
import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import UserService from '../../services/UserService';
import TokenHelper from '../../services/TokenHelper';

import { setCookie, getCookie, removeCookie } from '../../middleware/CookieSetup';
import { toast } from "react-toastify";

// languages
import English from "../ConverLanguages/English";
import SerbianCyrilic from "../ConverLanguages/SerbianCyrilic";
import SerbianLatin from "../ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from '../../routes/routes'

import { AuthContext } from '../../index';

// firebase
import { auth, gprovider, mprovider } from '../Firebase'

// loader 
import Loader from "../Loader";



export const Login2 = () => {

    const { user } = useContext(AuthContext);

    // loader
    const [showLoader, setShowLoader] = useState(false);


    const [inputs, setInputs] = useState({});
    const [error, seterror] = useState('');

    const navigate = useNavigate();





    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            setShowLoader(true);


            var response = await UserService.Login(inputs);

            console.log("kkkkkkkkkkk", response.data);
            if (response.data.status != false) {
                if (response.data.data.login_type == "local") {
                    TokenHelper.setToken(response.data.token);
                    TokenHelper.setEmail(response.data.data.email);
                    TokenHelper.setUsername(response.data.data.username)
                    TokenHelper.setUserId(response.data.data.id);
                    TokenHelper.setUserRoll(response.data.data.role);
                    TokenHelper.setFristName(response.data.data.firstname);
                    TokenHelper.setLastName(response.data.data.lastname);
                    TokenHelper.setLanguage(response.data.data.language_id)




                    // var cdata = {
                    //     username: response.data.data.username,
                    //     email: response.data.data.email
                    // }

                    // setCookie('user_info', JSON.stringify(cdata))


                    var temp = [];
                    for (var item of response.data.data.group_details) {
                        temp.push(item.group_id)
                    }
                    TokenHelper.setUserGroup(temp)

                    setInputs({ email: "", password: "" })

                    await UserService.LoginStatus({email:response.data.data.email,status:"active"})
                    
                    setShowLoader(false);


                   window.location.replace("/courses");
                    // navigate("/courses",{ replace:true,refresh: true })
                     
                } else {
                    setShowLoader(false);
                    toast.error("Invalid Login Type")
                }
            } else {
                setShowLoader(false);
                toast.error(response.data.msg);
                setInputs({ email: "", password: "" })
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
    var GoogleLoginHandler = (res) => {
        setShowLoader(true);
        auth.signInWithPopup(gprovider)
            .then((res) => {
                console.log(res.user.email)
                //  window.Cookies.clear()
                LoginType(res.user.email, "google")
                setShowLoader(false);
            })
            .catch((err) => { 
                console.log(err)
                setShowLoader(false);
            })



    }

    // microsoft
    var MicrosoftLoginHandler = () => {
        setShowLoader(true);
        auth.signInWithPopup(mprovider)
            .then((res) => {
                console.log('m success ', res)

                if ("user" in res)
                    LoginType(res.user.email, "ms")

                    setShowLoader(false);

            })
            .catch((err) => {
                console.log('merr ', err.email)

                if ("email" in err)
                    LoginType(err.email, "ms")

                    setShowLoader(false);

            })

    }

    var LoginType = async (email, l_type) => {
      //  deleteCookies()
        setShowLoader(true);
        var response = await UserService.loginType({ email: email,l_type:l_type });
        if (response.data.status != false) {
            // console.log("kkkkkkkkkkk", response.data);
            if (response.data.data[0].login_type == l_type) {

                TokenHelper.setToken(response.data.token);
                TokenHelper.setEmail(response.data.data[0].email);
                TokenHelper.setUsername(response.data.data[0].username)
                TokenHelper.setUserId(response.data.data[0].id);
                TokenHelper.setUserRoll(response.data.data[0].role);
                TokenHelper.setFristName(response.data.data[0].firstname);
                TokenHelper.setLastName(response.data.data[0].lastname);
                TokenHelper.setLanguage(response.data.data.language_id)




                // var cdata = {
                //     username: response.data.data[0].username,
                //     email: response.data.data[0].email
                // }

                // setCookie('user_info', JSON.stringify(cdata))


                var temp = [];
                for (var item of response.data.data[0].group_details) {
                    temp.push(item.group_id)
                }
                TokenHelper.setUserGroup(temp)


                setInputs({ email: "", password: "" })

                await UserService.LoginStatus({email:response.data.data.email,status:"active"})
                setShowLoader(false);

                window.location.replace("/courses");
                // navigate("/courses")
            } else {
               deleteCookies()
                setShowLoader(false);
                toast.error("Invalid login type")
            }


        } else {

            setInputs({ email: "", password: "" })
            deleteCookies()
            setShowLoader(false);
            toast.error(response.data.msg);
        }
        setShowLoader(false);
        console.log("login type ", response.data);
    }








    var forgetPassword = () => {
        var status = !formStatus;

        if (status) {
            setInputs({ email: "", password: "" })
        } else {
            setInputs2({ email: "" })
        }

        setFormStatus(status)
    }



    const handleSubmit2 = async (event) => {
        try {
            event.preventDefault();
            setShowLoader(true);

            var response = await UserService.ForgetPassword(inputs2);
            if (response.data.status) {
                setShowLoader(false);
                toast.success(response.data.msg)
            } else {
                setShowLoader(false);
                toast.error(response.data.msg)
            }
            setInputs2({ email: "" })
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

        if (languageList.language_name === "1") {
            setLangObj(English)
        } else if (languageList.language_name === "2") {
            setLangObj(SerbianCyrilic)
        } else if (languageList.language_name === "3") {
            setLangObj(SerbianLatin)
        }

    }, [languageList.language_name])


    return (
        <>
            {/** loader */}
            {showLoader && <Loader />}

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
                                            autoComplete="off"
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
                                            autoComplete="off"
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


                                    <button type="button" style={{ border: "1px solid " }} className="btn btn-light login-with-google-btn" onClick={GoogleLoginHandler}>Sign In with Google</button>

                                </div>

                                <div className="form-group">

                                    <button type="button" style={{ border: "1px solid " }} className="btn btn-light login-with-microsoft-btn" onClick={MicrosoftLoginHandler}>Sign In with Microsoft</button>
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
                                    autoComplete="off"
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