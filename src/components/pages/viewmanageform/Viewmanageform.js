import React, {useEffect,useState} from "react";
import {Link,useParams} from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';
import { API_URL } from "../../../config";

const Viewmanageform = () =>{

    const { t } = useTranslation();
    const accessToken = localStorage.getItem('accessToken');
    const [selectedClient,setSelectedClient] = useState() ;
    const [selectedSession,setSelectedSession] = useState() ;
    const Clientid = localStorage.getItem('selectedClient');
    const sessionid = localStorage.getItem('selectedSession');
    const [forms, setforms] = useState([]);
    const [trainerforms, settrainerforms] = useState([]);
    const selectedtrainerActive = localStorage.getItem('selectedtrainerActive');

    useEffect(() => {

        setInterval(() => {
            setSelectedClient(localStorage.getItem('selectedClient'));
            setSelectedSession(localStorage.getItem('selectedSession'));
            
        }, 1000);

    }, []);

    useEffect(()=>{
        uploadedClientform();
        uploadedtrainerform();

    },[selectedClient,selectedSession])

    const uploadedClientform = () => {
        fetch(API_URL+"/forms/client?client_id=" + Clientid,
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
                    // // console.warn("result", resp);
                    setforms(resp.forms);
                //    let len = clientform.length;
                //       // console.log(len);

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
    const uploadedtrainerform = () => {
        fetch(API_URL+"/forms/client?client_id=" + Clientid + "&session_id=" + sessionid,
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
                    // // console.warn("result", resp);
                    settrainerforms(resp.forms);
                //    let len = clientform.length;
                //       // console.log(len);

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
                                <div className="create-list-box"><Link to="/bankform">{ t('Download-Fill-in-PDF-Blank-Forms')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(forms.length == 0 || selectedClient === "null")? "": "/upload/client/form"} className={(forms.length == 0 || selectedClient === "null")? "deactivate": ""}>{ t('Upload-Completed-Client-Forms')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(trainerforms.length == 0 || selectedClient === "null" || selectedSession === "null")? "" : "/upload/trainner/form"} className={(trainerforms.length == 0 || selectedClient === "null" || selectedSession === "null")? "deactivate": ""}>{ t('Upload-Completed-Trainer-Forms')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(selectedSession === "null")? "" : "/view/uploaded/client/form"} className={(selectedSession === "null")? "deactivate" : ""} >{ t('View-Completed-Client-Forms')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(selectedSession === "null")? "" : "/view/uploaded/trainer/form"} className={(selectedSession === "null")? "deactivate" : ""}>{ t('View-Completed-Trainer-Forms')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(selectedClient === "null" || selectedSession === "null")? "" : "/view/completed/client/work"} className={(selectedClient === "null" || selectedSession === "null")? "deactivate" : ""}>{ t('View-Homework-Assignment')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(selectedClient === "null" || selectedSession === "null")? "" : "/upload/homework/asignment"} className={(selectedClient === "null" || selectedSession === "null")? "deactivate" : ""}>{ t('Upload-Homework-Assignment')}</Link></div>
                            </li>

                       </ul>
                   </div>
               
             </div>
         </div>
      </div>
    )
}

export default Viewmanageform;