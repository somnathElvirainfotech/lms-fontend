import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../index';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';


export default function List() {
    const { user } = useContext(AuthContext);

    return <>
        <Header />
        <InnerBanner title="Category" name="Create" linkName="Home" link="/" />

        <div className=" enrollments-sec activites-sec " style={{ marginBottom: "50px" }} >
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-6 pr-md-0">
                        <button className="btn btn-info" onClick={CreateFrom}>Add</button>
                    </div>
                </div>
            </div>
        </div>

    </>

}

