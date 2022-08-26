import React, { useEffect, useState } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from '@material-ui/core';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'
import Delete from '../../images/delete.png';
import closeicon from '../../images/closeicon.png';
import { API_URL } from "../../../config";
import backIcon from "../../images/back.png";


const useStyles = makeStyles(() => ({
    customTooltip: {
      backgroundColor: "black",
      fontSize: "15px"
    }
  }));

const Viewuploadedtrainerform = () => {
    const accessToken = localStorage.getItem('accessToken');
    const selectedClient = localStorage.getItem('selectedClient');
    const selectedSession = localStorage.getItem('selectedSession');
    const [data, setdata] = useState([]);
    const [itemId, setItemId] = useState(null);
    const [deleteModal, setdeleteModal] = useState(false);
    const deleteToggleModal = () => setdeleteModal(!deleteModal);

    const classes = useStyles();

    useEffect(() => {
        viewtrainerform();

    }, []);

    const deleteuploadtrainerform = () => {
        let id = itemId;
        fetch(API_URL + "/forms/trainer/delete/" + id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                viewtrainerform();
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
    const columns = [
        {
            title: "Form Name", field: "formname"
        },
        // {
        //     title: "Client Name", field: "clientname"
        // },
        {
            title: <span >Actions</span>, field: "action", align: "right"
        }
    ]
    const viewtrainerform = () => {
        // fetch(API_URL + "/forms/trainer?type=1&client_id=" + selectedClient + "&session_id=" + selectedSession,
        fetch(API_URL + "/forms/trainer/" + selectedClient,

        
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
                    let _temp = [];
                    resp.data.map((v, i) => {
                        _temp.push({
                            formname: v.forms,
                            action: <p><Tooltip classes={{
                                tooltip: classes.customTooltip,
                                
                              }} title="Download" placement="top"><a href='#' className="downloadimg tooltip2" download><img src={download} /> </a></Tooltip> <Tooltip classes={{
                                tooltip: classes.customTooltip,
                                
                              }} title="View" placement="top"><a href='#' className="downloadimg tooltip2"><img src={preveiw} /></a></Tooltip> <Tooltip classes={{
                                tooltip: classes.customTooltip,
                                
                              }} title="Delete" placement="top"><a onClick={() => openItemPopUp(v.id)} className="downloadimg tooltip2"><img src={Delete} /></a></Tooltip></p>

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
                        <h3>View Uploaded Trainer Forms</h3>
                        <div className="back-icon-wrp">
                            <Link to="/view/manageform" className="backbtn-icon">
                                <img src={backIcon} alt="backicon" />
                                <span>Back</span>
                            </Link>
                        </div>
                    </div>
                    <div className="wrp-bankform">
                        <div className="table-box">
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
                                    <div className="delete-btn1"><a onClick={deleteuploadtrainerform}>Delete</a></div>
                                </div>
                            </div>
                        </ModalBody>

                    </Modal>
                </div>
            </div>

        </div>
    )
}

export default Viewuploadedtrainerform;