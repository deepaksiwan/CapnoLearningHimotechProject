import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import Plots from 'react-plotly.js';
import { csv } from 'd3';
import ChartHeader from '../../component/ChartHeader';
import Chart from './Chart';


const ChartTable = () => {
    const accessToken = localStorage.getItem('accessToken');
    const {config} = useParams();
    const [graphs, setgraphs]= useState([]);

    useEffect(() => {
        reportChart();


    }, []);

    const reportChart = () => {
        fetch("https://capno-api.herokuapp.com/api/report/config?report_id="+ config,
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
        alert("You Logout successful")
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
            <ChartHeader config = {config} />
            <div className="wrp-charttable">
                <div className="container-fluid">
                    <div className="row">
                        {
                            graphs.map(function (d, i) {
                                console.log(d);
                                return (
                                    <div className="chart-w" style={{ width: (eval(d.col) * 100) + "%", height: (eval(d.row) * 85) + "vh" }}>
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