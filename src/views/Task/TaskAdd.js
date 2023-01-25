import React, { useEffect, useState, useContext } from "react";
import TokenHelper from "../../services/TokenHelper";
import UserService from "../../services/UserService";
import { AuthContext } from "../../index";
import AssignmentService from "../../services/AssignmentService";
import { confirmAlert } from "react-confirm-alert";

import ReactPaginate from "react-paginate";

import { MultiSelect } from "react-multi-select-component";

import TaskService from "../../services/TaskService";

import TextEditor from "../TextEditor";

import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import "jquery-validation";

import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import InnerBanner from "../Common/InnerBanner";
import CourseService from "../../services/CourseService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Courses from "../Activites/Courses";
import Course from "../Courses";

function TaskAdd() {
  const [Text, setText] = useState("");
  const [Inialvalue, setInialvalue] = useState("");

  var columns = [
    {
      name: "No",
      selector: "id",
      sortable: true,
    },
    {
      name: "Task Name",
      selector: "task_name",
      sortable: true,
    },
    {
      name: "Start Date",
      selector: "task_start_date",
      sortable: true,
    },
    {
      name: "End Date",
      selector: "task_end_date",
      sortable: true,
    },
    {
      name: "Groups Name",
      selector: "group_name",
      sortable: true,
    },
    {
      name: "Creator Name",
      selector: "creator_email",
      sortable: true,
    },
    {
      name: "Status",
      selector: "task_status",
      sortable: true,
    },
  ];

  // select multiple option
  const [selectedGroup, setSelectedGroup] = useState([]);

  const multipleGroupHandler = function (item) {
    const flavors = [];
    for (let i = 0; i < item.length; i++) {
      flavors.push(item[i].value);
    }
    setSelectedGroup(flavors);
    // console.log(selectedGroup);
  };

  const [course, setCourse] = useState([]);
  const [courseList, setCourseList] = useState(true);
  const [courseCreate, setCourseCreate] = useState(false);
  const [courseEdit, setCourseEdit] = useState(false);

  // set task list
  const [assignment, setAssignment] = useState([]);

  const { user } = useContext(AuthContext);
  const [language, setLanguage] = useState([]);
  const [group, setGroup] = useState([]);
  const [category, setCategory] = useState([]);
  const [inputs, setInputs] = useState({});

  const [selected, setSelected] = useState([]);

  const [attachment_file, setAttachment_file] = useState({});
  const [dfile, setDfile] = useState("");

  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const [courseId, setCourseId] = useState();

  var listAssignment = async () => {
    if (user.user_role == 4) {
      var data = {
        group_id: "",
        created_by: user.user_id,
        course_id: "",
      };

      var responce = await TaskService.search(data);
      // console.log(data);
      setAssignment([...responce.data.data]);
    } else if (user.user_role == 1 || user.user_role == 2) {
      var data = {
        group_id: "",
        created_by: "",
        course_id: "",
      };

      var responce = await TaskService.search(data);
      setAssignment([...responce.data.data]);

      //setCurrentPageData()
    }
  };

  useEffect(() => {
    (async () => {
      try {
        getAllCourse();

        if (user.user_role == 4) {
          listAssignment();
        } else if (user.user_role == 1 || user.user_role == 2) {
          listAssignment();
        }

        var groupRes = await UserService.getGroupList();
        if (groupRes.data.status != false) {
          // // console.log(groupRes.data.data)
          let temp = [];
          for (var i of groupRes.data.data) {
            var aa = { label: i.g_name.toUpperCase(), value: i.id };
            temp.push(aa);
          }

          setGroup([...temp]);
        }
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);

  // get course
  var getAllCourse = async () => {
    var courseRes = await CourseService.getAll();

    setCourse([...courseRes.data.data]);
  };

  const [selectCourse, setSelectCourse] = useState({
    image: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // seterror('');
    // console.log(inputs);

    if (name === "course_id" && course.length > 0 && value != '') {
      for (var i of course) {
        if (i.id == value) {
          setSelectCourse({
            image: i.image,
          });
        }
      }
    }
    else if(value == '' && name === "course_id")
    {
      setSelectCourse({
        image: "",
      });
    }
    
  };

  const FormSubmit = async (e) => {
    // console.log("ssss");
    e.preventDefault();

    var groupArr = [];
    for (var i of selected) {
      groupArr.push(i.value);
    }

    //  // console.log("grouppppppp",groupArr)

    const data = new FormData();
    data.append("created_by", user.user_id);
    data.append("task_start_date", inputs.task_start_date);
    data.append("task_end_date", inputs.task_end_date);
    data.append("group_id", groupArr);
    data.append("task_name", inputs.task_name);
    data.append("task_describtion", Text);
    data.append("course_id", inputs.course_id);

    try {
      var response = await TaskService.create(data);
      // console.log(response.data.msg);
      if (response.data.status != false) {
        toast.success(response.data.msg);

        inputs.created_by = "";
        inputs.task_start_date = "";
        inputs.task_end_date = "";
        setSelectedGroup([]);
        inputs.task_name = "";
        inputs.course_id = "";
        setSelected([]);
        setText("");

        document.getElementById("myForm").reset();
      } else {
        toast.error(response.data.msg);
      }

      listAssignment();
    } catch (err) {
      // console.log(err);
    }
  };

  const navigate = useNavigate();
  var previousPage = () => {
    navigate(-1);
  };

  //  form validation
  useEffect(() => {
    $("#myForm").validate({
      errorElement: "span",
      errorClass: "help-block",
      highlight: function (element, errorClass, validClass) {
        $(element).closest(".form-group").addClass("has-error");
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).closest(".form-group").removeClass("has-error");
      },

      rules: {
        course_id: {
          required: true,
        },
        task_name: {
          required: true,
        },
        task_start_date: {
          required: true,
        },
        task_end_date: {
          required: true,
        },
      },

      messages: {
        course_id: {
          required: "Course Required",
        },
        task_name: {
          required: "Author Name Required",
        },
        task_start_date: {
          required: "Start Date Required",
        },
        task_end_date: {
          required: "End Date Required",
        },
      },
    });
  }, []);

  return (
    <>
      <div className="inner-banner">
        <img src="/images/inner-banner.png" alt="" />
        <div className="desc">
          <div className="container">
            <div className="text">
              <h1>Task</h1>
              <div className="breadcrumb">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>Add</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" enrollments-sec activites-sec ">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-6 pr-md-0">
              <div className="container">
                <span className="row">
                 <div className="col-sm-4">
                 <button
                 type="button"
                 className="sec-btn"
                 onClick={previousPage}
               >
                 Back
               </button>
                 </div>

                 <div className="col-sm-4"></div>
                 <div className="col-sm-4"></div>
                 
                </span>

                <div className="row">
                  <div className="col-sm-12 bg-white m-4 p-3">
                    <form
                      id="myForm"
                      encType="multipart/form-data"
                      method="post"
                      onSubmit={FormSubmit}
                    >
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>TASK NAME</label>
                            <input
                              required
                              type="text"
                              className="form-control"
                              id="task_name"
                              name="task_name"
                              value={inputs.task_name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group multi-group">
                            <label>GROUP</label>

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
                            <input
                              required
                              type="date"
                              className="form-control"
                              name="task_start_date"
                              id="task_start_date"
                              value={inputs.task_start_date}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>END DATE</label>
                            <input
                              required
                              type="date"
                              className="form-control"
                              name="task_end_date"
                              id="task_end_date"
                              value={inputs.task_end_date}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>COURSE </label>
                            <select
                              required
                              className="form-control"
                              id="course_id"
                              onChange={handleChange}
                              name="course_id"
                              value={inputs.course_id}
                            >
                              <option value=""> -- Select Course -- </option>
                              {course.length &&
                                course.map((item) => (
                                  <option value={item.id}>
                                    {item.course_name.toUpperCase()} (
                                    {item.course_type.toUpperCase()})
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                    {selectCourse.image &&   <div className="col-md-6">
                          <div className="form-group">
                            <img
                              src={selectCourse.image}
                              alt=""
                              height="85px"
                              width="40%"
                            />
                          </div>
                        </div> }
                      </div>

                      <div className="form-row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>TASK DESCRIPTION</label>

                            <TextEditor setText={setText} inialvalue={Text} />

                            <small>120 character only.</small>
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                      <div className="col-md-4"></div>
                        <div className="col-md-4 text-center">
                          <div className="form-group">
                            <button type="submit" className="btn btn-success">
                              CREATE
                            </button>
                          </div>
                        </div>
                        <div className="col-md-4"></div>
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
  );
}

export default TaskAdd;
