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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryService from "../../services/CertificateService";

// loader
import Loader from "../Loader";

function CourseEdit() {
  // loader
  const [showLoader, setShowLoader] = useState(false);

  const [Text, setText] = useState("");
  const [Text2, setText2] = useState("");
  const location = useLocation();
  const { course_ID } = location.state;

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
          onClick: () => { },
        },
      ],
    });
  };

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
        courseEditForm(course_ID);
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
      }
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
      data.append("attachment_file", attachment_file);
      data.append("id", courseId);
      data.append("certificate_id", cinputs.certificate_id);
      data.append("xapi_file_name", cinputs.xapi_file_name)
      data.append("course_certificate_name", cinputs.course_certificate_name)

      data.append("course_type", cinputs.course_type);

      if (courseType == "regular") {
        data.append("attachment_file", attachment_file);
      } else if (courseType == "xapi") {
        data.append("xapi_attachment_file", attachment_file);
      }

      if (user.user_role == 2 || user.user_role == 1) {
        data.append("user_id", cinputs.creator);
      }

      var response = await UserService.courseUpdate(data);

      if (response.data.status) {
        setShowLoader(false);
        console.log(response.data);
        listCourse();
        getCreatorList();
        toast.success(response.data.msg);
      }
    }
  };

  const courseEditForm = async (id) => {
    setShowLoader(true);
    var response = await UserService.singleCourseGet(id);
    // console.log(response.data.data[0].course_languages_id)
    EditBack();
    if (response.data.status) {
      setShowLoader(false);

      setCourseId(id);
      console.log("courseeeee", response.data);
      var item = response.data.data[0];
      cinputs.course_type = item.course_type;
      cinputs.course_name = item.course_name;
      // cinputs.group_id = item.group_id;
      cinputs.category_id = item.category_id;
      cinputs.lang = item.course_languages_id;
      setText(item.short_description);
      setText2(item.long_description);
      cinputs.published_status = item.published_status;
      cinputs.course_level = item.course_level;
      cinputs.certificate_id = item.certificate_id;
      cinputs.xapi_file_name = item.xapi_file_name != null ? item.xapi_file_name : "";
      cinputs.course_certificate_name = item.course_certificate_name;
      setImage("");
      setAvatar_image("");
      setAttachment_file("");
      setCourseType(item.course_type);

      if (user.user_role == 2 || user.user_role == 1) {
        cinputs.creator = item.user_id;
      }

      //console.log(response.data.data[0]);

      setImage1(item.image);
      setImage2(item.avatar_image);

      //    console.log("ssssssi",item.course_type)

      if (item.course_type == "regular") {
        setDfile(item.attachment_file);
      } else if (item.course_type == "xapi") {
        setDfile(item.xapi_attachment_file);
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
    if (!responce.data.status) {
      seterror(responce.data.msg);
    }
    listCourse();
  };

  const setMsg = async () => {
    setsuccess("");
    seterror("");
  };

  const statusUpdate = async (id, status) => {
    var data = {
      id: id,
      status: status == "active" ? "inactive" : "active",
    };

    console.log(data);

    var responce = CourseService.statusChange(data);

    console.log(responce.data);

    listCourse();
  };

  return (
    <>
      {/** loader */}
      {showLoader && <Loader />}

      <div
        className=" enrollments-sec activites-sec "
        style={{ marginBottom: "50px" }}
      >
        <div className="container">
          {error && (
            <div className="alert alert-danger alert-dismissible">
              <button type="button" className="close" data-dismiss="alert">
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
            <div className="container">
              <h2>
                Course Edit{" "}
                <span>
                  <button
                    type="button"
                    className="sec-btn m-2"
                    onClick={previousPage}
                  >
                    Back
                  </button>
                </span>
              </h2>

              <div className="row">
                <div className="col-sm-12 bg-white m-4 p-3">
                  <form
                    enctype="multipart/form-data"
                    method="post"
                    onSubmit={FormUpdate}
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
                            value={cinputs.course_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
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
                          <label>CATEGORY</label>
                          <select
                            required
                            className="form-control"
                            id="exampleFormControlSelect1"
                            onChange={handleChange}
                            name="category_id"
                            value={cinputs.category_id}
                          >
                            <option> -- Select category -- </option>
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
                            id="exampleFormControlSelect1"
                            onChange={handleChange}
                            name="lang"
                            value={cinputs.lang}
                          >
                            <option> -- Select language -- </option>
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
                            id="exampleFormControlSelect1"
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
                            id="exampleFormControlSelect1"
                            onChange={handleChange}
                            name="published_status"
                            value={cinputs.published_status}
                          >
                            <option> -- Select publist status -- </option>
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
                            type="file"
                            name="image"
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
                            type="file"
                            name="avatar_image"
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
                            id="exampleFormControlSelect1"
                            onChange={handleChange}
                            name="course_type"
                            value={cinputs.course_type}
                          >
                            <option value=""> -- Select language -- </option>
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
                              name="attachment_file"
                              className="form-control"
                              value={cinputs.attachment_file}
                              onChange={FileHandler}
                              accept="application/pdf, application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            />
                            {dfile && courseType == "regular" ? (
                              <a href={dfile} target="__blank">
                                <button
                                  type="button"
                                  width="100px"
                                  className="btn btn-success mt-3"
                                >
                                  <i
                                    className="fa fa-download"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Download
                                </button>
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      )}

                      {courseType == "xapi" && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>FILE UPLOAD</label>
                            <input
                              type="file"
                              name="xapi_attachment_file"
                              className="form-control"
                              value={cinputs.xapi_attachment_file}
                              onChange={FileHandler2}
                              accept="application/zip"
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-md-3">
                        <div className="form-group">
                          <label>IMAGE</label>
                          <br></br>
                          <img
                            src={image1}
                            alt=""
                            width="160rem"
                            height="160rem"
                            className="p-2"
                            style={{ borderStyle: "dashed" }}
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label>AVATAR IMAGE</label>
                          <br></br>
                          <img
                            src={image2}
                            alt=""
                            width="160rem"
                            height="160rem"
                            className="p-2"
                            style={{ borderStyle: "dashed" }}
                          />
                        </div>
                      </div>

                      {courseType == "xapi" && (
                        <div className="col-md-6">
                          <label>XAPI</label> <br />
                          <iframe
                            src={dfile}
                            width="400"
                            height="200"
                            className="p-2"
                            style={{ borderStyle: "dashed" }}
                          ></iframe>
                        </div>
                      )}
                    </div>



                    <div className="form-row mt-3">
                      {courseType == "xapi" && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Xapi File name</label>
                            <input
                              required
                              type="text"
                              name="xapi_file_name"
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
                                id="exampleFormControlSelect1"
                                onChange={handleChange}
                                name="creator"
                                value={cinputs.creator}
                              >
                                <option value=""> -- Select creator -- </option>
                                {creator.length &&
                                  creator.map((item) => (
                                    <option
                                      value={item.id}
                                    >{`${item.firstname.toUpperCase()} ${item.lastname.toUpperCase()} (${item.email
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

                    <div className="col-md-6">
                        <div className="form-group">
                          <label>COURSE CERTIFICATE NAME</label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            name="course_certificate_name"
                            value={cinputs.course_certificate_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

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
                      <div className="col-md-12 text-center">
                        <div className="form-group">
                          <button type="submit" className="btn btn-success">
                            UPDATE
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

export default CourseEdit;
