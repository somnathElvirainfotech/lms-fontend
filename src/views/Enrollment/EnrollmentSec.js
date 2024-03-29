import React, { useEffect, useState, useContext } from "react";
import TokenHelper from "../../services/TokenHelper";
import UserService from "../../services/UserService";
import CourseService from "../../services/CourseService";
import EnrollmentService from "../../services/EnrollmentService";
import { AuthContext } from "../../index";
import ReactPaginate from "react-paginate";

import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";

import XapiService from "../../services/XapiService";
import { setCookie, getCookie, removeCookie } from '../../middleware/CookieSetup';

// import { Button } from "react-bootstrap";

// loader
import Loader from "../Loader";

export default function EnrollmentSec() {
  // loader
  const [showLoader, setShowLoader] = useState(false);
  const [xapiu, setXapiu] = useState(false);

  const { user } = useContext(AuthContext);
  const [enrollment, setEnrollment] = useState([]);
  const [course, setCourse] = useState([]);

  const [input, setInput] = useState({});
  const [csv_data, setCsvData] = useState([]);

  var formatDate=(date)=>{
    var d = new Date(date);
    var month = "" + (d.getMonth() + 1);
    var day = "" + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day,month,year].join("/");
  }

  // xapi ----------------


  var chkDuplicate = (arr, valu) => {

    for (var i of arr) {
      if (i.viewId == valu) {
        return false;
      }
    }

    return true;

  }

  var chkDuplicate2 = (arr, valu) => {

    for (var i of arr) {
      var a = i.course_name.split("xapi_");
      var cn = a[1] ? a[1] : a[0];
      if (cn == valu) {
        return false;
      }
    }

    return true;

  }

  var chkDuplicate3 = (arr, valu) => {

    for (var i of arr) {

      if (i.groupId == valu) {
        return false;
      }
    }

    return true;

  }


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
        enrollment_id: y.enrollment_id,
        user_email: y.user_email,
        course_type: y.course_type,
        course_name: y.course_name,
        user_id: user.user_id,
        timestamp: y.timestamp,
        updateTimestamp: "",
        enrollment_status: y.enrollment_status,
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

    // // console.log(xapiCourse);

    // --------------------------------------------

    var tempArr = [];

    var agent = user.email;
    var activity = "";
    var verb = "";

    var data = {
      agent: '{"mbox": "mailto:' + agent + '"}',
      verb: `http://adlnet.gov/expapi/verbs/passed`,
      ascending: false,
    };
    var responce = await XapiService.getXapiStatements(data);

    // ----- -----------------------------
    for (var item of xapiCourse) {
      var count = 0;

      if (responce.data.statements.length > 0) {
        for (var singleRes of responce.data.statements) {
          // // console.log(singleRes.object.definition.name);

          // console.log("--", chkDuplicate(tempArr, singleRes.context.extensions["ispring://view_id"]));
          // console.log("--", chkDuplicate2(tempArr, singleRes.object.definition.name.und));

          if (chkDuplicate(tempArr, singleRes.context.extensions["ispring://view_id"]) && chkDuplicate2(tempArr, singleRes.object.definition.name.und) &&
            chkDuplicate3(tempArr, singleRes.context.contextActivities.grouping[0].id)) {

            // console.log("object ", singleRes.context.extensions["ispring://view_id"]);

            if ("definition" in singleRes.object) {
              if ("name" in singleRes.object.definition) {
                if (
                  item.course_name == singleRes.object.definition.name.und &&
                  Date.parse(singleRes.timestamp) > Date.parse(item.timestamp)
                ) {

                  //  // console.log("one");



                  //   // console.log("sssss");

                  if ("result" in singleRes) {
                    if (
                      "completion" in singleRes.result &&
                      singleRes.result.completion == true
                    ) {
                      if ("success" in singleRes.result) {
                        // console.log("item  ", singleRes.result.success);

                        if (singleRes.result.success) {
                          item.passed = true;
                          item.failed = false;
                          item.total_number = singleRes.result.score.max;
                          item.score_number = singleRes.result.score.raw;
                          item.updateTimestamp = singleRes.timestamp
                          item.enrollment_status = "completed"
                          item.viewId = singleRes.context.extensions["ispring://view_id"]
                          item.groupId = singleRes.context.contextActivities.grouping[0].id;
                        }

                        // else {
                        //   if (item.passed == false) {
                        //     item.failed = true;
                        //     item.passed = false;
                        //     item.total_number = singleRes.result.score.max;
                        //     item.score_number = singleRes.result.score.raw;
                        //     item.updateTimestamp=singleRes.timestamp
                        //   }
                        // }

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
    }

    // --------------- failed


    if (xapiCourse[0].passed == false && xapiCourse[0].failed == false) {

      var data = {
        agent: '{"mbox": "mailto:' + agent + '"}',
        verb: `http://adlnet.gov/expapi/verbs/failed`,
        ascending: false,
      };
      var responce = await XapiService.getXapiStatements(data);

      for (var item of xapiCourse) {
        var count = 0;

        if (responce.data.statements.length > 0) {
          for (var singleRes of responce.data.statements) {
            // // console.log(singleRes.object.definition.name);

            // console.log("--", chkDuplicate(tempArr, singleRes.context.extensions["ispring://view_id"]));
            // console.log("--", chkDuplicate2(tempArr, singleRes.object.definition.name.und));

            if (chkDuplicate(tempArr, singleRes.context.extensions["ispring://view_id"]) && chkDuplicate2(tempArr, singleRes.object.definition.name.und) &&
              chkDuplicate3(tempArr, singleRes.context.contextActivities.grouping[0].id)) {

              // console.log("object ", singleRes.context.extensions["ispring://view_id"]);

              if ("definition" in singleRes.object) {
                if ("name" in singleRes.object.definition) {
                  if (
                    item.course_name == singleRes.object.definition.name.und &&
                    Date.parse(singleRes.timestamp) > Date.parse(item.timestamp)
                  ) {

                    //  // console.log("one");



                    //   // console.log("sssss");

                    if ("result" in singleRes) {
                      if (
                        "completion" in singleRes.result &&
                        singleRes.result.completion == true
                      ) {
                        if ("success" in singleRes.result) {
                          // // console.log("item  ", singleRes.result.success);

                          if (singleRes.result.success == false) {
                            item.passed = false;
                            item.failed = true;
                            item.total_number = singleRes.result.score.max;
                            item.score_number = singleRes.result.score.raw;
                            item.updateTimestamp = singleRes.timestamp
                            item.enrollment_status = "failed"
                            item.viewId = singleRes.context.extensions["ispring://view_id"]
                            item.groupId = singleRes.context.contextActivities.grouping[0].id;
                          }

                          // else {
                          //   if (item.passed == false) {
                          //     item.failed = true;
                          //     item.passed = false;
                          //     item.total_number = singleRes.result.score.max;
                          //     item.score_number = singleRes.result.score.raw;
                          //     item.updateTimestamp=singleRes.timestamp
                          //   }
                          // }


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
      }

    }

    // ----------------------------

    // console.log("xapi data", xapiCourse);



    if (xapiCourse.length > 0) {
      // // console.log(xapiCourse);

      // enrollment status updated  ------------------
      await EnrollmentService.enrollmentStatusUpdate(
        xapiCourse
      );

      // result save----------

      for (var i of xapiCourse) {
        // console.log("x course ", i.course_name);
        if (i.passed && i.updateTimestamp > i.timestamp) {
          if (i.enrollment_status == "completed") {
            // console.log("sub one");
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
    setXapiu(true)

    // get enroll page enrollment list
    var responce = await EnrollmentService.getUserEnrollmentList();
    setEnrollment(responce.data.data);
    getDataPagi(responce.data.data, 0 * PER_PAGE);





  };


  // end xapi ----------------

  // admin
  const headers = [
    { label: "Date", key: "date" },
    { label: "Student Id", key: "student_id" },
    { label: "Student Name", key: "student_name" },
    { label: "Student Email", key: "student_email" },
    { label: "Course Name", key: "course_name" },
    { label: "Course Type", key: "course_type" },
    { label: "Course Category", key: "course_category" },
    { label: "Course Status", key: "course_status" },
    { label: "Course Total Number", key: "total_number" },
    { label: "Course Score Number", key: "score_number" },
    { label: "User Progress", key: "user_progress" },
    { label: "Teacher’s Name", key: "teacher_name" },
    { label: "Teacher’s Email", key: "teacher_email" },
    { label: "Points Won", key: "points_won" },
    { label: "Assignment No", key: "assignment_no" },
    { label: "Assignment Deadline", key: "assignment_deadline" },
    { label: "Rating", key: "rating" },
    { label: "Comment", key: "comment" },
  ];

  // creator
  const headers2 = [
    { label: "Date", key: "date" },
    { label: "Student Id", key: "student_id" },
    { label: "Student Name", key: "student_name" },
    { label: "Course Name", key: "course_name" },
    { label: "Course Type", key: "course_type" },
    { label: "Course Category", key: "course_category" },
    { label: "Course Status", key: "course_status" },
    { label: "User Progress", key: "user_progress" },
    { label: "Points Won", key: "points_won" },
    { label: "Assignment No", key: "assignment_no" },
    { label: "Assignment Deadline", key: "assignment_deadline" },
    { label: "Rating", key: "rating" },
    { label: "Comment", key: "comment" },
  ];

  // react pagination  //////////////////////////
  const PER_PAGE = 50;
  const [currentPageData, setCurrentPageData] = useState([]);
  const pageCount = Math.ceil(enrollment.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    getDataPagi(enrollment, selectedPage * PER_PAGE);
  }

  function getDataPagi(data, offset) {
    var temp = [];
    // console.log("offset", offset);
    data.slice(offset, offset + PER_PAGE).map((item) => {
      temp.push(item);
    });
    setCurrentPageData(temp);
  }

  // /////////////////////////////////

  async function customersData() {
    var custs = [];
    if (user.user_role == 4) {
      var data = new FormData();
      data.append("cid", "");
      data.append("fromdate", input.date != undefined ? input.date : "");
      data.append("todate", "");
      data.append("user_email", user.email);
      data.append("std_no", input.std_no != undefined ? input.std_no : "");

      var responce = await EnrollmentService.getAll(data);
      custs = responce.data.data;
    } else if (user.user_role == 2 || user.user_role == 1) {
      var data = new FormData();
      data.append("cid", "");
      data.append("fromdate", "");
      data.append("todate", "");
      data.append("user_email", "");
      data.append("std_no", "");

      var responce = await EnrollmentService.getAll(data);
      custs = responce.data.data;
    }

    // console.log(custs);

    var data = [];
    for (var item of custs) {
      var temp = {
        date: item.enrollment_create_date,
        student_id: item.user_details[0]?.user_hr_no,
        student_name: item.user_details[0]?.fullname,
        student_email: item.user_details[0]?.email,
        course_name: item.course_details[0]?.course_name,
        course_type: item.course_details[0]?.course_type,
        course_category: item.course_details[0]?.category_name,
        user_progress: `${item.course_progress ? item.course_progress : 0}%`,
        teacher_name: `${item.course_details[0]?.creator_name.toUpperCase()}`,
        teacher_email: item.course_details[0]?.creator_email,
        points_won: 0,
        assignment_no: item.assignment_details
          ? item.assignment_details.length
          : 0,
        assignment_deadline:
          item.assignment_details &&
          item.assignment_details[0].assignment_deadline,
        rating: item.rating_number ? item.rating_number : "",
        comment: item.comment ? item.comment : "",
        course_status: item.enrollment_status.toUpperCase(),
        total_number: item.total_number,
        score_number: item.score_number,
      };

      data.push(temp);
    }

    // console.log("csvvvvvvv", data);
    setCsvData([...data]);
    // return data;
  }

  useEffect(() => {
    (async () => {
      courseList();
      customersData();

      if (user.user_role == 4) {
        // var responce = await EnrollmentService.getCreatorEnrollList();
        // setEnrollment(responce.data.data);

        var data = new FormData();
        data.append("cid", "");
        data.append("fromdate", input.date != undefined ? input.date : "");
        data.append("todate", "");
        data.append("user_email", user.email);
        data.append("std_no", input.std_no != undefined ? input.std_no : "");

        var responce = await EnrollmentService.getAll(data);
        // console.log(responce.data.data);
        setEnrollment(responce.data.data);
        getDataPagi(responce.data.data, 0 * PER_PAGE);
      } else if (user.user_role == 5) {
        var responce = await EnrollmentService.getUserEnrollmentList();
        // console.log("user enrollment", responce.data.data);
        setEnrollment(responce.data.data);
        getDataPagi(responce.data.data, 0 * PER_PAGE);

        // -----------------------------------------------

        if (getCookie("xapi_result_name") && user.user_role == 5) {


          var xresponce = await EnrollmentService.getUserEnrollmentList();
          // console.log("xapi_result ", getCookie("xapi_result_name"))


          var xdata = [];
          for (var i of xresponce.data.data) {

            if (i.course_details[0].course_type == "xapi" && getCookie("xapi_result_name") === i.course_details[0].xapi_file_name) {
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

              xdata.push(temp);
            }
          }

          removeCookie("xapi_result_name")

          // xapi
          getXapiData(xdata);

        }

        // ------------------------------------------------
      } else if (user.user_role == 1 || user.user_role == 2) {
        var data = new FormData();
        data.append("cid", "");
        data.append("fromdate", "");
        data.append("todate", "");
        data.append("user_email", "");
        data.append("std_no", "");

        var responce = await EnrollmentService.getAll(data);
        // console.log("dddddddd", responce.data.data);
        setEnrollment(responce.data.data);
        getDataPagi(responce.data.data, 0 * PER_PAGE);
      }
    })();
  }, []);

  var courseList = async () => {
    setShowLoader(true);
    if (user.user_role == 4) {
      var responce = await UserService.allCourses();
      //// console.log(responce.data.data)
      setCourse([...responce.data.data]);
    } else if (user.user_role == 2 || user.user_role == 1) {
      var responce = await CourseService.getAll();
      //// console.log(responce.data.data)
      setCourse([...responce.data.data]);
    }
    setShowLoader(false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    // seterror('');
    // console.log(input);
  };

  const FormSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    if (user.user_role == 2 || user.user_role == 1) {
      var data = new FormData();
      data.append("cid", input.course != undefined ? input.course : "");
      data.append("fromdate", input.date != undefined ? input.date : "");
      data.append("todate", "");
      data.append("user_email", input.email != undefined ? input.email : "");
      data.append("std_no", input.std_no != undefined ? input.std_no : "");

      var responce = await EnrollmentService.getAll(data);
      // console.log("search enroll api ",responce.data.data);
      setEnrollment(responce.data.data);
      getDataPagi(responce.data.data, 0 * PER_PAGE);

      var data = [];
      for (var item of responce.data.data) {
        var temp = {
          date: item.enrollment_create_date,
          student_id: item.user_details[0].user_hr_no,
          student_name: item.user_details[0].fullname,
          course_name: item.course_details[0].course_name,
          course_type: item.course_details[0].course_type,
          course_category: item.course_details[0].category_name,
          user_progress: `${item.course_progress ? item.course_progress : 0}%`,
          teacher_name: `${item.course_details[0].creator_name.toUpperCase()} (${item.course_details[0].creator_email
            })`,
          points_won: 0,
          assignment_no: item.assignment_details
            ? item.assignment_details.length
            : 0,
          assignment_deadline:
            item.assignment_details &&
            item.assignment_details[0].assignment_deadline,
          rating: item.rating_number ? item.rating_number : "",
          comment: item.comment ? item.comment : "",
          course_status: item.enrollment_status.toUpperCase(),
          total_number: item.total_number,
          score_number: item.score_number,
        };

        data.push(temp);
      }

      setCsvData(data);
    } else if (user.user_role == 4) {
      var data = new FormData();
      data.append("cid", input.course != undefined ? input.course : "");
      data.append("fromdate", input.date != undefined ? input.date : "");
      data.append("todate", "");
      data.append("user_email", user.email);
      data.append("std_no", input.std_no != undefined ? input.std_no : "");

      var responce = await EnrollmentService.getAll(data);
      // console.log(responce.data.data);
      setEnrollment(responce.data.data);
      getDataPagi(responce.data.data, 0 * PER_PAGE);

      var data = [];
      for (var item of responce.data.data) {
        var temp = {
          date: item.enrollment_create_date,
          student_id: item.user_details[0].user_hr_no,
          student_name: item.user_details[0].fullname,
          course_name: item.course_details[0].course_name,
          course_type: item.course_details[0].course_type,
          course_category: item.course_details[0].category_name,
          user_progress: `${item.course_progress ? item.course_progress : 0}%`,
          points_won: 0,
          assignment_no: item.assignment_details
            ? item.assignment_details.length
            : 0,
          assignment_deadline:
            item.assignment_details &&
            item.assignment_details[0].assignment_deadline,
          rating: item.rating_number ? item.rating_number : "",
          comment: item.comment ? item.comment : "",
          course_status: item.enrollment_status.toUpperCase(),
        };

        data.push(temp);
      }

      setCsvData(data);
    }

    setShowLoader(false);

    // // console.log(input)
  };

  var reset = async () => {
    input.date = "";
    input.email = "";
    input.std_no = "";
    input.course = "";

    if (user.user_role == 2 || user.user_role == 1) {
      var data = new FormData();
      data.append("cid", "");
      data.append("fromdate", input.date != undefined ? input.date : "");
      data.append("todate", "");
      data.append("user_email", input.email != undefined ? input.email : "");
      data.append("std_no", input.std_no != undefined ? input.std_no : "");

      var responce = await EnrollmentService.getAll(data);
      // console.log(responce.data.data);
      setEnrollment(responce.data.data);
      getDataPagi(responce.data.data, 0 * PER_PAGE);

      var data = [];
      for (var item of responce.data.data) {
        var temp = {
          date: item.enrollment_create_date,
          student_id: item.user_details[0].user_hr_no,
          student_name: item.user_details[0].fullname,
          course_name: item.course_details[0].course_name,
          course_type: item.course_details[0].course_type,
          course_category: item.course_details[0].category_name,
          user_progress: `${item.course_progress ? item.course_progress : 0}%`,
          teacher_name: `${item.course_details[0].creator_name.toUpperCase()} (${item.course_details[0].creator_email
            })`,
          points_won: 0,
          assignment_no: item.assignment_details
            ? item.assignment_details.length
            : 0,
          assignment_deadline:
            item.assignment_details &&
            item.assignment_details[0].assignment_deadline,
          rating: item.rating_number ? item.rating_number : "",
          comment: item.comment ? item.comment : "",
          course_status: item.enrollment_status.toUpperCase(),
          total_number: item.total_number,
          score_number: item.score_number,
        };

        data.push(temp);
      }

      setCsvData(data);
    } else if (user.user_role == 4) {
      var data = new FormData();
      data.append("cid", "");
      data.append("fromdate", input.date != undefined ? input.date : "");
      data.append("todate", "");
      data.append("user_email", user.email);
      data.append("std_no", input.std_no != undefined ? input.std_no : "");

      var responce = await EnrollmentService.getAll(data);
      // console.log(responce.data.data);
      setEnrollment(responce.data.data);
      getDataPagi(responce.data.data, 0 * PER_PAGE);

      var data = [];
      for (var item of responce.data.data) {
        var temp = {
          date: item.enrollment_create_date,
          student_id: item.user_details[0].user_hr_no,
          student_name: item.user_details[0].fullname,
          course_name: item.course_details[0].course_name,
          course_type: item.course_details[0].course_type,
          course_category: item.course_details[0].category_name,
          user_progress: `${item.course_progress ? item.course_progress : 0}%`,
          teacher_name: `${item.course_details[0].creator_name.toUpperCase()} (${item.course_details[0].creator_email
            })`,
          points_won: 0,
          assignment_no: item.assignment_details
            ? item.assignment_details.length
            : 0,
          assignment_deadline:
            item.assignment_details &&
            item.assignment_details[0].assignment_deadline,
          rating: item.rating_number ? item.rating_number : "",
          comment: item.comment ? item.comment : "",
          course_status: item.enrollment_status.toUpperCase(),
        };

        data.push(temp);
      }

      setCsvData(data);
    }

    courseList();
  };

  return (
    <>
      {/** loader */}
      {showLoader && <Loader />}



      {/** search */}

      { user.user_role == 2 || user.user_role == 4 ? (
        <div className="enrollments-form course">
          <div className="container">
            <div className="enrollments-form-inner course-inner">
              <form onSubmit={FormSubmit}>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enrollments date/id"
                    name="date"
                    value={input.date}
                    onChange={handleChange}
                  />
                </div>
                {user.user_role == 2 || user.user_role == 1 ? (
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Course creator email"
                      name="email"
                      value={input.email}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User/student No"
                    name="std_no"
                    value={input.std_no}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <select
                    className="form-control"
                    name="course"
                    value={input.course}
                    onChange={handleChange}
                  >
                    <option value=""> -- select course -- </option>
                    {course.length &&
                      course.map((item) => (
                        <option value={item.id}>
                          {item.course_name.toUpperCase()}
                        </option>
                      ))}
                  </select>
                </div>

                {/**   <div className="form-group">

                                <select className="form-control">
                                    <option selected>User/student rating</option>
                                    <option>5 Star</option>
                                    <option>4 Star</option>
                                    <option>3 Star</option>
                                    <option>2 Star</option>
                                    <option> 1 Star</option>
                                </select>
                            </div> */}
                <div className="form-group">
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </div>

                <div className="form-group">
                  <button type="button" onClick={reset} className="btn">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/** entrollment table */}
      <div className="enrollments-sec activites-sec">
        <div className="container-fluid">
          {/**  export button  */}

          {(csv_data && csv_data.length > 0 && user.user_role == 1) ||
            (csv_data && csv_data.length > 0 && user.user_role == 2) ? (
            <CSVLink
              headers={headers}
              data={csv_data}
              filename="enrollment.csv"
            >
              <button type="button" className="btn btn-primary col-md-4">
                EXPORT CSV
              </button>
            </CSVLink>
          ) : (
            ""
          )}

          {csv_data && csv_data.length > 0 && user.user_role == 4 && (
            <CSVLink
              headers={headers2}
              data={csv_data}
              filename="enrollment.csv"
            >
              <button type="button" className="btn btn-primary">
                EXPORT CSV
              </button>
            </CSVLink>
          )}

          <div className="enrollments-sec-table activites-table tableFont ">
            {currentPageData.length > 0 ? (
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th width="10%">Date</th>
                    <th>Student Id</th>
                    <th>Student Name</th>
                    <th>Course Name</th>
                    {user.user_role != 5 && <th> Course Type </th>}
                    <th>Course Category</th>
                    <th>Course Status</th>
                    {user.user_role == 2 && <th>Course Total Number</th>}
                    {user.user_role == 2 && <th>Course Score Number</th>}
                    <th>User Progress</th>
                    {user.user_role != 4 && <th>Teacher’s Name</th>}
                    {/**    <th>Points
                                        Won</th> 
                    <th>Assignment no </th>

                    <th>Assignment deadline</th> */}
                    <th>Rating</th>
                    <th>Comments</th>
                    <th>View</th>
                    {user.user_role == 5 && <th>Certificate</th>}
                    {user.user_role == 2 || user.user_role == 1 ? (
                      <th>Result</th>
                    ) : (
                      ""
                    )}
                  </tr>
                </thead>
                <tbody>
                
                  {/** for creator */}
                  {user.user_role == 4 &&
                    currentPageData.map((item) => (
                      <tr>
                        <td>{item.enrollment_create_date}</td>
                        <td>{item.user_details[0].user_hr_no}</td>
                        <td>
                          {item.user_details[0].fullname.toUpperCase()} (
                          {item.user_details[0].email})
                        </td>
                        <td>
                          {item.course_details[0].course_name.toUpperCase()}
                        </td>
                        <td>
                          {item.course_details[0].course_type.toUpperCase()}
                        </td>
                        <td>
                          {item.course_details[0].category_name.toUpperCase()}
                        </td>
                        <td>{item.enrollment_status.toUpperCase()}</td>
                        <td>
                          {item.course_progress ? item.course_progress : 0}%
                        </td>

                        {/**  <td>0</td> */}
                        <td>
                          {item.assignment_details
                            ? item.assignment_details.length
                            : 0}
                        </td>
                        <td>
                          {item.assignment_details &&
                            item.assignment_details[0].assignment_deadline}
                        </td>
                        <td>
                          {item.rating_number && (
                            <div>
                              {item.rating_number == 1 && (
                                <ul className="rating">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 2 && (
                                <ul className="rating">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 3 && (
                                <ul className="rating">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 4 && (
                                <ul className="rating">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 5 && (
                                <ul className="rating">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}
                            </div>
                          )}
                        </td>
                        <td>{item.comment ? item.comment : ""}</td>
                        <td>
                          <Link
                            to={`/courses/${item.course_details[0].course_name}`}
                            state={{
                              singleCourseId: item.course_details[0].id,
                            }}
                            className="btn btn-info"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}

                  {/** for user */}
                  {user.user_role == 5 &&
                    currentPageData.map((item) => (
                      <tr>
                        <td style={{fontSize:"13px"}} >{item.enrollment_create_date}</td>
                        <td style={{fontSize:"13px"}} >{item.user_details[0].user_hr_no}</td>
                        <td style={{fontSize:"13px"}} >{item.user_details[0].fullname.toUpperCase()}</td>
                        <td style={{fontSize:"13px"}} >
                          {item.course_details[0].course_name.toUpperCase()}
                        </td>

                        <td style={{fontSize:"13px"}} >
                          {item.course_details[0].category_name.toUpperCase()}
                        </td>
                        <td style={{fontSize:"13px"}} >{item.enrollment_status.toUpperCase()}</td>
                        <td style={{fontSize:"13px"}} >
                          {item.course_progress ? item.course_progress : 0}%
                        </td>
                        <td style={{fontSize:"13px"}} >
                          {item.course_details[0].creator_name.toUpperCase()} (
                          {item.course_details[0].creator_email})
                        </td>
                        {/**  <td>0</td> 
                        <td style={{fontSize:"13px"}} >
                          {item.assignment_details
                            ? item.assignment_details.length
                            : 0}
                        </td>
                        <td style={{fontSize:"13px"}} >
                          {item.assignment_details &&
                            item.assignment_details[0].assignment_deadline}
                        </td> */}
                        <td style={{fontSize:"13px"}} >
                          {item.rating_number && (
                            <div>
                              {item.rating_number == 1 && (
                                <ul className="rating">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 2 && (
                                <ul className="rating">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 3 && (
                                <ul className="rating">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 4 && (
                                <ul className="rating">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 5 && (
                                <ul className="rating">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}
                            </div>
                          )}
                        </td>
                        <td style={{fontSize:"13px"}} >{item.comment ? item.comment : ""}</td>
                        <td style={{fontSize:"13px"}} >
                          <Link
                          style={{fontSize:"13px"}}
                            to={`/courses/${item.course_details[0].course_name}`}
                            state={{
                              singleCourseId: item.course_details[0].id,
                            }}
                            className="btn btn-info"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </Link>
                        </td>
                        <td style={{fontSize:"13px"}} >
                          {item.enrollment_status == "completed" &&
                            item.course_progress == 100 &&
                            item.course_details[0].certificate_id != 0 && (
                              <Link
                              style={{fontSize:"13px"}}
                                state={{
                                  user_name: user.username.toUpperCase(),
                                  email: user.email,
                                  course_name: item.course_details[0]
                                    .course_certificate_name
                                    ? item.course_details[0].course_certificate_name.toUpperCase()
                                    : "",
                                  date: item.updated_at,
                                  certificate_id:
                                    item.course_details[0].certificate_id,
                                  firstname: user.firstname,
                                  lastname: user.lastname,
                                }}
                                to="/Certificate"
                                className="btn btn-info"
                              >
                                <i
                                  class="fa fa-download"
                                  aria-hidden="true"
                                ></i>
                              </Link>
                            )}
                        </td>
                      </tr>
                    ))}

                  {/** for admin */}
                  {user.user_role == 2 || user.user_role == 1
                    ? currentPageData.map((item) => (
                      <tr>
                        <td style={{fontSize:"13px"}} >{item.enrollment_create_date}</td>
                        <td style={{fontSize:"13px"}} >{item.user_details[0].user_hr_no}</td>
                        <td style={{fontSize:"13px"}} >
                          {item.user_details[0]?.fullname.toUpperCase()} (
                          {item.user_details[0]?.email})
                        </td>
                        <td style={{fontSize:"13px"}} >
                          {item.course_details[0]?.course_name.toUpperCase()}
                        </td>
                        <td style={{fontSize:"13px"}} >
                          {item.course_details[0]?.course_type.toUpperCase()}
                        </td>
                        <td style={{fontSize:"13px"}} >
                          {item.course_details[0]?.category_name.toUpperCase()}
                        </td>
                        {user.user_role == 2 && (
                          <td style={{fontSize:"13px"}} >{item.enrollment_status.toUpperCase()}</td>
                        )}
                        {user.user_role == 2 && <td style={{fontSize:"13px"}} >{item.total_number}</td>}
                        {user.user_role == 2 && <td style={{fontSize:"13px"}} >{item.score_number}</td>}
                        <td style={{fontSize:"13px"}} >
                          {item.course_progress ? item.course_progress : 0}%
                        </td>
                        <td style={{fontSize:"13px"}} >
                          {item.course_details[0]?.creator_name.toUpperCase()}{" "}
                          ({item.course_details[0]?.creator_email}){" "}
                        </td>
                        {/**  <td>0</td> 
                        <td style={{fontSize:"13px"}} >
                          {item.assignment_details
                            ? item.assignment_details.length
                            : 0}
                        </td>
                        <td style={{fontSize:"13px"}} >
                          {item.assignment_details &&
                            item.assignment_details[0].assignment_deadline}
                        </td>  */}
                        <td style={{fontSize:"13px"}} >
                          {item.rating_number && (
                            <div>
                              {item.rating_number == 1 && (
                                <ul className="rating d-flex">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 2 && (
                                <ul className="rating d-flex">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 3 && (
                                <ul className="rating d-flex">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 4 && (
                                <ul className="rating d-flex">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}

                              {item.rating_number == 5 && (
                                <ul className="rating d-flex">
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                  <li>
                                    <a href="">
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </a>{" "}
                                  </li>
                                </ul>
                              )}
                            </div>
                          )}
                        </td>
                        <td style={{fontSize:"13px"}} >{item.comment ? item.comment : ""}</td>
                        <td style={{fontSize:"13px"}} >
                          <Link
                            to={`/courses/${item.course_details[0]?.course_name}`}
                            state={{
                              singleCourseId: item.course_details[0]?.id,
                            }}
                            className="btn btn-info"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </Link>
                        </td>
                        <td style={{fontSize:"13px"}} >
                          {" "}
                          {item.enrollment_status == "completed" &&
                            item.course_details[0]?.course_type == "xapi" && (
                              <Link
                              style={{fontSize:"13px"}}
                                className="btn btn-success"
                                to="/view-result"
                                state={{
                                  enrollment_id: item.id,
                                  course_name:
                                    item.course_details[0].xapi_file_name,
                                  course_type:
                                    item.course_details[0].course_type,
                                  user_email: item.user_details[0].email,

                                  courseName: item.course_details[0].course_name.toUpperCase(),
                                  userName: item.user_details[0].fullname.toUpperCase(),
                                  userEmail: item.user_details[0].email,
                                  totalPoint: item.total_number,
                                  userPoint: item.score_number,
                                  passPoint:item.pass_number,
                                  e_status: item.enrollment_status,

                                  pass_date:item.updated_at == null? formatDate(item.created_at):formatDate(item.updated_at),

                                }}
                              >
                                {" "}
                                result{" "}
                              </Link>
                            )}{" "}
                        </td>
                      </tr>
                    ))
                    : ""}

                </tbody>
              </table>
            ) : (
              <p
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {enrollment.length >PER_PAGE ?"Loading...":"No record found"}
              </p>
            )}

            {/**   <a href="#" className="esport-btn">Join for free</a> */}
          </div>

          {enrollment.length > PER_PAGE && (
            <div className="pagination-sec">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                breakLabel={"..."}
                marginPagesDisplayed={"2"}
                pageRangeDisplayed={"3"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"pagination_active"}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
              />
            </div>
          )}
        </div>
      </div>


    </>
  );
}
