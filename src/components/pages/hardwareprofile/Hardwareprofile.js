import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import Delete from '../../images/delete.png'
import edit from '../../images/edit.png';
import right from '../../images/right.png';
import closeicon from '../../images/closeicon.png';

const Hardwareprofile = () => {

    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id');
    const [hardwareprofiles, setHardwareprofiles] = useState([]);
    const [data, setData] = useState([]);
    const updatedevice = useRef();
    const [registerModal, setregisterModal] = useState(false);
    const registerToggleModal = () => setregisterModal(!registerModal);
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const serialKey = useRef();
    const [itemId, setItemId] = useState(null);
    const [deleteModal, setdeleteModal] = useState(false);
    const deleteToggleModal = () => setdeleteModal(!deleteModal);

    useEffect(() => {
        get5Device();
        // get6Device();

    }, []);

   

   

    const columns = [
        {
            title: "Serial Number", field: "name"
        },
        {
            title: "Date activated", field: "date"
        },
        {
            title: "Actions", field: "actions"
        }
    ]

    function saveRegisterdevice() {
      
        let data = {};

        data['serial_key'] = serialKey.current.value;
        data['owner_id'] = userId;
        data['status'] = 1;
       


        fetch("https://capno-api.herokuapp.com/api/device/five/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 201) {
                response.json().then((resp) => {
                    console.log("results", resp);


                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }
            successToggleModal();

        })


       
    }
    const get5Device = () => {
        fetch("https://capno-api.herokuapp.com/api/device/five/profile/" + userId,
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
                    let _temp = [];
                    resp.hardwareprofiles.map((v, i) => {
                        _temp.push({
                            name: v.serial_key,
                            date: new Date(v.date_activated * 1000).toLocaleString(),

                            actions: <p><a onClick={() => openItemPopUp(v.id)} className="downloadimg"><img src={Delete} /></a> <a className="downloadimg"><img src={edit} /></a></p>
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
    const get6Device = () => {
        fetch("https://capno-api.herokuapp.com/api/device/six/profile/" + userId,
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
                    let _temp = [];
                    resp.hardwareprofiles.map((v, i) => {
                        _temp.push({
                            name: v.serial_key,
                            date: v.date_activated,

                            actions: <p><a href='#' className="downloadimg"><img src={Delete} /></a> <a href='#' className="downloadimg"><img src={edit} /></a></p>
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
    const updatedType = () => {
        let _device = updatedevice.current.value;

        if (_device == 1) {
            get5Device();
        }
        else {
            get6Device();
        }


    }
    const delete5device = () => {
        let id = itemId ; 
        fetch("https://capno-api.herokuapp.com/api/device/five/delete/" + id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 201) {
                get5Device();
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
                        <h3>Hardware Profiles</h3>
                    </div>
                    <div className="row mrb-option">
                        <div className="col-lg-3">
                            <div className="client-input">
                                <p>Devices Type</p>
                                <select onChange={updatedType} ref={updatedevice}>
                                    <option value="1">5.0 Devices</option>
                                    <option value="2">6.0 Devices</option>

                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6"></div>
                        <div className="col-lg-3">
                        <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                                        <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                                        <ModalBody>
                                            <div className="modal-p">
                                                <div className="right-circle"><img src={right} /></div>
                                                <h4>Saved!</h4>
                                                <p>Your Form has been Updated Successfully</p>
                                            </div>
                                        </ModalBody>

                                    </Modal>
                            <Modal isOpen={registerModal} toggle={registerToggleModal} className="connect-box" centered={true}>
                                        <ModalHeader toggle={registerToggleModal}><span className="ml-1 roititle font-weight-bold">Register 5.0 Device</span></ModalHeader>
                                        <ModalBody>
                                            <div className="modal-p">
                                                
                                                <input placeholder="Write Serial key" ref={serialKey} />
                                                <div className="btn-s-submit">
                                                    <button type="submit" onClick={saveRegisterdevice}>Submit</button>
                                                </div>
                                            </div>
                                        </ModalBody>

                                    </Modal>
                            <div className="registerdevice-btn"><a href="#" onClick={registerToggleModal}>Register 5.0 Device</a></div>
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
                                <div className="delete-btn1"><a onClick={delete5device}>Delete</a></div>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>
                </div>
            </div>

        </div>
    )
}

export default Hardwareprofile;