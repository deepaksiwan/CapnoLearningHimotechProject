import React from 'react';
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import Delete from '../../images/delete.png'
import edit from '../../images/edit.png'

const Hardwareprofile = () => {
    const {tab} = useParams();

    const data =[
        {
            name: "P5.0-0003", date: "July 27,2021", download: <p><a href='#' className="downloadimg"><img src={Delete} /></a> <a href='#' className="downloadimg"><img src={edit} /></a></p>
        },
        
       
    ]

    const columns =[
        {
            title: "Serial Number", field: "name"
        },
        {
            title: "Date activated", field: "date"
        },
        {
            title: "Actions", field: "download"
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
                    <h3>Hardware Profiles</h3>
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

export default Hardwareprofile;