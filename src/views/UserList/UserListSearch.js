import React from 'react'

export default function UserListSearch() {
    return (
        <>
            <div className="user-list-form course">
                <div className="container">
                    <div className="enrollments-form-inner course-inner">
                        <form>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Course creator email" />
                            </div>
                            <div className="form-group">
                                <select className="form-control">
                                    <option selected>Group name
                                    </option>
                                    <option>Group 1
                                    </option>
                                    <option>Group 2
                                    </option>
                                    <option>Group 3
                                    </option>

                                </select>
                            </div>
                            <div className="form-group">
                                <div className="search">
                                    <input type="text" className="form-control searchTerm" placeholder="Search user " />
                                    <button type="submit" className="searchButton">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            {/* <!--
                    <div className="form-group">
                        <button type="submit" className="btn">Submit</button>
                    </div>
                    --> */}
                        </form>

                    </div>


                </div>
            </div>
        </>
    )
}
