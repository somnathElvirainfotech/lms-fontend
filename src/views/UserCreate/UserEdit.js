import React, { useEffect, useState, useContext } from "react";
import TokenHelper from '../../services/TokenHelper';
import UserService from '../../services/UserService';
import { AuthContext } from '../../index';
import UserCreateService from "../../services/UserCreateService";
import sampleCsv from "./sample.csv";

import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import QualificationService from "../../services/QualificationService";
import { CSVLink } from "react-csv";
// import { Button } from "react-bootstrap";
import CSVFileValidator from 'csv-file-validator'
import ReactPaginate from "react-paginate";
import { MultiSelect } from "react-multi-select-component";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// loader 
import Loader from "../Loader";

function UserEdit() {
    // loader
    const [showLoader, setShowLoader] = useState(false);
    const [course, setCourse] = useState([]);
    const [courseList, setCourseList] = useState(true)
    const [courseCreate, setCourseCreate] = useState(false)
    const [courseEdit, setCourseEdit] = useState(false)

    const { user } = useContext(AuthContext);
    const [language, setLanguage] = useState([]);
    const [group, setGroup] = useState([]);
    const [category, setCategory] = useState([])
    const [cinputs, setCInputs] = useState({})
    const [qualification, setQualification] = useState([]);

    const [image, setImage] = useState({});
    const [image1, setImage1] = useState('');

    const [avatar_image, setAvatar_image] = useState({});
    const [image2, setImage2] = useState('');


    const [attachment_file, setAttachment_file] = useState({})
    const [dfile, setDfile] = useState('');

    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');

    const [perror, setperror] = useState('');
    const [psuccess, setpsuccess] = useState('');

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
        getDataPagi(course, (selectedPage * PER_PAGE))
    }


    function getDataPagi(data, offset) {
        var temp = [];
        console.log("offset", offset);
        data.slice(offset, offset + PER_PAGE).map((item) => {
            temp.push(item);
        })
        setCurrentPageData(temp)

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
                last_sign_in: item.last_sign_date ? new Date(item.last_sign_date).toLocaleDateString() : '',
                created_at: item.created_at ? new Date(item.created_at).toLocaleDateString() : '',
                updated_at: item.updated_at ? new Date(item.updated_at).toLocaleDateString() : '',
                firstname: item.firstname,
                lastname: item.lastname,
                user_role: item.role,
                user_type: item.user_type,
                social_link_1: item.social_link_1,
                social_link_2: item.social_link_2,
                status: item.is_active ? 'approve' : 'dis-approve'

            };

            data.push(temp)
        }

        console.log("csvvvvvvv", data)
        setCsvData([...data]);
        // return data;
    }





    var listCourse = async () => {
        var responce = await UserCreateService.getAllUser();
        setCourse([...responce.data.data])
        console.log("userrrrrrrrrr", responce.data.data);
        customersData(responce.data.data)
        getDataPagi(responce.data.data, (0 * PER_PAGE))
    }

    var location = useLocation();
    var { user_ID } = location.state;

    useEffect(() => {
        (async () => {
            try {


                courseEditForm(user_ID)

                listCourse();
                var groupRes = await UserService.getGroupList();


                if (groupRes.data.status != false) {
                    let temp = [];
                    for (var i of groupRes.data.data) {
                        var aa = { label: i.g_name.toUpperCase(), value: i.id };
                        temp.push(aa)
                    }

                    setGroup([...temp])

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
        })()
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCInputs(values => ({ ...values, [name]: value }))
        // seterror('');
        console.log(cinputs)
    }





    const EditBack = () => {
        setCourseList(false)
        setCourseCreate(false)
        setCourseEdit(true)

        setsuccess('');
        seterror('');

        // window.reload();
    }


    const FormUpdate = async (e) => {

        e.preventDefault();
        setShowLoader(true)

        var groupArr = [];
        for (var i of selected) {
            groupArr.push(i.value)
        }

        const data = new FormData();
        data.append("firstname", cinputs.firstname)
        data.append("lastname", cinputs.lastname)
        data.append("role", cinputs.role)
        data.append("group_id", groupArr)
        data.append("qualification_id", cinputs.qualification)
        data.append("language_id", cinputs.language)
        data.append("social_link_1", cinputs.social_link_1)
        data.append("social_link_2", cinputs.social_link_2)
        data.append("details", cinputs.details)
        data.append("status", cinputs.status)
        data.append("date", cinputs.date)
        data.append("user_hr_no", cinputs.hr_no);
        data.append("organization_unit", cinputs.organization_unit);
        data.append("login_type", cinputs.login_type);
        data.append("id", courseId);


        var response = await UserCreateService.updateUser(data);

        if (response.data.status) {
            console.log(response.data)
            listCourse();
            setShowLoader(false)
            toast.success(response.data.msg)
        }


    }

    const courseEditForm = async (id) => {
        setShowLoader(true)
        var response = await UserCreateService.getUser(id);
        // console.log(response.data.data[0].course_languages_id)
        EditBack();
        if (response.data.status) {

            setCourseId(id)
            var item = response.data.data[0];
            // console.log("apppppppppppp", response.data.data.group_details)


            cinputs.firstname = item.firstname;
            cinputs.lastname = item.lastname;
            cinputs.role = item.role;
            // cinputs.group_id = item.group_id;
            cinputs.qualification = item.qualification_id ? item.qualification_id : '';
            cinputs.language = item.language_id ? item.language_id : '';
            cinputs.social_link_1 = item.social_link_1 ? item.social_link_1 : '';
            cinputs.social_link_2 = item.social_link_2 ? item.social_link_2 : '';
            cinputs.details = item.details ? item.details : '';
            cinputs.status = item.is_active;
            cinputs.date = item.date;
            cinputs.hr_no = item.user_hr_no;
            cinputs.organization_unit = item.organization_unit;
            cinputs.login_type = item.login_type;




            var groupRes = await UserService.getGroupList();
            if (groupRes.data.status != false) {
                let temp = [];
                for (var i of groupRes.data.data) {
                    var aa = { label: i.g_name.toUpperCase(), value: i.id };
                    temp.push(aa)
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
                var aa = { label: item.g_name.toUpperCase(), value: item.group_id }
                temp.push(aa)
            }

            setSelected([...temp]);

            setShowLoader(false)
        }

    }



    const setMsg = async () => {
        setsuccess('');
        seterror('');
    }



    const navigate = useNavigate();
    var previousPage = () => {
        navigate(-1);
    }


    return <>
        {/** loader */}
        {showLoader && <Loader />}

        <div className=" enrollments-sec activites-sec " style={{ marginBottom: "50px" }} >
            <div className="container">

                {error &&
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="close" onClick={setMsg} data-dismiss="alert">&times;</button>
                        {error}
                    </div>
                }

                {success &&
                    <div className="alert alert-success alert-dismissible">
                        <button type="button" className="close" onClick={setMsg} data-dismiss="alert">&times;</button>
                        {success}
                    </div>
                }

                <div className="row">
                    <div className="col-md-12 col-sm-6 pr-md-0">
                        <div className="container">
                            <h2>User Edit <span><button type="button" className="sec-btn" onClick={previousPage}>Back</button></span></h2>

                            <div className="row" >
                                <div className="col-sm-12 bg-white m-4 p-3">


                                    <form enctype="multipart/form-data" method="post" onSubmit={FormUpdate}>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>FIRST NAME</label>
                                                    <input required type="text" className="form-control" name="firstname" value={cinputs.firstname}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>LAST NAME</label>
                                                    <input required type="text" className="form-control" name="lastname" value={cinputs.lastname}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>


                                        </div>

                                        <div className="form-row">


                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>GROUP
                                                    </label>
                                                    <MultiSelect
                                                        options={group}
                                                        value={selected}
                                                        onChange={setSelected}
                                                        labelledBy="Select"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>USER TYPE</label>
                                                    <select className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="role" value={cinputs.role}>
                                                        <option value="" > -- Select user type -- </option>
                                                        <option value="2">Supervisor</option>
                                                        <option value="3">Manager</option>
                                                        <option value="4">Creator</option>
                                                        <option value="5">User</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="form-row">


                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>LANGUAGE</label>
                                                    <select className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="language" value={cinputs.language}>
                                                        <option value="" > -- Select language -- </option>
                                                        {language.length && language.map((item) => (<option value={item.id}>{item.name.toUpperCase()}</option>))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Qualification</label>
                                                    <select className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="qualification" value={cinputs.qualification}>
                                                        <option value="" > -- Select qualification -- </option>
                                                        {qualification.length && qualification.map((item) => (<option value={item.id}>{item.name.toUpperCase()}</option>))}
                                                    </select>
                                                </div>
                                            </div>



                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>LINKEDIN LINK</label>
                                                    <input type="text" className="form-control" name="social_link_1" value={cinputs.social_link_1}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>MS TEAM LINK</label>
                                                    <input type="text" className="form-control" name="social_link_2" value={cinputs.social_link_2}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>


                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label>STATUS</label>
                                                <select required className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="status" value={cinputs.status}>
                                                    <option value="" > -- Select user status -- </option>
                                                    <option value="1">Approve</option>
                                                    <option value="0">Dis-Approve</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                                <label>DATE</label>
                                                <input required type="date" className="form-control" name="date" value={cinputs.date}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="form-row mt-2">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>HR NUMBER</label>
                                                    <input required type="text" className="form-control" name="hr_no" value={cinputs.hr_no}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Organization Unit</label>
                                                    <input type="text" className="form-control" name="organization_unit" value={cinputs.organization_unit}
                                                        onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row mt-2">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>LOGIN TYPE</label>
                                                    <select required className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="login_type" value={cinputs.login_type}>
                                                        <option value="" > -- Select login type -- </option>
                                                        <option value="local">Local</option>
                                                        <option value="google">Google</option>
                                                        <option value="ms">Microsoft</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row mt-3">


                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>ENTER DESCRIPTION</label>
                                                    <textarea onChange={handleChange} value={cinputs.details}
                                                        name="details" className="form-control" id="exampleFormControlTextarea1" rows="3" />
                                                    <small>120 character only.</small>
                                                </div>
                                            </div>

                                        </div>





                                        <div className="form-row">
                                            <div className="col-md-12 text-center">
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-success">UPDATE</button>
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
}

export default UserEdit