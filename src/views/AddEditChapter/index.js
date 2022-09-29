import React from 'react'
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import UserAddEditGroupSec from './UserAddEditGroupSec';

export default function index() {
    return (
        <>
            <Header />
            <InnerBanner title="Add/edit group form" name="Add/edit group form" linkName="User groups" link="#" />
            <UserAddEditGroupSec />
            <Footer />
        </>
    )
}
