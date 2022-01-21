import React, { Component, useEffect, useRef, useState } from "react";
import {Link,useParams} from 'react-router-dom';
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';

const Uploadclientform = () =>{
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id');
    const [trainers, settrainers] = useState([]);
    const trainerActive = useRef();

    


    useEffect( ()=>{
        getTrainers();

    },[])

    const getTrainers = () => {

        fetch("https://capno-api.herokuapp.com/api/trainers?user_id=" + userId + "&status=1",

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
                   settrainers(resp.trainers)
         

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
        <div>
         <Header />
         <div className="wrp-dashbord">
             <div className="sidebar-section">
              <Sidebar />
             </div>
             <div className="right-section">

             <div className="container-fluid">
                <div className="configer-head">
                    <div className="configer-child1">
                        <h3>Upload Client Form</h3>
                    </div>
                   
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                    <div className="trainerbox">
                        <div className="trainer-c"><p>Trainer:</p></div>
                   <div className="padding-box">
                   <div className="main-checkbox">
                  
                  <div className="checkbox-wrp">
                      <div class="custom-radios">
                           <input type="checkbox" id="6" ref={trainerActive} />
                           <label for="6">
                           <span className="redious">
                           </span>
                           </label>
                       </div>
                       <div className="caption-cheeckbox">
                           <p>Active</p>
                       </div>
                  </div>
                  <div className="checkbox-wrp">
                      <div class="custom-radios">
                           <input type="checkbox" id="7"  />
                           <label for="7">
                           <span className="redious">
                           </span>
                           </label>
                       </div>
                       <div className="caption-cheeckbox">
                           <p>Inactive</p>
                       </div>
                  </div>
                  </div>
                  <div className="select-client">
                   <select>
                       <option>Choose a trainer</option>
                       {
                           trainers.map((trainers, i)=>{
                               return(
                                <option>{trainers.firstname} {trainers.lastname}</option>
                               )
                           })
                       }
                     
                   </select>
                  </div>
                   </div>
                </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="trainerbox">
                        <div className="trainer-c"><p>Client:</p></div>
                   <div className="padding-box">
                   <div className="main-checkbox">
                  
                  <div className="checkbox-wrp">
                      <div class="custom-radios">
                           <input type="checkbox" id="color-8"  />
                           <label for="color-8">
                           <span className="redious">
                           </span>
                           </label>
                       </div>
                       <div className="caption-cheeckbox">
                           <p>Active</p>
                       </div>
                  </div>
                  <div className="checkbox-wrp">
                      <div class="custom-radios">
                           <input type="checkbox" id="color-9" />
                           <label for="color-9">
                           <span className="redious">
                           </span>
                           </label>
                       </div>
                       <div className="caption-cheeckbox">
                           <p>Groups</p>
                       </div>
                  </div>
                  <div className="checkbox-wrp">
                      <div class="custom-radios">
                           <input type="checkbox" id="color-10" />
                           <label for="color-10">
                           <span className="redious">
                           </span>
                           </label>
                       </div>
                       <div className="caption-cheeckbox">
                           <p>Inactive</p>
                       </div>
                  </div>
                  </div>
                  <div className="select-client">
                   <select>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                   </select>
                  </div>
                   </div>
                </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="trainerbox">
                        <div className="trainer-c"><p>Form Name:</p></div>
                   <div className="padding-box">
                   
                  <div className="select-client mrt-select">
                   <select>
                       <option>Interview Checklist Fill-in</option>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                       <option>Choose a client</option>
                   </select>
                  </div>
                   </div>
                </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="trainerbox">
                        <div className="trainer-c"><p>Upload PDF Form:</p></div>
                        <div className="padding-box mrt-select">
                         <input type="file" name="file" accept=".pdf"  />
                        </div>
                        </div>
                    </div>
                </div>
                <div className="client-submit-btn">
                    <button>Submit</button>
                </div>
            </div>
               
             </div>
         </div>
      </div>
    )
}

export default Uploadclientform;