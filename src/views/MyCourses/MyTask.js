import React, { useState, useEffect, useContext } from "react";
import UserService from "../../services/UserService";
import AssignmentService from "../../services/AssignmentService";
import { AuthContext } from "../../index";
import { Markup } from "interweave";

import TaskService from "../../services/TaskService";
import { useNavigate, Link, useLocation } from "react-router-dom";
import UserTaskService from "../../services/UserTaskService";
import {
  setCookie,
  getCookie,
  removeCookie,
} from "../../middleware/CookieSetup";
import SingleXapiModal from "../SingleXapiModal";

// loader
import Loader from "../Loader";

// languages
import English from "../ConverLanguages/English";
import SerbianCyrilic from "../ConverLanguages/SerbianCyrilic";
import SerbianLatin from "../ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from "../../routes/routes";

export default function MyTask() {
  const [assignments, setAssignments] = useState([]);
  const [count, setCount] = useState(0);
  const { user } = useContext(AuthContext);
  const [enrollment, setEnrollments] = useState();
  const navigate = useNavigate();
  const [dataLen, setDataLen] = useState(0);
  const location = useLocation();
  const pathname = location.pathname;
  const [cAss, setCass] = useState(0);

  useEffect(() => {
    // console.log("location ............... ",location)
    // if (user.user_role == 5) {
    //     var responce = await UserService.assignment(user.user_id);
    //     setAssignments(responce.data.data);
    // } else if (user.user_role == 4) {
    //     var responce = await AssignmentService.getAll();
    //     setAssignments(responce.data.data);
    // }

    (async () => {
      var data = {
        group_id: "",
        created_by: "",
        user_id: user.user_id,
      };
      var responce = await TaskService.search(data);
      console.log("object ------- ", data);
      console.log("assignment ............ ", responce.data.data);
      // setAssignments([...responce.data.data]);
      chkAllGroups(responce.data.data);
      setCount(responce.data.data.length);

      // var chk = 0;
      // for (var i of responce.data.data) {
      //   if (i.user_task_status != "passed") chk += 1;
      // }
      // console.log(chk);
      // setCass(chk);
      // alert(chk)
    })();
  }, []);

  const [enroll, setEnroll] = useState(false);
  const [xapiLink, setxapiLink] = useState("");
  const [xapFileName, setxapFileName] = useState("");
  const [xapCourse, setxapCourse] = useState("");

  var getCourse = async (courseId, taskId, no_attempted, course_name) => {
    setShowLoader(true)
    var enrollRes = await UserService.enrollmentcourse(user.user_id, courseId);
    var status = false;
    console.log(enrollRes.data);
    if (enrollRes.data.status) {
      if (enrollRes.data.data[0].user_enroll_status == "active") {
        status = true;
        setEnroll(true);
      }
    }

    // get all data
    var data = {
      group_id: user.user_group_id,
      created_by: "",
      user_id: user.user_id,
    };
    var responce = await TaskService.search(data);
    console.log(responce.data.data);

   
    // task chk ------------------------------
    var tData=[];

    for(var i of responce.data.data)
    {
      if(i.user_task_status != "passed" &&
      Date.parse(new Date().toISOString().slice(0, 10)) <=
        Date.parse(i.task_end_date))
        {
          tData.push(i)
        }

    }

    setAssignments([...tData]);
    // ---------------------------------

    setCount(responce.data.data.length);
    ////////////////////

    if (status) {
      var chk = await UserTaskService.create({
        user_id: user.user_id,
        task_id: taskId,
        no_attempted: no_attempted + 1,
      });
      // console.log(chk.data)

      var cresponce = await UserService.singlecourse(courseId);
      var temp = cresponce.data.data;

      console.log("asd vcvsf ================ ", temp);

      if (temp.course_type == "xapi") {
        var authdata = { username: user.username, email: user.email };
        // setxapiLink(temp.xapi_attachment_file);
        // setxapFileName(temp.xapi_file_name);
        // setxapCourse(course_name ? course_name.toUpperCase() : '');

        // setXapiLink(temp.xapi_attachment_file,course_name,temp.xapi_file_name)

        // xapi_link={xapiLink} course_name={xapCourse} xapi_course_name={xapFileName}

        // setCookie("xapi_result_name", temp.xapi_file_name)

        var task_id = taskId != undefined ? Number(taskId) : 0;
        var enroll_id =
          enrollRes.data.data[0].enroll_id != undefined
            ? Number(enrollRes.data.data[0].enroll_id)
            : 0;

            setShowLoader(false)
        window.open(
          `/singlexapi?link=${btoa(
            temp.xapi_attachment_file +
              "?USER_ID=" +
              user.user_id +
              "&ENROLL_ID=" +
              enroll_id +
              "&TASK_ID=" +
              task_id +
              "&USER_ROLE=" +
              user.user_role +
              "&USER_EMAIL=" +
              user.email +
              "&USER_NAME=" +
              user.username
          )}`,
          "_blank"
        );

        // navigate(`/singlexapi?link=${temp.xapi_attachment_file}`,{replace:true,target:'_blank'})
      } else {

        setShowLoader(false)
        //window.location.replace(`/singlecourse?id=${courseId}`)
        navigate(`/courses/${course_name.replaceAll(" ", "-")}`, {
          state: {
            singleCourseId: courseId,
            taskId: taskId,
            courseType: temp.course_type,
          },
        });
      }
    } else {
      var cresponce = await UserService.singlecourse(courseId);
      var temp = cresponce.data.data;

      setShowLoader(false)
      // window.location.replace(`/singlecourse?id=${courseId}`)
      navigate(`/courses/${course_name.replaceAll(" ", "-")}`, {
        state: {
          singleCourseId: courseId,
          taskId: taskId,
          courseType: temp.course_type,
        },
      });
    }

    setShowLoader(false)
  };

  var setXapiLink = (link, course_name, xapi_course_name) => {
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

  // loader
  const [showLoader, setShowLoader] = useState(false);

  const [chkGroups, setChkGroup] = useState(false);

  // check coourse and user group
  var chkAllGroups = (taskData) => {
    var Group = user.user_groups.split(",");
    var userGroup = Group.map((i) => Number(i));
    setShowLoader(true);
    console.log("user group", userGroup);

    var data = [];

    for (var p of taskData) {

      if (p.user_task_status != "passed")
      {

      for (var item of p.group_details) {
        if (userGroup.includes(item.group_id)) {
          // console.log(userGroup.includes(item.group_id));
          // setChkGroup(true);
          data.push(p);
          break;
        }
      }
    }

    }

    // task chk ------------------------------
    var tData=[];

    for(var i of data)
    {
      if(i.user_task_status != "passed" &&
      Date.parse(new Date().toISOString().slice(0, 10)) <=
        Date.parse(i.task_end_date))
        {
          tData.push(i)
        }

    }

    console.log("tdata ",tData)

    setAssignments([...tData]);
    // ---------------------------------

    // setAssignments([...data]);

    setShowLoader(false);
    console.log("new task data ", data);
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


  return (
    <>
      {/** loader */}
      {showLoader && <Loader />}

      <div>
        <div className="my-assignment">
          <div className="container">
            <div className="inner-sec-head">
              <h2>{langObj.my_task} </h2>
            </div>

            <div id="task-list-slider" className="owl-carousel1">
              <div className="assignment-item">
                 
                    {assignments.map((assignment, i) => (
                      <>
                        {assignment.user_task_status != "passed" &&
                        Date.parse(new Date().toISOString().slice(0, 10)) <=
                          Date.parse(assignment.task_end_date) ? (
                          <div className="my-course-details">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <div className="my-course-img">
                                      <img style={{cursor:"pointer"}} onClick={(e) =>
                                        getCourse(
                                          assignment.course_id,
                                          assignment.id,
                                          assignment.no_attempted,
                                          assignment.course_name
                                        )
                                      } src={assignment.course_image && assignment.course_image} className="img-fluid" alt="" /> 
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="my-course-content">
                                  <h4 style={{cursor:"pointer"}} onClick={(e) =>
                                    getCourse(
                                      assignment.course_id,
                                      assignment.id,
                                      assignment.no_attempted,
                                      assignment.course_name
                                    )
                                  } >{assignment.task_name.toUpperCase()} </h4>
                                  
                                  <p>
                                    {" "}
                                    <b>COURSE NAME :</b>{" "}
                                    {assignment.course_name &&
                                      assignment.course_name.toUpperCase()}{" "}
                                  </p>
                                  <p>
                                    {" "}
                                    <b>{langObj.start_date} :</b>{" "}
                                    {new Date(
                                      assignment.task_start_date
                                    ).toLocaleDateString()}{" "}
                                    &nbsp; &nbsp; &nbsp; <b>{langObj.end_date}  :</b>{" "}
                                    {new Date(
                                      assignment.task_end_date
                                    ).toLocaleDateString()}
                                  </p>

                                 {/**  <div width="30px">
                                    <b> DESCRIPTION : </b>
                                    <p>
                                      <Markup
                                        content={assignment.task_describtion}
                                      />{" "}
                                    </p>
                                  </div> */}

                                  {/** {assignment.no_attempted == 0 && (
                                    <h5 className="course-status">
                                      {" "}
                                      {assignment.user_task_status}
                                    </h5>
                                  )} */}

                                  {assignment.no_attempted != 0 && (
                                    <h5 className="course-status">
                                      {" "}
                                      Attempted {assignment.no_attempted}
                                    </h5>
                                  )}

                                  {assignment.user_task_status == "passed" && (
                                    <h5 className="course-status ml-2">
                                      {" "}
                                      Passed
                                    </h5>
                                  )}

                                  {assignment.user_task_status == "failed" && (
                                    <h5 className="course-status ml-2">
                                      {" "}
                                      Failed
                                    </h5>
                                  )}

                                  {/**   {assignment.user_task_status != 'passed' && assignment.user_task_status != 'No Attempted' ?
                                                                < Link to="" onClick={e => getCourse(assignment.course_id, assignment.id, assignment.no_attempted, assignment.course_name)} data-toggle="modal"
                                                                    data-target="#modal-fullscreen-xl"
                                                                    data-backdrop="static"
                                                                    data-keyboard="false"
                                                                > Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></Link>
                                                                : ''} 

                                                             {assignment.user_task_status != 'passed'  ?
                                                                < Link to="" onClick={e => getCourse(assignment.course_id, assignment.id, assignment.no_attempted, assignment.course_name)} > Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></Link>
                                                                : ''}   */}

                                  {assignment.user_task_status != "passed" ? (
                                    <Link
                                      to=""
                                      onClick={(e) =>
                                        getCourse(
                                          assignment.course_id,
                                          assignment.id,
                                          assignment.no_attempted,
                                          assignment.course_name
                                        )
                                      }
                                    >
                                      {" "}
                                      {langObj.continue}{" "}
                                      <i
                                        className="fa fa-arrow-right"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  ) : (
                                    ""
                                  )}

                                  {/* <button
                                                                className="sec-btn"
                                                                data-toggle="modal"
                                                                data-target="#modal-fullscreen-xl"
                                                                onClick={() => setXapiLink(course.xapi_attachment_file)}
                                                            >
                                                                VIEW COURSE
                                                            </button> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ))} 

                    {assignments.length==0 && <>
                      <div className="my-course-details">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <div className="my-course-img">
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className="my-course-content">
                                  <h4> No active tasks </h4>                               
                                </div>
                              </div>
                            </div>
                          </div>
                      </>}
                 
              </div>
            </div>
          </div>
        </div>

        {/**  <SingleXapiModal xapi_link={xapiLink} course_name={xapCourse} xapi_course_name={xapFileName} /> */}
      </div>
    </>
  );
}
