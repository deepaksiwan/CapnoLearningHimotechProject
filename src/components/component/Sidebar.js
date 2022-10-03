import React, { Component, useState, useEffect } from 'react';
import { Link, useParams, Router,NavLink } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";


import BorderColorIcon from '@mui/icons-material/BorderColor';
import PageviewIcon from '@mui/icons-material/Pageview';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import StreamIcon from '@mui/icons-material/Stream';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReportIcon from '@mui/icons-material/Report';
import VideocamIcon from '@mui/icons-material/Videocam';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import LogoutIcon from '@mui/icons-material/Logout';



import Multilanguage from '../component/Multilanguage'


const Sidebar = () => {
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState()

  const tabArray = [
    {
      links: "/", tabDisplay: t('Create-Data-Report'), "tabimg": <BorderColorIcon />
    },
    {
      links: "/view/data/report", tabDisplay: t('View-&-Edit-Data-Report'), "tabimg":<PageviewIcon />
    },
    {
      links: "/view/pdf/report", tabDisplay: t('View-PDF-Report'), "tabimg": <PictureAsPdfIcon />
    },
    {
      links: "/view/live", tabDisplay: t('View-Live-Session-Info'), "tabimg": <StreamIcon />
    },
    {
      links: "/view/manageform", tabDisplay: t('View/Manage-Forms'), "tabimg": <ManageAccountsIcon />
    },
    {
      links: "/viewcreate", tabDisplay: t('View-Create-Edit-Profile'), "tabimg": <PersonAddIcon />
    },
    {
      links: "/section/report/assembly", tabDisplay: t('Session-Report-Assembly'), "tabimg": <ReportIcon />
    },
    {
      links: "/recording", tabDisplay: t('Recording-by-Distributors'), "tabimg": <VideocamIcon />
    },
    {
      links: "/subscription/management", tabDisplay: t('Subscription-Management'), "tabimg": <TouchAppIcon />
    },
    // {
    //   links: "/subscribe/user", tabDisplay: t('Subscribed Users'), "tabimg": sidebarmenu8
    // },

  // {
  //     links: "/", tabDisplay: t('Group-Subscription-Management'), "tabimg": <PictureAsPdfIcon />
  //   },

  ];

  const handleActive = (index)=>{
    setActiveIndex(index)
  }

  const auth = localStorage.getItem('user_id');
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      
      <div className="sidebar">
     
        <div class="header-child1 mrb-header"><h3>{t("Database-Dashboard")}</h3></div>
        <ul className="sidebar-list">
         {/* "hi" {activeIndex} */}
          {
            tabArray.map(function (v, index) {
              return (
                <li><NavLink to={v.links}  onClick={() => handleActive(index)}><div className="sidebar-icon-img">{v.tabimg} </div> <p>{v.tabDisplay}</p></NavLink></li>
              )
            }

           )
          }
          
          <li>{
            auth ? <Link to="/login" onClick={logout} className="tabs"><div className="sidebar-icon-img"><LogoutIcon /></div><p>{t('Logout')}</p></Link> : null
          }</li>

         


        </ul>
      </div>
    </div>
  )
}

export default Sidebar;