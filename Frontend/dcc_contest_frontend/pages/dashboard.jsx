import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { Doughnut, Line } from 'react-chartjs-2';
// import ReactSpeedometer from "react-d3-speedometer";
import SubmissionRow from "../components/submission_row";
import {AiFillCaretDown} from "react-icons/ai"
import {
    Chart, ArcElement, Tooltip, CategoryScale,
    LinearScale,
    PointElement,
    LineElement, Title
} from 'chart.js';
import { useRouter } from "next/router";

// const dashboard_container = {
//     // "display": "flex",
//     // "height": "90vh",
// }

// const summary_area = {
//     // "width": "50%",
//     // "border" : "2px solid red",
//     // "display": "flex",
//     // "flex-direction": "column",
//     // "padding": "1.5% 0.5%"

// }

// const submission_area = {
//     "height": "95.5%",
//     "padding": "10px",
//     // "width": "50%"
// }

// const number_summary_area = {
//     // "display": "grid",
//     // "grid-template-columns": "33% 33% 33%",
//     // "column-gap" : "10px",
//     "height": "35%",
//     // "width": "100%"
//     // "margin-bottom": "2%",
// }

// const trendline_area = {
//     "height": "60%",
//     "padding": "10px"
//     // "width": "100%"
// // }
// const graph = {
//     // "height": "auto",
//     "display": "grid",
//     "gap": "5px",
//     "width": "60%",
//     "margin": "auto",
//     "text-align": "center",
//     "justify-items": "center",
// }

// const graph_heading = {
//     "font-size": "12px"
// }

// const submission_all = {
//     // "float":"right",
//     "font-size": "12px",
//     "display":"grid",
//     "grid-template-columns": "25% 25% 25% 25%",
//     "gap" : "5px"
// }


Chart.register(ArcElement, Tooltip, CategoryScale,
    LinearScale,
    PointElement,
    LineElement, Title);


const lineData = {
    labels: ["C1", "C2", "C3", "C4", "C5"],
    datasets: [
        {
            label: "Rating",
            data: [400, 800, 700, 900, 100],
            borderColor: 'white',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

const problemData = {
    labels: ['Unsolved', 'Solved'],
    datasets: [{
        label: 'Problems',
        data: [25, 15],
        backgroundColor: [
            'red',
            'green'
        ],
        borderColor: [
            'white',
            'white'
        ],
        borderWidth: 1,
    }]
};
const contestData = {
    labels: ['Attempted', 'Unattempted', 'Unregistered'],
    datasets: [{
        label: 'Contest',
        data: [3, 2, 10],
        backgroundColor: [
            'green',
            'red',
            'yellow'
        ],
        borderColor: [
            'white',
            'white',
            'white'
        ],
        borderWidth: 1,
    }]
};

const submissionData = [
    {
        submission_id: "1",
        ques_no: "Trial-01",
        submission_time: "24/01/2001 08:05",
        verdict: "Passed"
    },
    {
        submission_id: "2",
        ques_no: "Trial-02",
        submission_time: "25/01/2001 08:05",
        verdict: "Passed"
    },
    {
        submission_id: "3",
        ques_no: "Trial-03",
        submission_time: "26/01/2001 08:05",
        verdict: "Wrong Answer"
    },
    {
        submission_id: "4",
        ques_no: "Trial-04",
        submission_time: "27/01/2001 08:05",
        verdict: "Passed"
    },
    {
        submission_id: "5",
        ques_no: "Trial-05",
        submission_time: "30/01/2001 08:05",
        verdict: "Passed"
    },
    {
        submission_id: "6",
        ques_no: "Trial-06",
        submission_time: "31/01/2001 08:05",
        verdict: "Time Limit Exceeded"
    },
    {
        submission_id: "6",
        ques_no: "Trial-06",
        submission_time: "31/01/2001 08:05",
        verdict: "Time Limit Exceeded"
    },
    {
        submission_id: "6",
        ques_no: "Trial-06",
        submission_time: "31/01/2001 08:05",
        verdict: "Time Limit Exceeded"
    },
    {
        submission_id: "6",
        ques_no: "Trial-06",
        submission_time: "31/01/2001 08:05",
        verdict: "Time Limit Exceeded"
    },
    {
        submission_id: "6",
        ques_no: "Trial-06",
        submission_time: "31/01/2001 08:05",
        verdict: "Time Limit Exceeded"
    },
    {
        submission_id: "6",
        ques_no: "Trial-06",
        submission_time: "31/01/2001 08:05",
        verdict: "Time Limit Exceeded"
    },
    {
        submission_id: "6",
        ques_no: "Trial-06",
        submission_time: "31/01/2001 08:05",
        verdict: "Time Limit Exceeded"
    },

]

function dashboard() {
    const router = useRouter();

    useEffect(() => {
    })
    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>


            {/* <Navbar /> */}
            <div className="dashboard">
                <div className="summary_area">
                    <p className="dashboard_title_div">Statistics</p>
                    <div className="dashboard_left_top">
                        <div className="dashboard_profile_info">
                            <img src="https://ik.imagekit.io/pqymxdgbi/trial_bzYervpMN.jpg?tr=h-90%2Cw-90" style={{ "border-radius": "50%" }} ></img>
                            <div>
                                <p>Ritik Kaushal</p>
                                <p>Current Rating : 1200</p>
                                <p>(Max: 1500)</p>
                            </div>
                        </div>
                        <div className="dashboard_graph_div">
                            <div className="dashboard_graph">
                                <Doughnut
                                    className="p-5"
                                    data={problemData}
                                />
                                <p className="text-md">Problems Solved<br></br>15/40</p>
                            </div>
                            <div className="dashboard_graph">

                                <Doughnut
                                    className="p-5"
                                    data={contestData}
                                />
                                <p className="text-md">Contest Attempted<br />3/12</p>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard_trendline">
                        <Line
                            className="p-2"
                            options={{
                                responsive: true,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: "Contest Ratings",
                                        color: ['white'],
                                        font: {
                                            size: 14,
                                            weight: 'normal'
                                        }
                                    }
                                }
                            }} data={lineData} />
                    </div>
                </div>
                <div className="summary_area">
                    <p className="dashboard_title_div submission_div">Submissions</p>
                    <div className="bg-slate-800 rounded-lg h-95.5%">
                        
                        <div className="dashboard_submission_title">
                            <div>S.No.</div>
                            <div>Q No.</div>
                            <div className='col-span-2'>Time stamp</div>
                            <div className='col-span-2'>Verdict</div>
                        </div>

                        {submissionData.map((submission, index) => (
                            <SubmissionRow submission_id={submission.submission_id} ques_no={submission.ques_no} submission_time={submission.submission_time} verdict={submission.verdict} />
                        ))}
                        <div className="">
                            <div className="dashboard_submission_heading col-start-4 hover:text-green-700 hover:cursor-pointer" onClick={() => {
                                router.push(`/submissions`);
                            }}>View all Submissions<AiFillCaretDown/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default dashboard;
