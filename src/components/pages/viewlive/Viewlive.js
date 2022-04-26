import React, {useEffect,useState} from "react";
import {Link,useParams, Router} from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';

const Viewlive = () => {

    const { t } = useTranslation();
    const accessToken = localStorage.getItem('accessToken');
    const sessionid = localStorage.getItem('selectedSession');
    const [sessions, setsessions] = useState([]);
    const [session, setsession] = useState([]);
    const [selectedSession,setSelectedSession] = useState() ;


    useEffect(() => {

        setInterval(() => {
            setSelectedSession(localStorage.getItem('selectedSession'));
      
        }, 1000);

    }, []); 

    useEffect(() => {
        livesessionNote();
        livesessionImage();
        zoomRecording();
        
    },[selectedSession])


    const livesessionNote = () => {

       
        fetch("https://capno-api.herokuapp.com/api/session/data/type?type=3&session_id=" + sessionid,
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
                    setsessions(resp.sessions);
                    // let len = setsessions.length;
                    //   console.warn(len);
                   

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

    const livesessionImage = () => {

       
        fetch("https://capno-api.herokuapp.com/api/session/data/type?type=4&session_id=" + sessionid,
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
                    setsessions(resp.sessions);
                    // let len = setsessions.length;
                    //   console.warn(len);
                   

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
    const zoomRecording = () => {

       
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
                    console.log("result", resp);
                    if(resp.session.length >0){
                        setsession(resp.session[0].link);

                    }
                    // let len = session.length;
                    //   console.warn(len);
                   

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
        alert("You Logout successful")
    }

    return (
        <div>
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <Filter />

                    <div className="create-section">
                        <ul className="create-list">
                            <li>
                                <div className="create-list-box"><a href="#" className={(sessions.length == 0 || selectedSession === "null")? "deactivate" : ""} >{t('View-Live-Session-Notes')}</a></div>
                            </li>
                            <li>
                                <div className="create-list-box"><a href="#" className={(sessions.length == 0 || selectedSession === "null")? "deactivate" : ""}>{t('Download-Live-Session-Notes')}</a></div>
                            </li>
                            <li>
                                <div className="create-list-box"><a href="#" className={(sessions.length == 0 || selectedSession === "null")? "deactivate" : ""}>{t('View-Live-Session-Images')}</a></div>
                            </li>
                            <li>
                                <div className="create-list-box"><a href="#" className={(sessions.length == 0 || selectedSession === "null")? "deactivate" : ""}>{t('Download-Live-Session-Images')}</a></div>
                            </li>
                            <li>
                                <div className="create-list-box" >
                                    {/* {session} */}
                                    {
                                       ( session == null || selectedSession === "null") ?
                                        <a href="#" data-toggle="modal" data-target="#viewModal"  >{t('View/Link-Zoom-Recordings')}</a>
                                        :
                                        <a href="#" data-toggle="modal" data-target="#viewleModal1"  >{t('View/Link-Zoom-Recordings')}</a>

                                    }   
                                    </div>
                            </li>
                        </ul>
                        <div class="modal fade" id="viewleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Session Zoom Recording</h5>
                                        {session}
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="addlink-input">
                                       <input placeholder="Add link here" />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="close-btn" data-dismiss="modal">Close</button>
                                        <button type="button" class="close-btn">Add link</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="viewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Session Zoom Recording</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="addlink-input">
                                       <input placeholder="Add link here" />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="close-btn" data-dismiss="modal">Close</button>
                                        <button type="button" class="close-btn">Add link</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Viewlive;