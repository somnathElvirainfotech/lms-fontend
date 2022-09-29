import React from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import SingleCourse from './SingleCourse';
import CourseDes from './CourseDes';

export default function index() {
    return (
        <>
            <Header />
            <InnerBanner title="Single Courses" name="Single Courses" linkName="Home" link="/" />
            <SingleCourse name1="Professional Certificate in I Last updated 01-2022" name2="Mobile App Development with Swift" />
            <CourseDes />
            <Footer />
        </>
    )
}
