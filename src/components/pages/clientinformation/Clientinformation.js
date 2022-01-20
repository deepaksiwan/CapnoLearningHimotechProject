import React, { Component,useState,useEffect } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';

const Clientinformation = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [clients, setinclients] = useState([]);
    const [data, setData] = useState([]);
        let _userId = localStorage.getItem('user_id');
        let _userType = 3
        let _trainer = false;

    const [firstname, setfirstname]=useState("");
    const [lastname, setlastname]=useState("");
    const [gender, setGender]=useState("");
    const [age, setAge]=useState("");
    const [education, setEducation]=useState("");
    const [profession, setProfession]=useState("");
    const [telephone, setTelephone]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [complaint, setcomplaint]=useState("");
    const [address, setAddress]=useState("");
    const [city, setCity]=useState("");
    const [zipcode, setzipcode]=useState("");
    const [state, setState]=useState("");
    const [country, setCountry]=useState("");
    
    function saveClientinfo(){

        // console.warn({firstname,lastname,email,password,age,gender,education,profession,telephone,complaint,address,city,zipcode,state,country})

        let data = {firstname,lastname,email,password,age,gender,education,profession,telephone,complaint,address,city,zipcode,state,country}

        fetch("https://capno-api.herokuapp.com/api/clients",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            // console.warn("result",result);
            result.json().then((resp)=>{
                console.warn("resp",resp);

            })
        })

        alert("Successfully submitted");
    }
    

    return (
        <div className="demodata-bg">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="client-info-c">
                        <h3>Client Information</h3>
                        <div className="client-info-box">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>First Name</p>
                                        <input value={firstname} onChange={(e)=>{setfirstname(e.target.value)}} placeholder="Enter first name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Last Name</p>
                                        <input value={lastname} onChange={(e)=>{setlastname(e.target.value)}} placeholder="Enter last name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>Sex</p>
                                        <select value={gender} onChange={(e)=>{setGender(e.target.value)}}>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>Age</p>
                                        <input value={age} onChange={(e)=>{setAge(e.target.value)}} placeholder="Enter age" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Education</p>
                                        <select value={education} onChange={(e)=>{setEducation(e.target.value)}}>
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
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Profession</p>
                                        <input value={profession} onChange={(e)=>{setProfession(e.target.value)}} placeholder="Enter profession" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Telephone</p>
                                        <input value={telephone} onChange={(e)=>{setTelephone(e.target.value)}} placeholder="Enter a telephone" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Email</p>
                                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter an email" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Password</p>
                                        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter a telephone" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="client-input">
                                        <p>Presenting Complaint</p>
                                        <textarea value={complaint} onChange={(e)=>{setcomplaint(e.target.value)}}  placeholder="Enter a present considiton"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="client-input">
                                        <p>Address</p>
                                        <textarea value={address} onChange={(e)=>{setAddress(e.target.value)}} name="address" placeholder="Enter physical adderss 1"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>City</p>
                                        <input value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder="Enter City" />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>Postal Code</p>
                                        <input value={zipcode} onChange={(e)=>{setzipcode(e.target.value)}} placeholder="Enter postal code" />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>State/Province</p>
                                        <select name="state" id="state">
                                            <option value={state} onChange={(e)=>{setState(e.target.value)}} >Choose States/Province</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>Country</p>
                                        <select value={country} onChange={(e)=>{setCountry(e.target.value)}} name="country">
                                            <option value="">Choose Country</option>
                                            <option value="1">Afghanistan</option>
                                            <option value="2">Albania</option>
                                            <option value="3">Algeria</option>
                                            <option value="4">American Samoa</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="go-back">
                                        <Link to="/viewcreate">Go Back</Link>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="create-btn">
                                        <button type="submit" onClick={saveClientinfo}>Create</button>
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

export default Clientinformation;