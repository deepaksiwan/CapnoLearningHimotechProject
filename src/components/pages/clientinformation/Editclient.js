import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import edit from '../../images/edit.png'
import checks from '../../images/checks.png'
import Delete from '../../images/delete.png';
import closeicon from '../../images/closeicon.png';
import { API_URL } from '../../../config';

const Editclient = () => {

    const accessToken = localStorage.getItem('accessToken');
    const selectedTrainer = localStorage.getItem('selectedTrainer');
    const selectedGroup = localStorage.getItem('selectedGroup');
    const userId = localStorage.getItem('user_id');
    const [clients, setinclients] = useState([]);
    const [data, setData] = useState([]);
    const [trainers, settrainers] = useState([]);
    const trainerSelected = useRef();
    const [itemId, setItemId] = useState(null);
    const [deleteModal, setdeleteModal] = useState(false);
    const deleteToggleModal = () => setdeleteModal(!deleteModal);
    let _userId = localStorage.getItem('user_id');
    let _userType = 3
    let _trainer = false;

    useEffect(() => {
        getClients();
        getTrainer();

        const interval = setInterval(()=>{
            getClients();
        },3000);
        return()=> clearInterval(interval);

    }, []);

    const deleteClient = () => {
        let id = itemId;
        fetch(API_URL + "/client/delete/" + id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                getClients();
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

    const getTrainer = () => {
        fetch(API_URL + "/trainers?user_id=" + userId,
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
                    settrainers(resp.trainers);



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
    const updateSelectTrainer = () => {

        localStorage.setItem('selectedTrainer', trainerSelected.current.value);

        getClients()
    }

    const getClients = () => {

        let selectedTrainer = localStorage.getItem('selectedTrainer');
        if (selectedTrainer == "all") {
            selectedTrainer = _userId;
            _trainer = false;
        }
        else {
            _trainer = true;
        }

        fetch(API_URL + "/clients?user_id=" + selectedTrainer + "&trainer=" + _trainer + "&user_type=3",

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
                    let _temp = [];
                    resp.clients.map((v, i) => {
                        _temp.push({
                            firstname: v.firstname,
                            lastname: v.lastname,
                            email: v.email,
                            status: v.status == 1 ? "Active" : "Inactive",
                            telephone: v.telephone,
                            actions: <p><a href={"/edit/client/" + v.id} className="downloadimg" ><img src={edit} /></a> <a href='#' className="downloadimg"><img src={checks} /></a> <a onClick={() => openItemPopUp(v.id)} className="downloadimg"><img src={Delete} /></a></p>
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
            title: "Status", field: "status"
        },
        {
            title: "Telephone", field: "telephone"
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
                        <h3>Clients</h3>
                    </div>
                    <div className="choose-trainer">
                        <label>Trainer</label>
                        <select ref={trainerSelected} onChange={updateSelectTrainer} className="choose-trainerselectopt">

                            <option selected={"all" == selectedTrainer ? true : false} value={"all"}>All trainers</option>

                            {
                                trainers.map((items, i) => {
                                    return (
                                        <option selected={items.id == selectedTrainer ? true : false} value={items.id}>
                                            {items.firstname} {items.lastname}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className="wrp-bankform">
                        <div style={{ maxWidth: '100%' }}>
                            <MaterialTable
                                options={{
                                    search: true,
                                    showTitle: false,
                                    toolbar: true,
                                    pageSizeOptions: [5, 10, 20, 50, 150, 200]
                                }}
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
                                    <div className="delete-btn1"><a onClick={deleteClient}>Delete</a></div>
                                </div>
                            </div>
                        </ModalBody>

                    </Modal>
                </div>
            </div>

        </div>
    )
}

export default Editclient;