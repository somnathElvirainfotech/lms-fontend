import React, { useEffect, useState, useContext } from "react";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { AuthContext } from '../../index';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import InnerBanner from '../Common/InnerBanner';
import GroupService from '../../services/GroupService'
import CategoryService from "../../services/CategoryService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

export default function Category() {
    const { user } = useContext(AuthContext);
    const [group, setGroup] = useState([])

    const [input, setInput] = useState({});
    const [updateInput, setUpdateInput] = useState({});
    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');

    const [category, setCategory] = useState([]);

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


    var GetAll = async () => {
        var responce = await CategoryService.getAll();
        setGroup([...responce.data.data]);
        getDataPagi(responce.data.data, (0 * PER_PAGE))


        var responce = await CategoryService.getParentSubCategory();
        setCategory([...responce.data.data]);
    }

    var create = async (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append("c_name", input.c_name);
        data.append("c_description", input.c_description?input.c_description:null);
        data.append("c_parent_id", input.c_parent_id ? input.c_parent_id : 0);
        data.append("c_status", "active");

        var responce = await CategoryService.create(data);

        if (responce.data.status) {
            toast.success(responce.data.msg)
            input.g_name = '';
            GetAll();
        }
        else {
            toast.error(responce.data.msg)
            input.g_name = '';
            GetAll();
        }

        input.c_name = '';
        input.c_description = '';
        input.c_parent_id = '';



    }

    var closeModal = () => {



        input.c_name = '';
        input.c_description = '';
        input.c_parent_id = '';


    }



    const [gID, setGid] = useState();
    const [status, setStatus] = useState('');

    var getOne = async (id) => {
        // console.log(3333333)
        var responce = await CategoryService.getOne(id);
        console.log(responce.data)
        updateInput.c_name = responce.data.data[0].c_name;
        updateInput.c_description = responce.data.data[0].c_description==null?responce.data.data[0].c_description:'';
        updateInput.c_parent_id = responce.data.data[0].c_parent_id;
        setStatus(responce.data.data[0].c_status)
        //  console.log(responce.data.data[0].g_name);
        setGid(id);
    }

    var update = async (e) => {

        e.preventDefault();

        var data = new FormData();
        data.append("c_name", updateInput.c_name);
        data.append("c_description", updateInput.c_description);
        data.append("c_parent_id", updateInput.c_parent_id ? updateInput.c_parent_id : 0);
        data.append("c_status", status);
        data.append("id", gID);



        // console.log(gID)

        var responce = await CategoryService.update(data);

        if (responce.data.status) {
            toast.success(responce.data.msg)
            GetAll();
        }
        else {
            toast.error(responce.data.msg)
            GetAll();
        }


    }

    var setModal = () => {
        setsuccess('');
        seterror('');
    }

    var Delete = async (id) => {
        var responce = await CategoryService.delete(id);
        GetAll();
        toast.success(responce.data.msg)
    }

    return (
        <>

            <InnerBanner title="Category" name="List" linkName="Home" link="/" />

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

                    <button type="button" className="sec-btn add-grp-btn" data-toggle="modal" data-target="#addgroupModal">
                        Add category <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>

                    <div className="data-table backend-data-table">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th width="200px">No

                                        </th>
                                        <th width="200px">Category name
                                        </th>
                                        <th width="200px">Parent name
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
                                                <td>{item.c_name.toUpperCase()}</td>
                                                <td>{item.parent_cName && item.parent_cName.toUpperCase()}</td>
                                                <td>
                                                    <button type="button" onClick={e => getOne(item.id)} className="edit-btn" data-toggle="modal" data-target="#editgroupModal">
                                                        Edit
                                                    </button>

                                                    <button type="button" onClick={e => deleteData(item.id)} className="delete-btn" >
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

            <div className="modal fade" id="addgroupModal" tabIndex="-1" role="dialog" aria-labelledby="addgroupModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={create} method="post" >
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
                                                    <td className="user-table-left-data" width="250px">Category Name
                                                    </td>
                                                    <td width="300px">
                                                        <input required value={input.c_name} type="text" className="form-control" placeholder="Eneter category name" name='c_name' onChange={handler} />
                                                    </td>

                                                </tr>



                                            </tbody>
                                        </table>

                                        <table className="table table-responsive">
                                            <tbody>
                                                <tr>
                                                    <td className="user-table-left-data" width="250px">Parent
                                                    </td>
                                                    <td width="300px">

                                                        <select name='c_parent_id' onChange={handler} className="form-control" value={input.c_parent_id} >
                                                            <option value="" >-- Select parent --</option>
                                                            {
                                                                category.length && category.map((pitem) =>

                                                                    <>
                                                                        <option value={pitem.id}>{pitem.c_name.toUpperCase()}</option>

                                                                        {pitem.sub_category.map((subItem) =>
                                                                            <>
                                                                                <option value={subItem.id}>--{subItem.c_name.toUpperCase()}</option>

                                                                            </>
                                                                        )}


                                                                    </>
                                                                )
                                                            }

                                                        </select>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>


                                        <table className="table table-responsive">
                                            <tbody>
                                                <tr>

                                                    <td width="800px">

                                                        <textarea  onChange={handler} value={input.c_description}
                                                            name="c_description" placeholder="category description" className="form-control" id="exampleFormControlTextarea1" rows="4" />

                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="edit-btn">Create </button>
                                <button onClick={closeModal} type="button" className="delete-btn" data-dismiss="modal" >Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/** update */}

            <div className="modal fade" id="editgroupModal" tabIndex="-1" role="dialog" aria-labelledby="addgroupModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={update} method="post">
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
                                                    <td className="user-table-left-data" width="250px">Category Name
                                                    </td>
                                                    <td width="300px">
                                                        <input value={updateInput.c_name} type="text" className="form-control" placeholder="Eneter category name" name='c_name' onChange={updateHandler} />
                                                    </td>

                                                </tr>



                                            </tbody>
                                        </table>

                                        <table className="table table-responsive">
                                            <tbody>
                                                <tr>
                                                    <td className="user-table-left-data" width="250px">Parent
                                                    </td>
                                                    <td width="300px">

                                                        <select name='c_parent_id' onChange={updateHandler} className="form-control" value={updateInput.c_parent_id} >
                                                            <option value="" >-- Select parent --</option>
                                                            {
                                                                category.length && category.map((pitem) =>

                                                                    <>
                                                                        <option value={pitem.id}>{pitem.c_name.toUpperCase()}</option>

                                                                        {pitem.sub_category.map((subItem) =>
                                                                            <>
                                                                                <option value={subItem.id}>--{subItem.c_name.toUpperCase()}</option>

                                                                            </>
                                                                        )}


                                                                    </>
                                                                )
                                                            }

                                                        </select>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>


                                        <table className="table table-responsive">
                                            <tbody>
                                                <tr>

                                                    <td width="800px">

                                                        <textarea onChange={updateHandler} value={updateInput.c_description}
                                                            name="c_description" placeholder="category description" className="form-control" id="exampleFormControlTextarea1" rows="4" />

                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="edit-btn"  >Update </button>
                                <button type="button" className="delete-btn" data-dismiss="modal" onClick={closeModal} >Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>






        </>
    )

}

