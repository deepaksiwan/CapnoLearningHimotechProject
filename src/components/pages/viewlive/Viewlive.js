import React, {useEffect,useState} from "react";
import {Link,useParams, Router} from 'react-router-dom';
import i18n from "i18next";
import { jsPDF } from "jspdf";
import download from 'downloadjs';
import { useTranslation, initReactI18next } from "react-i18next";
import { API_URL } from "../../../config";
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

       
        fetch(API_URL+"/session/data/type?type=3&session_id=" + sessionid,
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

       
        fetch(API_URL+"/session/data/type?type=4&session_id=" + sessionid,
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

       
        fetch(API_URL+"/session/info?session_id=" + sessionid,
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

    const downloadlivesessionImage = () => {
        let dataType = 3;
        fetch(API_URL + "/get/live/sessionimage/download/" + sessionid + "/" + dataType,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/pdf"
    
                },
            }
        ).then(res => res.blob())
            .then(response => {
                //Create a Blob from the PDF Stream
              
                const file = new Blob([response], {
                    type: "application/pdf"
                });
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                // window.open(fileURL);
                download(fileURL);
    
            })
    }

   


    const ViewlivesessionImage = () => {

        let dataType = 3;

        fetch(API_URL + "/get/live/sessionimage/" + sessionid + "/" + dataType,
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
                  
                    let _clientName = resp.firstname + " " + resp.lastname ;
                    let _trainerName = resp.data[0].firstname+ " " + resp.data[0].lastname ;
                    let _sessionDate = resp.sessionDate;
                    let _pdfname = resp.pdfname;
                    Viewliveimg(_clientName , _trainerName , resp.result,_sessionDate)

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

    const Viewliveimg = (_clientName,_trainerName, _image, _sessionDate,_pdfname)=>{
      
        const doc = new jsPDF();
        for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
            doc.setPage(pageNumber)
        doc.setTextColor(0, 0, 0);
        doc.text('Capnolearning Report', 10, 10,
            {styles:{ fontSize: 20,fontWeight: 'bold'}})
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 15, 600, 15);
        doc.setFontSize(10)
        
        doc.text(_sessionDate ,35,25)
        doc.text( _clientName,23,30);
        doc.text( _trainerName,25,35);
        doc.setFont(undefined, 'bold');
        doc.text("Session Date:" ,10,25)
        doc.text("Client:" ,10,30);
        doc.text("Trainer:",10,35);
        // doc.setFont(undefined, 'bold')
        doc.addImage(_image, 5, 45,200,110);
   
        }
    
        window.open(doc.output('bloburl'))
    }

    const downloadlivesessionnotes = () => {

        let dataType = 4;

        fetch(API_URL + "/get/live/sessionimage/" + sessionid + "/" + dataType,
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
                  
                    let _clientName = resp.firstname + " " + resp.lastname ;
                    let _trainerName = resp.data[0].firstname+ " " + resp.data[0].lastname ;
                    let _sessionDate = resp.sessionDate;
                    let _pdfname = resp.pdfname;
                    downloadlivenote(_clientName , _trainerName , resp.result,_sessionDate)

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

    const downloadlivenote = (_clientName,_trainerName, _notes, _sessionDate)=>{
      
        const doc = new jsPDF();
        doc.setTextColor(0, 0, 0);
        doc.text('Capnolearning Report', 10, 10,
            {styles:{ fontSize: 20,fontWeight: 'bold'}}) 
       
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 15, 600, 15);
        doc.setFontSize(10)
        doc.text(_sessionDate ,35,25)
        doc.text( _clientName,23,30);
        doc.text( _trainerName,25,35);
        doc.setFont(undefined, 'bold');
        doc.text("Session Date:" ,10,25)
        doc.text("Client:" ,10,30);
        doc.text("Trainer:",10,35);
        doc.setFont(undefined, 'normal');
        doc.text(_notes, 10,52);
        doc.setFontSize(13)
        doc.text('Session Report Notes', 10, 45, {styles:{ fontSize: 13,fontWeight: 'bold'}})
        doc.line(10, 47, 55, 47);
        doc.save(_sessionDate +".pdf");
    }


    const Viewlivesessionnotes = () => {

        let dataType = 4;

        fetch(API_URL + "/get/live/sessionimage/" + sessionid + "/" + dataType,
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
                  
                    let _clientName = resp.firstname + " " + resp.lastname ;
                    let _trainerName = resp.data[0].firstname+ " " + resp.data[0].lastname ;
                    let _sessionDate = resp.sessionDate;
                    let _pdfname = resp.pdfname;
                    Viewlivenote(_clientName , _trainerName , resp.result,_sessionDate)

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

    const Viewlivenote = (_clientName,_trainerName, _notes, _sessionDate)=>{
      
        const doc = new jsPDF();
        doc.setTextColor(0, 0, 0);
        doc.text('Capnolearning Report', 10, 10,
            {styles:{ fontSize: 20,fontWeight: 'bold'}}) 
       
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 15, 600, 15);
        doc.setFontSize(10)
        doc.text(_sessionDate ,35,25)
        doc.text( _clientName,23,30);
        doc.text( _trainerName,25,35);
        doc.setFont(undefined, 'bold');
        doc.text("Session Date:" ,10,25)
        doc.text("Client:" ,10,30);
        doc.text("Trainer:",10,35);
        doc.setFont(undefined, 'normal');
        doc.text(_notes, 10,52);
        doc.setFontSize(13)
        doc.text('Session Report Notes', 10, 45, {styles:{ fontSize: 13,fontWeight: 'bold'}})
        doc.line(10, 47, 55, 47);
        window.open(doc.output('bloburl'))
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
                                <div className="create-list-box"><a href="#" className={(sessions.length == 0 || selectedSession === "null")? "deactivate" : ""} onClick={() => Viewlivesessionnotes()}>{t('View-Live-Session-Notes')}</a></div>
                            </li>
                            <li>
                                <div className="create-list-box"><a href="#" className={(sessions.length == 0 || selectedSession === "null")? "deactivate" : ""} onClick={() => downloadlivesessionnotes()}>{t('Download-Live-Session-Notes')}</a></div>
                            </li>
                            <li>
                                <div className="create-list-box"><a href="#" className={(sessions.length == 0 || selectedSession === "null")? "deactivate" : ""} onClick={() => ViewlivesessionImage()}>{t('View-Live-Session-Images')}</a></div>
                            </li>
                            <li>
                                <div className="create-list-box"><a href="#" className={(sessions.length == 0 || selectedSession === "null")? "deactivate" : ""} onClick={() => downloadlivesessionImage()}>{t('Download-Live-Session-Images')}</a></div>
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