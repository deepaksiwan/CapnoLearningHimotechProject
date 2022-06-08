import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { ModalHeader, Modal, ModalBody } from "reactstrap";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';
import Item from "antd/lib/list/Item";

const Createdata = (props) => {
    const { t } = useTranslation();
    const [selectedClient, setSelectedClient] = useState();
    const [selectedSession, setSelectedSession] = useState();
    const [selectedGroup, setselectedGroup] = useState();
    const [userType, setUserType] = useState();
    const [graphModal, setgraphModal] = useState(false);
    const toggleGraphModal = () => setgraphModal(!graphModal);
    const [selectfolder, setselectfolder] = useState(false)
    const [Showfiles, setShowfiles] = useState(false)
    const [selectedfiles, setselectedfiles] = useState([])


    const CreateDatalist = [
        {
            to: "/createsavedatasession", displayCreateDatalist: "Create & Save a Session Data Report"
        },
        {
            to: "/createmultisession", displayCreateDatalist: "Create & Save a Multisession Report"
        },
        {
            to: "/creategroupsessetionreport", displayCreateDatalist: "Create & Save a Group Session Report"
        },
        {
            to: "/demodatareport", displayCreateDatalist: "PRACTICE: Creating Data Reports (Demo Data Only)"
        }

    ]
    useEffect(() => {
        setInterval(() => {
            setSelectedClient(localStorage.getItem('selectedClient'));
            setSelectedSession(localStorage.getItem('selectedSession'));
            setselectedGroup(localStorage.getItem('selectedGroup'));
            //console.log(selectedSession);
            setUserType(localStorage.getItem('userType'));
        }, 1000);

    }, [])

    const choosefolder = (event) => {
        setselectfolder(true)
        setShowfiles(true)
        setselectedfiles([])
        var files = event.target.files;
        var temp = [];
        for (var i = 0; i < files.length; i++) {
            temp.push(files[i].webkitRelativePath);
            console.log("array result", temp);

        };
        setselectedfiles(temp);
    };

    // var choosefolder = document.getElementById("folder").addEventListener("change", function (event) {
    //     var output = document.querySelector("ul");
    //     var files = event.target.files;
    //     for (var i = 0; i < files.length; i++) {
    //         var item = document.createElement("li");
    //         item.innerHTML = files[i].webkitRelativePath;
    //         output.appendChild(item);
    //     };
    // }, false);

    return (
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

                                <div className="create-list-box"><Link to={(selectedSession === "null" || selectedGroup === "true") ? "" : "/choose/report/config"} className={(selectedSession === "null" || selectedGroup === "true") ? "deactivate" : ""}>{t('Create-&-Save-a-Session-Data-Report')}</Link></div>

                            </li>

                            <li>
                                <div className="create-list-box"><Link to={selectedClient === "null" || selectedSession !== "null" || selectedGroup === "true" ? "" : "/createmultisession"} className={selectedClient === "null" || selectedSession !== "null" || selectedGroup === "true" ? "deactivate" : ""}>{t('Create-&-Save-a-Multisession-Report')}</Link></div>

                            </li>
                            <li>
                                <div className="create-list-box"><Link to={selectedSession === "null" || selectedGroup === "false" ? "" : "/creategroupsessetionreport"} className={selectedSession === "null" || selectedGroup === "false" ? "deactivate" : ""}>{t('Create-&-Save-a-Group-Session-Report')}</Link></div>
                            </li>
                            <li>
                                <div className="create-list-box"><Link to="/demodatareport" >{t('PRACTICE:-Creating-Data-Reports-(Demo Data Only)')}</Link></div>
                            </li>
                            {/* <li>
                              
                                <div className="create-list-box"><Link to="/choose/exported/file/config" >{t('Create report using exported session files')}</Link></div>
                                
                            </li> */}

                            <li>
                                <div className="create-list-box1" onClick={toggleGraphModal}>{t('Create report using exported session files')}</div>
                            </li>

                        </ul>
                        <Modal isOpen={graphModal} toggle={toggleGraphModal} className="modal-box-wrp" centered={true}>
                            <ModalHeader toggle={toggleGraphModal}><span className="ml-1 modal-head roititle">please choose folder </span></ModalHeader>
                            <ModalBody>
                                <div className="form-group files mb-10">
                                    <p><input className="form-control" onChange={choosefolder} multiple="" name="filelist" id="folder" type="file" webkitdirectory="true" directory

                                    /></p>

                                    <div className="">
                                        {selectedfiles.length > 0 ? (
                                            <div>
                                                <p>select file:
                                                    
                                                    {
                                                        selectedfiles.map((v, i) => {
                                                            return (
                                                                
                                                            <li>{v}</li>
                                                                
                                                            )
                                                        })
                                                    }
                                                    
                                                </p>
                                            </div>
                                        ) : (
                                            <p>Select a folder to show files</p>
                                        )}
                                    </div>

                                </div>

                            </ModalBody>
                        </Modal>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Createdata;