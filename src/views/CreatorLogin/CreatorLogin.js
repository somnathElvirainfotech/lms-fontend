import React from "react";
import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import UserService from '../../services/UserService';
import TokenHelper from '../../services/TokenHelper';


export default function CreatorLogin() {


    const [inputs, setInputs] = useState({});
    const [error, seterror] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            var response = await UserService.CreatorLogin(inputs);

            if (response.data.status != false) {
                TokenHelper.setToken(response.data.token);
                TokenHelper.setEmail(response.data.data.email);
                TokenHelper.setUsername(response.data.data.username)
                TokenHelper.setUserId(response.data.data.id)
                TokenHelper.setUserRoll(response.data.data.role)
                window.location.replace("/");
            } else {
                seterror(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        seterror('');
    }


    return (
        <div className="modal fade" id="creatorloginform" >
            <div className="modal-dialog" role="document">
                <div className="modal-content" style={{ padding: "1rem" }}>

                    <div className="modal-header  border-bottom-0">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-title text-center">
                            <div className="logo" style={{ paddingBottom: "40px" }}><NavLink to="/"><img src="images/logo.png" alt="header image" /></NavLink><h4 /></div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {error &&
                                <div className="alert alert-danger alert-dismissible">
                                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    {error}
                                </div>
                            }
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
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
                            <div className="form-group">
                                <label htmlFor="pwd">Password</label>
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
                                <button id='loginformbtn' type="submit" className="btn btn-primary form-control">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );

}