import React, {useEffect,useState} from "react";
import {Link,useParams, Router} from 'react-router-dom';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'

const Bankform = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [forms, setforms] = useState([]);
    const [data, setdata] = useState([]);


    useEffect(() => {
        PdfbankForm();

    }, []);

    

    const columns =[
        {
            title: "Form Name", field: "name"
        },
        {
            title: <span className="text-right">Actions</span>, field: "download"
        }
       
    ]

    const PdfbankForm = () => {
        fetch("https://capno-api.herokuapp.com/api/forms/blank",
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
                    console.log("result", resp);
                    let _temp = [] ;
                    resp.forms.map((v,i) => {
                        _temp.push({
                            name : v.forms,
                            download: <p><a href={v.file} className="downloadimg" download><img src={download} /></a> <a href='#' className="downloadimg" target="_blank"><img src={preveiw} /></a></p>
                            
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
                    <h3>Bank form</h3>
                </div>
                <div className="wrp-bankform">
                    <div style={{ maxWidth: '100%' }}>
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

export default Bankform;