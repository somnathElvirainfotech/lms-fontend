import { useState, useEffect } from "react";

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import ProfileDetails from './ProfileDetails';
import Certificate from './Certificate';
import ProfileEdit from './ProfileEdit';
import MYAssignment from './MYAssignment';
import { editProfile } from "../profileEdit/EditProfile";


import UserService from '../../services/UserService';
import TokenHelper from '../../services/TokenHelper';
import { Outlet } from "react-router-dom";


export default function Profile() {
    const [user, setUser] = useState({ email: TokenHelper.getEmail() });

    useEffect(async () => {

        try {
            var response = await UserService.getProfileData(user);
            if (response.data.status != false) {
                //// console.log(response.data);

                setUser(response.data.data)

            } else {
                // console.log(response);
            }
        } catch (error) {
            // console.log(error);
        }

    }, []);
    return (
        <>
            <Header />
            <InnerBanner title="Profile" name="Profile" linkName="Home" link="/" />
            <ProfileDetails userData={user} />
            <MYAssignment />
            <Certificate />
            <ProfileEdit />
            <Footer />
        </>
    )
}
