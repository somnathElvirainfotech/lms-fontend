import React from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import Enrollment from './Enrollment';
import EnrollmentSec from './EnrollmentSec';

export default function index() {
    return (
        <>
            
            <InnerBanner title="Enrollments" name="Enrollments" linkName="Home" link="/" />
            
            <EnrollmentSec />
             
        </>
    )
}
