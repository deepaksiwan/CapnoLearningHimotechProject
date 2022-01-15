import React from "react";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';

const Assemblyreport = () => {

    const Viewlivelist = [
        {
            displayViewlivelist: "View Live Session Notes"
        },
        {
            displayViewlivelist: "Download Live Session Notes"
        },
        {
            displayViewlivelist: "View Live Session Images"
        },
        {
            displayViewlivelist: "Download Live Session Images"
        }

    ]


    return (
        <div>
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="assembly-content">
                        <h3>Session Assembly Reports</h3>
                        <p>
                            You may choose to assemble a SESSION REPORT consisting of any or all of the OPTIONS listed below.
                          Check off the options you wish to include in the Report by clicking on the box in front of each option.
                          These options will appear in the Report in the order shown below. If you do not place a check mark 
                          in the box in front of an option, it will not appear in the Report. You may choose to write additional
                          notes in the Report as follows:</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assemblyreport;