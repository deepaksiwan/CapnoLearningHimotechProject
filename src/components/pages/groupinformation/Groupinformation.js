import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import Addclientname from './Addclientname';
import right from '../../images/right.png';

const Groupinformation = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [trainers, setTrainer] = useState([]);
    const [clientList, setClientList] = useState([]);
    const [devicelist, setDeviceList] = useState({});
    const [clientCount, setClientCount] = useState(2);
    const userId = localStorage.getItem('user_id');
    const [maxclientModal, setmaxclientModal] = useState(false);
    const maxclientToggleModal = () => setmaxclientModal(!maxclientModal);
    const [minclientModal, setminclientModal] = useState(false);
    const minclientToggleModal = () => setminclientModal(!minclientModal);
    const groupName = useRef();
    const groupEmail = useRef();
    const associateTrainer = useRef();
    const associateHardwaretype = useRef();
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const associated_owner = localStorage.getItem('associated_owner');
    const [Loader, setLoader] = useState(false)


    useEffect(() => {
        getTrainer();
    }, [])

    const CreateGroupprofile = () => {
        setLoader(true)
        let data = {};

        data['name'] = groupName.current.value;
        data['associated_owner'] = associated_owner;
        data['associated_practioner'] = associateTrainer.current.value;

        data['email'] = groupEmail.current.value;
        data['device_type'] = associateHardwaretype.current.value;
        let _temp = [];
        for (let i = 0; i < clientCount; i++) {
            _temp.push(devicelist[i + 1]);
        }
        data['devices'] = _temp;
        // console.log(data)


        fetch("https://capno-api.herokuapp.com/api/group/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body: JSON.stringify(data)

        }).then((response) => {

            if (response.status == 200) {
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
            setLoader(false)
        })

    }

    const getTrainer = () => {
        fetch("https://capno-api.herokuapp.com/api/trainers?user_id=" + userId,
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
                    setTrainer(resp.trainers);



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

    const removeclient = () => {
        // let _temp = clientList;
        // _temp.push(_temp.length+1);
        // alert(_temp.length)
        if (clientCount > 2) {
            setClientCount(clientCount - 1)
        }
        else {
            minclientToggleModal();
        }
    }
    const addclient = () => {
        // let _temp = clientList;
        // _temp.push(_temp.length+1);
        // alert(_temp.length)
        if (clientCount < 6) {
            setClientCount(clientCount + 1)
        }
        else {
            maxclientToggleModal();
        }
    }

    useEffect(() => {
        let _temp = [];
        for (let i = 0; i < clientCount; i++) {
            _temp.push({
                count: i + 1
            })
            if (i == (clientCount - 1)) {
                setClientList(_temp)

            }
        }
    }, [clientCount])

    const handleClientList = (i, data) => {
        console.log(i);
        console.log(data);
        let _temp = devicelist
        _temp[i] = data;
        setDeviceList(_temp);
        console.log(devicelist);
    }
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className="demodata-bg">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="client-info-c">
                        <h3>New Group Information</h3>
                        <div className="client-info-box">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Group Name</p>
                                        <input placeholder="Enter first name" ref={groupName} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Group Email</p>

                                        <input type="gmail" placeholder="Gmail" ref={groupEmail} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Associate Trainer</p>
                                        <select ref={associateTrainer}>
                                            <option>Select trainer</option>
                                            {
                                                trainers.map((trainer, i) => {
                                                    return (
                                                        <option value={trainer.id} >{trainer.firstname} {trainer.lastname}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Associate Hardware Type</p>
                                        <select ref={associateHardwaretype}>
                                            <option value="1">5.0 Devices</option>
                                            <option value="2">6.0 Devices</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="add-clients">
                                <h3>Add Clients</h3>
                            </div>
                            {/* {clientList.length} */}
                            {
                                clientList.map((v, i) => {
                                    return (
                                        <Addclientname index={v.count} handleClientList={handleClientList} />
                                    )

                                })
                            }


                            <div className="row">

                                <div className="col-lg-6">
                                    <Modal isOpen={maxclientModal} toggle={maxclientToggleModal} className="connect-box" centered={true}>
                                        <ModalHeader toggle={maxclientToggleModal}><span className="ml-1 roititle font-weight-bold">Max client limit</span></ModalHeader>
                                        <ModalBody>
                                            <div className="modal-p">

                                                <h4>6!</h4>
                                                <p>Max client limit is 6</p>
                                            </div>
                                        </ModalBody>

                                    </Modal>
                                    <div className="create-btn">
                                        <button type="submit" onClick={addclient}>Add Client</button>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <Modal isOpen={minclientModal} toggle={minclientToggleModal} className="connect-box" centered={true}>
                                        <ModalHeader toggle={minclientToggleModal}><span className="ml-1 roititle font-weight-bold">Min client limit</span></ModalHeader>
                                        <ModalBody>
                                            <div className="modal-p">

                                                <h4>2!</h4>
                                                <p>Min client limit is 2</p>
                                            </div>
                                        </ModalBody>

                                    </Modal>
                                    <div className="create-btn">
                                        <button type="submit" onClick={removeclient}>Remove Client</button>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="create-btn">
                                        <Link to="/viewcreate" >Go Back</Link>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                                        <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                                        <ModalBody>
                                            <div className="modal-p">
                                                <div className="right-circle"><img src={right} /></div>
                                                <h4>Saved!</h4>
                                                <p>Your Form has been Submited Successfully</p>
                                            </div>
                                        </ModalBody>

                                    </Modal>
                                    <div className="create-btn">
                                        <button type="submit" onClick={CreateGroupprofile}>Create Group Profile

                                            {
                                                Loader && <div id="loader"></div>
                                            }
                                        </button>
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

export default Groupinformation;