import React, {useEffect,useState} from "react";
import {Link,useParams} from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';

const Sectionreportassembly = () =>{

    const { t } = useTranslation();
    const Reportassemblylist = [
        {
            displayAssemblylist: t('Create-Session-Report')
        },
        {
            displayAssemblylist: t('View/Edit/Delete/Download-Session-Report')
        },
       
        
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
                                Reportassemblylist.map(function(assemblylist){
                                    return(
                                        <li>
                                            <div className="create-list-box"><a href="#">{assemblylist.displayAssemblylist}</a></div>
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

export default Sectionreportassembly;