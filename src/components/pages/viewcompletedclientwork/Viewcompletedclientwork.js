import React, { Component, useEffect, useRef, useState } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'
import Delete from '../../images/delete.png';
import closeicon from '../../images/closeicon.png';
import { API_URL } from "../../../config";
import backIcon from "../../images/back.png";

const Viewcompletedclientwork = () => {

    const accessToken = localStorage.getItem('accessToken');
    const Sessionid = localStorage.getItem('selectedSession');
    const [data, setdata] = useState([]);
    const [itemId, setItemId] = useState(null);
    const [deleteModal, setdeleteModal] = useState(false);
    const deleteToggleModal = () => setdeleteModal(!deleteModal);


    const columns = [
        {
            title: "Session", field: "session"
        },
        {
            title: "Client Name", field: "clientname"
        },
        {
            title: <span className="text-right">Actions</span>, field: "action"
        }
    ]
    useEffect(() => {
        Homeworklist();


    }, []);

    const deletehomeworkasignment = () => {
        let id = itemId;
        fetch(API_URL + "/homework/client/delete/" + id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                Homeworklist();
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
    const openItemPopUp = (id) => {
        setItemId(id);
        setdeleteModal(!deleteModal)
    }
    const Homeworklist = () => {
        fetch(API_URL + "/homework/client?session_id=" + Sessionid,
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
                    let _temp = [];
                    resp.homeworks.map((v, i) => {
                        _temp.push({
                            formname: v.form_name,
                            action: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a> <a onClick={() => openItemPopUp(v.id)} className="downloadimg"><img src={Delete} /></a></p>

                        })
                    })
                    setdata(_temp);



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
        <div className="">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="head-demoreport">
                        <h3>View Completed Client Homework</h3>
                        <div className="back-icon-wrp">
                            <Link to="/view/manageform" className="backbtn-icon">
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
                    <Modal isOpen={deleteModal} toggle={deleteToggleModal} className="connect-box" centered={true}>
                        <ModalHeader toggle={deleteToggleModal}><span className="ml-1 roititle font-weight-bold">Delete</span></ModalHeader>
                        <ModalBody>
                            <div className="modal-p">
                                <div className="right-circle cancel-circle"><img src={closeicon} /></div>
                                <h4>Are You Sure?</h4>
                                <p>Do you really want to delete this record?</p>
                                <div className="wrp-delete-btn">
                                    <div className="cancel-btn1" ><a onClick={deleteToggleModal}>Cancel</a></div>
                                    <div className="delete-btn1"><a onClick={deletehomeworkasignment}>Delete</a></div>
                                </div>
                            </div>
                        </ModalBody>

                    </Modal>
                </div>
            </div>

        </div>
    )
}

export default Viewcompletedclientwork;