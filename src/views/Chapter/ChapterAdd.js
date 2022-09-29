import React, { useEffect, useState, useContext } from "react";
import TokenHelper from '../../services/TokenHelper';
import UserService from '../../services/UserService';
import ChapterService from "../../services/ChapterService";
import CourseService from "../../services/CourseService";
import { AuthContext } from '../../index';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom";


import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';

import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

function ChapterAdd() {

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
                        toast.success(response.data.msg);

                        inputs.chapter_name = "";
                        inputs.course_id = "";
                        inputs.chapter_no = '';

                        document.getElementById("myForm").reset();
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

        if (!responce.data.status) {
            seterror(responce.data.msg)
        }

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

    const navigate = useNavigate();
    var previousPage = () => {
        navigate(-1);
    }


    return <>
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
                    <div className="container">
                        <h2>Chapter Add <span><button type="button" className="sec-btn m-2" onClick={previousPage}>Back</button></span></h2>

                        <div className="row" >
                            <div className="col-sm-12 bg-white m-4 p-3">
                                <form id="myForm" enctype="multipart/form-data" method="post" onSubmit={FormSubmit}>
                                    <div className="form-row">

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>COURSE
                                                </label>
                                                <select required className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="course_id" value={inputs.course_id}>
                                                    <option> -- Select course -- </option>
                                                    {course.length && course.map((item) => (item.course_type == "regular" ? <option value={item.id}>{item.course_name.toUpperCase()}</option> : ''))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>CHAPTER NAME</label>
                                                <input required type="text" className="form-control" name="chapter_name" value={inputs.chapter_name}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>CHAPTER NO</label>
                                                <input required type="number" className="form-control" name="chapter_no" value={inputs.chapter_no}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-12 text-center">
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-success">CREATE</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </>
}

export default ChapterAdd