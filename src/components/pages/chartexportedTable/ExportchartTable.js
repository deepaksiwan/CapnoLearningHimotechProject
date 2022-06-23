
import React, { Component, useCallback, useEffect, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import RangeSlider from 'react-bootstrap-range-slider';
import { ModalHeader, Modal, ModalBody } from "reactstrap";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import InputColor from 'react-input-color';
import Plots from 'react-plotly.js';
import { csv } from 'd3';
import { jsPDF } from "jspdf";
import ChartExportedHeader from '../../component/ChartExportedHeader';
import ExportChart from './ChartExported';
import folderimage from '../../images/choosefile.png'
import { red } from '@material-ui/core/colors';


const ChartTable = (props) => {
    //console.log("chart props", props)

    const accessToken = localStorage.getItem('accessToken');
    const { config, session, record } = useParams();
    const [graphs, setgraphs] = useState([]);
    const [value, setValue] = useState(0);
    const [point, setPoint] = useState(25);
    const [color, setColor] = useState();
    const [child, setchild] = useState('')
    const [setfileLoaded, setsetfileLoaded] = useState('')
    const [HelpModal, setHelpModal] = useState(false);
    const toggleHelpModal = () => setHelpModal(!HelpModal);
    const [fileSelected, setfileSelected] = useState(null)
    const [showHeader,setShowHeader] = useState(false) ; 
    const [signalStat , setSignalStat] = useState({})
    const [showSignalStat , setShowSignalStat] = useState(false)


    const getData = props.getData;
    //console.log("getData", getData)
    const fileLoaded = props.fileLoaded;
    //console.log("fileLoaded", fileLoaded);






    useEffect(() => {
        exportChart();
        

    }, []);

    const exportChart = () => {
        fetch("https://capno-api.herokuapp.com/api/report/config?report_id=" + config,
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
                    console.warn(" Exported result", resp);
                    setgraphs(resp.graphs)

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
    const fileupload = (event) => {
        //setfileLoaded(true)
        var file = event.target.files[0];
        //console.log(event.target)
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = event => {
            const dataContent = event.target.result;


        };
        setfileSelected(event.target.files);
    }

    const downloadImage = () => {
        let _image = Array.from(fileSelected)
        let _imageArray = [];
        _image.length > 0 && _image.map(function (v, i) {
            if (v.name.includes(".png")) {
                _imageArray.push(v)

            }
            if (i == (_image.length - 1)) {
                SaveImage(_imageArray)
            }
        })
        // console.log("png image jdfsdj", _imageArray)
    }

    
    const setStats = (_signal,data) => {
        
        // console.log("signal data",data)
        let _temp = signalStat ; 
        let _tempData = [] ;
            data.map((v,i) => {
                _tempData.push({
                    x : v.x,
                    y : v.y,
                    mean : v.mean,
                    median : v.median,
                    sd : v.sd,
                })
            })
            _temp[_signal] = _tempData ; 
            console.log("signal data 1"+_signal,_temp);
            setSignalStat(_temp)
            setTimeout(() => {
                setShowHeader(true);
            }, 1000*graphs.length);
        }

    const SaveImage = (_imageArray) => {
        const doc = new jsPDF();
        for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
            doc.setPage(pageNumber)
            doc.setTextColor(2, 4, 7);
            doc.text('Capnolearning Report', 10, 10,
                { styles: { fontSize: 20, fontWeight: 'bold' } })
            doc.setDrawColor(0, 0, 0);
            doc.line(10, 15, 600, 15);
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.text("Session Date:", 10, 25)
            doc.text("Client:", 10, 30);
            doc.text("Trainer:", 10, 35);
            console.log("lenght of iamge", _imageArray.length - 4)
            let ev = 0;

            _imageArray.length > 0 && _imageArray.map((v, i) => {
                let reader = new FileReader();
                console.log("result of v", v)
                if (v) {
                    console.log("v result", v)
                    reader.readAsDataURL(v);
                    reader.onload = event => {
                        let dataimage = event.target.result;
                        console.log("dataimage", 
                        dataimage)
                        doc.addImage(dataimage, 7, 50 + (ev * 110), 200, 90);
                        //doc.addImage(dataimage, 3, 0 + (ev * 0), pageWidth, pageHeight);
                        ev++;
                        if (ev == 2) {
                            ev = 0;
                            doc.addPage();
                        }

                    };

                }
            })

        }
        setTimeout(() => {
            doc.save("Image.pdf");

        }, _imageArray.length * 2000);
    }
    return (
        <div>
            <ChartExportedHeader downloadImage={downloadImage} fileupload={fileupload} config={config} />
            <div className="wrp-charttable" id="exported-chart">
                <div className="container-fluid">
                    <div className="row justify-content-between">
                        {
                            fileSelected && graphs && graphs.map(function (d, i) {
                                console.log("graph show", d);
                                return (
                                    <div className="chart-w" style={{ width: (d.col != "1/1" ? (eval((d.col)) * 99 )+ "%" : (eval(d.col) * 100) + "%") , maxWidth: (eval(d.col) * 100) + "%", height: "auto" , minHeight:  (eval(d.row) * 82) + "vh"  }}>
                                        <ExportChart getData={getData} setStats={setStats} index={i} dataFile={fileSelected} record={record} session={session} signal={d.signal_name} xmax={d.xmax} xmin={d.ymin} ymin={d.ymin} ymax={d.ymax} type={d.type} color={d.color} col={d.col} row={d.row} />
                                    </div>

                                )

                            })
                        }
                        {
                           !fileSelected &&
                           <div className='col-md-12'>
                           <div className="bag-1">
                               <div className="uploadfile">
                                   <div className='content1'>
                                       <p className='bag-10'>Please choose session folder to visualise signal data in the selected report template.<br /> You can find session folder inside <b>Client Name folder</b> under <b>Capno Offline</b> folder on your desktop. </p>
                                   </div>
                                   <div className='content2 '>
                                       <div className='bag-2'>
                                           <button className="buttonstyle" >
                                               <label><img style={{ marginRight: "10px", marginTop: "3px" }} src={folderimage}></img></label>
                                               <h6 style={{ color: "#800080", marginTop: "5px", display: "inline-block" }}>Choose Session Folder</h6>
                                           </button>
                                           <input id="ChooseFolder" multiple type="file"  onChange={fileupload} webkitdirectory="true"
                                       />
                                       </div>

                                      
                                   </div>
                                   <div className=" content3 " >
                                       <a href='#' onClick={toggleHelpModal}>
                                          <p className='bag-10'>Need Help</p>
                                           <span><i class="fa fa-question-circle need- bag-200" aria-hidden="true"></i></span>

                                       </a>
                                   </div>

                               </div>
                               <Modal isOpen={HelpModal} toggle={toggleHelpModal} className="modal-box-wrp" centered={true}>
                                   <ModalHeader toggle={toggleHelpModal}><span className="ml-1 roititle modal-head">Instructions to load session files for visulaization </span></ModalHeader>
                                   <ModalBody>
                                       
                                            <ol>
                                            <li>Click on <b>Choose Session Folder</b> button. It will open a file picker dialog box.</li>
                                            <li>On the dialog box open <b>Desktop</b>.</li>
                                            <li>Then open folder, <b>Capno Offline.</b></li>
                                            <li>Double click on the <b>client name folder</b>, e,g John Smith.</li>
                                            <li>Double click on the <b>session date folder</b>, which you want to load for visualization, e.g 2022-6-18-19-10.</li>

                                            </ol>
                                           
                                   </ModalBody>

                               </Modal>


                           </div>
                           </div>

                        }
                    </div>


                </div>
            </div>

        </div>
    )
}

export default ChartTable;