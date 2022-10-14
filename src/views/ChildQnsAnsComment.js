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
  const { course_id,parent_id } = props;
  var [comments, setComments] = useState([]);

  useEffect(()=>{  

    commentSearch(course_id,parent_id)

   },[])

   var commentSearch = async (courseID, ID) => {
    var responce = await QnsAnsCommentService.search({
      course_id: courseID,
      id: ID,
    });
    // console.log("comments ",responce.data.data);
    var resData = responce.data.data;
    setComments(resData.data);
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
          <span>{item.user_name.toUpperCase()}</span>
          <span className="text-secondary" style={{ fontSize: "14px" }}>
            {" "}
            <Moment fromNow>{item.created_at}</Moment>
            {" "}
          </span>
           
        </h5>
        <p className="ml-5">{item.comment}</p>

      </div>

    ))}

  </>
}

export default ChildQnsAnsComment