import React from 'react';
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'
import Delete from '../../images/delete.png';

const Viewcompletedclientwork = () => {

    const data =[
        {
            session: "Ahad",clientname: "Nesreen LaBeau", action: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a> <a href='#' className="downloadimg"><img src={Delete} /></a></p>
        },
        
    ]

    const columns =[
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


    return(
        <div className="">
            <Header />
             <div className="wrp-dashbord">
                <div className="sidebar-section">
                <Sidebar />
               </div>
               <div className="right-section">
                <div className="head-demoreport">
                    <h3>View Completed Client Homework</h3>
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

export default Viewcompletedclientwork;