import React, { useEffect, useState } from 'react'
import GroupService from '../../services/GroupService'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import ReactPaginate from "react-paginate";

export default function UserGroup() {
    const [group, setGroup] = useState([])

    const [input, setInput] = useState({});
    const [updateInput, setUpdateInput] = useState({});
    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');

    useEffect(() => {
        GetAll();
    }, [])


    // confirm alert
    var deleteData = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => Delete(id)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };


    // react pagination  //////////////////////////
    const PER_PAGE = 10;
    const [currentPageData, setCurrentPageData] = useState([]);
    const pageCount = Math.ceil(group.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        getDataPagi(group, (selectedPage * PER_PAGE))
    }


    function getDataPagi(data, offset) {
        var temp = [];
        console.log("offset", offset);
        data.slice(offset, offset + PER_PAGE).map((item) => {
            temp.push(item);
        })
        setCurrentPageData(temp)

    }

    // /////////////////////////////////




    var handler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(values => ({ ...values, [name]: value }))
    }

    var updateHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUpdateInput(values => ({ ...values, [name]: value }))
    }


    var GetAll = async () => {
        var responce = await GroupService.getAll();
        setGroup([...responce.data.data]);
        getDataPagi(responce.data.data, (0 * PER_PAGE))
    }

    var create = async () => {
        var data = new FormData();
        data.append("g_name", input.g_name);

        var responce = await GroupService.create(data);

        if (responce.data.status) {
            toast.success(responce.data.msg)
            input.g_name = '';
            GetAll();
        }
        else {
            toast.error(responce.data.msg);
            input.g_name = '';
            GetAll();
        }

    }

    var closeModal = () => {
        setsuccess('');
        seterror('');
        input.g_name = '';
        updateInput.g_name = '';
    }

    var setModal = () => {
        setsuccess('');
        seterror('');
    }

    const [gID, setGid] = useState();
    const [status, setStatus] = useState('');

    var getOne = async (id) => {
        // console.log(3333333)
        var responce = await GroupService.getOne(id);
        updateInput.g_name = responce.data.data[0].g_name;
        setStatus(responce.data.data[0].g_status)
        //  console.log(responce.data.data[0].g_name);
        setGid(id);
    }

    var update = async () => {
        var data = new FormData();
        data.append("g_name", updateInput.g_name)
        data.append("id", gID)
        data.append("g_status", status)


        // console.log(gID)

        var responce = await GroupService.update(data);

        if (responce.data.status) {
            toast.success(responce.data.msg)
            GetAll();
        }
        else {
            toast.error(responce.data.msg)
            GetAll();
        }
    }

    var Delete = async (id) => {

        var responce = await GroupService.delete(id);
        GetAll();
    }


    return (
        <>

            {/** list */}

            <div className="user-group-sec sec-bg">
                <div className="container">
                    {error &&
                        <div className="alert alert-danger alert-dismissible">
                            <button onClick={setModal} type="button" className="close" data-dismiss="alert">&times;</button>
                            {error}
                        </div>
                    }

                    {success &&
                        <div className="alert alert-success alert-dismissible">
                            <button onClick={setModal} type="button" className="close" data-dismiss="alert">&times;</button>
                            {success}
                        </div>
                    }

                    <button style={{width:"20%"}} type="button" className="sec-btn add-grp-btn" data-toggle="modal" data-target="#addgroupModal">
                        Add group <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>

                    <div className="data-table backend-data-table">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th width="200px">Group id

                                        </th>
                                        <th width="200px">Group name
                                        </th>
                                        <th width="200px">Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>



                                    {currentPageData && currentPageData.map((item, i) =>
                                        <>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{item.g_name}</td>
                                                <td>
                                                    <button style={{width:"20%"}} type="button" onClick={e => getOne(item.id)} className="edit-btn" data-toggle="modal" data-target="#editgroupModal">
                                                        Edit
                                                    </button>

                                                    <button style={{width:"30%"}} type="button" onClick={e => deleteData(item.id)} className="delete-btn" >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )}

                                </tbody>
                            </table>
                        </div>
                        {/** pagination */}
                        {group.length > PER_PAGE && <div className="pagination-sec">

                            <ReactPaginate
                                previousLabel={"← Previous"}
                                nextLabel={"Next →"}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                breakLabel={"..."}
                                marginPagesDisplayed={"2"}
                                pageRangeDisplayed={"3"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                activeClassName={"pagination_active"}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}

                            />

                            {/**      <nav data-pagination>
                            <a href="#" disabled><i className="fa fa-chevron-left"></i></a>
                            <ul>
                                <li className="current"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a> </li>
                                <li><a href="#">…</a></li>
                                <li><a href="#">250</a></li>

                            </ul>
                            <a href="#"><i className="fa fa-chevron-right"></i> </a>
                        </nav> */}
                        </div>}
                    </div>
                </div>
            </div>



            {/** create */}

            <div className="modal fade" id="addgroupModal" tabindex="-1" role="dialog" aria-labelledby="addgroupModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">

                            <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>


                        </div>
                        <div className="modal-body">
                            <div className="data-table user-table">
                                <div className="table-responsive">
                                    <table className="table table-responsive">
                                        <tbody>
                                            <tr>
                                                <td className="user-table-left-data" width="250px">Group Name
                                                </td>
                                                <td width="300px">
                                                    <input value={input.g_name} type="text" className="form-control" placeholder="Eneter group name" name='g_name' onChange={handler} />
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="edit-btn" onClick={create}>Save group </button>
                            <button onClick={closeModal} type="button" className="delete-btn" data-dismiss="modal" >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            {/** update */}

            <div className="modal fade" id="editgroupModal" tabindex="-1" role="dialog" aria-labelledby="addgroupModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="data-table user-table">
                                <div className="table-responsive">
                                    <table className="table table-responsive">
                                        <tbody>
                                            <tr>
                                                <td className="user-table-left-data" width="250px">Group Name
                                                </td>
                                                <td width="300px">
                                                    <input type="text" className="form-control" placeholder="" value={updateInput.g_name} onChange={updateHandler} name="g_name" />
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="edit-btn" data-dismiss="modal" onClick={update}>Update group </button>
                            <button type="button" className="delete-btn" data-dismiss="modal" onClick={closeModal} >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}
