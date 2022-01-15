import React from "react";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import Sidebar from '../../component/Sidebar';

const Viewlive = () => {

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
                    <Filter />

                    <div className="create-section">
                        <ul className="create-list">
                            {
                                Viewlivelist.map(function (livelist) {
                                    return (
                                        <li>
                                            <div className="create-list-box"><a href="#">{livelist.displayViewlivelist}</a></div>
                                        </li>
                                    )
                                }

                                )

                            }
                            <li>
                                <div className="create-list-box" data-toggle="modal" data-target="#exampleModal"><a href="#">View/Link Zoom Recordings</a></div>
                            </li>
                        </ul>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Session Zoom Recording</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="addlink-input">
                                       <input placeholder="Add link here" />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="close-btn" data-dismiss="modal">Close</button>
                                        <button type="button" class="close-btn">Add link</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Viewlive;