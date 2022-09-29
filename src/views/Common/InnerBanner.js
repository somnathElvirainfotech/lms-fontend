import React from 'react'
import { Link } from 'react-router-dom'

export default function InnerBanner(prop) {
    return (
        <>
            <div className="inner-banner">
                <img src="images/inner-banner.png" alt="" />
                <div className="desc">
                    <div className="container">
                        <div className="text">
                            <h1>{prop.title}</h1>
                            <div className="breadcrumb">
                                <ul>
                                    <li><a href={prop.link}>{prop.linkName}</a>
                                    </li> 
                                    <li>&nbsp;{prop.name}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
