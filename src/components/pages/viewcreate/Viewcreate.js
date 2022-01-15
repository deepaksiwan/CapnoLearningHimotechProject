import React from "react";
import {BrowserRouter, Routes ,Route, Link,} from 'react-router-dom';
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';

const Viewcreate = () =>{
    
    const Viewcreatelist = [
        {
           links:"/client/information", displayViewcreatelist: "New Client"
        },
        {
            links:"/edit/client", displayViewcreatelist: "Edit Client"
        },
        {
            links:"/trainer/information",displayViewcreatelist: "New Trainer"
        },
        {
            links:"/edit/trainer",displayViewcreatelist: "Edit Trainer"
        },
        {
            links:"/group/information",displayViewcreatelist: "New Group"
        },
        {
            links:"/edit/group",displayViewcreatelist: "Edit Group"
        },
        {
            links:"/edit/profile", displayViewcreatelist: "Edit My Profile"
        },
        {
            links:"/hardware/profile",displayViewcreatelist: "View/Edit Hardware Profile"
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