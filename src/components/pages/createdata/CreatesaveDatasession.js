import React, { Component, useEffect, useRef, useState } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';


const CreatesaveDatasession = () => {
    const accessToken = localStorage.getItem('accessToken');
    const session = localStorage.getItem('selectedSession');
 
    const [sessions, setsessions] = useState([]);

    useEffect(() => {
        Report();


    }, []);


    const Report = () => {
        fetch("https://capno-api.herokuapp.com/api/configured/report?type=1",
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
    return (
        <div className="demodata-bg">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="groupreport-list-head">
                        <h3>Preconfigured Group Reports</h3>
                    </div>
                    <ul className="groupreport-list">

                        {
                            sessions.map((sessions) =>
                                {
                                    return(
                                        <li><a href={"/create/report/" + sessions.id + "/" + session + "/all" } >{sessions.name}</a></li>
                                    )
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