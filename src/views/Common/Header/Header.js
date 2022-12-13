import { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Link } from "react-router-dom";

import Login from "../../Login/Login";
import CreatorLogin from "../../CreatorLogin/CreatorLogin";

import { AuthContext } from "../../../index";
import axios from "axios";
import UserService from "../../../services/UserService";

import TokenHelper from "../../../services/TokenHelper";
import {
  setCookie,
  getCookie,
  removeCookie,
} from "../../../middleware/CookieSetup";
import $ from "jquery";

// languages
import English from "../../ConverLanguages/English";
import SerbianCyrilic from "../../ConverLanguages/SerbianCyrilic";
import SerbianLatin from "../../ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from "../../../routes/routes";
import { auth, gprovider, mprovider, firebase } from "../../Firebase";
import LanguageService from "../../../services/LanguageService";
import XapiService from "../../../services/XapiService";
import EnrollmentService from "../../../services/EnrollmentService";
import Loader from "../../Loader";

function openNav() {
   
  document.getElementById("myNav").style.width = "100%";
  document.getElementById("myNav").style.display = "block";
  // $('#myNav').toggle();
  
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementById("myNav").style.display = "none";
}

export default function Header() {
  //const [ADMIN_URL, setADMIN_URL] = useState(process.env.REACT_APP_ADMIN_URL);

  const location = useLocation()
    

  const [showLoader, setShowLoader] = useState(false);

  function deleteCookies() {
    var allCookies = document.cookie.split(";");

    // The "expire" attribute of every cookie is
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
      document.cookie =
        allCookies[i] + "=;expires=" + new Date(0).toUTCString();
  }

  async function Logout() {
    await UserService.LoginStatus({ email: user.email, status: "inactive" });

    firebase
      .auth()
      .signOut()
      .then((e) => {
        console.log("Sign-out successful. ", e);
        TokenHelper.Logout();
        //  deleteCookies()
        removeCookie("user_info");
      })
      .catch((error) => {
        console.log(" An error happened. ", error);
      });
  }

  //console.log(ADMIN_URL)

  // token pass route
  const { user } = useContext(AuthContext);

  //console.log(user.token)

  // settoken(authToken);

  // to store all the category
  const [category, setCategorys] = useState([]);

  //   // to store all the subcategory
  const [subcategory, setSubcategorys] = useState([]);

  const [child, setChild] = useState([]);

  // to store selected category
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    (async () => {
      setShowLoader(true);
      var responce = await UserService.category();
      setCategorys(responce.data.data);
      setShowLoader(false);
    })();
  }, [selectedCategory]);

  // to store selected subcategory
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);

  //   // to store all the course
  const [course, setCourses] = useState([]);

  // // to store selected
  const [selectedCourse, setSelectedCourse] = useState("");

  async function subcategorywisecourse(id) {
    var subcat = { category: "", sub_category: id };

    var responce = await UserService.course(subcat);

    setCourses(responce.data.data);
  }

  async function subcategoryid(id) {
    var responce = await UserService.subcategory(id);

    setSubcategorys(responce.data.data);
  }

  const setChildCtegory = async (id) => {
    var responce = await UserService.subcategory(id);
    console.log(id);
    setChild(responce.data.data);
  };

  //      //   // to store all the course
  //  const [course, setCourses] = useState([]);

  // // // to store selected hospital
  //  const [selectedCourse, setSelectedCourse] = useState('');
  // // useEffect(async() => {

  // // //     await fetch('http://lmsbackend.elvirainfotech.org/api/course')
  // // //        .then(res => res.json())
  // // //       .then(data => {
  // // //         setCourses(data.data);
  // // //       //console.log(data);
  // // //       });
  // //    }, []);

  const navigate = useNavigate();
  const [search, setSearch] = useState({});
  var searchhandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearch((values) => ({ ...values, [name]: value }));
  };

  var textSearch = () => {
    navigate("/courses", { state: { search_text: search.search_text } });
  };

  var eneterSearch = (e) => {
    if (e.key === "Enter") {
      navigate("/courses", { state: { search_text: search.search_text } });
    }
  };

  var clerSearchText = () => {
    search.search_text = "";
    // alert(1)
    // alert(document.getElementsByClassName("mb-hum").style.width)
    // document.getElementById("myNav").style.width = "100%";
    // if(document.getElementById("myNav").style.display=="")
    // document.getElementById("myNav").style.display = "none";
  };

  const [langData, setLangData] = useState([]);
  var GetAllLang = async () => {
    setShowLoader(true);

    var responce = await LanguageService.getAll();
    if (responce.data.status) {
      setLangData(responce.data.data);
    }

    setShowLoader(false);
  };

  var GetProfileData = async () => {
    var response = await UserService.getProfileData({ email: user.email });

    if (response.data.status) {
      languageList.set_language(response.data.data.language_id);
    }
  };

  var profileUpdateLang = async (data) => {
    var response = await UserService.updateUserProfile(data);
  };

  const { languageList, xapi_result } = useContext(LangContext);
  const [langObj, setLangObj] = useState({});

  var languageHandler = (e) => {
    var a = e.target.value;
    languageList.set_language(a);
    if (user.token) profileUpdateLang({ language_id: a, email: user.email });
  };

  useEffect(() => {
    GetAllLang();
    //alert(user.language_type)
    if (user.token) GetProfileData();

    if (languageList.language_name === "1") {
      setLangObj(English);
    } else if (languageList.language_name === "2") {
      setLangObj(SerbianCyrilic);
    } else if (languageList.language_name === "3") {
      setLangObj(SerbianLatin);
    }

    // console.log(languageList.language_name);
  }, [languageList.language_name]);

  var mobileToggle=()=>{
   
      $('#myNav').toggle();
  
  }

  return (
    <>
      {/** loader */}
      {showLoader && <Loader />}

      <header className="header">
        <div className="container-fluid">
          <div className="header-wrap">
            <div className="logo">
              <Link onClick={clerSearchText} to="/courses">
                <img src="/images/logo.png" alt="header image" />
              </Link>
            </div>
            <div className="hd-sec">
              <div className="lt-side">
                <div className="cat-menu">

                {user.user_role==5 && user.token && <>

                  <span className="mobile-toggle" onClick={mobileToggle}>
                <i class="fa fa-bars" aria-hidden="true"></i>
                </span>
                  

                  <div id="myNav" className="menu-sec2">
                  
                  <ul>
                   
                   

                    {user.token && user.user_role == 5 ? (
                      <>
                        {" "}
                        <li key={"list2"}>
                          <Link style={{color:location.pathname=="/courses"?"#023e86":"",}}  onClick={clerSearchText} to="/courses">
                            {langObj.courses}
                          </Link>
                        </li>{" "}
                      </>
                    ) : (
                      ""
                    )}

                    {user.token && user.user_role == 5 ? (
                      <li key={"list3"}>
                        <NavLink style={{color:location.pathname=="/my-courses"?"#023e86":"",}} onClick={clerSearchText} to={"my-courses"}>
                          {langObj.my_courses}
                        </NavLink>
                      </li>
                    ) : (
                      ""
                    )}


                    {user.token && (
                      <li key={"list1"}>
                        <Link style={{color:location.pathname=="/about-us"?"#023e86":"",}}  onClick={clerSearchText} to="/about-us">
                          {langObj.about}
                        </Link>
                      </li>
                    )}
                
                    
                  </ul>
                  
                </div>
                  
                  </>}


                  {/**      <ul className="menu-list" >
                                        <li id="mega-menu-parent" ><a href="">Courses <i className="fa fa-angle-down"></i></a>
                                            <div className="mega-menu">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="mega-menu-fresher">
                                                            <ul className="main-mega-menu-section" onChange={e => setSelectedCategory(e.target.value)}>
                                                                {category.map(categoryi =>
                                                                    <li className="vegies active-mega-menu" key={categoryi.id} >
                                                                        <Link to={`/courses`} state={{ category_id: categoryi.id }} onMouseEnter={e => subcategoryid(categoryi.id)}  >{categoryi.c_name}</Link>
                                                                        <ul className="vegies active-mega-menu" onChange={e => setSelectedSubcategory(e.target.value)}>
                                                                            {subcategory.map(subcategoryi => (
                                                                                <li className="one" key={subcategoryi.id}><Link to={`/courses`} state={{ category_id: subcategoryi.id }} onMouseEnter={e => setChildCtegory(subcategoryi.id)}>{subcategoryi.c_name}</Link>
                                                                                    <ul className="vegies-submenu active-mega-menu">
                                                                                        <li>
                                                                                            <ul className="vegies-one" onChange={e => setChildCtegory(e.target.value)}>
                                                                                                {child.map(sci => (
                                                                                                    <li key={sci.id}><Link to={`/courses`} state={{ category_id: sci.id }} > {sci.c_name}</Link></li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </li>
                                                                                    </ul>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </li>
                                                                )}
                                                            </ul>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>  */}
                </div>

                {user.token && user.user_role != 5 && (
                  <div className="hd-src">
                    <form onSubmit={(e) => e.preventDefault()} action="#">
                      <input
                        value={search.search_text}
                        style={{ fontSize: "14px" }}
                        onChange={searchhandler}
                        type="text"
                        name="search_text"
                        placeholder={`${langObj.main_search}`}
                        className="form-control"
                        onKeyDown={(e) => eneterSearch(e)}
                      />
                      <button
                        style={{ width: "20%" }}
                        type="button"
                        onClick={textSearch}
                        className="btn"
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                  </div>
                )}

                {user.user_role != 5 && (
                <div className="hd-src">
                  <div
                    style={{
                      marginTop: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <select
                      required
                      className="form-control"
                      onChange={languageHandler}
                      id="language_type"
                      name="language_type"
                      value={languageList.language_name}
                    >
                      {langData.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                )}

              </div>


              {user.token && user.user_role != 5 && (
                <div className="rt-side">
                  <div className="mb-hum">
                    <div
                      className="hamburger"
                      id="hamburger-1"
                      onClick={openNav}
                    >
                      <span className="line"></span>
                      <span className="line"></span>
                      <span className="line"></span>
                    </div>
                  </div>

                  {/* ------------------------ admin route ------------------------ */}
                 {user.user_role == 2 && <div id="myNav" className="menu-sec">
                    <span className="closebtn" onClick={closeNav}>
                      &times;
                    </span>
                    <ul>
                      {/* {user.token && user.user_role == 2 || user.token && user.user_role == 1 ? <> <li><a target="__blank" href={ADMIN_URL}>Admin</a></li> </> : ''} */}

                      {user.token ? (
                        <>
                          {" "}
                          <li key={"list2"}>
                            <Link style={{color:location.pathname=="/courses"?"#023e86":"",}}  onClick={clerSearchText} to="/courses">
                              Home
                            </Link>
                          </li>{" "}
                        </>
                      ) : (
                        ""
                      )}

                      {user.token && (
                        <li key={"list1"}>
                          <Link style={{color:location.pathname=="/about-us"?"#023e86":"",}}  onClick={clerSearchText} to="/about-us">
                          {langObj.about}
                          </Link>
                        </li>
                      )}

                      {user.token && user.user_role == 5 ? (
                        <>
                          {" "}
                          <li key={"list2"}>
                            <Link style={{color:location.pathname=="/courses"?"#023e86":"",}}  onClick={clerSearchText} to="/courses">
                              {langObj.courses}
                            </Link>
                          </li>{" "}
                        </>
                      ) : (
                        ""
                      )}

                      {user.token && user.user_role == 5 ? (
                        <li key={"list3"}>
                          <NavLink style={{color:location.pathname=="/my-courses"?"#023e86":"",}} onClick={clerSearchText} to={"my-courses"}>
                            {langObj.my_courses}
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {user.token && user.user_role != 5 ? (
                        <>
                          {" "}
                          <li key={"list4"}>
                            <Link style={{color:location.pathname=="/profile"?"#023e86":"",}} onClick={clerSearchText} to="/profile">
                              {langObj.profile}
                            </Link>
                          </li>{" "}
                        </>
                      ) : (
                        ""
                      )}

                      {/**  <li><a href="#" data-toggle="modal" data-target="#creatorloginform" >Creator</a></li> */}
                      {user.user_role == 2 || user.user_role == 1 ? (
                        <li key={"list5"}>
                          <Link style={{color:location.pathname=="/activites"?"#023e86":"",}} onClick={clerSearchText} to="/activites">
                            Activities
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}
                      {user.token && user.user_role != 5 ? (
                        <li key={"list6"}>
                          <NavLink style={{color:location.pathname=="/enrollments"?"#023e86":"",}} onClick={clerSearchText} to={"enrollments"}>
                            Enrollments
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {(user.token && user.user_role == 2) ||
                      (user.token && user.user_role == 1) ? (
                        <li key={"list7"}>
                          <Link style={{color:location.pathname=="/user"?"#023e86":"",}} onClick={clerSearchText} to="/user">
                            User List
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}

                      {(user.token && user.user_role == 2) ||
                      (user.token && user.user_role == 1) ? (
                        <>
                          {" "}
                          <li key={"list8"}>
                            <Link style={{color:location.pathname=="/group"?"re#023e86d":"",}} onClick={clerSearchText} to="/group">
                              Group
                            </Link>
                          </li>{" "}
                        </>
                      ) : (
                        ""
                      )}

                      {user.user_role == 4 ||
                      user.user_role == 2 ||
                      user.user_role == 1 ? (
                        <li key={"list9"}>
                          <Link style={{color:location.pathname=="/course"?"#023e86":"",}} onClick={clerSearchText} to="/course">
                            {" "}
                            {langObj.courses}{" "}
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}
                      {(user.token && user.user_role == 2) ||
                      (user.token && user.user_role == 1) ? (
                        <>
                          {" "}
                          <li key={"list10"}>
                            <Link style={{color:location.pathname=="/category"?"#023e86":"",}} onClick={clerSearchText} to="/category">
                              Category
                            </Link>
                          </li>{" "}
                        </>
                      ) : (
                        ""
                      )}
                      {/** {user.token && user.user_role == 2 || user.token && user.user_role == 1 ? <> <li><a href="#">Tag</a></li> </> : ''}  */}
                      {(user.token && user.user_role == 2) ||
                      (user.token && user.user_role == 1) ? (
                        <>
                          {/** 
                          <li>
                            <Link onClick={clerSearchText} to="/language">
                              Language
                            </Link>
                          </li> */}
                        </>
                      ) : (
                        ""
                      )}
                      {(user.token && user.user_role == 2) ||
                      (user.token && user.user_role == 1) ? (
                        <>
                          {" "}
                          <li key={"list11"}>
                            <Link style={{color:location.pathname=="/qualification"?"#023e86":"",}}  onClick={clerSearchText} to="/qualification">
                              Qualification
                            </Link>
                          </li>{" "}
                        </>
                      ) : (
                        ""
                      )}
                      {(user.token && user.user_role == 2) ||
                      (user.token && user.user_role == 1) ||
                      (user.token && user.user_role == 4) ? (
                        <>
                          {" "}
                          <li key={"list12"}>
                            <Link style={{color:location.pathname=="/task"?"#023e86":"",}} onClick={clerSearchText} to="/task">
                              Task
                            </Link>
                          </li>{" "}
                        </>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div> }
                  {/* ------------------------ end admin route ------------------------ */}

                  {/* -------------------    creator  ----------------- */}

                  {user.user_role == 4 && <div id="myNav" className="menu-sec">
                  <span className="closebtn" onClick={closeNav}>
                    &times;
                  </span>
                  <ul>

                  {user.token ? (
                    <>
                      {" "}
                      <li key={"list2"}>
                        <Link style={{color:location.pathname=="/courses"?"#023e86":"",}}  onClick={clerSearchText} to="/courses">
                          Home
                        </Link>
                      </li>{" "}
                    </>
                  ) : (
                    ""
                  )}
                   

                    {user.token && (
                      <li key={"list1"}>
                        <Link style={{color:location.pathname=="/about-us"?"#023e86":"",}}  onClick={clerSearchText} to="/about-us">
                        {langObj.about}
                        </Link>
                      </li>
                    )}

                    {user.token && user.user_role == 5 ? (
                      <>
                        {" "}
                        <li key={"list2"}>
                          <Link style={{color:location.pathname=="/courses"?"#023e86":"",}}  onClick={clerSearchText} to="/courses">
                            {langObj.courses}
                          </Link>
                        </li>{" "}
                      </>
                    ) : (
                      ""
                    )}

                    {user.token && user.user_role == 5 ? (
                      <li key={"list3"}>
                        <NavLink style={{color:location.pathname=="/my-courses"?"#023e86":"",}} onClick={clerSearchText} to={"my-courses"}>
                          {langObj.my_courses}
                        </NavLink>
                      </li>
                    ) : (
                      ""
                    )}
                    {user.token && user.user_role == 4 ? (
                      <>
                        {" "}
                        <li key={"list4"}>
                          <Link style={{color:location.pathname=="/profile"?"#023e86":"",}} onClick={clerSearchText} to="/profile">
                            {langObj.profile}
                          </Link>
                        </li>{" "}
                      </>
                    ) : (
                      ""
                    )}

                    

                    {user.token && user.user_role == 4 ? (
                      <li key={"list6"}>
                        <NavLink style={{color:location.pathname=="/enrollments"?"#023e86":"",}} onClick={clerSearchText} to={"enrollments"}>
                          Enrollments
                        </NavLink>
                      </li>
                    ) : (
                      ""
                    )}

                     
 

                    {user.user_role == 4  ? (
                      <li key={"list9"}>
                        <Link style={{color:location.pathname=="/course"?"#023e86":"",}} onClick={clerSearchText} to="/course">
                          {" "}
                          {langObj.courses}{" "}
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}

                     

               
                   

                   
                    { (user.token && user.user_role == 4) ? (
                      <>
                        {" "}
                        <li key={"list12"}>
                          <Link style={{color:location.pathname=="/task"?"#023e86":"",}} onClick={clerSearchText} to="/task">
                            Task
                          </Link>
                        </li>{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </ul>

                </div>
               }

                  {/* ------------------------ end  creator ------------------------ */}

                  <div className="hd-loging-sign">
                    {!user.token && (
                      <ul>
                        <li key={"list13"}>
                          <a
                            data-toggle="modal"
                            data-target="#loginform"
                            href="#"
                          >
                            {langObj.login}
                          </a>
                        </li>
                        {/* <li><a href="/signup">Sign up</a></li> */}
                      </ul>
                    )}
                    {user.token && (
                      <ul>
                        <li key={"list14"}>
                          <Link to="#" onClick={Logout}>
                            {langObj.logout}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              )}


              {user.token && user.user_role==5 && <>

                {/* -------------------  user   ----------------- */}

                <div className="rt-side">
                <div className="row">

                <div className="col-md-6">
                {user.token && user.user_role == 5 && (
                  <div className="hd-src">
                    <form onSubmit={(e) => e.preventDefault()} action="#">
                    <div className="row" >
                    <div className="col-10" >
                      <input
                        value={search.search_text}
                        style={{ fontSize: "14px" }}
                        onChange={searchhandler}
                        type="text"
                        name="search_text"
                        placeholder={`${langObj.main_search}`}
                        className="form-control"
                        onKeyDown={(e) => eneterSearch(e)}
                      />
                      </div>
                      <div className="col-2">
                      <button
                        style={{ marginLeft:"-20px" }}
                        type="button"
                        onClick={textSearch}
                        className="btn"
                      >
                        <i className="fa fa-search"></i>
                      </button>
                      </div>
                      </div>
                    </form>
                  </div>
                )}
                </div>

                <div className="col-md-3">

                {user.token && user.user_role == 5 && (
                <div className="hd-src">
                  <div
                    style={{
                      marginTop: "4px",
                      marginLeft: "0",
                      // marginRight: "15px",
                    }}
                  >
                    <select
                      required
                      className="form-control"
                      onChange={languageHandler}
                      id="language_type"
                      name="language_type"
                      value={languageList.language_name}
                    >
                      {langData.map((item) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                )}
                </div>
                
                  
               

              {/* ------------------------ end user  ------------------------ */}


                <div className="col-md-3">
                  <div className="hd-loging-sign">

                  

                    {!user.token && (
                      <ul>
                        <li key={"list13"}>
                          <a
                            data-toggle="modal"
                            data-target="#loginform"
                            href="#"
                          >
                            {langObj.login}
                          </a>
                        </li>
                        {/* <li><a href="/signup">Sign up</a></li> */}
                      </ul>
                    )}
                    {user.token && (
                      <ul>
                        <li key={"list14"}>
                          <Link to="#" onClick={Logout} style={{
                      marginTop: "4px",
                      marginLeft: "0",
                      // marginRight: "15px",
                    }}>
                            {langObj.logout}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                  
                  </div>
                  </div>

              </>}

               




            </div>
          </div>
        </div>
      </header>

      <Login />

      <CreatorLogin />
    </>
  );
}
