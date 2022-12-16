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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// loader
import Loader from "../Loader";

export default function UserTaskList() {
  // loader
  const [showLoader, setShowLoader] = useState(false);
  const location=useLocation();
  const TASKID=location.state?.id;

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
    {label:"No.Attempted",key:"no_attempted"},
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

  

  var downloadTask = async () => {
    
    var responce = await TaskService.download(TASKID);
    console.log("task download", responce.data);

   if(responce.data.status)
   {
    var data = [];
    for (var item of responce.data.data) {
      var temp = {
        task_name: item.task_name,
        task_group: item.group_name,
        course: item.course_name,
        firstname: item.firstname,
        lastname: item.lastname,
        email: item.user_email,
        task_start_date: new Date(item.task_start_date).toLocaleDateString(),
        task_end_date: new Date(item.task_end_date).toLocaleDateString(),
        pass_date:item.user_enroll_data[0].enrollment_status==="completed" ? new Date(item.user_enroll_data[0].updated_at).toLocaleDateString():'',
        no_attempted:item.no_attempted,
        status:item.user_task_status
      };

      data.push(temp);
    }
    getDataPagi(responce.data.data, 0 * PER_PAGE);
    console.log("csvvvvvvv", data);
    setCsvData([...data]);
   }
  };

  useEffect(() => {
    (async () => {
      try {
        

        if (user.user_role == 4) {
            downloadTask()
        } else if (user.user_role == 1 || user.user_role == 2) {
          downloadTask();
        }

         
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  

  

 

  const navigate = useNavigate();
    var previousPage = () => {
        navigate(-1);
    }

  return (
    <>
      {/** loader */}
      {showLoader && <Loader />}

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
                <li>Record</li>
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
              {/** Course List */}

              <Link className="sec-btn mr-3" to="" onClick={previousPage}>
                Back
              </Link>
              

              <CSVLink
                headers={headers}
                data={csv_data}
                filename={`taskrecord${Date.now()}.csv`}
              >
                <button type="button" className="sec-btn">
                  <i class="fa fa-download" aria-hidden="true"></i> Export
                </button>
              </CSVLink>

              <div className=" enrollments-sec-table activites-table">
                <table className="table table-responsive" style={{fontSize: "12px"}}>
                  <thead>
                    <tr>
                      <th width="5%">No</th>
                      <th width="15.5%">Task Name</th>
                      <th width="15.5%">Task Group</th>
                      <th width="15.5%">Course Name</th>
                      <th width="15.5%">Firstname</th>
                      <th width="15.5%">Lastname</th>
                      <th width="15.5%">Email</th>
                      <th width="15%">Start Date</th>
                      <th width="15%">End Date</th>
                      <th width="15%">Pass Date</th>
                      <th width="15%">No.Attempted</th>
                      <th width="18%">Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}</th>

                       
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((item, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          {item.task_name && item.task_name}
                        </td>

                        <td>{item.group_name && item.group_name}</td>

                        <td>
                          {item.course_name && item.course_name}
                        </td>

                        <td>
                          {item.firstname && item.firstname}
                        </td>

                        <td>
                          {item.lastname && item.lastname}
                        </td>
                        <td>
                        {item.user_email && item.user_email}
                      </td>

                        <td>
                          {item.task_start_date && new Date(item.task_start_date).toLocaleDateString()}
                        </td>

                        <td>
                          {item.task_start_date && new Date(item.task_end_date).toLocaleDateString()}
                        </td>
                        <td>
                        {item.user_enroll_data[0].enrollment_status==="completed" ?new Date(item.user_enroll_data[0].updated_at).toLocaleDateString():""}
                      </td>
                        <td>
                        {item.no_attempted?item.no_attempted:0}
                        </td>

                        <td>
                          {item.user_task_status == "attempted" && (
                            <span
                              className="text-center"
                              style={{
                                color: "white",
                                backgroundColor: "blue",
                                fontSize:"10px",
                                fontWeight: "800"
                              }}
                            >
                            Attempted
                            </span>
                          )}
                          {item.user_task_status == "passed" && (
                            <span
                              className="text-center"
                              style={{
                                color: "white",
                                backgroundColor: "green",
                                fontSize:"10px",
                                fontWeight: "800"
                              }}
                            >
                            Passed
                            </span>
                          )}
                          {item.user_task_status == "failed" && (
                            <span
                              className="text-center"
                              style={{ color: "white", 
                              backgroundColor: "red",
                              fontSize:"10px",
                              fontWeight: "800"
                            }}
                            >
                            Failed
                            </span>
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

                   
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
