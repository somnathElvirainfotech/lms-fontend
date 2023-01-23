import React, { useCallback, useRef } from "react";

import Header from "./Common/Header/Header";
import Footer from "./Common/Footer/Footer";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import UserService from "../services/UserService";
import { AuthContext } from "../index";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import CommentRatingService from "../services/CommentRatingService";
import ReactPlayer from "react-player/lazy";
import { Markup } from "interweave";
import CourseTrackService from "../services/CourseTrackService";
// const getDuration = require('get-video-duration');
import XapiService from "../services/XapiService";
import UserTaskService from "../services/UserTaskService";
import { toast } from "react-toastify";
import QnsAnsComment from "./QnsAnsComment";
import { setCookie, getCookie, removeCookie } from "../middleware/CookieSetup";
import SingleXapiModal from "./SingleXapiModal";
import StaticRating from "./StaticRating";
import ProgressBar from "@ramonak/react-progress-bar";

// file download
import DownloadLink from "react-download-link";

// loader
import Loader from "./Loader";

// languages
import English from "./ConverLanguages/English";
import SerbianCyrilic from "./ConverLanguages/SerbianCyrilic";
import SerbianLatin from "./ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from "../routes/routes";
import TaskService from "../services/TaskService";

import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import LessonService from "../services/LessonService";
import ChapterService from "../services/ChapterService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Singlecourse() {
  // loader
  const [showLoader, setShowLoader] = useState(false);
  const tabPanel=useRef();
  const tabPanel2=useRef();

  var thirdExample2 = {
    size: 25,
    count: 5,
    isHalf: true,
    color: "grey",
    activeColor: "#ebc934",
    edit: false,
  };

  const [TotalRating, setTotalRating] = useState(0);
  const [TotalRatingStatus, setTotalRatingStatus] = useState(0);

  useEffect(() => {});

  const [enrollStatus, setEnrollStatus] = useState("");
  const [nextData, setNextData] = useState({});
  const playerRef = useRef();
  const [enrollment, setEnrollments] = useState();
  const [chkGroups, setChkGroup] = useState(false);
  const [chkGroups2, setChkGroup2] = useState(true);

  const [vedioPlay, setVedioPlay] = useState(false);

  let query = useQuery();
  var location = useLocation();
  var params = useParams();
  var paramsvalue = params.name.replaceAll("-", " ");
  const pathname = location.pathname;

  // const [singleCourseId,setSingleCourseId]=useState('');
  // const [taskId,setTaskId]=useState('');
  // const [courseType,setcourseType]=useState('');

  var { singleCourseId, taskId, courseType } =
    location.state != null ? location.state : { singleCourseId: 0 };

  // console.log("params --- ", location.state);

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

  const [vedioType, setVedioType] = useState("");

  var setLession = (e) => {
    console.log(e);
    //   setLess()
  };

  // // to store selected course
  const [selectedCourse, setSelectedCourse] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [courseID, setCourseID] = useState();

  const [review, setReview] = useState([]);
  const [singleReview, setSingleReview] = useState([]);
  const [singleReviewId, setSingleReviewId] = useState();

  const [trackLessions, setTrackLessions] = useState([]);

  const [enroll_id, setEnroll_id] = useState(0);

  var handler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  var taskId = 0;
  var noAttemp = 0;

  var setTask = async (cdata) => {
    var data = {
      group_id: "",
      created_by: "",
      user_id: user.user_id,
    };
    var tresponce = await TaskService.search(data);

    for (var i of tresponce.data.data) {
      if (i.course_id == cdata.id) {
        // setTaskId(Number(i.id))
        console.log("course id", cdata.id);
        console.log("task id", i.id);
        taskId = Number(i.id);
        var a = i.no_attempted + 1;
        // setNoAttemp(a)
        noAttemp = a;
      }
    }
  };

  // useEffect(()=>{

  //   $( ".active_lesson").click(()=>{

  //     $(".active_lesson").removeClass('active_lesson_selected');
  //     console.log("first")
  //     $(".active_lesson_selected").addClass('active_lesson_selected');

  //   });

  // },[])

  var lessonActive = (e) => {
    // alert(1)
    // console.log(e)
    $(".active_lesson").removeClass("active_lesson_selected");
    $(`#${e}`).addClass("active_lesson_selected");
  };

  const [lastChapter, setLastChapter] = useState(0);
  const [lastLesson, setLastLesson] = useState(0);

  useEffect(() => {
    console.log("course id ==== ", singleCourseId);

    (async () => {
      setShowLoader(true);

      if (location.state == null) {
        var data = await UserService.singlecourseByName(paramsvalue);
        // alert(data.data.data.id)
        singleCourseId = data.data.data.id;
      }

      setCourseID(singleCourseId);
      console.log("first course id ", singleCourseId);
      var course = query.get("id");

      // alert(singleCourseId)

      getTrackingLessions();

      // xapi call
      //getXapiData();

      if (user.token) {
        var assignmentresponce = await UserService.assignmentcourse(
          user.user_id,
          singleCourseId
        );
        setAssignments(assignmentresponce.data.data);
      }

      var data = {
        user_id: user.user_id,
        course_id: singleCourseId,
      };

      if (user.token) {
        var commentStatus = await CommentRatingService.status(data);
        setChkComment(commentStatus.data.status);
      }

      // get review
      var reviews = await CommentRatingService.getByCourseId(
        singleCourseId,
        "",
        10
      );
      setReview([...reviews.data.data]);

      if (user.token) {
        var creviews = await CommentRatingService.getByCourseId(
          singleCourseId,
          user.user_id,
          5
        );
        console.log(creviews.data);
        setSingleReview([...creviews.data.data]);
      }

      // get course data----------------------------------
      var responce = await UserService.singlecourse(singleCourseId);
      var temp = responce.data.data;

      if (user.user_role == 5) {
        await setTask(responce.data.data);
      }

      console.log("course details", responce.data);

      setCreatorId(temp.creator_id);
      setCourses(temp);
      setChap(temp.chapters);
      setTotalRating(temp?.rating_details[0]?.rating_number);

      if (user.token && user.user_role == 5) {
        chkAllGroups(temp.group_details, temp);
      }

      if (user.token && user.user_role == 4) {
        chkAllGroups(temp.group_details, temp);
      }

      if (user.user_role == 2) {
        setChkGroup(true);
        setChkGroup2(true);

        if (temp.course_type == "regular") {
          // alert(temp.chapters[0].id)
          setLastChapter(temp.chapters[0].id);
          setLastLesson(temp.chapters[0].lessons[0].id);

          setVedioPlayer(temp.chapters[0].lessons[0].lesson_vedio_link);
          setVedioType(temp.chapters[0].lessons[0].lesson_vedio_type);
          setCurrentChapter(temp.chapters[0].lessons[0].chapter_id);
          setCurrentLesson(temp.chapters[0].lessons[0].id);
          oneView({
            chapter_name: temp.chapters[0].id.chapter_name,
            lesson_name: temp.chapters[0].lessons[0].lesson_name,
            lesson_details: temp.chapters[0].lessons[0].lesson_details,
          });

          for (var i of temp.chapters) {
            if (i.id == temp.chapters[0].lessons[0].chapter_id) {
              for (var j of i.lessons) {
                if (j.id == temp.chapters[0].lessons[0].id) {
                  setNextData({
                    next_lessons_data: j.next_lessons_data,
                    preChapter: `parentChap${i.id}`,
                  });
                }
              }
            }
          }

          $(`#parentChap${temp.chapters[0].lessons[0].chapter_id}`).removeClass(
            "collapsed"
          );
        }
      }

      // alert(singleCourseId)
      if (user.token) {
        var enrollRes = await UserService.enrollmentcourse(
          user.user_id,
          singleCourseId
        );

        var status = false;
        console.log("enrolllll  ", enrollRes.data);
        if (enrollRes.data.status) {
          setEnrollStatus(
            enrollRes.data.data[0].enrollment_status == "completed"
              ? "completed"
              : ""
          );

          // -------------------------------------------
          if (temp.course_type === "regular") {
            var payload = {
              user_id: user.user_id,
              course_id: singleCourseId,
              chapter_id: temp.chapters[0].lessons[0].chapter_id,
              lesson_id: temp.chapters[0].lessons[0].id,
              lesson_percentage: 1,
              current_play_sec: Number(progress.playedSeconds).toFixed(2),
            };
            setPreviousID(payload);
          }
          // ------------------------------------------------------------------------

          if (enrollRes.data.data[0].user_enroll_status == "active") {
            status = true;

            setEnroll_id(enrollRes.data.data[0].enroll_id);

            setLastChapter(
              enrollRes.data.data[0].current_chapter != null
                ? enrollRes.data.data[0].current_chapter
                : 0
            );

            // console.log(
            //   "current chapter ",
            //   enrollRes.data.data[0].current_chapter
            // );
            setLastLesson(
              enrollRes.data.data[0].current_lession != null
                ? enrollRes.data.data[0].current_lession
                : 0
            );
            // console.log(
            //   "current lesson ",
            //   enrollRes.data.data[0].current_lession
            // );

            // alert(singleCourseId)

            if (
              enrollRes.data.data[0].current_lession == null &&
              enrollRes.data.data[0].current_chapter == null
            ) {
              if (temp.course_type == "regular") {
                // alert(temp.chapters[0].id)

                setVedioPlayer(temp.chapters[0].lessons[0].lesson_vedio_link);
                setVedioType(temp.chapters[0].lessons[0].lesson_vedio_type);
                setCurrentChapter(temp.chapters[0].lessons[0].chapter_id);
                setCurrentLesson(temp.chapters[0].lessons[0].id);
                oneView({
                  chapter_name: temp.chapters[0].id.chapter_name,
                  lesson_name: temp.chapters[0].lessons[0].lesson_name,
                  lesson_details: temp.chapters[0].lessons[0].lesson_details,
                });

                for (var i of temp.chapters) {
                  if (i.id == temp.chapters[0].lessons[0].chapter_id) {
                    for (var j of i.lessons) {
                      if (j.id == temp.chapters[0].lessons[0].id) {
                        setNextData({
                          next_lessons_data: j.next_lessons_data,
                          preChapter: `parentChap${i.id}`,
                        });
                      }
                    }
                  }
                }

                $(
                  `#parentChap${temp.chapters[0].lessons[0].chapter_id}`
                ).removeClass("collapsed");

                var payload = {
                  user_id: user.user_id,
                  course_id: singleCourseId,
                  chapter_id: temp.chapters[0].lessons[0].chapter_id,
                  lesson_id: temp.chapters[0].lessons[0].id,
                  lesson_percentage: 1,
                  current_play_sec: Number(progress.playedSeconds).toFixed(2),
                };
                setPreviousID(payload);
              }
            } else {
              var payload = {
                user_id: user.user_id,
                course_id: singleCourseId,
                chapter_id: enrollRes.data.data[0].current_chapter,
                lesson_id: enrollRes.data.data[0].current_lession,
                lesson_percentage: Math.round(
                  (progress.playedSeconds / duration) * 100
                ),
                current_play_sec: Number(progress.playedSeconds).toFixed(2),
              };
              setPreviousID(payload);

              await getCurrentLesson(singleCourseId, temp.chapters);
            }
          }
        }

        setEnrollments(status);

        // gotoPage(status, temp.course_type, temp.xapi_attachment_file, temp.creator_id)
      }

      setShowLoader(false);
    })();
  }, []);

  // after run vedio when  ended

  var reloadLesson = async (payload) => {
    if (user.user_role == 5) {
      payload.lesson_percentage = Math.round(
        (progress.playedSeconds / duration) * 100
      );
      payload.current_play_sec = Number(progress.playedSeconds).toFixed(2);
      console.log("track payload", payload);
      var dresponse = await CourseTrackService.regularCourseTrack(payload);
      console.log("local course track updated -----  ", dresponse.data);

      getTrackingLessions();

      var responce = await UserService.singlecourse(
        singleCourseId === 0 ? courseID : singleCourseId
      );
      var temp = responce.data.data;

      console.log("course details2 ", responce.data);

      setCreatorId(temp.creator_id);
      setCourses(temp);
      setChap(temp.chapters);
      setTotalRating(temp?.rating_details[0]?.rating_number);
    }
  };

  var reloadLesson2 = async (payload) => {
    if (user.user_role == 5) {
      payload.lesson_percentage = Math.round(
        (progress.playedSeconds / duration) * 100
      );
      payload.current_play_sec = Number(progress.playedSeconds).toFixed(2);
      console.log("track payload", payload);
      var dresponse = await CourseTrackService.regularCourseTrack(payload);
      console.log("local course track updated -----  ", dresponse.data);

      getTrackingLessions();

      var responce = await UserService.singlecourse(
        singleCourseId === 0 ? courseID : singleCourseId
      );
      var temp = responce.data.data;

      console.log("course details2 ", responce.data);

      setChap(temp.chapters);

      console.log("next Data", nextData);

      var NEXTDATA = {};

      for (var i of temp.chapters) {
        if (i.id == payload.chapter_id) {
          for (var j of i.lessons) {
            if (j.id == payload.lesson_id) {
              NEXTDATA = {
                next_lessons_data: j.next_lessons_data,
                preChapter: `parentChap${i.id}`,
              };
            }
          }
        }
      }

      if (
        NEXTDATA.next_lessons_data.chapter_id != null &&
        NEXTDATA.next_lessons_data.lesson_id != null
      ) {
        // alert(NEXTDATA.next_lessons_data.lesson_vedio_link)
        setVedioPlayer(NEXTDATA.next_lessons_data.lesson_vedio_link);
        setVedioType(NEXTDATA.next_lessons_data.lesson_vedio_type);
        setCurrentChapter(NEXTDATA.next_lessons_data.chapter_id);
        setCurrentLesson(NEXTDATA.next_lessons_data.lesson_id);
        setVedioPlay(false);
        oneView({
          chapter_name: NEXTDATA.next_lessons_data.chapter_name,
          lesson_name: NEXTDATA.next_lessons_data.lesson_name,
          lesson_details: NEXTDATA.next_lessons_data.lesson_details,
        });

        var payload2 = {
          user_id: user.user_id,
          course_id: payload.course_id,
          chapter_id: NEXTDATA.next_lessons_data.chapter_id,
          lesson_id: NEXTDATA.next_lessons_data.lesson_id,
          lesson_percentage: 1,
          current_play_sec: Number(progress.playedSeconds).toFixed(2),
        };

        setPreviousID(payload2);

        console.log("payload2 ", payload2);

        $(".active_lesson").removeClass("active_lesson_selected");
        $(`.selectLesson${NEXTDATA.next_lessons_data.lesson_id}`).addClass(
          "active_lesson_selected"
        );

        if (NEXTDATA.next_lessons_data.chapter_id != payload.chapter_id) {
          $(".chapterCHK").removeClass("show");
          $(`.selectChapter${NEXTDATA.next_lessons_data.chapter_id}`).addClass(
            "show"
          );
          $(`#parentChap${NEXTDATA.next_lessons_data.chapter_id}`).removeClass(
            "collapsed"
          );
          $(`#${NEXTDATA.preChapter}`).addClass("collapsed");
        }
      }
    } else {
      var responce = await UserService.singlecourse(singleCourseId);
      var temp = responce.data.data;

      console.log("course details2 ", responce.data);

      setChap(temp.chapters);

      var NEXTDATA = {};

      for (var i of temp.chapters) {
        if (i.id == payload.chapter_id) {
          for (var j of i.lessons) {
            if (j.id == payload.lesson_id) {
              NEXTDATA = {
                next_lessons_data: j.next_lessons_data,
                preChapter: `parentChap${i.id}`,
              };
            }
          }
        }
      }

      if (
        NEXTDATA.next_lessons_data.chapter_id != null &&
        NEXTDATA.next_lessons_data.lesson_id != null
      ) {
        console.log("ok ok", NEXTDATA);

        // alert(NEXTDATA.next_lessons_data.lesson_vedio_link)
        setVedioPlayer(NEXTDATA.next_lessons_data.lesson_vedio_link);
        setVedioType(NEXTDATA.next_lessons_data.lesson_vedio_type);
        setCurrentChapter(NEXTDATA.next_lessons_data.chapter_id);
        setCurrentLesson(NEXTDATA.next_lessons_data.lesson_id);
        setVedioPlay(false);
        oneView({
          chapter_name: NEXTDATA.next_lessons_data.chapter_name,
          lesson_name: NEXTDATA.next_lessons_data.lesson_name,
          lesson_details: NEXTDATA.next_lessons_data.lesson_details,
        });

        $(".active_lesson").removeClass("active_lesson_selected");
        $(`.selectLesson${NEXTDATA.next_lessons_data.lesson_id}`).addClass(
          "active_lesson_selected"
        );

        if (NEXTDATA.next_lessons_data.chapter_id != payload.chapter_id) {
          $(".chapterCHK").removeClass("show");
          $(`.selectChapter${NEXTDATA.next_lessons_data.chapter_id}`).addClass(
            "show"
          );
          $(`#parentChap${NEXTDATA.next_lessons_data.chapter_id}`).removeClass(
            "collapsed"
          );
          $(`#${NEXTDATA.preChapter}`).addClass("collapsed");
        }
      }

      // if (nextData.next_lessons_data.chapter_id != null && nextData.next_lessons_data.lesson_id != null) {
      //   // alert(nextData.next_lessons_data.lesson_vedio_link)
      //   setVedioPlayer(nextData.next_lessons_data.lesson_vedio_link);
      //   setVedioType(nextData.next_lessons_data.lesson_vedio_type);
      //   setCurrentChapter(nextData.next_lessons_data.chapter_id);
      //   setCurrentLesson(nextData.next_lessons_data.lesson_id);
      //   setVedioPlay(false);
      //   oneView({
      //     chapter_name: nextData.next_lessons_data.chapter_name,
      //     lesson_name: nextData.next_lessons_data.lesson_name,
      //     lesson_details: nextData.next_lessons_data.lesson_details,
      //   });

      //   $(".active_lesson").removeClass("active_lesson_selected");
      //   $(`.selectLesson${nextData.next_lessons_data.lesson_id}`).addClass("active_lesson_selected");

      //   if (nextData.next_lessons_data.chapter_id != payload.chapter_id) {
      //     $(".chapterCHK").removeClass("show");
      //     $(`.selectChapter${nextData.next_lessons_data.chapter_id}`).addClass("show");
      //     $(`#parentChap${nextData.next_lessons_data.chapter_id}`).removeClass("collapsed");
      //     $(`#${nextData.preChapter}`).addClass("collapsed");
      //   }

      // }
    }
  };

  function gotoPage(enroll, course_type, file_path, creator_id) {
    console.log("dddddd", creator_id);
    if (
      (enroll && course_type == "xapi") ||
      (user.user_role == 2 && course_type == "xapi") ||
      (user.user_role == 4 &&
        creator_id == user.user_id &&
        course_type == "xapi") ||
      (user.user_role == 1 && course_type == "xapi")
    ) {
      window.open(`/singlexapi?link=${btoa(file_path)}`, "_blank");
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
    onChange: (newValue) => {
      console.log(`Example 3: new value is ${newValue}`);
      input.rating = newValue;
    },
  };

  var closeModal = () => {
    input.comment = "";
    input.rating = "";

    thirdExample.onChange(0);

    // ReactStars(thirdExample)

    document.getElementById("myForm").reset();
  };

  var ratingCreate = async () => {
    if (input.rating == 0) {
      // alert(44444);
    }

    var course_id = query.get("id");

    // alert(input.comment)

    if (input.rating !== undefined && input.comment !== undefined) {
      setShowLoader(true);
      var data = new FormData();
      data.append("user_id", user.user_id);
      data.append(
        "course_id",
        singleCourseId === 0 ? courseID : singleCourseId
      );
      data.append("rating_number", input.rating);
      data.append("comment", input.comment);

      var responce = await CommentRatingService.create(data);

      console.log(responce.data);

      input.comment = "";
      input.rating = "";

      document.getElementById("myForm").reset();
      setChkComment(!responce.data);

      // get review
      var reviews = await CommentRatingService.getByCourseId(
        singleCourseId === 0 ? courseID : singleCourseId,
        "",
        10
      );
      setReview([...reviews.data.data]);
      console.log("lllllllllllllllll:", reviews.data);
      var creviews = await CommentRatingService.getByCourseId(
        singleCourseId === 0 ? courseID : singleCourseId,
        user.user_id,
        5
      );
      setSingleReview([...creviews.data.data]);

      var responce = await UserService.singlecourse(
        singleCourseId === 0 ? courseID : singleCourseId
      );
      var temp = responce.data.data;
      console.log("course details3 ", responce.data);

      setCourses(temp);
      setTotalRating(temp?.rating_details[0]?.rating_number);

      setShowLoader(false);
    } else {
      if (input.rating === undefined) toast.error("Please provide rating");

      if (input.comment === undefined) toast.error("Please provide comment");

      document.getElementById("myForm").reset();
      setInput({
        comment: "",
        rating: "",
      });
    }
  };

  // to store selected enrollment
  const [selectedAssignments, setSelectedAssignments] = useState([]);

  async function assignmentid() {
    var course = query.get("id");

    if (user.token) {
      var assignmentresponce = await UserService.assignmentcourse(
        user.user_id,
        singleCourseId
      );

      setEnrollments(assignmentresponce.data.status);

      if (assignmentresponce.data.status)
        setEnrollStatus(
          assignmentresponce.data.data[0].enrollment_status == "completed"
            ? "completed"
            : ""
        );

      // https://appdividend.com/2019/09/21/laravel-6-validation-example-validation-in-laravel-tutorial/            console.log(assignmentresponce.data);
    }

    //console.log(enrollmentresponce.data);
  }

  // to store all the enrollment

  // check coourse and user group
  var chkAllGroups = (courseGroup, temp) => {
    var Group = user.user_groups.split(",");
    var userGroup = Group.map((i) => Number(i));
    setShowLoader(true);
    console.log("user group", userGroup);
    var chk = false;
    for (var item of courseGroup) {
      if (userGroup.includes(item.group_id)) {
        console.log(userGroup.includes(item.group_id));
        setChkGroup(true);
        chk = true;
      }
      setChkGroup2(false);
    }

    if (user.user_role == 4) {
      if (chk) {
        if (temp.course_type == "regular") {
          // alert(temp.chapters[0].id)
          setLastChapter(temp.chapters[0].id);
          setLastLesson(temp.chapters[0].lessons[0].id);

          setVedioPlayer(temp.chapters[0].lessons[0].lesson_vedio_link);
          setVedioType(temp.chapters[0].lessons[0].lesson_vedio_type);
          setCurrentChapter(temp.chapters[0].lessons[0].chapter_id);
          setCurrentLesson(temp.chapters[0].lessons[0].id);
          oneView({
            chapter_name: temp.chapters[0].id.chapter_name,
            lesson_name: temp.chapters[0].lessons[0].lesson_name,
            lesson_details: temp.chapters[0].lessons[0].lesson_details,
          });

          for (var i of temp.chapters) {
            if (i.id == temp.chapters[0].lessons[0].chapter_id) {
              for (var j of i.lessons) {
                if (j.id == temp.chapters[0].lessons[0].id) {
                  setNextData({
                    next_lessons_data: j.next_lessons_data,
                    preChapter: `parentChap${i.id}`,
                  });
                }
              }
            }
          }

          $(`#parentChap${temp.chapters[0].lessons[0].chapter_id}`).removeClass(
            "collapsed"
          );
        }
      }
    }

    setShowLoader(false);
    console.log(userGroup);
  };

  // to store selected enrollment
  const [selectedEnrollments, setSelectedEnrollments] = useState([]);

  async function enrollmentid(file_path, course_type) {
    // var courseID = query.get("id");

    setShowLoader(true);

    if (user.token) {
      console.log("---- noAttemp --- ", noAttemp);
      await UserTaskService.create({
        user_id: user.user_id,
        task_id: taskId,
        no_attempted: noAttemp,
      });
      // alert(courseID)
      var enrollmentresponce = await UserService.enrollment(
        user.user_id,
        singleCourseId === 0 ? courseID : singleCourseId
      );
      setEnrollments(enrollmentresponce.data.status);

      if (enrollmentresponce.data.status && course_type != "xapi") {
        var enrollRes = await UserService.enrollmentcourse(
          user.user_id,
          singleCourseId === 0 ? courseID : singleCourseId
        );
        setEnroll_id(enrollRes.data.data[0].enroll_id);

        var lessid = chap[0].lessons[0].id;

        var Chapterresponse = await ChapterService.getOne(chap[0].id);
        console.log("Chapterresponse ---- ", Chapterresponse.data);

        var Lessresponse = await LessonService.getOne(lessid);

        console.log("Lessresponse ----- ", Lessresponse.data);

        setVedioPlayer(Lessresponse.data.data[0].lesson_vedio_link);
        setVedioType(Lessresponse.data.data[0].lesson_vedio_type);
        setCurrentChapter(Lessresponse.data.data[0].chapter_id);
        setCurrentLesson(Lessresponse.data.data[0].id);
        oneView({
          chapter_name: Chapterresponse.data.data[0].chapter_name,
          lesson_name: Lessresponse.data.data[0].lesson_name,
          lesson_details: Lessresponse.data.data[0].lesson_details,
        });

        var payload2 = {
          user_id: user.user_id,
          course_id: singleCourseId === 0 ? courseID : singleCourseId,
          chapter_id: Lessresponse.data.data[0].chapter_id,
          lesson_id: Lessresponse.data.data[0].id,
          lesson_percentage: 1,
          current_play_sec: Number(progress.playedSeconds).toFixed(2),
        };

        setPreviousID(payload2);
      }

      console.log("eeeeeeeeeEE", enrollmentresponce.data);
      // if (enrollmentresponce.data.status)
      //     setEnrollStatus(enrollmentresponce.data.data[0].enrollment_status == "completed" ? "completed" : '')

      var assignmentresponce = await UserService.assignmentcourse(
        user.user_id,
        singleCourseId
      );
      setAssignments(assignmentresponce.data.data);

      console.log("lkkkk", course);

      if (enrollmentresponce.data.status) {
        setShowLoader(false);
        toast.success("Enroll successfully");
      }

      if (course_type == "xapi") {
        if (taskId) {
          setShowLoader(true);
          var aa = await UserTaskService.create({
            user_id: user.user_id,
            task_id: taskId,
            no_attempted: 1,
          });
          if (aa.data.status) setShowLoader(false);
        }

        //setXapiLink(file_path);

        //setXapiLink(file_path,course.course_name,course.xapi_file_name)

        // setCookie("xapi_result_name", course.xapi_file_name)

        setShowLoader(true);

        await taskAdd();

        var enrollRes = await UserService.enrollmentcourse(
          user.user_id,
          singleCourseId === 0 ? courseID : singleCourseId
        );

        console.log("current enroll ", enrollRes.data);

        setShowLoader(false);

        window.open(
          `/singlexapi?link=${btoa(
            file_path +
              "?USER_ID=" +
              user.user_id +
              "&ENROLL_ID=" +
              enrollRes.data.data[0].enroll_id +
              "&TASK_ID=" +
              taskId +
              "&USER_ROLE=" +
              user.user_role +
              "&USER_EMAIL=" +
              user.email +
              "&USER_NAME=" +
              user.username
          )}`,
          "_blank"
        );
      }
    }

    //console.log(enrollmentresponce.data);
  }

  const [enrollmentcourse, setEnrollmentcourses] = useState([]);
  const [selectedEnrollmentcourses, setSelectedEnrollmentcourses] =
    useState("");

  const [vedioPlayer, setVedioPlayer] = useState("");
  const [tempV, setTempV] = useState("");

  // useEffect(() => {
  //     setVedioPlayer(tempV)
  //     alert(tempV)
  // }, [tempV])

  var [currentChapter, setCurrentChapter] = useState(0);
  var [currentLesson, setCurrentLesson] = useState(0);

  var [previousID, setPreviousID] = useState({
    user_id: 0,
    course_id: 0,
    chapter_id: 0,
    lesson_id: 0,
    lesson_percentage: 0,
    current_play_sec: 0,
  });

  var setVedio = async (
    value,
    type,
    lesson_name,
    less_details,
    chapter_name,
    chapter_id,
    lesson_id,
    nextLessonData,
    preChapter
  ) => {
    // previous  value set
    if (user.user_role == 5) {
      if (
        previousID.user_id != 0 &&
        previousID.course_id != 0 &&
        previousID.chapter_id != 0 &&
        previousID.lesson_id != 0
      ) {
        console.log("pre course set  ", previousID);
        reloadLesson(previousID);
      }
    }

    if (enroll_id != 0) {
      var payload = {
        chapter_id: chapter_id,
        less_id: lesson_id,
        enroll_id: enroll_id,
      };
      console.log(payload);
      setShowLoader(true);
      await CourseTrackService.lastLessonUpdate(payload);

      // var payload = {
      //   user_id: user.user_id,
      //   course_id: courseID,
      //   chapter_id: chapter_id,
      //   lesson_id: lesson_id,
      //   lesson_percentage: Math.round((progress.playedSeconds / duration) * 100),
      //   current_play_sec: Number(progress.playedSeconds).toFixed(2),
      // };

      // courseTracking(payload);

      var payload = {
        user_id: user.user_id,
        course_id: singleCourseId === 0 ? courseID : singleCourseId,
        chapter_id: chapter_id,
        lesson_id: lesson_id,
        lesson_percentage: Math.round(
          (progress.playedSeconds / duration) * 100
        ),
        current_play_sec: Number(progress.playedSeconds).toFixed(2),
      };

      console.log("set pre co", payload);
      setPreviousID(payload);

      setShowLoader(false);
    }

    for (var i of trackLessions) {
      if (i.lesson_id == lesson_id && i.chapter_id == chapter_id) {
        setSeekTime(i.current_play_sec);
      }
    }

    setVedioPlayer(value);
    setVedioType(type);
    setCurrentChapter(chapter_id);
    setCurrentLesson(lesson_id);
    setVedioPlay(true);
    console.log("chapter ", chapter_id);
    console.log("lesson ", lesson_id);
    oneView({
      chapter_name: chapter_name,
      lesson_name: lesson_name,
      lesson_details: less_details,
    });

    // set next lesson data------------------

    setNextData({
      next_lessons_data: nextLessonData,
      preChapter: preChapter,
    });
  };

  var [viewAllRating, setViewAllRating] = useState(false);

  var closeRating = async () => {
    setShowLoader(true);

    var reviews = await CommentRatingService.getByCourseId(courseID, "", 18);
    setReview([...reviews.data.data]);
    console.log("lllllllllllllllll:", reviews.data);
    var creviews = await CommentRatingService.getByCourseId(
      courseID,
      user.user_id,
      5
    );
    setSingleReview([...creviews.data.data]);

    $(".review-wrap").removeClass("review-wrap-scroll");

    setShowLoader(false);

    setViewAllRating(false);
  };

  var getReview = async () => {
    setShowLoader(true);
    var reviews = await CommentRatingService.getByCourseId(
      singleCourseId === 0 ? courseID : singleCourseId,
      "",
      ""
    );
    console.log(reviews.data);
    setReview([...reviews.data.data]);
    setViewAllRating(true);
    setShowLoader(false);

    $(".review-wrap").removeClass("review-wrap-scroll");
    $(`#review-wrap-rating`).addClass("review-wrap-scroll");
  };

  var delReview = async (id) => {
    setShowLoader(true);
    var course_id = query.get("id");
    var responce = await CommentRatingService.delete(id);
    if (responce.data.status) {
      // get review
      var reviews = await CommentRatingService.getByCourseId(
        singleCourseId === 0 ? courseID : singleCourseId,
        "",
        10
      );
      setReview([...reviews.data.data]);
      console.log("lllllllllllllllll:", reviews.data);
      var creviews = await CommentRatingService.getByCourseId(
        singleCourseId === 0 ? courseID : singleCourseId,
        user.user_id,
        5
      );
      setSingleReview([...creviews.data.data]);
      var responce = await UserService.singlecourse(
        singleCourseId === 0 ? courseID : singleCourseId
      );
      var temp = responce.data.data;
      console.log("course details3 ", responce.data);
      setCourses(temp);
      setShowLoader(false);
      setChkComment(true);
      setTotalRating(temp?.rating_details[0]?.rating_number);
    }
  };

  //  var getTotalRating=()=>{
  //   alert(totalRating)
  //   return (<StaticRating
  //     // value={course.rating_details[0].rating_number}
  //     value={totalRating}
  //   />);
  //  }

  // view chapter lesson
  var oneView = (data) => {
    setView(data);
    // console.log(data);
  };

  var style1 = {
    color: "#023e86",
    fontWeight: "600",
    marginBottom: "15px",
  };

  var style2 = {
    color: "black",
  };

  // player tracking
  const [progress, setProgress] = useState({});
  const [duration, setDuration] = useState(0);
  const [completeData, setCompleteData] = useState({
    percentage: 0,
    currentChapter: 0,
    currentLesson: 0,
    currentPlaySec: 0,
  });

  var playerProgress = (e) => {
    setProgress({ ...e });

    // console.log("run time ", e);
  };

  var setSeekTime = (value) => {
    playerRef.current.seekTo(value, "seconds");
  };

  var playerEnded = () => {
    var course_id = query.get("id");
    setVedioPlay(false);

    // setShowLoader(true)

    // alert("END",singleCourseId)

    var payload = {
      user_id: user.user_id,
      course_id: singleCourseId === 0 ? courseID : singleCourseId,
      chapter_id: currentChapter,
      lesson_id: currentLesson,
      lesson_percentage: 100,
      current_play_sec: duration,
    };

    // courseTracking(payload);

    reloadLesson2(payload);

    // setShowLoader(false)

    console.log("complete data  ", payload);
  };

  var playerPaused = () => {
    var course_id = query.get("id");

    var payload = {
      user_id: user.user_id,
      course_id: singleCourseId === 0 ? courseID : singleCourseId,
      chapter_id: currentChapter,
      lesson_id: currentLesson,
      lesson_percentage: Math.round((progress.playedSeconds / duration) * 100),
      current_play_sec: Number(progress.playedSeconds).toFixed(2),
    };

    courseTracking(payload);

    // console.log("paused ", payload);
    // reloadLesson(payload)
    setCompleteData({ ...payload });
  };

  var playerSeek = (stime) => {
    var payload = {
      percentage: Math.round((stime / duration) * 100),
      currentChapter: currentChapter,
      currentLesson: currentLesson,
      currentPlaySec: Number(stime).toFixed(2),
    };

    // console.log("seek ", payload);
    setCompleteData({ ...payload });
  };

  var playerReady = () => {
    setShowLoader(true);
  };

  var courseTracking = async (payload) => {
    if (user.user_role == 5) {
      // setShowLoader(true)
      var dresponse = await CourseTrackService.regularCourseTrack(payload);
      console.log("local course track updated -----  ", dresponse.data);

      // reloadLesson();
      // setShowLoader(false)

      // getTrackingLessions()

      // var responce = await UserService.singlecourse(payload.course_id);
      // var temp = responce.data.data;

      // console.log(responce.data)

      // setCreatorId(temp.creator_id)
      // setCourses(temp);
      // setChap(temp.chapters)

      // getTrackingLessions();
    }
  };

  var getTrackingLessions = async () => {
    if (user.user_role == 5) {
      setShowLoader(true);
      var course_id = query.get("id");
      console.log("courseID  ", singleCourseId);
      var payload = {
        user_id: user.user_id,
        course_id: singleCourseId === 0 ? courseID : singleCourseId,
      };

      var responce = await CourseTrackService.getTrackingLession(payload);
      setTrackLessions(responce.data.data);
      console.log("tarack lesson ----- ", responce.data);
      setShowLoader(false);
    }
  };

  const [currentActiveLesson, setCurrentActiveLesson] = useState({});

  var getCurrentLesson = async (CId, Chapters) => {
    if (user.user_role == 5) {
      setShowLoader(true);
      // var course_id = query.get("id");

      var payload = {
        user_id: user.user_id,
        course_id: CId,
      };

      console.log("payload ", payload);

      var response = await CourseTrackService.getCurrentLession(payload);
      console.log("getCurrentLesson ------  ", response.data);

      if (response.data.data.length > 0) {
        var lesson_percentage = response.data.data[0].lesson_percentage;
        var current_play_sec = response.data.data[0].current_play_sec;

        var Lessresponse = await LessonService.getOne(
          response.data.data[0].lesson_id
        );

        console.log("Lessresponse ----- ", Lessresponse.data);

        var Chapterresponse = await ChapterService.getOne(
          Lessresponse.data.data[0].chapter_id
        );
        console.log("Chapterresponse ---- ", Chapterresponse.data);

        // alert(Lessresponse.data.data[0].lesson_vedio_link)
        setVedioPlayer(Lessresponse.data.data[0].lesson_vedio_link);
        setVedioType(Lessresponse.data.data[0].lesson_vedio_type);
        setCurrentChapter(Lessresponse.data.data[0].chapter_id);
        setCurrentLesson(Lessresponse.data.data[0].id);
        oneView({
          chapter_name: Chapterresponse.data.data[0].chapter_name,
          lesson_name: Lessresponse.data.data[0].lesson_name,
          lesson_details: Lessresponse.data.data[0].lesson_details,
        });

        setCurrentActiveLesson(response.data.data[0]);

        for (var i of Chapters) {
          if (i.id == Lessresponse.data.data[0].chapter_id) {
            for (var j of i.lessons) {
              if (j.id == Lessresponse.data.data[0].id) {
                setNextData({
                  next_lessons_data: j.next_lessons_data,
                  preChapter: `parentChap${i.id}`,
                });
              }
            }
          }
        }
      }
      setShowLoader(false);

      // return {chapter_id:Lessresponse.data.data[0].chapter_id,lesson_id:Lessresponse.data.data[0].id};
    }
  };

  const { languageList } = useContext(LangContext);
  const [langObj, setLangObj] = useState({});

  useEffect(() => {
    if (languageList.language_name === "1") {
      setLangObj(English);
    } else if (languageList.language_name === "2") {
      setLangObj(SerbianCyrilic);
    } else if (languageList.language_name === "3") {
      setLangObj(SerbianLatin);
    }
  }, [languageList.language_name]);

  var navigate = useNavigate();

  var [xapiLink, setxapiLink] = useState("");
  var setXapiLink = async (link, course_name, xapi_course_name) => {
    // setxapiLink(link)

    navigate("/xapicourse", {
      state: {
        xapi_link: link,
        course_name: course_name,
        xapi_course_name: xapi_course_name,
        redirect_link: location.pathname,
      },
    });
  };

  var taskAdd = async () => {
    console.log("noAttemp ----", noAttemp);
    if (user.user_role == 5) {
      var responce = await UserService.singlecourse(
        singleCourseId === 0 ? courseID : singleCourseId
      );

      await setTask(responce.data.data);
      console.log("noAttemp ----", noAttemp);
      await UserTaskService.create({
        user_id: user.user_id,
        task_id: taskId,
        no_attempted: noAttemp,
      });
    }
  };

  return (
    <React.Fragment>
      {/** loader */}
      {showLoader && <Loader />}

      {chkGroups ? (
        <>
          {/**   <div className="inner-banner">
            <img src="/images/inner-banner.png" alt="" />
            <div className="desc">
              <div className="container">
                <div className="text">
                  <h1>Single Courses</h1>
                  <div className="breadcrumb">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>Single Courses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/**   <div className="single-course-top">
            <div className="container">
              <div className="media align-items-center">
                <img src="/images/university-logo.png" alt="" />
                <div className="media-body ml-3">
                  <span>
                    Professional Certificate in I Last updated 01-2022
                  </span>
                  <h5>
                    {course.course_name && course.course_name.toUpperCase()}
                  </h5>
                </div>
              </div>
            </div>
          </div> */}

          <div className="single-course-bottom sec-bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-8 col-md-7 course-right">
                  {enrollment == false && user.user_role == 5 && (
                    <div className="image-course">
                      <img
                        src={
                          course.image ? course.image : "/images/my-course1.png"
                        }
                        alt=""
                      />
                    </div>
                  )}

                  {enrollment != false &&
                    course.course_type == "xapi" &&
                    user.user_role == 5 && (
                      <div className="image-course">
                        <img
                          src={
                            course.image
                              ? course.image
                              : "/images/my-course1.png"
                          }
                          alt=""
                        />
                      </div>
                    )}

                  {user.user_role != 5 && course.course_type == "xapi" && (
                    <div className="image-course">
                      <img
                        src={
                          course.image ? course.image : "/images/my-course1.png"
                        }
                        alt=""
                      />
                    </div>
                  )}

                  {vedioPlayer && course.course_type == "regular" && (
                    <div className="">
                      <div className=" image-course vimeo-player-style full-w100">
                        <ReactPlayer
                          ref={playerRef}
                          config={{
                            file: {
                              attributes: {
                                controlsList: "nodownload",
                                // fluid: true,
                              },
                            },
                          }}
                          onSeek={(e) => playerSeek(e)}
                          onDuration={(e) => setDuration(e)}
                          onEnded={playerEnded}
                          onPause={playerPaused}
                          onProgress={playerProgress}
                          preload={"auto"}
                          url={vedioPlayer}
                          playing={vedioPlay}
                          controls={true}
                          width="100%"
                          height="100%"
                          style={{backgroundColor:"black"}}
                        ></ReactPlayer>
                      </div>
                    </div>
                  )}

                   

                  <div className="single-course-bottom-left">
                    <div className="single-course-tab">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">

                     { ((enrollment != false && course.course_type !=='xapi' && user.user_role != 2 ) || (course.course_type !=='xapi' && user.user_role==2)) &&  <li className="nav-item">
                      
                              <a
                              className={`nav-link active`}
                              id="lesson-description-tab"
                              data-toggle="tab"
                              href="#lesson-description"
                              role="tab"
                              aria-controls="lesson-description"
                              aria-selected="false"
                             
                            >
                              {langObj.lesson_description}
                            </a>
                      </li> }

                      <li className="nav-item">
                          <a
                            className={`nav-link ${(((enrollment == false && user.user_role != 2) || (course.course_type ==='xapi' && user.user_role != 2) ) || ((course.course_type ==='xapi' && user.user_role==2)) )?'active':''}`}
                            id="course-description-tab"
                            data-toggle="tab"
                            href="#course-description"
                            role="tab"
                            aria-controls="course-description"
                            aria-selected="false"
                           
                          >
                            {langObj.course_description}
                          </a>
                          
                      </li>

                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="reviews-tab"
                            data-toggle="tab"
                            href="#reviews"
                            role="tab"
                            aria-controls="reviews"
                            aria-selected="false"
                          >
                            {" "}
                            {langObj.reviews}
                          </a>
                        </li>
                        {user.token && (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="q-a-tab"
                              data-toggle="tab"
                              href="#q-a"
                              role="tab"
                              aria-controls="q-a"
                              aria-selected="false"
                            >
                              Q&A
                            </a>
                          </li>
                        )}
                      </ul>
                      <div className="tab-content " id="myTabContent">
                   {((enrollment != false && course.course_type !=='xapi' && user.user_role != 2 ) || (course.course_type !=='xapi' && user.user_role==2)) &&   <div
                          className="tab-pane fade active show "
                          id="lesson-description"
                          role="tabpanel"
                          aria-labelledby="lesson-description-tab"
                          
                        >
                         {/**  <h3>{langObj.lesson_description}</h3> */}
                       {view.lesson_details && <Markup content={view.lesson_details} /> }  
                        </div> }

                        <div
                          className={`tab-pane  fade ${(((enrollment == false && user.user_role != 2) || (course.course_type ==='xapi' && user.user_role != 2) ) || ((course.course_type ==='xapi' && user.user_role==2)) )?'active show':''}`}
                          id="course-description"
                          role="tabpanel"
                          aria-labelledby="course-description-tab"
                          
                        >
                        {/**  <h3>{langObj.course_description}</h3> */}
                          <Markup content={course.long_description} />
                        </div>

                        <div
                          className="tab-pane fade"
                          id="reviews"
                          role="tabpanel"
                          aria-labelledby="reviews-tab"
                        >
                          <h3>{langObj.featured_reviews}</h3>
                          <div id="review-wrap-rating" className="review-wrap ">
                            {/** reviews  section */}

                            {singleReview &&
                              singleReview.map((item) => (
                                <>
                                  {" "}
                                  <StaticRating value={item.rating_number} />
                                  <h5
                                    style={{
                                      fontSize: "15px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {item.fullname &&
                                      item.fullname.toUpperCase()}
                                    , {new Date(item.date_at).toDateString()}{" "}
                                    <span
                                      className="btn btn-danger"
                                      onClick={(e) => delReview(item.id)}
                                    >
                                      {" "}
                                      <i
                                        className="fa fa-trash-o"
                                        aria-hidden="true"
                                      ></i>{" "}
                                    </span>{" "}
                                  </h5>
                                  <p
                                    style={{
                                      wordBreak: "break-all",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {item.comment}.
                                  </p>
                                </>
                              ))}

                            <div>
                              {review &&
                                review.map((item) =>
                                  item.user_id != user.user_id ? (
                                    <>
                                      <StaticRating
                                        value={item.rating_number}
                                      />

                                      <h5
                                        style={{
                                          fontSize: "15px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {item.fullname &&
                                          item.fullname.toUpperCase()}
                                        ,{" "}
                                        {new Date(item.date_at).toDateString()}
                                      </h5>
                                      <p
                                        style={{
                                          wordBreak: "break-all",
                                          fontSize: "13px",
                                        }}
                                      >
                                        {item.comment}.
                                      </p>
                                    </>
                                  ) : (
                                    ""
                                  )
                                )}
                            </div>
                          </div>
                          <div className="tab-btnarea">
                            {chkComment && enrollment ? (
                              <button
                    
                                className="sec-btn comment-add-btn"
                                data-toggle="modal"
                                data-target=".raddgroupModal"
                                data-backdrop="static"
                                data-keyboard="false"
                              >
                               {langObj.add_comment}
                              </button>
                            ) : (
                              ""
                            )}

                            {/**   <Link
                              to={`/allreview`}
                              state={{ coure_ID: courseID }}
                              className="sec-btn sec-btn-border"
                            >
                              {langObj.view_all_reviews}
                            </Link> */}

                            {(!viewAllRating ) && (
                              <button
                                onClick={getReview}
                                type="button"
                                className="sec-btn sec-btn-border"
                              >
                                {langObj.view_all_reviews}
                              </button>
                            )}

                            {(viewAllRating ) && (
                              <button
                                onClick={closeRating}
                                type="button"
                                className="sec-btn sec-btn-border"
                              >
                                Close
                              </button>
                            )}
                          </div>

                          
                        </div>

                        {user.token && (
                          <div
                            className="tab-pane fade "
                            id="q-a"
                            role="tabpanel"
                            aria-labelledby="q-a-tab"
                          >
                            <h3 clasName="mb-5">{langObj.qns_ans}</h3>

                            <QnsAnsComment
                              course_id={
                                singleCourseId === 0 ? courseID : singleCourseId
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-lg-4 col-md-5 course-details-area-mobile">
                <div className="">
                <div className="catego-area">
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    wordBreak: "break-all",
                  }}
                >
                  {course.course_name && course.course_name.toUpperCase()}
                </p>
              </div>

              <div className="enroll-full">
                {user.token &&
                  user.user_role == 5 &&
                  chkGroups &&
                  enrollment == false && (
                    <button
                      className="sec-btn enroll-btn"
                      style={{ fontSize: "18px", fontWeight: "600" }}
                      onClick={(e) =>
                        enrollmentid(
                          course.xapi_attachment_file,
                          course.course_type
                        )
                      }
                    >
                      {langObj.enroll_btn}
                    </button>
                  )}

                {(course.course_type == "xapi" &&
                  enrollment != false &&
                  user.user_role == 5) ||
                (course.course_type == "xapi" && user.user_role == 1) ||
                (course.course_type == "xapi" && user.user_role == 2) ||
                (course.course_type == "xapi" &&
                  user.user_role == 4 &&
                  user.user_id == creatorId) ? (
                  <div className="">
                    <a
                      href={`/singlexapi?link=${btoa(
                        course.xapi_attachment_file +
                          "?USER_ID=" +
                          user.user_id +
                          "&ENROLL_ID=" +
                          enroll_id +
                          "&TASK_ID=" +
                          taskId +
                          "&USER_ROLE=" +
                          user.user_role +
                          "&USER_EMAIL=" +
                          user.email +
                          "&USER_NAME=" +
                          user.username
                      )}`}
                      target="__blank"
                      className="sec-btn mt-4"
                      style={{ fontSize: "18px", fontWeight: "600" }}
                      onClick={taskAdd}
                    >
                      {langObj.view_btn}
                    </a>
                    
                  </div>
                ) : (
                  ""
                )}
              </div>

              {((enrollment==false) || (enrollment==true && course.course_type=="xapi")) && (
                <>
            
                  <div className="catego-area">
                    <p>
                      <b>{langObj.Category_p} </b>:{" "}
                      {course.category_name_list &&
                        course.category_name_list}
                    </p>
                  </div>

               {course.short_description.length>0 &&   <div className="course-avator-image">
                    {/**    <img
                  src={
                    course.avatar_image
                      ? course.avatar_image
                      : "/images/my-course1.png"
                  }
                  alt=""
                /> */}

                    <Markup
                      content={`${
                        course.short_description &&
                        course.short_description
                      }`}
                    />
                  </div>}

                  <div className="course-details">
                    <p>
                      <b> </b> {course.author_name && course.author_name}
                    </p>
                    <p>
                      <b> </b>{" "}
                      {course.author_email && course.author_email}
                    </p>
                    <div className="review-area">
                      <ul className="review-stat rating ">
                        <ReactStars
                          value={TotalRating}
                          {...thirdExample2}
                        />

                        <span
                          style={{
                            fontSize: "15px",
                            color: "#707070",
                            marginTop: "10px",
                          }}
                          className="ml-2"
                        >
                          {course.rating_details[0].rating_number} (
                          {course.rating_details[0].total_rating})
                        </span>
                      </ul>
                    </div>

                    <p style={{ fontSize: "14px" }}>
                      <b> {langObj.Course_language} </b>:{" "}
                      {course.language_name && course.language_name}
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      <b> {langObj.Number_of_lessons} </b>:{" "}
                      { (course.course_type=="regular" && course.total_lesson_vedio > 0 ) &&
                        course.total_lesson_vedio}

                        {course.course_type=="xapi" && "1"}
                    </p>
                  </div>
                </>
              )}
                </div>
                </div>
             

                <div className="col-lg-4 col-md-5 course-left">
                <div className=" course-details-area-desk">
                <div className="catego-area">
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    wordBreak: "break-all",
                  }}
                >
                  {course.course_name && course.course_name.toUpperCase()}
                </p>
              </div>

              <div className="enroll-full">
                {user.token &&
                  user.user_role == 5 &&
                  chkGroups &&
                  enrollment == false && (
                    <button
                      className="sec-btn enroll-btn"
                      style={{ fontSize: "18px", fontWeight: "600" }}
                      onClick={(e) =>
                        enrollmentid(
                          course.xapi_attachment_file,
                          course.course_type
                        )
                      }
                    >
                      {langObj.enroll_btn}
                    </button>
                  )}

                {(course.course_type == "xapi" &&
                  enrollment != false &&
                  user.user_role == 5) ||
                (course.course_type == "xapi" && user.user_role == 1) ||
                (course.course_type == "xapi" && user.user_role == 2) ||
                (course.course_type == "xapi" &&
                  user.user_role == 4 &&
                  user.user_id == creatorId) ? (
                  <div className="">
                    <a
                      href={`/singlexapi?link=${btoa(
                        course.xapi_attachment_file +
                          "?USER_ID=" +
                          user.user_id +
                          "&ENROLL_ID=" +
                          enroll_id +
                          "&TASK_ID=" +
                          taskId +
                          "&USER_ROLE=" +
                          user.user_role +
                          "&USER_EMAIL=" +
                          user.email +
                          "&USER_NAME=" +
                          user.username
                      )}`}
                      target="__blank"
                      className="sec-btn mt-4"
                      style={{ fontSize: "18px", fontWeight: "600" }}
                      onClick={taskAdd}
                    >
                      {langObj.view_btn}
                    </a>
                    
                  </div>
                ) : (
                  ""
                )}
              </div>

              {((enrollment==false) || (enrollment==true && course.course_type=="xapi")) && (
                <>
            
                  <div className="catego-area">
                    <p>
                      <b>{langObj.Category_p} </b>:{" "}
                      {course.category_name_list &&
                        course.category_name_list}
                    </p>
                  </div>

               {course.short_description.length>0 &&   <div className="course-avator-image">
                    {/**    <img
                  src={
                    course.avatar_image
                      ? course.avatar_image
                      : "/images/my-course1.png"
                  }
                  alt=""
                /> */}

                    <Markup
                      content={`${
                        course.short_description &&
                        course.short_description
                      }`}
                    />
                  </div>}

                  <div className="course-details">
                    <p>
                      <b> </b> {course.author_name && course.author_name}
                    </p>
                    <p>
                      <b> </b>{" "}
                      {course.author_email && course.author_email}
                    </p>
                    <div className="review-area">
                      <ul className="review-stat rating ">
                        <ReactStars
                          value={TotalRating}
                          {...thirdExample2}
                        />

                        <span
                          style={{
                            fontSize: "15px",
                            color: "#707070",
                            marginTop: "10px",
                          }}
                          className="ml-2"
                        >
                          {course.rating_details[0].rating_number} (
                          {course.rating_details[0].total_rating})
                        </span>
                      </ul>
                    </div>

                    <p style={{ fontSize: "14px" }}>
                      <b> {langObj.Course_language} </b>:{" "}
                      {course.language_name && course.language_name}
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      <b> {langObj.Number_of_lessons} </b>:{" "}
                      { (course.course_type=="regular" && course.total_lesson_vedio > 0 ) &&
                        course.total_lesson_vedio}

                        {course.course_type=="xapi" && "1"}
                    </p>
                  </div>
                </>
              )}
                </div>
                  <div className="single-course-bottom-right">

                   


                    {/** ------------------------------------------------------- */}
                    {(user.token && enrollment && chap.length > 0) ||
                    (user.token &&
                      user.user_id == creatorId &&
                      chap.length > 0) ||
                    (user.token && user.user_role == 2 && chap.length > 0) ? (
                      <>
                        <h4>{langObj.course_contant} </h4>

                        <div className="course-content">
                          {/** ----------------------------- new lesson ----------------------------- */}

                          <div className="lms-right-side-menu">
                            <div id="accordion">
                              {chap.length > 0 &&
                                chap.map((chapter, j) => (
                                  <>
                                    <div className="card">
                                      <div
                                        className="card-header"
                                        id={`heading${j}`}
                                      >
                                        <a
                                          id={`parentChap${chapter.id}`}
                                          href="#"
                                          className={`btn btn-header-link ${
                                            user.user_role == 5
                                              ? lastChapter == chapter.id ||
                                                (j == 0 && lastChapter == 0)
                                                ? ""
                                                : "collapsed"
                                              : j != 0
                                              ? "collapsed"
                                              : ""
                                          }`}
                                          data-toggle="collapse"
                                          data-target={`#collapse${j}`}
                                          aria-expanded="false"
                                          aria-controls={`collapse${j}`}
                                        >
                                          <span style={{fontSize: "15px",
                                            fontWeight: "700"}} >
                                            {chapter.lessons.length > 0
                                              ? chapter.chapter_name
                                              : ""}
                                          </span>
                                        </a>
                                      </div>
                                      <div
                                        id={`collapse${j}`}
                                        className={`collapse chapterCHK selectChapter${
                                          chapter.id
                                        }  ${
                                          chapter.id == lastChapter ||
                                          (j == 0 && lastChapter == 0)
                                            ? " show"
                                            : ""
                                        }`}
                                        aria-labelledby={`heading${j}`}
                                        data-parent="#accordion"
                                      >
                                        <div className="card-body">
                                          {chapter.lessons.length > 0 &&
                                            chapter.lessons.map((less, i) => (
                                              <div
                                                style={{ marginBottom: "5px" }}
                                              >
                                                <div
                                                  id={`lessB${j}${i}`}
                                                  className={`btn-header-link2 selectLesson${
                                                    less.id
                                                  } btn active_lesson ${
                                                    less.id == lastLesson ||
                                                    (i == 0 && lastLesson == 0)
                                                      ? " active_lesson_selected "
                                                      : ""
                                                  }`}
                                                  style={{ cursor: "default" }}
                                                >
                                                  <div className="row">
                                                    <div className="col-sm-10">
                                                      <p
                                                        style={{
                                                          cursor: "pointer",
                                                          marginBottom: "5px",
                                                          fontSize:"14px",
                                                        }}
                                                        onClick={(e) => {
                                                          setVedio(
                                                            less.lesson_vedio_link,
                                                            less.lesson_vedio_type,
                                                            less.lesson_name,
                                                            less.lesson_details,
                                                            chapter.chapter_name,
                                                            chapter.id,
                                                            less.id,
                                                            less.next_lessons_data,
                                                            `parentChap${chapter.id}`
                                                          );

                                                          // nexVedioSet(chap[j])
                                                          lessonActive(
                                                            `lessB${j}${i}`
                                                          );
                                                        }}
                                                      >
                                                        {less &&
                                                          less.lesson_name}
                                                      </p>
                                                    </div>

                                                    <div className="col-sm-2">
                                                      <div className="course-content-accordian-bottom ">
                                                        {user.token && (
                                                          <>
                                                            {less.lesson_file && (
                                                              <a  
                                                              download={true}
                                                              target="_blank"
                                                                data-toggle="tooltip"
                                                                title="file download"
                                                                href={
                                                                  less.lesson_file
                                                                }
                                                                className=""
                                                              >
                                                                <i
                                                                  className="fa fa-paperclip fa-lg"
                                                                  aria-hidden="true"
                                                                ></i>
                                                              </a>
                                                            )}
                                                          </>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                {trackLessions.map(
                                                  (lessonItem) => (
                                                    <>
                                                      {lessonItem.lesson_id ==
                                                        less.id && (
                                                        <span>
                                                          {lessonItem.status ==
                                                            "completed" && (
                                                            <>
                                                              {/* , status:{" "}
                                                                {
                                                                  lessonItem.status
                                                                } */}

                                                              <ProgressBar
                                                                className=" progressBarPosition2"
                                                                isLabelVisible={
                                                                  false
                                                                }
                                                                completed={100}
                                                                bgColor={
                                                                  "green"
                                                                }
                                                                borderRadius={
                                                                  "2px"
                                                                }
                                                                height={"7px"}
                                                              />
                                                            </>
                                                          )}

                                                          {lessonItem.lesson_percentage <
                                                            90 && (
                                                            <span>
                                                              {/* , progress:{" "}
                                                                {
                                                                  lessonItem.lesson_percentage
                                                                }
                                                                % */}

                                                              <ProgressBar
                                                                className=" progressBarPosition2"
                                                                isLabelVisible={
                                                                  false
                                                                }
                                                                completed={
                                                                  lessonItem.lesson_percentage
                                                                }
                                                                bgColor={
                                                                  "#023e86"
                                                                }
                                                                borderRadius={
                                                                  "2px"
                                                                }
                                                                height={"7px"}
                                                              />
                                                            </span>
                                                          )}
                                                        </span>
                                                      )}
                                                    </>
                                                  )
                                                )}
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ))}
                            </div>
                          </div>

                          {/** ---------------------------------------------------------- */}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              {/**     <SingleXapiModal xapi_link={xapiLink} course_name={course.course_name && course.course_name.toUpperCase()} xapi_course_name={course.xapi_file_name} /> */}
            </div>
          </div>

          {(user.token && enrollment && assignment.length > 0) ||
          (user.token && user.user_id == creatorId && assignment.length > 0) ||
          (user.token && user.user_role == 2 && assignment.length > 0) ? (
            <div className="assignment-sec sec-bg">
              <div className="container">
                <div className="data-table">
                  <h3>Assignment</h3>&nbsp;
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Assignment No </th>
                          <th>Assignment Name</th>
                          <th>User Group</th>
                          <th>Course</th>
                          <th>Assignment date created</th>
                          <th>Created By</th>
                          <th>Assignment deadline</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody
                        onChange={(e) => setSelectedAssignments(e.target.value)}
                      >
                        {assignment &&
                          assignment.map((assignment) => (
                            <tr>
                              <td>1</td>
                              <td>{assignment.assignment_name}</td>
                              <td>{assignment.group_name}</td>
                              <td>{assignment.course_name}</td>
                              <td>{assignment.assignment_create}</td>
                              <td>{assignment.created_by}</td>
                              <td>{assignment.assignment_deadline}</td>
                              <td className="delete">
                                <a href={assignment.assigment_file}>
                                  <i
                                    className="fa fa-download"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/** rating */}

          {chkComment && (
            <div
              className="modal fade raddgroupModal"
              tabIndex={-1}
              role="dialog"
              id="addgroupModal"
              aria-labelledby="addgroupModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
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

                          <textarea
                            onChange={handler}
                            value={input.comment}
                            name="comment"
                            required
                            placeholder="comment ..."
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="6"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="edit-btn"
                      data-dismiss="modal"
                      onClick={ratingCreate}
                    >
                      Submit{" "}
                    </button>
                    <button
                      onClick={closeModal}
                      type="button"
                      className="delete-btn"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : chkGroups2 ? (
        <>
          <div className="single-course-top">
            <div className="container">
              <div className="media align-items-center">
                <div className="media-body ml-3">
                  <h5> Loading... </h5>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="single-course-top">
            <div className="container">
              <div className="media align-items-center">
                <div className="media-body ml-3">
                  <h5> Page Not Found </h5>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
}
