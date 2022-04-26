import React, { Component, useEffect, useRef, useState } from 'react';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";

import { Link, useParams, Router } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { csv } from 'd3';
import Header from '../../component/Header';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import InputColor from 'react-input-color';
import { trim } from 'jquery';

const Chart = (props) => {
    const session = localStorage.getItem('selectedSession');
    const [xAxis, setXaxis] = useState([]);
    const [xAxisMin, setXaxisMin] = useState(props.xmin);
    const [xAxisMax, setXaxisMax] = useState(props.xmax);
    const [yAxisMin, setYaxisMin] = useState(props.ymin);
    const [yAxisMax, setYaxisMax] = useState(props.ymax);
    const unit = useRef(0);
    const [color, setColor] = useState(props.color);
    // alert(props.color)
    const [type, setType] = useState(props.type);
    const [yAxis, setYaxis] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const [value, setValue] = useState(0);
    const [point, setPoint] = useState(25);
 
    const [taskMarkers,setTaskMarkers] = useState([]) ; 
    const [textAnnotations,setTextAnnotations] = useState([]) ; 
    // const [liveAnnotation,setLiveAnnotation] = useState([]) ; 
    let  liveAnnotation = [] ; 
    const [graphModal, setgraphModal] = useState(false);
    const toggleGraphModal = () => setgraphModal(!graphModal);

    const [trehSoldModal, settrehSoldModal] = useState(false);
    const toggletrehSoldModal = () => settrehSoldModal(!trehSoldModal);

    const [signalModal, setsignalModal] = useState(false);
    const toggleSignalModal = () => setsignalModal(!signalModal);

    const [unitModal, setunitModal] = useState(false);
    const toggleunitModal = () => setunitModal(!unitModal);

    const [annotationtModal, setannotationtModal] = useState(false);
    const toggleannotationtModal = () => setannotationtModal(!annotationtModal);
    const [play, setPlay] = useState(false);
  
    let playTimer ; 

    let zommDeviation = 0.02
    const [length,setLength]  = useState(0)
    let colorCodes = {} ; 
    colorCodes['BR-18'] = "#d3d3d3"
    colorCodes['BR-12'] = "#FFFF00"
    colorCodes['BR-6'] = "#FFF000"
    colorCodes['Paused'] = "#FF0000"
    useEffect(() => {
        // super(props);


    }, [xAxis, yAxis])

    useEffect(() => {
        // super(props);
        clearInterval(playTimer);
        getAlldata();

    }, [])

    const getCsv = () => {
        fetch("https://capno-api.herokuapp.com/api/session/data?session_id=" + session + "&signal_name=" + props.signal,
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
                    if (resp.sessions[0]) {
                        getData(resp.sessions[0].sessiondata)
                    }


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

    const getAlldata = () => {
        fetch("https://capno-api.herokuapp.com/api/session/data/type?session_id=" + session + "&type=2",
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
                console.warn("result", resp);
                if (resp.sessions[0]) {
                                  liveAnnotation = "["+resp.sessions[0].sessiondata+"]" ; 
                                //   console.log(resp.sessions[0]);
                                  liveAnnotation = JSON.parse(liveAnnotation);
                                //   liveAnnotation =
                               
                    getCsv();
                }
                else{
                    getCsv();

                }


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
    async function getData(_csvFile) {
        let _x = [];
        let _y = [];
        let _npauseTime = 0 ; 
        let _length = 0 ;
        let _pauseTime = 0 ; 
        let userTimeOffset = new Date().getTimezoneOffset() ; 
    //    alert(userTimeOffset);
          userTimeOffset = userTimeOffset*60*1000 ; 
          let _allTasks = [] ; 
          let _allAnnotation = [] ; 
          let lastTask  ; 
        //   console.log(userTimeOffset);
        csv('https://capnolearning.com/webroot/csvupl/' + _csvFile).then(data => {
            // console.log(data);
            // let _tasks = {} ; 
            let _temptask = [] ; 
            let _taskArray = [] ; 

            let _tempAnnotation = [] ; 
            let lastRecord = data[0].x ; 
        // console.log(data[0]);
            data.map((v, i) => {

                // _x.push(new Date(v.x));
                if(v.z > 0 ){
                lastRecord = v.x ; 
                if(_npauseTime > 0){
                    _pauseTime  += _npauseTime ; 
                }
                    let xData = new Date(parseInt((((v.x) - data[0].x) + (userTimeOffset) ) - _pauseTime  ))
                    _length = parseInt(v.x - data[0].x - _pauseTime) ;
                    // console.log(_length)
                    _x.push(xData);
                    // console.log()
                    _y.push(parseFloat(v.y));
                    if(v.rname != "Normal"){
                        
                        if(lastTask != data[i+1].text && _taskArray.length > 0){
                            // console.log(v);

                            _taskArray.push(xData)
                            _taskArray.push(lastTask)
                            _taskArray.push(lastTask)
                            // console.log("task",_taskArray);

                            // _tasks[] = _taskArray
                            _allTasks.push(_taskArray);
                            _allAnnotation.push(_taskArray);
                            _taskArray = [] ; 
                        }
                        else if(v.z > 1 && _taskArray.length == 0){
                            lastTask =  v.text ; 
                            // console.log(lastTask);
                            _taskArray.push(xData)
                             
                        }
                    }
                if(_npauseTime > 0){
                        // let xpData = new Date(parseInt((((v.x) - data[0].x - 2000) + (userTimeOffset) ) - _pauseTime  ))
                        let _pTime = parseInt(_npauseTime/1000) ; 
                        let _ptasks = [xData,xData,_pTime+"s Pause","Paused"]
                        _allAnnotation.push(_ptasks);
                        _allTasks.push(_ptasks);
                        _ptasks = [] ;
                }
                _npauseTime = 0 ; 

                }
                else if(v.z == 0 && _x.length > 0){
                    _npauseTime  = parseInt(v.x) -  parseInt(lastRecord) ; 
                }
                
                
                if (i == (data.length - 1)) {
                    // alert("here");
                // console.log(_x.length)
                    _allTasks.map((v,i) => {
                        // console.log(v)

                        _temptask.push(
                            {
                                type: 'rect',
                                // x-reference is assigned to the x-values
                                xref: 'x',
                                // y-reference is assigned to the plot paper [0,1]
                                yref: 'paper',
                                x0: v[0] ,
                                y0: 0,
                                x1: v[1] ,
                                y1: 3,
                                fillcolor: colorCodes[v[3]] ,
                                opacity: 0.5,
                                line: {
                                    width: 1
                                },
						        name: v[2],

                            }
                        );




                        if(i == (_allTasks.length - 1)){

                            liveAnnotation.map((v,i) => {
                              
                                let xAnnTime = new Date(parseInt(((parseInt(v.x) - data[0].x) + (userTimeOffset) ) - _pauseTime  ))
                                    // console.log(parseInt(((parseInt(annData.x) - data[0].x) + (userTimeOffset) ) - _pauseTime  ));
                                    _temptask.push(
                                        {
                                            type: 'rect',
                                            // x-reference is assigned to the x-values
                                            xref: 'x',
                                            // y-reference is assigned to the plot paper [0,1]
                                            yref: 'paper',
                                            x0: xAnnTime ,
                                            y0: 0,
                                            x1: xAnnTime ,
                                            y1: 3,
                                            fillcolor: colorCodes[v[3]] ,
                                            opacity: 0.5,
                                            line: {
                                                width: 1
                                            },
                                            name: v.z,
                                            
                                
                                        }
                                        
                                    );
    
                                   if(i == (liveAnnotation.length - 1)){
                                   
                                    setTaskMarkers(_temptask);
                                   }
    
                                })
                            // console.log(_temptask)
                         
                     
                        }
                

                    } )

                    _allAnnotation.map((v,i) => {
                        // console.log(v)
                        if(v[3] == "Paused" ){
                            _tempAnnotation.push(
                                {
                                    xref: 'x',
                                    yref: 'y',
                                    x: v[0] ,
                                    y: 45,  
                                    textangle: 0,
                                    text: v[2],
                                    showarrow: true,
                                    arrowhead: 10,
                                    ax: 45, 
                                    bgcolor: "#fff",
                                    ay:0,
                                    arrowcolor: "#FF0000", 
                        
                                }
                            );
                        }
                        else{
                            _tempAnnotation.push(
                                {
                                    xref: 'x',
                                    yref: 'y',
                                    x: v[0] ,
                                    y: 45,  
                                    textangle: 270,
                                    text: v[2],
                                    showarrow: true,
                                    arrowhead: 0,
                                    ax: 5,
                                    bgcolor: "#fff",
                                    arrowcolor: "#FF0000", 
                                    
                                    ay:5
                        
                                }
                            );
                        }
                        




                        if(i == (_allAnnotation.length - 1)){
                                                //   console.log("annotation",_tempAnnotation);
                                                // alert(liveAnnotation.length)
                            liveAnnotation.map((v,i) => {
                              
                            let xAnnTime = new Date(parseInt(((parseInt(v.x) - data[0].x) + (userTimeOffset) ) - _pauseTime  ))
                                // console.log(parseInt(((parseInt(annData.x) - data[0].x) + (userTimeOffset) ) - _pauseTime  ));
                                _tempAnnotation.push(
                                    {
                                        xref: 'x',
                                        yref: 'y',
                                        x: xAnnTime ,
                                        y: 45,  
                                        textangle: 270,
                                        text: v.z,
                                        showarrow: true,
                                        arrowhead: 0,
                                        ax: 5,
                                        bgcolor: "#fff",
                                        arrowcolor: "#FF0000", 
                                        
                                        ay:5
                            
                                    }
                                    
                                );

                               if(i == (liveAnnotation.length - 1)){
                                   console.log(_tempAnnotation);
                                setTextAnnotations(_tempAnnotation);
                               }

                            })
                        }
                

                    } )

                    setLength(_length);
                    setXaxis(_x);
                    setYaxis(_y);
                  
                    // plotGraph(_x,_y);

                }
            })
            // console.log(data)
        })

    }


    const handleColor = (e) => {
            console.log(e);
    }

    const handleInitial = (e) => {
        console.log(e);

            setXaxisMin(new Date(e.layout.xaxis.range[0]))
            setXaxisMax(new Date(e.layout.xaxis.range[1]))
         

       
}

    const handleRelayout = (e) => {
        console.log(e);
        console.log(xAxisMin)
       
        if(new Date(e['xaxis.range[0]']) < new Date(xAxis[0].getTime())){
            setXaxisMin(new Date(xAxis[0]))
            setXaxisMax(new Date(e['xaxis.range[1]']))

        }
        else if(new Date(e['xaxis.range[1]']) > new Date(xAxis[xAxis.length-1].getTime())){
            setXaxisMin(new Date(e['xaxis.range[0]']))
            setXaxisMax(new Date(xAxis[xAxis.length-1]))

        }
        else{
            console.log("limit")

        }
}

useEffect(() => {    
        moveGraph()
},[play,xAxisMax,xAxisMin])

const zoomIn = () => {
    let _deviation = zommDeviation*length ; 
    console.log(_deviation);
    console.log(length);
    console.log(new Date(xAxisMin))
    
    // let userTimeOffset = new Date().getTimezoneOffset() ; 
    // //    alert(userTimeOffset);
    // userTimeOffset = userTimeOffset*60*1000 ; 
    let _diff = new Date(xAxisMax).getTime() -  new Date(xAxisMin).getTime() ; 
    if(_diff > _deviation && _diff > 60000){
        let _newXaxisMin = new Date(xAxisMin).getTime() + _deviation  ; 
        console.log(new Date(_newXaxisMin)  );
        setXaxisMin(new Date(_newXaxisMin))
    
     
        let _newXaxisMax = new Date(xAxisMax).getTime() - _deviation  ; 
        setXaxisMax(new Date(_newXaxisMax))
    }
    else{
        console.log("Max Zoom Reached");
    }
   
 
    
}


const zoomOut = () => {
    let _deviation = zommDeviation*length ; 
    // console.log(_deviation);
    // console.log(length);
    // console.log(new Date(xAxisMin))
    
    // let userTimeOffset = new Date().getTimezoneOffset() ; 
    // //    alert(userTimeOffset);
    // userTimeOffset = userTimeOffset*60*1000 ; 
    let _diff = new Date(xAxisMax).getTime() -  new Date(xAxisMin).getTime() ; 
    if(_diff < length){
        let _newXaxisMin = new Date(xAxisMin).getTime() - _deviation  ; 
        console.log(new Date(_newXaxisMin)  );
        setXaxisMin(new Date(_newXaxisMin))
    
     
        let _newXaxisMax = new Date(xAxisMax).getTime() + _deviation  ; 
        setXaxisMax(new Date(_newXaxisMax))
    }
    else{
        console.log("Max Zoom Reached");
    }
   
 
    
}




const moveForward = () => {
     
    // console.log(_deviation);
    // console.log(length);
    // console.log(new Date(xAxisMin))
    
    let userTimeOffset = new Date().getTimezoneOffset() ; 
    //    alert(userTimeOffset);
    userTimeOffset = userTimeOffset*60*1000 ; 
    let _diff = new Date(xAxisMax).getTime() -  new Date(xAxisMin).getTime() ; 
    let _newMin =  new Date(xAxisMin).getTime() + _diff ; 
    _newMin = new Date(_newMin) ;
    if(_newMin < new Date(xAxis[0])){
        setXaxisMin(new Date(xAxis[0]))
    }
    else{
        setXaxisMin(_newMin)
    }
    let _newMax =  new Date(xAxisMax).getTime() + _diff ; 
    _newMax =  new Date(_newMax)  ; 
    if(_newMax > xAxis[xAxis.length - 1]){
        setXaxisMax(new Date(xAxis[xAxis.length - 1]))
    }
    else{
        setXaxisMax(_newMax)
    }
   
 
    
}
    

const reset = () => {
    
    setXaxisMin(new Date(xAxis[0]))
    setXaxisMax(new Date(xAxis[xAxis.length - 1]))
    setPlay(false);

 
    
}
    

const moveBackward = () => {
    
  
    
    let userTimeOffset = new Date().getTimezoneOffset() ; 
    //    alert(userTimeOffset);
    userTimeOffset = userTimeOffset*60*1000 ; 
    let _diff = new Date(xAxisMax).getTime() -  new Date(xAxisMin).getTime() ; 
    let _newMin =  new Date(xAxisMin).getTime() - _diff ; 
    _newMin = new Date(_newMin) ;
    if(_newMin < new Date(xAxis[0])){
        setXaxisMin(new Date(xAxis[0]))
    }
    else{
        setXaxisMin(_newMin)
    }
    let _newMax =  new Date(xAxisMax).getTime() - _diff ; 
    _newMax =  new Date(_newMax)  ; 
    if(_newMax > xAxis[xAxis.length - 1]){
        setXaxisMax(new Date(xAxis[xAxis.length - 1]))
    }
    else{
        setXaxisMax(_newMax)
    }
   
 
    
}
    


const moveGraph = () => {
    
        console.log("Checking")
        console.log(play)

        if(play){
            console.log("Playing")
            let _diff = 30; 
            let _xAxisMin = xAxisMin
            let _newMin =  new Date(_xAxisMin).getTime() + _diff ; 

            _newMin = new Date(_newMin) ;
          
            let _xAxisMax = xAxisMax
       
            let _newMax =  new Date(_xAxisMax).getTime() + _diff ; 
            _newMax =  new Date(_newMax)  ; 
            if(_newMax > xAxis[xAxis.length - 1]){
                setXaxisMax(new Date(xAxis[xAxis.length - 1]))
            }
            else{
                console.log(_newMin);
                console.log(_newMax);
                setXaxisMax(_newMax)
                setXaxisMin(_newMin)
               

            }
        }
      
 
}
    
const handlePlay = () => {
  
    setPlay(true);
   
}
  
const handlePause = () => {

    setPlay(false);


}  
 

const handleUnitChange = () => {
    console.log(unit);
}


    return (
        <div>
           
            {
                
                xAxis.length > 0 && yAxis.length > 0 &&
                <>
                <ul className="top-filter">
                    <li><a  onClick={toggleGraphModal}><i class="fa fa-line-chart" aria-hidden="true"></i></a></li>
                    <li><a   onClick={toggleSignalModal}><i class="fa fa-signal" aria-hidden="true"></i></a></li>
                    <li><a   onClick={toggletrehSoldModal}><i class="fa fa-area-chart" aria-hidden="true"></i></a></li>
                </ul>

                <ul className="right-filter">
                    <li><a onClick={zoomIn}><i class="fa fa-search-plus"></i></a></li>
                    <li><a onClick={zoomOut}><i class="fa fa-search-minus"></i></a></li>
                    <li><a onClick={moveForward}><i class="fa fa-arrow-right"></i></a></li>
                    <li><a onClick={moveBackward}><i class="fa fa-arrow-left"></i></a></li>
                    <li><a onClick={handlePlay}><i class="fa fa-play"></i></a></li>
                    <li><a onClick={handlePause}><i class="fa fa-pause"></i></a></li>
                    <li><a onClick={reset}><i class="fa fa-undo"></i></a></li>
                    <li><a  onClick={toggleunitModal}><i class="fa fa-thermometer-full" aria-hidden="true"></i></a></li>
                    <li><a  onClick={toggleannotationtModal}><i class="fa fa-comment"></i></a></li>
                </ul>

                {/* unit modal */}
               
                <Plot className="plot-charts"
                 
                 onRelayout={handleRelayout}
                //  onUpdate={handleRelayout}
                 onInitialized={handleInitial}
                    data={[
                        {
                            
                            x: xAxis,
                            y: yAxis,
                            marker: { color:  color },
                            type:  type

                        },
                        // { type: (props.type)  },

                    ]}
                    layout={{
                        revision : 0,
                        yaxis: {rangemode: 'tozero'},
                        xaxis: {rangemode: 'tozero'},
				hovermode: true,
				dragmode: true, 
                shapes: taskMarkers,
                xaxis :{
                    type: "date",
					tickformat: "%M:%S",
					ticktext: ["-", "tick", "tick", "-"],
                    range: [
						 xAxisMin,
                         xAxisMax ,
					],
					ticks: "outside",
					tickcolor: "#000",
					zeroline: false,
                    

                },
                yaxis : {
                    range: [
                        yAxisMin,
                        yAxisMax ,
					],
                    fixedrange: true
                },
                annotations:textAnnotations,
                // autosize: true,
                        margin: {
                            l: 30,
                            r: 40,
                            b: 30,
                            t: 40,
                            pad: 0
                        },
                    }}
                    config={{
			        	displayModeBar: false,  
                        scrollZoom: true,
                        transition: {
                            duration: 50,
                            easing: 'cubic-in-out'
                          },
                    }}

                />
                {/* {xAxis[0]} */}
                 <Modal isOpen={unitModal} toggle={toggleunitModal} className="modal-box-wrp" centered={true}>
                    <ModalHeader toggle={toggleunitModal}><span className="ml-1 roititle modal-head">Change Y-Scale Unit for PCO <sub>2</sub> Waveform</span></ModalHeader>
                    <ModalBody>
                        <ul className="range-list">
                            <li>
                                <div className="range-content-wrp">
                                    <div className="range-c-child1">
                                        <p>Y-axis unit:</p>
                                    </div>
                                    <div className="range-c-child2">
                                        <p><input type="radio" name="unit" defaultChecked={unit == 0 ? true : false} value={0} ref={unit} onChange={handleUnitChange}  /><label for="yes">mmHg</label> <input type="radio" className="mrl-input" defaultChecked={unit.current == 1 ? true : false} value={1} onChange={handleUnitChange}  ref={unit}  name="unit"   /><label for="no">kPa</label> <input type="radio" className="mrl-input" name="unit" value={2} onChange={handleUnitChange}  ref={unit}  defaultChecked={unit.current == 2 ? true : false}  /><label for="no">Percentage</label></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </ModalBody>

                </Modal>                 

                {/* unit modal */}

                {/* annotations modal */}

                <Modal isOpen={annotationtModal} toggle={toggleannotationtModal} className="modal-box-wrp" centered={true}>
                    <ModalHeader toggle={toggleannotationtModal}><span className="ml-1 roititle modal-head">Configure Annotations Visibility for PetCO <sub>2</sub> History</span></ModalHeader>
                    <ModalBody>
                        <ul className="range-list">
                            <li>
                                <div className="range-content-wrp">
                                    <div className="range-c-child1">
                                        <p>Show Live Annotations:</p>
                                    </div>
                                    <div className="range-c-child2 range-c-child2s">
                                        <p><input type="radio" id="yes" name="selector" /><label for="yes">Yes</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">No</label></p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="range-content-wrp">
                                    <div className="range-c-child1">
                                        <p>Show Report Annotations:</p>
                                    </div>
                                    <div className="range-c-child2 range-c-child2s">
                                        <p><input type="radio" id="yes" name="selector" /><label for="yes">Yes</label> <input type="radio" className="mrl-input" id="no" name="selector" /><label for="no">No</label></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </ModalBody>

                </Modal>

                {/* annotations modal */}

                {/* trehsold modal */}
                    
                <Modal isOpen={trehSoldModal} toggle={toggletrehSoldModal} className="modal-box-wrp" centered={true}>
                    <ModalHeader toggle={toggletrehSoldModal}><span className="ml-1 roititle modal-head">Trehsold Setting (Raw PCO <sub>2</sub>)</span></ModalHeader>
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
                                            initialValue={"#444444"}
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
                    <ModalHeader toggle={toggleSignalModal}><span className="ml-1 roititle modal-head">Signal Setting (Raw PCO <sub>2</sub>)</span></ModalHeader>
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
                                            initialValue={(color.hex ? color.hex : props.color)}
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
                    <ModalHeader toggle={toggleGraphModal}><span className="ml-1 modal-head roititle">Graph Setting (Raw PCO <sub>2</sub>)</span></ModalHeader>
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
                </>
            }
            {
                xAxis.length == 0 && yAxis.length == 0 &&

                <div className="wrp-chart-loader">
                    <div class="loading">
                        <div class="loading-1"></div>
                        <div class="loading-2"></div>
                        <div class="loading-3"></div>
                        <div class="loading-4"></div>
                    </div>
                </div>
            }
                                    </div>

    )
}

export default Chart;