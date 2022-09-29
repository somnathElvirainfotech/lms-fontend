import React from "react";
import { useState, useEffect, useContext } from "react";
import UserService from "../../services/UserService";
import { AuthContext } from "../../index";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import { Markup } from "interweave";
import XapiService from "../../services/XapiService";
import EnrollmentService from "../../services/EnrollmentService";
// loader
import Loader from "../Loader";

// languages
import English from "../ConverLanguages/English";
import SerbianCyrilic from "../ConverLanguages/SerbianCyrilic";
import SerbianLatin from "../ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from "../../routes/routes";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function MyCourse() {
  // loader
  const [showLoader, setShowLoader] = useState(false);

  let query = useQuery();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [enrollmentcourses, setEnrollmentcourses] = useState([]);
  const [selectedEnrollmentcourses, setSelectedEnrollmentcourses] =
    useState("");

  var getXapiData = async (totalCourse) => {
    // setShowLoader(true)

    setShowLoader(true);

    var agent = user.email;
    var activity = "";
    var verb = "";

    var data = {
      agent: '{"mbox": "mailto:' + agent + '"}',
      activity: activity,
      verb: "", //`http://adlnet.gov/expapi/verbs/${verb}`
    };

    // ------ xapi course total user enroll
    //var totalCourse = ["practice1", "practice2"];

    var xapiCourse = [];

    // ------------- student all course setup -------------------------------
    for (var y of totalCourse) {
      var aa = {
        course_name: y.course_name,
        user_id: user.user_id,
        xapi_course_id: "",
        course_id: y.course_id,
        enroll_id: y.enroll_id,
        attempted: 0,
        failed: false,
        passed: false,
        total_number: 0,
        score_number: 0,
      };

      xapiCourse.push(aa);
    }

    // console.log(xapiCourse);

    // --------------------------------------------

    var tempArr = [];

    var agent = user.email;
    var activity = "";
    var verb = "";

    var data = {
      agent: '{"mbox": "mailto:' + agent + '"}',
      ascending: false,
    };
    var responce = await XapiService.getXapiStatements(data);

    // ----- -----------------------------
    for (var item of xapiCourse) {
      var count = 0;

      if (responce.data.statements.length > 0) {
        for (var singleRes of responce.data.statements) {
          console.log(singleRes.object.definition.name);

          if ("definition" in singleRes.object) {
            if ("name" in singleRes.object.definition) {
              if (item.course_name == singleRes.object.definition.name.und) {
                // console.log("sss");

                if ("result" in singleRes) {
                  if (
                    "completion" in singleRes.result &&
                    singleRes.result.completion == true
                  ) {
                    if ("success" in singleRes.result) {
                      console.log("item  ", singleRes.result.success);

                      if (singleRes.result.success) {
                        item.passed = true;
                        item.failed = false;
                        item.total_number = singleRes.result.score.max;
                        item.score_number = singleRes.result.score.raw;
                      } else {
                        if (item.passed == false) {
                          item.failed = true;
                          item.passed = false;
                          item.total_number = singleRes.result.score.max;
                          item.score_number = singleRes.result.score.raw;
                        }
                      }

                      tempArr.push(item);
                    }
                  }
                } else {
                  item.attempted = count + 1;
                }
              }
            }
          }
        }
      }
    }

    console.log("xapi data", xapiCourse);

    if (xapiCourse.length > 0) {
      console.log(xapiCourse);
      // enrollment status updated  ------------------
      var updteEnrollStatus = await EnrollmentService.enrollmentStatusUpdate(
        xapiCourse
      );
      // console.log(updteEnrollStatus.data)
    }

    setShowLoader(false);
  };

  useEffect(() => {
    getAllcourse();
  }, []);

  var getAllcourse = async () => {
    if (user.user_role == 5) {
      setShowLoader(true);
      var responce = await UserService.enrollmentcourse(user.user_id, "");
      setEnrollmentcourses(responce.data.data);

      console.log("all courses", responce.data);
      setShowLoader(false);

      var data = [];
      for (var i of responce.data.data) {
        if (i.course_details[0].course_type == "xapi") {
          var temp = {
            course_id: i.course_details[0].id,
            enroll_id: i.enroll_id,
            course_name: i.course_details[0].xapi_file_name,
          };

          data.push(temp);
        }
      }

      // xapi
      getXapiData(data);
    } else if (user.user_role == 4) {
      setShowLoader(true);
      var responce = await UserService.allCourses();
      console.log(responce.data);
      setEnrollmentcourses(responce.data.data);
      setShowLoader(false);
    }
  };

  var geotoCertificate = (
    user_name,
    email,
    course_name,
    date,
    certificate_id
  ) => {
    navigate("/Certificate", {
      state: {
        user_name: user_name,
        firstname: user.firstname,
        lastname: user.lastname,
        email: email,
        course_name: course_name,
        date: date,
        certificate_id: certificate_id,
      },
    });
  };

  const { languageList } = useContext(LangContext);
  const [langObj, setLangObj] = useState({});

  useEffect(() => {
    if (languageList.language_name === "english") {
      setLangObj(English);
    } else if (languageList.language_name === "СРБ") {
      setLangObj(SerbianCyrilic);
    } else if (languageList.language_name === "SRB") {
      setLangObj(SerbianLatin);
    }
  }, [languageList.language_name]);

  return (
    <React.Fragment>
      {/** loader */}
      {showLoader && <Loader />}

      {user.user_role != 2 && enrollmentcourses.length > 0 ? (
        <div className="my-course">
          <div className="container">
            <div className="inner-sec-head">
              <h2>{langObj.your_online_courses}</h2>
              {/**  <h4>Build your career with new skills</h4> */}
            </div>
            <div id="my-course-list-slider" className="owl-carousel1">
              <div className="slider-item">
                <div className="my-course-list">
                  <div className="accordion" id="accordionExample">
                    <div className="item">
                      {user.user_role == 5 && (
                        <div className="item-header" id="headingOne">
                          {/**       <h2>
                                                    <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Last seen : (8.50 a.m.)
                                                        <i className="fa fa-angle-down"></i>
                                                    </button>


                                                </h2> */}
                        </div>
                      )}

                      {/** for enrollment course list */}
                      {user.user_role == 5 && (
                        <div
                          id="collapseOne"
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordionExample"
                          onChange={(e) =>
                            setSelectedEnrollmentcourses(e.target.value)
                          }
                        >
                          {enrollmentcourses.map((enrollmentcourse) => (
                            <div className="my-course-details">
                              <div className="row align-items-center">
                                <div className="col-md-4">
                                  <div className="my-course-img">
                                    <img
                                      src={
                                        enrollmentcourse.course_details[0].image
                                      }
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </div>
                                </div>

                                <div className="col-md-8">
                                  <div className="my-course-content">
                                    <h4>
                                      {
                                        enrollmentcourse.course_details[0]
                                          .course_name
                                      }
                                    </h4>
                                    <p>
                                      <Markup
                                        content={
                                          enrollmentcourse.course_details[0]
                                            .short_description
                                        }
                                      />
                                    </p>

                                    {enrollmentcourse.course_details[0]
                                      .course_type == "regular" && (
                                      <>
                                        {" "}
                                        <h5 className="course-status">
                                          complete{" "}
                                          {enrollmentcourse.course_progress
                                            ? enrollmentcourse.course_progress
                                            : 0}
                                          %
                                        </h5>
                                      </>
                                    )}

                                    {enrollmentcourse.course_progress == 100 &&
                                      enrollmentcourse.enrollment_status ==
                                        "completed" &&
                                      enrollmentcourse.course_details[0]
                                        .course_type == "xapi" && (
                                        <h5 className="course-status ml-3">
                                          Passed
                                        </h5>
                                      )}

                                    {enrollmentcourse.enrollment_status ==
                                      "failed" &&
                                      enrollmentcourse.course_details[0]
                                        .course_type == "xapi" && (
                                        <h5 className="course-status ml-3">
                                          Failed
                                        </h5>
                                      )}

                                    {enrollmentcourse.course_details[0]
                                      .course_type == "xapi" && (
                                      <>
                                        {enrollmentcourse.course_details[0]
                                          .no_attempted != 0 && (
                                          <h5 className="course-status ml-3">
                                            Attempted{" "}
                                            {
                                              enrollmentcourse.course_details[0]
                                                .no_attempted
                                            }
                                          </h5>
                                        )}
                                      </>
                                    )}

                                    {enrollmentcourse.enrollment_status ==
                                      "completed" && (
                                      <h5
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) =>
                                          geotoCertificate(
                                            user.username.toUpperCase(),
                                            user.email,
                                            enrollmentcourse.course_details[0].course_name.toUpperCase(),
                                            enrollmentcourse.updated_at,
                                            enrollmentcourse.course_details[0]
                                              .certificate_id
                                          )
                                        }
                                        className="course-status ml-3"
                                      >
                                        <i
                                          class="fa fa-download"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        Download
                                      </h5>
                                    )}

                                    {enrollmentcourse.course_details[0]
                                      .course_type != "xapi" && (
                                      <Link
                                        to={`/singlecourse`}
                                        state={{
                                          singleCourseId:
                                            enrollmentcourse.course_details[0]
                                              .id,
                                        }}
                                      >
                                        Continue{" "}
                                        <i
                                          className="fa fa-arrow-right"
                                          aria-hidden="true"
                                        ></i>
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* <div className="item">
                                        <div className="item-header" id="headingTwo">
                                            <h2 className="mb-0">
                                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Yesterday seen :
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div className="my-course-details">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="my-course-img">
                                                            <img src="images/my-course1.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="my-course-content">
                                                            <h4>Data Analytics</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                            <h5 className="course-status">Not completed</h5>
                                                            <a href="#">Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className="slider-item">
                            <div className="my-course-list">
                                <div className="accordion" id="accordionExample2">
                                    <div className="item">
                                        <div className="item-header" id="headingThree">
                                            <h2>
                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                    Last seen : (8.50 a.m.)
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <div className="my-course-details">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="my-course-img">
                                                            <img src="images/my-course1.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="my-course-content">
                                                            <h4>Data Analytics</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                            <h5 className="course-status">Not completed</h5>
                                                            <a href="#">Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="item-header" id="headingFour">
                                            <h2 className="mb-0">
                                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                    Yesterday seen :
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseFour" className="collapse show" aria-labelledby="headingFour" data-parent="#accordionExample">
                                            <div className="my-course-details">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="my-course-img">
                                                            <img src="images/my-course1.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="my-course-content">
                                                            <h4>Data Analytics</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                            <h5 className="course-status">Not completed</h5>
                                                            <a href="#">Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
