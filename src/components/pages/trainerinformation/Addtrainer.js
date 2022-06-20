import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import right from '../../images/right.png'
import { API_URL } from '../../../config';

const Addtrainer = () => {
    const accessToken = localStorage.getItem('accessToken');
    const firstname = useRef()
    const lastname = useRef()
    const profession = useRef()
    const degreescompleted = useRef()
    const year_exp = useRef()
    const license = useRef()
    const certificationscompleted = useRef()
    const email = useRef()
    const telephone = useRef()
    const address = useRef()
    const address2 = useRef()
    const city = useRef()
    const zipcode = useRef()
    const state = useRef()
    const country = useRef()
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const [trainer, settrainer] = useState({});
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const associated_owner = localStorage.getItem('associated_owner');
    const [Loader, setLoader] = useState(false)


    useEffect(() => {
        getCountry();
    }, [])

    const getCountry = () => {
        fetch(API_URL+"/countries",
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
                    setCountries(resp.countries);

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
    const getState = () => {

    let countryid = country.current.value;

        fetch(API_URL+"/states?country_id=" + countryid,
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
                    setStates(resp.states);

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

    const createtrainers = () => {
        setLoader(true)
        let data ={};
        
        data['firstname'] = firstname.current.value;
        data["usertype"]  = 2;
        data['lastname'] = lastname.current.value;
        data['profession'] = profession.current.value;
        data['degreescompleted '] = degreescompleted .current.value;
        data['year_exp'] = year_exp.current.value;
        data['license'] = license.current.value;
        data['certificationscompleted'] = certificationscompleted.current.value;
        data['email'] = email.current.value;
        data['telephone'] = telephone.current.value;
        data['address'] = address.current.value;
        data['address2'] = address2.current.value;
        data['city'] = city.current.value;
        data['zipcode'] = zipcode.current.value;
        data['state'] = state.current.value;
        data['country'] = country.current.value;
        data['sendemail'] = true;
        data['associated_owner'] = associated_owner;
     

        fetch(API_URL+"/trainer/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken,
            },
            body:JSON.stringify(data)
        }).then((response) => {
            if (response.status == 201) {
                response.json().then((resp) => {
                    console.log("results", resp);
                  

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }
            setLoader(false)
        })

        successToggleModal();


    }
    const handleCountryUpdate = () => {
        getState(country.current.value)
    }
    const logout = () => {
        localStorage.clear();
        window.location.reload();
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
                                        <input placeholder="Enter first name" ref={firstname} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Last Name</p>
                                        <input placeholder="Enter last name" ref={lastname} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="client-input">
                                        <p>Profession</p>
                                        <input placeholder="Enter profession"  ref={profession} />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="client-input">
                                        <p>Highest Degree Earned</p>
                                        <input placeholder="Enter highest degree earned"  ref={degreescompleted} />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="client-input">
                                        <p>Years of Profession Experience</p>
                                        <input placeholder="Enter number of years of experience"  ref={year_exp} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Licenses</p>
                                        <input placeholder="Enter licenses"  ref={license} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Certificate</p>
                                        <input placeholder="Certificate"  ref={certificationscompleted} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Email</p>
                                        <input placeholder="Enter an email" ref={email} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="client-input">
                                        <p>Password</p>
                                        <input placeholder="Enter password" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="client-input">
                                        <p>Telephone</p>
                                        <input placeholder="Enter a telephone" ref={telephone} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="client-input">
                                        <p>Address</p>
                                        <textarea name="address" placeholder="Enter physical adderss 1"  ref={address}></textarea>
                                        <textarea name="address" placeholder="Enter physical adderss 2"  ref={address2}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>City</p>
                                        <input placeholder="Enter City" ref={city} />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>Postal Code</p>
                                        <input placeholder="Enter postal code"  ref={zipcode} />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>State/Province</p>
                                        <select name="state" id="state" ref={state}>
                                            <option >Choose States/Province</option>

                                            {
                                               states.map((states, i)=>{
                                                return(
                                                 <option selected={states.id == trainer.state? true : false} value={states.id}>{states.name}</option>
                                                )
                                             }) 
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="client-input">
                                        <p>Country</p>
                                        <select name="country" onChange={handleCountryUpdate}  ref={country}>
                                        <option value="">Choose Country</option>
                                            {
                                                countries.map((countries, i)=>{
                                                   return(
                                                    <option selected={trainer.country == countries.id ? true:false} value={countries.id}>{countries.name}</option>
                                                   )
                                                })
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
                                    <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                                        <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                                        <ModalBody>
                                        <div className="modal-p">
                                                <div className="right-circle"><img src={right} /></div>
                                                <h4>Save!</h4>
                                                <p>Your Form has been Submited Successfully</p>
                                            </div>
                                        </ModalBody>

                                    </Modal>
                                    <div className="create-btn">
                                        <button type="submit" onClick={createtrainers}>Create
                                        {
                                                Loader &&
                                                <div id="loader"></div>
                                            }
                                        </button>
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

export default Addtrainer;