import React from 'react'
import OwlCarousel from 'react-owl-carousel';

export default function Banner() {
    return (
        <>
            {/* banner */}
            <div className="banner">
                <div id="banner-slider" className="owl-carousel">
                    <div className="item">
                        <img src="/images/banner-img.jpg" alt="" />
                        <div className="desc">
                            <div className="container">
                                <div className="desc-text">
                                    <h1>Start learning from <strong>the world’s best institutions</strong></h1>
                                    <p>Open your door to more with world-className Professional Certificates and degrees.</p>
                                    <div className="desc-btn">
                                        <a href="#">Join for free</a>
                                        <a href="#">Explore all courses</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
