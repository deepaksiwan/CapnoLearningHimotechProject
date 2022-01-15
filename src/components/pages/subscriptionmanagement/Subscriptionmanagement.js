import React from "react";
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';

const Subscriptionmanagement = () =>{

    return(
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
                       <h3>Auto software update:</h3>
                   </div>
                   <div className="software-updt-child1">
                    <div className="checkbox-wrp">
                        <div class="custom-radios">
                                <input type="checkbox" id="color-11" />
                                <label for="color-11">
                                <span className="redious">
                                </span>
                                </label>
                            </div>
                            <div className="caption-cheeckbox no-mr">
                                <p>No</p>
                            </div>
                            <div class="custom-radios">
                                <input type="checkbox" id="color-12" />
                                <label for="color-12">
                                <span className="redious">
                                </span>
                                </label>
                            </div>
                            <div className="caption-cheeckbox">
                                <p>yes</p>
                            </div>
                    </div>
                   
                   </div>
               </div>
               <div className="software-updated-wrp">
                   <div className="software-updt-child1">
                       <h3>Auto subscription renewal by credit card:</h3>
                   </div>
                   <div className="software-updt-child1">
                    <div className="checkbox-wrp">
                        <div class="custom-radios">
                                <input type="checkbox" id="color-13" />
                                <label for="color-13">
                                <span className="redious">
                                </span>
                                </label>
                            </div>
                            <div className="caption-cheeckbox no-mr">
                                <p>No</p>
                            </div>
                            <div class="custom-radios">
                                <input type="checkbox" id="color-14" />
                                <label for="color-14">
                                <span className="redious">
                                </span>
                                </label>
                            </div>
                            <div className="caption-cheeckbox">
                                <p>yes</p>
                            </div>
                    </div>
                   
                   </div>
               </div>
               <div className="notification-c">
                   <p>You will receive a notification 30 days before expiration of your subscription</p>
                   <div className="notify-step-p">
                       <p>(1) take note that your credit card will be charged on the due date, OR</p>
                       <p>(2) make payment before the due date, which you can do by clicking on RENEWAL.</p>
                       <p>Click here to <a href="#">RENEW</a> now.</p>
                   </div>
                   <p><b>Membership Status:</b> Active (<b>Expiry Date</b>: March 7,2022).</p>
               </div>
               <ul className="anual-renew-list">
                   <li><h3>Annual Renewal Fees:</h3></li>
                   <li><p>$175.00 for one instrument</p></li>
                   <li><p>$275.00 for two to six instruments</p></li>
                   <li><p>$375.00 for more than six instruments</p></li>
               </ul>
           </div>
            </div>
        </div>
     </div>
    )
}

export default Subscriptionmanagement;