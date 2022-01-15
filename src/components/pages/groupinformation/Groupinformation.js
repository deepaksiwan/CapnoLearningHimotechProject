import React, { Component,useState,useEffect } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';

const Groupinformation = () => {

    return (
        <div className="demodata-bg">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="client-info-c">
                        <h3>New Group Information</h3>
                        <div className="client-info-box">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>First Name</p>
                                        <input  placeholder="Enter first name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                <div className="client-input">
                                        <p>Trainer</p>
                                        <select>
                                            <option>Select an option</option>
                                            <option>High School Degree</option>
                                            <option>Two Years Diploma</option>
                                            <option>Three Years Diploma</option>
                                            <option>Graduation Degree</option>
                                            <option>Post Graduation Degree</option>
                                            <option>phD Degree</option>
                                            <option>None of the above</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="add-clients">
                                <h3>Add Clients</h3>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Client Name</p>
                                        <input  placeholder="Enter Client Name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                <div className="client-input">
                                        <p>Serial Number</p>
                                        <input placeholder="Serial Number" />
                                    </div>
                                </div>
                            </div>
                         
                            <div className="row">
                               
                                <div className="col-lg-12">
                                    <div className="create-btn">
                                        <button type="submit">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Groupinformation;