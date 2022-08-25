import React, {useEffect,useState} from "react";
import {Link,useParams, Router} from 'react-router-dom';
import { useTranslation, initReactI18next } from "react-i18next";
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'
import { API_URL } from "../../../config";
import backIcon from "../../../components/images/back.png";

const SessiondataReport = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [reports, setviewreports] = useState([]);
    const [data, setData] = useState([]);
    const sessionid = localStorage.getItem('selectedSession');
    const Clientid = localStorage.getItem('selectedClient');
    const {type} = useParams();
    const { t } = useTranslation();
    

    useEffect(() => {
        if(type == "multi"){
            Multisession()
        }
        else{
            Singlesession();

        }
        

    }, [sessionid,Clientid]);


    const Singlesession = () => {
        fetch(API_URL+"/report/single?session_id=" + sessionid,
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
                            actions : <p><a href={type == 'single' ? '/view/report/'+sessionid+"/"+v.id+'/all' : '/view/group/report/'+sessionid+"/"+v.id+'/all'} className="downloadimg"><img src={preveiw} /></a></p>
                        })
                    })
                    setData(_temp);

                    // let len = reports.length;
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
        fetch(API_URL+"/report/multiple?client_id=" + Clientid,
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
                            actions : <p><a href={"/view/multi/report/"+v.rid} className="downloadimg"><img src={preveiw} /></a></p>
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
            title: t("Report-Name"), field: "report"
        },
        {
            title: <span className="text-right">{t("Created-Date-Time")}</span>, field: "Createdate"
        },
        {
            title: <span className="text-right">{t("Actions")}</span>, field: "actions"
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
               <div className="back-icon-wrp">
                        <Link to="/view/data/report" className="backbtn-icon">
                            <img src={backIcon} alt="backicon" />
                            <span>{t("Back")}</span>
                        </Link>
                    </div>
                <div className="head-demoreport">
                    <h3>{t("Session-Data-Reports")}</h3>
                    <p>{type == "multi"? t("Multi"): type == "single"? t("Single") : type == "group"? t("group") : type == "homework"? t("homework") : null } {t("Sesseion-Report")}</p>
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

export default SessiondataReport;