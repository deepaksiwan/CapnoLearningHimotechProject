import React, {useEffect,useState} from "react";
import {Link,useParams} from 'react-router-dom';
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';

const Viewmanageform = () =>{
    const accessToken = localStorage.getItem('accessToken');
    const [selectedClient,setSelectedClient] = useState() ;
    const [selectedSession,setSelectedSession] = useState() ;
    const Clientid = localStorage.getItem('selectedClient');
    const sessionid = localStorage.getItem('selectedSession');
    const [clientform, setclientform] = useState([]);

    // useEffect(() => {

    //     setInterval(() => {
    //         setSelectedClient(localStorage.getItem('selectedClient'));
    //         setSelectedSession(localStorage.getItem('selectedSession'));
    //     }, 1000);

    // }, []);

    // useEffect(()=>{
    //     uploadedClientform();

    // },[selectedClient])

    // const uploadedClientform = () => {
    //     fetch("https://capno-api.herokuapp.com/api/forms/client?client_id=" + Clientid,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-access-token': accessToken,
    //             },
    //         }
    //     ).then((response) => {
    //         if (response.status == 200) {
    //             response.json().then((resp) => {
    //                 // // console.warn("result", resp);
    //                 setclientform(resp.clientform);
    //             //    let len = clientform.length;
    //             //       console.log(len);

    //             });
    //         }
    //         else if (response.status == 401) {
    //             logout()
    //         }
    //         else {
    //             alert("network error")
    //         }


    //     })
    // }

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
                            <li>
                                <div className="create-list-box"><Link to={(selectedSession === "null")? "" : "/bankform"} className={(clientform.length == 0 || selectedClient === "true")? "deactivate" : ""}>Download Fill-in PDF Blank Forms</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(selectedClient === "null")? "": "/upload/client/form"} className={(selectedClient === "null")? "deactivate": ""}>Upload Completed Client Forms</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(selectedClient === "null")? "" : "/upload/trainner/form"} className={(selectedClient === "null")? "deactivate": ""}>Upload Completed Trainer Forms</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(selectedSession === "null")? "" : "/view/uploaded/client/form"} className={(selectedSession === "null")? "deactivate" : ""} >View Completed Client Forms</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to={(selectedSession === "null")? "" : "/view/uploaded/trainer/form"} className={(selectedSession === "null")? "deactivate" : ""}>View Completed Trainer Forms</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to="/view/completed/client/work">View Homework Assignment</Link></div>
                            </li>

                       </ul>
                   </div>
               
             </div>
         </div>
      </div>
    )
}

export default Viewmanageform;