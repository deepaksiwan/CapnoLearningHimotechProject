import React, {useEffect,useState} from "react";
import { Link } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';

const Createdata = () => {
    const { t } = useTranslation();
    const [selectedClient,setSelectedClient] = useState() ;
    const [selectedSession,setSelectedSession] = useState() ;
    const [selectedGroup,setselectedGroup] = useState() ;
    const [userType,setUserType] = useState() ;
   
    const CreateDatalist = [
        {
            to: "/createsavedatasession", displayCreateDatalist: "Create & Save a Session Data Report"
        },
        {
            to: "/createmultisession", displayCreateDatalist: "Create & Save a Multisession Report"
        },
        {
            to: "/creategroupsessetionreport", displayCreateDatalist: "Create & Save a Group Session Report"
        },
        {
            to: "/demodatareport", displayCreateDatalist: "PRACTICE: Creating Data Reports (Demo Data Only)"
        }
    ]

    useEffect(() => {
    setInterval(() => {
        setSelectedClient(localStorage.getItem('selectedClient'));
        setSelectedSession(localStorage.getItem('selectedSession'));
        setselectedGroup(localStorage.getItem('selectedGroup'));
    //    console.log(selectedSession);
       setUserType(localStorage.getItem('userType'));
    }, 1000);
        
    },[])

    return (
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
                              
                                <div className="create-list-box"><Link to={(selectedSession === "null" || selectedGroup === "true") ? "" : "/choose/report/config"} className={(selectedSession === "null" || selectedGroup === "true") ? "deactivate" : ""}>{t('Create-&-Save-a-Session-Data-Report')}</Link></div>
                                
                            </li>
                            
                            <li>  
                                 <div className="create-list-box"><Link to={selectedClient === "null" || selectedSession !== "null" ||  selectedGroup === "true" ? "" : "/createmultisession"}  className={selectedClient === "null" || selectedSession !== "null" ||  selectedGroup === "true" ? "deactivate" : ""}>{t('Create-&-Save-a-Multisession-Report')}</Link></div>
                              
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={selectedSession === "null" || selectedGroup === "false" ? "" : "/creategroupsessetionreport"}  className={selectedSession === "null" || selectedGroup === "false" ? "deactivate" : ""}>{t('Create-&-Save-a-Group-Session-Report')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to="/demodatareport" >{t('PRACTICE:-Creating-Data-Reports-(Demo Data Only)')}</Link></div>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Createdata;