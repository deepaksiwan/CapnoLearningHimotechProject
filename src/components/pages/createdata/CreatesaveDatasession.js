import React, { Component, useEffect, useRef, useState } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import { API_URL } from "../../../config";

import { csv } from 'd3';

const CreatesaveDatasession = () => {
    const accessToken = localStorage.getItem('accessToken');
    const session = localStorage.getItem('selectedSession');
 
    const [sessions, setsessions] = useState([]);
    const [emgAvg, setEmgAvg] = useState(false);
    const [emgRaw, setEmgRaw] = useState(false);
    
    useEffect(() => {
        Report();


    }, []);


    const Report = () => {
        fetch(API_URL+"/configured/report?type=1",
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
                    // console.warn("result", resp);
                    setsessions(resp.sessions)
                    getCsv()
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
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const getCsv = () => {
        fetch(API_URL+"/session/data?session_id=" + session + "&signal_name=emg3_wave",
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
                    // console.warn("result", resp);
                    if (resp.sessions[0]) {
                        // setCsvFile(resp.sessions[0].sessiondata)
                        getData(resp.sessions[0].sessiondata,"raw")
                    }


                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }
        })


            fetch(API_URL+"/session/data?session_id=" + session + "&signal_name=emg1_avg",
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
                    // console.warn("result", resp);
                    if (resp.sessions[0]) {
                        // setCsvFile(resp.sessions[0].sessiondata)
                        getData(resp.sessions[0].sessiondata,"avg")
                    }


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


        async function getData(_csvFile,_stat) {
           
            
            //   console.log(userTimeOffset);
            csv('https://capnolearning.com/webroot/csvupl/' + _csvFile).then(data => {
                if(data.length > 2){
                    if(_stat == 'avg'){
                        setEmgAvg(true);
                    }
                    else if(_stat == 'raw'){
                        setEmgRaw(true)
                    }
                }
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
                    <div className="groupreport-list-head">
                        <h3>Pre-configured Reports</h3>
                    </div>
                    <ul className="groupreport-list">

                        {
                            sessions.map((sessions) =>
                                {
                                    if((sessions.id == 46 && emgAvg) || (sessions.id == 47 && emgRaw) || (sessions.id != 46 && sessions.id != 47) ){
                                    return(
                                        <li><a href={"/create/report/0/" + sessions.id + "/" + session + "/all/" + sessions.id}   >{sessions.name}</a></li>
                                    )
                                    }
                                }
                            )
                        }


                    </ul>
                </div>
            </div>

        </div>
    )
}

export default CreatesaveDatasession;