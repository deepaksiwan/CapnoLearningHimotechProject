import React from "react";
import {BrowserRouter, Routes ,Route, Link,} from 'react-router-dom';
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';

const Viewcreate = () =>{
    
    const Viewcreatelist = [
        {
           links:"/clientinformation", displayViewcreatelist: "New Client"
        },
        {
            links:"/editclient", displayViewcreatelist: "Edit Client"
        },
        {
            links:"/trainerinformation",displayViewcreatelist: "New Trainer"
        },
        {
            links:"/edittrainer",displayViewcreatelist: "Edit Trainer"
        },
        {
            links:"/groupinformation",displayViewcreatelist: "New Group"
        },
        {
            links:"/editgroup",displayViewcreatelist: "Edit Group"
        },
        {
            links:"/editprofile", displayViewcreatelist: "Edit My Profile"
        },
        {
            links:"/hardwareprofile",displayViewcreatelist: "View/Edit Hardware Profile"
        }
        
    ]


    return(
         <div>
         <Header />
         <div className="wrp-dashbord">
             <div className="sidebar-section">
              <Sidebar />
             </div>
             <div className="right-section">
             <Filter />
             <div className="create-section">
                       <ul className="create-list">
                           {
                                Viewcreatelist.map(function(Vlist){
                                    return(
                                        <li>
                                            <div className="create-list-box"><Link to={Vlist.links}>{Vlist.displayViewcreatelist}</Link></div>
                                        </li> 
                                    )
                                }

                                )
                               
                           }
                       </ul>
                   </div>
               
             </div>
         </div>
      </div>
    )
}

export default Viewcreate;