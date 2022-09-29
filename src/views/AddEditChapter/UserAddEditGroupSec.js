import React from 'react'

export default function UserAddEditGroupSec() {
  return (
    <>
        <div className="user-add-edit-group-sec sec-bg">
        <div className="container">
            <div className="select-chapter">
                <select className="form-control" id="exampleFormControlSelect2">
                    <option>Chapter
                    </option>
                    <option>Chapter
                        1</option>
                    <option>Chapter
                        2</option>


                </select>
            </div>
            <div className="data-table user-table">
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="user-table-left-data" width="150px">Name


                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Video link

                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Duration


                            </td>
                            <td width="150px">
                                <input type="number" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Text

                            </td>
                            <td width="150px">
                                <textarea className="form-control" rows="3"></textarea>

                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Attachment

                            </td>
                            <td width="150px">
                                <i className="fa fa-paperclip" aria-hidden="true"></i>
                            </td>
                        </tr>


                    </tbody>

                </table>
                <div className="user-table-btnarea">
                    <a href="" className="edit-btn">Save Lessons
                    </a>
                    <a href="" className="delete-btn">Cancel Lessons</a>
                </div>

            </div>
        </div>
    </div>
    </>
  )
}
