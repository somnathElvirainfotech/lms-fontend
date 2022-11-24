import React from "react";
import { useState, useEffect, useContext } from "react";
import UserService from "../../services/UserService";
import { AuthContext } from "../../index";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

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
import MyTask from "./MyTask";

import GenarateCertificateService from "../../services/GenarateCertificateService";
import { toast } from "react-toastify";



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function MyCourse() {

  const options = {
    margin: 30,
    loop:true,
    responsiveClass: true,
    nav: false,
    dots: true,
    autoplay: false,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    items:1
};

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
        enrollment_id:y.enrollment_id,
        user_email:y.user_email,
        course_type:y.course_type,
        course_name: y.course_name,
        user_id: user.user_id,
        timestamp:y.timestamp,
        updateTimestamp:"",
        enrollment_status:y.enrollment_status,
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
          // console.log(singleRes.object.definition.name);

          if ("definition" in singleRes.object) {
            if ("name" in singleRes.object.definition) {
              if (
                item.course_name == singleRes.object.definition.name.und &&
                Date.parse(singleRes.timestamp) > Date.parse(item.timestamp)
              ) {

              //  console.log("one");

                

              //   console.log("sssss");

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
                        item.updateTimestamp=singleRes.timestamp
                      } else {
                        if (item.passed == false) {
                          item.failed = true;
                          item.passed = false;
                          item.total_number = singleRes.result.score.max;
                          item.score_number = singleRes.result.score.raw;
                          item.updateTimestamp=singleRes.timestamp
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
      // console.log(xapiCourse);
      
      // enrollment status updated  ------------------
      await EnrollmentService.enrollmentStatusUpdate(
        xapiCourse
      );
    
      // result save----------

      for(var i of xapiCourse)
      {
        console.log("x course ", i.course_name);
          if(i.passed && i.updateTimestamp > i.timestamp)
          {
            if (i.enrollment_status == "completed") {
              console.log("sub one");
              await XapiService.saveResult({
                enrollment_id: i.enrollment_id,
                course_name: i.course_name,
                course_type: i.course_type,
                user_email: i.user_email,
              });
            }
            
          }

          
          
      }
    }

    setShowLoader(false);

    // mycourse
    // var responce = await UserService.enrollmentcourse(user.user_id, "");
    // setEnrollmentcourses(responce.data.data);
   
   
    
  };

  useEffect(() => {
    
    getAllcourse();
  }, []);

  var getAllcourse = async () => {
    if (user.user_role == 5) {
      setShowLoader(true);
      var responce = await UserService.enrollmentcourse(user.user_id, "");
      setEnrollmentcourses(responce.data.data);

      

      console.log("all courses", responce.data.data);
      setShowLoader(false);

      var data = [];
      for (var i of responce.data.data) {
        if (i.course_details[0].course_type == "xapi") {

          // if (i.enrollment_status == "completed") {
          //   await XapiService.saveResult({
          //     enrollment_id: i.enroll_id,
          //     course_name: i.course_details[0].xapi_file_name,
          //     course_type: i.course_details[0].course_type,
          //     user_email: i.user_details[0].email,
          //   });
          // }

          var temp = {
            course_id: i.course_details[0].id,
            enroll_id: i.enroll_id,
            course_name: i.course_details[0].xapi_file_name,
            timestamp:
              i.course_details[0].updated_at == null
                ? i.course_details[0].created_at
                : i.course_details[0].updated_at,

            enrollment_id: i.enroll_id,
            course_type: i.course_details[0].course_type,
            user_email: i.user_details[0].email,
            enrollment_status: i.enrollment_status,
          };

          data.push(temp);
        }
      }

      // xapi
      //getXapiData(data);

    } else if (user.user_role == 4) {
      setShowLoader(true);
      var responce = await UserService.allCourses();
      console.log(responce.data);
      setEnrollmentcourses(responce.data.data);
      setShowLoader(false);
    }
  };


  // certificate ----------------------------------------------
  var geotoCertificate = async(
    user_name,
    email,
    course_name,
    date,
    certificate_id,
    enroll_id
  ) => {
    // navigate("/Certificate", {
    //   state: {
    //     user_name: user_name,
    //     firstname: user.firstname,
    //     lastname: user.lastname,
    //     email: email,
    //     course_name: course_name,
    //     date: date,
    //     certificate_id: certificate_id,
    //   },
    // });

    setShowLoader(true)

    var payload={
      user_name: user_name,
      firstname: user.firstname,
      lastname: user.lastname,
      cert_course_name: course_name,
      date: date,
      certificate_id: certificate_id,
      enroll_id:enroll_id,
      email:email
    }


    var responce=await GenarateCertificateService.create(payload);

    if(responce.data.status)
    {
        // console.log("certificate link  ",responce.data.data[0].certificate)
        toast.success(responce.data.msg)
     
        const link = document.createElement('a');
        link.href = responce.data.data[0].certificate;
        link.download = true;
        link.setAttribute('target', '_blank');
        link.blank=
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);


    }


   



    setShowLoader(false)

  };

  var goSinglePage=(cname,cid)=>{
    navigate(`/courses/${cname.replaceAll(" ","-")}`,{state:{singleCourseId:cid}});
  }

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

                        {/** 
                        <OwlCarousel className="slider-items owl-carousel" {...options} >
*/}
                          {enrollmentcourses.map((enrollmentcourse)=>(
                            
                            <div className="my-course-details ">
                              <div className="row align-items-center">

                                <div className="col-md-4">
                                  <div className="my-course-img" style={{cursor: "pointer"}}  onClick={()=>goSinglePage(enrollmentcourse.course_details[0]
                                    .course_name,enrollmentcourse.course_details[0]
                                    .id)} >
                                    <img                                

                                      src={enrollmentcourse.course_details.length>0 && enrollmentcourse.course_details[0].image}

                                      className="img-fluid"
                                      alt=""
                                    />
                                  </div>
                                </div>

                                <div className="col-md-8">
                                  <div className="my-course-content">
                                    <h4 style={{cursor: "pointer"}} onClick={()=>goSinglePage(enrollmentcourse.course_details[0]
                                      .course_name,enrollmentcourse.course_details[0]
                                      .id)} >
                                      {enrollmentcourse.course_details.length>0 &&
                                        enrollmentcourse.course_details[0]
                                          .course_name &&  enrollmentcourse.course_details[0]
                                          .course_name.toUpperCase()
                                      }
                                    </h4>
                                    <p>
                                      <Markup
                                        content={
                                          enrollmentcourse.course_details.length>0 && enrollmentcourse.course_details[0]
                                            .short_description
                                        }
                                      />
                                    </p>

                                    {enrollmentcourse.course_details.length>0 && enrollmentcourse.course_details[0]
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
                                      "completed" &&
                                      enrollmentcourse.course_details[0]
                                        .certificate_id != 0 && (
                                        <h5
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) =>
                                            geotoCertificate(
                                              user.username.toUpperCase(),
                                              user.email,
                                              enrollmentcourse.course_details[0].course_certificate_name.toUpperCase(),
                                              enrollmentcourse.updated_at,
                                              enrollmentcourse.course_details[0].certificate_id,
                                              enrollmentcourse.enroll_id
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


                                      {/** remove contimue */}
                                    {enrollmentcourse.course_details[0]
                                      .course_type == "hidden" && (
                                      <Link
                                        to={`/courses/${ enrollmentcourse.course_details[0]
                                          .course_name.replaceAll(" ","-")}`}
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

                            
                            {/** 
                          </OwlCarousel>
                        */}
                        </div>
                      )}
                    </div>
                    
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
