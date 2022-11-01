import React, { useState, useEffect, useContext } from 'react'
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import TokenHelper from '../../services/TokenHelper';
import UserService from '../../services/UserService';
import ProfileDetails from '../Profile/ProfileDetails';

export const EditProfile = () => {

    const [user, setUser] = useState({ email: TokenHelper.getEmail() });
    const [inputs, setInputs] = useState({});
    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');
    const [pass, setPass] = useState({});
    const [socalLink, setSocialLink] = useState({});
    const [image, setImage] = useState(null);
    const [imageUpload, setimageUpload] = useState(null);

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    useEffect(async () => {

        try {
            var response = await UserService.getProfileData(user);
            if (response.data.status != false) {
                // console.log(response.data);

                setUser(response.data.data);
                const data = {
                    username: response.data.data.username,
                    email: response.data.data.email,
                    date: formatDate(response.data.data.date),
                }

                setInputs(data)

                setPass({
                    email: response.data.data.email,
                    password1: '',
                    password2: ''
                })
                setSocialLink({
                    email: response.data.data.email,
                    social_link_1: response.data.data.social_link_1,
                    social_link_2: response.data.data.social_link_2
                })

            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }

    }, []);


    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        seterror('');
        console.log(inputs)
    }

    // console.log(inputs.date)

    const Passwordhandle = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPass(values => ({ ...values, [name]: value }))
        seterror('');
    }

    const PasswordChange = async (event) => {
        event.preventDefault();
        // console.log(pass)
        try {
            var response = await UserService.changePassword(pass);
            if (response.data.status != false) {
                setsuccess(response.data.msg);
            } else {
                seterror(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const socialLinkhandle = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSocialLink(values => ({ ...values, [name]: value }))
        seterror('');
    }

    const socialLinkSubmit = async (event) => {
        event.preventDefault();
        // console.log(pass)
        try {
            var response = await UserService.updateUserProfile(socalLink);
            if (response.data.status != false) {
                setsuccess(response.data.msg);
            } else {
                seterror(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const ImageHAndler = (e) => {
        const select = e.target.files[0];
        setimageUpload(select);
        const Allow = ["image/png", "image/jpg", "image/jpeg"];
        if (select && Allow.includes(select.type)) {
            let render = new FileReader();
            render.onloadend = () => {
                setImage(render.result)
            }
            render.readAsDataURL(select);

        } else {
            seterror("file type not support, file will be jpg,jpeg or png format ")
        }
    }

    const ImageSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("email", inputs.email);
        data.append("image", imageUpload);
        console.log(imageUpload)

        try {
            var response = await UserService.updateUserProfileImage(data);
            if (response.data.status != false) {
                setsuccess(response.data.msg);
            } else {
                seterror(response.data.msg);
            }
        } catch (error) {
            console.log(error);
        }

    }

  

    return (
        <>
            <Header />
            <InnerBanner title="Profile" name="Profile" linkName="Home" link="/" />
            <div className="profile-img">
                {user.image ? <img src={user.image} alt="images/user.png" /> : <img src="images/user.png" alt="images/user.png" />

                }

            </div>
            <div className=' mt-3 container '>

                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        {error &&
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                {error}
                            </div>
                        }

                        {success &&
                            <div className="alert alert-success alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                {success}
                            </div>
                        }


                        <div className='tab-wrap'>







                            <ul className='nav-tabs nav '>

                                <li className='nav-item'>
                                    <a href='#userDetails' className='nav-link active' data-toggle="tab" >User Details</a>
                                </li>

                                <li className='nav-item'>
                                    <a href='#upload' className='nav-link' data-toggle="tab" >Upload </a>
                                </li>

                                <li className='nav-item'>
                                    <a href='#social_link' className='nav-link' data-toggle="tab" >Social Media Link</a>
                                </li>

                                <li className='nav-item'>
                                    <a href='#password' className='nav-link' data-toggle="tab" >Password</a>
                                </li>
                            </ul>



                            <div className='tab-content'>
                                <div className='tab-pane mt-3 active' id='userDetails'>
                                    <form onSubmit={handleSubmit} method="post" >

                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group text-left">
                                                    <label htmlFor="username">Name</label>
                                                    <input
                                                        id="username"
                                                        type="text"
                                                        name="username"
                                                        className="form-control"
                                                        placeholder="Enter username"
                                                        value={inputs.username}
                                                        onChange={handleChange}

                                                    />
                                                </div>
                                            </div>
                                            <div className='col-md-6'>

                                                <div className="form-group text-left ">
                                                    <label htmlFor="date">Date</label>
                                                    <input
                                                        id="date"
                                                        type="date"
                                                        name="date"
                                                        className="form-control"
                                                        placeholder="Enter date"
                                                        value={inputs.date}
                                                        onChange={handleChange}

                                                    />
                                                </div>

                                            </div>
                                            <div className="form-group" style={{ marginTop: "40px" }}>
                                                <button id='editUser' type="submit" className="btn form-control" style={{ backgroundColor: "green", border: "green", color: "white" }}>Save</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className='tab-pane mt-3' id='social_link'>
                                    <form onSubmit={socialLinkSubmit} method="post" >

                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group text-left">
                                                    <label htmlFor="social_link_1">Add Linkedin link</label>
                                                    <input
                                                        id="social_link_1"
                                                        type="text"
                                                        name="social_link_1"
                                                        className="form-control"
                                                        placeholder="Enter link"
                                                        value={socalLink.social_link_1}
                                                        onChange={socialLinkhandle}
                                                    />
                                                </div>



                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group text-left">
                                                    <label htmlFor="social_link_2">Add MS Teams link</label>
                                                    <input
                                                        id="social_link_2"
                                                        type="text"
                                                        name="social_link_2"
                                                        className="form-control"
                                                        placeholder="Enter link"
                                                        value={socalLink.social_link_2}
                                                        onChange={socialLinkhandle}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group" style={{ marginTop: "40px" }}>
                                                <button id='editUser' type="submit" className="btn form-control" style={{ backgroundColor: "green", border: "green", color: "white" }}>Save</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className='tab-pane mt-3' id='password'>
                                    <form onSubmit={PasswordChange} method="post" >

                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group text-left">
                                                    <label htmlFor="password1">Password</label>
                                                    <input
                                                        id="password1"
                                                        type="text"
                                                        name="password1"
                                                        className="form-control"
                                                        placeholder="Enter password"
                                                        value={pass.password1}
                                                        onChange={Passwordhandle}
                                                        required
                                                    />
                                                </div>

                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group text-left">
                                                    <label htmlFor="password2">Confirm Password</label>
                                                    <input
                                                        id="password2"
                                                        type="text"
                                                        name="password2"
                                                        className="form-control"
                                                        placeholder="Enter Confirm password"
                                                        value={pass.password2}
                                                        onChange={Passwordhandle}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group" style={{ marginTop: "40px" }}>
                                                <button id='editUser' type="submit" className="btn form-control" style={{ backgroundColor: "green", border: "green", color: "white" }}>Change</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>

                                <div className='tab-pane mt-3' id='upload'>
                                    <form enctype="multipart/form-data" method="post" onSubmit={ImageSubmit}>

                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className='form-group'>


                                                    <div className="imagePreview"
                                                        style={{
                                                            background: image ? `url("${image}") no-repeat center/cover` : "white"
                                                        }}>
                                                        {!image && (
                                                            <>
                                                                <p>Add an image</p>
                                                                <label htmlFor="image" className='customFileUpload'>Choose file</label>
                                                                <input
                                                                    id="image"
                                                                    type="file"
                                                                    name="image"
                                                                    className="form-control"
                                                                    onChange={ImageHAndler}
                                                                />
                                                                <span>(jpg,jpeg or png)</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    {image && <button className='removeImage mt-2' onClick={() => setImage(null)}>Remove</button>}
                                                </div>

                                                <div className="form-group" style={{ marginTop: "40px" }}>
                                                </div>
                                                <button id='editUser' type="submit" className="btn form-control" style={{ backgroundColor: "green", border: "green", color: "white" }}>Upload</button>
                                            </div>
                                        </div>


                                    </form>
                                </div>
                                <div className='tab-pane mt-3' id='upload'>
                                </div>
                            </div>

                        </div>


                    </div>
                    <div className='col-md-3'></div>
                </div>



            </div>
            <Footer />
        </>
    )
}
