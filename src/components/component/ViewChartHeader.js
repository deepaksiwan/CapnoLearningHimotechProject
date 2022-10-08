import React, { Component, useEffect, useRef, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';

import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { API_URL } from '../../config';
import ReactTooltip from 'react-tooltip';
import {
    Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody, Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from "reactstrap";

import ReactExport from "react-export-excel";
import { group } from 'd3';


const ViewChartHeader = (props) => {
    const accessToken = localStorage.getItem('accessToken');
    const [sessions, setsessions] = useState([]);

    const sessionid = localStorage.getItem('selectedSession');
    const clientId = localStorage.getItem('selectedClient');
    const [action, setAction] = useState();

    const [reportDetails, setReportDetails] = useState([]);
    const [records, setrecords] = useState([]);
    const [sessionDate, setsessionDate] = useState([]);
    const [clientName, setClientName] = useState([]);
    const [trainerName, setTrainerName] = useState([]);
    const [sessioninfo, setsessioninfo] = useState([]);
    const setSessionDate = props.setSessionDate;
    const [alternate, setAlternate] = useState([]);
    const [multipleData, SetMultipleData] = useState([]);
    const [zoomlinks, setZoomlinks] = useState([])
    const [livesessionsnotes, setlivesessionsnotes] = useState([]);
    const [Notesid, setNotesid] = useState()
    const group = props.group;
    const reportconfig = useRef();
    const alternateconfig = useRef();
    const { session, reportId, record, showclock } = useParams();

    const [openModal, setOpenModal] = useState(false);
    const openToggleModal = () => setOpenModal(!openModal);

    const [settingModal, setSetting] = useState(false);
    const settingToggleModal = () => setSetting(!settingModal);

    const [livesessionmultidataModal, setLivesessionmultidataModal] = useState(false);
    const livesessionMultidataModalToggle = () => setLivesessionmultidataModal(!livesessionmultidataModal);

    const [zoomMultidataModal, setZoomMultidataModal] = useState(false);
    const zoomMultidataModalToggle = () => setZoomMultidataModal(!zoomMultidataModal);

    const [viewlivesessionMultidataModal, setViewlivesessionMultidataModal] = useState(false);
    const viewlivesessionMultidataModalToggle = () => setViewlivesessionMultidataModal(!viewlivesessionMultidataModal);


    const [livesessionnotesModal, setLivesessionnotesModal] = useState(false);
    const livesessionnotesToggleModal = () => setLivesessionnotesModal(!livesessionnotesModal);

    const [zoomlinkModal, setZoomlinkModal] = useState(false);
    const zoomlinkToggleModal = () => setZoomlinkModal(!zoomlinkModal);

    const [nofoundliveimgModal, setNofoundliveimg] = useState(false);
    const nofoundliveimgToggleModal = () => setNofoundliveimg(!nofoundliveimgModal);


    const [exportModal, setExportModal] = useState(false);
    const exportModalToggle = () => setExportModal(!exportModal);




    const [notesModal, setNotesModal] = useState(false);
    const notesModalToggle = () => setNotesModal(!notesModal);

    const [liveNotes, setLiveNotes] = useState(null);

    const [zoomModal, setZoomModal] = useState(false);
    const zoomModalToggle = () => setZoomModal(!zoomModal);

    const [zoomRecording, setZoomRecording] = useState(null);


    const [takeNotesModal, setTakeNotesModal] = useState(false);
    const takeNotesToggle = () => setTakeNotesModal(!takeNotesModal);

    const setShowActualTime = props.setShowActualTime;
    const showActualTime = props.showActualTime;

    const setShowSignalStat = props.setShowSignalStat;
    const showSignalStat = props.showSignalStat;
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const userId = localStorage.getItem('user_id');

    const setSavingReportConfirmation = props.setSavingReportConfirmation;



    const setNotes = props.setNotes;
    const notes = props.notes;
    const exportExcel = props.exportExcel;
    const graphs = props.graphs;

    const signalStat = props.signalStat;
    const saveReportConfig = props.saveReportConfig;
    const setrequestProcessingModal = props.setrequestProcessingModal;
    const setrequestProcesedModal = props.setrequestProcesedModal;


    const [open, setOpen] = useState('');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };


    useEffect(() => {
        // console.log("mydata" , signalStat);
    }, signalStat)
    useEffect(() => {
        Report();
        getRcord();
        clientnameUpdate();
        getLiveNotes();
        // getAlternate() ;
        getReportDetails();


        // getZoomRecording() ; 
        // getScreenshort();

    }, []);

    useEffect(() => {
        // getAlternate() ;
        getMultiData();



    }, [])







    // get createmultidata


    const getMultiData = () => {
        fetch(API_URL + "/get/create/multipledata/" + reportId,
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
                    SetMultipleData(resp.data)

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        })
    }

    const getZoomLinkbyid = (id) => {
        setOpenModal(true)
        fetch(API_URL + "/get/zoom/link/by/" + id,
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
                    // console.log("result", resp);

                    setZoomlinks(resp.data[0])
                    setOpenModal(false)
                    if (resp.data[0].zoom_link.length > 0) {
                        window.open(resp.data[0].zoom_link);
                    }


                });
            }
            else if (response.status == 202) {
                zoomlinkToggleModal();
                setZoomMultidataModal(false)
                setOpenModal(false)
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        })
    }

    // get live session notes


    const handleliveNotes = (id) => {



        setOpenModal(true)
        let dataType = 4;

        fetch(API_URL + "/get/live/sessionimage/" + id + "/" + dataType,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                setOpenModal(false)
                response.json().then((resp) => {
                    setLivesessionmultidataModal(false)
                    let _clientName = resp.firstname + " " + resp.lastname;
                    let _trainerName = resp.data[0].firstname + " " + resp.data[0].lastname;
                    let _sessionDate = resp.sessionDate;
                    let _pdfname = resp.pdfname;
                    Viewlivenote(_clientName, _trainerName, resp.dataimg, _sessionDate)

                });
            }
            else if (response.status == 202) {
                livesessionnotesToggleModal();
                setLivesessionmultidataModal(false)
                setOpenModal(false)
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }


        })




        const Viewlivenote = (_clientName, _trainerName, _notes, _sessionDate) => {
            let _notesB = _notes.length > 0 ? _notes[_notes.length - 1].sessiondata : "No note found";

            const doc = new jsPDF();
            doc.setTextColor(0, 0, 0);
            doc.text('Capnolearning Report', 10, 10,
                { styles: { fontSize: 20, fontWeight: 'bold' } })

            doc.setDrawColor(0, 0, 0);
            doc.line(10, 15, 600, 15);
            doc.setFontSize(10)
            doc.text(_sessionDate, 35, 25)
            doc.text(_clientName, 23, 30);
            doc.text(_trainerName, 25, 35);
            doc.setFont(undefined, 'bold');
            doc.text("Session Date:", 10, 25)
            doc.text("Client:", 10, 30);
            doc.text("Trainer:", 10, 35);
            doc.setFont(undefined, 'normal');
            if (_notes.length > 0) {
                _notesB = _notes[_notes.length - 1].sessiondata.split("<br>");
                _notesB.map((v, i) => {
                    doc.text(v, 10, 52 + (i * 1));

                })

            }
            else {
                doc.text("No note found", 10, 52);

            }
            doc.setFontSize(13)
            doc.text('Live Session Notes', 10, 45, { styles: { fontSize: 13, fontWeight: 'bold' } })
            doc.line(10, 47, 55, 47);
            window.open(doc.output('bloburl'))
        }

    }



    const handleliveimages = (id) => {

        setOpenModal(true)
        let dataType = 3;
        fetch(API_URL + "/get/live/sessionimage/download/" + id + "/" + dataType,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"

                },
            }
        ).then((response) => {
            if (response.status == 200) {

                response.blob()

                    .then(response => {

                        //Create a Blob from the PDF Stream

                        const file = new Blob([response], {
                            type: "application/pdf"
                        });
                        //Build a URL from the file
                        const fileURL = URL.createObjectURL(file);
                        // Open the URL on new Window
                        window.open(fileURL);
                        // download(fileURL);

                        setOpenModal(false);



                    })

            }
            else if (response.status == 202) {
                nofoundliveimgToggleModal()
                setViewlivesessionMultidataModal(false)
                setOpenModal(false)
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }


        })
    }














    const viewManual = () => {
        window.open('https://capnolearning.com/manualpdf/Operating%20Manual%20P6.0%20-%20April%2026.pdf', 'Manual', 'height=768,width=500');
    }

    const saveScreenshot = () => {
        // // console.log(sessioninfo);
        setrequestProcessingModal(true);
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
                if (!props.multi) {
                    doc.text(sessioninfo[0].name, 35, 25)
                }
                doc.text(sessioninfo[0].client_firstname + " " + sessioninfo[0].client_firstname, 23, 30);
                doc.text(sessioninfo[0].trainer_firstname + " " + sessioninfo[0].trainer_lastname, 25, 35);
                // doc.text(trainerName, 25, 35);
                doc.setFont(undefined, 'bold');
                if (!props.multi) {
                    doc.text("Session Date:", 10, 25)
                }
                doc.text("Client:", 10, 30);
                doc.text("Trainer:", 10, 35);
                // doc.setFont(undefined, 'bold')
                doc.addImage(dataimg, 5, 45, 200, 110);
            }

            setTimeout(() => {
                if (!props.multi) {
                    doc.save("PDF Report - " + sessioninfo[0].name + "-" + sessioninfo[0].client_firstname + " " + sessioninfo[0].client_lastname + ".pdf");
                }
                else {
                    doc.save("PDF Report - " + sessioninfo[0].client_firstname + " " + sessioninfo[0].client_lastname + ".pdf");

                }
                setrequestProcessingModal(false);
                // () ;
                setrequestProcesedModal(true);

            }, 5000);



        });

    }

    const saveReport = () => {

        setSavingReportConfirmation(true);

        // // console.log("report data",props.signalConfig)

    }

    console.log("multi", props.multi)

    // const getScreenshort = () => {
    //     fetch(API_URL + "/get/screenshort/" + session,
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
    //                 setsessionDate(resp.sessionDate)
    //                 setClientName(resp.firstname + " " + resp.lastname)
    //                 setTrainerName(resp.data[0].firstname + " " + resp.data[0].lastname)

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

    const getLiveNotes = () => {
        fetch(API_URL + "/session/data/type?session_id=" + sessionid + "&type=4",
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
                    setLiveNotes(resp.sessions)

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        })
    }


    const [signalName, setSignalName] = useState({
        pco2wave: "PCO<sub>2</sub> Waveform",
        petco2: "PetCO<sub>2</sub> History",
        bpmhistory: "Breaths/min History",
        pco2b2b: "PCO<sub>2</sub> breath to breath",
        capin: "Capnia Index",
        capnia: "Capnia Index History",
        gpmhistory: "Gasps/min History",
        aborted_expmhistory: "Aborted exhales/min History",
        bholdpmhistory: "Breath-holds/min History",
        relativevpm: "Relative Volume/per min History",
        aborted_expm: "Aborted exhales/min History",
        bhpm: "Breath-holds/min",
        b2b2hr: "Beat to beat heart rate",
        hrhistory: "Heart rate History",
        rsahistory: "RSA History",
        b2brsa: "Beat to Beat RSA",
        bpm: "Breaths/min",
        hf_avg: "Tachograph of RR",
        b2brr_wave: "Arousal",
        arousal_avg: "Parasympathetic Tone",
        tone_avg: "Parasympathetic Reserve",
        reserve_avg: "VLF Band",
        vlf_avg: "LF Band",
        lf_avg: "HF Band",
        emg1_avg: "EMG 1 Average",
        emg2_avg: "EMG 2 Average",
        emg3_avg: "EMG 3 Average",
        emg4_avg: "EMG 4 Average",
        emg1_wave: "EMG 1 Raw Wave",
        emg2_wave: "EMG 2 Raw Wave",
        emg3_wave: "EMG 3 Raw Wave",
        emg4_wave: "EMG 4 Raw Wave"
    })

    const getRcord = () => {
        fetch(API_URL + "/session/record?session_id=" + sessionid,
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
                console.log("network error")
            }


        })
    }




    const getAlternate = () => {
        fetch(API_URL + "/get/single/alertnate/report/config/" + config + "/" + userId + "/1",
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
                    // // console.log("result", resp);
                    setAlternate(resp.reports)

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        })
    }

    const Report = () => {
        fetch(API_URL + "/configured/report?type=1",
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
                console.log("network error")
            }


        })
    }

    const clientnameUpdate = () => {
        let url = API_URL + "/session/info?session_id=" + sessionid;
        if (props.multi) {
            url = API_URL + "/client/info?cid=" + clientId;
        }
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
                response.json().then((resp) => {
                    console.warn("recording", resp);
                    if (resp.session[0]) {
                        setsessioninfo(resp.session)
                        if (!props.multi) {
                            setSessionDate(resp.session[0].name)
                            setZoomRecording(resp.session[0].zoom_link)
                        }

                    }


                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        })
    }

    const reportconfigupdate = () => {
        let _configId = reportconfig.current.value;
        window.location.href = "/create/report/" + _configId + "/" + session + "/" + record + "/" + _configId;
    }

    const reportconfigalternateupdate = () => {
        let _configId = alternateconfig.current.value;
        window.location.href = "/create/report/" + config + "/" + session + "/" + record + "/" + _configId;

    }

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const downloadNotesPDF = () => {
        setrequestProcessingModal(true);
        const doc = new jsPDF();

        for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
            doc.setPage(pageNumber)
            doc.setTextColor(0, 0, 0);
            doc.text('Capnolearning Report', 10, 10,
                { styles: { fontSize: 20, fontWeight: 'bold' } })
            doc.setDrawColor(0, 0, 0);
            doc.line(10, 15, 600, 15);
            doc.setFontSize(10)

            doc.text(sessioninfo[0].name, 35, 25)
            doc.text(sessioninfo[0].client_firstname + " " + sessioninfo[0].client_firstname, 23, 30);
            doc.text(sessioninfo[0].trainer_firstname + " " + sessioninfo[0].trainer_lastname, 25, 35);
            // doc.text(trainerName, 25, 35);
            doc.setFont(undefined, 'bold');
            doc.text("Session Date:", 10, 25)
            doc.text("Client:", 10, 30);
            doc.text("Trainer:", 10, 35);
            doc.text("Live Session Notes:", 10, 45);
            doc.setFont(undefined, 'normal');

            var splitTitle = doc.splitTextToSize(document.getElementById("liveNotes").innerHTML, 270);
            var pageHeight = doc.internal.pageSize.height;

            var y = 50;
            for (var i = 0; i < splitTitle.length; i++) {
                if (y > 280) {
                    y = 10;
                    doc.addPage();
                }
                // // console.log("line" , splitTitle[i])
                doc.text(splitTitle[i].replace(/(<([^>]+)>)/gi, ""), 10, y);
                y = y + 3;
            }
        }

        doc.save("Live Session Notes - " + sessioninfo[0].name + "-" + sessioninfo[0].client_firstname + " " + sessioninfo[0].client_lastname + ".pdf");
        setrequestProcessingModal(false);
        setrequestProcesedModal(true);

    }

    const getReportDetails = () => {
        let url = API_URL + "/view/report/details?id=" + reportId;
        if (props.multi) {
            url = API_URL + "/view/multi/report/details?id=" + reportId
        }
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
                response.json().then((resp) => {
                    if (resp.details[0]) {
                        setReportDetails(resp.details);

                        setNotes(resp.details[0].notes);
                    }
                })
            }
        })
    }


    const [confirmLeaveModal, setConfirmLeaveModal] = useState(false);
    const confirmLeaveModalToggle = () => {
        setConfirmLeaveModal(!confirmLeaveModal);
        if (action == "reportConfig") {
            reportconfig.current.value = config
        }
        if (action == "altConfig") {
            alternateconfig.current.value = currentConfig
        }
        if (action == "record") {
            reportRecord.current.value = record
        }
    }

    const confirmLeave = (v) => {
        setAction(v)
        confirmLeaveModalToggle();

    }

    const performAction = () => {
        if (action == "reportConfig") {
            reportconfigupdate();
        }
        else if (action == "altConfig") {
            reportconfigalternateupdate();
        }
        else if (action == "record") {
            reportrecordupdate();
        }
        else if (action == "dashboard") {
            window.location.href = "/";
        }

    }

    const getPreviousSessionPDF = () => {
        setrequestProcessingModal(true);

        fetch(API_URL + "/get/previous/screenshot/" + session + "/" + clientId,
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

                    if (resp.data.length > 0) {

                        const doc = new jsPDF();

                        for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
                            doc.setPage(pageNumber)
                            doc.setTextColor(0, 0, 0);
                            doc.text('Capnolearning Report', 10, 10,
                                { styles: { fontSize: 20, fontWeight: 'bold' } })
                            doc.setDrawColor(0, 0, 0);
                            doc.line(10, 15, 600, 15);
                            doc.setFontSize(10)

                            doc.text(sessioninfo[0].name, 35, 25)
                            doc.text(sessioninfo[0].client_firstname + " " + sessioninfo[0].client_firstname, 23, 30);
                            doc.text(sessioninfo[0].trainer_firstname + " " + sessioninfo[0].trainer_lastname, 25, 35);
                            // doc.text(trainerName, 25, 35);
                            doc.setFont(undefined, 'bold');
                            doc.text("Session Date:", 10, 25)
                            doc.text("Client:", 10, 30);
                            doc.text("Trainer:", 10, 35);
                            // doc.setFont(undefined, 'bold')
                            doc.addImage(resp.data[0].data, 5, 45, 200, 110);
                        }
                        setrequestProcessingModal(false);
                        setrequestProcesedModal(true);
                        window.open(doc.output('bloburl'))

                        // doc.save("PDF Report - "+resp.data[0].pdf_name + "-" + sessioninfo[0].client_firstname+ " " + sessioninfo[0].client_lastname + ".pdf");

                    }
                    else {
                        setrequestProcessingModal(false);


                        alert("No PDF found for previous session")
                    }

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                setrequestProcessingModal(false);

                console.log("network error")
            }


        })


    }



    const ViewlivesessionImage = () => {
        setrequestProcessingModal(true);


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
                    if (resp.length == 0) {
                        setrequestProcessingModal(false)
                    }
                    else {
                        let _clientName = resp.firstname + " " + resp.lastname;
                        let _trainerName = resp.data[0].firstname + " " + resp.data[0].lastname;
                        let _sessionDate = resp.sessionDate;
                        let _pdfname = resp.pdfname;
                        Viewliveimg(_clientName, _trainerName, resp.result, _sessionDate)
                    }



                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                setrequestProcessingModal(false);

                console.log("network error")
            }


        })


    }

    const Viewliveimg = (_clientName, _trainerName, _image, _sessionDate, _pdfname) => {

        const doc = new jsPDF();
        for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
            doc.setPage(pageNumber)
            doc.setTextColor(0, 0, 0);
            doc.text('Capnolearning Report', 10, 10,
                { styles: { fontSize: 20, fontWeight: 'bold' } })
            doc.setDrawColor(0, 0, 0);
            doc.line(10, 15, 600, 15);
            doc.setFontSize(10)

            doc.text(_sessionDate, 35, 25)
            doc.text(_clientName, 23, 30);
            doc.text(_trainerName, 25, 35);
            doc.setFont(undefined, 'bold');
            doc.text("Session Date:", 10, 25)
            doc.text("Client:", 10, 30);
            doc.text("Trainer:", 10, 35);
            // doc.setFont(undefined, 'bold')
            doc.addImage(_image, 5, 45, 200, 110);

        }

        window.open(doc.output('bloburl'))
        setrequestProcessingModal(false);
        setrequestProcesedModal(true);
    }


    const moveClock = () => {
        let moveClock = (showclock == 0 ? 1 : 0);


        window.location.href = "/view/multi/report/" + moveClock + "/" + reportId;
    }

    // // console.log("excel data",signalStat)
    // signalStat.map((v,i)=>{
    // // console.log("excel data",v)

    // })
    return (
        <div className="bg-c-header">
            <ReactTooltip />
            <div className="wrp-chart-header">
                <div className="chart-header-c1" style={{ width: "20%" }}>
                    <div className="wrp-action">
                        <div className="action-opt" style={{ width: "38%" }}>
                            <p>Actions Options</p>

                            <ul className='action-list'>
                                {
                                    !props.multi && !group &&
                                    <li>
                                        {
                                            sessioninfo.length > 0 &&

                                            <ExcelFile filename={"Statistics - " + sessioninfo[0].name + "-" + sessioninfo[0].client_firstname + " " + sessioninfo[0].client_lastname} element={<a href="javascript:void" onClick={exportExcel} data-tip="Export session data as Excel Sheet."   ><i class="fa fa-upload whiteicon" aria-hidden="true"></i></a>}>

                                                {
                                                    graphs.map((v, i) => {
                                                        //   // console.log("excel data",v);

                                                        return (

                                                            <ExcelSheet data={signalStat[v.signal_name] ? signalStat[v.signal_name] : []} name={v.signal_name}>
                                                                <ExcelColumn label="X" value="x" />
                                                                <ExcelColumn label="Mean" value="mean" />
                                                                <ExcelColumn label="Median" value="median" />
                                                                <ExcelColumn label="Standard Deviation" value="sd" />
                                                            </ExcelSheet>)

                                                    })
                                                }


                                            </ExcelFile>

                                        }
                                    </li>
                                }
                                {
                                    props.multi && !group &&

                                    <li><a href="javascript:void" onClick={exportModalToggle} data-tip="Export data."   ><i class="fa fa-upload whiteicon" aria-hidden="true"></i></a></li>
                                }
                                <li><a href="javascript:void" onClick={takeNotesToggle} data-tip="Take report notes."><i class="fa fa-sticky-note" aria-hidden="true"></i></a></li>
                                <li><a href="javascript:void" data-tip="Export report as PDF." onClick={saveScreenshot}><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></li>
                                {/* <li><a href="javascript:void" onClick={saveReportConfig} data-tip="Save as alternate configuration."><i class="fa fa-sliders" aria-hidden="true"></i></a></li> */}
                                <li><a href="javascript:void" onClick={saveReport} data-tip="Save as report."><i class="fa fa-bookmark" aria-hidden="true"></i></a></li>
                                <li><a href="javascript:void" onClick={props.multi == false ? "" : settingToggleModal} data-tip="Configure Graph Linking"><i class="fa fa-cog" aria-hidden="true"></i></a></li>

                            </ul>
                        </div>
                        <div className="view-opt" style={{ width: "55%" }}>
                            <p>Viewing Options</p>
                            <ul className='action-list'>

                                <li><a href="javascript:void" onClick={props.multi == false ? notesModalToggle : livesessionMultidataModalToggle} data-tip="View session notes"><i class="fa fa-file-text" aria-hidden="true"></i></a>
                                </li>


                                <li><a href="javascript:void" onClick={props.multi == false ? zoomModalToggle : zoomMultidataModalToggle} data-tip="View zoom recording"><i class="fa fa-video-camera" aria-hidden="true"></i></a></li>
                                {
                                    !props.multi &&
                                    <li><a href="javascript:void" onClick={getPreviousSessionPDF} data-tip="View PDF of previous session"><i class="fa fa-step-backward" aria-hidden="true"></i></a></li>
                                }
                                <li><a href="javascript:void" onClick={props.multi == false ? ViewlivesessionImage : viewlivesessionMultidataModalToggle} data-tip="View live session images"><i class="fa fa-image" aria-hidden="true"></i></a></li>
                                {
                                    !group &&
                                    <li><a href="javascript:void" onClick={() => setShowSignalStat(!showSignalStat)} data-tip="View all signal statistics"><i class="fa fa-table"></i></a></li>
                                }

                                <li><a href="javascript:void" onClick={viewManual} data-tip="View help document"><i class="fa fa-question-circle" aria-hidden="true"></i></a></li>

                            </ul>
                        </div>
                    </div>
                </div>
                {
                    !props.multi &&
                    <div className="chart-header-c2">
                        <div className="wrp-select-row">


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
                }

                <div className="chart-header-c3">
                    <ul className="username-list">
                        <li data-tip="Name of report">
                            {reportDetails.map((repoprtName) => {
                                return (
                                    <a href="javascript:void"><i class="fa fa-file" aria-hidden="true"></i>{repoprtName.name}</a>
                                )
                            }
                            )}
                        </li>
                        <li data-tip="Name of client">
                            {sessioninfo.map((clientName) => {
                                return (
                                    <a href="javascript:void"><i class="fa fa-user" aria-hidden="true"></i>{clientName.client_firstname} {clientName.client_lastname}</a>
                                )
                            }
                            )}
                        </li>
                        <li data-tip="Name of trainer">
                            {sessioninfo.map((trainerName) => {
                                return (
                                    <a href="javascript:void"><i class="fa fa-user-md" aria-hidden="true"></i> {trainerName.trainer_firstname} {trainerName.trainer_lastname}</a>
                                )
                            }
                            )}
                        </li>
                        <li data-tip="Session date">
                            {!props.multi && sessioninfo.map((sessionName) => {
                                return (
                                    <a href="javascript:void"><i class="fa fa-calendar" aria-hidden="true"></i> {sessionName.name}</a>
                                )
                            }
                            )}
                        </li>

                    </ul>
                </div>
                <div className="chart-header-c4">
                    <div className="dashboard-back">
                        <a href="javascript:void" onClick={() => confirmLeave("dashboard")}><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Dashboard</a>
                    </div>
                </div>
            </div>



            <Modal isOpen={takeNotesModal} toggle={takeNotesToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={takeNotesToggle}><span className="ml-1 roititle modal-head">Take Report Notes</span></ModalHeader>
                <ModalBody>
                    <textarea rows="8" style={{ width: "100%" }} value={notes} onChange={(e) => setNotes(e.target.value)} ></textarea>

                </ModalBody>

            </Modal>

            <Modal isOpen={notesModal} toggle={notesModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={notesModalToggle}><span className="ml-1 roititle modal-head"> Live Session Notes</span></ModalHeader>
                <ModalBody>
                    <p id="liveNotes">{liveNotes && liveNotes.length > 0 ?
                        liveNotes.map((v, i) => {
                            return (
                                <p dangerouslySetInnerHTML={{ __html: v.sessiondata }}></p>
                            )
                        })
                        : "No notes available."}</p>

                    <div className='d-flex justify-content-around mt-3'>
                        <button className='lightbtn w-100' onClick={notesModalToggle} >Cancel</button>
                        {
                            liveNotes && liveNotes.length > 0 &&
                            <button className='darktbtn w-100 ml-1' onClick={downloadNotesPDF} >Download PDF</button>
                        }
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={zoomModal} toggle={zoomModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={zoomModalToggle}><span className="ml-1 roititle modal-head">Zoom Recording</span></ModalHeader>
                <ModalBody>
                    <p>{zoomRecording ?
                        <a href={zoomRecording} target="_blank" >Open zoom recording in new tab.</a>
                        : "No zoom recording available."}</p>
                </ModalBody>

            </Modal>

            <Modal isOpen={confirmLeaveModal} toggle={confirmLeaveModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={confirmLeaveModalToggle}><span className="ml-1 roititle modal-head">Please Confirm </span></ModalHeader>
                <ModalBody>
                    {/* <p className=''>Are you sure you want to leave this screen, please save your changes before leaving ?</p> */}


                    <div className='d-flex justify-content-around mt-3'>
                        {/* <button className='lightbtn w-100' onClick={confirmLeaveModalToggle} >Cancel</button> */}
                        <button className='lightbtn w-100 ml-1' onClick={performAction} >Discard & Exit</button>

                        <button className='darktbtn w-100 ml-1' onClick={() => { saveReport(); confirmLeaveModalToggle(); }} >Save & Exit</button>

                    </div>
                </ModalBody>

            </Modal>


            <Modal isOpen={livesessionmultidataModal} toggle={livesessionMultidataModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={livesessionMultidataModalToggle}><span className="ml-1 roititle modal-head"> Live Session Notes</span></ModalHeader>
                <ModalBody>
                    <div>
                        <ul className='multidatareport-list'>

                            {
                                multipleData.length > 0 && multipleData.map((v, i) => {
                                    return (
                                        <li><span>{i + 1}</span><a href='javascript:void(0)' onClick={() => { handleliveNotes(v.id); }}>{v.name}</a></li>
                                    )
                                })
                            }

                        </ul>
                    </div>


                </ModalBody>

            </Modal>

            <Modal isOpen={zoomMultidataModal} toggle={zoomMultidataModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={zoomMultidataModalToggle}><span className="ml-1 roititle modal-head"> Zoom Recording</span></ModalHeader>
                <ModalBody>
                    <div>
                        <ul className='multidatareport-list'>

                            {
                                multipleData.length > 0 && multipleData.map((v, i) => {
                                    return (
                                        <li> <span>{i + 1}</span> <a href="javascript:void(0)" onClick={() => { getZoomLinkbyid(v.id); }}>{v.name}</a></li>
                                    )
                                })
                            }

                        </ul>
                    </div>


                </ModalBody>

            </Modal>



            <Modal isOpen={exportModal} toggle={exportModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={exportModalToggle}><span className="ml-1 roititle modal-head"> Export Data</span></ModalHeader>
                <ModalBody>
                    <div>
                        <ol className='multidatareport-list'>

                            {/* {
                                multipleData.length > 0 && multipleData.map((v, i) => {
                                    return (
                                        <li ><span>{i + 1}</span> <a href='javascript:void(0)' >{v.name}</a></li>
                                    )
                                })
                            } */}


                             {
                                multipleData.length > 0 && multipleData.map((v, i) => {
                                    return (
                                        <li>

                                <Accordion flush open={open} toggle={toggle}
                                // defaultOpen={[
                                //     '1',

                                // ]}
                                // stayOpen
                                >
                                    <AccordionItem>
                                        <AccordionHeader targetId={v.id} className='wrp-accourdian-head'>
                                        <div className='list-exort-content'><span>{i + 1}</span> <a href='javascript:void(0)' >{v.name}</a></div>
                                        </AccordionHeader>
                                        <AccordionBody accordionId={v.id} className='accourdian-body-wrp'>
                                        <div className='excel-wrp'>
                                            <input type="radio" name='csv' className='mrt-radiobtn' />
                                            <label>CSV</label>
                                            <input type="radio" name='csv' />
                                            <label>EXCEL</label>
                                            <input type="radio" name='csv' />
                                            <label>ASCII</label>
                                        </div>

                                        </AccordionBody>
                                    </AccordionItem>

                                </Accordion>






                            </li>
                                    )
                                })
                            }

                            


                        </ol>
                    </div>


                </ModalBody>

            </Modal>

            <Modal isOpen={viewlivesessionMultidataModal} toggle={viewlivesessionMultidataModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={viewlivesessionMultidataModalToggle}><span className="ml-1 roititle modal-head"> View Live Session images</span></ModalHeader>
                <ModalBody>
                    <div>
                        <ul className='multidatareport-list'>

                            {
                                multipleData.length > 0 && multipleData.map((v, i) => {
                                    return (
                                        <li > <span>{i + 1}</span> <a href='javascript:void(0)' onClick={() => { handleliveimages(v.id); }}>{v.name}</a></li>
                                    )
                                })
                            }

                        </ul>
                    </div>


                </ModalBody>

            </Modal>

            <Modal isOpen={openModal} toggle={openToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={openToggleModal}><span className="ml-1 roititle modal-head">Request processing...</span></ModalHeader>
                <ModalBody>
                    <p className='text-center'>Your request is getting processed. Please wait.</p>
                    <div className="wrp-chart-loader">
                        <div class="loading">
                            <div class="loading-1"></div>
                            <div class="loading-2"></div>
                            <div class="loading-3"></div>
                            <div class="loading-4"></div>
                        </div>
                    </div>
                </ModalBody>

            </Modal>


            <Modal isOpen={livesessionnotesModal} toggle={livesessionnotesToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={livesessionnotesToggleModal}><span className="ml-1 roititle modal-head">Live Session Notes</span></ModalHeader>
                <ModalBody>
                    <p className='text-center'>Live Session Notes Not Found </p>

                </ModalBody>

            </Modal>

            <Modal isOpen={zoomlinkModal} toggle={zoomlinkToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={zoomlinkToggleModal}><span className="ml-1 roititle modal-head"> Zoom Recording</span></ModalHeader>
                <ModalBody>
                    <p className='text-center'>Zoom Links Not Found </p>

                </ModalBody>

            </Modal>

            <Modal isOpen={nofoundliveimgModal} toggle={nofoundliveimgToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={nofoundliveimgToggleModal}><span className="ml-1 roititle modal-head"> View Live Session images</span></ModalHeader>
                <ModalBody>
                    <p className='text-center'>Live Session images Not Found </p>

                </ModalBody>

            </Modal>


            <Modal isOpen={settingModal} toggle={settingToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={settingToggleModal}><span className="ml-1 roititle modal-head">Configure Graph Linking</span></ModalHeader>
                <ModalBody>
                    <div className='wrp-select-setting'>
                        <div className='label-setting'>
                            <p>Setting</p>
                        </div>
                        <div className='select-setting'>
                            <select>
                                <option>Graph by Graph basis</option>
                                <option>Signal by Signal basis</option>
                                <option>Link All Graphs</option>
                            </select>
                        </div>
                    </div>

                </ModalBody>

            </Modal>







        </div>
    )
}

export default ViewChartHeader;

