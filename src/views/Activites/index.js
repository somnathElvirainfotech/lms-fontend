import React from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import Courses from './Courses';
import ActivitesSec from './ActivitesSec';

export default function index() {
    return (
        <>
           
            <InnerBanner title="Activities" name="Activities" linkName="Home" link="/" />
           
            <ActivitesSec />
            
        </>
    )
}
