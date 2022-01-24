import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import edit from '../../images/edit.png'
import checks from '../../images/checks.png'
import Delete from '../../images/delete.png';

const Editclient = () => {
    
    const accessToken = localStorage.getItem('accessToken');
    const selectedTrainer = localStorage.getItem('selectedTrainer');
    const userId = localStorage.getItem('user_id');
    const [clients, setinclients] = useState([]);
    const [data, setData] = useState([]);
    const [trainers, settrainers] = useState([]);
    const trainerSelected = useRef()

    let _userId = localStorage.getItem('user_id');
    let _userType = 3
    let _trainer = false;

    useEffect(() => {
        getClients();
        getTrainer();

    }, []);



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

        let selectedTrainer = localStorage.getItem('selectedTrainer') ;
        if(selectedTrainer == "all"){
            selectedTrainer = _userId ; 
            _trainer = false ;
        }
        else{
            _trainer = true; 
        }

        fetch("https://capno-api.herokuapp.com/api/clients?user_id=" + selectedTrainer + "&trainer=" + _trainer + "&user_type=3",

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
                            firstname: v.firstname,
                            lastname: v.lastname,
                            email: v.email,
                            status: v.status == 1 ? "Active" : "Inactive",
                            telephone: v.telephone,
                            actions: <p><a href={"/edit/client/"+v.id} className="downloadimg" ><img src={edit} /></a> <a href='#' className="downloadimg"><img src={checks} /></a> <a href='#' className="downloadimg"><img src={Delete} /></a></p>
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
                        
                            <option  selected={"all" == selectedTrainer ? true : false} value={"all"}>All trainers</option>

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
                                columns={columns}
                                data={data}
                                title=""
                            />

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Editclient;