import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="ft-box">
                                <h3>Start or advance your career</h3>
                                <ul>
                                    <li><a href="#">Google Data Analyst</a></li>
                                    <li><a href="#">Google Project Management</a></li>
                                    <li><a href="#">Google UX Design</a></li>
                                    <li><a href="#">Google IT Support</a></li>
                                    <li><a href="#">IBM Data Science</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="ft-box">
                                <h3>Browse popular topics</h3>
                                <ul>
                                    <li><a href="#">Free Courses</a></li>
                                    <li><a href="#">Learn a Language</a></li>
                                    <li><a href="#">Python</a></li>
                                    <li><a href="#">Java</a></li>
                                    <li><a href="#">Web Design</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="ft-box">
                                <h3>Popular courses and articles</h3>
                                <ul>
                                    <li><a href="#">Skills for Data Science Teams</a></li>
                                    <li><a href="#">Data Driven Decision Making</a></li>
                                    <li><a href="#">Software Engineering Skills</a></li>
                                    <li><a href="#">Soft Skills for Engineering Teams</a></li>
                                    <li><a href="#">Management Skills</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="ft-box">
                                <h3>certificate online</h3>
                                <ul>
                                    <li><a href="#">MasterTrack® Certificates</a></li>
                                    <li><a href="#">Professional Certificates</a></li>
                                    <li><a href="#">University Certificates</a></li>
                                    <li><a href="#">MBA & Business Degrees</a></li>
                                    <li><a href="#">Data Science Degrees</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="ft-box">
                                <h3>About Us</h3>
                                <ul>
                                    <li><Link to="/about-us">About</Link></li>
                                    <li><a href="/what-we-offer">What We Offer</a></li>
                                    <li><a href="/leadership">Leadership</a></li>
                                    <li><a href="/careers">Careers</a></li>
                                    <li><a href="/catalog">Catalog</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="ft-box">
                                <h3>Community</h3>
                                <ul>
                                    <li><a href="/learners">Learners</a></li>
                                    <li><a href="/partners">Partners</a></li>
                                    <li><a href="/developers">Developers</a></li>
                                    <li><a href="/beta-Testers">Beta Testers</a></li>
                                    <li><a href="/translators">Translators</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="ft-box">
                                <h3>More</h3>
                                <ul>
                                    <li><a href="#">Learners</a></li>
                                    <li><a href="#">Partners</a></li>
                                    <li><a href="#">Developers</a></li>
                                    <li><a href="#">Beta Testers</a></li>
                                    <li><a href="#">Translators</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="ft-box">
                                <div className="app-link">
                                    <a href="#"><img src="images/app-store.png" alt="" /></a>
                                </div>
                                <div className="app-link">
                                    <a href="#"><img src="images/google-play.png" alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copy-rigt-sec">
                        <p>© 2022 eps.rs. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
