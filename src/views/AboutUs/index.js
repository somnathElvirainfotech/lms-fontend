import React from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import CommunitySec from '../Common/CommunitySec';
import StartJourneySec from '../Common/StartJourneySec';

import InnerBanner from '../Common/InnerBanner';
import Story from './Story';
import GlobalCommSec from './GlobalCommSec';

export default function index() {
    return (
        <>
           
            <InnerBanner title="About Us" name="About Us" linkName="Home" link="/" />
            <Story />
            <GlobalCommSec />
            <CommunitySec />
            <StartJourneySec />
            
        </>
    )
}
