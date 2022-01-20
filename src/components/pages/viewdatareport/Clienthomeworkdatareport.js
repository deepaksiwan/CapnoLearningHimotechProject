import React, {useEffect,useState} from "react";
import {Link,useParams, Router,Navigate, Outlet} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'

const Clienthomeworkdatareport = () => {

    const accessToken = localStorage.getItem('accessToken');
    const [reports, setviewreports] = useState([]);
    const [data, setData] = useState([]);
    const sessionid = localStorage.getItem('selectedSession');
    const auth = localStorage.getItem('user_id');

    useEffect(() => {
        Singlesession();

    }, []);


    const Singlesession = () => {
        fetch("https://capno-api.herokuapp.com/api/report/single?session_id=" + sessionid,
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
                    resp.reports.map((v,i) => {
                        _temp.push({
                            report : v.name,
                            Createdate : new Date(v.added_on).toLocaleString(),
                            actions : <p><a href='#' className="downloadimg"><img src={preveiw} /></a></p>
                        })
                    })
                    setData(_temp);

                    // let len = reports.length;
                      console.warn(len);
                   

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                
                return auth?<Outlet />:<Navigate to="/login" />
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
                    <p>SimulatedGroupTesting </p>
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

export default Clienthomeworkdatareport;