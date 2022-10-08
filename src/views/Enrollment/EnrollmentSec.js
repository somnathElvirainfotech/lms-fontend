import React, { useEffect, useState, useContext } from "react";
import TokenHelper from '../../services/TokenHelper';
import UserService from '../../services/UserService';
import CourseService from '../../services/CourseService';
import EnrollmentService from "../../services/EnrollmentService";
import { AuthContext } from '../../index';
import ReactPaginate from "react-paginate";

import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";

import XapiService from '../../services/XapiService';

// import { Button } from "react-bootstrap";

// loader 
import Loader from "../Loader";



export default function EnrollmentSec() {
    // loader
    const [showLoader, setShowLoader] = useState(false);

    const { user } = useContext(AuthContext);
    const [enrollment, setEnrollment] = useState([]);
    const [course, setCourse] = useState([]);

    const [input, setInput] = useState({});
    const [csv_data, setCsvData] = useState([]);


    // xapi ----------------
    var getXapiData = async (totalCourse) => {
        // setShowLoader(true)

        var agent = user.email;
        var activity = "";
        var verb = "";

        var data = {
            agent: '{"mbox": "mailto:' + agent + '"}',
            activity: activity,
            verb: "" //`http://adlnet.gov/expapi/verbs/${verb}`
        }

        // ------ xapi course total user enroll
        //var totalCourse = ["practice1", "practice2"];

        var xapiCourse = []



        // ------------- student all course setup -------------------------------
        for (var y of totalCourse) {

            var aa = {
                course_name: y.course_name,
                user_id: user.user_id,
                xapi_course_id: '',
                course_id: y.course_id,
                enroll_id: y.enroll_id,
                attempted: 0,
                failed: false,
                passed: false,
                total_number: 0,
                score_number: 0,
            }

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
        }
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
                                console.log("sss");

                                if ("result" in singleRes) {

                                    if ("completion" in singleRes.result && singleRes.result.completion == true) {
                                        if ("success" in singleRes.result) {

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





        console.log("xapi data", xapiCourse)

        if (xapiCourse.length > 0) {
            console.log(xapiCourse);
            // enrollment status updated  ------------------
            var updteEnrollStatus = await EnrollmentService.enrollmentStatusUpdate(xapiCourse);
            // console.log(updteEnrollStatus.data)
        }

        // setShowLoader(false)

    }

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
        { label: "Comment", key: "comment" }
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
        { label: "Comment", key: "comment" }
    ];

    // react pagination  //////////////////////////
    const PER_PAGE = 10;
    const [currentPageData, setCurrentPageData] = useState([]);
    const pageCount = Math.ceil(enrollment.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        getDataPagi(enrollment, (selectedPage * PER_PAGE))
    }


    function getDataPagi(data, offset) {
        var temp = [];
        console.log("offset", offset);
        data.slice(offset, offset + PER_PAGE).map((item) => {
            temp.push(item);
        })
        setCurrentPageData(temp)

    }

    // /////////////////////////////////


    async function customersData() {
        var custs = [];
        if (user.user_role == 4) {
            var data = new FormData();
            data.append("cid", "");
            data.append("fromdate", input.date != undefined ? input.date : '');
            data.append("todate", "");
            data.append("user_email", user.email);
            data.append("std_no", input.std_no != undefined ? input.std_no : '');

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

        console.log(custs);

        var data = [];
        for (var item of custs) {
            var temp = {
                date: item.enrollment_create_date,
                student_id: item.user_details[0].user_hr_no,
                student_name: item.user_details[0].fullname,
                student_email: item.user_details[0].email,
                course_name: item.course_details[0].course_name,
                course_type: item.course_details[0].course_type,
                course_category: item.course_details[0].category_name,
                user_progress: `${item.course_progress ? item.course_progress : 0}%`,
                teacher_name: `${item.course_details[0].creator_name.toUpperCase()}`,
                teacher_email: item.course_details[0].creator_email,
                points_won: 0,
                assignment_no: item.assignment_details ? item.assignment_details.length : 0,
                assignment_deadline: item.assignment_details && item.assignment_details[0].assignment_deadline,
                rating: item.rating_number ? item.rating_number : '',
                comment: item.comment ? item.comment : '',
                course_status: item.enrollment_status.toUpperCase(),
                total_number: item.total_number,
                score_number: item.score_number,

            };


            data.push(temp)
        }

        console.log("csvvvvvvv", data)
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
                data.append("fromdate", input.date != undefined ? input.date : '');
                data.append("todate", "");
                data.append("user_email", user.email);
                data.append("std_no", input.std_no != undefined ? input.std_no : '');


                var responce = await EnrollmentService.getAll(data);
                console.log(responce.data.data)
                setEnrollment(responce.data.data);
                getDataPagi(responce.data.data, 0 * PER_PAGE)
            }
            else if (user.user_role == 5) {
                var responce = await EnrollmentService.getUserEnrollmentList();
                console.log("user enrollment", responce.data.data)
                setEnrollment(responce.data.data);
                getDataPagi(responce.data.data, 0 * PER_PAGE)

                // -----------------------------------------------


                var responcee = await UserService.enrollmentcourse(user.user_id, '');

                console.log("all courses", responcee.data);

                var data = [];
                for (var i of responcee.data.data) {

                    if (i.course_details[0].course_type == "xapi") {
                        var temp = {
                            course_id: i.course_details[0].id,
                            enroll_id: i.enroll_id,
                            course_name: i.course_details[0].xapi_file_name
                        }

                        data.push(temp)
                    }

                }

                // xapi 
                getXapiData(data);





                // ------------------------------------------------



            } else if (user.user_role == 1 || user.user_role == 2) {

                var data = new FormData();
                data.append("cid", "");
                data.append("fromdate", "");
                data.append("todate", "");
                data.append("user_email", "");
                data.append("std_no", "");

                var responce = await EnrollmentService.getAll(data);
                console.log("dddddddd", responce.data.data)
                setEnrollment(responce.data.data);
                getDataPagi(responce.data.data, 0 * PER_PAGE)
            }
        })()

    }, [])


    var courseList = async () => {
        setShowLoader(true)
        if (user.user_role == 4) {
            var responce = await UserService.allCourses();
            //console.log(responce.data.data)
            setCourse([...responce.data.data])

        } else if (user.user_role == 2 || user.user_role == 1) {
            var responce = await CourseService.getAll();
            //console.log(responce.data.data)
            setCourse([...responce.data.data])

        }
        setShowLoader(false)
    }



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput(values => ({ ...values, [name]: value }))
        // seterror('');
        console.log(input)
    }

    const FormSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true)


        if (user.user_role == 2 || user.user_role == 1) {

            var data = new FormData();
            data.append("cid", input.course != undefined ? input.course : '');
            data.append("fromdate", input.date != undefined ? input.date : '');
            data.append("todate", "");
            data.append("user_email", input.email != undefined ? input.email : '');
            data.append("std_no", input.std_no != undefined ? input.std_no : '');


            var responce = await EnrollmentService.getAll(data);
            console.log(responce.data.data)
            setEnrollment(responce.data.data);
            getDataPagi(responce.data.data, 0 * PER_PAGE)

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
                    teacher_name: `${item.course_details[0].creator_name.toUpperCase()} (${item.course_details[0].creator_email})`,
                    points_won: 0,
                    assignment_no: item.assignment_details ? item.assignment_details.length : 0,
                    assignment_deadline: item.assignment_details && item.assignment_details[0].assignment_deadline,
                    rating: item.rating_number ? item.rating_number : '',
                    comment: item.comment ? item.comment : '',
                    course_status: item.enrollment_status.toUpperCase(),
                    total_number: item.total_number,
                    score_number: item.score_number,

                };

                data.push(temp)
            }


            setCsvData(data);

        } else if (user.user_role == 4) {

            var data = new FormData();
            data.append("cid", input.course != undefined ? input.course : '');
            data.append("fromdate", input.date != undefined ? input.date : '');
            data.append("todate", "");
            data.append("user_email", user.email);
            data.append("std_no", input.std_no != undefined ? input.std_no : '');


            var responce = await EnrollmentService.getAll(data);
            console.log(responce.data.data)
            setEnrollment(responce.data.data);
            getDataPagi(responce.data.data, 0 * PER_PAGE)

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
                    assignment_no: item.assignment_details ? item.assignment_details.length : 0,
                    assignment_deadline: item.assignment_details && item.assignment_details[0].assignment_deadline,
                    rating: item.rating_number ? item.rating_number : '',
                    comment: item.comment ? item.comment : '',
                    course_status: item.enrollment_status.toUpperCase(),

                };

                data.push(temp)
            }


            setCsvData(data);

        }

        setShowLoader(false)


        // console.log(input)
    }

    var reset = async () => {
        input.date = '';
        input.email = '';
        input.std_no = '';
        input.course = '';



        if (user.user_role == 2 || user.user_role == 1) {

            var data = new FormData();
            data.append("cid", "");
            data.append("fromdate", input.date != undefined ? input.date : '');
            data.append("todate", "");
            data.append("user_email", input.email != undefined ? input.email : '');
            data.append("std_no", input.std_no != undefined ? input.std_no : '');


            var responce = await EnrollmentService.getAll(data);
            console.log(responce.data.data)
            setEnrollment(responce.data.data);
            getDataPagi(responce.data.data, 0 * PER_PAGE)

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
                    teacher_name: `${item.course_details[0].creator_name.toUpperCase()} (${item.course_details[0].creator_email})`,
                    points_won: 0,
                    assignment_no: item.assignment_details ? item.assignment_details.length : 0,
                    assignment_deadline: item.assignment_details && item.assignment_details[0].assignment_deadline,
                    rating: item.rating_number ? item.rating_number : '',
                    comment: item.comment ? item.comment : '',
                    course_status: item.enrollment_status.toUpperCase(),
                    total_number: item.total_number,
                    score_number: item.score_number,

                };

                data.push(temp)
            }


            setCsvData(data);

        } else if (user.user_role == 4) {

            var data = new FormData();
            data.append("cid", "");
            data.append("fromdate", input.date != undefined ? input.date : '');
            data.append("todate", "");
            data.append("user_email", user.email);
            data.append("std_no", input.std_no != undefined ? input.std_no : '');


            var responce = await EnrollmentService.getAll(data);
            console.log(responce.data.data)
            setEnrollment(responce.data.data);
            getDataPagi(responce.data.data, 0 * PER_PAGE)

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
                    teacher_name: `${item.course_details[0].creator_name.toUpperCase()} (${item.course_details[0].creator_email})`,
                    points_won: 0,
                    assignment_no: item.assignment_details ? item.assignment_details.length : 0,
                    assignment_deadline: item.assignment_details && item.assignment_details[0].assignment_deadline,
                    rating: item.rating_number ? item.rating_number : '',
                    comment: item.comment ? item.comment : '',
                    course_status: item.enrollment_status.toUpperCase(),

                };

                data.push(temp)
            }


            setCsvData(data);

        }

        courseList();

    }

    return (
        <>

            {/** loader */}
            {showLoader && <Loader />}

            {/** search */}

            {user.user_role == 2 || user.user_role == 1 || user.user_role == 4 ?

                <div className="enrollments-form course">
                    <div className="container">

                        <div className="enrollments-form-inner course-inner">
                            <form onSubmit={FormSubmit}>
                                <div className="form-group">
                                    <input type="date" className="form-control" placeholder="Enrollments date/id" name="date" value={input.date} onChange={handleChange} />
                                </div>
                                {user.user_role == 2 || user.user_role == 1 ? <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Course creator email" name="email" value={input.email} onChange={handleChange} />
                                </div> : ''}
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="User/student No" name="std_no" value={input.std_no} onChange={handleChange} />
                                </div>

                                <div className="form-group">
                                    <select className="form-control" name="course" value={input.course} onChange={handleChange} >
                                        <option value='' > -- select course -- </option>
                                        {course.length && course.map((item) => (<option value={item.id}>{item.course_name.toUpperCase()}</option>))}
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
                                    <button type="submit" className="btn">Submit</button>
                                </div>

                                <div className="form-group">
                                    <button type="button" onClick={reset} className="btn">Reset</button>
                                </div>

                            </form>

                        </div>


                    </div>
                </div>

                : ''}

            {/** entrollment table */}
            <div className="enrollments-sec activites-sec">
                <div className="container">

                    {/**  export button  */}

                    {csv_data && csv_data.length > 0 && user.user_role == 1 || csv_data && csv_data.length > 0 && user.user_role == 2 ? <CSVLink headers={headers} data={csv_data} filename="enrollment.csv">
                        <button type="button" className="btn btn-primary">EXPORT CSV</button>
                    </CSVLink>
                        : ''}

                    {csv_data && csv_data.length > 0 && user.user_role == 4 && <CSVLink headers={headers2} data={csv_data} filename="enrollment.csv">
                        <button type="button" className="btn btn-primary">EXPORT CSV</button>
                    </CSVLink>
                    }


                    <div className="enrollments-sec-table activites-table">
                        {currentPageData.length > 0 ?
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th width="10%">Date</th>
                                        <th>Student Id</th>
                                        <th>Student
                                            Name</th>
                                        <th>Course
                                            Name</th>
                                        {user.user_role != 5 && <th> Course Type </th>}
                                        <th>Course Category</th>
                                        <th>Course Status</th>
                                        {user.user_role == 2 && <th>Course Total Number</th>}
                                        {user.user_role == 2 && <th>Course Score Number</th>}
                                        <th>User Progress</th>
                                        {user.user_role != 4 && <th>Teacher’s Name</th>}
                                        {/**    <th>Points
                                        Won</th> */}
                                        <th>Assignment no </th>

                                        <th>Assignment
                                            deadline
                                        </th>
                                        <th>Rating</th>
                                        <th>Comments</th>
                                        <th>View</th>
                                        {user.user_role == 5 && <th>Certificate</th>}
                                        {user.user_role == 2 || user.user_role == 1 ? <th>Result</th> : ''}
                                    </tr>
                                </thead>
                                <tbody>


                                    {/** for creator */}
                                    {user.user_role == 4 &&
                                        currentPageData.map((item) =>
                                            <tr>
                                                <td>{item.enrollment_create_date}</td>
                                                <td>{item.user_details[0].user_hr_no}</td>
                                                <td>{item.user_details[0].fullname.toUpperCase()} ({item.user_details[0].email})</td>
                                                <td>{item.course_details[0].course_name.toUpperCase()}</td>
                                                <td>{item.course_details[0].course_type.toUpperCase()}</td>
                                                <td>{item.course_details[0].category_name.toUpperCase()}</td>
                                                <td>{item.enrollment_status.toUpperCase()}</td>
                                                <td>{item.course_progress ? item.course_progress : 0}%</td>

                                                {/**  <td>0</td> */}
                                                <td>{item.assignment_details ? item.assignment_details.length : 0}</td>
                                                <td>{item.assignment_details && item.assignment_details[0].assignment_deadline}</td>
                                                <td>

                                                    {item.rating_number &&

                                                        <div>
                                                            {item.rating_number == 1 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }

                                                            {item.rating_number == 2 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }

                                                            {item.rating_number == 3 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }

                                                            {item.rating_number == 4 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }


                                                            {item.rating_number == 5 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }



                                                        </div>

                                                    }
                                                </td>
                                                <td>{item.comment ? item.comment : ''}</td>
                                                <td>

                                                    <Link to={`/courses/${item.course_name}`} state={{ singleCourseId: item.course_details[0].id }} className="btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></Link>

                                                </td>

                                            </tr>
                                        )
                                    }


                                    {/** for user */}
                                    {user.user_role == 5 &&
                                        currentPageData.map((item) =>
                                            <tr>
                                                <td>{item.enrollment_create_date}</td>
                                                <td>{item.user_details[0].user_hr_no}</td>
                                                <td>{item.user_details[0].fullname.toUpperCase()}</td>
                                                <td>{item.course_details[0].course_name.toUpperCase()}</td>

                                                <td>{item.course_details[0].category_name.toUpperCase()}</td>
                                                <td>{item.enrollment_status.toUpperCase()}</td>
                                                <td>{item.course_progress ? item.course_progress : 0}%</td>
                                                <td>{item.course_details[0].creator_name.toUpperCase()} ({item.course_details[0].creator_email})</td>
                                                {/**  <td>0</td> */}
                                                <td>{item.assignment_details ? item.assignment_details.length : 0}</td>
                                                <td>{item.assignment_details && item.assignment_details[0].assignment_deadline}</td>
                                                <td>

                                                    {item.rating_number &&

                                                        <div>
                                                            {item.rating_number == 1 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }

                                                            {item.rating_number == 2 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }

                                                            {item.rating_number == 3 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }

                                                            {item.rating_number == 4 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }


                                                            {item.rating_number == 5 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }



                                                        </div>

                                                    }
                                                </td>
                                                <td>{item.comment ? item.comment : ''}</td>
                                                <td><Link to={`/courses/${item.course_name}`} state={{ singleCourseId: item.course_details[0].id }} className="btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></Link></td>
                                                <td>
                                                    {item.enrollment_status == "completed" && item.course_progress == 100 && item.course_details[0].certificate_id != 0 &&
                                                        <Link state={{
                                                            user_name: user.username.toUpperCase(),
                                                            email: user.email,
                                                            course_name: item.course_details[0].course_certificate_name ? item.course_details[0].course_certificate_name.toUpperCase() : '',
                                                            date: item.updated_at,
                                                            certificate_id: item.course_details[0].certificate_id,
                                                            firstname: user.firstname,
                                                            lastname: user.lastname
                                                        }} to="/Certificate" className="btn btn-info"><i class="fa fa-download" aria-hidden="true"></i></Link>}
                                                </td>
                                            </tr>
                                        )
                                    }

                                    {/** for admin */}
                                    {user.user_role == 2 || user.user_role == 1 ?
                                        currentPageData.map((item) =>
                                            <tr>
                                                <td>{item.enrollment_create_date}</td>
                                                <td>{item.user_details[0].user_hr_no}</td>
                                                <td>{item.user_details[0].fullname.toUpperCase()} ({item.user_details[0].email})</td>
                                                <td>{item.course_details[0].course_name.toUpperCase()}</td>
                                                <td>{item.course_details[0].course_type.toUpperCase()}</td>
                                                <td>{item.course_details[0].category_name.toUpperCase()}</td>
                                                {user.user_role == 2 && <td>{item.enrollment_status.toUpperCase()}</td>}
                                                {user.user_role == 2 && <td>{item.total_number}</td>}
                                                {user.user_role == 2 && <td>{item.score_number}</td>}
                                                <td>{item.course_progress ? item.course_progress : 0}%</td>
                                                <td>{item.course_details[0].creator_name.toUpperCase()} ({item.course_details[0].creator_email}) </td>
                                                {/**  <td>0</td> */}
                                                <td>{item.assignment_details ? item.assignment_details.length : 0}</td>
                                                <td>{item.assignment_details && item.assignment_details[0].assignment_deadline}</td>
                                                <td>

                                                    {item.rating_number &&

                                                        <div>
                                                            {item.rating_number == 1 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }

                                                            {item.rating_number == 2 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }

                                                            {item.rating_number == 3 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }

                                                            {item.rating_number == 4 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }


                                                            {item.rating_number == 5 &&
                                                                <ul className="rating">
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                                                </ul>
                                                            }



                                                        </div>

                                                    }
                                                </td>
                                                <td>{item.comment ? item.comment : ''}</td>
                                                <td>

                                                    <Link to={`/courses/${item.course_name}`} state={{ singleCourseId: item.course_details[0].id }} className="btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></Link>

                                                </td>
                                                <td>  {item.enrollment_status == "completed" && item.course_details[0].course_type == "xapi" &&
                                                    <Link className="btn btn-success" to="/view-result" state={{
                                                        course_name: item.course_details[0].xapi_file_name,
                                                        course_type: item.course_details[0].course_type,
                                                        user_email: item.user_details[0].email,
                                                    }}> result </Link>
                                                } </td>
                                            </tr>
                                        )
                                        : ''}


                                </tbody>
                            </table>
                            : <p style={{ fontSize: "30px", textAlign: "center", fontWeight: "bold" }}>No record Found</p>}

                        {/**   <a href="#" className="esport-btn">Join for free</a> */}
                    </div>

                    {enrollment.length > PER_PAGE && <div className="pagination-sec">

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


                    </div>}
                </div>
            </div>
        </>
    )
}
