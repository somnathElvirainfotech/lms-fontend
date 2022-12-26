import React, { useEffect, useState, useContext } from "react";
import TokenHelper from "../../services/TokenHelper";
import UserService from "../../services/UserService";
import { AuthContext } from "../../index";
import AssignmentService from "../../services/AssignmentService";
import { confirmAlert } from "react-confirm-alert";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";

import { MultiSelect } from "react-multi-select-component";

import TaskService from "../../services/TaskService";

import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import InnerBanner from "../Common/InnerBanner";
import CourseService from "../../services/CourseService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// loader
import Loader from "../Loader";

export default function Task() {
  // loader
  const [showLoader, setShowLoader] = useState(false);

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

  const [csv_data, setCsvData] = useState([]);

  // csv header
  const headers = [
    { label: "Task name", key: "task_name" },
    { label: "Task Group", key: "task_group" },
    { label: "Course Name", key: "course" },
    { label: "Firstname", key: "firstname" },
    { label: "Lastname", key: "lastname" },
    { label: "EMAIL", key: "email" },
    { label: "Task Start date", key: "task_start_date" },
    { label: "Task End Date", key: "task_end_date" },
    { label: "Pass Date", key: "pass_date" },
    { label: "Status", key: "status" },
  ];

  // select multiple option
  const [selectedGroup, setSelectedGroup] = useState([]);

  const multipleGroupHandler = function (item) {
    const flavors = [];
    for (let i = 0; i < item.length; i++) {
      flavors.push(item[i].value);
    }
    setSelectedGroup(flavors);
    console.log(selectedGroup);
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
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const [attachment_file, setAttachment_file] = useState({});
  const [dfile, setDfile] = useState("");

  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const [courseId, setCourseId] = useState();

  // react pagination  //////////////////////////
  const PER_PAGE = 10;
  const [currentPageData, setCurrentPageData] = useState([]);
  const pageCount = Math.ceil(assignment.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    getDataPagi(assignment, selectedPage * PER_PAGE);
  }

  function getDataPagi(data, offset) {
    var temp = [];
    console.log("offset", offset);
    data.slice(offset, offset + PER_PAGE).map((item) => {
      temp.push(item);
    });
    setShowLoader(false);
    console.log("all task ", temp);
    setCurrentPageData(temp);
  }

  // /////////////////////////////////

  var listAssignment = async () => {
    setShowLoader(true);
    if (user.user_role == 4) {
      var data = {
        group_id: "",
        created_by: user.user_id,
        course_id: "",
      };

      var responce = await TaskService.search(data);
      console.log("c_taskdata", data);
      setAssignment([...responce.data.data]);
      getDataPagi(responce.data.data, 0 * PER_PAGE);
    } else if (user.user_role == 1 || user.user_role == 2) {
      var data = {
        group_id: "",
        created_by: "",
        course_id: "",
      };

      var responce = await TaskService.search(data);
      setAssignment([...responce.data.data]);
      getDataPagi(responce.data.data, 0 * PER_PAGE);

      //setCurrentPageData()
    }
  };

  // var downloadTask = async () => {
  //   var responce = await TaskService.download();
  //   console.log("task download", responce.data);

  //  if(responce.data.status)
  //  {
  //   var data = [];
  //   for (var item of responce.data.data) {
  //     var temp = {
  //       task_name: item.task_name,
  //       task_group: item.group_name,
  //       course: item.course_name,
  //       firstname: item.firstname,
  //       lastname: item.lastname,
  //       email: item.user_email,
  //       task_start_date: new Date(item.task_start_date).toLocaleDateString(),
  //       task_end_date: new Date(item.task_end_date).toLocaleDateString(),
  //       pass_date:item.user_enroll_data[0].enrollment_status==="completed" ? new Date(item.user_enroll_data[0].updated_at).toLocaleDateString():'',
  //       status:item.user_task_status
  //     };

  //     data.push(temp);
  //   }

  //   console.log("csvvvvvvv", data);
  //   setCsvData([...data]);
  //  }
  // };

  useEffect(() => {
    (async () => {
      try {
        getAllCourse();

        if (user.user_role == 4) {
          listAssignment();
        } else if (user.user_role == 1 || user.user_role == 2) {
          listAssignment();

          // downloadTask();
        }

        var groupRes = await UserService.getGroupList();
        if (groupRes.data.status != false) {
          // console.log(groupRes.data.data)
          let temp = [];
          for (var i of groupRes.data.data) {
            var aa = { label: i.g_name.toUpperCase(), value: i.id };
            temp.push(aa);
          }

          setGroup([...temp]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // get course
  var getAllCourse = async () => {
    var courseRes = await CourseService.getAll();

    setCourse([...courseRes.data.data]);
  };

  // confirm alert
  var deleteData = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => courseDelete(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // seterror('');
    console.log(inputs);
  };

  const FileHandler = (e) => {
    const select = e.target.files[0];
    const Allow = ["application/zip"];
    console.log(select.type);
    if (select && Allow.includes(select.type)) {
      //console.log(22)
      setAttachment_file(select);
    } else {
      seterror("file type not support, file will be zip format ");
    }

    console.log(inputs);
  };

  const FormSubmit = async (e) => {
    console.log("ssss");
    e.preventDefault();

    var groupArr = [];
    for (var i of selected) {
      groupArr.push(i.value);
    }

    //  console.log("grouppppppp",groupArr)

    const data = new FormData();
    data.append("created_by", user.user_id);
    data.append("task_start_date", inputs.task_start_date);
    data.append("task_end_date", inputs.task_end_date);
    data.append("group_id", groupArr);
    data.append("task_name", inputs.task_name);
    data.append("task_describtion", inputs.task_describtion);
    data.append("course_id", inputs.course_id);

    try {
      var response = await TaskService.create(data);
      console.log(response.data.msg);
      if (response.data.status != false) {
        setsuccess(response.data.msg);

        inputs.created_by = "";
        inputs.task_start_date = "";
        inputs.task_end_date = "";
        setSelectedGroup([]);
        inputs.task_name = "";
        inputs.task_describtion = "";
        inputs.course_id = "";
        setSelected([]);

        console.log(response.data.msg);
        setsuccess(response.data.msg);
      } else {
        seterror(response.data.msg);
      }

      listAssignment();
    } catch (err) {
      console.log(err);
    }
  };

  const CreateFrom = () => {
    setCourseList(false);
    setCourseCreate(true);
    setCourseEdit(false);
    setSelected([]);
    inputs.created_by = "";
    inputs.task_start_date = "";
    inputs.task_end_date = "";
    inputs.course_id = "";
    inputs.task_name = "";
    inputs.task_describtion = "";
    setAttachment_file("");

    // window.reload();
  };

  const CreateBack = () => {
    setCourseList(true);
    setCourseCreate(false);
    setCourseEdit(false);

    listAssignment();

    inputs.created_by = "";
    inputs.task_start_date = "";
    inputs.task_end_date = "";
    inputs.task_name = "";
    inputs.task_describtion = "";
    inputs.course_id = "";
    setAttachment_file("");
    setSelected([]);

    setsuccess("");
    seterror("");

    // window.reload();
  };

  const EditBack = () => {
    setCourseList(false);
    setCourseCreate(false);
    setCourseEdit(true);

    setSelected([]);

    // window.reload();

    setsuccess();
    seterror();
  };

  const FormUpdate = async (e) => {
    e.preventDefault();

    //console.log(attachment_file.language)

    var groupArr = [];
    for (var i of selected) {
      groupArr.push(i.value);
    }

    const data = new FormData();
    data.append("task_start_date", inputs.task_start_date);
    data.append("task_end_date", inputs.task_end_date);
    data.append("course_id", inputs.course_id);
    data.append("task_status", inputs.task_status);
    data.append("task_name", inputs.task_name);
    data.append("task_describtion", inputs.task_describtion);
    data.append("id", courseId);
    data.append("group_id", groupArr);

    var response = await TaskService.update(data);

    console.log(response.data);
    if (response.data.status) {
      setsuccess(response.data.msg);
      listAssignment();
    }
  };

  const courseEditForm = async (id) => {
    var response = await TaskService.getOne(id);
    // console.log(response.data.data[0].course_languages_id)
    EditBack();
    if (response.data.status) {
      setCourseId(id);
      // console.log(id)
      var item = response.data.data[0];

      inputs.created_by = item.created_by;
      inputs.task_start_date = item.task_start_date;
      inputs.task_end_date = item.task_end_date;
      inputs.course_id = item.course_id;
      inputs.task_status = item.task_status;
      inputs.task_name = item.task_name;
      inputs.task_describtion = item.task_describtion;

      // // var aa = [1, 2];
      // setSelected([{value:2,label:""},]);
      // // console.log("gggggggggg", selected)

      var temp = [];
      for (var item of item.group_details) {
        var aa = { label: item.g_name.toUpperCase(), value: item.group_id };
        temp.push(aa);
      }

      setSelected([...temp]);
    }
  };

  const courseDelete = async (id) => {
    setShowLoader(true);
    var responce = await TaskService.delete(id);
    if (!responce.data.status) {
      seterror(responce.data.msg);
    }
    setShowLoader(false);
    toast.success(responce.data.msg);
    listAssignment();
  };

  const setMsg = async () => {
    setsuccess("");
    seterror("");
  };

  var gotoRecord=(id)=>{
    navigate("/task/record",{state:{id:id}})
  }

  return (
    <>
      {/** loader */}
      {showLoader && <Loader />}

      <InnerBanner title="Task" name="List" linkName="Home" link="/" />
      <div className=" enrollments-sec activites-sec ">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-6 pr-md-0">
              {/** Course List */}

              <Link className="sec-btn" to="/task/add">
                Task Add
              </Link>

             {/**  <CSVLink
                headers={headers}
                data={csv_data}
                filename="taskrecord.csv"
              >
                <button type="button" className="sec-btn">
                  <i class="fa fa-download" aria-hidden="true"></i> Export Task
                </button>
              </CSVLink> */}

              <div className=" enrollments-sec-table activites-table">
                <table className="table table-responsive" style={{fontSize: "12px"}}>
                  <thead>
                    <tr>
                      <th width="5%">No</th>
                      <th width="15.5%">Task Name</th>
                      <th width="15.5%">Course Name</th>
                      <th width="15%">Start Date</th>
                      <th width="15%">End Date</th>
                      <th width="18%">Groups Name</th>

                      <th width="21%">
                        Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      </th>
                      <th width="5%">Edit</th>
                      <th width="5%">Delete</th>
                      <th width="5%">Record</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((item, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          {item.task_name && item.task_name.toUpperCase()}
                        </td>
                        <td>
                          {item.course_name && item.course_name.toUpperCase()}
                        </td>
                        <td>
                          {new Date(item.task_start_date).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(item.task_end_date).toLocaleDateString()}
                        </td>
                        <td>{item.group_name.toUpperCase()}</td>

                        <td>
                          {item.task_status == "pending" && (
                            <span
                              className="text-center"
                              style={{
                                color: "white",
                                backgroundColor: "blue",
                              }}
                            >
                              Pending
                            </span>
                          )}
                          {item.task_status == "approve" && (
                            <span
                              className="text-center"
                              style={{
                                color: "white",
                                backgroundColor: "green",
                              }}
                            >
                              Approve
                            </span>
                          )}
                          {item.task_status == "disapprove" && (
                            <span
                              className="text-center"
                              style={{ color: "white", backgroundColor: "red" }}
                            >
                              Dis-Approve
                            </span>
                          )}
                        </td>

                        <td>
                          <Link
                            className="btn btn-success"
                            to={"/task/edit"}
                            state={{ task_ID: item.id }}
                          >
                            <i className="fa fa-edit"></i>
                          </Link>{" "}
                        </td>
                        <td>
                      {/**  item.delete_task_status &&  <button
                        className="btn btn-danger"
                        onClick={(e) => deleteData(item.id)}
                      >
                        <i className="fa fa-trash-o"></i>
                      </button> */}
                      <button
                      className="btn btn-danger"
                      onClick={(e) => deleteData(item.id)}
                    >
                      <i className="fa fa-trash-o"></i>
                    </button>
                        </td>

                        <td>
                          {!item.delete_task_status && (
                            <button
                            data-placement="bottom" 
                            title="record"
                              className="btn btn-primary"
                              onClick={() => gotoRecord(item.id)}
                            >
                            <i class="fa fa-user" aria-hidden="true"></i>
                            </button>
                          )}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/** pagination */}
              {assignment.length > 10 && (
                <div className="pagination-sec">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
