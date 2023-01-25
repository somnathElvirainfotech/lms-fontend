import React, { useState } from 'react'

export default function Courses() {

    const [inputs, setInputs] = useState({
        filter1: "course"
    }); 

    var selectCourseEnroll = () => {

    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        // console.log(inputs)
    }

    return (
        <>
            <div className="course">
                <div className="container">
                    <div className="course-inner">
                        <form onSubmit={selectCourseEnroll}>

                            <div className="form-group">
                                <select required className="form-control" name='filter1' value={inputs.filter1} onChange={handleChange}>
                                    <option value=""> --select-- </option>
                                    <option value="course">COURSE</option>
                                    <option value="enrollment">ENROLLMENT</option>
                                </select>
                            </div>

                             
                            <div className="form-group">
                                <button type="submit" className="btn">Submit</button>
                            </div>
                        </form>

                    </div>


                </div>
            </div>
        </>
    )
}
