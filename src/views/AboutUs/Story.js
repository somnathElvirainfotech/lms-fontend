import React from 'react'

export default function Story() {
    return (
        <>
            <div className="our-story">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-12">
                            <div className="img-block">
                                <div className="tham-img">
                                    <img src="images/story-img.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-12">
                            <div className="text-block">
                                <h3>Our story</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                                <div className="watch-video" data-toggle="modal" data-target="#exampleModalCenter">
                                    <strong><i className="fa fa-play"></i></strong> <span>Watch Video</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/** modal */}

            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
