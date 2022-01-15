import React from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';

const Demodatareport = () => {




    return (
        <div className="demodata-bg">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="groupreport-list-head">
                        <h3>Preconfigured Group Reports</h3>
                    </div>
                    <ul className="groupreport-list">
                        <li><a href="#">Raw PCO2 Signals, all Rows, two Pages</a></li>
                        <li><a href="#">Raw PCO2 Signals, Rows & Columns, one Page</a></li>
                        <li><a href="#">PetCO2 Histories, all Rows, two Pages</a></li>
                        <li><a href="#">PetCO2 Histories, Rows & Columns, one Page</a></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Demodatareport;