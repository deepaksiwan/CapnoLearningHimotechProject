import React, {useEffect,useState} from "react";
import {Link,useParams} from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';

const Assemblyreport = () => {

    const { t } = useTranslation();

    const Viewlivelist = [
        {
            displayViewlivelist: "View Live Session Notes"
        },
        {
            displayViewlivelist: "Download Live Session Notes"
        },
        {
            displayViewlivelist: "View Live Session Images"
        },
        {
            displayViewlivelist: "Download Live Session Images"
        }

    ]


    return (
        <div>
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="assembly-content">
                        <h3>{ t('Session-Assembly-Reports')}</h3>
                        <p> {t('assembly-report-p')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assemblyreport;