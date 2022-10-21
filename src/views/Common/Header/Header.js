import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

// languages
import English from "../../ConverLanguages/English";
import SerbianCyrilic from "../../ConverLanguages/SerbianCyrilic";
import SerbianLatin from "../../ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from "../../../routes/routes";
import { auth, gprovider, mprovider, firebase } from "../../Firebase";
import LanguageService from "../../../services/LanguageService";

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

export default function Header() {
  const [ADMIN_URL, setADMIN_URL] = useState(process.env.REACT_APP_ADMIN_URL);

  function deleteCookies() {
    var allCookies = document.cookie.split(";");

    // The "expire" attribute of every cookie is
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
      document.cookie =
        allCookies[i] + "=;expires=" + new Date(0).toUTCString();
  }

  function Logout() {
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
      var responce = await UserService.category();
      setCategorys(responce.data.data);
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
    document.getElementById("myNav").style.width = "0%";
  };

  const [langData, setLangData] = useState([]);
  var GetAllLang = async () => {
    var responce = await LanguageService.getAll();
    if (responce.data.status) {
      setLangData(responce.data.data);
    }
  };

  var GetProfileData = async () => {
    
    var response = await UserService.getProfileData({email:user.email});
    
    if (response.data.status) {
      languageList.set_language(response.data.data.language_id);
    }
  
  };

  var profileUpdateLang=async (data)=>{
    var response = await UserService.updateUserProfile(data);
  }

  const { languageList } = useContext(LangContext);
  const [langObj, setLangObj] = useState({});

  var languageHandler = (e) => {
    var a = e.target.value;
    languageList.set_language(a);
    if(user.token) profileUpdateLang({language_id:a,email:user.email})
  };



  useEffect(() => {
    GetAllLang();
    //alert(user.language_type)
   if (user.token)  GetProfileData();
  

    if (languageList.language_name === "1") {
      setLangObj(English);
    } else if (languageList.language_name === "2") {
      setLangObj(SerbianCyrilic);
    } else if (languageList.language_name === "3") {
      setLangObj(SerbianLatin);
    }

    // console.log(languageList.language_name);
  }, [languageList.language_name]);

  return (
    <>
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
                {user.token && (
                  <div className="hd-src">
                    <form onSubmit={(e) => e.preventDefault()} action="#">
                      <input
                        value={search.search_text}
                        onChange={searchhandler}
                        type="text"
                        name="search_text"
                        placeholder={`${langObj.main_search}`}
                        className="form-control"
                        onKeyDown={(e) => eneterSearch(e)}
                      />
                      <button
                        type="button"
                        onClick={textSearch}
                        className="btn"
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                  </div>
                )}

                <div className="hd-src">
                  <div style={{ marginTop: "2px", marginLeft: "15px" }}>
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
              </div>
              {user.token && (
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
                  <div id="myNav" className="menu-sec">
                    <span className="closebtn" onClick={closeNav}>
                      &times;
                    </span>
                    <ul>
                      {/* {user.token && user.user_role == 2 || user.token && user.user_role == 1 ? <> <li><a target="__blank" href={ADMIN_URL}>Admin</a></li> </> : ''} */}

                      {user.token && (
                        <li>
                          <Link onClick={clerSearchText} to="/about-us">
                            About
                          </Link>
                        </li>
                      )}

                      {user.token && user.user_role == 5 ? (
                        <li>
                          <NavLink onClick={clerSearchText} to={"my-courses"}>
                            {langObj.my_courses}
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {user.token ? (
                        <>
                          {" "}
                          <li>
                            <Link onClick={clerSearchText} to="/profile">
                              {langObj.profile}
                            </Link>
                          </li>{" "}
                        </>
                      ) : (
                        ""
                      )}

                      {/**  <li><a href="#" data-toggle="modal" data-target="#creatorloginform" >Creator</a></li> */}
                      {user.user_role == 2 || user.user_role == 1 ? (
                        <li>
                          <Link onClick={clerSearchText} to="/activites">
                            Activities
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}
                      {user.token ? (
                        <li>
                          <NavLink onClick={clerSearchText} to={"enrollments"}>
                            Enrollments
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {(user.token && user.user_role == 2) ||
                      (user.token && user.user_role == 1) ? (
                        <li>
                          <Link onClick={clerSearchText} to="/user">
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
                          <li>
                            <Link onClick={clerSearchText} to="/group">
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
                        <li>
                          <Link onClick={clerSearchText} to="/course">
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
                          <li>
                            <Link onClick={clerSearchText} to="/category">
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
                          <li>
                            <Link onClick={clerSearchText} to="/qualification">
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
                          <li>
                            <Link onClick={clerSearchText} to="/task">
                              Task
                            </Link>
                          </li>{" "}
                        </>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                  <div className="hd-loging-sign">
                    {!user.token && (
                      <ul>
                        <li>
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
                        <li>
                          <Link to="#" onClick={Logout}>
                            {langObj.logout}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <Login />

      <CreatorLogin />
    </>
  );
}
