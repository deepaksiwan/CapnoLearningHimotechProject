import React, { Component, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { Link, useParams, Router, NavLink } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import '../css/style.css'
// import '../css/style2.scss'
import '../css/responsive.css'
import $ from "jquery";
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
import logo from '../images/logo.png';
import burger from '../images/burger.png';
import connect from '../images/connect.png';
import gcircle from '../images/gcircle.png';
import crosss from '../images/crosss.png';
import Multilanguage from '../component/Multilanguage'




const Header = () => {

    const { t } = useTranslation();

    useEffect(() => {
        changePickupStoreMenu();

        function changePickupStoreMenu() {

            var body = $('body'),
                mask = $('<div class="mask"></div>'),
                toggleSlideRight = document.querySelector(".toggle-slide-right"),
                slideMenuRight = document.querySelector(".slide-menu-right"),
                activeNav = '';
            ;
            $('body').append(mask);

            /* slide menu right */
            toggleSlideRight.addEventListener("click", function () {
                $('body').addClass("smr-open");
                $('.mask').fadeIn();
                activeNav = "smr-open";
            });

            /* hide active menu if close menu button is clicked */
            $(document).on('click', ".close-menu", function (el, i) {
                $('body').removeClass(activeNav);
                activeNav = "";
                $('.mask').fadeOut();
            });

        }
    }, [])

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
    const auth = localStorage.getItem('user_id');
    const userType = localStorage.getItem('userType'); 
    const logout = () => {
        localStorage.clear();
        // alert("You Logout successful")
    }
    return (
        <div className="border-b">
            <div className="container-fluid">
                <div className="header-box">
                    <div className="header-c1">
                        <div className="header-child1">
                            <h3>{userType == 1 ? "Admin" :  userType == 2 ? "Trainer" : "Client" } {t("Cloud-Database-Dashboard")}</h3>
                        </div>
                    </div>

                    <div className="header-c2">
                    <div className="multi-langueage-wrp">
                        
                        </div>
                        <div className="burger-area">
                            <a href="#" className="burgers toggle-slide-right"> <img src={burger} /></a>
                        </div>
                        
                    </div>

                </div>

                <div className="menu slide-menu-right menu-list-wrp">
                    <button class="close-menu"><img src={crosss} className="img-close" /></button>
                    <ul className="sidebar-list">
                        {
                            tabArray.map(function (v, i) {
                                return (
                                    <li><NavLink to={v.links} className="close-menu" ><div className="sidebar-icon-img">{v.tabimg}</div><p>{v.tabDisplay}</p></NavLink></li>
                                )
                            }

                            )
                        }
                        <li>{
                            auth ? <Link to="/login" onClick={logout} className="tabs close-menu"><div className="sidebar-icon-img"><LogoutIcon /></div> <p>Logout</p></Link> : null
                        }</li>


                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Header;

