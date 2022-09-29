import React, { useEffect, useState, useContext } from "react";
import TokenHelper from '../../services/TokenHelper';
import UserService from '../../services/UserService';
import { AuthContext } from '../../index';
import AssignmentService from "../../services/AssignmentService";
import { confirmAlert } from 'react-confirm-alert';

import ReactPaginate from "react-paginate";


import { MultiSelect } from "react-multi-select-component";

import TaskService from "../../services/TaskService";



import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import CourseService from "../../services/CourseService";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TextEditor from "../TextEditor";

function TaskEdit() {

    const [Text, setText] = useState('');
    const [Inialvalue, setInialvalue] = useState('');

    var columns = [
        {
            name: "No",
            selector: "id",
            sortable: true
        },
        {
            name: "Task Name",
            selector: "task_name",
            sortable: true
        },
        {
            name: "Start Date",
            selector: "task_start_date",
            sortable: true
        },
        {
            name: "End Date",
            selector: "task_end_date",
            sortable: true
        },
        {
            name: "Groups Name",
            selector: "group_name",
            sortable: true,
        },
        {
            name: "Creator Name",
            selector: "creator_email",
            sortable: true
        },
        {
            name: "Status",
            selector: "task_status",
            sortable: true
        }
    ];

    // select multiple option
    const [selectedGroup, setSelectedGroup] = useState([]);

    const multipleGroupHandler = function (item) {
        const flavors = [];
        for (let i = 0; i < item.length; i++) {
            flavors.push(item[i].value);
        }
        setSelectedGroup(flavors);
        console.log(selectedGroup)
    }

    const [course, setCourse] = useState([]);
    const [courseList, setCourseList] = useState(true)
    const [courseCreate, setCourseCreate] = useState(false)
    const [courseEdit, setCourseEdit] = useState(false)

    // set task list
    const [assignment, setAssignment] = useState([]);

    const { user } = useContext(AuthContext);
    const [language, setLanguage] = useState([]);
    const [group, setGroup] = useState([]);
    const [category, setCategory] = useState([])
    const [inputs, setInputs] = useState({})

    const [selected, setSelected] = useState([]);


    const [attachment_file, setAttachment_file] = useState({})
    const [dfile, setDfile] = useState('');

    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');

    const [courseId, setCourseId] = useState();

   



    var listAssignment = async () => {

        if (user.user_role == 4) {

            var data = {
                group_id: '',
                created_by: user.user_id,
                course_id: ''
            }

            var responce = await TaskService.search(data);
            console.log(data)
            setAssignment([...responce.data.data])
        } else if (user.user_role == 1 || user.user_role == 2) {

            var data = {
                group_id: '',
                created_by: '',
                course_id: ''
            }

            var responce = await TaskService.search(data);
            setAssignment([...responce.data.data])

            //setCurrentPageData()

        }

    }

    var location = useLocation();
    var { task_ID } = location.state;


    useEffect(() => {
        (async () => {
            try {

                courseEditForm(task_ID)

                getAllCourse();

                if (user.user_role == 4) {
                    listAssignment()


                } else if (user.user_role == 1 || user.user_role == 2) {
                    listAssignment()


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


            } catch (error) {
                console.log(error);
            }
        })()
    }, [])


    // get course
    var getAllCourse = async () => {
        var courseRes = await CourseService.getAll();

        setCourse([...courseRes.data.data])
    }


    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        // seterror('');
        console.log(inputs)
    }


    

    

    const FormUpdate = async (e) => {
        e.preventDefault();


        //console.log(attachment_file.language)

        var groupArr = [];
        for (var i of selected) {
            groupArr.push(i.value)
        }

        const data = new FormData();
        data.append("task_start_date", inputs.task_start_date)
        data.append("task_end_date", inputs.task_end_date)
        data.append("course_id", inputs.course_id)
        data.append("task_status", inputs.task_status)
        data.append("task_name", inputs.task_name)
        data.append("task_describtion", Text)
        data.append("id", courseId);
        data.append("group_id", groupArr);




        var response = await TaskService.update(data);


        console.log(response.data)
        if (response.data.status) {
            toast.success(response.data.msg)
            listAssignment();
        }


    }

    const courseEditForm = async (id) => {
        var response = await TaskService.getOne(id);
        // console.log(response.data.data[0].course_languages_id)
       
        if (response.data.status) {

            setCourseId(id)
            // console.log(id)
            var item = response.data.data[0];

            inputs.created_by = item.created_by
            inputs.task_start_date = item.task_start_date
            inputs.task_end_date = item.task_end_date
            inputs.course_id = item.course_id;
            inputs.task_status = item.task_status;
            inputs.task_name = item.task_name;
            setText(item.task_describtion);

            // // var aa = [1, 2];
            // setSelected([{value:2,label:""},]);
            // // console.log("gggggggggg", selected)

            var temp = [];
            for (var item of item.group_details) {
                var aa = { label: item.g_name.toUpperCase(), value: item.group_id }
                temp.push(aa)
            }

            setSelected([...temp]);

        }



    }

    

    

    const navigate = useNavigate();
    var previousPage = () => {
        navigate(-1);
    }



    return <>



        <div className=" enrollments-sec activites-sec " style={{ marginBottom: "50px" }} >

            <div className="container">

               

                <div className="row">
                    <div className="col-md-12 col-sm-6 pr-md-0">


                        <div className="container">
                            <h2>Task Edit <span><button type="button" className="sec-btn" onClick={previousPage}>Back</button></span></h2>

                            <div className="row" >
                                <div className="col-sm-12 bg-white m-4 p-3">


                                    <form encType="multipart/form-data" method="post" onSubmit={FormUpdate}>


                                        <div className="form-row">

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>TASK NAME</label>
                                                    <input required type="text" className="form-control" name="task_name" value={inputs.task_name}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>GROUP
                                                    </label>
                                                    <MultiSelect
                                                        options={group}
                                                        value={selected}
                                                        onChange={setSelected}
                                                        labelledBy="Select"
                                                    />
                                                </div>
                                            </div>

                                        </div>


                                        <div className="form-row">


                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>START DATE</label>
                                                    <input required type="date" className="form-control" name="task_start_date" value={inputs.task_start_date}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>END DATE</label>
                                                    <input required type="date" className="form-control" name="task_end_date" value={inputs.task_end_date}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>




                                        </div>

                                        <div className="form-row">

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>COURSE </label>
                                                    <select required className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="course_id" value={inputs.course_id}>
                                                        <option value="" > -- Select Course -- </option>
                                                        {course.length && course.map((item) => (<option value={item.id}>{item.course_name.toUpperCase()} ({item.course_type.toUpperCase()})</option>))}
                                                    </select>

                                                </div>
                                            </div>

                                        </div>

                                        {user.user_role != 4 && <div className="form-row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>STATUS
                                                    </label>
                                                    <select required className="form-control" id="task_status" onChange={handleChange} name="task_status" value={inputs.task_status}>
                                                        <option value="" > -- Select Stattus -- </option>
                                                        <option value="pending">{'pending'.toUpperCase()}</option>
                                                        <option value="approve">{'approve'.toUpperCase()}</option>
                                                        <option value="disapprove">{'disapprove'.toUpperCase()}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>}


                                        <div className="form-row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>TASK DESCRIPTION  </label>
                                                    <TextEditor setText={setText} inialvalue={Text} />
                                                    <small>120 character only.</small>
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

                    </div>
                </div>
            </div>
        </div>


    </>
}

export default TaskEdit