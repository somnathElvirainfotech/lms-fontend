import React, { useEffect, useState, useContext } from "react";
import TokenHelper from '../../services/TokenHelper';
import UserService from '../../services/UserService';
import { AuthContext } from '../../index';
import AssignmentService from "../../services/AssignmentService";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import CourseService from "../../services/CourseService";

import TextEditor from "../TextEditor";
import { Link, useNavigate } from "react-router-dom";

export default function CourseAssignment() {

    const [Text, setText] = useState('')

    const [course, setCourse] = useState([]);
    const [courseList, setCourseList] = useState(true)
    const [courseCreate, setCourseCreate] = useState(false)
    const [courseEdit, setCourseEdit] = useState(false)
    const [assignment, setAssignment] = useState([]);

    const { user } = useContext(AuthContext);
    const [language, setLanguage] = useState([]);
    const [group, setGroup] = useState([]);
    const [category, setCategory] = useState([])
    const [inputs, setInputs] = useState({})




    const [attachment_file, setAttachment_file] = useState({})
    const [dfile, setDfile] = useState('');

    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');

    const [courseId, setCourseId] = useState();



    var listAssignment = async () => {

        if (user.user_role == 4) {

            var responce = await AssignmentService.getAll();
            console.log(responce.data)
            setAssignment([...responce.data.data])
        } else if (user.user_role == 1 || user.user_role == 2) {
            var responce = await AssignmentService.getAllAssignment();
            console.log(responce.data)
            setAssignment([...responce.data.data])
        }

    }


    useEffect( () => {
        (async () => {
            try {

                if (user.user_role == 4) {
                    listAssignment()
                    var groupRes = await UserService.getGroupList();

                    var responce = await UserService.allCourses();
                    setCourse([...responce.data.data])


                    if (groupRes.data.status != false) {
                        setGroup([...groupRes.data.data])

                    }
                } else if (user.user_role == 1 || user.user_role == 2) {
                    listAssignment()
                    var groupRes = await UserService.getGroupList();

                    var responce = await CourseService.getAll();
                    setCourse([...responce.data.data])


                    if (groupRes.data.status != false) {
                        setGroup([...groupRes.data.data])

                    }
                }


            } catch (error) {
                console.log(error);
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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        // seterror('');
        console.log(inputs)
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

        console.log(inputs)
    }


    const FormSubmit = async (e) => {
        console.log("ssss");
        e.preventDefault();



        const data = new FormData();
        data.append("course_id", inputs.course_id)
        data.append("assigment_desc", Text)
        data.append("assigment_duration", inputs.assigment_duration)
        data.append("assignment_name", inputs.assignment_name)
        data.append("user_group_id", inputs.user_group_id)
        data.append("user_id", user.user_id)
        data.append("assigment_file", attachment_file)


        try {
            var response = await AssignmentService.create(data);
            console.log(response.data.msg)
            if (response.data.status != false) {
                setsuccess(response.data.msg);


                setText('')
                inputs.assigment_duration = "";
                inputs.assignment_name = "";
                inputs.user_group_id = 0;
                inputs.course_id = 0;
                setAttachment_file("")

                console.log(response.data.msg)
                setsuccess(response.data.msg);
            } else {
                seterror(response.data.msg);
            }

            listAssignment();

        } catch (err) {
            console.log(err);
        }
    }


    const CreateFrom = () => {
        setCourseList(false)
        setCourseCreate(true)
        setCourseEdit(false)

        setText('')
        inputs.assigment_duration = "";
        inputs.assignment_name = "";
        inputs.user_group_id = 0;
        inputs.course_id = 0;
        setAttachment_file("")



        // window.reload();
    }

    const CreateBack = () => {
        setCourseList(true)
        setCourseCreate(false)
        setCourseEdit(false)

        listAssignment();

        setText('');
        inputs.assigment_duration = "";
        inputs.assignment_name = "";
        inputs.user_group_id = 0;
        inputs.course_id = 0;
        setAttachment_file("")

        setsuccess('');
        seterror('');

        // window.reload();
    }

    const EditBack = () => {
        setCourseList(false)
        setCourseCreate(false)
        setCourseEdit(true)

        setAttachment_file("")
        // window.reload();

        setsuccess();
        seterror();
    }


    const FormUpdate = async (e) => {
        e.preventDefault();


        console.log(attachment_file.language)

        const data = new FormData();
        data.append("course_id", inputs.course_id)
        data.append("assigment_desc", Text)
        data.append("assigment_duration", inputs.assigment_duration)
        data.append("assignment_name", inputs.assignment_name)
        data.append("user_group_id", inputs.user_group_id)
        data.append("assigment_file", attachment_file)
        data.append("id", courseId);




        var response = await AssignmentService.update(data);

        if (response.data.status) {
            console.log(response.data)
            setsuccess(response.data.msg);
            listAssignment();
        }


    }

    const courseEditForm = async (id) => {
        var response = await AssignmentService.getOne(id);
        // console.log(response.data.data[0].course_languages_id)
        EditBack();
        if (response.data.status) {

            setCourseId(id)
            // console.log(response.data)
            var item = response.data.data[0];
            inputs.assignment_name = item.assignment_name;
            inputs.user_group_id = item.user_group_id;
            inputs.course_id = item.course_id;
            setText(item.assigment_desc);
            inputs.assigment_duration = item.assigment_duration;
            setAttachment_file("")

            setDfile(item.assigment_file)


        }

    }

    const courseDelete = async (id) => {
        var responce = await AssignmentService.delete(id);
        if (!responce.data.status) {
            seterror(responce.data.msg)
        }
        listAssignment();
    }

    const setMsg = async () => {
        setsuccess('');
        seterror('');
    }

    const navigate = useNavigate();
    var previousPage = () => {
        navigate(-1);
    }
    

    return <>

      
        <InnerBanner title="Assignment" name="Create" linkName="Home" link="/" />
        <div className=" enrollments-sec activites-sec " style={{ marginBottom: "50px" }} >

            <div className="container">

                {error &&
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
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


                        {/** Course List */}
                        {courseList &&
                            <>
                                <button className="btn btn-info ml-3" onClick={CreateFrom}>Add</button>
                                <Link to="/course" className="btn btn-info ml-3">Back</Link>
                                <div className=" enrollments-sec-table activites-table">
                                    <table className="table table-responsive">
                                        <thead>
                                            <tr>
                                                <th width="10.5%">No</th>
                                                <th width="21%">Create Date</th>
                                                <th width="21%">Course Name</th>
                                                <th width="21%">Assigment Name</th>
                                                <th width="5.5%">Edit</th>
                                                <th width="5.5%">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignment.map((item, i) =>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                                    <td>{item.course_name.toUpperCase()}</td>
                                                    <td>{item.assignment_name && item.assignment_name.toUpperCase()}</td>
                                                    <td><button className="btn btn-success" onClick={e => courseEditForm(item.id)} ><i className="fa fa-edit"></i></button></td>
                                                    <td><button className="btn btn-danger" onClick={e => deleteData(item.id)}><i className="fa fa-trash-o"></i></button></td>
                                                </tr>
                                            )}


                                        </tbody>
                                    </table>
                                </div>

                                {/** pagination */}
                                <div className="pagination-sec">
                                    <nav data-pagination>
                                        <a href="#" disabled><i className="fa fa-chevron-left"></i></a>
                                        <ul>
                                            <li className="current"><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a> </li>
                                            <li><a href="#">…</a></li>
                                            <li><a href="#">250</a></li>

                                        </ul>
                                        <a href="#"><i className="fa fa-chevron-right"></i> </a>
                                    </nav>
                                </div>
                            </>
                        }

                        {/** Course Create */}
                        {courseCreate &&

                            <>
                                <div className="container">
                                    <button type="button" className="btn btn-info m-2" onClick={CreateBack}>Back</button>

                                    <div className="row" >
                                        <div className="col-sm-12 bg-white m-4 p-3">


                                            <form enctype="multipart/form-data" method="post" onSubmit={FormSubmit}>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>ASSIGNMENT NAME</label>
                                                            <input required type="text" className="form-control" name="assignment_name" value={inputs.assignment_name}
                                                                onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>GROUP
                                                            </label>
                                                            <select required className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="user_group_id" value={inputs.user_group_id}>
                                                                <option value="" > -- Select group -- </option>
                                                                {group.length && group.map((item) => (<option value={item.id}>{item.g_name.toUpperCase()}</option>))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">


                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>COURSE
                                                            </label>
                                                            <select required className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="course_id" value={inputs.course_id}>
                                                                <option value="" > -- Select course -- </option>
                                                                {course.length && course.map((item) => (item.course_type == "regular" ? <option value={item.id}>{item.course_name.toUpperCase()}</option> : ''))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>ASSIGNMENT DURATION(in days)</label>
                                                            <input required type="number" className="form-control" name="assigment_duration" value={inputs.assigment_duration}
                                                                onChange={handleChange} />
                                                        </div>
                                                    </div>



                                                </div>





                                                <div className="form-row" >

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>FILE UPLOAD</label>
                                                            <input required type="file" name="assigment_file" className="form-control" value={inputs.assigment_file}
                                                                onChange={FileHandler} accept="application/pdf, application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                                                        </div>
                                                    </div>
                                                </div>






                                                <div className="form-row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label>Enter Assigment Description</label>

                                                            <TextEditor setText={setText} inialvalue={""} />

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
                            </>

                        }

                        {/** Course Edit */}
                        {courseEdit &&

                            <>
                                <div className="container">
                                    <button type="button" className="btn btn-info m-2" onClick={CreateBack}>Back</button>

                                    <div className="row" >
                                        <div className="col-sm-12 bg-white m-4 p-3">

                                            <form enctype="multipart/form-data" method="post" onSubmit={FormUpdate}>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>ASSIGNMENT NAME</label>
                                                            <input required type="text" className="form-control" name="assignment_name" value={inputs.assignment_name}
                                                                onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>GROUP
                                                            </label>
                                                            <select required className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="user_group_id" value={inputs.user_group_id}>
                                                                <option value="0" > -- Select group -- </option>
                                                                {group.length && group.map((item) => (<option value={item.id}>{item.g_name.toUpperCase()}</option>))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">


                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>COURSE
                                                            </label>
                                                            <select required className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="course_id" value={inputs.course_id}>
                                                                <option value="0" > -- Select course -- </option>
                                                                {course.length && course.map((item) => (item.course_type == "regular" ? <option value={item.id}>{item.course_name.toUpperCase()}</option> : ''))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>ASSIGNMENT DURATION(in days)</label>
                                                            <input required type="number" className="form-control" name="assigment_duration" value={inputs.assigment_duration}
                                                                onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="form-row" >

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label>FILE UPLOAD</label>
                                                            <input type="file" name="assigment_file" className="form-control" value={inputs.assigment_file}
                                                                onChange={FileHandler} accept="application/pdf, application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                                                            {dfile && <a href={dfile} target="__blank">
                                                                <button type="button" width="100px" className="btn btn-success mt-3">
                                                                    <i class="fa fa-download" aria-hidden="true" ></i> Download
                                                                </button>
                                                            </a>}

                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="form-row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label>Enter Assigment Description</label>
                                                            <TextEditor setText={setText} inialvalue={Text} />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-12 text-center">
                                                        <div className="form-group">
                                                            <button type="submit" className="btn btn-success">UPDATE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
       

    </>
}