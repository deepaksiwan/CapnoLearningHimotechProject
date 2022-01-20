import React, {useEffect,useRef,useState} from 'react';
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import edit from '../../images/edit.png'
import checks from '../../images/checks.png'
import Delete from '../../images/delete.png';

const Editclient = () => {

    const accessToken = localStorage.getItem('accessToken');
    const [clients, setinclients] = useState([]);
    const [data, setData] = useState([]);
        let _userId = localStorage.getItem('user_id');
        let _userType = 3
        let _trainer = false;
       
    useEffect(() =>{
        editClinet();

    },[]);

    const editClinet = () =>{

        

        fetch("https://capno-api.herokuapp.com/api/clients?user_id=" + _userId + "&trainer=" + _trainer + "&user_type=" + _userType,
        
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
                    let _temp = [] ;
                    resp.clients.map((v,i) => {
                        _temp.push({
                            firstname: v.firstname,
                            lastname: v.lastname,
                            email:v.email,
                            trainer: v.firstname,
                            status: v.status,
                            telephone: v.telephone,
                            actions : <p><a href='#' className="downloadimg" ><img src={edit} /></a> <a href='#' className="downloadimg"><img src={checks} /></a> <a href='#' className="downloadimg"><img src={Delete} /></a></p>
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

    

    const columns =[
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
            title: <span className="text-right">Actions</span>, field: "actions"
        }
    ]


    return(
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
                    <select className="choose-trainerselectopt">
                        <option>Choose a Trainer</option>
                        <option>Trainer1</option>
                        <option>Trainer2</option>
                        <option>Trainer3</option>
                        <option>Trainer4</option>
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