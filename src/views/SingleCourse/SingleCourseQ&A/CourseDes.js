import React from 'react'

export default function CourseDes() {
    return (
        <>
            <div className="single-course-bottom sec-bg">
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <div className="single-course-bottom-left">
                        <div className="single-course-tab">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link" id="course-description-tab" data-toggle="tab" href="#course-description" role="tab" aria-controls="course-description" aria-selected="true">Course Description </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false"> Reviews</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" id="q-a-tab" data-toggle="tab" href="#q-a" role="tab" aria-controls="q-a" aria-selected="false">Q&A</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade" id="course-description" role="tabpanel" aria-labelledby="course-description-tab">
                                    <h3>Course Description</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <h3>Key concepts covered include</h3>
                                    <ul>
                                        <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                        <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                        <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                        <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                        <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                    </ul>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>

                                    <div className="enroll-sec">
                                        <a href="#" className="sec-btn enroll-btn">Enroll Now</a>
                                        <h6>58,971 already enrolled</h6>
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                    <h3>Featured Review</h3>
                                    <div className="review-wrap">
                                        <div className="review-box">
                                            <ul className="rating">
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                            </ul>
                                            <h5>By Rahul, Feb 28, 2020</h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                        </div>
                                        <div className="review-box">
                                            <ul className="rating">
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                            </ul>
                                            <h5>By Rahul, Feb 28, 2020</h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                        </div>
                                        <div className="review-box">
                                            <ul className="rating">
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                            </ul>
                                            <h5>By Rahul, Feb 28, 2020</h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                        </div>
                                        <div className="review-box">
                                            <ul className="rating">
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                            </ul>
                                            <h5>By Rahul, Feb 28, 2020</h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                        </div>
                                    </div>
                                    <div className="tab-btnarea">
                                        <a href="#" className="sec-btn comment-add-btn">Add Comment</a>
                                        <a href="#" className="sec-btn sec-btn-border">View All reviews</a>
                                    </div>

                                    <div className="enroll-sec">
                                        <a href="#" className="sec-btn enroll-btn">Enroll Now</a>
                                        <h6>58,971 already enrolled</h6>
                                    </div>
                                </div>
                                <div className="tab-pane fade show active" id="q-a" role="tabpanel" aria-labelledby="q-a-tab">
                                   <h3>Question and Answers</h3>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="single-course-bottom-right">
                        <h3>Course content</h3>
                        <div className="course-content">
                            <div className="accordion">
                                <div className="card">
                                    <div className="card-header" id="coursehead1">
                                        <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#course1" aria-expanded="true" aria-controls="course1">
                                            <span>Getting Started
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>
                                    </div>
                                    <div id="course1" className="collapse show" aria-labelledby="coursehead1" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                            <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="coursehead2">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course2" aria-expanded="true" aria-controls="course2">
                                            <span>Navigatuing users with stule
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>
                                    </div>

                                    <div id="course2" className="collapse" aria-labelledby="coursehead2" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="coursehead3">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course3" aria-expanded="true" aria-controls="course3">
                                            <span>Navigatuing users with stule
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>

                                    </div>

                                    <div id="course3" className="collapse" aria-labelledby="coursehead3" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="coursehead4">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course4" aria-expanded="true" aria-controls="course4">
                                            <span>Navigatuing users with stule
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>
                                    </div>

                                    <div id="course4" className="collapse" aria-labelledby="coursehead4" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header" id="faqhead5">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq5" aria-expanded="true" aria-controls="faq5">
                                            <span>Working with content
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>

                                    </div>

                                    <div id="faq5" className="collapse" aria-labelledby="faqhead5" data-parent="#faq">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="coursehead6">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course6" aria-expanded="true" aria-controls="course6">
                                            <span>List building with style
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>
                                    </div>

                                    <div id="course6" className="collapse" aria-labelledby="coursehead6" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="coursehead7">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course7" aria-expanded="true" aria-controls="course7">
                                            <span>Navigatuing users with stule
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>

                                    </div>

                                    <div id="course7" className="collapse" aria-labelledby="coursehead7" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="coursehead8">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course8" aria-expanded="true" aria-controls="course8">
                                            <span>How to handle screen layout
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>
                                    </div>

                                    <div id="course8" className="collapse" aria-labelledby="coursehead8" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header" id="coursehead9">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course9" aria-expanded="true" aria-controls="course9">
                                            <span>How to handle screen layout
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>

                                    </div>

                                    <div id="course9" className="collapse" aria-labelledby="coursehead9" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="coursehead10">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course10" aria-expanded="true" aria-controls="course10">
                                            <span>Using out side API
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>
                                    </div>

                                    <div id="course10" className="collapse" aria-labelledby="coursehead10" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header" id="coursehead11">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course11" aria-expanded="true" aria-controls="course11">
                                            <span>Making hooks
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>
                                    </div>

                                    <div id="course11" className="collapse" aria-labelledby="coursehead11" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="coursehead12">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course12" aria-expanded="true" aria-controls="course12">
                                            <span>How to handle screen layout
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>

                                    </div>

                                    <div id="course12" className="collapse" aria-labelledby="coursehead12" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="card">
                                    <div className="card-header" id="coursehead13">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course13" aria-expanded="true" aria-controls="course13">
                                            <span>Working with content
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>
                                    </div>

                                    <div id="course13" className="collapse" aria-labelledby="coursehead13" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="coursehead14">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course14" aria-expanded="true" aria-controls="course14">
                                            <span>Navigatuing users with stule
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>

                                    </div>

                                    <div id="course14" className="collapse" aria-labelledby="coursehead14" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="coursehead15">
                                        <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#course15" aria-expanded="true" aria-controls="course15">
                                            <span>Making hooks
                                            </span>
                                            <i> 11 lectures . 24 min</i>
                                        </a>

                                    </div>

                                    <div id="course15" className="collapse" aria-labelledby="coursehead15" data-parent="#course">
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim
                                                 <div className="course-content-accordian-bottom">

                                                <select className="form-control">
                                                    <option>Select File Type</option>
                                                    <option>type 1</option>
                                                    <option>type 2</option>
                                                  
                                                </select>
                                            
                                                    <a href="#" className="sec-btn sec-btn-orange">Download Attachments</a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
