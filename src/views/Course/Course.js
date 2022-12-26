import React, { useEffect, useState, useContext } from "react";
import TokenHelper from '../../services/TokenHelper';
import UserService from '../../services/UserService';
import { AuthContext } from '../../index';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { MultiSelect } from "react-multi-select-component";

import CourseService from "../../services/CourseService";

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import CreatorService from "../../services/CreatorService";

import ReactPaginate from "react-paginate";
import TextEditor from "../TextEditor";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// loader 
import Loader from "../Loader";

export default function Create() {

    // loader
    const [showLoader, setShowLoader] = useState(false);
    const [Text, setText] = useState('')

    const [selected, setSelected] = useState([]);
    const [course, setCourse] = useState([]);
    const [courseList, setCourseList] = useState(true)
    const [courseCreate, setCourseCreate] = useState(false)
    const [courseEdit, setCourseEdit] = useState(false)

    const [courseType, setCourseType] = useState('');
    const { user } = useContext(AuthContext);
    const [language, setLanguage] = useState([]);
    const [group, setGroup] = useState([]);
    const [category, setCategory] = useState([])
    const [cinputs, setCInputs] = useState({})

    const [image, setImage] = useState({});
    const [image1, setImage1] = useState('');

    const [avatar_image, setAvatar_image] = useState({});
    const [image2, setImage2] = useState('');


    const [attachment_file, setAttachment_file] = useState({})
    const [dfile, setDfile] = useState('');

    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');

    const [courseId, setCourseId] = useState();
    const [creator, setCreator] = useState([]);


    // react pagination  //////////////////////////
    const PER_PAGE = 10;
    const [currentPageData, setCurrentPageData] = useState([]);
    const pageCount = Math.ceil(course.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        getDataPagi(course, (selectedPage * PER_PAGE))
    }


    function getDataPagi(data, offset) {
        console.log("offset", offset);
        var temp = [];
        data.slice(offset, offset + PER_PAGE).map((item) => {
            temp.push(item);
        })
        setCurrentPageData(temp)
        setShowLoader(false)

    }

    // /////////////////////////////////



    useEffect(() => {

      

        (async () => {

            //  console.log("language type ",user.language_type)
           
            if (user.user_role == 4) {
                setShowLoader(true)
                var responce = await UserService.allCourses();
                //console.log(responce.data.data)
                setCourse([...responce.data.data])
                getDataPagi(responce.data.data, 0 * PER_PAGE)
            } else if (user.user_role == 2 || user.user_role == 1) {
                setShowLoader(true)
                var responce = await CourseService.getAll();
                console.log(responce.data.data)
                setCourse([...responce.data.data])
                getCreatorList();
                getDataPagi(responce.data.data, 0 * PER_PAGE)
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


    var listCourse = async () => {

        if (user.user_role == 4) {

            var responce = await UserService.allCourses();
            //console.log(responce.data.data)
            setCourse([...responce.data.data])
            getDataPagi(responce.data.data, 0 * PER_PAGE)
        } else if (user.user_role == 2 || user.user_role == 1) {
            var responce = await CourseService.getAll();
            console.log(responce.data.data)
            setCourse([...responce.data.data])
            getDataPagi(responce.data.data, 0 * PER_PAGE)
        }
    }

    useEffect(() => {

        (async () => {
            try {

                var languageRes = await UserService.languages();
                var categoryRes = await UserService.getAllCategory();

                // console.log(categoryRes.data.data)

                if (languageRes.data.status != false) {
                    setLanguage([...languageRes.data.data]);
                }


                if (categoryRes.data.status != false) {
                    setCategory([...categoryRes.data.data])
                }

                var groupRes = await UserService.getGroupList();
                if (groupRes.data.status != false) {
                    // console.log(groupRes.data.data)
                    let temp = [];
                    for (var i of groupRes.data.data) {
                        var aa = { label: i.g_name.toUpperCase(), value: i.id };
                        temp.push(aa)
                    }

                    setGroup([...temp])
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

                // setCInputs(data);

            } catch (error) {
                console.log(error);
            }
        })()

    }, [])


    var getCreatorList = async () => {
        var responce = await CreatorService.getUserByRoleID();
        setCreator([...responce.data.data]);

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCInputs(values => ({ ...values, [name]: value }))
        // seterror('');
        if (name == "course_type") {
            if (value == "regular") {
                setCourseType("regular")
            } else if (value == "xapi") {
                setCourseType("xapi")
            }
        }
        console.log(cinputs)
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

        console.log(cinputs)
    }

    const FileHandler = (e) => {
        const select = e.target.files[0];
        const Allow = ["application/pdf", "application/vnd.ms-excel", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        // console.log(select.type)
        if (select && Allow.includes(select.type)) {
            //console.log(22)
            setAttachment_file(select)
        } else {
            seterror("file type not support, file will be doc,pdf or xls format ")
        }

        console.log(cinputs)
    }

    const FileHandler2 = (e) => {
        const select = e.target.files[0];
        const Allow = ["application/zip"];
        // console.log(select.type)
        if (select && Allow.includes(select.type)) {
            //console.log(22)
            setAttachment_file(select)
        } else {
            seterror("file type not support, file will be zip format ")
        }

        console.log(cinputs)
    }


    const FormSubmit = async (e) => {
        console.log("ssss");
        e.preventDefault();

        var groupArr = [];
        for (var i of selected) {
            groupArr.push(i.value)
        }

        const data = new FormData();
        data.append("course_name", cinputs.course_name)
        data.append("group_id", groupArr)
        data.append("category_id", cinputs.category_id)
        data.append("lang", cinputs.lang)
        data.append("short_description", Text)
        data.append("published_status", cinputs.published_status)
        data.append("course_level", cinputs.course_level)
        data.append("image", image)
        data.append("avatar_image", avatar_image)
        data.append("course_type", cinputs.course_type)

        if (courseType == "regular") {
            data.append("attachment_file", attachment_file)
        } else if (courseType == "xapi") {
            data.append("xapi_attachment_file", attachment_file)
        }

        if (user.user_role == 2 || user.user_role == 1) {
            data.append("user_id", cinputs.creator)
        }
        else {
            data.append("user_id", user.user_id)
        }


        try {
            var response = await UserService.createCourse(data);
            //console.log(response.data.msg)
            if (response.data.status != false) {
                toast.success(response.data.msg)

                cinputs.course_name = "";
                setSelected([]);
                cinputs.category_id = "";
                cinputs.lang = "";
                setText('');
                cinputs.creator = "";
                cinputs.published_status = "";
                cinputs.course_level = "";
                cinputs.course_type = "";
                setImage("");
                setAvatar_image("");
                setAttachment_file("");

                setCourseType("");
                // console.log(response.data.msg)
            } else {
                toast.error(response.data.msg)
            }

            listCourse();
            getCreatorList();

        } catch (err) {
            console.log(err);
        }
    }


    const CreateFrom = () => {
        setCourseList(false)
        setCourseCreate(true)
        setCourseEdit(false)

        cinputs.course_name = "";
        setSelected([]);
        cinputs.category_id = "";
        cinputs.lang = "";
        setText('')
        cinputs.published_status = "";
        cinputs.course_level = "";
        cinputs.creator = '';
        cinputs.course_type = '';
        setImage("");
        setAvatar_image("");
        setAttachment_file("");
        setCourseType("");

        setsuccess('');
        seterror('');


        // window.reload();
    }

    const CreateBack = () => {
        setCourseList(true)
        setCourseCreate(false)
        setCourseEdit(false)

        listCourse();

        cinputs.course_name = "";
        setSelected([]);
        cinputs.category_id = "";
        cinputs.lang = "";
        setText('')
        cinputs.published_status = "";
        cinputs.course_level = "";
        cinputs.creator = '';
        cinputs.course_type = '';
        setImage("");
        setAvatar_image("");
        setAttachment_file("");

        setCourseType("");

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

        var groupArr = [];
        for (var i of selected) {
            groupArr.push(i.value)
        }

        const data = new FormData();
        data.append("course_name", cinputs.course_name)
        data.append("group_id", groupArr)
        data.append("category_id", cinputs.category_id)
        data.append("lang", cinputs.lang)
        data.append("short_description", Text)
        data.append("published_status", cinputs.published_status)
        data.append("course_level", cinputs.course_level)
        data.append("image", image)
        data.append("avatar_image", avatar_image)
        data.append("attachment_file", attachment_file)
        data.append("id", courseId);

        data.append("course_type", cinputs.course_type)

        if (courseType == "regular") {
            data.append("attachment_file", attachment_file)
        } else if (courseType == "xapi") {
            data.append("xapi_attachment_file", attachment_file)
        }

        if (user.user_role == 2 || user.user_role == 1) {
            data.append("user_id", cinputs.creator);
        }



        var response = await UserService.courseUpdate(data);

        if (response.data.status) {
            console.log(response.data)
            listCourse();
            getCreatorList();
            setsuccess(response.data.msg)
        }



    }

    const courseEditForm = async (id) => {
        var response = await UserService.singleCourseGet(id);
        // console.log(response.data.data[0].course_languages_id)
        EditBack();
        if (response.data.status) {

            setCourseId(id)
            console.log("courseeeee", response.data)
            var item = response.data.data[0];
            cinputs.course_type = item.course_type;
            cinputs.course_name = item.course_name;
            // cinputs.group_id = item.group_id;
            cinputs.category_id = item.category_id;
            cinputs.lang = item.course_languages_id;
            setText(item.short_description)
            cinputs.published_status = item.published_status;
            cinputs.course_level = item.course_level;
            setImage('');
            setAvatar_image("");
            setAttachment_file("");
            setCourseType(item.course_type);


            if (user.user_role == 2 || user.user_role == 1) {
                cinputs.creator = item.user_id
            }

            //console.log(response.data.data[0]);

            setImage1(item.image)
            setImage2(item.avatar_image)

            //    console.log("ssssssi",item.course_type)

            if (item.course_type == "regular") {
                setDfile(item.attachment_file)
            } else if (item.course_type == "xapi") {
                setDfile(item.xapi_attachment_file);
            }

            var temp = [];
            for (var item of item.group_details) {
                var aa = { label: item.g_name.toUpperCase(), value: item.group_id }
                temp.push(aa)
            }

            setSelected([...temp]);


        }

    }

    const courseDelete = async (id) => {
        setShowLoader(true)
        var responce = await UserService.courseDelete(id);
        toast.success(responce.data.msg)
        listCourse();
    }

    const setMsg = async () => {
        setsuccess('');
        seterror('');
    }

    const statusUpdate = async (id, status) => {
        setShowLoader(true)
        var data = {
            id: id,
            status: status == 'active' ? 'inactive' : 'active'

        }

        console.log(data)

        var responce =await CourseService.statusChange(data);
        if(responce.data.status)
        toast.success("Status change successfull")
        else
        toast.error("Status not change")

        console.log(responce.data)


        listCourse();

    }

    return <>

        {/** loader */}
        {showLoader && <Loader />}


        <InnerBanner title="Courses" name="List" linkName="Home" link="/" />
        <div className=" enrollments-sec activites-sec "   >
            <div className="container">

                 

                <div className="row">
                    <div className="col-md-12 col-sm-6 pr-md-0">
                        {/** Course List */}


                        <Link to="/course/add" className="sec-btn" >Course Add</Link>

                        <Link to="/chapter" className="sec-btn ml-3 " > Chapter </Link>
                        <Link to="/lesson" className="sec-btn ml-3 " > Lesson </Link>
                        <Link to="/assignment-create" className="sec-btn ml-3 " > Assignment </Link>

                        <div className=" enrollments-sec-table activites-table ">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th width="10.5%">Date</th>
                                        <th width="21%">Course Name</th>
                                        <th width="21%">Category Name</th>
                                        <th width="21%">Course Type</th>
                                        {user.user_role == 2 || user.user_role == 1 ? <>
                                            <th width="21%" >Creator Name</th>
                                            <th width="12%" >Approve Status</th>
                                        </> : ''}
                                        <th width="12%" >Publish Status</th>
                                        {user.user_role == 4 ? <th width="12%">Approve Status</th> : ''}
                                        <th width="5.5%">Edit</th>
                                        <th width="5.5%">Delete</th>

                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageData.map((item) =>
                                        <tr>
                                            <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                            <td>{item.course_name.toUpperCase()}</td>
                                            <td>{item.category_name && item.category_name.toUpperCase()}</td>
                                            <td>{item.course_type && item.course_type.toUpperCase()}</td>
                                            {user.user_role == 2 || user.user_role == 1 ? <>
                                                <td>{item.creator_name}</td>
                                                <td>
                                                 {!item.total_enroll_status && <>   {item.approved_status == 'active' ? <button onClick={e => statusUpdate(item.id, item.approved_status)} className="btn btn-success">Approve</button> : <button onClick={e => statusUpdate(item.id, item.approved_status)} className="btn btn-danger">Dis-Approve</button>}
                                                 </>}
                                                </td>
                                            </> : ''}
                                            <td>{item.published_status == 'active' ? <span className="text-center" style={{ color: "white", backgroundColor: "green" }}>Active</span> : <span className="text-center" style={{ color: "white", backgroundColor: "red" }}>In-active</span>}</td>

                                            {user.user_role == 4 && <td className="text-center" >{item.approved_status == 'active' ? <span className="text-center" style={{ color: "white", backgroundColor: "green" }}>Active</span> : <span className="text-center" style={{ color: "white", backgroundColor: "red" }}>In-active</span>}</td>}

                                            <td><Link className="btn btn-success" to="/course/edit" state={{ course_ID: item.id }} ><i className="fa fa-edit"></i></Link></td>
                                            <td><button className="btn btn-danger" onClick={e => deleteData(item.id)}><i className="fa fa-trash-o"></i></button></td>
                                            <td><Link to={`/courses/${item.course_name}`} state={{ singleCourseId: item.id }} className="btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></Link></td>
                                        </tr>
                                    )}


                                </tbody>
                            </table>
                        </div>

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








                    </div>
                </div>
            </div>
        </div>


    </>
}