import React from "react";
import { Link, useParams } from 'react-router-dom';
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';

const Uploadtrainnerform = () => {
    return (
        <div>
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">

                    <div className="container-fluid">
                        <div className="configer-head">
                            <div className="configer-child1">
                                <h3>Upload Trainer Form</h3>
                            </div>

                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="trainerbox">
                                    <div className="trainer-c"><p>Trainer:</p></div>
                                    <div className="padding-box">
                                        <div className="main-checkbox">

                                            <div className="checkbox-wrp">
                                                <div class="custom-radios">
                                                    <input type="checkbox" id="color-6" />
                                                    <label for="color-6">
                                                        <span className="redious">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="caption-cheeckbox">
                                                    <p>Active</p>
                                                </div>
                                            </div>
                                            <div className="checkbox-wrp">
                                                <div class="custom-radios">
                                                    <input type="checkbox" id="color-7" />
                                                    <label for="color-7">
                                                        <span className="redious">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="caption-cheeckbox">
                                                    <p>Inactive</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="select-client">
                                            <select>
                                                <option>Choose a trainer</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="trainerbox">
                                    <div className="trainer-c"><p>Client:</p></div>
                                    <div className="padding-box">
                                        <div className="main-checkbox">

                                            <div className="checkbox-wrp">
                                                <div class="custom-radios">
                                                    <input type="checkbox" id="color-8" />
                                                    <label for="color-8">
                                                        <span className="redious">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="caption-cheeckbox">
                                                    <p>Active</p>
                                                </div>
                                            </div>
                                            <div className="checkbox-wrp">
                                                <div class="custom-radios">
                                                    <input type="checkbox" id="color-9" />
                                                    <label for="color-9">
                                                        <span className="redious">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="caption-cheeckbox">
                                                    <p>Groups</p>
                                                </div>
                                            </div>
                                            <div className="checkbox-wrp">
                                                <div class="custom-radios">
                                                    <input type="checkbox" id="color-10" />
                                                    <label for="color-10">
                                                        <span className="redious">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="caption-cheeckbox">
                                                    <p>Inactive</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="select-client">
                                            <select>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="trainerbox">
                                    <div className="trainer-c"><p>Form Name:</p></div>
                                    <div className="padding-box">

                                        <div className="select-client mrt-select">
                                            <select>
                                                <option>Interview Checklist Fill-in</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                                <option>Choose a client</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="trainerbox">
                                    <div className="trainer-c"><p>Upload PDF Form:</p></div>
                                    <div className="padding-box mrt-select">
                                        <input type="file" name="file" accept=".pdf" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="trainerbox">
                                    <div className="trainer-c"><p>Session:</p></div>
                                    <div className="padding-box">

                                        <div className="select-client mrt-select">
                                            <select>
                                                <option>Choose a session</option>
                                                <option>Choose a session</option>
                                                <option>Choose a session</option>
                                                <option>Choose a session</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="client-submit-btn">
                            <button>Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Uploadtrainnerform;