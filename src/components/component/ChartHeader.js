import React, { Component, useEffect, useRef, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { API_URL } from '../../config';

const ChartHeader = (props) => {
    const accessToken = localStorage.getItem('accessToken');
    const [sessions, setsessions] = useState([]);
    const sessionid = localStorage.getItem('selectedSession');
    const [records, setrecords] = useState([]);
    const [sessionDate, setsessionDate] = useState([]);
    const [clientName, setClientName] = useState([]);
    const [trainerName, setTrainerName] = useState([]);
    const [sessioninfo, setsessioninfo] = useState([]);
    const reportconfig = useRef();
    const { config, session, record } = useParams();




    useEffect(() => {
        Report();
        getRcord();
        clientnameUpdate();
        getScreenshort();

    }, []);

    const SaveScreenshort = () => {
        html2canvas(document.getElementById("chart-table")).then(function (canvas) {

            let session_id = session;
            let type = 0;
            let status = 1;

            let dataimg = canvas.toDataURL('image/png')
            const doc = new jsPDF();

            for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
                doc.setPage(pageNumber)
                doc.setTextColor(0, 0, 0);
                doc.text('Capnolearning Report', 10, 10,
                    { styles: { fontSize: 20, fontWeight: 'bold' } })
                doc.setDrawColor(0, 0, 0);
                doc.line(10, 15, 600, 15);
                doc.setFontSize(10)

                doc.text(sessionDate, 35, 25)
                doc.text(clientName, 23, 30);
                doc.text(trainerName, 25, 35);
                doc.setFont(undefined, 'bold');
                doc.text("Session Date:", 10, 25)
                doc.text("Client:", 10, 30);
                doc.text("Trainer:", 10, 35);
                // doc.setFont(undefined, 'bold')
                doc.addImage(dataimg, 5, 45, 200, 110);
            }
            doc.save(sessionDate + ".pdf");


            let formData = new FormData();
            formData.append('data', dataimg);
            formData.append('type', type);
            formData.append('status', status);
            formData.append('session_id', session_id);
            formData.append('pdf_name', sessionDate);


            fetch(API_URL + "/save/screenshort", {
                method: 'POST',
                headers: {

                },
                body: formData
            }).then((result) => {
                result.json().then((resp) => {


                })
            })


        });

    }

 


    const getScreenshort = () => {
        fetch(API_URL + "/get/screenshort/" + session,
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
                    setsessionDate(resp.sessionDate)
                    setClientName(resp.firstname + " " + resp.lastname)
                    setTrainerName(resp.data[0].firstname + " " + resp.data[0].lastname)

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

    const reportconfigupdate = () => {
        let _configId = reportconfig.current.value;
        window.location.href = "/create/report/" + _configId
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
                            <ul className='action-list'>
                                <li><a href="#"><i class="fa fa-upload" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-sticky-note" aria-hidden="true"></i></a></li>
                                <li><a href="#" onClick={SaveScreenshort}><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-sliders" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-bookmark" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                        <div className="view-opt">
                            <p>Viewing Options</p>
                            <ul className='action-list'>
                                <li><a href="#"><i class="fa fa-file-text" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-video-camera" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-step-backward" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-table"></i></a></li>
                                <li><a href="#"><i class="fa fa-question-circle" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-clock-o" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="chart-header-c2">
                    <div className="wrp-select-row">
                        <div className="select-row">
                            <select className="selected-raw-c" onChange={reportconfigupdate} ref={reportconfig}>

                                {
                                    sessions.map((sessions) => {
                                        return (
                                            <option selected={sessions.id == config ? true : false} value={sessions.id}>{sessions.name}</option>
                                        )

                                    })
                                }

                            </select>
                        </div>
                        <div className="select-row">
                            <select>
                                <option>Default</option>
                                <option>Alternate </option>
                            </select>
                        </div>
                        <div className="select-row">
                            <select value={record} onChange={(e) => window.location.href = e.target.value}>
                                <option value={'all'}   >All Records</option>

                                {
                                    records.map((records) => {
                                        return (
                                            <option value={records.number}>{records.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                    </div>
                </div>
                <div className="chart-header-c3">
                    <ul className="username-list">
                        {sessioninfo.map((clientName) => {
                            return (
                                <li><a href="#"><i class="fa fa-user" aria-hidden="true"></i>{clientName.client_firstname}{clientName.client_lastname}</a></li>
                            )
                        }
                        )}
                        {sessioninfo.map((trainerName) => {
                            return (
                                <li><a href="#"><i class="fa fa-user-md" aria-hidden="true"></i> {trainerName.trainer_firstname} {trainerName.trainer_lastname}</a></li>
                            )
                        }
                        )}

                        {sessioninfo.map((sessionName) => {
                            return (
                                <li><a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> {sessionName.name}</a></li>
                            )
                        }
                        )}
                    </ul>
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

export default ChartHeader

