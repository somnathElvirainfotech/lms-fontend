import React, { useContext, useState ,useEffect} from 'react';

// languages
import English from "../ConverLanguages/English";
import SerbianCyrilic from "../ConverLanguages/SerbianCyrilic";
import SerbianLatin from "../ConverLanguages/SerbianLatin";
// end languages
import { LangContext } from '../../routes/routes';

export default function MyCourse() {

    const { languageList } = useContext(LangContext);
    const [langObj, setLangObj] = useState({});

    useEffect(() => {

        if (languageList.language_name === "english") {
            setLangObj(English)
        } else if (languageList.language_name === "СРБ") {
            setLangObj(SerbianCyrilic)
        } else if (languageList.language_name === "SRB") {
            setLangObj(SerbianLatin)
        }

    }, [languageList.language_name]);

    return (
        <>
            <div className="my-course">
                <div className="container">
                    <div className="inner-sec-head">
                        <h2>Your Online Courses</h2>
                        <h4>Build your career with new skills</h4>
                    </div>
                    <div id="my-course-list-slider" className="owl-carousel">
                        <div className="slider-item">
                            <div className="my-course-list">
                                <div className="accordion" id="accordionExample">
                                    <div className="item">
                                        <div className="item-header" id="headingOne">
                                            <h2>
                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Last seen : (8.50 a.m.)
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div className="my-course-details">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="my-course-img">
                                                            <img src="images/my-course1.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="my-course-content">
                                                            <h4>Data Analytics</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                            <h5 className="course-status">Not completed</h5>
                                                            <a href="#">Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-course-details">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="my-course-img">
                                                            <img src="images/my-course1.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="my-course-content">
                                                            <h4>Data Analytics</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                            <h5 className="course-status">Not completed</h5>
                                                            <a href="#">Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="item-header" id="headingTwo">
                                            <h2 className="mb-0">
                                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Yesterday seen :
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div className="my-course-details">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="my-course-img">
                                                            <img src="images/my-course1.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="my-course-content">
                                                            <h4>Data Analytics</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                            <h5 className="course-status">Not completed</h5>
                                                            <a href="#">Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-item">
                            <div className="my-course-list">
                                <div className="accordion" id="accordionExample2">
                                    <div className="item">
                                        <div className="item-header" id="headingThree">
                                            <h2>
                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                    Last seen : (8.50 a.m.)
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <div className="my-course-details">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="my-course-img">
                                                            <img src="images/my-course1.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="my-course-content">
                                                            <h4>Data Analytics</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                            <h5 className="course-status">Not completed</h5>
                                                            <a href="#">Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-course-details">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="my-course-img">
                                                            <img src="images/my-course1.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="my-course-content">
                                                            <h4>Data Analytics</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                            <h5 className="course-status">Not completed</h5>
                                                            <a href="#">Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="item-header" id="headingFour">
                                            <h2 className="mb-0">
                                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                    Yesterday seen :
                                                    <i className="fa fa-angle-down"></i>
                                                </button>
                                            </h2>
                                        </div>
                                        <div id="collapseFour" className="collapse show" aria-labelledby="headingFour" data-parent="#accordionExample">
                                            <div className="my-course-details">
                                                <div className="row align-items-center">
                                                    <div className="col-md-4">
                                                        <div className="my-course-img">
                                                            <img src="images/my-course1.png" className="img-fluid" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="my-course-content">
                                                            <h4>Data Analytics</h4>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                                            <h5 className="course-status">Not completed</h5>
                                                            <a href="#">Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
