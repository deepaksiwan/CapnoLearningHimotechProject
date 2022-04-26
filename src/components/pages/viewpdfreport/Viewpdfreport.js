import React, {useEffect,useState} from "react";
import {Link,useParams, Router} from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';
const Viewpdfreport = () =>{

    const { t } = useTranslation();
    const accessToken = localStorage.getItem('accessToken');
    const [pdfs, setpdfs] = useState([]);
    const sessionid = localStorage.getItem('selectedSession');
    const Clientid = localStorage.getItem('selectedClient');
    const [selectedClient,setSelectedClient] = useState() ;
    const [selectedSession,setSelectedSession] = useState() ;
    const [selectedGroup,setselectedGroup] = useState() ;
    const [selectedHomework,setselectedHomework] = useState() ;
    const [userType,setUserType] = useState() ;

    

    useEffect(() => {

        setInterval(() => {
            setSelectedClient(localStorage.getItem('selectedClient'));
            setSelectedSession(localStorage.getItem('selectedSession'));
            setselectedGroup(localStorage.getItem('selectedGroup'));
            setselectedHomework(localStorage.getItem('selectedHomework'));
        //    console.log(selectedSession);
           setUserType(localStorage.getItem('userType'));
        }, 1000);

    }, []); 

    useEffect(() => {
        Singlesession();
        Multisession();
    },[selectedSession,selectedClient,selectedGroup,selectedHomework])
      
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
                    setpdfs(resp.pdfs);
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
                    setpdfs(resp.pdfs);
                   

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
        alert("You Logout successful")
    }


    return(
        <div>
        <Header />
        <div className="wrp-dashbord">
            <div className="sidebar-section">
             <Sidebar />
            </div>
            <div className="right-section">
            <Filter />
            <div className="create-section">
                       <ul className="create-list">
                            <li>
                            
                                <div className="create-list-box"><Link to={(pdfs.length == 0 || selectedSession === "null" || selectedGroup === "true" || selectedHomework === "true" || selectedClient === "null" ) ? "": "/pdf/session/data/report/single" } className={(pdfs.length == 0 || (selectedSession === "null" || selectedGroup === "true" || selectedHomework === "true" || selectedClient === "null") ) ? "deactivate": "" }> {t('pdf-Session-Data-Reports')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(pdfs.length == 0 || selectedClient === "null" || selectedGroup === "true" || selectedSession !== "null") ? "": "/pdf/session/data/report/multi" } className={(pdfs.length == 0 || selectedClient === "null" || selectedGroup === "true" || selectedSession !== "null") ? "deactivate": "" }>{t('pdf-Multi-session-Data-Reports')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(pdfs.length == 0 || selectedSession === "null" || selectedGroup === "false" || selectedSession === "null" ) ? "": "/pdf/session/data/report/group" } className={(pdfs.length == 0 || selectedSession === "null" || selectedGroup === "false" || selectedSession === "null" ) ? "deactivate": "" }> {t('pdf-Group-Session-Data-Reports')} </Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(pdfs.length == 0 || selectedSession === "null" || selectedHomework === "false") ? "": "/pdf/session/data/report/homework" } className={(pdfs.length == 0 || selectedSession === "null" || selectedHomework === "false") ? "deactivate": "" }>{t('Client-Homework-Data-Session')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(pdfs.length == 0 || (selectedSession === "null" || selectedGroup === "true" || selectedHomework === "true" || selectedClient === "null") ) ? "": "/pdf/sessetion/report/notes" } className={(pdfs.length == 0 || (selectedSession === "null" || selectedGroup === "true" || selectedHomework === "true" || selectedClient === "null") ) ? "deactivate": "" }>{t('Session-Report-Notes')}</Link></div>
                            </li>
                       </ul>
                   </div>
              
            </div>
        </div>
     </div>

    )
}

export default Viewpdfreport;