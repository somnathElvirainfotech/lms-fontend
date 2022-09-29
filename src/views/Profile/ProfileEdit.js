import React from 'react'

export default function ProfileEdit() {
    return (
        <>
            <div class="profile-edit-form" id="target">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-sm-4 pr-md-0">
                            <div class="profile-edit-form-left">
                                <div class="profile-edit-form-img">
                                    <img src="images/user.png" alt="" />
                                </div>
                                <h3>Elina Josh </h3>
                                <a href="#" class="active">Profile</a>
                                <a href="#">Photo
                                </a>
                                <a href="#">Security
                                </a>
                                <a href="#">Notification
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-9 col-sm-8 pl-md-0">
                            <div class="profile-edit-form-right">
                                <form>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>First NAME</label>
                                                <input type="text" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>LAST NAME</label>
                                                <input type="text" class="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>LANGUAGE
                                                </label>
                                                <select class="form-control" id="exampleFormControlSelect1">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>EMAIL ID
                                                </label>
                                                <input type="email" class="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>ENTER CURRENT PASSWORD</label>
                                                <input type="password" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>ENTER NEW PASSWORD</label>
                                                <input type="password" class="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>RE-ENTER PASSWORD</label>
                                                <input type="password" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>QUALIFICATION</label>
                                                <select class="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>ABOUT YOURSELF</label>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                                <small>120 character only.</small>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn">SAVE</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    )
}
