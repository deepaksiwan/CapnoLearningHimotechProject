
import { update } from "plotly.js";
import React, { Component, useEffect, useRef, useState } from "react";
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import { Link, useParams, Router } from 'react-router-dom';
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';
import { API_URL } from "../../../config";

const Subscriptionmanagement = () => {




    const { t } = useTranslation();
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id');
    const [owner, setOwner] = useState([]);
    const [autoupdate, setAutoUpdate] = useState(0);
    const [autorenew, setAutoRenew] = useState(0);
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);

    useEffect(() => {
        getOwnerProfile();
    }, [])

    const getOwnerProfile = () => {
        fetch(API_URL + "/owner/profile/" + userId,
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
                    // console.log("result", resp);
                    setOwner(resp.owner[0]);


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
    const subscriptionSave = () => {
        let data = {};

        data['autoupdate'] = autoupdate;
        data['autorenew'] = autorenew;


        fetch(API_URL + "/owner/subscription/update/" + userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.log("results", resp);
                    successToggleModal();

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }
            // alert("Updated")

        })

    }
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const handleAutoUpdate = (v) => {
        setAutoUpdate(v);
        subscriptionSave();
    }

    const handleAutorenew = (v) => {
        setAutoRenew(v);
        subscriptionSave();
    }


    return (
        <div>
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">

                    <div className="subscription-content">
                        <div className="software-updated-wrp">
                            <div className="software-updt-child1">
                                <h3>{t('Auto-software-update')}</h3>

                            </div>
                            <div className="software-updt-child1">
                                {
                                    owner.autoupdate >= 0 ?
                                        <div className="checkbox-wrp">

                                            <div className="radio-input"><input class="form-check-input" onChange={() => handleAutoUpdate(0)} type="radio" defaultChecked={owner.autoupdate == 0 ? true : false} value="0" name="autoaupdate" /><span>No</span></div>
                                            <div className="radio-input"> <input class="form-check-input" name="autoaupdate" type="radio" defaultChecked={owner.autoupdate == 1 ? true : false} value="1" onChange={() => handleAutoUpdate(1)} /><span>Yes</span></div>



                                        </div>
                                        :
                                        null
                                }


                            </div>
                        </div>
                        <div className="software-updated-wrp">
                            <div className="software-updt-child1">
                                <h3>{t('Auto-subscription-renewal-by-credit-card')}</h3>
                            </div>
                            <div className="software-updt-child1">
                                {
                                    owner.autorenew >= 0 ?
                                        <div className="checkbox-wrp">

                                            <div className="radio-input"><input class="form-check-input" onChange={() => handleAutorenew(0)} type="radio" defaultChecked={owner.autorenew == 0 ? true : false} value="0" name="autorenew" /><span>No</span></div>
                                            <div className="radio-input"> <input class="form-check-input" name="autorenew" type="radio" defaultChecked={owner.autorenew == 1 ? true : false} value="1" onChange={() => handleAutorenew(1)} /><span>Yes</span></div>

                                            {/* <div className="radio-input"><input class="form-check-input" onChange={() => handleAutorenew(0)} type="radio" defaultChecked={owner.autorenew == 0? true : false} value="0" name="autorenew" /><span>{t('no')}</span></div>
                           <div className="radio-input"> <input class="form-check-input" name="autorenew" type="radio" defaultChecked={owner.autorenew == 1? true : false} value="1" onChange={() => handleAutorenew(1)} /><span>{t('yes')}</span></div> */}

                                            {/* <div className="radio-input"><input class="form-check-input" onChange={() => handleAutorenew(0)} type="radio" defaultChecked={owner.autorenew == 0? true : false} value="0" name="autorenew" /><span>{t('no')}</span></div>
                           <div className="radio-input"> <input class="form-check-input" name="autorenew" type="radio" defaultChecked={owner.autorenew == 1? true : false} value="1" onChange={() => handleAutorenew(1)} /><span>{t('yes')}</span></div> */}

                                        </div>
                                        :
                                        null
                                }

                            </div>
                        </div>
                        <div className="notification-c">
                            <p>{t('You-will-receive-a-notification-30-days-before-expiration-of-your-subscription')}</p>
                            <div className="notify-step-p">
                                <p>{t('take-note-that-your-credit-card-will-be-charged-on-the-due-date')}</p>
                                <p>{t('make-payment-before-the-due-date-which-you-can-do-by-clicking-on-RENEWAL')}</p>
                                <p>{t('Click-here-to')} <a href="#">{t('RENEW')}</a> {t('now')}.</p>
                            </div>
                            <p><b>{t('Membership-Status')}</b> Active (<b>{t('Expiry-Date')}</b>: March 7,2022).</p>
                        </div>
                        <ul className="anual-renew-list">
                            <li><h3>{t('Annual-Renewal-Fees')}</h3></li>
                            <li><p>{t('$175.00-for-one-instrument')}</p></li>
                            <li><p>{t('$275.00-for-two-to-six-instruments')}</p></li>
                            <li><p>{t('$375.00-for-more-than-six-instruments')}</p></li>
                        </ul>
                    </div>
                </div>
            </div>

            <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        
                        <p>Subscription Updated Successfully</p>
                    </div>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default Subscriptionmanagement;