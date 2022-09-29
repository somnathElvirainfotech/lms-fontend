import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import InnerBanner from '../Common/InnerBanner'
import Loader from '../Loader';
import XapiService from '../../services/XapiService';
import { toast } from 'react-toastify';

function ViewResult() {
    const [showLoader, setShowLoader] = useState(false);

    var location = useLocation();
    var { course_name, course_type, user_email } = location.state;

    var [data, setData] = useState([]);

    const navigate = useNavigate();
    var previousPage = () => {
        navigate(-1);
    }

    useEffect(() => {

        (async () => {
            setShowLoader(true)
            var responce = await XapiService.readQuestionAndAns({ course_name: course_name, course_type: course_type, user_email: user_email })

            console.log(responce.data);

            if (responce.data.status) {
                setData(responce.data.data)
                setShowLoader(false)
            } else {
                setShowLoader(false)
                toast.error("Result not found")
            }

        })()

    }, [])

    var stringSplit = (payload, answer, answer2, ans_type) => {

        var data = '';

        if (ans_type == "choices") {


            var arr = payload.split("[,]");

            for (var i of answer) {
                if (arr.includes(i.id)) {
                    data += i.description.und + ","
                }
            }
        } else if (ans_type == "matching") {


            var arr = payload.split("[,]");

            for (var i of arr) {

                var temp = "";

                var sub = i.split("[.]")

                for (var a of answer) {
                    if (sub.includes(a.id)) {
                        temp += a.description.und + " ";
                    }
                }

                for (var a of answer2) {
                    if (sub.includes(a.id)) {
                        temp += a.description.und + " ";
                    }
                }

                data += temp + ","

            }

        }

        data = data.slice(0, -1);
        return data;
    }

    return (
        <>
            {showLoader && <Loader />}

            <InnerBanner title="View Result" name="view result" linkName="Home" link="/" />

            {/** list */}

            <div className="user-group-sec sec-bg">
                <div className="container">

                    <button type="button" className="sec-btn add-grp-btn" onClick={previousPage}>
                        Back
                    </button>
                    <div className="data-table backend-data-table">
                        <div className='row'>
                            {data && data.map((item, i) => <>


                                <div className='col-sm-12 m-2'>
                                    <div class="card">
                                        <div class="card-header">
                                            {i + 1}. Question
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title">{item.questionAns.definition.description.und}</h5>

                                            {/** choices ans */}
                                            {"choices" in item.questionAns.definition && <>
                                                <ul class="list-group">
                                                    {item.questionAns.definition.choices.map((ans) =>

                                                        <li class="list-group-item">{ans.description.und}</li>

                                                    )}
                                                </ul>

                                                {/** answer */}
                                                <div className="p-4">
                                                    <h5>Result: {stringSplit(item.result.response, item.questionAns.definition.choices, null, "choices")}

                                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span >{item.result.response == item.questionAns.definition.correctResponsesPattern[0] ? <i style={{ color: "green" }} class="fa fa-check fa-lg" aria-hidden="true"></i> : <i style={{ color: "red" }} class="fa fa-times fa-lg" aria-hidden="true"></i>}</span>

                                                    </h5>


                                                </div>




                                            </>}

                                            {/** matching ans */}
                                            {"source" in item.questionAns.definition && "target" in item.questionAns.definition && <>

                                                <ul class="list-group">
                                                    {item.questionAns.definition.source.map((ans, s) =>

                                                        <>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <li class="list-group-item">{ans.description.und}</li>
                                                                </div>

                                                                <div className="col-sm-6">
                                                                    <li class="list-group-item">{item.questionAns.definition.target[s].description.und}</li>
                                                                </div>
                                                            </div>
                                                        </>

                                                    )}
                                                </ul>


                                                {/** answer */}
                                                <div className="p-4">
                                                    <h5>Result: {stringSplit(item.result.response, item.questionAns.definition.source, item.questionAns.definition.target, "matching")}

                                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span >{item.result.response == item.questionAns.definition.correctResponsesPattern[0] ? <i style={{ color: "green" }} class="fa fa-check fa-lg" aria-hidden="true"></i> : <i style={{ color: "red" }} class="fa fa-times fa-lg" aria-hidden="true"></i>}</span>

                                                    </h5>

                                                </div>




                                            </>}


                                        </div>
                                    </div>
                                </div>

                            </>

                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewResult