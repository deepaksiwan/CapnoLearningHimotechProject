import React from "react";
import {Link,useParams, Router} from 'react-router-dom';
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';

const Viewpdfreport = () =>{
    
    const Viewpdflist = [
        {
            links: "/pdfsessionreport", displayViewpdflist: "Session Data Reports"
        },
        {
            links: "/pdfmultisessionreport", displayViewpdflist: "Multisession Data Reports"
        },
        {
            links: "/groupsesstionreport", displayViewpdflist: "Group Session Data Reports"
        },
        {
            links: "/pdfclienthomeworkreport", displayViewpdflist: "Client Homework Data Reports"
        },
        {
            links: "/pdfsessetionreportNotes", displayViewpdflist: "Session Report Notes"
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
                                Viewpdflist.map(function(pdflist){
                                    return(
                                        <li>
                                            <div className="create-list-box"><Link to={pdflist.links}>{pdflist.displayViewpdflist}</Link></div>
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

export default Viewpdfreport;