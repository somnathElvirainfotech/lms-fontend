import React from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import StartJourneySec from '../Common/StartJourneySec';
import ContactInfo from './ContactInfo';
import ContactMap from './ContactMap';

export default function index() {
    return (
        <>
            <Header />
            <InnerBanner title="Contact Us" name="Contact Us" linkName="Home" link="/" />
            <ContactInfo />
            <ContactMap />
            <StartJourneySec />
            <Footer />
        </>
    )
}
