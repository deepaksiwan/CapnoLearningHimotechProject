import React, { Component, useEffect, useRef, useState } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";

import right from '../../images/right.png';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';

import Multilanguage from '../../component/Multilanguage'


const Editprofile = () => {
    const { t } = useTranslation();

    const accessToken = localStorage.getItem('accessToken');
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const [owner, setOwner] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [qfirst, setqfirst] = useState([]);
    const [qsecond, setqsecond] = useState([]);
    const [qthird, setqthird] = useState([]);
    const [qfourth, setqfourth] = useState([]);
    const [qfifth, setqfifth] = useState([]);
    const firstname = useRef()
    const lastname = useRef()
    const businessname = useRef()
    const email = useRef()
    const telephone = useRef()
    const city = useRef()
    const address = useRef()
    const postalcode = useRef()
    const state = useRef()
    const country = useRef()
    const userId = localStorage.getItem('user_id');

    const { tab } = useParams();
    const QuestionArray = [
        {
            questionbold: "Question 1:", questiondisplay: t('I-will-be-working-with-clients'), id: "qfirst"
        },
        {
            questionbold: "Question 2:", questiondisplay: t('There-will-be-other-trainers-seeing-clients-besides-me'), id: "qsecond"
        },
        {
            questionbold: "Question 3:", questiondisplay: t('I-will-be-doing-groupwork-with-multiple-CapnoTrainers'), id: "qthird"
        },
        {
            questionbold: "Question 4:", questiondisplay: t('I-purchased-the-CapnoTrainer-HRV-P6.0-option'), id: "qfourth"
        },
        {
            questionbold: "Question 5:", questiondisplay: t('Auto-update-Computer-Software'), id: "qfifth"
>>>>>>> 70c74b095a92164362026187e8f6a36d67b0fdb0
=======
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import right from '../../images/right.png';


const Editprofile = () => {
    const { t } = useTranslation();

    const accessToken = localStorage.getItem('accessToken');
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const [owner, setOwner] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [qfirst, setqfirst] = useState([]);
    const [qsecond, setqsecond] = useState([]);
    const [qthird, setqthird] = useState([]);
    const [qfourth, setqfourth] = useState([]);
    const [qfifth, setqfifth] = useState([]);
    const firstname = useRef()
    const lastname = useRef()
    const businessname = useRef()
    const email = useRef()
    const telephone = useRef()
    const city = useRef()
    const address = useRef()
    const postalcode = useRef()
    const state = useRef()
    const country = useRef()
    const userId = localStorage.getItem('user_id');

    const { tab } = useParams();
    const QuestionArray = [
        {
            questionbold: "Question 1:", questiondisplay: t('I-will-be-working-with-clients'), id: "qfirst"
        },
        {
            questionbold: "Question 2:", questiondisplay: t('There-will-be-other-trainers-seeing-clients-besides-me'), id: "qsecond"
        },
        {
            questionbold: "Question 3:", questiondisplay: t('I-will-be-doing-groupwork-with-multiple-CapnoTrainers'), id: "qthird"
        },
        {
            questionbold: "Question 4:", questiondisplay: t('I-purchased-the-CapnoTrainer-HRV-P6.0-option'), id: "qfourth"
        },
        {
            questionbold: "Question 5:", questiondisplay: t('Auto-update-Computer-Software'), id: "qfifth"
>>>>>>> master
        }
    ]

    useEffect(() => {
        getOwnerProfile();
        getCountry();
    }, [])



    const profileSave = () => {
        let data = {};

        data['firstname'] = firstname.current.value;
        data['lastname'] = lastname.current.value;
        data['telephone'] = telephone.current.value;
        data['email'] = email.current.value;
        data['address'] = address.current.value;
        data['address'] = address.current.value;
        data['city'] = city.current.value;
        data['zipcode'] = postalcode.current.value;
        data['state'] = state.current.value;
        data['country'] = country.current.value;
        data['qfirst'] = qfirst;
        data['qsecond'] = qsecond;
        data['qthird'] = qthird;
        data['qfourth'] = qfourth;
        data['qfifth'] = qfifth;



        fetch("https://capno-api.herokuapp.com/api/owner/update/" + userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
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
            successToggleModal();

        })

    }

    const getOwnerProfile = () => {
        fetch("https://capno-api.herokuapp.com/api/owner/profile/" + userId,
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
                    setOwner(resp.owner[0]);
                    getState(resp.owner[0].country)

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
    const getCountry = () => {
        fetch("https://capno-api.herokuapp.com/api/countries",
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
    const getState = (countryid) => {


<<<<<<< HEAD

        fetch("https://capno-api.herokuapp.com/api/states?country_id=" + countryid,
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
<<<<<<< HEAD

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }

=======

=======

        fetch("https://capno-api.herokuapp.com/api/states?country_id=" + countryid,
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

<<<<<<< HEAD
>>>>>>> 70c74b095a92164362026187e8f6a36d67b0fdb0
=======
>>>>>>> master

        })
    }

    const handleCountryUpdate = () => {
        getState(country.current.value)
    }
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    const handleradio = (qid, v) => {

        if (qid == "qfirst") {
            setqfirst(v)
        }
        if (qid == "qsecond") {
            setqsecond(v)
        }
        if (qid == "qthird") {
            setqthird(v)
        }
        if (qid == "qfourth") {
            setqfourth(v)
        }
        if (qid == "qfifth") {
            setqfifth(v)
        }


    }

    return (
        <div className="demodata-bg">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
<<<<<<< HEAD
<<<<<<< HEAD
                    <div className="head-demoreport">
                        <h3>Edit Profile</h3>
=======
=======
>>>>>>> master
                    
                    <div className="wrp-head-profile">
                        <div className="head-demoreport">
                            <h3>{ t('edit-profile')}</h3>
                        </div>
<<<<<<< HEAD
                        <div>
                            <Multilanguage />
                        </div>
<<<<<<< HEAD
>>>>>>> 70c74b095a92164362026187e8f6a36d67b0fdb0
=======
>>>>>>> master
=======
                       
>>>>>>> cf376a3b96b361a2b1320a9f3e7a33df4000eb10
                    </div>
                    <div className="wrp-editprofile">
                        <ul className="question-list">
                            {
                                owner.firstname && QuestionArray.map((q, i) => {
                                    return (
                                        <li>
                                            <div className="wrp-question">
                                                <div className="question-child1">

<<<<<<< HEAD
<<<<<<< HEAD
                                                    <div><input class="form-check-input" type="radio" defaultChecked={owner[q.id] == "0" ? true : false} name={q.id} onChange={() => handleradio(q.id, 0)} value="0" /><span>No</span></div>
                                                    <div> <input class="form-check-input" type="radio" defaultChecked={owner[q.id] == "1" ? true : false} name={q.id} onChange={() => handleradio(q.id, 1)} value="1" /><span>Yes</span></div>
=======
                                                    <div><input class="form-check-input" type="radio" defaultChecked={owner[q.id] == "0" ? true : false} name={q.id} onChange={() => handleradio(q.id, 0)} value="0" /><span>{ t('no')}</span></div>
                                                    <div> <input class="form-check-input" type="radio" defaultChecked={owner[q.id] == "1" ? true : false} name={q.id} onChange={() => handleradio(q.id, 1)} value="1" /><span>{ t('yes')}</span></div>
>>>>>>> 70c74b095a92164362026187e8f6a36d67b0fdb0
=======
                                                    <div><input class="form-check-input" type="radio" defaultChecked={owner[q.id] == "0" ? true : false} name={q.id} onChange={() => handleradio(q.id, 0)} value="0" /><span>{ t('no')}</span></div>
                                                    <div> <input class="form-check-input" type="radio" defaultChecked={owner[q.id] == "1" ? true : false} name={q.id} onChange={() => handleradio(q.id, 1)} value="1" /><span>{ t('yes')}</span></div>
>>>>>>> master
                                                </div>
                                                <div className="question-child2">
                                                    <p><b>{q.questionbold}</b> {q.questiondisplay}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }

                                )
                            }
                        </ul>
                        <div className="edit-stoke"></div>
                        <div className="wrp-edit-form">
                            <div className="edit-input-wrp">
                                <div className="edit-input">
<<<<<<< HEAD
<<<<<<< HEAD
                                    <p>First Name:</p>
                                    <input placeholder="Peter" defaultValue={owner.firstname} ref={firstname} />
                                </div>
                                <div className="edit-input">
                                    <p>Last Name:</p>
                                    <input placeholder="Litchfield" defaultValue={owner.lastname} ref={lastname} />
                                </div>
                                <div className="edit-input">
                                    <p>Name of business:</p>
=======
                                    <p>{t('First-Name')}</p>
                                    <input placeholder="Peter" defaultValue={owner.firstname} ref={firstname} />
                                </div>
                                <div className="edit-input">
                                    <p>{t('Last-Name')}</p>
                                    <input placeholder="Litchfield" defaultValue={owner.lastname} ref={lastname} />
                                </div>
                                <div className="edit-input">
                                    <p>{t('Name-of-business')}</p>
>>>>>>> 70c74b095a92164362026187e8f6a36d67b0fdb0
=======
                                    <p>{t('First-Name')}</p>
                                    <input placeholder="Peter" defaultValue={owner.firstname} ref={firstname} />
                                </div>
                                <div className="edit-input">
                                    <p>{t('Last-Name')}</p>
                                    <input placeholder="Litchfield" defaultValue={owner.lastname} ref={lastname} />
                                </div>
                                <div className="edit-input">
                                    <p>{t('Name-of-business')}</p>

                                    <input placeholder="Name of business:" defaultValue={owner.business} ref={businessname} />
                                </div>
                            </div>
                            <div className="edit-input-wrp">
                                <div className="edit-input">

                                    <p>Email:</p>
                                    <input placeholder="Email" defaultValue={owner.email} ref={email} />
                                </div>
                                <div className="edit-input">
                                    <p>Password:</p>
                                    <input placeholder="Password" />
                                </div>
                                <div className="edit-input">
                                    <p>Telephone:</p>
=======
                                    <p>{t('Email')}</p>
                                    <input placeholder="Email" defaultValue={owner.email} ref={email} />
                                </div>
                                <div className="edit-input">
                                    <p>{t('Password')}</p>
                                    <input placeholder="Password" />
                                </div>
                                <div className="edit-input">
                                    <p>{t('Telephone')}</p>
>>>>>>> 70c74b095a92164362026187e8f6a36d67b0fdb0
=======
                                    <p>{t('Email')}</p>
                                    <input placeholder="Email" defaultValue={owner.email} ref={email} />
                                </div>
                                <div className="edit-input">
                                    <p>{t('Password')}</p>
                                    <input placeholder="Password" />
                                </div>
                                <div className="edit-input">
                                    <p>{t('Telephone')}</p>
>>>>>>> master
                                    <input placeholder="Telephone" defaultValue={owner.telephone} ref={telephone} />
                                </div>
                            </div>
                            <div className="edit-input-wrp">
                                <div className="edit-input address-input">
<<<<<<< HEAD
<<<<<<< HEAD
                                    <p>Address</p>
=======
                                    <p>{t('Address')}</p>
>>>>>>> 70c74b095a92164362026187e8f6a36d67b0fdb0
=======
                                    <p>{t('Address')}</p>
>>>>>>> master
                                    <input placeholder="7 Camino de Rey Cir" defaultValue={owner.address} ref={address} />
                                </div>
                            </div>
                            <div className="edit-input-wrp wrp-city-input">
                                <div className="edit-input">
<<<<<<< HEAD
<<<<<<< HEAD
                                    <p>City</p>
                                    <input placeholder="Santa Fe" defaultValue={owner.city} ref={city} />
                                </div>
                                <div className="edit-input">
                                    <p>Postal Code</p>
=======
                                    <p>{t('City')}</p>
                                    <input placeholder="Santa Fe" defaultValue={owner.city} ref={city} />
                                </div>
                                <div className="edit-input">
                                    <p>{t('Postal-Code')}</p>
>>>>>>> 70c74b095a92164362026187e8f6a36d67b0fdb0
                                    <input placeholder="87506" defaultValue={owner.zipcode} ref={postalcode} />
                                </div>
                                <div className="edit-input">
=======
                                    <p>{t('City')}</p>
                                    <input placeholder="Santa Fe" defaultValue={owner.city} ref={city} />
                                </div>
                                <div className="edit-input">
                                    <p>{t('Postal-Code')}</p>
                                    <input placeholder="87506" defaultValue={owner.zipcode} ref={postalcode} />
                                </div>
                                <div className="edit-input">
>>>>>>> master
                                    <p>{t('State/Province')}</p>
                                    <div className="select-client5">
                                        <select name="state" id="state" ref={state}>
                                            <option >Choose States/Province</option>

                                            {
                                                states.map((states, i) => {
                                                    return (
                                                        <option selected={states.id == owner.state ? true : false} value={states.id} >{states.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="edit-input">
<<<<<<< HEAD
<<<<<<< HEAD
                                    <p>Country</p>
=======
                                    <p>{t('Country')}</p>
>>>>>>> 70c74b095a92164362026187e8f6a36d67b0fdb0
=======
                                    <p>{t('Country')}</p>
>>>>>>> master

                                    <div className="select-client5">
                                        <select name="country" onChange={handleCountryUpdate} ref={country}>
                                            <option value="">Choose Country</option>
                                            {
                                                countries.map((countries, i) => {
                                                    return (
                                                        <option selected={owner.country == countries.id ? true : false} value={countries.id}>{countries.name}</option>
                                                    )
                                                })
                                            }


                                        </select>
                                    </div>
                                </div>
                            </div>
                            <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                                <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                                <ModalBody>
                                    <div className="modal-p">
                                        <div className="right-circle"><img src={right} /></div>
                                        <h4>Saved!</h4>
                                        <p>Your Form has been Updated Successfully</p>
                                    </div>
                                </ModalBody>

                            </Modal>
                            <div className="save-btn">
                                <button type="submit" onClick={profileSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Editprofile;