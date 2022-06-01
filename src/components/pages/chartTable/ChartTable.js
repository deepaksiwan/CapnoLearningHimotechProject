import React, { Component, useEffect, useState } from 'react';
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
    const { config, session  , record} = useParams();
    const [graphs, setgraphs] = useState([]);
    const [value, setValue] = useState(0);
    const [point, setPoint] = useState(25);
    const [color, setColor] = useState();


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
                                    <div className="chart-w" style={{ width:  (eval(d.col) * 100) + "%" , maxWidth: (eval(d.col) * 100) + "%", height: (eval(d.row) * 84) + "vh" }}>
                                        <Chart record={record} session={session} signal={d.signal_name} xmax={d.xmax} xmin={d.ymin}  ymin={d.ymin} ymax={d.ymax}  type={d.type} color={d.color} />
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