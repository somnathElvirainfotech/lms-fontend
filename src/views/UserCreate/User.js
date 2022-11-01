import React, { useEffect, useState, useContext } from "react";
import TokenHelper from "../../services/TokenHelper";
import UserService from "../../services/UserService";
import { AuthContext } from "../../index";
import UserCreateService from "../../services/UserCreateService";
import sampleCsv from "./sample.csv";

import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import InnerBanner from "../Common/InnerBanner";
import QualificationService from "../../services/QualificationService";
import { CSVLink } from "react-csv";
// import { Button } from "react-bootstrap";
import CSVFileValidator from "csv-file-validator";
import ReactPaginate from "react-paginate";
import { MultiSelect } from "react-multi-select-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// loader
import Loader from "../Loader";

export default function Create() {
  // loader
  const [showLoader, setShowLoader] = useState(false);

  const [course, setCourse] = useState([]);
  const [courseList, setCourseList] = useState(true);
  const [courseCreate, setCourseCreate] = useState(false);
  const [courseEdit, setCourseEdit] = useState(false);

  const { user } = useContext(AuthContext);
  const [language, setLanguage] = useState([]);
  const [group, setGroup] = useState([]);
  const [category, setCategory] = useState([]);
  const [cinputs, setCInputs] = useState({});
  const [qualification, setQualification] = useState([]);

  const [image, setImage] = useState({});
  const [image1, setImage1] = useState("");

  const [avatar_image, setAvatar_image] = useState({});
  const [image2, setImage2] = useState("");

  const [attachment_file, setAttachment_file] = useState({});
  const [dfile, setDfile] = useState("");

  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const [perror, setperror] = useState("");
  const [psuccess, setpsuccess] = useState("");

  const [courseId, setCourseId] = useState();

  const [checkedStatus, setCheckedStatus] = useState(false);

  const [formemai, setFormemai] = useState("");
  const [search, setSearch] = useState({});
  const [csv_data, setCsvData] = useState([]);
  const [csv_data2, setCsvData2] = useState([]);

  const [selected, setSelected] = useState([]);

  // csv header
  const headers = [
    { label: "HR NO", key: "hr_no" },
    { label: "Organization Unit", key: "organization_unit" },
    { label: "Firstname", key: "firstname" },
    { label: "Lastname", key: "lastname" },
    { label: "EMAIL", key: "email" },
    { label: "Role Id", key: "user_role" },
    { label: "Role Name", key: "user_type" },
    { label: "Group Name", key: "group_name" },
    { label: "Group Id", key: "group_id" },
    { label: "LOGIN COUNT", key: "login_count" },
    { label: "LOGIN TYPE", key: "login_type" },
    { label: "COURSE COUNT", key: "course_count" },
    { label: "Last Sign IN Date", key: "last_sign_in" },
    { label: "Created Date", key: "created_at" },
    { label: "Updated Date", key: "updated_at" },
    { label: "LINKEDIN LINK", key: "social_link_1" },
    { label: "MS TEAM LINK", key: "social_link_2" },
    { label: "Status", key: "status" },
  ];

  // updated csv header
  const updateheaders = [
    { label: "firstname", key: "firstname" },
    { label: "lastname", key: "lastname" },
    { label: "password", key: "password" },
    { label: "role", key: "user_role" },
    { label: "is_active", key: "is_active" },
    { label: "group_id", key: "group_id" },
    { label: "social_link_1", key: "social_link_1" },
    { label: "social_link_2", key: "social_link_2" },
    { label: "email", key: "email" },
    {label: "language_id", key:"language_id"},
    { label: "user_hr_no", key: "hr_no" },
    { label: "login_type", key: "login_type" },
    { label: "", key: "blank_1" },
    { label: "", key: "blank_2" },
    { label: "Group Details", key: "group_details" },
    { label: "", key: "blank_3" },
    { label: "User Role Details", key: "role_details" },
    { label: "", key: "blank_4" },
    { label: "Status Details", key: "status_details" },
    { label: "", key: "blank_5" },
    { label: "LOGIN TYPE", key: "login_type_details" },
    { label: "LANGUAGE", key: "language_id_details" },
  ];

  // react pagination  //////////////////////////
  const PER_PAGE = 10;
  const [currentPageData, setCurrentPageData] = useState([]);
  const pageCount = Math.ceil(course.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    getDataPagi(course, selectedPage * PER_PAGE);
  }

  function getDataPagi(data, offset) {
    var temp = [];
    console.log("offset", offset);
    data.slice(offset, offset + PER_PAGE).map((item) => {
      temp.push(item);
    });
    setCurrentPageData(temp);
    setShowLoader(false);
  }

  // /////////////////////////////////

  function customersData(custs) {
    var data = [];
    for (var item of custs) {
      var temp = {
        hr_no: item.user_hr_no,
        organization_unit: item.organization_unit ? item.organization_unit : "",
        group_name: item.group_name,
        group_id: item.group_id,
        login_count: item.login_count,
        login_type: item.login_type,
        course_count: item.course_count,
        email: item.email,
        last_sign_in: item.last_sign_date
          ? new Date(item.last_sign_date).toLocaleDateString()
          : "",
        created_at: item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : "",
        updated_at: item.updated_at
          ? new Date(item.updated_at).toLocaleDateString()
          : "",
        firstname: item.firstname,
        lastname: item.lastname,
        user_role: item.role,
        user_type: item.user_type,
        social_link_1: item.social_link_1,
        social_link_2: item.social_link_2,
        status: item.is_active ? "approve" : "dis-approve",
      };

      data.push(temp);
    }

    console.log("csvvvvvvv", data);
    setCsvData([...data]);
    // return data;
  }

  async function customersData2(custs) {
    var data = [];
    for (var item of custs) {
      var temp = {
        hr_no: item.user_hr_no,
        group_id: item.group_id,
        email: item.email,
        firstname: item.firstname,
        lastname: item.lastname,
        user_role: item.role,
        social_link_1: item.social_link_1,
        social_link_2: item.social_link_2,
        is_active: item.is_active ? "1" : "0",
        login_type: item.login_type,
        language_id:item.language_id
      };

      data.push(temp);
    }

    // group details
    var groupRes = await UserService.getGroupList();
    let temp2 = "";
    if (groupRes.data.status != false) {
      for (var i of groupRes.data.data) {
        var aa = ` ${i.g_name.toUpperCase()}=${i.id} , `;
        temp2 += aa;
      }
    }
    data[0].group_details = temp2;

    // role details
    data[0].role_details = ` supervisor=2 , manager=3 , creator=4 , user=5 `;

    // status details
    data[0].status_details = ` approve=1 , disapprove=0 `;

    //login type
    data[0].login_type_details = ` local , google , ms `;

    // language_id_details
    data[0].language_id_details=` English=1  , Serbian Cyrilic =2 , Serbian Latin=3 `;

    console.log("csv222vvvvvv", temp2);
    setCsvData2([...data]);
    // return data;
  }

  var listCourse = async () => {
    setShowLoader(true);
    var responce = await UserCreateService.getAllUser();
    setCourse([...responce.data.data]);
    console.log("userrrrrrrrrr", responce.data.data);
    customersData(responce.data.data);
    customersData2(responce.data.data);
    getDataPagi(responce.data.data, 0 * PER_PAGE);
  };

  useEffect(() => {
    (async () => {
      try {
        listCourse();
        var groupRes = await UserService.getGroupList();

        if (groupRes.data.status != false) {
          let temp = [];
          for (var i of groupRes.data.data) {
            var aa = { label: i.g_name.toUpperCase(), value: i.id };
            temp.push(aa);
          }

          setGroup([...temp]);
        }

        // var languageRes = await UserService.languages();
        // //console.log(languageRes.data)
        // if (languageRes.data.status != false) {
        //    setLanguage([...languageRes.data.data]);
        // }

        var qualificationRes = await QualificationService.getAll();
        if (qualificationRes.data.status != false) {
          setQualification([...qualificationRes.data.data]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCInputs((values) => ({ ...values, [name]: value }));
    // seterror('');
    console.log(cinputs);
  };

  var setEmail = (email) => {
    console.log(email);
    setFormemai(email);
  };

  function passwordGenerator(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()<>,.?/[]{}-=_+|/0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [generateModal, setGenerateModal] = useState(false);
  var generatePass = async (email) => {
    setShowLoader(true);

    var passwords = passwordGenerator(12);

    const form = new FormData();
    form.append("email", email);
    form.append("password", passwords);

    var responce = await UserService.generatePassword(form);
    if (responce.data.status) {
      setShowLoader(false);
      toast.success("passwored reset & mail send");
    } else {
      setShowLoader(false);
      toast.error(responce.data.msg);
    }
  };

  var modalClose = (e) => {
    e.preventDefault();
    cinputs.password1 = "";
    cinputs.password2 = "";
    setFormemai("");
    setperror("");
    setpsuccess("");
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    // console.log("ssssssssss")
    if (cinputs.password1) {
      if (cinputs.password2) {
        if (cinputs.password1 === cinputs.password2) {
          const data = new FormData();
          data.append("email", formemai);
          data.append("password1", cinputs.password1);
          data.append("password2", cinputs.password2);

          var responce = await UserService.updatePassword(data);
          if (responce.data.status) {
            setShowLoader(false);
            toast.success(responce.data.msg);
          } else {
            setShowLoader(false);
            toast.error(responce.data.msg);
          }

          cinputs.password1 = "";
          cinputs.password2 = "";
          //setFormemai('');
        } else {
          toast.error("password not match");
        }
      } else {
        toast.error("confirm password are required");
      }
    } else {
      toast.error("password are required");
    }
  };

  const ImageHAndler = (e) => {
    const select = e.target.files[0];
    const name = e.target.name;

    //setimageUpload(select);
    const Allow = ["image/png", "image/jpg", "image/jpeg"];
    if (select && Allow.includes(select.type)) {
      if (name == "image") {
        setImage(select);
      } else if (name == "avatar_image") {
        setAvatar_image(select);
      }
    } else {
      seterror("file type not support, file will be jpg,jpeg or png format ");
    }

    console.log(cinputs);
  };

  const FormSubmit = async (e) => {
    console.log("ssss");
    e.preventDefault();

    var groupArr = [];
    for (var i of selected) {
      groupArr.push(i.value);
    }

    const data = new FormData();
    data.append("firstname", cinputs.firstname);
    data.append("lastname", cinputs.lastname);
    data.append("role", cinputs.role);
    data.append("group_id", groupArr);
    data.append("email", cinputs.email);
    data.append("password1", cinputs.password1);
    data.append("password2", cinputs.password2);
    data.append("status", cinputs.status);
    data.append("qualification_id", cinputs.qualification);
    data.append("date", cinputs.date);
    data.append("user_hr_no", cinputs.hr_no);

    try {
      var response = await UserCreateService.create(data);
      //console.log(response.data.msg)
      if (response.data.status != false) {
        toast.success(response.data.msg);

        cinputs.firstname = "";
        cinputs.lastname = "";
        cinputs.role = "";
        cinputs.group_id = "";
        cinputs.email = "";
        cinputs.password1 = "";
        cinputs.password2 = "";
        cinputs.qualification = "";
        cinputs.hr_no = "";

        // setImage("");
        // setAvatar_image("");
        // setAttachment_file("");

        // console.log(response.data.msg)
      } else {
        seterror(response.data.msg);
      }

      listCourse();
    } catch (err) {
      console.log(err);
    }
  };

  const CreateFrom = () => {
    setCourseList(false);
    setCourseCreate(true);
    setCourseEdit(false);

    cinputs.firstname = "";
    cinputs.lastname = "";
    cinputs.email = "";
    cinputs.password1 = "";
    cinputs.password2 = "";
    cinputs.role = "";
    setSelected([]);
    cinputs.status = "";
    cinputs.qualification = "";
    cinputs.date = "";
    cinputs.hr_no = "";

    setsuccess("");
    seterror("");
  };

  const CreateBack = () => {
    setCourseList(true);
    setCourseCreate(false);
    setCourseEdit(false);

    listCourse();

    cinputs.firstname = "";
    cinputs.lastname = "";
    cinputs.email = "";
    cinputs.password1 = "";
    cinputs.password2 = "";
    cinputs.role = "";
    setSelected([]);
    cinputs.qualification = "";
    cinputs.date = "";
    cinputs.hr_no = "";
    setsuccess("");
    seterror("");
  };

  const EditBack = () => {
    setCourseList(false);
    setCourseCreate(false);
    setCourseEdit(true);

    setsuccess("");
    seterror("");

    // window.reload();
  };

  const FormUpdate = async (e) => {
    e.preventDefault();

    var groupArr = [];
    for (var i of selected) {
      groupArr.push(i.value);
    }

    const data = new FormData();
    data.append("firstname", cinputs.firstname);
    data.append("lastname", cinputs.lastname);
    data.append("role", cinputs.role);
    data.append("group_id", groupArr);
    data.append("qualification_id", cinputs.qualification);
    data.append("language_id", cinputs.language);
    data.append("social_link_1", cinputs.social_link_1);
    data.append("social_link_2", cinputs.social_link_2);
    data.append("details", cinputs.details);
    data.append("status", cinputs.status);
    data.append("date", cinputs.date);
    data.append("user_hr_no", cinputs.hr_no);

    data.append("id", courseId);

    var response = await UserCreateService.updateUser(data);

    if (response.data.status) {
      console.log(response.data);
      listCourse();
      toast.success(response.data.msg);
    }
  };

  const courseEditForm = async (id) => {
    var response = await UserCreateService.getUser(id);
    // console.log(response.data.data[0].course_languages_id)
    EditBack();
    if (response.data.status) {
      setCourseId(id);
      var item = response.data.data[0];
      console.log("apppppppppppp", response.data.data.group_details);

      cinputs.firstname = item.firstname;
      cinputs.lastname = item.lastname;
      cinputs.role = item.role;
      // cinputs.group_id = item.group_id;
      cinputs.qualification = item.qualification_id
        ? item.qualification_id
        : "";
      cinputs.language = item.language_id ? item.language_id : "";
      cinputs.social_link_1 = item.social_link_1 ? item.social_link_1 : "";
      cinputs.social_link_2 = item.social_link_2 ? item.social_link_2 : "";
      cinputs.details = item.details ? item.details : "";
      cinputs.status = item.is_active;
      cinputs.date = item.date;
      cinputs.hr_no = item.user_hr_no;

      var groupRes = await UserService.getGroupList();
      if (groupRes.data.status != false) {
        let temp = [];
        for (var i of groupRes.data.data) {
          var aa = { label: i.g_name.toUpperCase(), value: i.id };
          temp.push(aa);
        }
      }

      var languageRes = await UserService.languages();
      // console.log(languageRes.data)
      if (languageRes.data.status != false) {
        setLanguage([...languageRes.data.data]);
      }

      var qualificationRes = await QualificationService.getAll();
      if (qualificationRes.data.status != false) {
        setQualification([...qualificationRes.data.data]);
      }

      var temp = [];
      for (var item of item.group_details) {
        var aa = { label: item.g_name.toUpperCase(), value: item.group_id };
        temp.push(aa);
      }

      setSelected([...temp]);
    }
  };

  const courseDelete = async (id) => {
    var responce = await UserService.courseDelete(id);
    listCourse();
  };

  const setMsg = async () => {
    setsuccess("");
    seterror("");
  };

  const statusUpdate = async (email, ss) => {
    setShowLoader(true);
    var data = {
      email: email,
      status: !ss,
    };

    console.log(data);

    var responce = await UserCreateService.statusChange(data);

    if (responce.data.status) toast.success("Status change successfull");
    else toast.error("Status no Change");

    console.log(responce.data);

    listCourse();
  };

  const handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearch((values) => ({ ...values, [name]: value }));
    console.log(search);

    // userSearch()
  };

  const userSearch = async () => {
    setShowLoader(true);
    var name = search.name;
    var email = search.email;
    var hr_no = search.hr_no;
    var responce = await UserService.userSearch(name, email, hr_no);
    console.log("eeeeee", responce.data.data);
    setCourse([...responce.data.data]);
    customersData(responce.data.data);
    customersData2(responce.data.data);
    getDataPagi(responce.data.data, 0 * PER_PAGE);
  };

  const userSearchClear = async () => {
    setShowLoader(true);
    var name = "";
    var email = "";
    var hr_no = "";

    search.name = "";
    search.email = "";
    search.hr_no = "";

    var responce = await UserService.userSearch(name, email, hr_no);
    console.log("eeeeee", responce.data.data);
    setCourse([...responce.data.data]);
    customersData(responce.data.data);
    customersData2(responce.data.data);
    getDataPagi(responce.data.data, 0 * PER_PAGE);
  };

  // buk upload
  const csvUpload = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const data = new FormData();
    data.append("user_csv_file", attachment_file);

    var response = await UserService.userCsvUpload(data);

    //console.log("csv file uploadr", response.data)
    if (response.data.status) {
      setShowLoader(false);
      toast.success(response.data.msg);
    } else {
      setShowLoader(false);
      toast.error(response.data.msg);
    }

    document.getElementById("form1").reset();
    document.getElementById("form2").reset();
    setAttachment_file({});
    // cinputs.csvFile({});
    setAttachment_file({});
    listCourse();
  };

  const FileHandler = (e) => {
    const select = e.target.files[0];
    const Allow = [".csv"];
    // console.log(select.type)

    setAttachment_file(select);

    // if (select && Allow.includes(select.type)) {
    //     //console.log(22)
    //     setAttachment_file(select)

    // } else {
    //     seterror("file type not support, file will be csv format ")
    // }

    // console.log(attachment_file)
  };

  return (
    <>
      {/** loader */}
      {showLoader && <Loader />}

      <InnerBanner title="User" name="Create" linkName="Home" link="/" />

      {/** search field */}
      {courseList && (
        <div class="user-list-form course">
          <div class="container">
            <div class="enrollments-form-inner course-inner">
              <form>
                <div class="form-group">
                  <input
                    type="email"
                    onChange={handleSearch}
                    name="email"
                    value={search.email}
                    class="form-control"
                    placeholder="user email"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    onChange={handleSearch}
                    name="name"
                    value={search.name}
                    class="form-control"
                    placeholder="user name"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    onChange={handleSearch}
                    name="hr_no"
                    value={search.hr_no}
                    class="form-control"
                    placeholder="user hr number"
                  />
                </div>

                {/**  <div class="form-group">
                                <select class="form-control">
                                    <option selected>Group name
                                    </option>
                                    <option>Group 1
                                    </option>
                                    <option>Group 2
                                    </option>
                                    <option>Group 3
                                    </option>

                                </select>
                                </div>  **/}

                <div class="form-group">
                  <div class="search">
                    {/**  <input type="text" class="form-control searchTerm" placeholder="Search user " />  **/}
                    <button
                      type="button"
                      onClick={userSearch}
                      class="searchButton"
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>

                <div class="form-group">
                  <div class="search">
                    <button
                      type="button"
                      onClick={userSearchClear}
                      class="searchButton"
                    >
                      <i class="fa fa-times"></i>
                    </button>
                  </div>
                </div>

                {/** <!--
                        <div class="form-group">
                            <button type="submit" class="btn">Submit</button>
                        </div> 
                        -->  */}
              </form>
            </div>
          </div>
        </div>
      )}

      {/** cvs or add new  */}

      <div
        className=" enrollments-sec activites-sec "
      >
        <div className="container">
          {error && (
            <div className="alert alert-danger alert-dismissible">
              <button
                type="button"
                className="close"
                onClick={setMsg}
                data-dismiss="alert"
              >
                &times;
              </button>
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success alert-dismissible">
              <button
                type="button"
                className="close"
                onClick={setMsg}
                data-dismiss="alert"
              >
                &times;
              </button>
              {success}
            </div>
          )}

          <div className="row">
            <div className="col-md-12 col-sm-6 pr-md-0">
              {/** Course List */}
              {courseList && (
                <>
                  <div class="user-list-sec-btnarea">
                    <div className="row">
                      <div className="col-sm-4">
                        <a
                          href={sampleCsv}
                          className="sec-btn"
                          download="sample.csv"
                        >
                          <i class="fa fa-download" aria-hidden="true"></i>{" "}
                          Download Sample CSV
                        </a>
                      </div>

                      <div className="col-md-8">
                        <form 
                        id="form1"
                          encType="multipart/form-data"
                          method="post"
                          onSubmit={csvUpload}
                        >
                          <div className="form-row">
                            <div className="col-md-6">
                              <input
                                type="file"
                                class=" form-control-file sec-btn "
                                name="csvFile"
                                value={cinputs.csvFile}
                                placeholder="Import Sample CSV "
                                accept=".csv"
                                onChange={FileHandler}
                              />
                            </div>
                            <div className="col-md-6">
                              <button type="submit" className="sec-btn">
                                Import Sample CSV
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-4">
                        <CSVLink
                          headers={updateheaders}
                          data={csv_data2}
                          filename="updateUserlist.csv"
                        >
                          <button type="button" className="sec-btn">
                            <i class="fa fa-download" aria-hidden="true"></i>{" "}
                            Download Update CSV
                          </button>
                        </CSVLink>
                      </div>

                      <div className="col-md-8">
                        <form id="form2"
                          encType="multipart/form-data"
                          method="post"
                          onSubmit={csvUpload}
                        >
                          <div className="form-row">
                            <div className="col-md-6">
                              <input
                                type="file"
                                class=" form-control-file sec-btn "
                                name="csvFile"
                                value={cinputs.csvFile}
                                placeholder="Update to CSV "
                                accept=".csv"
                                onChange={FileHandler}
                              />
                            </div>
                            <div className="col-md-6">
                              <button type="submit" className="sec-btn">
                                Import Update CSV
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3">
                        <Link to="/user/add" class="sec-btn">
                          Add New User
                        </Link>
                      </div>

                      <div className="col-md-3">
                        <CSVLink
                          headers={headers}
                          data={csv_data}
                          filename="userlist.csv"
                        >
                          <button type="button" className="sec-btn">
                            Export to CSV
                          </button>
                        </CSVLink>
                      </div>
                    </div>
                  </div>

                  <div className=" enrollments-sec-table activites-table ">
                    <table className="table table-responsive">
                      <thead>
                        <tr>
                          <th width="10.5%">No</th>
                          <th width="20.5%">HR NO</th>
                          <th width="12.5%">LOGIN COUNT</th>
                          <th width="12.5%">LOGIN TYPE</th>
                          <th width="21%">Email</th>
                          <th width="22.5%">Last Sign IN Date</th>
                          <th width="21%">Created Date</th>
                          <th width="21%">Updated Date</th>
                          <th width="26%">User Name</th>
                          <th width="21%">User Type</th>
                          <th width="21%">Course Count</th>
                          <th width="12%">Status</th>
                          <th width="5.5%">Edit</th>
                          <th width="12%">password Change</th>
                          <th width="12%">Reset Password</th>
                          {/** <th width="5.5%">Delete</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {currentPageData.map((item, i) => (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.user_hr_no}</td>
                            <td>{item.login_count}</td>
                            <td>{item.login_type.toUpperCase()}</td>
                            <td>{item.email}</td>
                            <td>
                              {item.last_sign_date
                                ? new Date(
                                    item.last_sign_date
                                  ).toLocaleDateString()
                                : ""}
                            </td>
                            <td>
                              {new Date(item.created_at).toLocaleDateString()}
                            </td>
                            <td>
                              {item.updated_at
                                ? new Date(item.updated_at).toLocaleDateString()
                                : ""}
                            </td>
                            <td>{item.fullname.toUpperCase()}</td>
                            <td>{item.user_type.toUpperCase()}</td>
                            <td>{item.course_count ? item.course_count : 0}</td>
                            <td>
                              {item.is_active == 1 ? (
                                <button
                                  onClick={(e) =>
                                    statusUpdate(item.email, item.is_active)
                                  }
                                  className="btn btn-success"
                                >
                                  Approve
                                </button>
                              ) : (
                                <button
                                  onClick={(e) =>
                                    statusUpdate(item.email, item.is_active)
                                  }
                                  className="btn btn-danger"
                                >
                                  Dis-Approve
                                </button>
                              )}
                            </td>
                            <td>
                              <Link
                                className="btn btn-success"
                                to={"/user/edit"}
                                state={{ user_ID: item.id }}
                              >
                                <i className="fa fa-edit"></i>
                              </Link>
                            </td>
                            {/**   <td><button className="btn btn-danger" onClick={e => courseDelete(item.id)}><i className="fa fa-trash-o"></i></button></td> */}
                            <td>
                              <button
                                type="button"
                                onClick={(e) => setEmail(item.email)}
                                class="btn btn-info btn-lg"
                                data-toggle="modal"
                                data-target="#myModal"
                              >
                                <i class="fa fa-key" aria-hidden="true"></i>
                              </button>
                            </td>

                            <td>
                              <button
                                type="button"
                                onClick={(e) => generatePass(item.email)}
                                class="btn btn-info btn-lg"
                              >
                                <i class="fa fa-repeat" aria-hidden="true"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/** pagination */}
                  <div className="pagination-sec">
                    {course.length > 10 && (
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
                    )}

                    {/**       <nav data-pagination>
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

                  {/** Modal */}
                  <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                      {/** Modal content */}
                      <div class="modal-content">
                        {perror && (
                          <div className="alert alert-danger alert-dismissible m-2">
                            {/**   <button type="button" className="close"  data-dismiss="alert">&times;</button> */}
                            {perror}
                          </div>
                        )}

                        {psuccess && (
                          <div className="alert alert-success alert-dismissible m-2 ">
                            {/**   <button type="button" className="close" onClick={setMsg} data-dismiss="alert">&times;</button> */}
                            {psuccess}
                          </div>
                        )}
                        <form
                          encType="multipart/form-data"
                          method="post"
                          onSubmit={updatePassword}
                        >
                          <div class="modal-header">
                            <h2>Change Password</h2>
                            {/**  <button type="button" class="close" data-dismiss="modal">&times;</button> */}
                          </div>
                          <div class="modal-body">
                            <div className="form-row">
                              <div className="col-12">
                                <div className="form-group">
                                  <label>PASSWORD</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="password1"
                                    value={cinputs.password1}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <label>CONFIRM PASSWORD</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="password2"
                                    value={cinputs.password2}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-danger"
                              data-dismiss="modal"
                              onClick={modalClose}
                            >
                              Close
                            </button>
                            <button type="submit" class="btn btn-success">
                              Change
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
