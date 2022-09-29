import React from 'react'

export default function HighRatedCourses() {
    return (
        <>
            <div className="high-rated-cou">
                <div className="container">
                    <div className="high-rated-ttl">
                        <div className="lt-block">
                            <h2>High rated courses </h2>
                        </div>
                        <div className="rt-block">
                        </div>
                    </div>
                    <div className="high-rated-wrap">
                        <div id="high-rated-slider" className="owl-carousel">
                            <div className="item">
                                <div className="slider-box">
                                    <div className="tham-img">
                                        <img src="images/high-rated1.jpg" alt="" />
                                    </div>
                                    <div className="text-box">
                                        <div className="lg-text">
                                            <img src="images/high-rated-lg1.png" alt="" />
                                        </div>
                                        <h4>Maching Learning</h4>
                                        <p>Stanford University</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view-btn-sec text-center">
                        <a href="#">Explore more High rated Courses</a>
                    </div>
                </div>
            </div>
        </>
    )
}
