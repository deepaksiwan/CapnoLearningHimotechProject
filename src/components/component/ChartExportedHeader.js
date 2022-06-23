import React, { Component, useEffect, useRef, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
//import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
//import { ContactPageSharp } from '@mui/icons-material';
const ChartExportedHeader = (props) => {
    const accessToken = localStorage.getItem('accessToken');
    //const [sessions, setsessions] = useState([]);
    const sessionid = localStorage.getItem('selectedSession');
    const [records, setrecords] = useState([]);
    // const [sessionDate, setsessionDate] = useState([]);
    const [clientName, setClientName] = useState([]);
    const [trainerName, setTrainerName] = useState([]);
    const [sessioninfo, setsessioninfo] = useState([]);
    const reportconfig = useRef();
    const { config, session, record } = useParams();
    // const [selectfolder, setselectfolder] = useState(false)
    // const [Showfiles, setShowfiles] = useState(false)
    //  const [selectedfiles, setselectedfiles] = useState([])
    //const [fileSelected, setfileSelected] = useState([])
    const fileupload = props.fileupload;
    const downloadImage = props.downloadImage;
    useEffect(() => {
        // Report();
        getRcord();
        clientnameUpdate();
        // SaveImage();
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
    const reportconfigupdate = () => {
        let _configId = reportconfig.current.value;
        window.location.href = "/create/report/" + _configId
    }
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    // const choosefolder = (event) => {
    //     setselectfolder(true)
    //     setShowfiles(true)
    //     setselectedfiles([])
    //     var files = event.target.files;
    //     console.log("files result", files)
    //     var temp = [];
    //     for (var i = 0; i < files.length; i++) {
    //         //temp.push(files[i].webkitRelativePath);
    //         temp.push(files[i].name);
    //         console.log("array result", temp);
    //     };
    //     setselectedfiles(temp);
    // };
    // const ChooseFolder = (event) => {
    //     file = event.target.file[0]
    //     console.log("check file", file)
    // }
    return (
        <div className="bg-c-header">
            <div className="wrp-chart-header">
                <div className="chart-header-c1">
                    <div className="wrp-action">
                        <div className="action-opt" >
                            <p>Actions Options</p>
                            <ul className='action-list2' >
                                <li><a href="#"><i class="fa fa-upload" aria-hidden="true"></i></a></li>
                                {/* <li><a href="#"><i class="fa fa-sticky-note" aria-hidden="true"></i></a></li> */}
                                <li><a href="#"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></li>
                                {/* <li><a href="#" for="file"><i class="fa fa-download" aria-hidden="true"></i></a>
                                </li> */}
                                <li>
                                    <label for="icon"><i class="fa fa-download" aria-hidden="true"></i>
                                    </label>
                                    <input type="file" id="icon" name=" " style={{ display: "none" }} onChange={fileupload} webkitdirectory="true"
                                    />
                                </li>
                                {/* <li><a href="#"><i class="fa fa-sliders" aria-hidden="true"></i></a></li> */}
                                {/* <li><a href="#"><i class="fa fa-bookmark" aria-hidden="true"></i></a></li> */}
                            </ul>
                        </div>
                        <div className="view-opt" >
                            <p>Viewing Options</p>
                            <ul className='action-list3'>
                                <li><a href="#" onClick={downloadImage}><i class="fa fa-file-text" aria-hidden="true"></i></a></li>
                                {/* <li><a href="#"><i class="fa fa-video-camera" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-step-backward" aria-hidden="true"></i></a></li> */}
                                <li><a href="#"><i class="fa fa-table"></i></a></li>
                                <li><a href="#"><i class="fa fa-question-circle" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-clock-o" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="chart-header-c4">
                    <div className=''>
                        {/* <p><input className="form-control" onClick={fileupload} type="file" webkitdirectory="true" directory
                        /></p> */}
                    </div>
                    <div className="dashboard-back " >
                        <Link to="/"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Dashboard</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChartExportedHeader