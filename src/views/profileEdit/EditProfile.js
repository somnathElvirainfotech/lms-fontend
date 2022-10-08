import React, { useEffect, useState, useContext } from "react";
import TokenHelper from "../../services/TokenHelper";
import UserService from "../../services/UserService";
import { AuthContext } from "../../index";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import InnerBanner from "../Common/InnerBanner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EnrollmentService from "../../services/EnrollmentService";
import XapiService from "../../services/XapiService";

// languages
import English from "../ConverLanguages/English";
import SerbianCyrilic from "../ConverLanguages/SerbianCyrilic";
import SerbianLatin from "../ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from "../../routes/routes";

// loader
import Loader from "../Loader";

export const EditProfile = () => {
  // loader
  const [showLoader, setShowLoader] = useState(false);

  const [users, setUser] = useState({ email: TokenHelper.getEmail() });
  const [inputs, setInputs] = useState({});
  const [cinputs, setCInputs] = useState({});
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");
  const [pass, setPass] = useState({});
  const [socalLink, setSocialLink] = useState({});
  const [image, setImage] = useState(null);
  const [imageUpload, setimageUpload] = useState(null);
  const [qualification, setQualification] = useState([]);
  const [language, setLanguage] = useState([]);
  const [group, setGroup] = useState([]);
  const [category, setCategory] = useState([]);

  const [profile, setProfile] = useState(true);
  const [photo, setPhoto] = useState(false);
  const [security, setSecurity] = useState(false);
  const [course, setCourse] = useState(false);
  const [chapter, setChapter] = useState(false);
  const [lesson, setLesson] = useState(false);
  const [assignment, setAssignment] = useState(false);

  const { user } = useContext(AuthContext);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const [userData, setUserData] = useState(user.username);

  useEffect(() => {
    (async () => {
      try {
        setShowLoader(true);

        // -------------------------------------------------------------------------
        var responcee = await UserService.enrollmentcourse(user.user_id, "");

        console.log("all courses", responcee.data);

        var data = [];
        for (var i of responcee.data.data) {
          if (i.course_details[0].course_type == "xapi") {
            var temp = {
              course_id: i.course_details[0].id,
              enroll_id: i.enroll_id,
              course_name: i.course_details[0].course_name,
            };

            data.push(temp);
          }
        }

        // xapi
        getXapiData(data);
        // -------------------------------------------------------------------------

        var response = await UserService.getProfileData(users);
        var languageRes = await UserService.languages();
        var qualificationRes = await UserService.qualification();
        var groupRes = await UserService.getGroupList();
        var categoryRes = await UserService.getAllCategory();

        // console.log(categoryRes.data.data)

        if (response.data.status != false) {
          console.log(languageRes.data.data);

          setLanguage([...languageRes.data.data]);
          setQualification([...qualificationRes.data.data]);
          setGroup([...groupRes.data.data]);
          setCategory([...categoryRes.data.data]);

          // -------------------------------------------------------------

          setUser(response.data.data);

          const data = {
            firstname: response.data.data.firstname,
            lastname: response.data.data.lastname,
            email: response.data.data.email,
            // date: formatDate(response.data.data.date),
            social_link_1: response.data.data.social_link_1,
            social_link_2: response.data.data.social_link_2,
            details: response.data.data.details,
            language_id: response.data.data.language_id,
            qualification_id: response.data.data.qualification_id,
          };

          // alert(response.data.firstname + " " + response.data.lastname)

          setInputs(data);

          setPass({
            email: response.data.data.email,
            cpassword: "",
            password1: "",
            password2: "",
          });
          setSocialLink({
            email: response.data.data.email,
            social_link_1: response.data.data.social_link_1,
            social_link_2: response.data.data.social_link_2,
          });
        } else {
          console.log(response);
        }
        setShowLoader(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // xapi ----------------
  var getXapiData = async (totalCourse) => {
    // setShowLoader(true)

    var agent = user.email;
    var activity = "";
    var verb = "";

    var data = {
      agent: '{"mbox": "mailto:' + agent + '"}',
      activity: activity,
      verb: "", //`http://adlnet.gov/expapi/verbs/${verb}`
    };

    // ------ xapi course total user enroll
    //var totalCourse = ["practice1", "practice2"];

    var xapiCourse = [];

    // ------------- student all course setup -------------------------------
    for (var y of totalCourse) {
      var aa = {
        course_name: y.course_name,
        user_id: user.user_id,
        xapi_course_id: "",
        course_id: y.course_id,
        enroll_id: y.enroll_id,
        attempted: 0,
        failed: false,
        passed: false,
        total_number: 0,
        score_number: 0,
      };

      xapiCourse.push(aa);
    }

    // console.log(xapiCourse);

    // --------------------------------------------

    var tempArr = [];

    var agent = user.email;
    var activity = "";
    var verb = "";

    var data = {
      agent: '{"mbox": "mailto:' + agent + '"}',
    };
    var responce = await XapiService.getXapiStatements(data);

    // ----- -----------------------------
    for (var item of xapiCourse) {
      var count = 0;

      if (responce.data.statements.length > 0) {
        for (var singleRes of responce.data.statements) {
          console.log(singleRes.object.definition.name);

          if ("definition" in singleRes.object) {
            if ("name" in singleRes.object.definition) {
              if (item.course_name == singleRes.object.definition.name.und) {
                console.log("sss");

                if ("result" in singleRes) {
                  if (
                    "completion" in singleRes.result &&
                    singleRes.result.completion == true
                  ) {
                    if ("success" in singleRes.result) {
                      if (singleRes.result.success) {
                        item.passed = true;
                        item.failed = false;
                        item.total_number = singleRes.result.score.max;
                        item.score_number = singleRes.result.score.raw;
                      } else {
                        if (item.passed == false) {
                          item.failed = true;
                          item.passed = false;
                          item.total_number = singleRes.result.score.max;
                          item.score_number = singleRes.result.score.raw;
                        }
                      }

                      tempArr.push(item);
                    }
                  }
                } else {
                  item.attempted = count + 1;
                }
              }
            }
          }
        }
      }
    }

    console.log("xapi data", xapiCourse);

    if (xapiCourse.length > 0) {
      console.log(xapiCourse);
      // enrollment status updated  ------------------
      var updteEnrollStatus = await EnrollmentService.enrollmentStatusUpdate(
        xapiCourse
      );
      // console.log(updteEnrollStatus.data)
    }

    // setShowLoader(false)
  };

  console.log(category);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // seterror('');
    // console.log(inputs)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(language)
    try {
      setShowLoader(true);
      //console.log(inputs)
      var response = await UserService.updateUserProfile(inputs);
      if (response.data.status != false) {
        toast.success(response.data.msg);
        setUserData(inputs.firstname + " " + inputs.lastname);
      } else {
        toast.error(response.data.msg);
      }
      setShowLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const Passwordhandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPass((values) => ({ ...values, [name]: value }));
    seterror("");
  };

  const PasswordChange = async (event) => {
    event.preventDefault();
    // console.log(pass)
    try {
      setShowLoader(true);
      var response = await UserService.changePassword(pass);
      if (response.data.status != false) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
      setShowLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const ImageHAndler = (e) => {
    const select = e.target.files[0];
    setimageUpload(select);
    console.log(imageUpload);
    const Allow = ["image/png", "image/jpg", "image/jpeg"];
    if (select && Allow.includes(select.type)) {
      let render = new FileReader();
      render.onloadend = () => {
        setImage(render.result);
      };
      render.readAsDataURL(select);
    } else {
      toast.error(
        "file type not support, file will be jpg,jpeg or png format "
      );
    }
  };

  const ImageSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("email", inputs.email);
    data.append("image", imageUpload);
    // console.log(imageUpload)

    try {
      setShowLoader(true);
      var response = await UserService.updateUserProfileImage(data);
      if (response.data.status != false) {
        toast.success(response.data.msg);
        setImage(null)
        document.getElementById("photoForm").reset();
        var response = await UserService.getProfileData(users);
        if (response.data.status != false) {
          // console.log(response.data);

          setUser(response.data.data);
          const data = {
            firstname: response.data.data.firstname,
            lastname: response.data.data.lastname,
            email: response.data.data.email,
            // date: formatDate(response.data.data.date),
            social_link_1: response.data.data.social_link_1,
            social_link_2: response.data.data.social_link_2,
            details: response.data.data.details,
            language_id: response.data.data.language_id,
            qualification_id: response.data.data.qualification_id,
          };

          setInputs(data);

          setPass({
            email: response.data.data.email,
            cpassword: "",
            password1: "",
            password2: "",
          });
          setSocialLink({
            email: response.data.data.email,
            social_link_1: response.data.data.social_link_1,
            social_link_2: response.data.data.social_link_2,
          });
        } else {
          console.log(response);
        }
      } else {
        toast.error(response.data.msg);
      }
      setShowLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const activeProfile = () => {
    setProfile(true);
    setPhoto(false);
    setSecurity(false);
  };

  const activePhoto = () => {
    setPhoto(true);
    setSecurity(false);
    setProfile(false);
  };

  const activeSecrity = () => {
    setSecurity(true);
    setProfile(false);
    setPhoto(false);
  };

  const { languageList } = useContext(LangContext);
  const [langObj, setLangObj] = useState({});

  useEffect(() => {
    if (languageList.language_name === "english") {
      setLangObj(English);
    } else if (languageList.language_name === "СРБ") {
      setLangObj(SerbianCyrilic);
    } else if (languageList.language_name === "SRB") {
      setLangObj(SerbianLatin);
    }
  }, [languageList.language_name]);

  return (
    <>
      {/** loader */}
      {showLoader && <Loader />}

      <div className="inner-banner">
        <img src="/images/inner-banner.png" alt="" />
        <div className="desc">
          <div className="container">
            <div className="text">
              <h1>Pofile</h1>
              <div className="breadcrumb">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li>Profile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-edit-form" style={{ marginBottom: "50px" }}>
        <div className="container">
          

          <div className="row">
            <div className="col-lg-3 col-sm-4 pr-md-0  ">
              <div className="profile-edit-form-left  ">
                <div className="profile-edit-form-img">
                  {users.image ? (
                    <img
                      src={users.image}
                      alt=""
                      width="170px"
                      height="170px"
                    />
                  ) : (
                    <img
                      src="/images/user.png"
                      alt=""
                      width="170px"
                      height="170px"
                    />
                  )}
                </div>
                <h3> </h3>
                {/* <h3>{userData.toUpperCase()} </h3> */}
                {/* <p className="text-white">{user.email}</p> */}

                {profile ? (
                  <a
                    href="#"
                    className="active"
                    onClick={(e) => {
                      e.preventDefault();
                      activeProfile();
                    }}
                  >
                    Profile
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      activeProfile();
                    }}
                  >
                    {langObj.profile2}
                  </a>
                )}
                {photo ? (
                  <a
                    href="#"
                    className="active"
                    onClick={(e) => {
                      e.preventDefault();
                      activePhoto();
                    }}
                  >
                    Photo
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      activePhoto();
                    }}
                  >
                    {langObj.photo}
                  </a>
                )}
                {security ? (
                  <a
                    href="#"
                    className="active"
                    onClick={(e) => {
                      e.preventDefault();
                      activeSecrity();
                    }}
                  >
                    Security
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      activeSecrity();
                    }}
                  >
                    {langObj.security}
                  </a>
                )}

                {/**  <a href="#" onClick={e => e.preventDefault()}>Notification</a> */}
              </div>
            </div>

            <div className="col-lg-9 col-sm-8 pl-md-0 tab-content">
              {profile && (
                <div className="profile-edit-form-right " id="userDetails">
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>{langObj.first_name}</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstname"
                            value={inputs.firstname}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>{langObj.last_name}</label>
                          <input
                            type="text"
                            name="lastname"
                            className="form-control"
                            value={inputs.lastname}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>{langObj.language}</label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            onChange={handleChange}
                            name="language_id"
                            value={inputs.language_id}
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

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                          disabled
                            type="email"
                            name=""
                            className="form-control"
                            value={user.email}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>{langObj.qualification}</label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            onChange={handleChange}
                            name="qualification_id"
                            value={inputs.qualification_id}
                          >
                            <option> -- Select qualification -- </option>
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
                          <label>{langObj.add_linkedin_link}</label>
                          <input
                            type="text"
                            name="social_link_1"
                            className="form-control"
                            value={inputs.social_link_1}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>{langObj.add_msteams_link}</label>
                          <input
                            type="text"
                            name="social_link_2"
                            className="form-control"
                            value={inputs.social_link_2}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/*  <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input type="date" className="form-control" name="date" value={inputs.date}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                 </div> */}

                    <div className="form-row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>{langObj.about_yourself}</label>
                          <textarea
                            onChange={handleChange}
                            value={inputs.details}
                            name="details"
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          />
                          <small>120 character only.</small>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn">
                      SAVE
                    </button>
                  </form>
                </div>
              )}

              {security && (
                <div className="profile-edit-form-right  " id="security">
                  <form method="post" onSubmit={PasswordChange}>
                    <div className="form-row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>{langObj.enter_current_password}</label>
                          <input
                            type="password"
                            name="cpassword"
                            className="form-control"
                            value={inputs.cpassword}
                            onChange={Passwordhandle}
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>{langObj.enter_new_password}</label>
                          <input
                            type="password"
                            name="password1"
                            className="form-control"
                            value={inputs.password1}
                            onChange={Passwordhandle}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="col-md-8">
                        <div className="form-group">
                          <label>{langObj.re_enter_new_password}</label>
                          <input
                            type="password"
                            name="password2"
                            className="form-control"
                            value={inputs.password2}
                            onChange={Passwordhandle}
                          />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn">
                      CHANGE
                    </button>
                  </form>
                </div>
              )}

              {photo && (
                <div className="profile-edit-form-right " id="photo">
                  <form
                    id="photoForm"
                    encType="multipart/form-data"
                    method="post"
                    onSubmit={ImageSubmit}
                  >
                    <div className="form-row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <div
                            className="imagePreview"
                            style={{
                              background: image
                                ? `url("${image}") no-repeat center/cover`
                                : "white",
                            }}
                          >
                            {!image && (
                              <>
                                <p>Add an image</p>
                                <label
                                  htmlFor="image"
                                  className="customFileUpload"
                                >
                                  Choose file
                                </label>
                                <input
                                  id="image"
                                  type="file"
                                  name="image"
                                  className="form-control"
                                  onChange={ImageHAndler}
                                />
                                <span>(jpg,jpeg or png)</span>
                              </>
                            )}
                          </div>
                          {image && (
                            <button
                              className="removeImage mt-2"
                              onClick={() => setImage(null)}
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div
                          className="form-group"
                          style={{ marginTop: "40px" }}
                        ></div>
                        <button type="submit" className="btn">
                          UPLOAD
                        </button>
                      </div>
                      <div className="col-sm-3"></div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
