import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { csv } from 'd3';
import Header from '../../component/Header';


const Chart = (props) => {
    const session = localStorage.getItem('selectedSession');
    const [xAxis, setXaxis] = useState([]);
    const [yAxis, setYaxis] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        // super(props);


    }, [xAxis, yAxis])

    useEffect(() => {
        // super(props);
        getCsv();

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
                    console.warn("result", resp);
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
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    async function getData(_csvFile) {
        let _x = [];
        let _y = [];
        csv('https://capnolearning.com/webroot/csvupl/' + _csvFile).then(data => {
            console.log(data);
            data.map((v, i) => {
                // _x.push(new Date(v.x));
                _x.push(new Date(parseInt(v.x)));
                _y.push(parseFloat(v.y));
                if (i == 1) {
                    // alert("here");
                    setXaxis(_x);
                    setYaxis(_y);
                    // plotGraph(_x,_y);

                }
            })
            // console.log(data)
        })

    }




    return (
        <div>

            {
                xAxis.length > 0 && yAxis.length > 0 &&

                <Plot className="plot-charts"
                    data={[
                        {
                            x: xAxis,
                            y: yAxis,
                            marker: { color: props.color },
                            type: props.type

                        },
                        // { type: (props.type)  },

                    ]}
                    layout={{
                        yaxis: {rangemode: 'tozero'},
                        xaxis: {rangemode: 'tozero'},
                        autosize: true,
                        margin: {
                            l: 20,
                            r: 8,
                            b: 20,
                            t: 10,
                            pad: 2
                        },
                    }}
                />
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