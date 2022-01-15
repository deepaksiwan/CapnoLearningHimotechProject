import React from 'react';
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png';
import preveiw from '../../images/preveiw.png';
import Delete from '../../images/delete.png';

const Viewuploadedtrainerform = () => {

    const data =[
        {
            formname: "Assessment Record",sesseion: "Nesreen LaBeau", action: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a> <a href='#' className="downloadimg"><img src={Delete} /></a></p>
        },
        
    ]

    const columns =[
        {
            title: "Form Name", field: "formname"
        },
        {
            title: "Sesseion", field: "sesseion"
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
                    <h3>View Uploaded Trainer Forms</h3>
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

export default Viewuploadedtrainerform;