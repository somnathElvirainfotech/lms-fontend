import React, { useEffect, useState, useContext } from "react";
import TokenHelper from "../../services/TokenHelper";
import UserService from "../../services/UserService";
import { AuthContext } from "../../index";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { MultiSelect } from "react-multi-select-component";

import CourseService from "../../services/CourseService";

import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import InnerBanner from "../Common/InnerBanner";
import CreatorService from "../../services/CreatorService";

import ReactPaginate from "react-paginate";
import TextEditor from "../TextEditor";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryService from "../../services/CertificateService";

import $ from "jquery";
// import "jquery-ui-dist/jquery-ui";
// import "jquery-validation";

// loader
import Loader from "../Loader";

function CourseAdd() {
  // loader
  const [showLoader, setShowLoader] = useState(false);

  const [Text, setText] = useState("");
  const [Text2, setText2] = useState("");

  const [selected, setSelected] = useState([]);
  const [course, setCourse] = useState([]);
  const [courseList, setCourseList] = useState(true);
  const [courseCreate, setCourseCreate] = useState(false);
  const [courseEdit, setCourseEdit] = useState(false);

  const [courseType, setCourseType] = useState("");
  const { user } = useContext(AuthContext);
  const [language, setLanguage] = useState([]);
  const [group, setGroup] = useState([]);
  const [category, setCategory] = useState([]);
  const [cinputs, setCInputs] = useState({});

  const [image, setImage] = useState({});
  const [image1, setImage1] = useState("");

  const [avatar_image, setAvatar_image] = useState({});
  const [image2, setImage2] = useState("");

  const [attachment_file, setAttachment_file] = useState({});
  const [dfile, setDfile] = useState("");

  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const [courseId, setCourseId] = useState();
  const [creator, setCreator] = useState([]);

  // react pagination  //////////////////////////
  const PER_PAGE = 10;
  const [currentPageData, setCurrentPageData] = useState([]);
  const pageCount = Math.ceil(course.length / PER_PAGE);

  const navigate = useNavigate();
  var previousPage = () => {
    navigate(-1);
  };

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

  const [certificateStatus, setCertificateStatus] = useState(false);
  const [certificateList, setCertificateList] = useState([]);

  var getallCertificate = async () => {
    var responce = await CategoryService.getAll();
    setCertificateList(responce.data.data);
  };

  useEffect(() => {
    (async () => {
      getallCertificate();

      if (user.user_role == 4) {
        var responce = await UserService.allCourses();
        //console.log(responce.data.data)
        setCourse([...responce.data.data]);
        getDataPagi(responce.data.data, 0 * PER_PAGE);
      } else if (user.user_role == 2 || user.user_role == 1) {
        var responce = await CourseService.getAll();
        //console.log(responce.data.data)
        setCourse([...responce.data.data]);
        getCreatorList();
        getDataPagi(responce.data.data, 0 * PER_PAGE);
      }
    })();
  }, []);

  var listCourse = async () => {
    if (user.user_role == 4) {
      var responce = await UserService.allCourses();
      //console.log(responce.data.data)
      setCourse([...responce.data.data]);
      getDataPagi(responce.data.data, 0 * PER_PAGE);
    } else if (user.user_role == 2 || user.user_role == 1) {
      var responce = await CourseService.getAll();
      console.log(responce.data.data);
      setCourse([...responce.data.data]);
      getDataPagi(responce.data.data, 0 * PER_PAGE);
    }
  };

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
          setCategory([...categoryRes.data.data]);
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
    })();
  }, []);

  var getCreatorList = async () => {
    var responce = await CreatorService.getUserByRoleID();
    setCreator([...responce.data.data]);
  };

  const [sample_type,setSample_type]=useState("");

  const [vedio,setVedio]=useState({});

  const VedioHandler = (e) => {
    const select = e.target.files[0];
    const name = e.target.name;
    console.log(select.type);
    //setimageUpload(select);
    const Allow = ["video/mp4"];
    if (select && Allow.includes(select.type)) {
      setVedio(select);
    } else {
      seterror("file type not support, file will be mp4 format ");
    }

    //console.log(vedio)
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCInputs((values) => ({ ...values, [name]: value }));
    // seterror('');

    if (name == "course_type") {
      if (value == "regular") {
        setCourseType("regular");
      } else if (value == "xapi") {
        setCourseType("xapi");
        setSample_type("")
      } else {
        setCourseType("");
        setSample_type("")
      }
    }

    if(name== "sample_type")
    {
      if(value=="sample_vedio")
      {
        setSample_type("sample_vedio");
        cinputs.sample_link="";
      }
      else if(value == "sample_link")
      {

        setSample_type("sample_link")
        setVedio({})
      }
      else
      setSample_type("")
    }

    console.log(cinputs);
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

  const FileHandler = (e) => {
    const select = e.target.files[0];
    const Allow = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    // console.log(select.type)
    if (select && Allow.includes(select.type)) {
      //console.log(22)
      setAttachment_file(select);
    } else {
      seterror("file type not support, file will be doc,pdf or xls format ");
    }

    console.log(cinputs);
  };

  const FileHandler2 = (e) => {
    const select = e.target.files[0];
    const Allow = ["application/zip"];
    // console.log(select.type)
    if (select && Allow.includes(select.type)) {
      //console.log(22)
      setAttachment_file(select);
    } else {
      seterror("file type not support, file will be zip format ");
    }

    console.log(cinputs);
  };

  function countString(str) {
    let count = 0;

    // looping through the items
    for (var i of str) {
      alert(i);
      // // check if the character is at that position
      // if (str.charAt(i) == letter) {
      count += 1;
      // }
    }
    return count;
  }

  var isEmpty = (obj) => {
    for (var i in obj) {
      return false;
    }
    return true;
  };

  const FormSubmit = async (e) => {
    console.log("ssss");
    e.preventDefault();

    var groupArr = [];
    for (var i of selected) {
      groupArr.push(i.value);
    }

    if (cinputs.certificate_id) {
      if (Text.replace(/<[^>]*>?/gm, "").length > 120) {
        toast.error("Text length bigger than 120 characters ");
      } else {
        setShowLoader(true);

        const data = new FormData();
        data.append("course_name", cinputs.course_name);
        data.append("group_id", groupArr);
        data.append("category_id", cinputs.category_id);
        data.append("lang", cinputs.lang);
        data.append("short_description", Text);
        data.append("long_description", Text2);
        data.append("published_status", cinputs.published_status);
        data.append("course_level", cinputs.course_level);
        data.append("image", image);
        data.append("avatar_image", avatar_image);
        data.append("course_type", cinputs.course_type);
        data.append("certificate_id", cinputs.certificate_id);
        data.append("xapi_file_name", cinputs.xapi_file_name);
        data.append("course_certificate_name", cinputs.course_certificate_name);
        data.append("author_name", cinputs.author_name);
        data.append("author_email", cinputs.author_email);
        
        if (courseType == "regular") {
          data.append("attachment_file", attachment_file);
          // data.append("sample_type",cinputs.sample_type)

          // if(cinputs.sample_type == "sample_vedio")
          // data.append("sample_vedio",isEmpty(vedio) ? "" : vedio)
          // else if(cinputs.sample_type=="sample_link")
          // data.append("sample_link",cinputs.sample_link)

        } else if (courseType == "xapi") {
          data.append("xapi_attachment_file", attachment_file);
        }

        if (user.user_role == 2 || user.user_role == 1) {
          data.append("user_id", cinputs.creator);
        } else {
          data.append("user_id", user.user_id);
        }

        try {
          var response = await UserService.createCourse(data);
          //console.log(response.data.msg)
          if (response.data.status != false) {
            setShowLoader(false);
            toast.success(response.data.msg);

            cinputs.course_name = "";
            setSelected([]);
            cinputs.category_id = "";
            cinputs.lang = "";
            setText("");
            setText2("");
            cinputs.creator = "";
            cinputs.published_status = "";
            cinputs.course_level = "";
            cinputs.course_type = "";
            cinputs.certificate_id = "";
            cinputs.xapi_file_name = "";
            cinputs.course_certificate_name = "";
            cinputs.author_email = "";
            cinputs.author_name = "";
            cinputs.sample_type="";
            cinputs.sample_link="";
            setVedio({})
            setImage("");
            setAvatar_image("");
            setAttachment_file("");

            setCourseType("");

            document.getElementById("myForm").reset();

            // console.log(response.data.msg)
          } else {
            setShowLoader(false);
            toast.error(response.data.msg);
          }

          listCourse();
          getCreatorList();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toast.error("Select certificate template!");
    }
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
        course_name: {
          required: true,
        },
        author_name: {
          required: true,
        },
        author_email: {
          required: true,
          email: true,
        },
        category_id: {
          required: true,
        },
        lang: {
          required: true,
        },
        course_level: {
          required: true,
        },
        published_status: {
          required: true,
        },
        image: {
          required: true,
        },
        avatar_image: {
          required: true,
        },
        course_type: {
          required: true,
        },
        attachment_file: {
          extension: "pdf|xls|xlsx|doc|docx",
        },
        xapi_attachment_file: {
          required: true,
          extension: "zip",
        },
        xapi_file_name: {
          required: true,
        },
        course_certificate_name: {
          required: true,
        },
        creator: {
          required: true,
        },
      },

      messages: {
        course_name: {
          required: "Course Name Required",
        },
        author_name: {
          required: "Author Name Required",
        },
        author_email: {
          required: "Author Email Required",
        },
        category_id: {
          required: "Category Required",
        },
        lang: {
          required: "Language Required",
        },
        course_level: {
          required: "Course Level Required",
        },
        published_status: {
          required: "Published Status Required",
        },
        image: {
          required: "Image Required",
        },
        avatar_image: {
          required: "Avatar Image Required",
        },
        course_type: {
          required: "Course Type Required",
        },
        xapi_attachment_file: {
          required: "Xapi File Required",
        },
        xapi_file_name: {
          required: "Xapi File Name Required",
        },
        course_certificate_name: {
          required: "Course Certificate Name Required",
        },
        creator: {
          required: "Creator Required",
        },
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
              <h1>Course</h1>
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
            <div className="container">
              <span className="row">
              <div className="col-sm-4">
              <button
              type="button"
              className="sec-btn m-2"
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
                    enctype="multipart/form-data"
                    method="post"
                    onSubmit={FormSubmit}
                  >
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>COURSE NAME</label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            name="course_name"
                            id="course_name"
                            value={cinputs.course_name}
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
                          <label>Author Name</label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            name="author_name"
                            id="author_name"
                            value={cinputs.author_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Author Email</label>
                          <input
                            required
                            type="email"
                            className="form-control"
                            name="author_email"
                            id="author_email"
                            value={cinputs.author_email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>CATEGORY</label>
                          <select
                            required
                            className="form-control"
                            id="category_id"
                            onChange={handleChange}
                            name="category_id"
                            value={cinputs.category_id}
                          >
                            <option value="" > -- Select category -- </option>
                            {category.length &&
                              category.map((pitem) => (
                                <>
                                  <option value={pitem.id}>
                                    {pitem.c_name.toUpperCase()}
                                  </option>

                                  {pitem.sub_category.map((subItem) => (
                                    <>
                                      <option value={subItem.id}>
                                        --{subItem.c_name.toUpperCase()}
                                      </option>
                                      {subItem.sub_category.map((child) => (
                                        <>
                                          <option value={child.id}>
                                            ....{child.c_name.toUpperCase()}
                                          </option>
                                        </>
                                      ))}
                                    </>
                                  ))}
                                </>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>LANGUAGE</label>
                          <select
                            required
                            className="form-control"
                            id="lang"
                            onChange={handleChange}
                            name="lang"
                            value={cinputs.lang}
                          >
                            <option value={""} > -- Select language -- </option>
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
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>COURSE LEVEL</label>
                          <select
                            required
                            className="form-control"
                            id="course_level"
                            onChange={handleChange}
                            name="course_level"
                            value={cinputs.course_level}
                          >
                            <option value="">
                              {" "}
                              -- Select course level --{" "}
                            </option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>PUBLISH STATUS</label>
                          <select
                            required
                            className="form-control"
                            id="published_status"
                            onChange={handleChange}
                            name="published_status"
                            value={cinputs.published_status}
                          >
                            <option value="">
                              {" "}
                              -- Select publist status --{" "}
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">In-Active</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>IMAGE</label>
                          <input
                            required
                            type="file"
                            name="image"
                            id="image"
                            className="form-control"
                            value={cinputs.image}
                            onChange={ImageHAndler}
                            accept="image/png, image/jpg, image/jpeg"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>AVATAR IMAGE</label>
                          <input
                            required
                            type="file"
                            name="avatar_image"
                            id="avatar_image"
                            className="form-control"
                            value={cinputs.avatar_image}
                            onChange={ImageHAndler}
                            accept="image/png, image/jpg, image/jpeg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Course Type</label>
                          <select
                            required
                            className="form-control"
                            id="course_type"
                            onChange={handleChange}
                            name="course_type"
                            value={cinputs.course_type}
                          >
                            <option value=""> -- Select Course Type -- </option>
                            <option value="regular">Regular</option>
                            <option value="xapi">Xapi</option>
                          </select>
                        </div>
                      </div>

                      {courseType == "regular" && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>FILE UPLOAD</label>
                            <input
                              type="file"
                              id="attachment_file"
                              name="attachment_file"
                              className="form-control"
                              value={cinputs.attachment_file}
                              onChange={FileHandler}
                              accept="application/pdf, application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            />
                          </div>
                        </div>
                      )}

                      {courseType == "xapi" && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>FILE UPLOAD</label>
                            <input
                              required
                              type="file"
                              name="xapi_attachment_file"
                              id="xapi_attachment_file"
                              className="form-control"
                              value={cinputs.xapi_attachment_file}
                              onChange={FileHandler2}
                              accept="application/zip"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/** sample vedio/ link --------------------------- */}
                 {courseType == "regular1" &&   <div className="form-row mt-3">

                    <div className="col-md-6">
                        <div className="form-group">
                          <label> Sample Vedio/Link </label>
                          <select
                            required
                            className="form-control"
                            id="sample_type"
                            onChange={handleChange}
                            name="sample_type"
                            value={cinputs.sample_type}
                          >
                            <option value=""> -- Select -- </option>
                            <option value="sample_vedio">Vedio</option>
                            <option value="sample_link">Link</option>
                          </select>
                        </div>
                      </div>

                      {sample_type == "sample_vedio" && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Sample Local Vedio</label>
                            <input
                              required
                              type="file"
                              name="sample_vedio"
                              id="sample_vedio"
                              className="form-control"
                              value={cinputs.sample_vedio}
                              onChange={VedioHandler}
                              accept="video/mp4,video/x-m4v,video/*"
                            />
                          </div>
                        </div>
                      )}


                      {sample_type == "sample_link" && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Sample Vedio Link</label>
                            <input
                              required
                              type="text"
                              name="sample_link"
                              id="sample_link"
                              className="form-control"
                              value={cinputs.sample_link}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}


                    </div> }

                    {/** end sample vedio/ link --------------------------- */}

                    <div className="form-row mt-3">
                      {courseType == "xapi" && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Xapi File name</label>
                            <input
                              required
                              type="text"
                              name="xapi_file_name"
                              id="xapi_file_name"
                              className="form-control"
                              value={cinputs.xapi_file_name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}

                      {user.user_role == 2 || user.user_role == 1 ? (
                        <>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Assign Creator</label>
                              <select
                                required
                                className="form-control"
                                id="creator"
                                onChange={handleChange}
                                name="creator"
                                value={cinputs.creator}
                              >
                                <option value=""> -- Select creator -- </option>
                                {creator.length &&
                                  creator.map((item) => (
                                    <option
                                      value={item.id}
                                    >{`${item.firstname.toUpperCase()} ${item.lastname.toUpperCase()} (${
                                      item.email
                                    })`}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                    {/** -------------- certificate ----------------- */}

                    <div className="form-row">
                      {cinputs.certificate_id != 0 && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>COURSE CERTIFICATE NAME</label>
                            <input
                              required
                              type="text"
                              className="form-control"
                              name="course_certificate_name"
                              id="course_certificate_name"
                              value={cinputs.course_certificate_name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-md-6">
                        <div className="form-group">
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#myModal"
                            className="sec-btn mt-4"
                          >
                            Select Certificate
                          </button>
                          {"  "}
                          {cinputs.certificate_id && (
                            <span style={{ color: "green" }}>
                              <i
                                class="fa fa-check fa-lg"
                                aria-hidden="true"
                              ></i>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/** -------------- End certificate ----------------- */}

                    <div className="form-row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>ENTER SHORT DESCRIPTION</label>
                          <TextEditor setText={setText} inialvalue={Text} />
                          <small>120 character only.</small>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>ENTER Long DESCRIPTION</label>
                          <TextEditor setText={setText2} inialvalue={Text2} />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                    <div className="col-sm-4"></div>
                   
                      <div className="col-sm-4 text-center">
                        <div className="form-group ">
                          <button type="submit" className="btn btn-success">
                            CREATE
                          </button>
                        </div>
                      </div>

                      <div className="col-sm-4"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Modal */}
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Select Certificate </h4>
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body text-center">
              <form>
                {/* default */}
                <>
                  <div className="form-check">
                    <div className="form-group">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="certificate_id"
                        id={`certificate_id`}
                        value="0"
                        onChange={handleChange}
                        checked={0 == cinputs.certificate_id}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`certificate_id`}
                      >
                        No Certificate
                      </label>
                    </div>
                  </div>
                </>

                {certificateList.map((item, i) => (
                  <>
                    <div className="form-check">
                      <div className="form-group">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="certificate_id"
                          id={`certificate_id${i + 1}`}
                          value={item.id}
                          onChange={handleChange}
                          checked={item.id == cinputs.certificate_id}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`certificate_id${i + 1}`}
                        >
                          <img
                            src={item.certificate_name}
                            class="img-thumbnail"
                            alt="..."
                            style={{ width: "200px", heigth: "200px" }}
                          ></img>
                        </label>
                      </div>
                    </div>
                  </>
                ))}
              </form>
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseAdd;
