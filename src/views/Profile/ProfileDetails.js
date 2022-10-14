import React, { useState, useContext, useEffect } from 'react'
import TokenHelper from '../../services/TokenHelper';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../index'
import UserService from '../../services/UserService';

// languages
import English from "../ConverLanguages/English";
import SerbianCyrilic from "../ConverLanguages/SerbianCyrilic";
import SerbianLatin from "../ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from '../../routes/routes';

export default function ProfileDetails(userData) {
    const [count, setCount] = useState({});
    const { users } = useContext(AuthContext);
    // console.log(userData)
    const [target, setTarget] = useState();
    const user = userData.userData;
    const navigate = useNavigate();
    const editUser = () => {
        navigate('/profile')
        //window.location.replace('/profile')
    }

    useEffect(() => {
        (async () => {
            var countRes = await UserService.courseCertificateCount();
            setCount(countRes.data.data);
            console.log(countRes.data)
        })()
        // console.log(count)
    }, [])


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

    }, [languageList.language_name]);


    return (
        <>
            <div className="profile-details">
                <div className="container">
                    <div className="profile-img">
                        {user.image ? <img src={user.image} alt="" width="200px" height="200px" /> : <img src="/images/user.png" width="200px" height="200px" alt="" />

                        }
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="user-content">
                                <h4>Welcome , {TokenHelper.getUsername()} </h4>
                                <p className="member-deration">Member since 2021</p>
                                <p>My Courses</p>
                            </div>
                        </div>
                        <div className="col-md-5 offset-md-1">
                            <div className="user-content">
                                <button onClick={editUser} className="edit-pro-btn toggle">Edit Profile
                                    <i className="fa fa-pencil" aria-hidden="true"></i></button>


                                {/* <NavLink to="/profile/edit" className="edit-pro-btn toggle">Edit Profile <i className="fa fa-pencil" aria-hidden="true"></i></NavLink> */}

                                <ul>
                                    <li>{langObj.number_of_enrolled_courses} : <span>{count.enroll_course_count ? count.enroll_course_count : 0}</span></li>
                                    <li>{langObj.number_of_finished_courses} : <span>{count.close_course_count ? count.close_course_count : 0}</span></li>
                                    <li>{langObj.number_of_certificates} : <span>{count.certificate_count ? count.certificate_count : 0}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-edit-form" id="target">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-4 pr-md-0">
                            <div className="profile-edit-form-left">
                                <div className="profile-edit-form-img">
                                    <img src="images/user.png" alt="" />
                                </div>
                                <h3>Elina Josh </h3>
                                <a href="#" className="active">Profile</a>
                                <a href="#">Photo
                                </a>
                                <a href="#">Security
                                </a>
                                <a href="#">Notification
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-9 col-sm-8 pl-md-0">
                            <div className="profile-edit-form-right">
                                <form>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>First NAME</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>LAST NAME</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>LANGUAGE
                                                </label>
                                                <select className="form-control" id="exampleFormControlSelect1">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>EMAIL ID
                                                </label>
                                                <input type="email" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>ENTER CURRENT PASSWORD</label>
                                                <input type="password" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>ENTER NEW PASSWORD</label>
                                                <input type="password" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>RE-ENTER PASSWORD</label>
                                                <input type="password" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>QUALIFICATION</label>
                                                <select className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>ABOUT YOURSELF</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                <small>120 character only.</small>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn">SAVE</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
