import React from 'react'

export default function ContactInfo() {
    return (
        <>
            <div className="contact-info">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-sm-12">
                            <div className="contact-left">
                                <h4 className="sec-head">Contact Info</h4>
                                <div className="contact-left-inner">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="media">
                                                <div className="media-icon">
                                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                </div>
                                                <div className="media-body">
                                                    <h5>Location 1</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="media-icon">
                                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                </div>
                                                <div className="media-body">
                                                    <h5>Location 3</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="media-icon">
                                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                                </div>
                                                <div className="media-body">
                                                    <h5>Phone</h5>
                                                    <p><a href="tel:+ 12 34567 89501">+ 12 34567 89501</a></p>
                                                    <p><a href="tel:+ 12 34567 85901">+ 12 34567 85901</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="media">
                                                <div className="media-icon">
                                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                </div>
                                                <div className="media-body">
                                                    <h5>Location 2</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="media-icon">
                                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                </div>
                                                <div className="media-body">
                                                    <h5>Location 4</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="media-icon">
                                                    <i className="fa fa-fax" aria-hidden="true"></i>
                                                </div>
                                                <div className="media-body">
                                                    <h5>Fax</h5>
                                                    <p><a href="#">+ 12 34567 89501</a></p>
                                                    <p><a href="#">+ 12 34567 85901</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-sm-12">
                            <div className="contact-right">
                                <h4 className="sec-head">Send a Message</h4>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Phone" />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control" rows="5" placeholder="Message"></textarea>
                                    </div>
                                    <button type="submit" className="btn">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
