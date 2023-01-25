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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// loader
import Loader from "../Loader";

function LessonEdit() {
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
    // // console.log("offset", offset);
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
      // // console.log(responce.data.data);
      setLesson([...responce.data.data]);
      getDataPagi(responce.data.data, 0 * PER_PAGE);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setShowLoader(false);

        courseEditForm(lesson_ID);

        if (user.user_role == 4) {
          listLesson();

          var responce = await UserService.allCourses();
          setCourse([...responce.data.data]);

          var languageRes = await UserService.languages();
          var groupRes = await UserService.getGroupList();
          var categoryRes = await UserService.getAllCategory();

          var groupRes = await UserService.getGroupList();
          var categoryRes = await UserService.getAllCategory();

          // // // console.log(categoryRes.data.data)

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

          // // // console.log(categoryRes.data.data)

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
        // // console.log(error);
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
    // // // console.log(inputs)

    if (name == "course_id") {
      // // // console.log(value)
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
        toast.error("Is Not Valid URL");
      }
    }
  };

  const VedioHandler = (e) => {
    const select = e.target.files[0];
    const name = e.target.name;
    // // console.log(select.type)
    //setimageUpload(select);
    const Allow = ["video/mp4"];
    if (select && Allow.includes(select.type)) {
      setVedio(select);
    } else {
      toast.error("file type not support, file will be mp4 format ");
    }

    //// // console.log(vedio)
  };

  const FileHandler = (e) => {
    const select = e.target.files[0];
    const Allow = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    // // // console.log(select.type)
    if (select && Allow.includes(select.type)) {
      //// // console.log(22)
      setAttachment_file(select);
    } else {
      toast.error("file type not support, file will be doc,pdf or xls format ");
    }

    // // console.log(attachment_file)
  };

  const FormUpdate = async (e) => {
    e.preventDefault();
    setShowLoader(true);
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
      setShowLoader(false);
      // // console.log(response.data)
      toast.success(response.data.msg);
      listLesson();
    }
  };

  const location = useLocation();
  var { lesson_ID } = location.state;

  const courseEditForm = async (id) => {
    setShowLoader(true);
    var response = await LessonService.getOne(id);

    if (response.data.status) {
      setShowLoader(false);
      setCourseId(id);
      // // // console.log(response.data)
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

  const navigate = useNavigate();
  var previousPage = () => {
    navigate(-1);
  };

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
                  <li>Edit</li>
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
                    enctype="multipart/form-data"
                    method="post"
                    onSubmit={FormUpdate}
                  >
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>COURSE</label>
                          <select
                            required
                            className="form-control"
                            id="exampleFormControlSelect1"
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
                            id="exampleFormControlSelect1"
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
                            className="form-control"
                            value={inputs.lesson_file}
                            onChange={FileHandler}
                            accept="application/pdf, application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          />
                          {dfile && (
                            <a href={dfile} target="__blank">
                              <button
                                type="button"
                                width="100px"
                                className="btn btn-success mt-3"
                              >
                                <i
                                  class="fa fa-download"
                                  aria-hidden="true"
                                ></i>{" "}
                                Download
                              </button>
                            </a>
                          )}
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
                              type="file"
                              name="lesson_vedio"
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
                              className="form-control"
                              value={inputs.lesson_vedio_link}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-md-6">
                        <div className="form-group">
                          {showvedio && chkVedio == "video" && (
                            <div>
                              <ReactPlayer
                                url={showvedio}
                                width="420px"
                                height="240px"
                                playing={false}
                                controls={true}
                              />
                            </div>
                          )}

                          {chkVedio == "link" && linkVedio && (
                            <ReactPlayer
                              url={linkVedio}
                              width="420px"
                              height="240px"
                              playing={false}
                              controls={true}
                            />
                          )}
                        </div>
                      </div>
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
                            UPDATE
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

export default LessonEdit;
