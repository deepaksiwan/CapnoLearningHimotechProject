import React, { useEffect, useState } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import download from 'downloadjs';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import downloads from '../../images/download.png'
import preveiw from '../../images/preveiw.png'
import { API_URL } from "../../../config";
import edit from '../../images/edit.png'
import Delete from '../../images/delete.png';
import closeicon from '../../images/closeicon.png';
import backIcon from "../../images/back.png";


const Viewassemblyreport = () => {
    const accessToken = localStorage.getItem('accessToken');
    const sessionid = localStorage.getItem('selectedSession');
    const [data, setData] = useState([]);
    const Clientid = localStorage.getItem('selectedClient');
    const [itemId, setItemId] = useState(null);
    const [deleteModal, setdeleteModal] = useState(false);
    const deleteToggleModal = () => setdeleteModal(!deleteModal);
    const [downloaderModal, setDownloaderModal] = useState(false);
    const DownloaderToggleModal = () => setDownloaderModal(!downloaderModal);
    const [openModal, setOpenModal] = useState(false);
    const openToggleModal = () => setOpenModal(!openModal);

    useEffect(() => {
        getassebllyList();


        const interval = setInterval(() => {
            getassebllyList();
        }, 3000);
        return () => clearInterval(interval);

    }, []);


    const getassebllyList = () => {


        fetch(API_URL + "/display/assembly/list/" + sessionid,

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
                    const clientName = resp.firstname + resp.lastname
                    const sessionDate = resp.sessionDate

                    // console.log(clientName)

                    let _temp = [];
                    // console.log(_temp)
                    resp.data.map((v, i) => {
                        _temp.push({
                            reportTitle: v.name,
                            Client: clientName,
                            Session: sessionDate,
                            dateCreated: new Date(v.created_at * 1000).toLocaleString(),
                            actions: <p><a href="#" onClick={() => {viewpdf(v.id); openToggleModal()}} className="downloadimg" ><img src={preveiw} /></a><a href={"/view/edit/assemblyreport/" + v.id} className="downloadimg" ><img src={edit} /></a> <a href='#' onClick={() => {downloadpdf(v.id); DownloaderToggleModal()}} className="downloadimg"><img src={downloads} /></a> <a className="downloadimg" onClick={() => openItemPopUp(v.id)} ><img src={Delete} /></a></p>

                        })
                    })
                    setData(_temp);


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





    const downloadpdf = (id) => {

        fetch(API_URL + "/get/full/screenshort/" + id + "/" + Clientid,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/pdf"

                },
            }
        ).then(res => res.blob())
        
            .then(res => {
                //Create a Blob from the PDF Stream
                
                const file = new Blob([res], {
                    type: "application/pdf"
                });
               setDownloaderModal(!downloaderModal)
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                download(fileURL);

            })
           
           
    }

    const viewpdf = (id) => {

        fetch(API_URL + "/get/full/screenshort/" + id + "/" + Clientid,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/pdf"

                },
            }
        ).then(res => res.blob())
            .then(response => {
                //Create a Blob from the PDF Stream
                // console.log(response);

                const file = new Blob([response], {
                    type: "application/pdf"
                });
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);


            })
    }


    const openItemPopUp = (id) => {
        setItemId(id);
        setdeleteModal(!deleteModal)
    }

    const deleteClient = () => {
        let id = itemId;
        fetch(API_URL + "/delete/assembly/list/" + id,
            {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                getassebllyList();
                setdeleteModal(!deleteModal)

            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }



        })

    }

    const columns = [
        {
            title: "Client", field: "Client"
        },
        {
            title: <span className="text-right">Session</span>, field: "Session"
        },
        {
            title: <span className="text-right">Report Title</span>, field: "reportTitle"
        },
        {
            title: <span className="text-right">Date Created</span>, field: "dateCreated"
        },
        {
            title: <span className="text-right">Actions</span>, field: "actions"
        }
    ]


    return (
        <div className="">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="head-demoreport">
                        <h3>Session Assembly Reports</h3>
                        <div className="back-icon-wrp">
                        <Link to="/section/report/assembly" className="backbtn-icon">
                            <img src={backIcon} alt="backicon" />
                            <span>Back</span>
                        </Link>
                    </div>
                    </div>
                    <div className="wrp-bankform">
                        <div style={{ maxWidth: '100%' }}>
                            <MaterialTable
                                columns={columns}
                                data={data}
                                title=""
                            />

                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={deleteModal} toggle={deleteToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={deleteToggleModal}><span className="ml-1 roititle font-weight-bold">Delete</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div className="right-circle cancel-circle"><img src={closeicon} /></div>
                        <h4>Are You Sure?</h4>
                        <p>Do you really want to delete this record?</p>
                        <div className="wrp-delete-btn">
                            <div className="cancel-btn1" ><a onClick={deleteToggleModal}>Cancel</a></div>
                            <div className="delete-btn1"><a onClick={deleteClient}>Delete</a></div>
                        </div>
                    </div>
                </ModalBody>

            </Modal>


            <Modal isOpen={downloaderModal} toggle={DownloaderToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={DownloaderToggleModal}><span className="ml-1 roititle font-weight-bold">Downloading</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div class="loading2">
                            <div class="dot">L</div>
                            <div class="dot">O</div>
                            <div class="dot">A</div>
                            <div class="dot">D</div>
                            <div class="dot">I</div>
                            <div class="dot">N</div>
                            <div class="dot">G</div>
                            <span class="text">Please Wait...</span>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={openModal} toggle={openToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={openToggleModal}><span className="ml-1 roititle font-weight-bold">Opening</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div class="loading2">
                            <div class="dot">O</div>
                            <div class="dot">P</div>
                            <div class="dot">E</div>
                            <div class="dot">N</div>
                            <div class="dot">I</div>
                            <div class="dot">N</div>
                            <div class="dot">G</div>
                            <span class="text">Please Wait...</span>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default Viewassemblyreport;