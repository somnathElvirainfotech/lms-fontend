import React, { useState, useEffect, useContext } from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import MyCourse from './MyCourse';
import MYAssignment from './MYAssignment';
import ProfileDetails from '../Profile/ProfileDetails';
import { AuthContext } from '../../index';


import MyTask from './MyTask';


import UserService from '../../services/UserService';
import TokenHelper from '../../services/TokenHelper';

export default function MyCourseMain() {

    const { users } = useContext(AuthContext);

    const [user, setUser] = useState({ email: TokenHelper.getEmail() });



    //const [count, setCount] = useState({});


    



    useEffect(() => {

        (async () => {
            try {

              

                var response = await UserService.getProfileData(user);
                if (response.data.status != false) {
                    //console.log(response.data);

                    setUser(response.data.data)

                } else {
                    console.log(response);
                }

                //     var countRes = await UserService.courseCertificateCount();
                //    setCount(countRes.data.data);
                //     console.log(countRes.data)
                //    // console.log(count)

            } catch (error) {
                console.log(error);
            }
        })()

    }, []);


    return (
        <>
            
            <InnerBanner title="My courses" name="My courses" linkName="Home" link="/" />
            <ProfileDetails userData={user} />
            <MyTask />
            <MyCourse />
            <MYAssignment />
            
        </>
    )
}
