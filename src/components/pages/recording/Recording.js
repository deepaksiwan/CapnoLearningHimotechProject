import React from 'react';
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'

const Recording = () => {

    const data =[
        {
            recordingname: "Test",recordingtype: "Zoom Link", status: "active", action: <p> <a href='#' className="downloadimg"><img src={preveiw} /></a></p>
        },
        
    ]

    const columns =[
        {
            title: "Recording Name", field: "recordingname"
        },
        {
            title: "Recording Type", field: "recordingtype"
        },
        {
            title: "Status", field: "status"
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
                    <h3>Recordings</h3>
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

export default Recording;