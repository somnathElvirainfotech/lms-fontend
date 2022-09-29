import React, { useState, useEffect, useContext } from 'react'
import UserService from '../../services/UserService';
import AssignmentService from '../../services/AssignmentService';
import { AuthContext } from '../../index';
import { Markup } from 'interweave';
export default function MYAssignment() {
    const [assignments, setAssignments] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {

        (async () => {
            if (user.user_role == 5) {
                var responce = await UserService.assignment(user.user_id);
                setAssignments(responce.data.data);
            } else if (user.user_role == 4) {
                var responce = await AssignmentService.getAll();
                setAssignments(responce.data.data);
            }
        })()

    }, [])


    return (
        <>
            {user.user_role != 2 && assignments.length > 0 ? <div className="my-assignment">
                <div className="container">
                    <div className="inner-sec-head">
                        <h2>My Assignments</h2>
                    </div>
                    <div id="assignment-list-slider" className="owl-carousel1">


                        {/** for enrollment user assignment */}
                        {user.user_role == 5 && < div className="assignment-item"  >
                            {assignments.map(assignment =>
                                <div className="my-course-details">
                                    <div className="row align-items-center">
                                        <div className="col-md-4">
                                            <div className="my-course-img">
                                                <img src={assignment.image} className="img-fluid" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="my-course-content">
                                                <h4>{assignment.assignment_name}</h4>
                                                <p> <Markup content={assignment.assigment_desc} /></p>
                                            {/**     <h5 className="course-status">Complete 60%</h5>  */}
                                                <a href={assignment.assigment_file}> <i className="fa fa-download" aria-hidden="true"></i> Download </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )}
                        </div>
                        }


                        {/** for creator assignment */}
                        {user.user_role == 4 && < div className="assignment-item"  >
                            {assignments.map(assignment =>
                                <div className="my-course-details">
                                    {assignment.courae_approved_status == 'active' && assignment.course_published_status == 'active' ? <div className="row align-items-center">
                                        <div className="col-md-4">
                                            <div className="my-course-img">
                                                <img src={assignment.image} className="img-fluid" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="my-course-content">
                                                <h4>{assignment.assignment_name}</h4>
                                                <p>{assignment.assigment_desc}</p>
                                              <h5 className="course-status">Complete 60%</h5>
                                                <a href="#">Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                    </div> : ''}
                                </div>

                            )}
                        </div>
                        }


                    </div>
                </div>
            </div>
                : ''}
        </>
    )
}
