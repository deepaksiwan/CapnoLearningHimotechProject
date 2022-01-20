import React, { Component, useState, useEffect } from 'react';
import { Link, useParams, Router,NavLink } from 'react-router-dom';
import sidebarmenu1 from '../images/sidebarmenu1.png'
import sidebarmenu2 from '../images/sidebarmenu2.png'
import sidebarmenu3 from '../images/sidebarmenu3.png'
import sidebarmenu4 from '../images/sidebarmenu4.png'
import sidebarmenu5 from '../images/sidebarmenu5.png'
import sidebarmenu6 from '../images/sidebarmenu6.png'
import sidebarmenu7 from '../images/sidebarmenu7.png'
import sidebarmenu8 from '../images/sidebarmenu8.png'
import sidebarmenu9 from '../images/sidebarmenu9.png'


const Sidebar = () => {

  const tabArray = [
    {
      links: "/", tabDisplay: "Create Data Report", "tabimg": sidebarmenu1
    },
    {
      links: "/view/data/report", tabDisplay: "View & Edit Data Report", "tabimg": sidebarmenu2
    },
    {
      links: "/view/pdf/report", tabDisplay: "View PDF Report", "tabimg": sidebarmenu3
    },
    {
      links: "/view/live", tabDisplay: "View Live Session Info", "tabimg": sidebarmenu4
    },
    {
      links: "/view/manageform", tabDisplay: "View/Manage Forms", "tabimg": sidebarmenu1
    },
    {
      links: "/viewcreate", tabDisplay: "View, Create, Edit Profile", "tabimg": sidebarmenu5
    },
    {
      links: "/section/report/assembly", tabDisplay: "Session Report Assembly", "tabimg": sidebarmenu6
    },
    {
      links: "/recording", tabDisplay: "Recording by Distributors", "tabimg": sidebarmenu7
    },
    {
      links: "/subscription/management", tabDisplay: "Subscription Management", "tabimg": sidebarmenu8
    },



  ];

  const auth = localStorage.getItem('user_id');

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      <div className="sidebar">
        <div class="header-child1 mrb-header"><h3>Dashboard</h3></div>
        <ul className="sidebar-list">
          {
            tabArray.map(function (v, i) {
              return (
                <li><NavLink to={v.links}><img src={v.tabimg} />{v.tabDisplay}</NavLink></li>
              )
            }

            )
          }
          <li>{
            auth ? <Link to="/login" onClick={logout} className="tabs"><img src={sidebarmenu9} />Logout</Link> : null
          }</li>


        </ul>
      </div>
    </div>
  )
}

export default Sidebar;