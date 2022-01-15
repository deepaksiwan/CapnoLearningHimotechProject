import React from 'react';
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';

const Editprofile = () => {
    const {tab} = useParams();

    const QuestionArray = [
        {
            questionbold: "Question 1:" , questiondisplay: "I will be working with clients."
        },
        {
            questionbold: "Question 2:" , questiondisplay: "There will be other trainers seeing clients besides me."
        },
        {
            questionbold: "Question 3:" , questiondisplay: "I will be doing groupwork with multiple CapnoTrainers."
        },
        {
            questionbold: "Question 4:" , questiondisplay: "I purchased the CapnoTrainer HRV P6.0 option."
        },
        {
            questionbold: "Question 5:" , questiondisplay: "Auto-update Computer Software."
        }
    ]


    return(
        <div className="demodata-bg">
            <Header />
             <div className="wrp-dashbord">
                <div className="sidebar-section">
                <Sidebar />
               </div>
               <div className="right-section">
                    <div className="head-demoreport">
                        <h3>Edit Profile</h3>
                    </div>
                    <div className="wrp-editprofile">
                        <ul className="question-list">
                            {
                                QuestionArray.map( function(q){
                                    return(
                                        <li>
                                            <div className="wrp-question">
                                                <div className="question-child1">
                                                    <div><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option1" /><span>No</span></div>
                                                <div> <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option1" /><span>Yes</span></div>
                                                </div>
                                                <div className="question-child2">
                                                    <p><b>{q.questionbold}</b> {q.questiondisplay}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }

                                )
                            }
                        </ul>
                        <div className="edit-stoke"></div>
                        <div className="wrp-edit-form">
                            <div className="edit-input-wrp">
                                <div className="edit-input">
                                    <p>First Name:</p>
                                    <input placeholder="Peter" />
                                </div>
                                <div className="edit-input">
                                    <p>Last Name:</p>
                                    <input placeholder="Litchfield" />
                                </div>
                                <div className="edit-input">
                                    <p>Name of business:</p>
                                    <input placeholder="Name of business:" />
                                </div>
                            </div>
                            <div className="edit-input-wrp">
                                <div className="edit-input">
                                    <p>First Name:</p>
                                    <input placeholder="Peter" />
                                </div>
                                <div className="edit-input">
                                    <p>Last Name:</p>
                                    <input placeholder="Litchfield" />
                                </div>
                                <div className="edit-input">
                                    <p>Name of business:</p>
                                    <input placeholder="Name of business:" />
                                </div>
                            </div>
                            <div className="edit-input-wrp">
                                <div className="edit-input address-input">
                                    <p>Address</p>
                                    <input placeholder="7 Camino de Rey Cir" />
                                </div>
                            </div>
                            <div className="edit-input-wrp wrp-city-input">
                                <div className="edit-input">
                                    <p>City</p>
                                    <input placeholder="Santa Fe" />
                                </div>
                                <div className="edit-input">
                                    <p>Postal Code</p>
                                    <input placeholder="87506" />
                                </div>
                                <div className="edit-input">
                                    <p>State/Province</p>
                                    <div className="select-client5">
                                        <select>
                                            <option>New Mexico</option>
                                            <option>Choose a client</option>
                                            <option>Choose a client</option>
                                            <option>Choose a client</option>
                                            <option>Choose a client</option>
                                            <option>Choose a client</option>
                                            <option>Choose a client</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="edit-input">
                                    <p>Country</p>
                                   
                                    <div className="select-client5">
                                        <select>
                                            <option>United State</option>
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
                            <div className="save-btn">
                                <button>Save</button>
                            </div>
                        </div>
                    </div>
               </div>
             </div>
            
        </div>
    )
}

export default Editprofile;