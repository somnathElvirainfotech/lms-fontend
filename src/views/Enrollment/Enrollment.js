import React from 'react'

export default function Enrollment() {
    return (
        <>
            <div className="enrollments-form course">
                <div className="container">
                    <div className="enrollments-form-inner course-inner">
                        <form>
                            <div className="form-group">
                                <input type="date" className="form-control" placeholder="Enrollments date/id" />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Course creator email" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="User/student No" />
                            </div>

                            <div className="form-group">

                                <select className="form-control">
                                    <option selected>User/student rating</option>
                                    <option>5 Star</option>
                                    <option>4 Star</option>
                                    <option>3 Star</option>
                                    <option>2 Star</option>
                                    <option> 1 Star</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn">Submit</button>
                            </div>
                        </form>

                    </div>


                </div>
            </div>
        </>
    )
}
