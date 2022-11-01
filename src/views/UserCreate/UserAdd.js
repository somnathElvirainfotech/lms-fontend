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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import "jquery-validation";

// loader
import Loader from "../Loader";

function UserAdd() {
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

  const [selected, setSelected] = useState([]);

  // csv header
  const headers = [
    { label: "HR NO", key: "hr_no" },
    { label: "Firstname", key: "firstname" },
    { label: "Lastname", key: "lastname" },
    { label: "EMAIL", key: "email" },
    { label: "Role Id", key: "user_role" },
    { label: "Role Name", key: "user_type" },
    { label: "Group Name", key: "group_name" },
    { label: "LOGIN COUNT", key: "login_count" },
    { label: "COURSE COUNT", key: "course_count" },
    { label: "Last Sign IN Date", key: "last_sign_in" },
    { label: "Created Date", key: "created_at" },
    { label: "Updated Date", key: "updated_at" },
    { label: "LINKEDIN LINK", key: "social_link_1" },
    { label: "MS TEAM LINK", key: "social_link_2" },
    { label: "Status", key: "status" },
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
  }

  // /////////////////////////////////

  function customersData(custs) {
    var data = [];
    for (var item of custs) {
      var temp = {
        hr_no: item.user_hr_no,
        group_name: item.group_name,
        login_count: item.login_count,
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

  var listCourse = async () => {
    var responce = await UserCreateService.getAllUser();
    setCourse([...responce.data.data]);
    console.log("userrrrrrrrrr", responce.data.data);
    customersData(responce.data.data);
    getDataPagi(responce.data.data, 0 * PER_PAGE);
  };

  useEffect(() => {
    (async () => {
      try {
        setShowLoader(true);

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

        var languageRes = await UserService.languages();
        // console.log(languageRes.data)
        if (languageRes.data.status != false) {
          setLanguage([...languageRes.data.data]);
        }

        var qualificationRes = await QualificationService.getAll();
        if (qualificationRes.data.status != false) {
          setQualification([...qualificationRes.data.data]);
        }

        setShowLoader(false);
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
            setpsuccess(responce.data.msg);
          } else {
            setperror(responce.data.msg);
          }

          cinputs.password1 = "";
          cinputs.password2 = "";
          //setFormemai('');
        } else {
          setperror("password not match");
        }
      } else {
        setperror("confirm password are required");
      }
    } else {
      setperror("password are required");
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
    setShowLoader(true);
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
    data.append("organization_unit", cinputs.organization_unit);
    data.append("login_type", cinputs.login_type);
    data.append("language_id", cinputs.language);

    try {
      var response = await UserCreateService.create(data);
      //console.log(response.data.msg)
      if (response.data.status != false) {
        setShowLoader(false);
        toast.success(response.data.msg);

        setCInputs({
          firstname: "",
          lastname: "",
          role: "",
          group_id: "",
          email: "",
          password1: "",
          password2: "",
          qualification: "",
          hr_no: "",
          organization_unit: "",
          login_type: "",
          language: "",
        });

        // setImage("");
        // setAvatar_image("");
        // setAttachment_file("");

        // console.log(response.data.msg)
        document.getElementById("myForm").reset();
      } else {
        setShowLoader(false);
        toast.error(response.data.msg);
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
    var data = {
      email: email,
      status: !ss,
    };

    console.log(data);

    var responce = UserCreateService.statusChange(data);

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
    var name = search.name;
    var email = search.email;
    var hr_no = search.hr_no;
    var responce = await UserService.userSearch(name, email, hr_no);
    console.log("eeeeee", responce.data.data);
    setCourse([...responce.data.data]);
    customersData(responce.data.data);
    getDataPagi(responce.data.data, 0 * PER_PAGE);
  };

  const userSearchClear = async () => {
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

    getDataPagi(responce.data.data, 0 * PER_PAGE);
  };

  // buk upload
  const csvUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user_csv_file", attachment_file);

    var response = await UserService.userCsvUpload(data);

    //console.log("csv file uploadr", response.data)
    if (response.data.status) {
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
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
        firstname: {
          required: true,
        },
        lastname: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        qualification: {
          required: true,
        },
        role: {
          required: true,
        },
        password1: {
          required: true,
          minlength: 8,
        },
        password2: {
          required: true,
          minlength: 8,
          equalTo: "#password1"
        },
        status:{
            required:true,
        },
        hr_no:{
            required:true,
        },
        login_type:{
            required:true
        },
        language:{
            required:true
        }
      },

      messages: {
        firstname: {
          required: "Firstname Required",
        },
        lastname: {
          required: "Lastname Required",
        },
        email: {
          required: "Email Required",
        },
        qualification: {
          required: "Qualification Required",
        },
        role: {
          required: "User Type Required",
        },
        password1: {
          required: "Password Required",
        },
        password2: {
          required: "Confirm Password Required",
          equalTo:"Password and Confirm password not match"
        },
        status:{
            required:"Status Required",
        },
        hr_no:{
            required:"HR Number Required"
        },
        login_type:{
            required:"Login Type Required"
        },
        language:{
            required:"Language Required"
        }
      },
    });
  }, []);

  return (
    <>
      {/** loader */}
      {showLoader && <Loader />}

      <div className="inner-banner">
        <img src="/images/inner-banner.png" alt="" />
        <div className="desc">
          <div className="container">
            <div className="text">
              <h1>User</h1>
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
                <button
                  type="button"
                  className="sec-btn"
                  onClick={previousPage}
                >
                  Back
                </button>

                <div className="row">
                  <div className="col-sm-12 bg-white m-4 p-3">
                    <form
                      id="myForm"
                      enctype="multipart/form-data"
                      method="post"
                      onSubmit={FormSubmit}
                    >
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>FIRST NAME</label>
                            <input
                              required
                              type="text"
                              className="form-control"
                              id="firstname"
                              name="firstname"
                              value={cinputs.firstname}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>LAST NAME</label>
                            <input
                              required
                              type="text"
                              className="form-control"
                              id="lastname"
                              name="lastname"
                              value={cinputs.lastname}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>EMAIL</label>
                            <input
                              required
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={cinputs.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>GROUP</label>
                            <MultiSelect
                              required
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
                            <label>USER TYPE</label>
                            <select
                              required
                              className="form-control"
                              id="role"
                              onChange={handleChange}
                              name="role"
                              value={cinputs.role}
                            >
                              <option value=""> -- Select user type -- </option>
                              <option value="2">Supervisor</option>
                            {/**  <option value="3">Manager</option>  */} 
                              <option value="4">Creator</option>
                              <option value="5">User</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Qualification</label>
                            <select
                              required
                              className="form-control"
                              id="qualification"
                              onChange={handleChange}
                              name="qualification"
                              value={cinputs.qualification}
                            >
                              <option value="">
                                {" "}
                                -- Select qualification --{" "}
                              </option>
                              {qualification.length &&
                                qualification.map((item) => (
                                  <option value={item.id}>
                                    {item.name.toUpperCase()}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>PASSWORD</label>
                            <input
                              required
                              type="text"
                              className="form-control"
                              id="password1"
                              name="password1"
                              value={cinputs.password1}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>CONFIRM PASSWORD</label>
                            <input
                              required
                              type="text"
                              className="form-control"
                              id="password2"
                              name="password2"
                              value={cinputs.password2}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-6">
                          <label>STATUS</label>
                          <select
                            required
                            className="form-control"
                            id="status"
                            onChange={handleChange}
                            name="status"
                            value={cinputs.status}
                          >
                            <option value=""> -- Select user status -- </option>
                            <option value="1">Approve</option>
                            <option value="0">Dis-Approve</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label>DATE</label>
                          <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            value={cinputs.date}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-row mt-2">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>HR NUMBER</label>
                            <input
                              required
                              type="text"
                              className="form-control"
                              id="hr_no"
                              name="hr_no"
                              value={cinputs.hr_no}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Organization Unit</label>
                            <input
                              type="text"
                              className="form-control"
                              id="organization_unit"
                              name="organization_unit"
                              value={cinputs.organization_unit}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row mt-2">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>LOGIN TYPE</label>
                            <select
                              required
                              className="form-control"
                              id="login_type"
                              onChange={handleChange}
                              name="login_type"
                              value={cinputs.login_type}
                            >
                              <option value="">
                                {" "}
                                -- Select login type --{" "}
                              </option>
                              <option value="local">Local</option>
                              <option value="google">Google</option>
                              <option value="ms">Microsoft</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label>LANGUAGE</label>
                            <select
                              required
                              className="form-control"
                              id="language"
                              onChange={handleChange}
                              name="language"
                              value={cinputs.language}
                            >
                              <option value=""> -- Select language -- </option>
                              {language.length &&
                                language.map((item) => (
                                  <option value={item.id}>
                                    {item.name.toUpperCase()}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="col-md-12 text-center mt-3">
                          <div className="form-group">
                            <button type="submit" className="btn btn-success">
                              CREATE
                            </button>
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
  );
}

export default UserAdd;
