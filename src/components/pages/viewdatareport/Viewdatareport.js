import React from "react";
import {Link,useParams, Router} from 'react-router-dom';
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';
const Viewdatareport = () =>{
    
    const Viewdatalist = [
        {
            links: "/sessiondatareport", displayViewdatalist: "Session Data Reports"
        },
        {
            links: "/multidataReport", displayViewdatalist: "Multisession Data Reports"
        },
        {
            links: "/groupsessiondatareport", displayViewdatalist: "Group Session Data Reports"
        },
        {
            links: "/clienthomeworkdatareport", displayViewdatalist: "Client Homework Data Reports"
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
                                Viewdatalist.map(function(Datalist){
                                    return(
                                        <li>
                                            <div className="create-list-box"><Link to={Datalist.links}>{Datalist.displayViewdatalist}</Link></div>
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

export default Viewdatareport;