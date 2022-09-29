import React, { useState, useEffect, useContext } from 'react'
import UserService from '../../services/UserService';
import AssignmentService from '../../services/AssignmentService';
import { AuthContext } from '../../index';
import { Markup } from 'interweave';

import TaskService from '../../services/TaskService';
import { useNavigate, Link } from 'react-router-dom';
import UserTaskService from '../../services/UserTaskService';



export default function MyTask() {
    const [assignments, setAssignments] = useState([]);
    const [count, setCount] = useState(0);
    const { user } = useContext(AuthContext);
    const [enrollment, setEnrollments] = useState();
    const navigate = useNavigate();
    const [dataLen, setDataLen] = useState(0);

    useEffect(() => {
        // if (user.user_role == 5) {
        //     var responce = await UserService.assignment(user.user_id);
        //     setAssignments(responce.data.data);
        // } else if (user.user_role == 4) {
        //     var responce = await AssignmentService.getAll();
        //     setAssignments(responce.data.data);
        // }


        (async () => {

            var data = {
                group_id: user.user_group_id,
                created_by: '',
                user_id: user.user_id
            };
            var responce = await TaskService.search(data);
            console.log(responce.data.data);
            setAssignments([...responce.data.data])
            setCount(responce.data.data.length);



        })()



    }, [])


    const [enroll, setEnroll] = useState(false);


    var getCourse = async (courseId, taskId, no_attempted) => {


        var enrollRes = await UserService.enrollmentcourse(user.user_id, courseId);
        var status = false;
        console.log(enrollRes.data)
        if (enrollRes.data.status) {
            if (enrollRes.data.data[0].user_enroll_status == 'active') {
                status = true;
                setEnroll(true)
            }
        }


        // get all data
        var data = {
            group_id: user.user_group_id,
            created_by: '',
            user_id: user.user_id
        };
        var responce = await TaskService.search(data);
        console.log(responce.data.data);
        setAssignments([...responce.data.data])
        setCount(responce.data.data.length);
        ////////////////////



        if (status) {

            var chk = await UserTaskService.create({ user_id: user.user_id, task_id: taskId, no_attempted: (no_attempted + 1) })
            // console.log(chk.data)

            var cresponce = await UserService.singlecourse(courseId);
            var temp = cresponce.data.data;



            if (temp.course_type == "xapi") {
                var authdata = { username: user.username, email: user.email }
                window.open(`/singlexapi?link=${btoa(temp.xapi_attachment_file)}`, '_blank');
                // navigate(`/singlexapi?link=${temp.xapi_attachment_file}`,{replace:true,target:'_blank'})
            } else {
                //window.location.replace(`/singlecourse?id=${courseId}`)
                navigate("/singlecourse", { state: { singleCourseId: courseId, taskId: taskId, courseType: temp.course_type } })
            }

        } else {
            var cresponce = await UserService.singlecourse(courseId);
            var temp = cresponce.data.data;

            // window.location.replace(`/singlecourse?id=${courseId}`)
            navigate("/singlecourse", { state: { singleCourseId: courseId, taskId: taskId, courseType: temp.course_type } })

        }

    }


    return (
        <>
            {assignments.length > 0 ?
                <div>
                    <div className="my-assignment">


                        <div className="container">

                            <div className="inner-sec-head">
                                <h2>My Tasks   </h2>
                            </div>

                            <div id="task-list-slider" className="owl-carousel1">


                                <div className="assignment-item">
                                    {assignments.map((assignment, i) =>
                                        <>{
                                            assignment.user_task_status != 'passed' && 
                                            <div className="my-course-details">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="my-course-img">
                                                            {/**     <img src={assignment.image} className="img-fluid" alt="" /> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="my-course-content">
                                                            <h4>{assignment.task_name.toUpperCase()} </h4>
                                                            <p> <b>CREATOR NAME :</b> {assignment.creator_name} ({assignment.creator_email})</p>
                                                            <p> <b>COURSE NAME :</b> {assignment.course_name.toUpperCase()} </p>
                                                            <p> <b>START DATE :</b> {new Date(assignment.task_start_date).toLocaleDateString()} &nbsp; &nbsp; &nbsp;  <b>END DATE :</b> {new Date(assignment.task_end_date).toLocaleDateString()}</p>

                                                            <div width="30px">
                                                                <b> DESCRIPTION : </b>
                                                                <p><Markup content={assignment.task_describtion} /> </p>
                                                            </div>

                                                            {assignment.no_attempted == 0 &&

                                                                <h5 className="course-status"> {assignment.user_task_status}</h5>}

                                                            {assignment.no_attempted != 0 &&

                                                                <h5 className="course-status"> Attempted {assignment.no_attempted}</h5>}

                                                            {assignment.user_task_status == 'passed' &&
                                                                <h5 className="course-status ml-2"> Passed</h5>}


                                                            {assignment.user_task_status == 'failed' &&
                                                                <h5 className="course-status ml-2"> Failed</h5>}


                                                            {assignment.user_task_status != 'passed' ?
                                                                < Link to="" onClick={e => getCourse(assignment.course_id, assignment.id, assignment.no_attempted)} > Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></Link> : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        </>

                                    )}
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                : ''
            }

        </>
    )
}
