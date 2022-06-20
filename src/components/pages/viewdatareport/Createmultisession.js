import React, { useEffect, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import { API_URL } from '../../../config';

const Createmultisession = () => {
    const clientId = localStorage.getItem('selectedClient');
    const homework = localStorage.getItem('selectedHomework');
    const accessToken = localStorage.getItem('accessToken');
    const [session, setSession] = useState([]);

    useEffect(() => {
        getSession()
    },[])

    const getSession = () => {
        let _hw = 0;
        console.log("homework",homework)
        if (homework === "true") {
            _hw = 1;
        }
         
        let url = API_URL+"/sessions?cid=" + clientId + "&hw=" + _hw;


        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }

        ).then((response) => {
            if (response.status == 200) {
                response.json().then((result) => {
                    // console.log(result.sesstion)
                    if (result.status) {
                        setSession(result.sessions)
                        // console.log(setsesstion)
                    }


                    else {
                        alert("no data error")
                    }

                })
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }


        }).catch(err => {
            // console.log(err)

        })
    }

    return (
        <div className="demodata-bg">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="choose-signals">
                        <p>Choose Signals</p>
                    </div>
                    <ul className="signals-list">
                        <li>
                            <div className="wrp-signal-content">
                                <div className="signal-c-child">
                                    <div class="custom-radios">
                                        <input type="checkbox" id="1" />
                                        <label for="1">
                                            <span className="redious">
                                            </span>
                                        </label>
                                    </div>
                                    <div className="caption-signal">
                                        <p>Raw PCO2</p>
                                    </div>
                                </div>
                                <div className="signal-c-child">
                                    <div class="custom-radios">
                                        <input type="checkbox" id="2" />
                                        <label for="2" >
                                            <span className="redious">
                                            </span>
                                        </label>
                                    </div>
                                    <div className="caption-signal">
                                        <p>PetCO2</p>
                                    </div>
                                </div>
                                <div className="signal-c-child">
                                    <div class="custom-radios">
                                        <input type="checkbox" id="3" />
                                        <label for="3">
                                            <span className="redious">
                                            </span>
                                        </label>
                                    </div>
                                    <div className="caption-signal">
                                        <p>Capnia Index</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="wrp-signal-content">
                                <div className="signal-c-child">
                                    <div class="custom-radios">
                                        <input type="checkbox" id="Breaths" />
                                        <label for="Breaths">
                                            <span className="redious">
                                            </span>
                                        </label>
                                    </div>
                                    <div className="caption-signal">
                                        <p>Breaths per minute</p>
                                    </div>
                                </div>
                                <div className="signal-c-child">
                                    <div class="custom-radios">
                                        <input type="checkbox" id="Beat" />
                                        <label for="Beat" >
                                            <span className="redious">
                                            </span>
                                        </label>
                                    </div>
                                    <div className="caption-signal">
                                        <p>Beat to Beat Heartrate</p>
                                    </div>
                                </div>
                                <div className="signal-c-child">
                                    <div class="custom-radios">
                                        <input type="checkbox" id="RSA" />
                                        <label for="RSA">
                                            <span className="redious">
                                            </span>
                                        </label>
                                    </div>
                                    <div className="caption-signal">
                                        <p>RSA amplitude</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="choose-signals mrt-sessions">
                        <p>Choose Sessions</p>
                    </div>
                    <ul className="signals-list">
                        <li>
                            <div className="row">

                                {
                                    session.length > 0 &&  session.map((v,i) => {
                                        return (
                                            <div className="col-md-3">
                                            <div class="custom-radios">
                                                <input type="checkbox" id="4" />
                                                <label for="4">
                                                    <span className="redious">
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="caption-signal">
                                                <p>{v.name}</p>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                                 
                                
                            </div>
                        </li>
                    </ul>
                    {
                        session.length > 0 &&
                    <div className='d-flex justify-content-around mt-3'>
                            {/* <button className='lightbtn w-100'   >Cancel</button> */}
                            <button className='darktbtn w-100 ml-1'    >Save</button>
                        </div>
                    }

                </div>
            </div>

        </div>
    )
}

export default Createmultisession;