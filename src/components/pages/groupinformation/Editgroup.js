import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import edit from '../../images/edit.png'
import checks from '../../images/checks.png'
import Delete from '../../images/delete.png';
import closeicon from '../../images/closeicon.png';

const Editgroup = () => {

    const accessToken = localStorage.getItem('accessToken');
    const selectedTrainer = localStorage.getItem('selectedTrainer');
    const [clients, setinclients] = useState([]);
    const [data, setData] = useState([]);
    const [itemId, setItemId] = useState(null);
    const userId = localStorage.getItem('user_id');
    let _userId = localStorage.getItem('user_id');
    let _trainer = false;
    const [deleteModal, setdeleteModal] = useState(false);
    const deleteToggleModal = () => setdeleteModal(!deleteModal);

    useEffect(() => {
        getGroups();


    }, []);


    const deleteGroup = () => {
        let id = itemId ; 
        fetch("https://capno-api.herokuapp.com/api/group/delete/" + id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                getGroups();
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

    const getGroups = () => {



        fetch("https://capno-api.herokuapp.com/api/clients?user_id=" + selectedTrainer + "&trainer=" + _trainer + "&user_type=4",

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
                    resp.clients.map((v, i) => {
                        _temp.push({
                            name: v.firstname,
                            status: v.status == 1 ? "Active" : "Inactive",
                            action: <p><a href={"/edit/group/information/" + v.id} className="downloadimg" ><img src={edit} /></a> <a href='#' className="downloadimg"><img src={checks} /></a> <a  onClick={() => openItemPopUp(v.id)}  className="downloadimg"><img src={Delete} /></a></p>
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

    const openItemPopUp = (id) => {
        setItemId(id);
        setdeleteModal(!deleteModal)
    } 

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }



    const columns = [
        {
            title: "name", field: "name"
        },
        {
            title: "Status", field: "status"
        },
        {
            title: <span className="text-right">Actions</span>, field: "action"
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
                        <h3>Groups</h3>
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


                <Modal isOpen={deleteModal} toggle={deleteToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={deleteToggleModal}><span className="ml-1 roititle font-weight-bold">Delete</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <div className="right-circle cancel-circle"><img src={closeicon} /></div>
                            <h4>Are You Sure?</h4>
                            <p>Do you really want to delete this record?</p>
                            <div className="wrp-delete-btn">
                                <div className="cancel-btn1" ><a onClick={deleteToggleModal}>Cancel</a></div>
                                <div className="delete-btn1"><a onClick={deleteGroup}>Delete</a></div>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>
            </div>

        </div>
    )
}

export default Editgroup;