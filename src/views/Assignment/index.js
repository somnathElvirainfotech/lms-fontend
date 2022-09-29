import React from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import StartJourneySec from '../Common/StartJourneySec';
import AssignmentSec from './AssignmentSec';

export default function index() {
    return (
        <>
            <Header />
            <InnerBanner title="Assignment" name="Assignment" linkName="Home" link="/" />
            <AssignmentSec />
            <StartJourneySec />
            <Footer />
        </>
    )
}
