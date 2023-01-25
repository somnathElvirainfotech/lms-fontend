import React, { useEffect, useState } from 'react'
import ActivityService from '../../services/ActivityService';
import CommentRatingService from '../../services/CommentRatingService';
import CourseService from '../../services/CourseService';
import { confirmAlert } from 'react-confirm-alert';
import ReactStars from "react-rating-stars-component";
import ReactPaginate from "react-paginate";
// loader 
import Loader from "../Loader";

export default function ActivitesSec() {


    // loader
    const [showLoader, setShowLoader] = useState(false);

    var payload = {
        fromDate: "",
        toDate: "",
        courseId: "",
        searchType: "course",
        course_detail_Type: "",
        total_comment: ''
    }

    const [data, setData] = useState([]);
    const [subData, setSubData] = useState([]);
    const [searchType, setSearchType] = useState('course');
    const [courseDetailsType, setCourseDetailsType] = useState('');
    const [inputs, setInputs] = useState(payload);
    const [course, setCourse] = useState([]);

    // react pagination  //////////////////////////
    const PER_PAGE = 50;
    const [currentPageData, setCurrentPageData] = useState([]);
    const pageCount = Math.ceil(data.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        getDataPagi(data, (selectedPage * PER_PAGE))
    }


    function getDataPagi(data, offset) {
        var temp = [];
        // console.log("offset", offset);
        data.slice(offset, offset + PER_PAGE).map((item) => {
            temp.push(item);
        })
        setCurrentPageData(temp)
        setShowLoader(false)

    }

    // /////////////////////////////////




    useEffect(() => {
        getActivity();
        getCourseList();
    }, []);

    var getActivity = async () => {
        setShowLoader(true)
        // payload.searchType = "course"
        // // console.log("search type",inputs);
        var responce = await ActivityService.search(inputs);
        setData([...responce.data.data])
        getDataPagi(responce.data.data, (0 * PER_PAGE))
    };

    var getCourseList = async () => {
        var responce = await CourseService.getAll();
        setCourse([...responce.data.data]);
        // console.log("all course", responce.data.data);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        // console.log(inputs)


    }


    async function showChapter() {
        inputs.course_detail_Type = "chapter";
        var responce = await ActivityService.search(inputs);
        setCourseDetailsType("chapter")
        inputs.course_detail_Type = "";

        setSubData([...responce.data.data])

    }

    async function showLesson() {
        inputs.course_detail_Type = "lesson";
        inputs.enroll_users_list = ""
        inputs.total_comment = "";
        var responce = await ActivityService.search(inputs);
        setCourseDetailsType("lesson")
        inputs.course_detail_Type = "";
        inputs.enroll_users_list = ""
        inputs.total_comment = "";

        setSubData([...responce.data.data])

    }


    async function showUserList() {
        inputs.course_detail_Type = "";
        inputs.enroll_users_list = "active";
        inputs.total_comment = "";
        var responce = await ActivityService.search(inputs);
        setCourseDetailsType("enroll_users_list")
        inputs.course_detail_Type = "";
        inputs.enroll_users_list = ""
        inputs.total_comment = "";

        setSubData([...responce.data.data])

    }

    async function showCommentList() {
        setShowLoader(true)
        inputs.course_detail_Type = "";
        inputs.enroll_users_list = "";
        inputs.total_comment = "active";
        var responce = await ActivityService.search(inputs);
        setSearchType("total_comment")
        inputs.course_detail_Type = "";
        inputs.enroll_users_list = ""
        inputs.total_comment = "";


        setData([...responce.data.data])
        getDataPagi(responce.data.data, (0 * PER_PAGE))

    }

    async function back(value) {


        var responce = await ActivityService.search(inputs);
        setData([...responce.data.data])
        getDataPagi(responce.data.data, (0 * PER_PAGE))

        setSearchType(value)
    }


    var formSubmit = async (e) => {
        e.preventDefault();

        setShowLoader(true)
        var responce = await ActivityService.search(inputs);
        setData([...responce.data.data])
        getDataPagi(responce.data.data, (0 * PER_PAGE))
        if (inputs.searchType == "course" && inputs.courseId)
            setSearchType("singleCourse")
        else if (inputs.searchType == "course")
            setSearchType("course")
        else if (inputs.searchType == "enrollment")
            setSearchType("enrollment")

        setShowLoader(false)

    }


    // comment delete-----------------------------------
    async function commentRatingDel(id) {
        var responce = await CommentRatingService.delete(id);
        // showCommentList();
        //// console.log(inputs);

        showCommentList()

    }


    var commentDelete = async (id) => {


        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => commentRatingDel(id)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    // end comment delete-----------------------------------

    // comment edit
    var [input, setInput] = useState({
        rating: 0,
        comment: '',
        id: 0
    });

    // const [defaultRating, setDefaultRating] = useState({
    //     rating: 0,
    //     comment: ''

    // });




    var thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: input.rating,
        color: "grey",
        activeColor: "#ebc934",
        onChange: newValue => {
            // console.log(`Example 3: new value is ${newValue}`);
            input.rating = newValue;
        },

    };

    async function commentEdit(id, rating, comment) {
        // console.log("comment...", rating, comment, id);

        var payload = {
            rating: rating,
            comment: comment,
            id: id
        }
        setInput({ ...payload })

    }

    // const handleChange2 = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInput(values => ({ ...values, [name]: value }))
    //     // console.log(input)
    // }

    var handler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({ ...values, [name]: value }))
        // console.log(input);
    }

    var closeModal = () => {
        var payload = {
            rating: 0,
            comment: '',
            id: 0
        }
        setInput({ ...payload })
        thirdExample.value = 0;
    }




    var ratingCreate = async () => {

        // console.log("ddddddddddddd");


        var data = new FormData();
        data.append("id", input.id)
        data.append("rating_number", input.rating)
        data.append("comment", input.comment)

        var responce = await CommentRatingService.update(data);

        // console.log(responce.data.data)

        // input.comment = '';
        // input.rating = '';
        // thirdExample.value=0;

        closeModal();

        showCommentList()



    }



    return (
        <>

            {/** loader */}
            {showLoader && <Loader />}

            {/** filter section */}
            <div className="course">
                <div className="container">
                    <div className="course-inner">
                        <form onSubmit={formSubmit} method="post">

                            <div className="form-group">
                                <select required className="form-control" name='searchType' value={inputs.searchType} onChange={handleChange}>
                                    <option value=""> --select type-- </option>
                                    <option value="course">COURSE</option>
                                    <option value="enrollment">ENROLLMENT</option>
                                </select>
                            </div>

                            {inputs.searchType == "course" && <div className="form-group">
                                <select className="form-control" name='courseId' value={inputs.courseId} onChange={handleChange}>
                                    <option value="">select course</option>
                                    {course.length && course.map((item) => (item.approved_status == "active" && item.published_status == "active" ? <option value={item.id}>{item.course_name.toUpperCase()}</option> : ''))}
                                </select>
                            </div>}


                            <div className="form-group">
                                <button type="submit" className="btn">Submit</button>
                            </div>
                        </form>

                    </div>


                </div>
            </div>

            {/** table section */}
            <div className="activites-sec">
                <div className="container-fluid">
                    <div className="activites-ttl">
                        <h2>Activities</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,</p>
                    </div>
                    <div className="activites-table">
                        {/** search type course */}
                        {searchType == "course" && <table className="table table-responsive">
                            <thead>
                                <tr>

                                    <th width="10%">Create Date</th>
                                    <th width="10%">Update Date</th>
                                    <th width="20%">Course Name</th>
                                    <th width="10%">Total Chapter</th>
                                    <th width="10%">Total Lesson</th>
                                    <th width="10%">Total Enrollment</th>
                                    <th width="10%">Total Comments</th>
                                    <th width="17%">Questions</th>
                                    <th width="21.5%">Download</th>
                                    <th width="25.5%">Creator</th>
                                </tr>
                            </thead>
                            <tbody>


                                {data && currentPageData.map(item =>
                                    <tr>
                                        <td className="date">{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                                        <td>{item.course_name.toUpperCase()}</td>

                                        <td>{item.total_chapter}</td>
                                        <td>{item.total_lesson}</td>
                                        <td>{item.total_enroll}</td>
                                        <td><img src="/images/comment.png" alt="" /> <span>{item.total_comment}</span></td>
                                        <td><img src="/images/question.png" alt="" /> <span>120 Questions?</span></td>
                                        <td><img src="/images/download.png" alt="" /> <span>10 certificate download</span></td>
                                        <td>{item.creator_name.toUpperCase()} ({item.creator_email})</td>

                                    </tr>
                                )}


                            </tbody>
                        </table>}



                        {/** search type enrollment */}
                        {searchType == "enrollment" && <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th width="10%">Date</th>
                                    <th width="20.5%">HR Number</th>
                                    <th width="20.5%">User Name</th>
                                    <th width="20.5%">Course Name</th>
                                    <th width="10%">Enrollment Status</th>
                                    <th width="20%">Current Chapter</th>
                                    <th width="21.5%">Current Lesson</th>
                                    <th width="10.5%">Course Progress</th>
                                </tr>
                            </thead>
                            <tbody>

                                {data && currentPageData.map(item =>
                                    <tr>
                                        <td className="date" >{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td>{item.user_hr_no}</td>
                                        <td>{item.user_name.toUpperCase()} ({item.email})</td>
                                        <td>{item.course_name.toUpperCase()}</td>
                                        <td>{item.enrollment_status}</td>
                                        <td>{item.current_chapter ? item.chapter_name : ''}</td>
                                        <td>{item.current_lession ? item.lesson_name : ''}</td>
                                        <td>{item.course_progress ? item.course_progress : '0'}%</td>

                                    </tr>

                                )}

                            </tbody>
                        </table>}

                        {/** single course table */}
                        {searchType == "singleCourse" && <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th width="10%">Date</th>
                                    <th width="12.5%">Update Date</th>
                                    <th>Course Name</th>
                                    <th width="12.5%">Course Type</th>
                                    <th>Course Level</th>
                                    <th>Course Category</th>
                                    <th>Course Group</th>
                                    <th width="10%">Total Chapter</th>
                                    <th width="10%">Total Lesson</th>
                                    <th width="10%">Total Enroll</th>
                                    <th width="10%">Total Comment</th>
                                    <th width="25.5%">Creator</th>
                                </tr>
                            </thead>
                            <tbody>

                                {data && currentPageData.map(item =>
                                    <tr>
                                        <td className="date" >{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                                        <td>{item.course_name.toUpperCase()}</td>
                                        <td>{item.course_type.toUpperCase()}</td>
                                        <td>{item.course_level.toUpperCase()}</td>
                                        <td>{item.category_name}</td>
                                        <td>{item.group_name}</td>
                                        <td> <a data-toggle="modal" onClick={showChapter} data-target="#rr" href="#"> <i style={{ color: "red" }} className="fa fa-eye fa-2x" aria-hidden="true"></i> </a><span>{item.total_chapter}</span>

                                        </td>
                                        <td>
                                            <a data-toggle="modal" onClick={showLesson} data-target="#rr" href="#"><i style={{ color: "red" }} className="fa fa-eye fa-2x" aria-hidden="true"></i></a> <span>{item.total_lesson}</span>
                                        </td>
                                        <td>
                                            <a data-toggle="modal" onClick={showUserList} data-target="#rr" href="#"><i style={{ color: "red" }} className="fa fa-eye fa-2x" aria-hidden="true"></i></a> <span>{item.total_enroll}</span>
                                        </td>
                                        <td>
                                            <a onClick={e => { e.preventDefault(); showCommentList() }} href="#"> <img src="images/creator.png" alt="" /></a> <span>{item.total_comment}</span>
                                        </td>
                                        <td>{item.creator_name.toUpperCase()} ({item.creator_email})</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>}

                        {/** total comment */}
                        {searchType == "total_comment" && <div style={{ overflowY: "auto" }}>
                            <button className='sec-btn' style={{width:"20%"}} onClick={e => back('singleCourse')}>Back</button> <h1 className='p-3'>Total Comments </h1>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Update Date</th>
                                        <th scope="col">Course Name</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Rating</th>
                                        <th scope='col' width="20.5%" colSpan="2" >Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data && currentPageData.map((item, i) =>

                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                            <td>{item.updated_at ? new Date(item.updated_at).toLocaleDateString() : ''}</td>
                                            <td>{item.course_name.toUpperCase()}</td>
                                            <td>{item.fullname.toUpperCase()} ({item.user_email})</td>
                                            <td>{item.rating_number ? item.rating_number : 0} stars</td>
                                            <td >
                                                <span data-toggle="modal" data-target="#addgroupModal" data-dismiss="modal" onClick={e => commentEdit(item.id, item.rating_number, item.comment)} className='btn btn-info mr-2'><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                                            </td>
                                            <td>
                                                <span data-dismiss="modal" onClick={e => commentDelete(item.id)} className='btn btn-danger '><i className="fa fa-trash" aria-hidden="true"></i></span>

                                            </td>


                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>}

                    </div>

                    {/** pagination */}
                    <div className="pagination-sec">

                        {data.length > PER_PAGE &&
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
                        }

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

                </div>
            </div>


            {/** model 1 */}
            <div className="modal fade" id="rr" >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content" style={{ padding: "1rem" }}>

                        <div className="modal-header  border-bottom-0">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" >&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">

                            {/** chapter */}
                            {courseDetailsType == "chapter" && <div>
                                <h1 className='p-3'>Chapters Name</h1>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Chapter Name</th>
                                            <th scope="col">Create Date</th>
                                            <th scope="col">Update Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subData && subData.map((item, i) =>

                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{item.chapter_name.toUpperCase()}</td>
                                                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                                <td>{item.updated_at ? new Date(item.updated_at).toLocaleDateString() : ''}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>}


                            {/** lesson */}
                            {courseDetailsType == "lesson" && <div>
                                <h1 className='p-3'>Lessons Name</h1>
                                <ul className="list-group">

                                    {subData && subData.map((item, i) =>
                                        <li key={`li${i}`} className="list-group-item m-2">
                                            <h3>{item.chapter_name.toUpperCase()}</h3>



                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Lesson Name</th>
                                                        <th scope="col">Create Date</th>
                                                        <th scope="col">Update Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.lesson_details && item.lesson_details.map((item, i) =>

                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{item.lesson_name.toUpperCase()}</td>
                                                            <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                                            <td>{item.updated_at ? new Date(item.updated_at).toLocaleDateString() : ''}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>

                                        </li>


                                    )}
                                </ul>
                            </div>}

                            {/** enroll users list */}
                            {courseDetailsType == "enroll_users_list" && <div>
                                <h1 className='p-3'>Enroll User List</h1>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Enroll Date</th>
                                            <th scope="col">Course Name</th>
                                            <th scope="col">User Name</th>
                                            <th scope='col'>Enroll Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subData && subData.map((item, i) =>

                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                                <td>{item.course_name.toUpperCase()}</td>
                                                <td>{item.fullname.toUpperCase()} ({item.user_email})</td>
                                                <td>{item.enrollment_status}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>}

                        </div>
                    </div>
                </div>
            </div>





            {/** rating */}
            <div className="modal fade" id="addgroupModal" tabIndex="-1" role="dialog" aria-labelledby="addgroupModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">

                            <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>


                        </div>
                        <div className="modal-body">
                            <div className="data-table user-table">
                                <div className="table-responsive">

                                    <table className="table table-responsive">

                                        <tbody>
                                            <tr>
                                                <td width="800px">
                                                    <ReactStars {...thirdExample} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table className="table table-responsive">

                                        <tbody>


                                            <tr>
                                                <td width="800px" >
                                                    <textarea onChange={handler} value={input.comment}
                                                        name="comment" required placeholder="comment ..." className="form-control" id="exampleFormControlTextarea1" rows="300">
                                                        {input.comment}
                                                    </textarea>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="edit-btn" data-dismiss="modal" onClick={ratingCreate}>Submit </button>
                            <button onClick={closeModal} type="button" className="delete-btn" data-dismiss="modal" >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
