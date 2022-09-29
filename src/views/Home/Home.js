import React from 'react';

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import CommunitySec from '../Common/CommunitySec';
import StartJourneySec from '../Common/StartJourneySec';

import Banner from './Banner';
import HighRatedCourses from './HighRatedCourses';
import JoinForFreeSec from './JoinForFreeSec';
import MostPopularSec from './MostPopularSec';
import OurCoursesSec from './OurCoursesSec';
import PartnerSec from './PartnerSec';
import { Login2 } from '../Login/Login2'

export default function index() {
   // const user = process.env.REACT_APP_PUBLIC_UNAUTHORIZED_USER;
    // alert(user)
    if (true) {
        //alert()
        return (
            <>
                <Login2 />
            </>
        )
    }
    else {
        return (
            <>
                
                <Banner />
                <PartnerSec />
                <MostPopularSec />
                <OurCoursesSec />
                <JoinForFreeSec />
                <HighRatedCourses />
                <CommunitySec />
                <StartJourneySec />
                
            </>
        )
    }


}
