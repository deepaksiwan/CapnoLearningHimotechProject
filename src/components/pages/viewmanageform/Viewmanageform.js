import React from "react";
import {Link,useParams} from 'react-router-dom';
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';

const Viewmanageform = () =>{
    
    const Viewmanagelist = [
        {
            to: "/bankform", displayViewmanagelist: "Download Fill-in PDF Blank Forms"
        },
        {
            to: "/uploadclientform", displayViewmanagelist: "Upload Completed Client Forms"
        },
        {
            to: "/uploadtrainnerform", displayViewmanagelist: "Upload Completed Trainer Forms"
        },
        {
            to: "/viewuploadedclientform", displayViewmanagelist: "View Completed Client Forms"
        },
        {
            to: "/viewuploadedtrainerform", displayViewmanagelist: "View Completed Trainer Forms"
        },
        {
            to: "/viewcompletedclientwork", displayViewmanagelist: "View Homework Assignment"
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
                                Viewmanagelist.map(function(viewlist){
                                    return(
                                        <li>
                                            <div className="create-list-box"><Link to={viewlist.to}>{viewlist.displayViewmanagelist}</Link></div>
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

export default Viewmanageform;