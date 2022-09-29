import React from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import UserGroup from './UserGroup';


export default function index() {
    return (
        <>
             
            <InnerBanner title="User groups" name="User groups" linkName="User add-edit page" link="#" />
            <UserGroup />
           
        </>

    )
}
