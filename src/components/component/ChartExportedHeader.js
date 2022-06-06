import React, { Component, useEffect, useRef, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';

const ChartExportedHeader = (props) => {
    const accessToken = localStorage.getItem('accessToken');
    //const [sessions, setsessions] = useState([]);
    const sessionid = localStorage.getItem('selectedSession');
    const [records, setrecords] = useState([]);
    const [sessioninfo, setsessioninfo] = useState([]);
    const reportconfig = useRef();
    const { config, session , record } = useParams();
     
 
     

    useEffect(() => {
        // Report();
        getRcord();
        clientnameUpdate();

    }, []);


    const getRcord = () => {
        fetch("https://capno-api.herokuapp.com/api/session/record?session_id=" + sessionid,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.warn("result", resp);
                    setrecords(resp.records)

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }


        })
    }

    // const Report = () => {
    //     fetch("https://capno-api.herokuapp.com/api/configured/report?type=1",
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-access-token': accessToken,
    //             },
    //         }
    //     ).then((response) => {
    //         if (response.status == 200) {
    //             response.json().then((resp) => {
    //                 // console.warn("result", resp);
    //                 setsessions(resp.sessions)

    //             });
    //         }
    //         else if (response.status == 401) {
    //             logout()
    //         }
    //         else {
    //             alert("network error")
    //         }


    //     })
    // }

    const clientnameUpdate = () => {
        fetch("https://capno-api.herokuapp.com/api/session/info?session_id=" + sessionid,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.warn("result", resp);
                    setsessioninfo(resp.session)

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }


        })
    }

    const reportconfigupdate =()=>{
        let _configId = reportconfig.current.value;
        window.location.href="/create/report/" + _configId
    }
    
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <div className="bg-c-header">
            <div className="wrp-chart-header">
                <div className="chart-header-c1">
                    <div className="wrp-action">
                        <div className="action-opt">
                            <p>Actions Options</p>
                            <ul className='action-list2' >
                                <li><a href="#"><i class="fa fa-upload" aria-hidden="true"></i></a></li>
                                {/* <li><a href="#"><i class="fa fa-sticky-note" aria-hidden="true"></i></a></li> */}
                                <li><a href="#"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></li>
                                {/* <li><a href="#"><i class="fa fa-sliders" aria-hidden="true"></i></a></li> */}
                                {/* <li><a href="#"><i class="fa fa-bookmark" aria-hidden="true"></i></a></li> */}
                            </ul>
                        </div>
                        <div className="view-opt">
                            <p>Viewing Options</p>
                            <ul className='action-list2'>
                                {/* <li><a href="#"><i class="fa fa-file-text" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-video-camera" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-step-backward" aria-hidden="true"></i></a></li> */}
                                <li><a href="#"><i class="fa fa-table"></i></a></li>
                                <li><a href="#"><i class="fa fa-question-circle" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-clock-o" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="chart-header-c4">
                    <div className="dashboard-back">
                        <Link to="/"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Dashboard</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartExportedHeader

