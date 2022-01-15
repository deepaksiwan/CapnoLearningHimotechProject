import React from 'react';
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'

const Bankform = () => {

    const data =[
        {
            name: "Assessment Record Fill-in.pdf", download: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a></p>
        },
        {
            name: "Behavior Report Fill-in.pdf", download: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a></p>
        },
        {
            name: "Guided Breathing Record Fill-in.pdf", download: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a></p>
        },
        {
            name: "Homework Record Fill-in.pdf", download: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a></p>
        },
        {
            name: "Interview Checklist Fill-in.pdf", download: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a></p>
        },
        {
            name: "Interview Questionnaire Fill-in.pdf", download: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a></p>
        },
        {
            name: "Outcome Report Fill-in.pdf", download: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a></p>
        }
    ]

    const columns =[
        {
            title: "Form Name", field: "name"
        },
        {
            title: <span className="text-right">Actions</span>, field: "download"
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
                    <h3>Bank form</h3>
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

export default Bankform;