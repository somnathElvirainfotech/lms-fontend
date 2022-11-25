import React, { useContext, useEffect, useState } from "react";
import QnsAnsCommentService from "../services/QnsAnsCommentService";
import Loader from "./Loader";
import { AuthContext } from "../index";
import { toast } from "react-toastify";
import Moment from "react-moment";
import ChildQnsAnsComment from "./ChildQnsAnsComment";

function ParentQnsAnsComment(props) {

  // loader
  const [showLoader, setShowLoader] = useState(false);
  const { user } = useContext(AuthContext);
  const { course_id, parent_id, label,reqload } = props;

  var [comments, setComments] = useState([]);
  const [Text, setText] = useState({ comment: "" });
  const [ansId, setAnsId] = useState();
  const [parent, setParent] = useState(false);



  var showReply = async (did, id) => {

    var subAns = document.getElementById(did);


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

  useEffect(() => {

    commentSearch(course_id, parent_id)

  }, [])

  useEffect(() => {

    commentSearch(course_id, parent_id)

  }, [reqload])



  var commentSearch = async (courseID, ID) => {
    setShowLoader(true)
    var responce = await QnsAnsCommentService.search({
      course_id: courseID,
      id: ID,
    });
    // console.log("comments ",responce.data.data);
    var resData = responce.data.data;
    setComments(resData.data);
    setShowLoader(false)
  };

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

  const [c_reqload,setChildReqLoad]=useState(false)
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
      setChildReqLoad(!c_reqload)
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

    commentSearch(course_id, parent_id);
  }



  var showReply = async (did, id) => {

    var subAns = document.getElementById(did);

    var responce = await QnsAnsCommentService.search({ course_id: course_id, id: id })


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


  return <>
    {/** loader */}
    {showLoader && <Loader />}

    {comments &&
      comments.map((item, i) => (
        <div key={`pare${i}`} className="review-box mb-3" style={{ borderBottom: "none" }}>
          <h5>
            {item.user_image ? (
              <img
                src={item.user_image}
                className=" float-left mr-2 "
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
                alt="..."
              ></img>
            ) : (
              <img
                src="/images/user.png"
                className="rounded float-left mr-2 "
                style={{ width: "30px", height: "30px" }}
                alt="..."
              ></img>
            )}
            
            <div className="qnsAns-username">

            <span>{item.user_name.toUpperCase()}</span>
            <span className="text-secondary" style={{ fontSize: "14px" }}>
              {" "}
              <Moment fromNow>{item.created_at}</Moment>
              {" "}
            </span>
            </div>

          </h5>
          <div className="container qnsAns-details "   >
               <p style={{wordBreak: "break-all"}} >{item.comment}</p>
               </div>
          <h6
            className="ml-5 text-primary font-weight-bold "
            style={{ cursor: "pointer" }}
          >
            {" "}
            <span className="p-2"  >{item.total_replies}</span> <span onClick={() => (showReply(`${label}${i + 1}`, item.id))}>REPLIES</span>

            {item.user_id != user.user_id && <span data-toggle="modal" data-backdrop="static"
              data-keyboard="false" className="ml-5"
              data-target={`.addgroupModal3${label}`} title="Reply" style={{ cursor: "pointer" }}
              onClick={() => { setAnsId(item.id) }}
            >REPLY</span>}


          </h6>



          {/** ---------------------------------------------- */}

          <div className="container mt-3 ml-5" id={`${label}${i + 1}`} style={{ display: "none" }}>
            {parent && <ChildQnsAnsComment c_reqload={c_reqload} course_id={course_id} parent_id={item.id} />}
          </div>

          {/** ---------------------------------------------- */}


        </div>
      ))}



    {/**  modal */}
    <div
      className={`modal fade addgroupModal3${label}`}
      id={`addgroupModal`}
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
}

export default ParentQnsAnsComment