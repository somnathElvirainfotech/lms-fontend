
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
import TaskService from "../services/TaskService";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SingleTask() {

    let query = useQuery();
    //console.log(query.get("id"));
    const { user } = useContext(AuthContext);
    const [input, setInput] = useState({});
    const [chkComment, setChkComment] = useState(true);


    const [course, setCourses] = useState({});

    // to store all the enrollment
    const [assignment, setAssignments] = useState([]);


    const [chap, setChap] = useState([]);
    const [less, setLess] = useState([]);



    var setLession = (e) => {
        console.log(e)
        //   setLess()
    }

    // // to store selected course
    const [selectedCourse, setSelectedCourse] = useState('');
    const [creatorId, setCreatorId] = useState('');
    const [courseID, setCourseID] = useState([]);

    const [review, setReview] = useState([]);

    var handler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({ ...values, [name]: value }))
    }


    useEffect(async () => {
        var course = query.get("id");

        setCourseID(course);
        chkUserReview();



        // get review
        var reviews = await CommentRatingService.getByCourseIdTask(course, 5)
        setReview([...reviews.data.data])



        var responce = await TaskService.getOne(course);
        var temp = responce.data.data;
        //console.log(temp);

        setCourses(temp[0]);





    }, []);




    // rating
    const thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: 0,
        color: "grey",
        activeColor: "#ebc934",
        onChange: newValue => {
            console.log(`Example 3: new value is ${newValue}`);
            input.rating = newValue;
        }
    };


    var closeModal = () => {
        input.comment = '';
        input.rating = '';
    }

    var ratingCreate = async () => {

        if (input.rating == 0) {
            alert(44444)
        }

        var course_id = query.get("id");

        var data = new FormData();
        data.append("user_id", user.user_id)
        data.append("task_id", course_id)
        data.append("rating_number", input.rating)
        data.append("comment", input.comment)

        var responce = await CommentRatingService.createTask(data);

        console.log(responce.data)

        input.comment = '';
        input.rating = '';
        setChkComment(!responce.data)




        // get review
        var reviews = await CommentRatingService.getByCourseIdTask(course_id, 5)
        setReview([...reviews.data.data])


    }

    var chkUserReview = async () => {
        // user chk reviews
        var task = query.get("id");
        var data = {
            user_id: user.user_id,
            task_id: task
        }
        var reviews = await CommentRatingService.statusTask(data)
        console.log(333333, reviews.data)
        setChkComment(reviews.data.status)
    }


    // to store selected enrollment
    const [selectedAssignments, setSelectedAssignments] = useState([]);

    async function assignmentid() {
        var course = query.get("id");

        if (user.token) {
            var assignmentresponce = await UserService.assignmentcourse(user.user_id, course);

            setEnrollments(assignmentresponce.data.status);

            // https://appdividend.com/2019/09/21/laravel-6-validation-example-validation-in-laravel-tutorial/            console.log(assignmentresponce.data);

        }



        //console.log(enrollmentresponce.data);
    }

    // to store all the enrollment
    const [enrollment, setEnrollments] = useState();

    // to store selected enrollment
    const [selectedEnrollments, setSelectedEnrollments] = useState([]);

    async function enrollmentid() {
        var course = query.get("id");

        if (user.token) {
            var enrollmentresponce = await UserService.enrollment(user.user_id, course);
            setEnrollments(enrollmentresponce.data.status);

            var assignmentresponce = await UserService.assignmentcourse(user.user_id, course);
            setAssignments(assignmentresponce.data.data);
        }



        //console.log(enrollmentresponce.data);
    }


    const [enrollmentcourse, setEnrollmentcourses] = useState([]);
    const [selectedEnrollmentcourses, setSelectedEnrollmentcourses] = useState('');




    const [vedioPlayer, setVedioPlayer] = useState('');

    var setVedio = (value) => {
        setVedioPlayer(value)
    }


    return (
        <React.Fragment>
            <Header />
            <div className="inner-banner">
                <img src="images/inner-banner.png" alt="" />
                <div className="desc">
                    <div className="container">
                        <div className="text">
                            <h1>Single Task</h1>
                            <div className="breadcrumb">
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li>Single Task</li>
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
                            <h5>{course.task_name}</h5>
                        </div>
                    </div>
                </div>
            </div>




            <div className="single-course-bottom sec-bg">
                <div className="container">
                    <div className="row">

                        <div className="col-sm-12">
                            <iframe height="460px" className="col-sm-12 border border-danger p-2" src={course.file_name} ></iframe>
                        </div>

                        <div className="col-md-7 mt-3">


                            <div className="single-course-bottom-left">
                                <div className="single-course-tab">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="course-description-tab" data-toggle="tab" href="#course-description" role="tab" aria-controls="course-description" aria-selected="true">Course Description </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false"> Reviews</a>
                                        </li>
                                        {user.token &&
                                            <li className="nav-item">
                                                <a className="nav-link" id="q-a-tab" data-toggle="tab" href="#q-a" role="tab" aria-controls="q-a" aria-selected="false">Q&A</a>
                                            </li>
                                        }
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="course-description" role="tabpanel" aria-labelledby="course-description-tab" >
                                            <h3>Course Description</h3>
                                            <p>{course.task_describtion}</p>

                                            <h3></h3>
                                            {/**  <ul>
                                                <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                                <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                                <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                                <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                                <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p> */}



                                        </div>
                                        <div className="tab-pane fade" id="reviews" role="tabpanel" aria-ladivbelledby="reviews-tab">
                                            <h3>Featured Review</h3>
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




                                                {/**      <div className="review-box">
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
                                                */}


                                            </div>
                                            <div className="tab-btnarea">
                                                {chkComment ? <button href="#" className="sec-btn comment-add-btn" data-toggle="modal" data-target="#addgroupModal">Add Comment</button> : ''}
                                                <a href={`/allreviewtask?id=${courseID}`} className="sec-btn sec-btn-border">View All reviews</a>
                                            </div>

                                            {/**   <div className="enroll-sec">
                                                <h6>58,971 already enrolled</h6>
                                            </div>  */}
                                        </div>

                                        {user.token && <div className="tab-pane fade show " id="q-a" role="tabpanel" aria-labelledby="q-a-tab">
                                            <h3>Question and Answers</h3>

                                        </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>

                </div>
            </div>





            {/** rating */}

            {chkComment && <div className="modal fade" id="addgroupModal" tabindex="-1" role="dialog" aria-labelledby="addgroupModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">

                            <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>


                        </div>
                        <div className="modal-body">
                            <div className="data-table user-table">
                                <div className="table-responsive">

                                    <table className="table table-responsive">

                                        <tbody>
                                            <tr>
                                                <td width="800px">
                                                    <ReactStars {...thirdExample} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="table table-responsive">

                                        <tbody>


                                            <tr>
                                                <td width="800px" >
                                                    <textarea onChange={handler} value={input.comment}
                                                        name="comment" required placeholder="comment ..." className="form-control" id="exampleFormControlTextarea1" rows="300" />
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="edit-btn" data-dismiss="modal" onClick={ratingCreate}>Submit </button>
                            <button onClick={closeModal} type="button" className="delete-btn" data-dismiss="modal" >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            }




            <Footer />
        </React.Fragment>

    )
}
