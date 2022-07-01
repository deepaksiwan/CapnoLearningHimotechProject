import React, {useState,useEffect,useRef} from "react";
import { useNavigate } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';
import { API_URL } from "../../../config";

const Assemblyreport = () => {

    const { t } = useTranslation();
    const accessToken = localStorage.getItem('accessToken');
    const sessionid = localStorage.getItem('selectedSession');
    const Clientid = localStorage.getItem('selectedClient');
    const [showsessiondate, setShowsessiondate] = useState(false)
    const handleClick = () => setShowsessiondate(!showsessiondate)
    const [completedForm, setCompletedForm] = useState(false)
    const handleCompleteForm = () => setCompletedForm(!completedForm)
    const [pdfdata, setPdfdata] = useState([]);
    const [formsName, setFormsName] = useState([])
    const [practionerformsName, setPractionerFormsName] = useState([])
    const [livenotesinput, setlivenotesinput] = useState(false);
    const [liveimagesinput, setliveimagesinput] = useState(false);
    const [reportnotesinput, setreportnotesinput] = useState(false);
    const [completeform, setCompleteform] = useState(false);
    const [selected, setSelected] = useState([]);
    const [selectedClient, setSelectedClient] = useState([]);
    const [selectedPractionar, setSelectedPractionar] = useState([]);

    const navigate = useNavigate();
    const pdfnames = useRef();
    const livenotes = useRef();
    const liveimages = useRef();
    const reportsnote = useRef();
    const cforms = useRef();
    
    
  

    
    useEffect(() => {
        getpdfname();
        getclientformName();
        getPractionerformName();
        
    }, []);




   
    function unCheck() {
        var x = document.getElementsByClassName("checkbox");
        for(i=0; i<=x.length; i++) {
        x[i].checked = false;
        x[i].value = 0;
        }   
    }
  
    const practionarNumberArray = [];
    var practionarlength = selectedPractionar.length;

    for (var i = 0; i < practionarlength; i++){
        practionarNumberArray.push(parseInt(selectedPractionar[i]));
    }
    
    const checkboxHandleclient = (event) => {

        const { checked, value } = event.currentTarget;

        setSelectedClient(
            prev => checked
                ? [...prev, value]
                : prev.filter(val => val !== value)
        );

       

    }

    const clientNumberArray = [];
    var clientlength = selectedClient.length;

    for (var i = 0; i < clientlength; i++){
        clientNumberArray.push(parseInt(selectedClient[i]));
    }
    const checkboxHandlePractional = (event) => {

        const { checked, value } = event.currentTarget;

        setSelectedPractionar(
            prev => checked
                ? [...prev, value]
                : prev.filter(val => val !== value)
        );

       

    }

    
    const PdfnumberArray = [];
    var Pdflength = selected.length;

    for (var i = 0; i < Pdflength; i++){
        PdfnumberArray.push(parseInt(selected[i]));
    }

    const checkboxHandle = (event) => {

        const { checked, value } = event.currentTarget;

        setSelected(
            prev => checked
                ? [...prev, value]
                : prev.filter(val => val !== value)
        );

       

    }
    const saveAssemblyreport = ()=>{
        
        const clientandpractionararray = clientNumberArray.concat(practionarNumberArray)
        
        let data ={};

        data['session'] = sessionid;
        data['reportids'] = PdfnumberArray;
        data['forms'] = clientandpractionararray;
        data['lnotes'] = livenotes.current.value;
        data['limages'] = liveimages.current.value;
        data['rnotes'] = reportsnote.current.value;
        data['cforms'] =  formsName.length > 0 && cforms.current.value;

        fetch(API_URL+"/save/assembly/report", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
        
                },
                body:JSON.stringify(data)
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((resp) => {
                        console.log("results", resp);
                        navigate("/edit/assembly/report/" + resp.id)
                    });
                }
                else {
                    alert("Network Error")
                }
               
            })
    
          
       
    }
    const getpdfname = () => {
        
        fetch(API_URL +"/assembly/session/report/" + sessionid,
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
                  
                    setPdfdata(resp.data);
                   
                   

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

    const getclientformName = () => {
        
        fetch(API_URL +"/get/client/formname/" + Clientid,
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
                  
                    setFormsName(resp.data);

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

    const getPractionerformName = () => {

        
        
        fetch(API_URL +"/get/practioner/formname/" + Clientid,
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
                  
                    setPractionerFormsName(resp.data);

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

    return (
        <div>
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="assembly-box">
                   
                        <div className="assembly-content">
                            <h3>Session Assembly Reports</h3>
                            <p>You may choose to assemble a SESSION REPORT consisting of any or all of the OPTIONS listed below. Check off the options you wish to include in the Report by clicking on the box in front of each option. These options will appear in the Report in the order shown below. If you do not place a check mark in the box in front of an option, it will not appear in the Report. You may choose to write additional notes in the Report as follows:</p>
                        </div>
                        <ul className="assembly-list">
                            <li><p>(1) a SUMMARY at the top of the Report</p></li>
                            <li><p>(2) a DESCRIPTION at the bottom of each SESSION IMAGE, and</p></li>
                            <li><p>(3) a DESCRIPTION at the bottom of each DATA REPORT GRAPH.</p></li>
                            <li><p>(1) a SUMMARY at the top of the Report</p></li>
                        </ul>
                        
                        <ul className="checkbox-assemblylist">
                       {
                         pdfdata.length > 0 &&
                         <li><p><input type="checkbox" onClick={handleClick} className="checkbox" /> Session Data (saved PDF files)</p></li>
                       }
                            
                            {
                                showsessiondate &&
                               
                                    pdfdata.length > 0 && pdfdata.map((v, i)=>{
                                        return(
                                            <li className="mrl-pdf"><p><input type="checkbox" onChange={checkboxHandle}  value={v.id} ref={pdfnames}  className="checkbox" /> {v.pdf_name}</p></li>
                                        )
                                    })
                               
                            }
                            <li><p><input type="checkbox" value={livenotesinput == true? 1 : 0}  onChange={() => setlivenotesinput(!livenotesinput)} ref={livenotes} className="checkbox" /> Live Session Notes</p></li>
                            <li><p><input type="checkbox" value={liveimagesinput == true? 1 : 0}  onChange={() => setliveimagesinput(!liveimagesinput)} ref={liveimages} className="checkbox" /> Live Session Images</p></li>
                            <li><p><input type="checkbox" value={reportnotesinput == true? 1 : 0}  onChange={() => setreportnotesinput(!reportnotesinput)} ref={reportsnote} className="checkbox" /> Report Session Notes</p></li>
                            {formsName.length > 0 &&

                            <li><p><input type="checkbox" value={completeform == true? 1 : 0}  onChange={() => setCompleteform(!completeform)} ref={cforms} onClick={handleCompleteForm} className="checkbox" /> Completed Forms</p></li>
                                }
                        </ul>
                        {
                            completedForm &&
                            <>
                            <p className="flowing-paragraph">The following are a list of FORMS completed by you and/or your Client. Check off the Forms you wish to include in the Report.</p>
                            <ul className="checkbox-assemblylist">
    
                                {
                                    formsName.length > 0 && formsName.map((v, i)=>{
                                        return(
                                            <li><p><input type="checkbox"  onChange={checkboxHandleclient} value={v.id} className="checkbox" /> {v.forms} </p></li> 
                                        )
                                    })
                                }
                               
    
                                {
                                    practionerformsName.length > 0 && practionerformsName.map((value, i)=>{
                                        return(
                                            <li><p><input type="checkbox"  onChange={checkboxHandlePractional} value={value.id} className="checkbox" /> {value.forms} </p></li> 
                                        )
                                    })
                                }
                                 
                               
                            </ul>
                            </>
                        }
                        <div className="assembly-btn-wrp">
                            <div className="assembly-btn"><a href="javascript:void" onClick={saveAssemblyreport}>Create/Save Report</a></div>
                            <div className="assembly-btn ml-assembly"><a href="javascript:void" onClick={() => unCheck()}>Clear Selections</a></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assemblyreport;