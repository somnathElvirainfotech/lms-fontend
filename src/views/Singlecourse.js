
import React from "react";

import Header from './Common/Header/Header';
import Footer from './Common/Footer/Footer';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useLocation, useParams } from "react-router-dom";
import UserService from '../services/UserService'
import { AuthContext } from '../index';
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import CommentRatingService from "../services/CommentRatingService";
import ReactPlayer from 'react-player/lazy';
import { Markup } from 'interweave';
import CourseTrackService from "../services/CourseTrackService";
// const getDuration = require('get-video-duration');
import XapiService from '../services/XapiService';
import UserTaskService from "../services/UserTaskService";
import { toast } from "react-toastify";
import QnsAnsComment from "./QnsAnsComment";
import { setCookie, getCookie, removeCookie } from '../middleware/CookieSetup';
import SingleXapiModal from "./SingleXapiModal";

// loader 
import Loader from "./Loader";


// languages
import English from "./ConverLanguages/English";
import SerbianCyrilic from "./ConverLanguages/SerbianCyrilic";
import SerbianLatin from "./ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from '../routes/routes';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Singlecourse() {

    // loader
    const [showLoader, setShowLoader] = useState(false);

    const [enrollStatus, setEnrollStatus] = useState('');

    let query = useQuery();
    var location = useLocation();
    var params = useParams();
    var paramsvalue = params.name.replaceAll("-", " ")
    const pathname = location.pathname;

    // const [singleCourseId,setSingleCourseId]=useState('');
    // const [taskId,setTaskId]=useState('');
    // const [courseType,setcourseType]=useState(''); 


    var { singleCourseId, taskId, courseType } = location.state != null ? location.state : { singleCourseId: 1 };





    console.log("params --- ", location.state)

    //    var singleCourseId=1;
    //    var taskId=1;

    // alert(singleCourseId)

    //console.log(query.get("id"));
    const { user } = useContext(AuthContext);
    const [input, setInput] = useState({});
    const [chkComment, setChkComment] = useState(true);


    // view for show course lesson
    const [view, setView] = useState({});


    const [course, setCourses] = useState({});

    // to store all the enrollment
    const [assignment, setAssignments] = useState([]);


    const [chap, setChap] = useState([]);
    const [less, setLess] = useState([]);

    const [vedioType, setVedioType] = useState('');

    var setLession = (e) => {
        console.log(e)
        //   setLess()
    }

    // // to store selected course
    const [selectedCourse, setSelectedCourse] = useState('');
    const [creatorId, setCreatorId] = useState('');
    const [courseID, setCourseID] = useState([]);

    const [review, setReview] = useState([]);
    const [singleReview, setSingleReview] = useState([]);
    const [singleReviewId, setSingleReviewId] = useState();

    const [trackLessions, setTrackLessions] = useState([]);

    var handler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({ ...values, [name]: value }))
    }





    useEffect(() => {

        console.log("course id ==== ", singleCourseId);





        (async () => {



            setShowLoader(true)

            if (location.state == null) {
                var data = await UserService.singlecourseByName(paramsvalue);
                singleCourseId = data.data.data.id
            }



            var course = query.get("id");

            setCourseID(singleCourseId);

            getTrackingLessions();

            getCurrentLesson();

            // xapi call
            //getXapiData();


            if (user.token) {
                var assignmentresponce = await UserService.assignmentcourse(user.user_id, singleCourseId);
                setAssignments(assignmentresponce.data.data);
            }

            var data = {
                user_id: user.user_id,
                course_id: singleCourseId
            }

            if (user.token) {
                var commentStatus = await CommentRatingService.status(data)
                setChkComment(commentStatus.data.status)
            }

            // get review
            var reviews = await CommentRatingService.getByCourseId(singleCourseId, '', 5)
            setReview([...reviews.data.data])

            if (user.token) {
                var creviews = await CommentRatingService.getByCourseId(singleCourseId, user.user_id, 5)
                console.log(creviews.data);
                setSingleReview([...creviews.data.data])
            }


            var responce = await UserService.singlecourse(singleCourseId);
            var temp = responce.data.data;

            console.log("course details", responce.data)

            setCreatorId(temp.creator_id)
            setCourses(temp);
            setChap(temp.chapters)

            if (user.token) {
                chkAllGroups(temp.group_details);
            }


            if (user.token) {
                var enrollRes = await UserService.enrollmentcourse(user.user_id, singleCourseId);
                var status = false;
                console.log("enrolllll  ", enrollRes.data)
                if (enrollRes.data.status) {
                    setEnrollStatus(enrollRes.data.data[0].enrollment_status == "completed" ? "completed" : '')
                    if (enrollRes.data.data[0].user_enroll_status == 'active') {
                        status = true;
                    }
                }



                setEnrollments(status);



                // gotoPage(status, temp.course_type, temp.xapi_attachment_file, temp.creator_id)
            }

            setShowLoader(false)
        })()





    }, []);




    function gotoPage(enroll, course_type, file_path, creator_id) {
        console.log("dddddd", creator_id);
        if (enroll && course_type == "xapi" || user.user_role == 2 && course_type == "xapi" || user.user_role == 4 && creator_id == user.user_id && course_type == "xapi" || user.user_role == 1 && course_type == "xapi") {
            window.open(`/singlexapi?link=${btoa(file_path)}`, '_blank');
        }
    }




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
        setShowLoader(true)
        if (input.rating == 0) {
            alert(44444)
        }

        var course_id = query.get("id");

        var data = new FormData();
        data.append("user_id", user.user_id)
        data.append("course_id", singleCourseId)
        data.append("rating_number", input.rating)
        data.append("comment", input.comment)

        var responce = await CommentRatingService.create(data);

        console.log(responce.data)

        input.comment = '';
        input.rating = '';

        document.getElementById("myForm").reset();
        setChkComment(!responce.data)

        // get review
        var reviews = await CommentRatingService.getByCourseId(singleCourseId, '', 5)
        setReview([...reviews.data.data])
        console.log("lllllllllllllllll:", reviews.data);
        var creviews = await CommentRatingService.getByCourseId(singleCourseId, user.user_id, 5)
        setSingleReview([...creviews.data.data])

        setShowLoader(false)
    }


    // to store selected enrollment
    const [selectedAssignments, setSelectedAssignments] = useState([]);

    async function assignmentid() {
        var course = query.get("id");

        if (user.token) {
            var assignmentresponce = await UserService.assignmentcourse(user.user_id, singleCourseId);

            setEnrollments(assignmentresponce.data.status);

            if (assignmentresponce.data.status)
                setEnrollStatus(assignmentresponce.data.data[0].enrollment_status == "completed" ? "completed" : '')


            // https://appdividend.com/2019/09/21/laravel-6-validation-example-validation-in-laravel-tutorial/            console.log(assignmentresponce.data);

        }



        //console.log(enrollmentresponce.data);
    }

    // to store all the enrollment
    const [enrollment, setEnrollments] = useState();
    const [chkGroups, setChkGroup] = useState(false);

    // check coourse and user group
    var chkAllGroups = (courseGroup) => {
        var Group = user.user_groups.split(",");
        var userGroup = Group.map(i => Number(i))
        setShowLoader(true)
        console.log("user group", userGroup);
        for (var item of courseGroup) {
            if (userGroup.includes(item.group_id)) {
                console.log(userGroup.includes(item.group_id));
                setChkGroup(true)
            }
        }

        setShowLoader(false)
        console.log(userGroup);
    }

    // to store selected enrollment
    const [selectedEnrollments, setSelectedEnrollments] = useState([]);

    async function enrollmentid(file_path, course_type) {
        // var courseID = query.get("id");

        setShowLoader(true)

        if (user.token) {
            var enrollmentresponce = await UserService.enrollment(user.user_id, singleCourseId);
            setEnrollments(enrollmentresponce.data.status);

            console.log("eeeeeeeeeEE", enrollmentresponce.data);
            // if (enrollmentresponce.data.status)
            //     setEnrollStatus(enrollmentresponce.data.data[0].enrollment_status == "completed" ? "completed" : '')

            var assignmentresponce = await UserService.assignmentcourse(user.user_id, singleCourseId);
            setAssignments(assignmentresponce.data.data);

            console.log("lkkkk", course);

            if (enrollmentresponce.data.status) {
                setShowLoader(false)
                toast.success("Enroll successfully")
            }

            if (course_type == "xapi") {
                if (taskId) {
                    setShowLoader(true)
                    var aa = await UserTaskService.create({ user_id: user.user_id, task_id: taskId, no_attempted: 1 })
                    if (aa.data.status)
                        setShowLoader(false);
                }

                setXapiLink(file_path)

                // setCookie("xapi_result_name", course.xapi_file_name)
                // window.open(`/singlexapi?link=${btoa(file_path)}`, '_blank');
            }
        }



        //console.log(enrollmentresponce.data);
    }


    const [enrollmentcourse, setEnrollmentcourses] = useState([]);
    const [selectedEnrollmentcourses, setSelectedEnrollmentcourses] = useState('');




    const [vedioPlayer, setVedioPlayer] = useState('');
    const [tempV, setTempV] = useState('');

    // useEffect(() => {
    //     setVedioPlayer(tempV)
    //     alert(tempV)
    // }, [tempV])

    var [currentChapter, setCurrentChapter] = useState(0);
    var [currentLesson, setCurrentLesson] = useState(0);

    var setVedio = (value, type, lesson_name, less_details, chapter_name, chapter_id, lesson_id) => {
        setVedioPlayer(value);
        setVedioType(type);
        setCurrentChapter(chapter_id);
        setCurrentLesson(lesson_id);
        console.log("chapter ", chapter_id);
        console.log("lesson ", lesson_id);
        oneView({ chapter_name: chapter_name, lesson_name: lesson_name, lesson_details: less_details })
    }

    var delReview = async (id) => {
        setShowLoader(true)
        var course_id = query.get("id");
        var responce = await CommentRatingService.delete(id);
        if (responce.data.status) {

            // get review
            var reviews = await CommentRatingService.getByCourseId(singleCourseId, '', 5)
            setReview([...reviews.data.data])
            console.log("lllllllllllllllll:", reviews.data);
            var creviews = await CommentRatingService.getByCourseId(singleCourseId, user.user_id, 5)
            setSingleReview([...creviews.data.data])
            setShowLoader(false)
            setChkComment(true)
        }
    }

    // view chapter lesson
    var oneView = (data) => {
        setView(data)
        // console.log(data);
    }

    var style1 = {
        color: "#023e86",
        fontWeight: "600",
        marginBottom: "15px"
    }

    var style2 = {
        color: "black",
    }

    var styleDesc = {
        fontSize: "medium",
        color: "black",
        fontWeight: "300",
    }

    // player tracking
    const [progress, setProgress] = useState({});
    const [duration, setDuration] = useState(0);
    const [completeData, setCompleteData] = useState({
        percentage: 0,
        currentChapter: 0,
        currentLesson: 0,
        currentPlaySec: 0
    });


    var playerProgress = (e) => {

        setProgress({ ...e })

        console.log("run time ", e);

    }

    var playerEnded = () => {

        var course_id = query.get("id");

        var payload = {
            user_id: user.user_id,
            course_id: singleCourseId,
            chapter_id: currentChapter,
            lesson_id: currentLesson,
            lesson_percentage: 100,
            current_play_sec: duration
        }

        courseTracking(payload);
        console.log("complete data  ", payload);
    }

    var playerPaused = () => {



        var course_id = query.get("id");

        var payload = {
            user_id: user.user_id,
            course_id: singleCourseId,
            chapter_id: currentChapter,
            lesson_id: currentLesson,
            lesson_percentage: Math.round((progress.playedSeconds / duration) * 100),
            current_play_sec: Number(progress.playedSeconds).toFixed(2)
        }

        console.log("paused ", payload);
        courseTracking(payload);
        setCompleteData({ ...payload });

    }


    var playerSeek = (stime) => {

        var payload = {
            percentage: Math.round((stime / duration) * 100),
            currentChapter: currentChapter,
            currentLesson: currentLesson,
            currentPlaySec: Number(stime).toFixed(2)
        }

        console.log("seek ", payload);
        setCompleteData({ ...payload });
    }

    var courseTracking = async (payload) => {

        if (user.user_role == 5) {

            var dresponse = await CourseTrackService.regularCourseTrack(payload)
            console.log(dresponse.data);


            // getTrackingLessions()

            // var responce = await UserService.singlecourse(payload.course_id);
            // var temp = responce.data.data;

            // console.log(responce.data)

            // setCreatorId(temp.creator_id)
            // setCourses(temp);
            // setChap(temp.chapters)

            // getTrackingLessions();
        }
    }


    var getTrackingLessions = async () => {

        if (user.user_role == 5) {
            setShowLoader(true)
            var course_id = query.get("id");

            var payload = {
                user_id: user.user_id,
                course_id: singleCourseId,
            }

            var responce = await CourseTrackService.getTrackingLession(payload)
            setTrackLessions(responce.data.data)
            setShowLoader(false)
        }
    }


    const [currentActiveLesson, setCurrentActiveLesson] = useState({});


    var getCurrentLesson = async () => {

        if (user.user_role == 5) {
            setShowLoader(true)
            var course_id = query.get("id");

            var payload = {
                user_id: user.user_id,
                course_id: singleCourseId,
            }

            var response = await CourseTrackService.getCurrentLession(payload)
            setShowLoader(false)
            console.log(response.data);
            setCurrentActiveLesson(response.data.data[0])

        }
    }


    const { languageList } = useContext(LangContext);
    const [langObj, setLangObj] = useState({});

    useEffect(() => {

        if (languageList.language_name === "1") {
            setLangObj(English)
        } else if (languageList.language_name === "2") {
            setLangObj(SerbianCyrilic)
        } else if (languageList.language_name === "3") {
            setLangObj(SerbianLatin)
        }

    }, [languageList.language_name]);

    var [xapiLink, setxapiLink] = useState('');
    var setXapiLink = (link) => {
        setxapiLink(link)
    }


    return (
        <React.Fragment>

            {/** loader */}
            {showLoader && <Loader />}

            <div className="inner-banner">
                <img src="/images/inner-banner.png" alt="" />
                <div className="desc">
                    <div className="container">
                        <div className="text">
                            <h1>Single Courses</h1>
                            <div className="breadcrumb">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li>Single Courses</li>
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
                            <h5>{course.course_name && course.course_name.toUpperCase()}</h5>
                        </div>
                    </div>
                </div>
            </div>




            <div className="single-course-bottom sec-bg">
                <div className="container">
                    <div className="row">

                        {course.course_type == "xapi" && enrollment || course.course_type == "xapi" && user.user_role == 1 || course.course_type == "xapi" && user.user_role == 2 || course.course_type == "xapi" && user.user_role == 4 && user.user_id == creatorId ?
                            <div className="col-sm-12 mb-3">

                                {/**  <Link to="/singlexapi" className="sec-btn" state={{ vedio: course.xapi_attachment_file }} target="_blank" >dddddddddd</Link> */}

                                {/**    <a href={`/singlexapi?link=${btoa(course.xapi_attachment_file)}`} target="__blank" className="sec-btn" onClick={() => { setCookie("xapi_result_name", course.xapi_file_name) }}  >VIEW COURSE</a> */}

                                <button
                                    className="sec-btn"
                                    data-toggle="modal"
                                    data-target="#modal-fullscreen-xl"
                                    data-backdrop="static"
                                    data-keyboard="false"
                                    onClick={() => setXapiLink(course.xapi_attachment_file)}
                                >
                                    VIEW COURSE
                                </button>

                            </div>
                            : ''}




                        <div className="col-md-7">

                            {vedioPlayer && course.course_type == "regular" &&

                                <div className="row mb-3">
                                    <div className="col-sm-12">
                                        <ReactPlayer config={{
                                            file: {
                                                attributes: {
                                                    controlsList: 'nodownload'
                                                }
                                            }
                                        }} onSeek={e => playerSeek(e)} onDuration={e => setDuration(e)} onEnded={playerEnded} onPause={playerPaused} onProgress={playerProgress} url={vedioPlayer} playing={true} controls={true} width="100%" height="340px"></ReactPlayer>
                                    </div>
                                </div>
                            }

                            {view && <div className="container">
                                <div className="row">

                                    <div className="col-sm-12">
                                        <div className="ft-box">
                                            {view.chapter_name && <li><h3 style={style1}>Chapter Name: <span style={style2}>{view.chapter_name.toUpperCase()} </span></h3></li>}
                                            <ul>
                                                {view.lesson_name && <li><h4 style={style1} >Lesson Name:<span style={style2}>{view.lesson_name.toUpperCase()}</span></h4></li>}
                                                {view.lesson_details && <li><h5 style={style1} >Lesson Description:<span style={styleDesc}><Markup content={view.lesson_details} /></span></h5></li>}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>}



                            <div className="single-course-bottom-left">
                                <div className="single-course-tab">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="course-description-tab" data-toggle="tab" href="#course-description" role="tab" aria-controls="course-description" aria-selected="true">{langObj.course_description} </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false"> {langObj.reviews}</a>
                                        </li>
                                        {user.token &&
                                            <li className="nav-item">
                                                <a className="nav-link" id="q-a-tab" data-toggle="tab" href="#q-a" role="tab" aria-controls="q-a" aria-selected="false">Q&A</a>
                                            </li>
                                        }
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="course-description" role="tabpanel" aria-labelledby="course-description-tab" >
                                            <h3>{langObj.course_description}</h3>
                                            <Markup content={course.long_description} />

                                            {/**  <ul>
                                                <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                                <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                                <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                                <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                                <li><i className="fa fa-check-circle-o" aria-hidden="true"></i><span>Lorem ipsum dolor sit amet, </span></li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p> */}

                                            <div className="enroll-sec">

                                                {user.token ?
                                                    (user.user_role == 5 && (chkGroups && (!enrollment && (course.course_type == 'xapi' ? <button className="sec-btn" data-toggle="modal"
                                                        data-target="#modal-fullscreen-xl" data-backdrop="static"
                                                    data-keyboard="false"  onClick={e => enrollmentid(course.xapi_attachment_file, course.course_type)}>Enroll Now</button> : <button className="sec-btn" onClick={e => enrollmentid(course.xapi_attachment_file, course.course_type)}>Enroll Now</button>))))
                                                    : (<a data-toggle="modal" data-target="#loginform" href="#" className="sec-btn">Enroll Now</a>

                                                    )
                                                }

                                            </div>

                                        </div>
                                        <div className="tab-pane fade" id="reviews" role="tabpanel" aria-ladivbelledby="reviews-tab">
                                            <h3>Featured Review</h3>
                                            <div className="review-wrap">

                                                {/** reviews  section */}


                                                {singleReview && singleReview.map(item =>

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
                                                        <h5>{item.fullname && item.fullname.toUpperCase()}, {new Date(item.date_at).toDateString()} <span className="btn btn-danger" onClick={e => delReview(item.id)} > <i className="fa fa-trash-o" aria-hidden="true"></i> </span> </h5>
                                                        <p>{item.comment}.</p>
                                                    </div>

                                                )}


                                                {review && review.map(item =>
                                                    item.user_id != user.user_id ?
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
                                                            <h5>{item.fullname && item.fullname.toUpperCase()}, {new Date(item.date_at).toDateString()}</h5>
                                                            <p>{item.comment}.</p>
                                                        </div> : ''


                                                )}






                                                {/**    <div className="review-box">
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
                                                {chkComment && enrollment ? <button href="#" className="sec-btn comment-add-btn"
                                                    data-toggle="modal"
                                                    data-target=".raddgroupModal"
                                                    data-backdrop="static"
                                                    data-keyboard="false" >Add Comment</button> : ''}
                                                <Link to={`/allreview`} state={{ coure_ID: courseID }} className="sec-btn sec-btn-border">{langObj.view_all_reviews}</Link>
                                            </div>

                                            {/**   <div className="enroll-sec">
                                                <h6>58,971 already enrolled</h6>
                                            </div>  */}
                                        </div>

                                        {user.token && <div className="tab-pane fade show " id="q-a" role="tabpanel" aria-labelledby="q-a-tab">
                                            <h3>Question and Answers</h3>

                                            <QnsAnsComment course_id={singleCourseId} />

                                        </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>



                        {user.token && enrollment && chap.length > 0 || user.token && user.user_id == creatorId && chap.length > 0 || user.token && user.user_role == 2 && chap.length > 0 ? <div className="col-md-5">
                            <div className="single-course-bottom-right">
                                <h3>{langObj.course_contant}   </h3>

                                <div className="course-content">
                                    {chap && chap.map((chapter, j) =>

                                        <div className="accordion">
                                            <h4 key={`chap${j}`}>{chapter.lessons.length > 0 ? chapter.chapter_name : ''}</h4>&nbsp;

                                            {chapter.lessons && chapter.lessons.map((less, i) =>
                                                <div key={i} className="card">

                                                    <div key={`less${i}`} className="card-header"  >



                                                        <div className="row active_lesson m-2" tabIndex="1" style={{ borderStyle: "solid", borderColor: "#a2b0a6", borderWidth: "thin" }}>
                                                            <div className="col-sm-10" >
                                                                {less.lesson_vedio && <a

                                                                    onClick={e => setVedio(less.lesson_vedio, less.lesson_vedio_type, less.lesson_name, less.lesson_details, chapter.chapter_name, chapter.id, less.id)}
                                                                    className="btn  text-left " aria-expanded="true" aria-controls="course2">



                                                                    <span style={{ fontSize: "24px" }}>{less && less.lesson_name.toUpperCase()}</span>
                                                                    <p style={{ fontSize: "12px", color: "#023e86" }}> Length: {less.duration} mins&nbsp;

                                                                        {trackLessions.map(lessonItem =>
                                                                            <>
                                                                                {lessonItem.lesson_id == less.id &&
                                                                                    <span>
                                                                                        {lessonItem.status == 'completed' && <>
                                                                                            , status: {lessonItem.status}
                                                                                        </>}
                                                                                        {lessonItem.lesson_percentage < 90 &&
                                                                                            <span>
                                                                                                , progress: {lessonItem.lesson_percentage}%
                                                                                            </span>
                                                                                        }

                                                                                    </span>

                                                                                }
                                                                            </>
                                                                        )}
                                                                    </p>

                                                                </a>}


                                                                {less.lesson_vedio_link && <a

                                                                    onClick={e => setVedio(less.lesson_vedio_link, less.lesson_vedio_type, less.lesson_name, less.lesson_details, chapter.chapter_name, chapter.id, less.id)}

                                                                    className="btn  text-left" aria-expanded="true" aria-controls="course2">
                                                                    <span style={{ fontSize: "24px" }}>{less && less.lesson_name.toUpperCase()}</span>
                                                                    <p style={{ fontSize: "12px", color: "#023e86" }} >  Length: {less.duration} mins&nbsp;

                                                                        {trackLessions.map(lessonItem =>
                                                                            <>
                                                                                {lessonItem.lesson_id == less.id &&
                                                                                    <span>
                                                                                        {lessonItem.status == 'completed' && <>
                                                                                            , status: {lessonItem.status}
                                                                                        </>}
                                                                                        {lessonItem.lesson_percentage < 90 &&
                                                                                            <span>
                                                                                                , progress: {lessonItem.lesson_percentage}%
                                                                                            </span>
                                                                                        }

                                                                                    </span>

                                                                                }
                                                                            </>
                                                                        )}

                                                                    </p>

                                                                </a>}

                                                            </div>
                                                            <div className="col-sm-2">
                                                                <div className="course-content-accordian-bottom ">

                                                                    {user.token && <>
                                                                        {less.lesson_file && <a data-toggle="tooltip" title="file download" href={less.lesson_file} className="sec-btn sec-btn-orange" ><i className="fa fa-paperclip" aria-hidden="true"></i></a>}
                                                                    </>
                                                                    }


                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/** attatch file 
                                                            <div className="course-content-accordian-bottom ">

                                                                {user.token && <>
                                                                    {less.lesson_file && <NavLink href={less.lesson_file} className="sec-btn sec-btn-orange" >Download Attachments</a>}
                                                                </>
                                                                }


                                                            </div> */}


                                                    </div>




                                                </div>

                                            )


                                            }


                                        </div>
                                    )}
                                </div>

                            </div>
                        </div> : ''}
                    </div>

                    <SingleXapiModal xapi_link={xapiLink} course_name={course.course_name && course.course_name.toUpperCase()} xapi_course_name={course.xapi_file_name} />

                </div>
            </div>



            {
                user.token && enrollment && assignment.length > 0 || user.token && user.user_id == creatorId && assignment.length > 0 || user.token && user.user_role == 2 && assignment.length > 0 ?
                    <div className="assignment-sec sec-bg">
                        <div className="container">
                            <div className="data-table">

                                <h3>Assignment</h3>&nbsp;
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Assignment
                                                    No </th>
                                                <th>Assignment
                                                    Name</th>
                                                <th>User Group</th>
                                                <th>Course</th>
                                                <th>Assignment
                                                    date created</th>
                                                <th>Created By</th>
                                                <th>Assignment
                                                    deadline</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody onChange={e => setSelectedAssignments(e.target.value)}>
                                            {assignment && assignment.map(assignment =>
                                                <tr>

                                                    <td>1</td>
                                                    <td>{assignment.assignment_name}</td>
                                                    <td>{assignment.group_name}</td>
                                                    <td>{assignment.course_name}</td>
                                                    <td>{assignment.assignment_create}</td>
                                                    <td>{assignment.created_by}</td>
                                                    <td>{assignment.assignment_deadline}</td>
                                                    <td className="delete"><a href={assignment.assigment_file}><i className="fa fa-download" aria-hidden="true"></i></a></td>

                                                </tr>


                                            )}
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        </div>
                    </div>
                    : ''
            }


            {/** rating */}

            {
                chkComment && <div className="modal fade raddgroupModal" tabIndex={-1}
                    role="dialog" id="addgroupModal" aria-labelledby="addgroupModalLabel" aria-hidden="true">
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
                                        <form id="myForm">
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
                                        </form>
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





        </React.Fragment >

    )
}
