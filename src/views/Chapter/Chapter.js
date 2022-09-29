import React, { useEffect, useState, useContext } from "react";
import TokenHelper from '../../services/TokenHelper';
import UserService from '../../services/UserService';
import ChapterService from "../../services/ChapterService";
import CourseService from "../../services/CourseService";
import { AuthContext } from '../../index';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";


import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';

import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

export default function Chapter() {

    const [course, setCourse] = useState([]);
    const [chapter, setChapter] = useState([]);
    const [courseList, setCourseList] = useState(true)
    const [courseCreate, setCourseCreate] = useState(false)
    const [courseEdit, setCourseEdit] = useState(false)

    const { user } = useContext(AuthContext);
    const [language, setLanguage] = useState([]);
    const [group, setGroup] = useState([]);
    const [category, setCategory] = useState([])
    const [inputs, setInputs] = useState({})

    const [image, setImage] = useState({});
    const [avatar_image, setAvatar_image] = useState({});
    const [attachment_file, setAttachment_file] = useState({})

    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');

    const [courseId, setCourseId] = useState();




    // react pagination  //////////////////////////
    const PER_PAGE = 10;
    const [currentPageData, setCurrentPageData] = useState([]);
    const pageCount = Math.ceil(chapter.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        getDataPagi(chapter, (selectedPage * PER_PAGE))
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


    useEffect(() => {

        (async () => {
            if (user.user_role == 4) {
                var responce = await UserService.allCourses();
                console.log("course  ", responce.data.data)
                setCourse([...responce.data.data])
                listChapter();

            } else if (user.user_role == 2 || user.user_role == 1) {
                var responce = await CourseService.getAll();
                //console.log(responce.data.data)
                setCourse([...responce.data.data])
                listChapter();

            }
        })()

    }, [])




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




    var listChapter = async () => {

        if (user.user_role == 4) {
            var responce = await ChapterService.getAll();
            setChapter([...responce.data.data])
            getDataPagi(responce.data.data, 0 * PER_PAGE)
        }
        else if (user.user_role == 2 || user.user_role == 1) {
            var responce = await ChapterService.getAllChapter();
            setChapter([...responce.data.data])
            getDataPagi(responce.data.data, 0 * PER_PAGE)

        }
    }



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        // seterror('');
        console.log(inputs)


    }

    const ImageHAndler = (e) => {
        const select = e.target.files[0];
        const name = e.target.name;

        //setimageUpload(select);
        const Allow = ["image/png", "image/jpg", "image/jpeg"];
        if (select && Allow.includes(select.type)) {

            if (name == "image") {
                setImage(select)
            } else if (name == "avatar_image") {
                setAvatar_image(select)
            }

        } else {
            seterror("file type not support, file will be jpg,jpeg or png format ")
        }

        console.log(inputs)
    }

    const FileHandler = (e) => {
        const select = e.target.files[0];
        const Allow = [".doc", ".docx", "application/pdf", "application/vnd.ms-excel"];
        // console.log(select.type)
        if (select && Allow.includes(select.type)) {
            //console.log(22)
            setAttachment_file(select)
        } else {
            seterror("file type not support, file will be doc,pdf or xls format ")
        }

        console.log(inputs)
    }


    const FormSubmit = async (e) => {
        //console.log("ssss");
        e.preventDefault();

        try {

            if (inputs.chapter_no && inputs.chapter_name && inputs.course_id) {
                if (!Number.isInteger(Number(inputs.chapter_no))) {
                    seterror("chapter number must be integer");

                } else {
                    const data = new FormData();
                    data.append("chapter_no", inputs.chapter_no);
                    data.append("chapter_name", inputs.chapter_name)
                    data.append("course_id", inputs.course_id)

                    var response = await ChapterService.create(data);
                    console.log(response.data.msg)
                    if (response.data.status != false) {
                        toast.success(response.data.msg)

                        inputs.chapter_name = "";
                        inputs.course_id = "";
                        inputs.chapter_no = '';


                        console.log(response.data.msg)

                    } else {
                        toast.error(response.data.msg);
                    }

                    listChapter();
                }
            } else {
                seterror("All fields required! ")
            }



        } catch (err) {
            console.log(err);
        }
    }


    const CreateFrom = () => {
        setCourseList(false)
        setCourseCreate(true)
        setCourseEdit(false)

        inputs.chapter_name = "";
        inputs.course_id = "";
        inputs.chapter_no = '';



        // window.reload();
    }

    const CreateBack = () => {
        setCourseList(true)
        setCourseCreate(false)
        setCourseEdit(false)

        listChapter();

        inputs.chapter_name = "";
        inputs.course_id = "";
        inputs.chapter_no = '';

        setsuccess('');
        seterror('');

        // window.reload();
    }

    const EditBack = () => {
        setCourseList(false)
        setCourseCreate(false)
        setCourseEdit(true)

        setsuccess('');
        seterror('');

        // window.reload();
    }


    const FormUpdate = async (e) => {

        e.preventDefault();
        const data = new FormData();
        data.append("chapter_name", inputs.chapter_name)
        data.append("course_id", inputs.course_id)
        data.append("chapter_no", inputs.chapter_no)
        data.append("id", courseId);


        var response = await ChapterService.update(data);

        if (response.data.status) {
            console.log(response.data)
            toast.success(response.data.msg)
            listChapter();
        }


    }

    const courseEditForm = async (id) => {
        var response = await ChapterService.getOne(id);
        // console.log(response.data.data[0].course_languages_id)
        EditBack();
        if (response.data.status) {

            setCourseId(id)
            // console.log(response.data)
            var item = response.data.data[0];


            inputs.chapter_name = item.chapter_name;
            inputs.course_id = item.course_id;
            inputs.chapter_no = item.chapter_no;


        }

    }

    const courseDelete = async (id) => {
        var responce = await ChapterService.delete(id);

        toast.success(responce.data.msg)

        listChapter();
    }

    const setMsg = async () => {
        setsuccess('');
        seterror('');
    }


    // search
    const [search, setSearch] = useState({});
    const handleSearch = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSearch(values => ({ ...values, [name]: value }));
        console.log(search)

        // userSearch()
    }

    const userSearch = async () => {
        var course_name = search.course_name;

        var responce = await ChapterService.search(course_name);
        console.log("eeeeee", responce.data.data);
        setChapter([...responce.data.data])
        getDataPagi(responce.data.data, (0 * PER_PAGE))
    }

    const userSearchClear = async () => {
        var course_name = '';


        search.course_name = '';


        var responce = await ChapterService.search(course_name);
        console.log("eeeeee", responce.data.data);
        setChapter([...responce.data.data])
        getDataPagi(responce.data.data, (0 * PER_PAGE))
    }


    return <>


        <InnerBanner title="Chapter" name="Create" linkName="Home" link="/" />
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
        <div className=" enrollments-sec activites-sec " style={{ marginBottom: "50px" }} >
            <div className="container">

                {error &&
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" onClick={setMsg} className="close" data-dismiss="alert">&times;</button>
                        {error}
                    </div>
                }

                {success &&
                    <div className="alert alert-success alert-dismissible">
                        <button type="button" className="close" onClick={setMsg} data-dismiss="alert">&times;</button>
                        {success}
                    </div>
                }

                <div className="row">
                    <div className="col-md-12 col-sm-6 pr-md-0">
                        {/**  List */}

                        <Link to={"/chapter/add"} className="sec-btn" onClick={CreateFrom}>Chapter Add</Link>
                        <Link to="/course" className="sec-btn ml-3">Back</Link>
                        <div className=" enrollments-sec-table activites-table">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th width="4.5%">No</th>
                                        <th width="21%">Course Name</th>
                                        <th width="21%">Chapter Name</th>
                                        <th width="5.5%">Edit</th>
                                        <th width="5.5%">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageData.map((item, i) =>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.course_name.toUpperCase()}</td>
                                            <td>{item.chapter_name && item.chapter_name.toUpperCase()}</td>
                                            <td><Link className="btn btn-success" to={"/chapter/edit"} state={{ chapter_ID: item.id }} ><i className="fa fa-edit"></i></Link></td>
                                            <td><button className="btn btn-danger" onClick={e => deleteData(item.id)}><i className="fa fa-trash-o"></i></button></td>
                                        </tr>
                                    )}


                                </tbody>
                            </table>
                        </div>

                        {chapter.length > PER_PAGE && <div className="pagination-sec">

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