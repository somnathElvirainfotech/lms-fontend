import React from 'react'

export default function MostPopularSec() {
    return (
        <>
            <div className="most-popular-sec">
                <div className="container">
                    <h2>Most popular courses</h2>
                    <div className="most-popular-wrap">
                        <ul id="tabs" className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a id="tab-A" href="#pane-A" className="nav-link active" data-toggle="tab" role="tab">Computer
                                    Science </a>
                            </li>
                            <li className="nav-item">
                                <a id="tab-B" href="#pane-B" className="nav-link" data-toggle="tab" role="tab">Data Science</a>
                            </li>
                            <li className="nav-item">
                                <a id="tab-C" href="#pane-C" className="nav-link" data-toggle="tab" role="tab">Business</a>
                            </li>
                            <li className="nav-item">
                                <a id="tab-D" href="#pane-D" className="nav-link" data-toggle="tab" role="tab">Healthcare</a>
                            </li>
                            <li className="nav-item">
                                <a id="tab-E" href="#pane-E" className="nav-link" data-toggle="tab" role="tab">Communication</a>
                            </li>
                            <li className="nav-item">
                                <a id="tab-F" href="#pane-E" className="nav-link" data-toggle="tab" role="tab">Social Science</a>
                            </li>
                            <li className="nav-item">
                                <a id="tab-G" href="#pane-E" className="nav-link" data-toggle="tab" role="tab">Health</a>
                            </li>
                            <li className="nav-item">
                                <a id="tab-H" href="#pane-E" className="nav-link" data-toggle="tab" role="tab">Cloud</a>
                            </li>
                            <li className="nav-item">
                                <a id="tab-I" href="#pane-I" className="nav-link" data-toggle="tab" role="tab">Infomation
                                    Technology</a>
                            </li>
                        </ul>
                        <div id="content" className="tab-content" role="tablist">
                            <div id="pane-A" className="card tab-pane fade show active" role="tabpanel" aria-labelledby="tab-A">
                                <div className="card-header" role="tab" id="heading-A">
                                    <h5 className="mb-0">
                                        {/** Note: `data-parent` removed from here */}
                                        <a data-toggle="collapse" href="#collapse-A" aria-expanded="true"
                                            aria-controls="collapse-A">Computer Science</a>
                                    </h5>
                                </div>

                                { /**  Note: New place of `data-parent` */}
                                <div id="collapse-A" className="collapse show" data-parent="#content" role="tabpanel"
                                    aria-labelledby="heading-A">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img1.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo1.png" alt="" />
                                                        </div>
                                                        <h3>The University of Michigan Programming for Everybody (Getting
                                                            Started with Python)</h3>
                                                        <p>Stanford (SCHE)</p>
                                                        <span className="viwers">80,908 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img2.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>New York University Introduction to Networking</h3>
                                                        <p>MIT Sloan School of Management</p>
                                                        <span className="viwers">40,206 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img3.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>Amazon Web Services AWS Cloud Practitioner Essentials</h3>
                                                        <p>Yale SOM Executive Education</p>
                                                        <span className="viwers">30,202 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img4.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo4.png" alt="" />
                                                        </div>
                                                        <h3>The World Wide Web Consortium (W3C) JavaScript Introduction</h3>
                                                        <p>LSE</p>
                                                        <span className="viwers">20,927 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="pane-B" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-B">
                                <div className="card-header" role="tab" id="heading-B">
                                    <h5 className="mb-0">
                                        <a className="collapsed" data-toggle="collapse" href="#collapse-B" aria-expanded="false"
                                            aria-controls="collapse-B">Data Science</a>
                                    </h5>
                                </div>
                                <div id="collapse-B" className="collapse" data-parent="#content" role="tabpanel"
                                    aria-labelledby="heading-B">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img1.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo1.png" alt="" />
                                                        </div>
                                                        <h3>The University of Michigan Programming for Everybody (Getting
                                                            Started with Python)</h3>
                                                        <p>Stanford (SCHE)</p>
                                                        <span className="viwers">80,908 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img2.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>New York University Introduction to Networking</h3>
                                                        <p>MIT Sloan School of Management</p>
                                                        <span className="viwers">40,206 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img3.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>Amazon Web Services AWS Cloud Practitioner Essentials</h3>
                                                        <p>Yale SOM Executive Education</p>
                                                        <span className="viwers">30,202 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img4.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo4.png" alt="" />
                                                        </div>
                                                        <h3>The World Wide Web Consortium (W3C) JavaScript Introduction</h3>
                                                        <p>LSE</p>
                                                        <span className="viwers">20,927 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="pane-C" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-C">
                                <div className="card-header" role="tab" id="heading-C">
                                    <h5 className="mb-0">
                                        <a className="collapsed" data-toggle="collapse" href="#collapse-C" aria-expanded="false"
                                            aria-controls="collapse-C">Business</a>
                                    </h5>
                                </div>
                                <div id="collapse-C" className="collapse" role="tabpanel" data-parent="#content"
                                    aria-labelledby="heading-C">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img1.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo1.png" alt="" />
                                                        </div>
                                                        <h3>The University of Michigan Programming for Everybody (Getting
                                                            Started with Python)</h3>
                                                        <p>Stanford (SCHE)</p>
                                                        <span className="viwers">80,908 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img2.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>New York University Introduction to Networking</h3>
                                                        <p>MIT Sloan School of Management</p>
                                                        <span className="viwers">40,206 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img3.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>Amazon Web Services AWS Cloud Practitioner Essentials</h3>
                                                        <p>Yale SOM Executive Education</p>
                                                        <span className="viwers">30,202 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img4.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo4.png" alt="" />
                                                        </div>
                                                        <h3>The World Wide Web Consortium (W3C) JavaScript Introduction</h3>
                                                        <p>LSE</p>
                                                        <span className="viwers">20,927 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="pane-D" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-D">
                                <div className="card-header" role="tab" id="heading-D">
                                    <h5 className="mb-0">
                                        <a className="collapsed" data-toggle="collapse" href="#collapse-D" aria-expanded="false"
                                            aria-controls="collapse-D">Healthcare</a>
                                    </h5>
                                </div>
                                <div id="collapse-D" className="collapse" role="tabpanel" data-parent="#content"
                                    aria-labelledby="heading-D">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img1.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo1.png" alt="" />
                                                        </div>
                                                        <h3>The University of Michigan Programming for Everybody (Getting
                                                            Started with Python)</h3>
                                                        <p>Stanford (SCHE)</p>
                                                        <span className="viwers">80,908 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img2.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>New York University Introduction to Networking</h3>
                                                        <p>MIT Sloan School of Management</p>
                                                        <span className="viwers">40,206 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img3.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>Amazon Web Services AWS Cloud Practitioner Essentials</h3>
                                                        <p>Yale SOM Executive Education</p>
                                                        <span className="viwers">30,202 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img4.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo4.png" alt="" />
                                                        </div>
                                                        <h3>The World Wide Web Consortium (W3C) JavaScript Introduction</h3>
                                                        <p>LSE</p>
                                                        <span className="viwers">20,927 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="pane-E" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-E">
                                <div className="card-header" role="tab" id="heading-E">
                                    <h5 className="mb-0">
                                        <a className="collapsed" data-toggle="collapse" href="#collapse-E" aria-expanded="false"
                                            aria-controls="collapse-E">Communication</a>
                                    </h5>
                                </div>
                                <div id="collapse-E" className="collapse" role="tabpanel" data-parent="#content"
                                    aria-labelledby="heading-E">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img1.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo1.png" alt="" />
                                                        </div>
                                                        <h3>The University of Michigan Programming for Everybody (Getting
                                                            Started with Python)</h3>
                                                        <p>Stanford (SCHE)</p>
                                                        <span className="viwers">80,908 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img2.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>New York University Introduction to Networking</h3>
                                                        <p>MIT Sloan School of Management</p>
                                                        <span className="viwers">40,206 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img3.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>Amazon Web Services AWS Cloud Practitioner Essentials</h3>
                                                        <p>Yale SOM Executive Education</p>
                                                        <span className="viwers">30,202 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img4.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo4.png" alt="" />
                                                        </div>
                                                        <h3>The World Wide Web Consortium (W3C) JavaScript Introduction</h3>
                                                        <p>LSE</p>
                                                        <span className="viwers">20,927 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="pane-F" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-F">
                                <div className="card-header" role="tab" id="heading-F">
                                    <h5 className="mb-0">
                                        <a className="collapsed" data-toggle="collapse" href="#collapse-F" aria-expanded="false"
                                            aria-controls="collapse-F">Social Science</a>
                                    </h5>
                                </div>
                                <div id="collapse-F" className="collapse" role="tabpanel" data-parent="#content"
                                    aria-labelledby="heading-F">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img1.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo1.png" alt="" />
                                                        </div>
                                                        <h3>The University of Michigan Programming for Everybody (Getting
                                                            Started with Python)</h3>
                                                        <p>Stanford (SCHE)</p>
                                                        <span className="viwers">80,908 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img2.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>New York University Introduction to Networking</h3>
                                                        <p>MIT Sloan School of Management</p>
                                                        <span className="viwers">40,206 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img3.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>Amazon Web Services AWS Cloud Practitioner Essentials</h3>
                                                        <p>Yale SOM Executive Education</p>
                                                        <span className="viwers">30,202 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img4.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo4.png" alt="" />
                                                        </div>
                                                        <h3>The World Wide Web Consortium (W3C) JavaScript Introduction</h3>
                                                        <p>LSE</p>
                                                        <span className="viwers">20,927 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="pane-G" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-G">
                                <div className="card-header" role="tab" id="heading-G">
                                    <h5 className="mb-0">
                                        <a className="collapsed" data-toggle="collapse" href="#collapse-G" aria-expanded="false"
                                            aria-controls="collapse-G">Health</a>
                                    </h5>
                                </div>
                                <div id="collapse-G" className="collapse" role="tabpanel" data-parent="#content"
                                    aria-labelledby="heading-G">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img1.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo1.png" alt="" />
                                                        </div>
                                                        <h3>The University of Michigan Programming for Everybody (Getting
                                                            Started with Python)</h3>
                                                        <p>Stanford (SCHE)</p>
                                                        <span className="viwers">80,908 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img2.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>New York University Introduction to Networking</h3>
                                                        <p>MIT Sloan School of Management</p>
                                                        <span className="viwers">40,206 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img3.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>Amazon Web Services AWS Cloud Practitioner Essentials</h3>
                                                        <p>Yale SOM Executive Education</p>
                                                        <span className="viwers">30,202 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img4.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo4.png" alt="" />
                                                        </div>
                                                        <h3>The World Wide Web Consortium (W3C) JavaScript Introduction</h3>
                                                        <p>LSE</p>
                                                        <span className="viwers">20,927 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="pane-H" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-H">
                                <div className="card-header" role="tab" id="heading-H">
                                    <h5 className="mb-0">
                                        <a className="collapsed" data-toggle="collapse" href="#collapse-H" aria-expanded="false"
                                            aria-controls="collapse-H">Cloud</a>
                                    </h5>
                                </div>
                                <div id="collapse-H" className="collapse" role="tabpanel" data-parent="#content"
                                    aria-labelledby="heading-H">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img1.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo1.png" alt="" />
                                                        </div>
                                                        <h3>The University of Michigan Programming for Everybody (Getting
                                                            Started with Python)</h3>
                                                        <p>Stanford (SCHE)</p>
                                                        <span className="viwers">80,908 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img2.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>New York University Introduction to Networking</h3>
                                                        <p>MIT Sloan School of Management</p>
                                                        <span className="viwers">40,206 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img3.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>Amazon Web Services AWS Cloud Practitioner Essentials</h3>
                                                        <p>Yale SOM Executive Education</p>
                                                        <span className="viwers">30,202 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img4.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo4.png" alt="" />
                                                        </div>
                                                        <h3>The World Wide Web Consortium (W3C) JavaScript Introduction</h3>
                                                        <p>LSE</p>
                                                        <span className="viwers">20,927 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="pane-I" className="card tab-pane fade" role="tabpanel" aria-labelledby="tab-I">
                                <div className="card-header" role="tab" id="heading-I">
                                    <h5 className="mb-0">
                                        <a className="collapsed" data-toggle="collapse" href="#collapse-I" aria-expanded="false"
                                            aria-controls="collapse-I">Infomation Technology</a>
                                    </h5>
                                </div>
                                <div id="collapse-I" className="collapse" role="tabpanel" data-parent="#content"
                                    aria-labelledby="heading-I">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img1.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo1.png" alt="" />
                                                        </div>
                                                        <h3>The University of Michigan Programming for Everybody (Getting
                                                            Started with Python)</h3>
                                                        <p>Stanford (SCHE)</p>
                                                        <span className="viwers">80,908 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img2.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>New York University Introduction to Networking</h3>
                                                        <p>MIT Sloan School of Management</p>
                                                        <span className="viwers">40,206 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img3.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo3.png" alt="" />
                                                        </div>
                                                        <h3>Amazon Web Services AWS Cloud Practitioner Essentials</h3>
                                                        <p>Yale SOM Executive Education</p>
                                                        <span className="viwers">30,202 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div className="populer-box">
                                                    <div className="img-tham">
                                                        <img src="images/popular-img4.jpg" alt="" />
                                                    </div>
                                                    <div className="text-box">
                                                        <div className="clg-box">
                                                            <img src="images/clg-logo4.png" alt="" />
                                                        </div>
                                                        <h3>The World Wide Web Consortium (W3C) JavaScript Introduction</h3>
                                                        <p>LSE</p>
                                                        <span className="viwers">20,927 Viewers</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="explore-btn text-center">
                        <a href="#">Explore more Computer Science courses</a>
                    </div>
                </div>
            </div>
        </>
    )
}
