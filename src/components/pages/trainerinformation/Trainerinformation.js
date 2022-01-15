import React, { Component,useState,useEffect } from 'react';

import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';

const Trainerinformation = () => {
    const [countries,setCountries]= useState([]);

    const [firstname, setfirstname]=useState("");
    const [lastname, setlastname]=useState("");
    const [profession, setProfession]=useState("");
    const [education, setEducation]=useState("");
    const [year_exp, SetYear_exp]=useState("");
    const [license, SetLicense]=useState("");
    const [certificationscompleted, SetCertificationscompleted]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [telephone, setTelephone]=useState("");
    const [address, setAddress]=useState("");
    const [city, setCity]=useState("");
    const [zipcode, setzipcode]=useState("");
    const [state, setState]=useState("");
    const [country, setCountry]=useState("");

    
    useEffect(() => {
        
       fetch("http://localhost:5000/api/countries").then((result)=>{

        result.json().then((resp)=>{
            // console.warn("result",resp)
            setCountries(resp.countries)
       });

       })

       
      },[]);
      

    //   console.warn(countries)
      
    function saveTrainerinfo(){

        let data = {firstname,lastname,profession,education,year_exp,license,certificationscompleted,email,password,telephone,address,city,zipcode,state,country}

        fetch("http://localhost:5000/api/trainer/create",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'content-Type': 'application/json'
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
                        <h3>Add Trainer Information</h3>
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
                                <div className="col-lg-4">
                                    <div className="client-input">
                                        <p>Profession</p>
                                        <input value={profession} onChange={(e)=>{setProfession(e.target.value)}} placeholder="Enter profession" />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="client-input">
                                        <p>Highest Degree Earned</p>
                                        <input value={education} onChange={(e)=>{setEducation(e.target.value)}} placeholder="Enter highest degree earned" />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="client-input">
                                        <p>Years of Profession Experience</p>
                                        <input value={year_exp} onChange={(e)=>{SetYear_exp(e.target.value)}} placeholder="Enter number of years of experience" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Licenses</p>
                                        <input value={license} onChange={(e)=>{SetLicense(e.target.value)}} placeholder="Enter licenses" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Certificate</p>
                                        <input value={certificationscompleted} onChange={(e)=>{SetCertificationscompleted(e.target.value)}} placeholder="Certificate" />
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
                                        <p>Telephone</p>
                                        <input value={telephone} onChange={(e)=>{setTelephone(e.target.value)}}  placeholder="Enter a telephone" />
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
                                            {
                                                countries.map((country)=>
                                                    <option>{country.name}</option>
                                                )
                                            } 
                                           
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="go-back">
                                        <a href="#">Go Back</a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="create-btn">
                                        <button type="submit" onClick={saveTrainerinfo}>Create</button>
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

export default Trainerinformation;