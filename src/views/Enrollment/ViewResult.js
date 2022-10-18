import React, { useEffect, useState,useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InnerBanner from "../Common/InnerBanner";
import Loader from "../Loader";
import XapiService from "../../services/XapiService";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";

function ViewResult() {
  const [showLoader, setShowLoader] = useState(false);
  var [data, setData] = useState([]);

  var location = useLocation();
  var {  course_type, enrollment_id } = location.state;


  const navigate = useNavigate();
  var previousPage = () => {
    navigate(-1);
  };

  var matchingQns = (data, data2) => {
    var arr = data.split("[,]");
    var arr2 = data2.split("[,]");

    for (var i of arr2) {
      if (!arr.includes(i)) return false;
    }

    return true;
  };

  useEffect(() => {
    (async () => {
      setShowLoader(true);
      var responce = await XapiService.readQuestionAndAns({
        course_type: course_type,
        enrollment_id:enrollment_id
      });

      console.log("result lms ", responce.data);

      if (responce.data.status) {
       setData(responce.data.data);
        setShowLoader(false);
      } else {
        setShowLoader(false);
        toast.error("Result not found");
      }
    })();
  }, []);

  var stringSplit = (payload, answer, answer2, ans_type) => {
    var data = "";

    if (ans_type == "choices") {
      var arr = payload.split("[,]");

      for (var i of answer) {
        if (arr.includes(i.option_id)) {
          data += i.option_name + ",";
        }
      }
    } else if (ans_type == "matching") {
      var arr = payload.split("[,]");

      for (var i of arr) {
        var temp = "";

        var sub = i.split("[.]");

        for (var a of answer) {
          if (sub.includes(a.option_id)) {
            temp += a.option_name + " ";
          }
        }

        for (var a of answer2) {
          if (sub.includes(a.option_id)) {
            temp += a.option_name + " ";
          }
        }

        data += temp + ",";
      }
    }

    data = data.slice(0, -1);
    return data;
  };


  // printcomment
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {showLoader && <Loader />}

      <InnerBanner
        title="View Result"
        name="view result"
        linkName="Home"
        link="/"
      />

      {/** list */}

      <div className="user-group-sec sec-bg">
        <div className="container">
          <button
            type="button"
            className="sec-btn add-grp-btn"
            onClick={previousPage}
          >
            Back
          </button>

          {/* <Link
            to="/print-result"
            className="sec-btn add-grp-btn "
            style={{marginLeft:"25px"}}
            state={{
                      enrollment_id: enrollment_id,
                      course_type:course_type,
                     
                  }}
          >
           Print
          </Link> */}

          <button onClick={handlePrint} className="sec-btn add-grp-btn mt-4 mb-3" style={{marginLeft:"15px"}}>  Print </button>

          <div className="data-table backend-data-table">
           
          <div ref={componentRef} className="data-table backend-data-table m-2"> 
            <div className="row mt-2">
              {data &&
                data.map((item, i) => (
                  <>
                    <div className="col-sm-12 m-2">
                      <div class="card">
                        <div class="card-header">{i + 1}. Question</div>
                        <div class="card-body">
                          <h5 class="card-title">
                            {item.question_name}
                          </h5>

                          {/** choices ans */}
                          {item.option_type == "choices" && (
                            <>
                              <ul class="list-group">
                                {item.options.choices.map(
                                  (ans) => (
                                    <li class="list-group-item">
                                      {ans.option_name}
                                    </li>
                                  )
                                )}
                              </ul>

                              {/** answer */}
                              <div className="p-4">
                                <h5>
                                  Result:{" "}
                                  {item.user_answer_name}

                                  {!("user_answer_name" in item) && stringSplit(
                                    item.user_answer,
                                    item.options.choices,
                                    null,
                                    "choices"
                                  )}
                                  
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                  <span>
                                    {item.answer_status == "true" ? (
                                      <i
                                        style={{ color: "green" }}
                                        class="fa fa-check fa-lg"
                                        aria-hidden="true"
                                      ></i>
                                    ) : (
                                      <i
                                        style={{ color: "red" }}
                                        class="fa fa-times fa-lg"
                                        aria-hidden="true"
                                      ></i>
                                    )}
                                  </span>
                                </h5>
                              </div>
                            </>
                          )}

                          {/** matching ans */}
                          { item.option_type == "source" ||
                             item.option_type ==  "target" ? (
                              <>
                                <ul class="list-group">
                                  {item.options.source.map(
                                    (ans, s) => (
                                      <>
                                        <div className="row">

                                         
                                          <div className="col-sm-6">
                                            <li class="list-group-item">
                                              {ans.option_name}
                                            </li>
                                          </div>

                                          <div className="col-sm-6">
                                          <li class="list-group-item">
                                            {
                                              item.options.target[s].option_name
                                            }
                                          </li>
                                        </div>
                                          
                                         
                                        </div>
                                      </>
                                    )
                                  )}
                                </ul>

                                {/** answer */}
                                <div className="p-4">
                                  <h5>
                                    Result:{" "}
                                    {stringSplit(
                                      item.user_answer,
                                      item.options.source,
                                      item.options.target,
                                      "matching"
                                    )}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>
                                      {item.answer_status == "true"  ? (
                                        <i
                                          style={{ color: "green" }}
                                          class="fa fa-check fa-lg"
                                          aria-hidden="true"
                                        ></i>
                                      ) : (
                                        <i
                                          style={{ color: "red" }}
                                          class="fa fa-times fa-lg"
                                          aria-hidden="true"
                                        ></i>
                                      )}
                                    </span>
                                  </h5>
                                </div>
                              </>
                            ) : '' }
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewResult;
