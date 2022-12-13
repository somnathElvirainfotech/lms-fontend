import React, { useContext, useEffect, useState } from "react";
import QnsAnsCommentService from "../services/QnsAnsCommentService";
import Loader from "./Loader";
import { AuthContext } from "../index";
import { toast } from "react-toastify";
import Moment from "react-moment";

function ChildQnsAnsComment(props) {

    // loader
  const [showLoader, setShowLoader] = useState(false);
  const { user } = useContext(AuthContext);
  const { course_id,parent_id ,c_reqload} = props;
  var [comments, setComments] = useState([]);

  useEffect(()=>{  

    commentSearch(course_id,parent_id)

   },[])

   useEffect(()=>{

    commentSearch(course_id,parent_id)

  },[c_reqload])

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

  
    

  return <>
     {/** loader */}
   {showLoader && <Loader />}


   {comments &&
    comments.map((item,i) => (
      <div key={`chi${i}`} className="review-box mb-3" style={{ borderBottom: "none" }}>
        <h5>
          {item.user_image ? (
            <img
              src={item.user_image}
              className=" float-left mr-2 "
              style={{
                width: "30px",
                height: "30px",
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

          <span style={{fontSize:"13px"}}>{item.user_name.toUpperCase()}</span>
          <span className="text-secondary" style={{ fontSize: "14px" }}>
            {" "}
            <Moment fromNow>{item.created_at}</Moment>
            {" "}
          </span>

          </div>
          
           
        </h5>
        <div className="container qnsAns-details "  >
               <p style={{wordBreak: "break-all",fontSize:"12px"}} >{item.comment}</p>
               </div>

      </div>

    ))}

  </>
}

export default ChildQnsAnsComment