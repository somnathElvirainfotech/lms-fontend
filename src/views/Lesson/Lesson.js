import React, { useEffect, useState, useContext } from "react";
import TokenHelper from '../../services/TokenHelper';
import UserService from '../../services/UserService';
import { AuthContext } from '../../index';
import ChapterService from "../../services/ChapterService";
import LessonService from "../../services/LessonService";

import ReactPlayer from 'react-player/lazy'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TextEditor from "../TextEditor";

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import CourseService from "../../services/CourseService";
import validator from 'validator';
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// loader 
import Loader from "../Loader";

export default function Lesson() {

    // loader
    const [showLoader, setShowLoader] = useState(false);

    const [Text, setText] = useState('');
    const [Inialvalue, setInialvalue] = useState('');

    const [course, setCourse] = useState([]);
    const [chapter, setChapter] = useState([]);
    const [lesson, setLesson] = useState([]);

    const [courseList, setCourseList] = useState(true)
    const [courseCreate, setCourseCreate] = useState(false)
    const [courseEdit, setCourseEdit] = useState(false)

    const { user } = useContext(AuthContext);
    const [language, setLanguage] = useState([]);
    const [group, setGroup] = useState([]);
    const [category, setCategory] = useState([])
    const [inputs, setInputs] = useState({})

    const [vedio, setVedio] = useState({});
    const [showvedio, setShowvedioo] = useState({});

    const [attachment_file, setAttachment_file] = useState({})
    const [dfile, setDfile] = useState('');

    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');

    const [courseId, setCourseId] = useState();

    const [chkVedio, setChkVedio] = useState('');
    const [linkVedio, setLinkVedio] = useState('');



    // react pagination  //////////////////////////
    const PER_PAGE = 10;
    const [currentPageData, setCurrentPageData] = useState([]);
    const pageCount = Math.ceil(lesson.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        getDataPagi(lesson, (selectedPage * PER_PAGE))
    }


    function getDataPagi(data, offset) {
        var temp = [];
        // console.log("offset", offset);
        data.slice(offset, offset + PER_PAGE).map((item) => {
            temp.push(item);
        })
        setCurrentPageData(temp)

    }

    // /////////////////////////////////



    var listLesson = async () => {

        if (user.user_role == 4) {
            var responce = await LessonService.getAll();
            setLesson([...responce.data.data])
            getDataPagi(responce.data.data, 0 * PER_PAGE)
        } else if (user.user_role == 1 || user.user_role == 2) {
            var responce = await LessonService.getAllLesson();
            // console.log(responce.data.data);
            setLesson([...responce.data.data])
            getDataPagi(responce.data.data, 0 * PER_PAGE)
        }


    }


    // confirm alert
    var deleteData = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => courseDelete(id)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };



    useEffect(() => {

        (async () => {
            try {
                setShowLoader(true)
                if (user.user_role == 4) {

                    listLesson();

                    var responce = await UserService.allCourses();
                    setCourse([...responce.data.data])

                    var languageRes = await UserService.languages();
                    var groupRes = await UserService.getGroupList();
                    var categoryRes = await UserService.getAllCategory();

                    var groupRes = await UserService.getGroupList();
                    var categoryRes = await UserService.getAllCategory();

                    // // console.log(categoryRes.data.data)

                    if (languageRes.data.status != false) {
                        setLanguage([...languageRes.data.data]);
                    }

                    if (groupRes.data.status != false) {
                        setGroup([...groupRes.data.data])

                    }

                    if (categoryRes.data.status != false) {
                        setCategory([...categoryRes.data.data])
                    }



                    // var data = {
                    //     course_name: "",
                    //     group_id: "",
                    //     category_id: "",
                    //     lang: "",
                    //     short_description: "",
                    //     published_status: "",
                    //     course_level: "",

                    // }

                    // setInputs(data);
                } else if (user.user_role == 1 || user.user_role == 2) {

                    listLesson();

                    var responce = await CourseService.getAll();
                    setCourse([...responce.data.data])

                    var languageRes = await UserService.languages();
                    var groupRes = await UserService.getGroupList();
                    var categoryRes = await UserService.getAllCategory();

                    var groupRes = await UserService.getGroupList();
                    var categoryRes = await UserService.getAllCategory();

                    // // console.log(categoryRes.data.data)

                    if (languageRes.data.status != false) {
                        setLanguage([...languageRes.data.data]);
                    }

                    if (groupRes.data.status != false) {
                        setGroup([...groupRes.data.data])

                    }

                    if (categoryRes.data.status != false) {
                        setCategory([...categoryRes.data.data])
                    }



                    // var data = {
                    //     course_name: "",
                    //     group_id: "",
                    //     category_id: "",
                    //     lang: "",
                    //     short_description: "",
                    //     published_status: "",
                    //     course_level: "",

                    // }

                    // setInputs(data);
                }

                setShowLoader(false)

            } catch (error) {
                // console.log(error);
            }
        })()
    }, [])


    var getChapter = async (id) => {
        var chapterRes = await ChapterService.chapterShowByCourseid(id);
        setChapter([...chapterRes.data.data])
    }

   


 

   



    const courseEditForm = async (id) => {
        var response = await LessonService.getOne(id);

       
        if (response.data.status) {

            setCourseId(id)
            // // console.log(response.data)
            var item = response.data.data[0];
            inputs.course_id = item.course_id;
            getChapter(item.course_id)
            inputs.chapter_id = item.chapter_id;
            inputs.lesson_name = item.lesson_name;
            setText(item.lesson_details);
            inputs.lesson_vedio_type = item.lesson_vedio_type;
            inputs.lesson_vedio_link = item.lesson_vedio_link;
            inputs.lesson_no = item.lesson_no;
            setChkVedio(item.lesson_vedio_type);
            setVedio("")
            setAttachment_file("");
            setLinkVedio(item.lesson_vedio_link)

            setDfile(item.lesson_file);
            setShowvedioo(item.lesson_vedio);


        }

    }

    const courseDelete = async (id) => {
        var responce = await LessonService.delete(id);

        if (!responce.data.status) {
            toast.error(responce.data.msg)
        }
        listLesson();

    }

    


    // search
    const [search, setSearch] = useState({});
    const handleSearch = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSearch(values => ({ ...values, [name]: value }));
        // console.log(search)

        // userSearch()
    }

    const userSearch = async () => {
        var course_name = search.course_name;

        var responce = await LessonService.search(course_name);
        // console.log("eeeeee", responce.data.data);
        setLesson([...responce.data.data])
        getDataPagi(responce.data.data, (0 * PER_PAGE))
    }

    const userSearchClear = async () => {
        var course_name = '';


        search.course_name = '';


        var responce = await LessonService.search(course_name);
        // console.log("eeeeee", responce.data.data);
        setLesson([...responce.data.data])
        getDataPagi(responce.data.data, (0 * PER_PAGE))
    }

    return <>
        {/** loader */}
        {showLoader && <Loader />}

        <InnerBanner title="Lesson" name="List" linkName="Home" link="/" />
        {/** search field */}
        {courseList && <div className="user-list-form course">
            <div className="container">
                <div className="enrollments-form-inner course-inner">
                    <form>
                        <div className="form-group col-md-6">
                            <input type="text" onChange={handleSearch} name="course_name" value={search.course_name} className="form-control" style={{ width: "100%" }} placeholder="course name" />
                        </div>



                        <div className="form-group" >
                            <div className="search" >

                                <button type="button" onClick={userSearch} className="searchButton m-2">
                                    <i className="fa fa-search"></i>
                                </button>

                                <button type="button" onClick={userSearchClear} className="searchButton m-2">
                                    <i className="fa fa-times"></i>

                                </button>
                            </div>
                        </div>
                        <div className="form-group" />
                        <div className="form-group" />
                        <div className="form-group" />



                        {/** <!--
                     <div className="form-group">
                         <button type="submit" className="btn">Submit</button>
                     </div> 
                     -->  */}
                    </form>

                </div>


            </div>
        </div>}
        <div className=" enrollments-sec activites-sec "   >

            <div className="container">

                

                <div className="row">
                    <div className="col-md-12 col-sm-6 pr-md-0">


                        <Link className="sec-btn" to={"/lesson/add"}  >Lesson Add</Link>
                        <Link to="/course" className="sec-btn ml-3">Back</Link>
                        <div className=" enrollments-sec-table activites-table">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th width="4.5%">No</th>
                                        <th width="21%">Course Name</th>
                                        <th width="21%">Chapter Name</th>
                                        <th width="21%">Lesson Name</th>
                                        <th width="5.5%">Edit</th>
                                        <th width="5.5%">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageData.map((item, i) =>
                                        <tr key={`lesson${i}`} >
                                            <td>{i + 1}</td>
                                            <td>{item.course_name.toUpperCase()}</td>
                                            <td>{item.chapter_name && item.chapter_name.toUpperCase()}</td>
                                            <td>{item.lesson_name && item.lesson_name.toUpperCase()}</td>
                                            <td><Link to="/lesson/edit" state={{ lesson_ID: item.id }} className="btn btn-success" ><i className="fa fa-edit"></i></Link></td>
                                            <td><button className="btn btn-danger" onClick={e => deleteData(item.id)}><i className="fa fa-trash-o"></i></button></td>
                                        </tr>
                                    )}


                                </tbody>
                            </table>
                        </div>

                        {lesson.length > PER_PAGE && <div className="pagination-sec">

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







                    </div>
                </div>
            </div>

        </div>

    </>
}