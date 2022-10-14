import React from "react";

import Header from './Common/Header/Header';
import Footer from './Common/Footer/Footer';
import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import UserService from '../services/UserService';
import { useLocation } from "react-router-dom";
import { Markup } from 'interweave';

import CourseService from "../services/CourseService";

// languages
import English from "./ConverLanguages/English";
import SerbianCyrilic from "./ConverLanguages/SerbianCyrilic";
import SerbianLatin from "./ConverLanguages/SerbianLatin";
// end languages

import { AuthContext } from '../index';
import { LangContext } from "../routes/routes";


import ReactPaginate from "react-paginate";
// loader 
import Loader from "./Loader";
import EnrollmentService from "../services/EnrollmentService";
import XapiService from "../services/XapiService";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Course() {

    // loader
    const [showLoader, setShowLoader] = useState(false);

    let query = useQuery();
    var location = useLocation();
    var search_text = location.state != null ? (location.state.search_text) : '';
    // var course = query.get("id");
    // console.log( query.get("c"))

    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategorys] = useState([]);
    const [child, setChild] = useState([]);

    const [input, setInput] = useState({});

    const { user } = useContext(AuthContext);


    const [language, setLanguage] = useState([]);
    const [group, setGroup] = useState([]);

    const [course, setCourses] = useState([]);

    const [chkGroups, setChkGroup] = useState(false);

    // to store selected hospital
    const [selectedCourse, setSelectedCourse] = useState('');

    // check coourse and user group
    var chkAllGroups = (courseGroup) => {
        var Group = user.user_groups.split(",");
        var userGroup = Group.map(i => Number(i))
        console.log("user group", userGroup);
        for (var item of courseGroup) {
            if (userGroup.includes(item.group_id)) {
                console.log(userGroup.includes(item.group_id));
                return (true);
            }
        }
    }

    // xapi ----------------
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
                singleRes.timestamp > item.timestamp
              ) {

               // console.log("one");

                

                console.log("sssss");

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

    setShowLoader(false);

    if (xapiCourse.length > 0) {
      console.log(xapiCourse);
      
      // enrollment status updated  ------------------
    //   await EnrollmentService.enrollmentStatusUpdate(
    //     xapiCourse
    //   );
    
      // result save----------

      for(var i of xapiCourse)
      {
          if(i.passed && i.updateTimestamp > i.timestamp)
          {
            if (item.enrollment_status == "completed") {
              console.log("sub one");
              await XapiService.saveResult({
                enrollment_id: item.enrollment_id,
                course_name: item.course_name,
                course_type: item.course_type,
                user_email: item.user_email,
              });
            }
          }
      }
    }

    
  };






    // react pagination  //////////////////////////
    const PER_PAGE = 12;
    const [currentPageData, setCurrentPageData] = useState([]);
    const pageCount = Math.ceil(course.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        getDataPagi(course, (selectedPage * PER_PAGE))
    }


    function getDataPagi(data, offset) {
        var temp = [];
        console.log("offset", offset);
        data.slice(offset, offset + PER_PAGE).map((item) => {
            temp.push(item);
        })
        setCurrentPageData(temp)
        setShowLoader(false)

    }

    // /////////////////////////////////


    const [noCourse, setNoCourse] = useState(0);

    var groupChkCourseShow = async(data) => {

        var temp = [];
        for (var item of data) {
            if (chkAllGroups(item.group_details)) {
                temp.push(item)
            }
        }



        //console.log("zzzzzzzzz ",temp);

        setNoCourse(temp.length)
        setCourses([...temp]);
        getDataPagi(temp, (0 * PER_PAGE))


      // -----------------------------------------------
    
            //var xresponce = await UserService.enrollmentcourse(user.user_id, "");
    
            var xresponce = await EnrollmentService.getUserEnrollmentList();
            console.log("user enrollment", xresponce.data.data);
    
            var xdata = [];
            for (var i of xresponce.data.data) {
    
            
    
              if (i.course_details[0].course_type == "xapi") {
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
    
            // xapi
            getXapiData(xdata);
    
            // ------------------------------------------------
           
            
          
    }


    useEffect(() => {

        (async () => {


            setShowLoader(true)

            var data = {
                category_id: input.category != undefined ? input.category : '',
                group_id: input.group_id != undefined ? input.group_id : '',
                course_level: input.course_level != undefined ? input.course_level : '',
                lang_id: input.language != undefined ? input.language : '',
                search_text: search_text,
            }

            var responce = await CourseService.courseSearch(data);

            if (user.user_role == 5) {
                groupChkCourseShow(responce.data.data)
            } else {
                setNoCourse(responce.data.data.length)
                setCourses([...responce.data.data]);
                getDataPagi(responce.data.data, (0 * PER_PAGE))
            }



        })()

    }, [location.state])


    useEffect(() => {

        (async () => {
            //  var id = query.get("id");

            //console.log(payload)
            setShowLoader(true)

            var data = {
                category_id: '',
                group_id: '',
                course_level: '',
                lang_id: '',
                search_text: search_text
            }

            var responce = await CourseService.courseSearch(data);

            if (user.user_role == 5) {

                groupChkCourseShow(responce.data.data)
            } else {
                setCourses([...responce.data.data]);
            }





            getAllCategory();
            getAllLanguage();
            getAllGroup();


            // ---------
            //input.category = category_id;
        })()

    }, []);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({ ...values, [name]: value }))
        // seterror('');
        console.log(input)
    }


    var getAllCategory = async () => {
        var categoryRes = await UserService.getAllCategory();
        setCategory([...categoryRes.data.data]);
    }

    var getCategory = async () => {
        var responce = await UserService.category();
        setCategory(responce.data.data);

    }

    async function subcategoryid(id) {

        var responce = await UserService.subcategory(id);

        setSubcategorys(responce.data.data);


    }

    const setChildCtegory = async (id) => {
        var responce = await UserService.subcategory(id);
        console.log(id)
        setChild(responce.data.data);
    }


    var getAllLanguage = async () => {
        var languageRes = await UserService.languages();
        setLanguage([...languageRes.data.data])
    }

    var getAllGroup = async () => {
        var groupRes = await UserService.getGroupList();
        setGroup([...groupRes.data.data])
    }

    var FormSubmit = async (e) => {

        e.preventDefault();
        setShowLoader(true)

        var data = {
            category_id: input.category != undefined ? input.category : '',
            group_id: input.group_id != undefined ? input.group_id : '',
            course_level: input.course_level != undefined ? input.course_level : '',
            lang_id: input.language != undefined ? input.language : '',
            search_text: search_text,
        }

        console.log(data);

        var responce = await CourseService.courseSearch(data);
        console.log("filter data  ", responce.data.data)

        if (user.user_role == 5) {
            groupChkCourseShow(responce.data.data);
        } else {
            setNoCourse(responce.data.data.length)
            setCourses([...responce.data.data]);
            getDataPagi(responce.data.data, (0 * PER_PAGE))
        }

    }


    const { languageList } = useContext(LangContext);
    const [langObj, setLangObj] = useState({});

    useEffect(() => {

        if (languageList.language_name === "english") {
            setLangObj(English)
        } else if (languageList.language_name === "СРБ") {
            setLangObj(SerbianCyrilic)
        } else if (languageList.language_name === "SRB") {
            setLangObj(SerbianLatin)
        }

    }, [languageList.language_name]);




    return (

        <React.Fragment>

            {/** loader */}
            {showLoader && <Loader />}

            <div className="inner-banner">
                <img src="images/inner-banner.png" alt="" />
                <div className="desc">
                    <div className="container">
                        <div className="text">
                            <h1>Courses</h1>
                            <div className="breadcrumb">
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li>Courses</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* filter */}
            <div className="course">
                <div className="container">
                    <div className="course-inner">
                        <form onSubmit={FormSubmit} method="post">
                            <div className="form-group">
                                <select className="form-control" value={input.category} onChange={handleChange} name="category">
                                    <option value='' >{langObj.category}</option>
                                    {
                                        category.length && category.map((pitem) =>

                                            <>
                                                <option value={pitem.id}>{pitem.c_name.toUpperCase()}</option>

                                                {pitem.sub_category.map((subItem) =>
                                                    <>
                                                        <option value={subItem.id}>--{subItem.c_name.toUpperCase()}</option>
                                                        {subItem.sub_category.map(child =>
                                                            <>
                                                                <option value={child.id}>....{child.c_name.toUpperCase()}</option>
                                                            </>
                                                        )}
                                                    </>
                                                )}


                                            </>
                                        )
                                    }
                                </select>
                            </div>
                            {/**   <div className="form-group">
                                <select className="form-control" value={input.group_id} onChange={handleChange} name="group_id" >
                                    <option value="" >Group</option>
                                    {group.length && group.map((item) => (<option value={item.id}>{item.g_name.toUpperCase()}</option>))}
                                </select>
                            </div>  */}
                            {/**    <div className="form-group">
                                <select className="form-control">
                                    <option selected>Program</option>
                                    <option>Program 1</option>
                                    <option>Program 2</option>
                                    <option>Program 3</option>
                                </select>
                            </div>  */}
                            <div className="form-group">
                                <select className="form-control" value={input.course_level} onChange={handleChange} name="course_level">
                                    <option value='' >{langObj.level}</option>
                                    <option value="beginner" >Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced" >Advanced</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-control" value={input.language} onChange={handleChange} name="language">
                                    <option value='' >{langObj.language}</option>
                                    {language.length && language.map((item) => (<option value={item.id}>{item.name.toUpperCase()}</option>))}
                                </select>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn">Submit</button>
                            </div>
                        </form>

                    </div>


                </div>
            </div>
            {/* end filter */}

            <div className="courses-sec">
                <div className="container">
                    <div className="courses-ttl">
                        <h2>Courses</h2>
                        <p>{noCourse} results on LMS</p>
                    </div>
                    <div className="courses-wrap">
                        <div className="row">


                            {currentPageData.map(course =>
                                <div className="col-lg-3 col-md-6 col-sm-12" onChange={e => setSelectedCourse(e.target.value)}>
                                    <Link to={`/courses/${course.course_name.replaceAll(" ","-")}`} state={{ singleCourseId: course.id }}>
                                        <div className="populer-box" >
                                            <div className="img-tham">
                                                <img src={course.image} alt="" height="84px" width="97px" />
                                            </div>
                                            <div className="text-box">
                                                <div className="clg-box">
                                                    <img src={course.avatar_image} alt="" width="174px" height="72px" />
                                                </div>
                                                <h3>{course.course_name}</h3>
                                                <p className="courseText"><Markup content={course.short_description} /></p>


                                                <span className="viwers">{course.total_enroll_no} Viewers</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}





                        </div>
                        {/* pagination */}
                        {course.length > PER_PAGE && <div className="pagination-sec">

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

                            {/**      <nav data-pagination>
                             <a href="#" disabled><i className="fa fa-chevron-left"></i></a>
                             <ul>
                                 <li className="current"><a href="#">1</a></li>
                                 <li><a href="#">2</a></li>
                                 <li><a href="#">3</a> </li>
                                 <li><a href="#">…</a></li>
                                 <li><a href="#">250</a></li>

                             </ul>
                             <a href="#"><i className="fa fa-chevron-right"></i> </a>
                         </nav> */}
                        </div>}
                        {/* end pagination */}
                    </div>
                </div>
            </div>

            <div className="start-journey-sec">
                <div className="container">
                    <div className="start-journey-box">
                        <h2>Start Journey. Enroll Now!</h2>
                        <p>Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                        <a href="#">Join for free</a>
                    </div>
                </div>
            </div>


        </React.Fragment>

    )
}