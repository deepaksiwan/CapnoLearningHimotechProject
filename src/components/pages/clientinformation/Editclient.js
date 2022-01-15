import React from 'react';
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'
import Delete from '../../images/delete.png';

const Editclient = () => {

    const data =[
        {
            firstname: "Wolf",lastname: "Fellner",email: "ns4234@gmail", trainer:"Trainer",status:"Active",telephone:"9191919191", action: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a> <a href='#' className="downloadimg"><img src={Delete} /></a></p>
        },
        
    ]

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
            title: <span className="text-right">Actions</span>, field: "action"
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