import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from '@material-ui/core';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import edit from '../../images/edit.png'
import checks from '../../images/checks.png'
import Delete from '../../images/delete.png';
import closeicon from '../../images/closeicon.png';
import { API_URL } from '../../../config';
import backIcon from "../../images/back.png";

const useStyles = makeStyles(() => ({
    customTooltip: {
      backgroundColor: "black",
      fontSize: "15px"
    }
  }));

const Edittrainer = () => {

    const accessToken = localStorage.getItem('accessToken');
    const [trainers, settrainers] = useState([]);
    const [data, setData] = useState([]);
    const [itemId, setItemId] = useState(null);
    let _userId = localStorage.getItem('user_id');
    const [deleteModal, setdeleteModal] = useState(false);
    const deleteToggleModal = () => setdeleteModal(!deleteModal);
    let _userType = 3
    let _trainer = false;
    const classes = useStyles();

    useEffect(() => {
        getTrainer();
        const interval = setInterval(()=>{
            getTrainer();
        },3000);
        return()=> clearInterval(interval);
    }, []);


    const deleteTrainer = () => {

        let id = itemId;
        fetch(API_URL+"/trainer/delete/" + id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                getTrainer();
                setdeleteModal(!deleteModal)

            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }



        })
    }

    const openItemPopUp = (id) => {
        setItemId(id);
        setdeleteModal(!deleteModal)
    }

    const getTrainer = () => {

        fetch(API_URL+"/trainers?user_id=" + _userId,

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
                    let _temp = [];
                    resp.trainers.map((v, i) => {
                        _temp.push({
                            firstname: v.firstname,
                            lastname: v.lastname,
                            email: v.email,
                            trainer: v.firstname,
                            status: v.status,
                            telephone: v.telephone,
                            actions: <p> <Tooltip classes={{
                                tooltip: classes.customTooltip,
                                
                              }} title="Edit" placement="top"><a href={"/edit/trainer/" + v.id} className="downloadimg" ><img src={edit} /></a></Tooltip> <Tooltip classes={{
                                tooltip: classes.customTooltip,
                                
                              }} title="Inactive" placement="top"><a href='#' className="downloadimg"><img src={checks} /></a></Tooltip> <Tooltip classes={{
                                tooltip: classes.customTooltip,
                                
                              }} title="Delete" placement="top"><a onClick={() => openItemPopUp(v.id)} className="downloadimg"><img src={Delete} /></a></Tooltip></p>
                        })
                    })
                    setData(_temp);


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

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }



    const columns = [
        {
            title: "Firstname", field: "firstname"
        },
        {
            title: "Lastname", field: "lastname"
        },
        {
            title: "Email", field: "email"
        },
        {
            title: "Trainer", field: "trainer"
        },
        {
            title: "Status", field: "status"
        },
        {
            title: "Telephone", field: "telephone"
        },
        {
            title: <span className="text-right">Actions</span>, field: "actions",align: "right"
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
                        <h3>Trainers</h3>
                        <div className="back-icon-wrp">
                            <Link to="/viewcreate" className="backbtn-icon">
                                <img src={backIcon} alt="backicon" />
                                <span>Back</span>
                            </Link>
                        </div>
                    </div>

                    <div className="wrp-bankform">
                        <div style={{ maxWidth: '100%' }}>
                            <MaterialTable
                            options={{
                                search: true,
                                showTitle: false,
                                toolbar: true,
                                pageSizeOptions:[5,10,20,50,150,200]
                            }}
                                columns={columns}
                                data={data}
                                title=""
                            />

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
                                <div className="delete-btn1"><a onClick={deleteTrainer}>Delete</a></div>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>
            </div>

        </div>
    )
}

export default Edittrainer;