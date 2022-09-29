import React from 'react'

export default function SingleCourse(prop) {
    return (
        <>
            <div className="single-course-top">
                <div className="container">
                    <div className="media align-items-center">
                        <img src="images/university-logo.png" alt="" />
                        <div className="media-body ml-3">
                            <span>{prop.name1}</span>
                            <h5>{prop.name2}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
