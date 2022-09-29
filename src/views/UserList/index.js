import React from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import UserListSearch from './UserListSearch';
import UserList from './UserList';

export default function index() {
    return (
        <>
            <Header />
            <InnerBanner title="Users list page" name="Users list page" linkName="Home" link="/" />
            <UserListSearch />
            <UserList />
            <Footer />
        </>
    )
}
