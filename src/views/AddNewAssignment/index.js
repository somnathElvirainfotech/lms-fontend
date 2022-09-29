import React from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import StartJourneySec from '../Common/StartJourneySec';
import InnerBanner from '../Common/InnerBanner';
import AddNewAssignment from './AddNewAssignment';

export default function index() {
    return (
        <>
            <Header />
            <InnerBanner title="Add New Assignment" name="Add New Assignment" linkName="Home" link="/" />
            <AddNewAssignment />
            <StartJourneySec />
            <Footer />
        </>
    )
}
