import React from 'react'

export default function UserList() {
    return (
        <>
            <div className="user-list-sec sec-bg">
                <div className="container">
                    <div className="user-list-sec-btnarea">
                        <a href="#" className="sec-btn">Add New User
                        </a>
                        <a href="#" className="sec-btn">Load from CSV </a>
                        <a href="#" className="sec-btn">Export to CSV </a>
                    </div>

                    <div className="data-table">
                        <div className="table-responsive">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>User
                                            Id
                                        </th>
                                        <th>Email
                                        </th>
                                        <th>Department
                                        </th>
                                        <th>User HR
                                            number
                                        </th>
                                        <th>Date
                                            created
                                        </th>
                                        <th>Date
                                            updated
                                        </th>
                                        <th>Date
                                            (manual
                                            field)
                                        </th>
                                        <th> User
                                            groups</th>
                                        <th>Role (admin,
                                            supervisor..)

                                        </th>

                                        <th>Disabled
                                            (T/F)

                                        </th>
                                        <th>Sign in
                                            count
                                        </th>
                                        <th>Last sign
                                            in IP
                                        </th>
                                        <th>Social links
                                        </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>@305</td>
                                        <td>ana1@
                                            gmail
                                            .com</td>
                                        <td>Accounting
                                        </td>
                                        <td>9903456987
                                        </td>
                                        <td>12/02/22</td>
                                        <td>12/04/22</td>
                                        <td>
                                            Lorem
                                            Ipsum
                                        </td>
                                        <td>
                                            Lorem
                                            Ipsum
                                        </td>
                                        <td>
                                            Lorem
                                            Ipsum
                                        </td>
                                        <td>
                                            No

                                        </td>
                                        <td>
                                            Lorem
                                            Ipsum
                                        </td>
                                        <td>
                                            Lorem
                                            Ipsum
                                        </td>
                                        <td>

                                            Teams link,
                                            linkedin..


                                        </td>

                                        <td className="delete"><a href=""><i className="fa fa-trash" aria-hidden="true"></i></a></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="pagination-sec">
                        <nav data-pagination>
                            <a href="#" disabled><i className="fa fa-chevron-left"></i></a>
                            <ul>
                                <li className="current"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">…</a></li>
                                <li><a href="#">250</a></li>
                            </ul>
                            <a href="#"><i className="fa fa-chevron-right"></i> </a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
