import React, { Component, useCallback, useEffect, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import InputColor from 'react-input-color';
import Plots from 'react-plotly.js';
import { csv } from 'd3';
import ChartExportedHeader from '../../component/ChartExportedHeader';
import ExportChart from './ChartExported';


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
    const [getData, setgetData] = useState(props.getData)
    const [fileSelected, setfileSelected] = useState(null)


    //const getData = props.getData;
    console.log("getData", getData)
    const fileLoaded = props.fileLoaded;
    console.log("fileLoaded", fileLoaded);




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
        console.log(event.target)
        var reader = new FileReader();
        // console.log("deepak file",file)
        //  console.log("deepak reader",reader)
        // getData(reader.result)
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = event => {

            const dataContent = event.target.result;
            console.log("deepak dataContent", dataContent);
        };
        // reader.readAsText(e.target.files[0]);
        console.log("check event", event.target.files)
        setfileSelected(event.target.files);
    }

    return (
        <div>
            <ChartExportedHeader fileupload={fileupload} config={config} />
            <div className="wrp-charttable">
                <div className="container-fluid">
                    <div className="row">
                        {
                            fileSelected && graphs && graphs.map(function (d, i) {
                                console.log("graph show", d);
                                return (
                                    <div className="chart-w" style={{ width: (eval(d.col) * 100) + "%", maxWidth: (eval(d.col) * 100) + "%", height: (eval(d.row) * 84) + "vh" }}>
                                        <ExportChart  getData={getData} index={i} dataFile={fileSelected} record={record} session={session} signal={d.signal_name} xmax={d.xmax} xmin={d.ymin} ymin={d.ymin} ymax={d.ymax} type={d.type} color={d.color} />
                                    </div>

                                )

                            })
                        }
                        {
                            !fileSelected &&
                            <div className="wrp-chart-loader">
                                <div className="uploadfile" >
                                    <div className='uploadheader'>
                                        <p className="ex-chart " style={{ color: "#800080", marginLeft:'45rem'}} >Please choose file  to visualise data for   signal. </p>
                                    </div>
                                   
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