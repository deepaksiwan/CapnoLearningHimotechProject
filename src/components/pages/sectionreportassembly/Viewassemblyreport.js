import React, {useEffect,useState} from "react";
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'


const Viewassemblyreport = () => {
    const accessToken = localStorage.getItem('accessToken');
   


    useEffect(() => {
        


    }, []);

    
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const columns =[
        {
            title: "Client", field: "Client"
        },
        {
            title: <span className="text-right">Session</span>, field: "Session"
        },
        {
            title: <span className="text-right">Report Title</span>, field: "reportTitle"
        },
        {
            title: <span className="text-right">Date Created</span>, field: "dateCreated"
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
                    <h3>Session Assembly Reports</h3>

                </div>
                <div className="wrp-bankform">
                    <div style={{ maxWidth: '100%' }}>
                        <MaterialTable
                        columns={columns}
                        // data={data}
                        title=""
                        />
                        
                    </div>
                </div>
               </div>
             </div>
            
        </div>
    )
}

export default Viewassemblyreport;