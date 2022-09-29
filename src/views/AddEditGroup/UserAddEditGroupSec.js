import React from 'react'

export default function UserAddEditGroupSec() {
  return (
    <>
        <div className="user-add-edit-group-sec sec-bg">
        <div className="container">
            <div className="data-table user-table">

                <table className="table">
                    <tbody>
                        <tr>
                            <td className="user-table-left-data" width="150px">Course id

                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Course Name
                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Short descrption

                            </td>
                            <td width="150px">
                                <textarea className="form-control" rows="3"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Avatar
                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Descrption
                            </td>
                            <td width="150px">
                                <textarea className="form-control" rows="3"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Language
                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Language
                            </td>
                            <td width="150px">
                                <select className="form-control" id="exampleFormControlSelect2">
                                    <option>Beginner</option>
                                    <option>Senior</option>
                                    <option>Junior</option>

                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Published T/F
                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Approved T/F
                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">course type

                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Upload external file
                            </td>
                            <td width="150px">
                                <input type="file" className="form-control-file" />
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
                            <td className="user-table-left-data" width="150px">Course groups
                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Course categries
                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Course tags

                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Course access info

                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Course creator
                            </td>
                            <td width="150px">
                                <input type="email" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Course author
                            </td>
                            <td width="150px">
                                <input type="email" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Author contact
                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Average rating
                            </td>
                            <td width="150px">
                                <ul className="rating">
                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                    <li><a href=""><i className="fa fa-star" aria-hidden="true"></i></a> </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="user-table-left-data" width="150px">Certificate

                            </td>
                            <td width="150px">
                                <input type="text" className="form-control" placeholder="" />
                            </td>
                        </tr>

                    </tbody>

                </table>
                <div className="user-table-btnarea">
                    <a href="" className="edit-btn">Save course
                    </a>
                    <a href="" className="delete-btn">Cancel</a>
                </div>

            </div>
        </div>
    </div>
    </>
  )
}
