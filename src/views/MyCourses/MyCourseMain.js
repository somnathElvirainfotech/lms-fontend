import React, { useState, useEffect, useContext } from 'react'

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import MyCourse from './MyCourse';
import MYAssignment from './MYAssignment';
import ProfileDetails from '../Profile/ProfileDetails';
import { AuthContext } from '../../index';

import { setCookie, getCookie, removeCookie } from '../../middleware/CookieSetup';


import MyTask from './MyTask';


import UserService from '../../services/UserService';
import TokenHelper from '../../services/TokenHelper';

// loader
import Loader from "../Loader";
import EnrollmentService from '../../services/EnrollmentService';
import XapiService from '../../services/XapiService';

export default function MyCourseMain() {

  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState({ email: TokenHelper.getEmail() });

  // loader
  const [showLoader, setShowLoader] = useState(false);

  const [xapiu, setXapiu] = useState(false);



  //const [count, setCount] = useState({});




  var courseData = async () => {
    if (getCookie("xapi_result_name") && user.user_role == 5) {


      var xresponce = await EnrollmentService.getUserEnrollmentList();
      console.log("xapi_result ", getCookie("xapi_result_name"))


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

    } else {
      setXapiu(true)
    }
  }

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

    // console.log(xapiCourse);

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
          // console.log(singleRes.object.definition.name);

          console.log("--", chkDuplicate(tempArr, singleRes.context.extensions["ispring://view_id"]));
          console.log("--", chkDuplicate2(tempArr, singleRes.object.definition.name.und));

          if (chkDuplicate(tempArr, singleRes.context.extensions["ispring://view_id"]) && chkDuplicate2(tempArr, singleRes.object.definition.name.und) &&
            chkDuplicate3(tempArr, singleRes.context.contextActivities.grouping[0].id)) {

            console.log("object ", singleRes.context.extensions["ispring://view_id"]);

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
            // console.log(singleRes.object.definition.name);

            console.log("--", chkDuplicate(tempArr, singleRes.context.extensions["ispring://view_id"]));
            console.log("--", chkDuplicate2(tempArr, singleRes.object.definition.name.und));

            if (chkDuplicate(tempArr, singleRes.context.extensions["ispring://view_id"]) && chkDuplicate2(tempArr, singleRes.object.definition.name.und) &&
              chkDuplicate3(tempArr, singleRes.context.contextActivities.grouping[0].id)) {

              console.log("object ", singleRes.context.extensions["ispring://view_id"]);

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
                          // console.log("item  ", singleRes.result.success);

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

    console.log("xapi data", xapiCourse);



    if (xapiCourse.length > 0) {
      // console.log(xapiCourse);

      // enrollment status updated  ------------------
      await EnrollmentService.enrollmentStatusUpdate(
        xapiCourse
      );

      // result save----------

      for (var i of xapiCourse) {
        console.log("x course ", i.course_name);
        if (i.passed && i.updateTimestamp > i.timestamp) {
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
    setXapiu(true);

    // mycourse
    // var responce = await UserService.enrollmentcourse(user.user_id, "");
    // setEnrollmentcourses(responce.data.data);



  };


  useEffect(() => {
    courseData();
  }, [])


  useEffect(() => {


    (async () => {
      try {


        var response = await UserService.getProfileData(users);
        if (response.data.status != false) {
          //console.log(response.data);

          setUsers(response.data.data)

        } else {
          console.log(response);
        }

        //     var countRes = await UserService.courseCertificateCount();
        //    setCount(countRes.data.data);
        //     console.log(countRes.data)
        //    // console.log(count)

      } catch (error) {
        console.log(error);
      }
    })()

  }, []);


  return (
    <>

      {/** loader */}
      {showLoader && <Loader />}

      {xapiu &&
        <>
          <InnerBanner title="My courses" name="My courses" linkName="Home" link="/" />
          <ProfileDetails userData={users} />
          <MyTask />
          <MyCourse />
          <MYAssignment />
        </>
      }

    </>
  )
}
