import React, { useContext, useEffect, useState } from "react";
import QnsAnsCommentService from "../services/QnsAnsCommentService";
import Loader from "./Loader";
import { AuthContext } from "../index";
import { toast } from "react-toastify";
import Moment from "react-moment";
import ParentQnsAnsComment from "./ParentQnsAnsComment";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

// languages
import English from "./ConverLanguages/English";
import SerbianCyrilic from "./ConverLanguages/SerbianCyrilic";
import SerbianLatin from "./ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from "../routes/routes";


function QnsAnsComment(props) {
  const { course_id } = props;

  const { user } = useContext(AuthContext);

  // loader
  const [showLoader, setShowLoader] = useState(false);

  var [comments, setComments] = useState([]);
  const [Text, setText] = useState({ comment: "" });
  const [ansId, setAnsId] = useState();
  const [parent, setParent] = useState(false);

  useEffect(() => {
    commentSearch(course_id, "",5);
  }, []);

  var closeModal = () => {
    setText({ comment: "" });
    setAnsId("");
    document.getElementById("myForm").reset();
  };

  const handleText = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setText((values) => ({ ...values, [name]: value }));
    // seterror('');
    console.log(Text);
  };

  var handelSubmit = async () => {
    setShowLoader(true);

    var data = {
      course_id: course_id,
      user_id: user.user_id,
      comment: Text.comment,
      parent_id: 0,
    };

    var responce = await QnsAnsCommentService.create(data);

    if (responce.data.status) {
      setText({ comment: "" });
      document.getElementById("myForm").reset();
      setShowLoader(false);
      toast.success(responce.data.msg);
    } else {
      setText({ comment: "" });
      document.getElementById("myForm").reset();
      setShowLoader(false);
      toast.error(responce.data.msg);
    }

    commentSearch(course_id, "",5);
  };

  const [reqload,setReqLoad]=useState(false);
  var handelSubmit2 = async () => {
    setShowLoader(true);

    var data = {
      course_id: course_id,
      user_id: user.user_id,
      comment: Text.comment,
      parent_id: ansId,
    };

    var responce = await QnsAnsCommentService.create(data);

    if (responce.data.status) {
      setText({ comment: "" });
      setAnsId("");
      document.getElementById("myForm").reset();
      setShowLoader(false);
      toast.success(responce.data.msg);
      // alert(1)
      setReqLoad(!reqload)
    } else {
      setText({ comment: "" });
      setAnsId("");
      document.getElementById("myForm").reset();
      setShowLoader(false);
      toast.error(responce.data.msg);
    }

    commentSearch(course_id, "",5);
  };


  
  var commentSearch = async (courseID, ID,limit) => {
    var responce = await QnsAnsCommentService.search({
      course_id: courseID,
      id: ID,
      limit:limit
    });
    // console.log("comments ",responce.data.data);
    var resData = responce.data.data;
    setComments(resData.data);
    
  };

  var showReply = async (did, id) => {
    var subAns = document.getElementById(did);

    var responce = await QnsAnsCommentService.search({
      course_id: course_id,
      id: id,
    });

    if (subAns.style.display === "none") {
      subAns.style.display = "block";
      setParent(true);
      //subAns.innerHTML=htmlData;
    } else {
      subAns.style.display = "none";
      setParent(false);
      //subAns.innerHTML='';
    }
  };

  var viewParent = () => {
    return <ParentQnsAnsComment />;
  };

  var [limit,setLimit]=useState(false)
  
  var shoeQA=async()=>{
    
   await commentSearch(course_id, "","");
    
   $(".revie-wrap").removeClass("review-wrap-scroll");
    $(`#review-wrap-rating2`).addClass("review-wrap-scroll");
     
   setLimit(true)
   
  }

  var closeQA=async()=>{
    await commentSearch(course_id, "",5);
    $(".review-wrap").removeClass("review-wrap-scroll");
    setLimit(false)
   }

   const { languageList } = useContext(LangContext);
  const [langObj, setLangObj] = useState({});

  useEffect(() => {
    if (languageList.language_name === "1") {
      setLangObj(English);
    } else if (languageList.language_name === "2") {
      setLangObj(SerbianCyrilic);
    } else if (languageList.language_name === "3") {
      setLangObj(SerbianLatin);
    }
  }, [languageList.language_name]);

  return (
    <>
    
      {/** loader */}
      {showLoader && <Loader />}

      <div className="review-wrap">
        {/** reviews  section */}
        <div id="review-wrap-rating2" className="">
          {comments &&
            comments.map((item, i) => (
              <div className="review-box mb-3" style={{ borderBottom: "none" }}>
                <h5>
                  {item.user_image ? (
                    <img
                      src={item.user_image}
                      class=" float-left mr-2 "
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      alt="..."
                    ></img>
                  ) : (
                    <img
                      src="/images/user.png"
                      class="rounded float-left mr-2 "
                      style={{ width: "50px", height: "50px" }}
                      alt="..."
                    ></img>
                  )}
                  <div className="qnsAns-username">
                  <span style={{fontSize:"13px"}} >{item.user_name && item.user_name.toUpperCase()}</span>
                  <span className="text-secondary" style={{ fontSize: "14px" }}>
                    {" "}
                    <Moment fromNow>{item.created_at}</Moment>{" "}
                  </span>
                  </div>
                  {/* Split dropright button */}
                  {/**  <div className="btn-group dropright ml-2">
                
                  <button
                   
                    data-placement="top"
                    title="options"
                    type="button"
                    className="btn dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Toggle Dropright</span>
                  </button>

                  
                   <div className="dropdown-menu">
                  <p className="dropdown-item mt-2" style={{cursor: "pointer"}}><i class="fa fa-pencil" aria-hidden="true"></i> Edit</p>
                    <div class="dropdown-divider"></div>
                    <p className="dropdown-item" style={{cursor: "pointer"}}><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</p>
                  </div> 

                </div> */}
                </h5>
               <div className="container qnsAns-details"  >
               <p style={{wordBreak: "break-all",fontSize:"12px"}} >{item.comment}</p>
               </div>
                <h6
                  className="ml-5 text-primary font-weight-bold "
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <span className="p-2"  >{item.total_replies}</span>{" "}
                  <span onClick={() => showReply(`subAns${i + 1}`, item.id)}>
                    {langObj.replies}  {item.total_replies!= 0 && <i class="fa fa-caret-down" style={{color: "#007bff" }} aria-hidden="true"></i> } 
                  </span>
                  {item.user_id != user.user_id && (
                    <span
                      data-toggle="modal"
                      data-backdrop="static"
                      data-keyboard="false"
                      className="ml-5"
                      data-target="#addgroupModal2"
                      title="Reply"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setAnsId(item.id);
                      }}
                    >
                    {langObj.reply}
                    </span>
                  )}
                </h6>

                {/** ---------------------------------------------- */}

                <div
                  className="container mt-3 ml-5"
                  id={`subAns${i + 1}`}
                  style={{ display: "none" }}
                >
                  {parent && (
                    <ParentQnsAnsComment
                      course_id={course_id}
                      parent_id={item.id}
                      label={`${i + 1}childAns`}
                      reqload={reqload}
                    />
                  )}
                </div>

                {/** ---------------------------------------------- */}
              </div>
            ))}
        </div>

        {/** add comment */}
        <div className="tab-btnarea">
          <button
            type="button"
            className="sec-btn comment-add-btn"
            data-toggle="modal"
            data-target="#addgroupModal"
            data-backdrop="static"
            data-keyboard="false"
          >
           {langObj.add_qns_qns}
          </button>

           


          {!limit &&  <button onClick={shoeQA} type="button" className="sec-btn sec-btn-border" >{langObj.view_all}</button> } 

          {limit &&   <button onClick={closeQA} type="button" className="sec-btn sec-btn-border" >Close</button>}


        </div>
      </div>

      {/**  modal */}
      <div
        className="modal fade"
        id="addgroupModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="addgroupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={closeModal}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="data-table user-table">
                <div className="table-responsive">
                  <form id="myForm">
                    <textarea
                      onChange={handleText}
                      value={Text.comment}
                      name="comment"
                      required
                      placeholder="Question & Answer "
                      className="form-control"
                      id="comment"
                      rows="10"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handelSubmit}
                type="button"
                className="edit-btn"
                data-dismiss="modal"
              >
                Submit{" "}
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="delete-btn"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/**  modal 2 */}
      <div
        className="modal fade"
        id="addgroupModal2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addgroupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={closeModal}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="data-table user-table">
                <div className="table-responsive">
                  <form id="myForm">
                    <textarea
                      onChange={handleText}
                      value={Text.comment}
                      name="comment"
                      required
                      placeholder="Question & Answer "
                      className="form-control"
                      id="comment"
                      rows="10"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handelSubmit2}
                type="button"
                className="edit-btn"
                data-dismiss="modal"
              >
                Submit{" "}
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="delete-btn"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default QnsAnsComment;
