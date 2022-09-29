import React from 'react'

export default function AddNewAssignment() {
    return (
        <>
            <div className="add-new-assignment-sec sec-bg">
                <div className="container">
                    <div className="data-table">
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Assignemnt No</td>
                                        <td>Automatic</td>

                                    </tr>
                                    <tr>
                                        <td>Assignemnt Name</td>
                                        <td>Assignment for new hires May 22</td>

                                    </tr>
                                    <tr>
                                        <td>User Group</td>
                                        <td>Group 1</td>

                                    </tr>
                                    <tr>
                                        <td>Course</td>
                                        <td>New hires Course</td>

                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td>Automatic</td>

                                    </tr>
                                    <tr>
                                        <td>Assignment Deadline</td>
                                        <td>3/2/2022</td>

                                    </tr>

                                </tbody>
                            </table>
                            <div className="table-action-btn">
                                <a href="#" className="sec-btn">Save</a>
                                <a href="#" className="sec-btn cancel-btn">cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
