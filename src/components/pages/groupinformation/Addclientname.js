import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';

const Addclientname = (props) => {
    const clientname = useRef();
    const serialNumber = useRef();
    
    const handleChange = () => {
        // console.log(props.index)
        // console.log({"device":serialNumber.current.value,"client":clientname.current.value})
        props.handleClientList(props.index,{"serialnumber":serialNumber.current.value,"name":clientname.current.value})
    }


    return (
        <div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="client-input">
                        <p>Client Name #{props.index}</p>
                        <input placeholder="Enter a Client Name" onChange={handleChange} ref={clientname} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="client-input">
                        <p>CapnoTrainer Serial Number</p>
                        <input placeholder="Write Serial Number" ref={serialNumber}  onChange={handleChange} />
                            
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Addclientname;