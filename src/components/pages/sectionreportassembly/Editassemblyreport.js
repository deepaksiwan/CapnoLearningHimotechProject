import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import i18n from "i18next";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';
import report from '../../images/report.png'
import { API_URL } from "../../../config";
import { map } from "jquery";

const Editassemblyreport = () => {

    const { t } = useTranslation();
    const accessToken = localStorage.getItem('accessToken');
    const [pdfs, setpdfs] = useState([]);
    const sessionid = localStorage.getItem('selectedSession');
    const Clientid = localStorage.getItem('selectedClient');
    const [selectedClient, setSelectedClient] = useState();
    const [selectedSession, setSelectedSession] = useState();
    const [selectedGroup, setselectedGroup] = useState();
    const [selectedHomework, setselectedHomework] = useState();
    const [userType, setUserType] = useState();
    const [PdfReport, setPdfReport] = useState([]);
    const [livessesionNotes, setLivessesionNotes] = useState([]);
    const [livessesionImages, setLivessesionImages] = useState([]);
    const [reportSessionNotes, setReportSessionNotes] = useState([]);
    const [clientName, setClientName] = useState([]);
    const [trainerName, setTrainerName] = useState([]);
    const [sessionDate, setSessionDate] = useState([]);
    const [completeForm, setCompleteForm] = useState([]);
    const pdfUrl = "https://capnolearning.com/webroot/client_forms/";
    const [dataPdf, setDataPdf] = useState([]);
    const [liveImg, setLiveImg] = useState([]);
    const [assemblydata, setAssemblydata] = useState([]);
    const [PdfArrays, setPdfArrays] = useState([]);
    const [livesessectionArray, setLivesessectionArray] = useState([]);

    

    const reportName = useRef();
    const summaryReportDes = useRef();
    const { id } = useParams();

    useEffect(() => {
        getNames();
        getassemblySetionReport();
        livesessionNotes();
        livesessionImages();
        reportsesionnotes();
        getCompleteforms();
        listAssemblyReportbyid()



    }, []);


    const listAssemblyReportbyid = () => {

        fetch(API_URL + "/assembly/list/by/" + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'

                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {

                    setAssemblydata(resp.data[0]);

                    const pdfdatareport = resp.data[0].report_desc;
                    if(pdfdatareport != null){
                        const pdfArray = JSON.parse(pdfdatareport);
                        setPdfArrays(pdfArray)
                    }

                    const liveSessionreport = resp.data[0].session_image_desc;
                    if(liveSessionreport != null){
                        const liveSessionreportArra = JSON.parse(liveSessionreport);
                        setLivesessectionArray(liveSessionreportArra)
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





    // if(pdfArray.length = 0){
    //     for (var index = 0; index < pdfArray.length; index++) {
    //         setPdfArray(pdfArray[index]);
    //      }
    // }




    const handlepdfDescription = index => e => {

        console.log('index: ' + index);
        console.log('property name: ' + e.target.value);
        let newArr = [...dataPdf];
        newArr[index] = e.target.value;
        setDataPdf(newArr);
    }

    const handleLiveDescription = index => e => {

        console.log('index: ' + index);
        console.log('property name: ' + e.target.value);
        let newArr = [...liveImg];
        newArr[index] = e.target.value;
        setLiveImg(newArr);
    }



    const getNames = () => {

        fetch(API_URL + "/get/names/" + id,
            {
                method: 'GET',
                headers: {

                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {

                    setClientName(resp.firstname + " " + resp.lastname);
                    setSessionDate(resp.sessionDate);
                    setTrainerName(resp.data[0].firstname + " " + resp.data[0].lastname);



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

    const getassemblySetionReport = () => {

        fetch(API_URL + "/get/assembly/report/" + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'

                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {

                    setPdfReport(resp.data);

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

    const livesessionNotes = () => {

        fetch(API_URL + "/get/livenotes/" + id,
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

                    setLivessesionNotes(resp.data);



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

    const livesessionImages = () => {

        fetch(API_URL + "/get/assembly/liveimages/" + id,
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
                    setLivessesionImages(resp.data);



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

    const reportsesionnotes = () => {

        fetch(API_URL + "/get/assembly/Sessionnotes/" + id,
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

                    setReportSessionNotes(resp.data);



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


    const getCompleteforms = () => {

        fetch(API_URL + "/get/assembly/complete/form/" + id + "/" + Clientid,
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

                    setCompleteForm(resp.data);



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


    const UpdateAssemblyreport = () => {

        let data = {};

        data['name'] = reportName.current.value;
        data['summary'] = summaryReportDes.current.value;
        data['report_desc'] = dataPdf;
        data['session_image_desc'] = liveImg;


        fetch(API_URL + "/update/assembly/report/" + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.log("results", resp);

                });
            }
            else {
                alert("Network Error")
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

                    <div className="assembly-box" id="takescreenassembly">
                        <div className="client-names-wrp">
                            <div className="cients-name-content">
                                <p><i class="fa fa-user" aria-hidden="true"></i> <span>Client:</span> {clientName}</p>
                            </div>
                            <div className="cients-name-content">
                                <p><i class="fa fa-user-md" aria-hidden="true"></i> <span>Trainer:</span> {trainerName}</p>
                            </div>
                            <div className="cients-name-content">
                                <p><i class="fa fa-calendar" aria-hidden="true"></i> <span>Date:</span> {sessionDate}</p>
                            </div>
                        </div>
                        <div className="report-input">
                            <label>Name of Report</label>
                            <input placeholder="Name of Report" defaultValue={assemblydata.name} ref={reportName} />
                        </div>
                        <div className="text-areat-report">
                            <label>Summary of Report</label>
                            <textarea ref={summaryReportDes} defaultValue={assemblydata.summary} ></textarea>
                        </div>

                        {


                            PdfReport.length > 0 && PdfReport.map((pdfV, index) => {



                                return (
                                    <>
                                        <div className="live-section-img">
                                            <label>PDF Report ({index + 1})</label>
                                            <img src={pdfV.data} />
                                        </div>

                                        <div className="text-areat-report">
                                            <label>PDF Report Description ({index + 1})</label>
                                            <textarea key={index} defaultValue={(PdfArrays[index]? PdfArrays[index] : "")} onChange={handlepdfDescription(index)}></textarea>
                                            
                                        </div>

                                    </>
                                )
                            })

                        }

                        {
                            livessesionNotes.length > 0 && livessesionNotes.map((val, i) => {
                                return (
                                    <div className="report-notes">
                                        <>
                                            <label>Live Session Notes</label>
                                            <p>{val.sessiondata}</p>
                                        </>
                                    </div>
                                )
                            })
                        }

                        {
                            livessesionImages.length > 0 && livessesionImages.map((val, index) => {
                                return (
                                    <>
                                        <div className="live-section-img">
                                            <label>Live Session Image ({index + 1})</label>
                                            <img src={val.sessiondata} />
                                        </div>
                                        <div className="text-areat-report">
                                            <label>Live Session Image Description ({index + 1})</label>
                                            <textarea key={index} defaultValue={(livesessectionArray[index]? livesessectionArray[index] : "")} onChange={handleLiveDescription(index)}></textarea>
                                            
                                        </div>
                                    </>
                                )
                            })

                        }
                        {
                            reportSessionNotes.length > 0 && reportSessionNotes.map((val, i) => {
                                return (
                                    <div className="report-notes">
                                        <>
                                            <label>Report Notes </label>
                                            <p>{val.notes}</p>
                                        </>
                                    </div>
                                )
                            })
                        }


                        <p className="complete-forms"><b>Completed Forms</b></p>

                        {
                            completeForm.length > 0 && completeForm.map((val, index) => {
                                return (
                                    <>
                                        <div className="live-section-img">
                                            <label>{val.forms}</label>
                                            <embed src={pdfUrl + val.form} width="100%" height="1000px" />

                                        </div>

                                    </>
                                )
                            })

                        }

                        <div className="assembly-btn-wrp assembly-btn-wrp2">
                            <div className="assembly-btn"><a href="#" onClick={UpdateAssemblyreport} >SAVE REPORT</a></div>
                            <div className="assembly-btn ml-assembly"><a href="#">SAVE & DOWNLOAD PDF</a></div>
                            <div className="assembly-btn ml-assembly"><a href="#">GO TO REPORTS LIST</a></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Editassemblyreport;