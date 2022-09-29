
import React from "react";

import Header from './Common/Header/Header';
import Footer from './Common/Footer/Footer';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import UserService from '../services/UserService'
import { AuthContext } from '../index';
import ReactStars from "react-rating-stars-component";

import CommentRatingService from "../services/CommentRatingService";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function AllRatingTask() {

    let query = useQuery();

    const { user } = useContext(AuthContext);


    const [review, setReview] = useState([]);
    const [courseId, setCourseId] = useState();




    useEffect(async () => {
        var course_id = query.get("id");
        setCourseId(course_id)


        // get review task
        var reviews = await CommentRatingService.getByCourseIdTask(course_id, 0)
        setReview([...reviews.data.data])
        console.log(reviews.data);



    }, []);



    return (
        <React.Fragment>
            <Header />
            <div className="inner-banner">
                <img src="images/inner-banner.png" alt="" />
                <div className="desc">
                    <div className="container">
                        <div className="text">
                            <h1>View All reviews </h1>
                            <div className="breadcrumb">
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li> reviews </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div className="single-course-top">
                <div className="container">
                    <div className="media align-items-center">
                        <img src="images/university-logo.png" alt="" />
                        <div className="media-body ml-3">
                            <span>Professional Certificate in I Last updated 01-2022</span>

                        </div>
                    </div>
                </div>
            </div>




            <div className="single-course-bottom sec-bg">
                <div className="container">
                    <div className="row">

                        <div className="col-md-12">


                            <div className="single-course-bottom-left">
                                <div className="single-course-tab">

                                    <div className="tab-content" id="myTabContent">

                                        <div className="tab-pane fade show active " id="reviews" role="tabpanel" aria-ladivbelledby="reviews-tab">
                                            <h3>View All Review  &nbsp; &nbsp;  <a href={`singletask?id=${courseId}`} className="sec-btn" >Back</a> </h3>
                                            <div className="review-wrap">

                                                {/** reviews  section */}


                                                {review && review.map(item =>

                                                    <div className="review-box">
                                                        <ul className="rating">
                                                            {item.rating_number == 1 &&
                                                                <>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </>
                                                            }

                                                            {item.rating_number == 2 &&
                                                                <>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </>
                                                            }

                                                            {item.rating_number == 3 &&
                                                                <>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </>
                                                            }

                                                            {item.rating_number == 4 &&
                                                                <>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </>
                                                            }

                                                            {item.rating_number == 5 &&
                                                                <>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </>
                                                            }





                                                        </ul>
                                                        <h5>{item.fullname.toUpperCase()}, {new Date(item.date_at).toDateString()}</h5>
                                                        <p>{item.comment}.</p>
                                                    </div>

                                                )}








                                            </div>

                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>

                </div>
            </div>







            <Footer />
        </React.Fragment>

    )
}
