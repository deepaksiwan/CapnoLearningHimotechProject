import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import { Link, useParams, Router } from 'react-router-dom';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import InputColor from 'react-input-color';
import Plots from 'react-plotly.js';
import { csv } from 'd3';
import ChartHeader from '../../component/ChartHeader';
import Chart from './Chart';


const ChartTable = () => {
    const accessToken = localStorage.getItem('accessToken');
    const { config } = useParams();
    const [graphs, setgraphs] = useState([]);
    const [value, setValue] = useState(0);
    const [point, setPoint] = useState(25);
    const [color, setColor] = useState();

    const [graphModal, setgraphModal] = useState(false);
    const toggleGraphModal = () => setgraphModal(!graphModal);

    const [trehSoldModal, settrehSoldModal] = useState(false);
    const toggletrehSoldModal = () => settrehSoldModal(!trehSoldModal);

    const [signalModal, setsignalModal] = useState(false);
    const toggleSignalModal = () => setsignalModal(!signalModal);

    useEffect(() => {
        reportChart();


    }, []);

    const reportChart = () => {
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
                    // console.warn("result", resp);
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
    // const graphs = [
    //     {   csvfile: "60c4378df1710signalB.csv",
    //         signal_name: "pco2wave",
    //         display_name: "Raw Wave Form",
    //         color: "#dd0c0c",
    //         type: "line",
    //         avg: 0,
    //         thick: "0.5",
    //         xmin: 0,
    //         ymin: 0,
    //         xmax: "full",
    //         ymax: 50,
    //         row: "1/3",
    //         col: "1/3"
    //     },
    //     {
    //         csvfile: "60d4964f252ddsignalB.csv",
    //         signal_name: "bpmhistory",
    //         display_name: "Breaths Per minute",
    //         color: "#0000FF",
    //         type: "bar",
    //         avg: 30,
    //         thick: "0.5",
    //         xmin: 0,
    //         ymin: 0,
    //         xmax: "full",
    //         ymax: 50,
    //         row: "1/3",
    //         col: "1/3"
    //     },
    //     {
    //         csvfile: "5f7c7a23456e7signalB.csv",
    //         signal_name: "petco2",
    //         display_name: "End Tidal C02",
    //         color: "#00FFFF",
    //         type: "bar",
    //         avg: 30,
    //         thick: "0.5",
    //         xmin: 0,
    //         ymin: 0,
    //         xmax: "full",
    //         ymax: 50,
    //         row: "1/3",
    //         col: "1/3"
    //     },
    //     {
    //         csvfile: "5f7c7a23456e7signalB.csv",
    //         signal_name: "petco2",
    //         display_name: "End Tidal C02",
    //         color: "#00FFFF",
    //         type: "bar",
    //         avg: 30,
    //         thick: "0.5",
    //         xmin: 0,
    //         ymin: 0,
    //         xmax: "full",
    //         ymax: 50,
    //         row: "1/3",
    //         col: "1/3"
    //     },
    //     {
    //         csvfile: "5f7c7a23456e7signalB.csv",
    //         signal_name: "petco3",
    //         display_name: "End Tidal C02",
    //         color: "#00FFFF",
    //         type: "bar",
    //         avg: 30,
    //         thick: "0.5",
    //         xmin: 0,
    //         ymin: 0,
    //         xmax: "full",
    //         ymax: 50,
    //         row: "1/3",
    //         col: "1/3"
    //     },
    //     {
    //         csvfile: "5f7c7a23456e7signalB.csv",
    //         signal_name: "petco5",
    //         display_name: "End Tidal C02",
    //         color: "#00FFFF",
    //         type: "bar",
    //         avg: 30,
    //         thick: "0.5",
    //         xmin: 0,
    //         ymin: 0,
    //         xmax: "full",
    //         ymax: 50,
    //         row: "1/3",
    //         col: "1/3"
    //     },
    //     {
    //         csvfile: "5f7c7a23456e7signalB.csv",
    //         signal_name: "petco2",
    //         display_name: "End Tidal C02",
    //         color: "#00FFFF",
    //         type: "bar",
    //         avg: 30,
    //         thick: "0.5",
    //         xmin: 0,
    //         ymin: 0,
    //         xmax: "full",
    //         ymax: 50,
    //         row: "1/3",
    //         col: "1/3"
    //     },
    //     {
    //         csvfile: "5f7c7a23456e7signalB.csv",
    //         signal_name: "petco3",
    //         display_name: "End Tidal C02",
    //         color: "#00FFFF",
    //         type: "bar",
    //         avg: 30,
    //         thick: "0.5",
    //         xmin: 0,
    //         ymin: 0,
    //         xmax: "full",
    //         ymax: 50,
    //         row: "1/3",
    //         col: "1/3"
    //     },
    //     {
    //         csvfile: "5f7c7a23456e7signalB.csv",
    //         signal_name: "petco5",
    //         display_name: "End Tidal C02",
    //         color: "#00FFFF",
    //         type: "bar",
    //         avg: 30,
    //         thick: "0.5",
    //         xmin: 0,
    //         ymin: 0,
    //         xmax: "full",
    //         ymax: 50,
    //         row: "1/3",
    //         col: "1/3"
    //     },

    // ]


    return (
        <div>
            <ChartHeader config={config} />
            <div className="wrp-charttable">
                <div className="container-fluid">
                    <div className="row">
                        {
                            graphs.map(function (d, i) {
                                console.log(d);
                                return (
                                    <div className="chart-w" style={{ width: (eval(d.col) * 100) + "%", height: (eval(d.row) * 84) + "vh" }}>
                                        <ul className="top-filter">
                                            <li><a href="#" onClick={toggleGraphModal}><i class="fa fa-line-chart" aria-hidden="true"></i></a></li>
                                            <li><a href="#" onClick={toggleSignalModal}><i class="fa fa-signal" aria-hidden="true"></i></a></li>
                                            <li><a href="#" onClick={toggletrehSoldModal}><i class="fa fa-area-chart" aria-hidden="true"></i></a></li>
                                        </ul>

                                        {/* trehsold modal */}
                                            
                                        <Modal isOpen={trehSoldModal} toggle={toggletrehSoldModal} className="modal-box-wrp" centered={true}>
                                            <ModalHeader toggle={toggletrehSoldModal}><span className="ml-1 roititle">Trehsold Setting (Raw PCO2)</span></ModalHeader>
                                            <ModalBody>
                                                <ul className="range-list">
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Name</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <div className="raw-pcos"><p>Threshold</p></div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Value</p>
                                                            </div>
                                                            <div className="range-c-child2">

                                                                <input placeholder='50' type="text" />
                                                            </div>

                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Hide Threshold</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <p><input type="radio" id="yes" name="selector" /><label for="yes">Yes</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">No</label></p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    
                                                   
                                                    
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Line Width</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <RangeSlider
                                                                    value={value}
                                                                    onChange={changeEvent => setValue(changeEvent.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Type of Line</p>
                                                            </div>
                                                            <div className="range-c-child2">

                                                                <input placeholder='Solid Line' type="number" />
                                                            </div>

                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Color</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <InputColor
                                                                    initialValue="#5e72e4"
                                                                    onChange={setColor}
                                                                    placement="right"
                                                                />
                                                                
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </ModalBody>

                                        </Modal>

                                        {/* trehsold modal */}

                                        {/* signal modal */}
                                        <Modal isOpen={signalModal} toggle={toggleSignalModal} className="modal-box-wrp" centered={true}>
                                            <ModalHeader toggle={toggleSignalModal}><span className="ml-1 roititle">Signal Setting (Raw PCO2)</span></ModalHeader>
                                            <ModalBody>
                                                <ul className="range-list">
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Name</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <div className="raw-pcos"><p>Raw PCO2</p></div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Hide Signal</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <p><input type="radio" id="yes" name="selector" /><label for="yes">Yes</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">No</label></p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Show Peak Marker</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <p><input type="radio" id="yes" name="selector" /><label for="yes">Yes</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">No</label></p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Signal Type</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <p><input type="radio" id="yes" name="selector" /><label for="yes">Sample Points</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">Line</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">Line & Simple Points</label></p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Type of Line</p>
                                                            </div>
                                                            <div className="range-c-child2">

                                                                <input placeholder='Solid Line' type="number" />
                                                            </div>

                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Line Width</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <RangeSlider
                                                                    value={value}
                                                                    onChange={changeEvent => setValue(changeEvent.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Sample Point Size</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <RangeSlider
                                                                    value={point}
                                                                    onChange={changeEvent => setPoint(changeEvent.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Color</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <InputColor
                                                                    initialValue="#5e72e4"
                                                                    onChange={setColor}
                                                                    placement="right"
                                                                />
                                                                
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </ModalBody>

                                        </Modal>

                                        {/* signal modal */}

                                        {/* graph modal */}
                                        <Modal isOpen={graphModal} toggle={toggleGraphModal} className="modal-box-wrp" centered={true}>
                                            <ModalHeader toggle={toggleGraphModal}><span className="ml-1 roititle">Graph Setting (Raw PCO2)</span></ModalHeader>
                                            <ModalBody>
                                                <ul className="range-list">
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>X -axis Range</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <input placeholder='1 Minute' type="number" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Units</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <input placeholder='mmHg' type="number" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Show Annotations</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <p><input type="radio" id="yes" name="selector" /><label for="yes">Yes</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">No</label></p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Show Grid Lines</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <p><input type="radio" id="yes" name="selector" /><label for="yes">Yes</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">No</label></p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Invert Y-Axis</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <p><input type="radio" id="yes" name="selector" /><label for="yes">Yes</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">No</label></p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Min/Max Y-Axis</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <div className="wrp-axis">
                                                                    <div className='min-axis'>
                                                                        <input placeholder='0' />
                                                                        <span>Min</span>
                                                                    </div>
                                                                    <div className='max-axis'>
                                                                        <input placeholder='0' />
                                                                        <span>Max</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="range-content-wrp">
                                                            <div className="range-c-child1">
                                                                <p>Y-Axis Position</p>
                                                            </div>
                                                            <div className="range-c-child2">
                                                                <p><input type="radio" id="yes" name="selector" /><label for="yes">Left</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">Right</label></p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </ModalBody>

                                        </Modal>

                                        {/* graph modal */}
                                        {/* <p>{d.display_name}</p> */}
                                        <Chart signal={d.signal_name} type={d.type} color={d.color} />

                                    </div>
                                )

                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChartTable;