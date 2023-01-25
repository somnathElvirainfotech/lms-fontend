import React, { useEffect, useState, useContext } from "react";
import TokenHelper from "../../services/TokenHelper";
import UserService from "../../services/UserService";
import { AuthContext } from "../../index";
import ChapterService from "../../services/ChapterService";
import LessonService from "../../services/LessonService";

import ReactPlayer from "react-player/lazy";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import TextEditor from "../TextEditor";

import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import InnerBanner from "../Common/InnerBanner";
import CourseService from "../../services/CourseService";
import validator from "validator";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import "jquery-validation";

// loader
import Loader from "../Loader";

function LessonAdd() {
  // loader
  const [showLoader, setShowLoader] = useState(false);

  const [Text, setText] = useState("");
  const [Inialvalue, setInialvalue] = useState("");

  const [course, setCourse] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [lesson, setLesson] = useState([]);

  const [courseList, setCourseList] = useState(true);
  const [courseCreate, setCourseCreate] = useState(false);
  const [courseEdit, setCourseEdit] = useState(false);

  const { user } = useContext(AuthContext);
  const [language, setLanguage] = useState([]);
  const [group, setGroup] = useState([]);
  const [category, setCategory] = useState([]);
  const [inputs, setInputs] = useState({});

  const [vedio, setVedio] = useState({});
  const [showvedio, setShowvedioo] = useState({});

  const [attachment_file, setAttachment_file] = useState({});
  const [dfile, setDfile] = useState("");

  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const [courseId, setCourseId] = useState();

  const [chkVedio, setChkVedio] = useState("");
  const [linkVedio, setLinkVedio] = useState("");

  // react pagination  //////////////////////////
  const PER_PAGE = 10;
  const [currentPageData, setCurrentPageData] = useState([]);
  const pageCount = Math.ceil(lesson.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    getDataPagi(lesson, selectedPage * PER_PAGE);
  }

  function getDataPagi(data, offset) {
    var temp = [];
    // console.log("offset", offset);
    data.slice(offset, offset + PER_PAGE).map((item) => {
      temp.push(item);
    });
    setCurrentPageData(temp);
    setShowLoader(false);
  }

  // /////////////////////////////////

  var listLesson = async () => {
    setShowLoader(true);
    if (user.user_role == 4) {
      var responce = await LessonService.getAll();
      setLesson([...responce.data.data]);
      getDataPagi(responce.data.data, 0 * PER_PAGE);
    } else if (user.user_role == 1 || user.user_role == 2) {
      var responce = await LessonService.getAllLesson();
      // console.log(responce.data.data);
      setLesson([...responce.data.data]);
      getDataPagi(responce.data.data, 0 * PER_PAGE);
    }
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

  useEffect(() => {
    (async () => {
      try {
        setShowLoader(false);

        if (user.user_role == 4) {
          listLesson();

          var responce = await UserService.allCourses();
          setCourse([...responce.data.data]);

          var languageRes = await UserService.languages();
          var groupRes = await UserService.getGroupList();
          var categoryRes = await UserService.getAllCategory();

          var groupRes = await UserService.getGroupList();
          var categoryRes = await UserService.getAllCategory();

          // // console.log(categoryRes.data.data)

          if (languageRes.data.status != false) {
            setLanguage([...languageRes.data.data]);
          }

          if (groupRes.data.status != false) {
            setGroup([...groupRes.data.data]);
          }

          if (categoryRes.data.status != false) {
            setCategory([...categoryRes.data.data]);
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

          // setInputs(data);
        } else if (user.user_role == 1 || user.user_role == 2) {
          listLesson();

          var responce = await CourseService.getAll();
          setCourse([...responce.data.data]);

          var languageRes = await UserService.languages();
          var groupRes = await UserService.getGroupList();
          var categoryRes = await UserService.getAllCategory();

          var groupRes = await UserService.getGroupList();
          var categoryRes = await UserService.getAllCategory();

          // // console.log(categoryRes.data.data)

          if (languageRes.data.status != false) {
            setLanguage([...languageRes.data.data]);
          }

          if (groupRes.data.status != false) {
            setGroup([...groupRes.data.data]);
          }

          if (categoryRes.data.status != false) {
            setCategory([...categoryRes.data.data]);
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

          // setInputs(data);
        }

        setShowLoader(false);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);

  var getChapter = async (id) => {
    var chapterRes = await ChapterService.chapterShowByCourseid(id);
    setChapter([...chapterRes.data.data]);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // seterror('');
    // // console.log(inputs)

    if (name == "course_id") {
      // // console.log(value)
      getChapter(value);
    }

    if (name == "lesson_vedio_type") {
      if (value == "video") {
        setChkVedio(value);
      } else if (value == "link") {
        setChkVedio(value);
      } else {
        setChkVedio("");
      }
    }

    if (name == "lesson_vedio_link") {
      if (!validator.isURL(value)) {
        seterror("Is Not Valid URL");
      } else {
        seterror("");
      }
    }
  };

  const VedioHandler = (e) => {
    const select = e.target.files[0];
    const name = e.target.name;
    // console.log(select.type);
    //setimageUpload(select);
    const Allow = ["video/mp4"];
    if (select && Allow.includes(select.type)) {
      setVedio(select);
    } else {
      seterror("file type not support, file will be mp4 format ");
    }

    //// console.log(vedio)
  };

  const FileHandler = (e) => {
    const select = e.target.files[0];
    const Allow = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    // // console.log(select.type)
    if (select && Allow.includes(select.type)) {
      //// console.log(22)
      setAttachment_file(select);
    } else {
      seterror("file type not support, file will be doc,pdf or xls format ");
    }

    // console.log(attachment_file);
  };

  var isEmpty = (obj) => {
    for (var i in obj) {
      return false;
    }
    return true;
  };

  const FormSubmit = async (e) => {
    // // console.log("ssss");
    e.preventDefault();

    setShowLoader(true);

    try {
      if (!Number.isInteger(Number(inputs.lesson_no))) {
        toast.error("lesson number must be integer");
      } else {
        const data = new FormData();
        data.append("lesson_name", inputs.lesson_name);
        data.append("course_id", inputs.course_id);
        data.append("chapter_id", inputs.chapter_id);
        data.append("lesson_details", Text);
        data.append("lesson_vedio", isEmpty(vedio) ? "" : vedio);
        data.append(
          "lesson_file",
          isEmpty(attachment_file) ? "" : attachment_file
        );
        data.append("lesson_vedio_type", inputs.lesson_vedio_type);
        data.append("lesson_vedio_link", inputs.lesson_vedio_link);
        data.append("lesson_no", inputs.lesson_no);

        var response = await LessonService.create(data);
        // console.log(response.data.msg);
        if (response.data.status != false) {
          setShowLoader(false);
          toast.success(response.data.msg);

          inputs.lesson_name = "";
          inputs.course_id = "";
          inputs.chapter_id = "";
          setText("");
          setInialvalue("");
          inputs.lesson_no = "";
          setVedio({});
          setAttachment_file({});
          setChapter([]);
          inputs.lesson_vedio_type = "";
          inputs.lesson_vedio_link = "";

          setChkVedio("");
          setLinkVedio("");

          document.getElementById("myForm").reset();
          // console.log(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }

        listLesson();
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const CreateFrom = () => {
    setCourseList(false);
    setCourseCreate(true);
    setCourseEdit(false);

    inputs.lesson_name = "";
    inputs.course_id = "";
    inputs.chapter_id = "";
    setText("");
    inputs.lesson_vedio_type = "";
    inputs.lesson_vedio_link = "";
    inputs.lesson_no = "";
    setVedio({});
    setAttachment_file({});
    setChapter([]);

    // window.reload();
  };

  const CreateBack = () => {
    setCourseList(true);
    setCourseCreate(false);
    setCourseEdit(false);

    listLesson();

    inputs.lesson_name = "";
    inputs.course_id = "";
    inputs.chapter_id = "";
    setText("");
    inputs.lesson_vedio_type = "";
    inputs.lesson_vedio_link = "";
    inputs.lesson_no = "";
    setVedio({});
    setAttachment_file({});
    setChapter([]);
    setsuccess();
    seterror();
    // window.reload();
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
    const data = new FormData();
    data.append("lesson_name", inputs.lesson_name);
    data.append("course_id", inputs.course_id);
    data.append("chapter_id", inputs.chapter_id);
    data.append("lesson_details", Text);
    data.append("lesson_vedio", vedio);
    data.append("lesson_file", attachment_file);
    data.append("lesson_vedio_type", inputs.lesson_vedio_type);
    data.append("lesson_vedio_link", inputs.lesson_vedio_link);
    data.append("id", courseId);
    data.append("lesson_no", inputs.lesson_no);

    var response = await LessonService.update(data);

    if (response.data.status) {
      // console.log(response.data);
      toast.success(response.data.msg);
      listLesson();
    }
  };

  const courseEditForm = async (id) => {
    var response = await LessonService.getOne(id);

    EditBack();
    if (response.data.status) {
      setCourseId(id);
      // // console.log(response.data)
      var item = response.data.data[0];
      inputs.course_id = item.course_id;
      getChapter(item.course_id);
      inputs.chapter_id = item.chapter_id;
      inputs.lesson_name = item.lesson_name;
      setText(item.lesson_details);
      inputs.lesson_vedio_type = item.lesson_vedio_type;
      inputs.lesson_vedio_link = item.lesson_vedio_link;
      inputs.lesson_no = item.lesson_no;
      setChkVedio(item.lesson_vedio_type);
      setVedio("");
      setAttachment_file("");
      setLinkVedio(item.lesson_vedio_link);

      setDfile(item.lesson_file);
      setShowvedioo(item.lesson_vedio);
    }
  };

  const courseDelete = async (id) => {
    var responce = await LessonService.delete(id);

    if (!responce.data.status) {
      seterror(responce.data.msg);
    }
    listLesson();
  };

  const setMsg = async () => {
    setsuccess("");
    seterror("");
  };

  // search
  const [search, setSearch] = useState({});
  const handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearch((values) => ({ ...values, [name]: value }));
    // console.log(search);

    // userSearch()
  };

  const userSearch = async () => {
    var course_name = search.course_name;

    var responce = await LessonService.search(course_name);
    // console.log("eeeeee", responce.data.data);
    setLesson([...responce.data.data]);
    getDataPagi(responce.data.data, 0 * PER_PAGE);
  };

  const userSearchClear = async () => {
    var course_name = "";

    search.course_name = "";

    var responce = await LessonService.search(course_name);
    // console.log("eeeeee", responce.data.data);
    setLesson([...responce.data.data]);
    getDataPagi(responce.data.data, 0 * PER_PAGE);
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
        chapter_id: {
          required: true,
        },
        chapter_no: {
          required: true,
        },
        lesson_name: {
          required: true,
        },
        lesson_no: {
          required: true,
        },
        lesson_vedio_type:{
            required:true
        },
        lesson_vedio:{
            required:true
        },
        lesson_vedio_link:{
            required:true
        }
      },

      messages: {
        course_id: {
          required: "Course Name Required",
        },
        chapter_id: {
          required: "Chapter Name Required",
        },
        chapter_no: {
          required: "Chapter Name Required",
        },
        lesson_name: {
          required: "Lesson Name required",
        },
        lesson_no: {
          required: "Lesson Number required",
        },
        lesson_vedio_type:{
            required:"Vedio Type required"
        },
        lesson_vedio:{
            required:"Vedio Are required"
        },
        lesson_vedio_link:{
            required:"Vedio Linnk required"
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
              <h1>Lesson</h1>
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
            </button></div>
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
                          <label>COURSE</label>
                          <select
                            required
                            className="form-control"
                            id="course_id"
                            onChange={handleChange}
                            name="course_id"
                            value={inputs.course_id}
                          >
                            <option value=""> -- Select course -- </option>
                            {course.length &&
                              course.map((item) =>
                                item.course_type == "regular" ? (
                                  <option value={item.id}>
                                    {item.course_name.toUpperCase()}
                                  </option>
                                ) : (
                                  ""
                                )
                              )}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>CHAPTER</label>
                          <select
                            required
                            className="form-control"
                            id="chapter_id"
                            onChange={handleChange}
                            name="chapter_id"
                            value={inputs.chapter_id}
                          >
                            <option value=""> -- Select chapter -- </option>
                            {chapter.length &&
                              chapter.map((item) => (
                                <option value={item.id}>
                                  {item.chapter_name.toUpperCase()}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>LESSON NAME</label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            name="lesson_name"
                            id="lesson_name"
                            value={inputs.lesson_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>FILE UPLOAD</label>
                          <input
                            type="file"
                            name="lesson_file"
                            id="lesson_file"
                            className="form-control"
                            value={inputs.lesson_file}
                            onChange={FileHandler}
                            accept="application/pdf, application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>LESSON NO</label>
                          <input
                            required
                            type="number"
                            className="form-control"
                            id="lesson_no"
                            name="lesson_no"
                            value={inputs.lesson_no}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Video Type</label>
                          <select
                            required
                            className="form-control"
                            id="lesson_vedio_type"
                            onChange={handleChange}
                            name="lesson_vedio_type"
                            value={inputs.lesson_vedio_type}
                          >
                            <option value=""> -- Select Video Type -- </option>
                            <option value="video">Video</option>
                            <option value="link">Link</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      {chkVedio == "video" && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>VIDEO UPLOAD</label>
                            <input
                              required
                              type="file"
                              name="lesson_vedio"
                              id="lesson_vedio"
                              className="form-control"
                              value={inputs.lesson_vedio}
                              onChange={VedioHandler}
                              accept="video/mp4,video/x-m4v,video/*"
                            />
                          </div>
                        </div>
                      )}

                      {chkVedio == "link" && (
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>VIDEO LINK</label>
                            <input
                              required
                              type="text"
                              name="lesson_vedio_link"
                              id="lesson_vedio_link"
                              className="form-control"
                              value={inputs.lesson_vedio_link}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}
                    </div>

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
    </>
  );
}

export default LessonAdd;
