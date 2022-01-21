import React, {useEffect,useState} from "react";
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'
import Delete from '../../images/delete.png';

const Viewuploadedtrainerform = () => {
    const accessToken = localStorage.getItem('accessToken');
    const selectedClient = localStorage.getItem('selectedClient');
    const [data, setdata] = useState([]);

    useEffect(() => {
        viewtrainerform();

    }, []);

    
    const columns =[
        {
            title: "Form Name", field: "formname"
        },
        {
            title: "Client Name", field: "clientname"
        },
        {
            title: <span className="text-right">Actions</span>, field: "action"
        }
    ]
    const viewtrainerform = () => {
        fetch("https://capno-api.herokuapp.com/api/forms/client?type=2&client_id=" + selectedClient,
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
                    let _temp = [] ;
                    resp.forms.map((v,i) => {
                        _temp.push({
                            formname : v.form_name,
                            action: <p><a href='#' className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg"><img src={preveiw} /></a> <a href='#' className="downloadimg"><img src={Delete} /></a></p>
                            
                        })
                    })
                    setdata(_temp);

                  

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
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <div className="">
            <Header />
             <div className="wrp-dashbord">
                <div className="sidebar-section">
                <Sidebar />
               </div>
               <div className="right-section">
                <div className="head-demoreport">
                    <h3>View Uploaded Trainer Forms</h3>
                </div>
                <div className="wrp-bankform">
                    <div className="table-box">
                        <MaterialTable
                        columns={columns}
                        data={data}
                        title=""
                        />
                        
                    </div>
                </div>
               </div>
             </div>
            
        </div>
    )
}

export default Viewuploadedtrainerform;