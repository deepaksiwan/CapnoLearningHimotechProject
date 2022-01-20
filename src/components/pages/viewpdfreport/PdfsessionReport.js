import React, {useEffect,useState} from "react";
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'

const PdfsessionReport = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [pdfs, setpdfs] = useState([]);
    const [data, setData] = useState([]);
    const sessionid = localStorage.getItem('selectedSession');
    const Clientid = localStorage.getItem('selectedClient');
    const {pdftype} = useParams();
    

    useEffect(() => {
        if(pdftype == "multi"){
            Multisession()
        }
        else{
            Singlesession();

        }
        

    }, []);


    const Singlesession = () => {
        fetch("https://capno-api.herokuapp.com/api/report/single/pdf?session_id=" + sessionid,
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
                    let _temp = [] ;
                    resp.pdfs.map((v,i) => {
                        _temp.push({
                            report : v.pdf_name,
                            Createdate : new Date(v.added_on).toLocaleString(),
                            actions : <p><a href='#' className="downloadimg"><img src={preveiw} /></a></p>
                        })
                    })
                    setData(_temp);

                    // let len = pdfs.length;
                    //   console.warn(len);
                   

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

    const Multisession = () => {
        fetch("https://capno-api.herokuapp.com/api/report/multiple/pdf?client_id=" + Clientid,
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
                    let _temp = [] ;
                    resp.pdfs.map((v,i) => {
                        _temp.push({
                            report : v.name,
                            Createdate : new Date(v.added_on).toLocaleString(),
                            actions : <p><a href='#' className="downloadimg"><img src={preveiw} /></a></p>
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
            title: "Report Name", field: "report"
        },
        {
            title: <span className="text-right">Created Date Time</span>, field: "Createdate"
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
                    <h3>Session Data Reports</h3>
                    <p>{pdftype == "multi"? "Multi": pdftype == "single"? "Single" : pdftype == "group"? "Group" : pdftype == "homework"? "Homework" : null } Pdf Sesseion Report</p>
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

export default PdfsessionReport;