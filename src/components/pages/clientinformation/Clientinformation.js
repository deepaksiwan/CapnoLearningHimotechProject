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

    // const [firstname, setfirstname]=useState("");
    // const [lastname, setlastname]=useState("");
    // const [gender, setGender]=useState("");
    // const [age, setAge]=useState("");
    // const [education, setEducation]=useState("");
    // const [profession, setProfession]=useState("");
    // const [telephone, setTelephone]=useState("");
    // const [email, setEmail]=useState("");
    // const [password, setPassword]=useState("");
    // const [complaint, setcomplaint]=useState("");
    // const [address, setAddress]=useState("");
    // const [city, setCity]=useState("");
    // const [zipcode, setzipcode]=useState("");
    // const [state, setState]=useState("");
    // const [country, setCountry]=useState("");

    const {id} = useParams();

    useEffect(()=>{
        getClient();
    },[])
    
    const getClient = () =>{
        fetch("https://capno-api.herokuapp.com/api/client/profile/"+id,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
        }
    ).then((response) => {
        if (response.status == 200) {
            response.json().then((resp) => {
                console.log("result", resp);
                setinclients(resp.clients);



            });
        }
        else if (response.status == 401) {
            logout()
        }
        else {
            alert("network error")
        }


    })
    }

    

    // function saveClientinfo(){

    //     // console.warn({firstname,lastname,email,password,age,gender,education,profession,telephone,complaint,address,city,zipcode,state,country})

    //     let data = {firstname,lastname,email,password,age,gender,education,profession,telephone,complaint,address,city,zipcode,state,country}

    //     fetch("https://capno-api.herokuapp.com/api/client/profile/"+id,{
    //         method:'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'x-access-token': accessToken,
    //         },
    //         body:JSON.stringify(data)
    //     }).then((result)=>{
    //         // console.warn("result",result);
    //         result.json().then((resp)=>{
    //             // console.warn("resp",resp);
    //             setinclients(resp.clients);


    //         })
    //     })

    //     alert("Successfully submitted");
    // }
    

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
                                        <input  placeholder="Enter first name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Last Name</p>
                                        <input   placeholder="Enter last name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>Sex</p>
                                        <select  >
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>Age</p>
                                        <input   placeholder="Enter age" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Education</p>
                                        <select >
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
                                        <input  placeholder="Enter profession" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Telephone</p>
                                        <input   placeholder="Enter a telephone" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Email</p>
                                        <input  placeholder="Enter an email" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Password</p>
                                        <input  placeholder="Enter a telephone" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="client-input">
                                        <p>Presenting Complaint</p>
                                        <textarea   placeholder="Enter a present considiton"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="client-input">
                                        <p>Address</p>
                                        <textarea  name="address" placeholder="Enter physical adderss 1"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>City</p>
                                        <input   placeholder="Enter City" />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>Postal Code</p>
                                        <input  placeholder="Enter postal code" />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>State/Province</p>
                                        <select name="state" id="state">
                                            <option >Choose States/Province</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>Country</p>
                                        <select  name="country">
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
                                        <button type="submit" >Create</button>
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