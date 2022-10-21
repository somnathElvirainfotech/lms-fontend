import React, { useContext, useEffect, useState } from "react";
import QnsAnsCommentService from "../services/QnsAnsCommentService";
import Loader from "./Loader";
import { AuthContext } from "../index";
import { toast } from "react-toastify";
import Moment from "react-moment";
import ParentQnsAnsComment from "./ParentQnsAnsComment"

function QnsAnsComment(props) {
  const { course_id } = props;

  const { user } = useContext(AuthContext);

  // loader
  const [showLoader, setShowLoader] = useState(false);

  var [comments, setComments] = useState([]);
  const [Text, setText] = useState({ comment: "" });
  const [ansId,setAnsId]=useState();
  const [parent,setParent]=useState(false);

  useEffect(() => {
    commentSearch(course_id, "");
  }, []);

  var closeModal = () => {
    setText({ comment: "" });
    setAnsId('');
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
  

    commentSearch(course_id, "");

  };

  var handelSubmit2=async()=>{

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
      setAnsId('')
      document.getElementById("myForm").reset();
      setShowLoader(false);
      toast.success(responce.data.msg);
    } else {
      setText({ comment: "" });
      setAnsId('')
      document.getElementById("myForm").reset();
      setShowLoader(false);
      toast.error(responce.data.msg);
    }

    commentSearch(course_id, "");
  }

  var commentSearch = async (courseID, ID) => {
    var responce = await QnsAnsCommentService.search({
      course_id: courseID,
      id: ID,
    });
    // console.log("comments ",responce.data.data);
    var resData = responce.data.data;
    setComments(resData.data); 

    

  };


  var showReply=async(did,id)=>{

   var subAns= document.getElementById(did);

   var responce=await QnsAnsCommentService.search({course_id:course_id,id:id})
    

   if (subAns.style.display === "none") {
    subAns.style.display = "block";
    setParent(true)
   //subAns.innerHTML=htmlData;
  } else {
    subAns.style.display = "none";
    setParent(false)
   //subAns.innerHTML='';
  }

 


  }

  var viewParent=()=>{
    return <ParentQnsAnsComment />
  }


  return (
    <>
      {/** loader */}
      {showLoader && <Loader />}

      <div className="review-wrap">

        {/** add comment */}
        <div className="tab-btnarea">
          <button
            type="button"
            className="sec-btn comment-add-btn"
            data-toggle="modal"
            data-target="#addgroupModal"
          >
            Add Question & Answer
          </button>
        </div>

        {/** reviews  section */}

        {comments &&
          comments.map((item,i) => (
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
                <span>{item.user_name.toUpperCase()}</span>
                <span className="text-secondary" style={{ fontSize: "14px" }}>
                  {" "}
                  <Moment fromNow>{item.created_at}</Moment>
                  {" "}
                </span>
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
              <p className="ml-5">{item.comment}</p>
              <h6
                className="ml-5 text-primary font-weight-bold "
                style={{ cursor: "pointer" }}
              >
                {" "}
                <span className="p-2" >{item.total_replies}</span> <span onClick={()=>(showReply(`subAns${i+1}`,item.id))}>REPLIES</span>

            {item.user_id != user.user_id &&  <span  data-toggle="modal" className="ml-5"
                data-target="#addgroupModal2"  title="Reply" style={{ cursor: "pointer" }} 
                onClick={()=>{setAnsId(item.id)}}
                >REPLY</span> }


              </h6>

              

               {/** ---------------------------------------------- */}

               <div className="container mt-3 ml-5" id={`subAns${i+1}`} style={{display:"none"}}>
               {parent && <ParentQnsAnsComment course_id={course_id} parent_id={item.id} label={`${i+1}childAns`} />}
               </div>
             
               {/** ---------------------------------------------- */}


            </div>
          ))}
      </div>





      {/**  modal */}
      <div
        className="modal fade"
        id="addgroupModal"
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