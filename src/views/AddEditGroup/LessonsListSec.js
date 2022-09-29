import React from 'react'

export default function LessonsListSec() {
    return (
        <>
            <div className="list-lessons-sec">
                <div className="container">
                    <button type="button" className="sec-btn">
                        Add Lessons
                    </button>
                    <div className="gl-comm-ttl">
                        <h2>List of lessons/chapters
                        </h2>
                    </div>
                    <div className="list-lessons-inner">
                        <form>
                            <div className="form-group">
                                <label>Lesson 1
                                </label>
                                <textarea className="form-control" rows="3"></textarea>
                                <div className="list-lesson-btn">
                                    <a href="" className="edit-btn">Edit</a>
                                    <a href="" className="delete-btn">Delete</a>
                                </div>

                            </div>
                            <div className="form-group">
                                <label>Lesson 2
                                </label>
                                <textarea className="form-control" rows="3"></textarea>
                                <div className="list-lesson-btn">
                                    <a href="" className="edit-btn">Edit</a>
                                    <a href="" className="delete-btn">Delete</a>
                                </div>

                            </div>
                            <div className="form-group">
                                <label>Lesson 3
                                </label>
                                <textarea className="form-control" rows="3"></textarea>
                                <div className="list-lesson-btn">
                                    <a href="" className="edit-btn">Edit</a>
                                    <a href="" className="delete-btn">Delete</a>
                                </div>

                            </div>
                            <div className="form-group">
                                <label>Lesson 4
                                </label>
                                <textarea className="form-control" rows="3"></textarea>
                                <div className="list-lesson-btn">
                                    <a href="" className="edit-btn">Edit</a>
                                    <a href="" className="delete-btn">Delete</a>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
