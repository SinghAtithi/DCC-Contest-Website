import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { Doughnut, Line } from "react-chartjs-2";
import SubmissionRow from "../components/submission_row";
import { AiFillCaretDown } from "react-icons/ai";
import {
    Chart,
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from "chart.js";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL, GET_DASHBOARD_DATA } from "../utils/constants";

Chart.register(
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
);

function dashboard() {
    const router = useRouter();
    const { username } = router.query;

    const [current_rating, setCurrentRating] = useState(0);
    const [max_rating, setMaxRating] = useState(0);

    // question_stats = [no_unsolved, no_solved]
    const [question_stats, setQuestionStats] = useState([]);

    // contest_stats = [no_contest_attempted, no_contest_unattempted, no_contest_unregistered]
    const [contest_stats, setContestStats] = useState([]);

    //contest_stats_line = [{contest_id = contest_id, rating = rating, time_stamp = time_stamp}]
    const [contest_stats_line, setContestStatsLine] = useState([]);
    const [line_data, setLineData] = useState(null);

    // submission_data = [{
    //     _id: "1",
    //     ques_no: "Trial-01",
    //     submission_time: "24/01/2001 08:05",
    //     verdict: "Passed"
    // }]
    const [submission_data, setSubmissionData] = useState([]);
    const [profile_pic, setProfilePic] = useState(
        "https://ik.imagekit.io/pqymxdgbi/avtar.png?tr=h-90%2Cw-90"
    );

    const getProblemStatsObject = () => {
        const problemData = {
            labels: ["Unsolved", "Solved"],
            datasets: [
                {
                    label: "Problems",
                    data: question_stats,
                    backgroundColor: ["red", "green"],
                    borderColor: ["white", "white"],
                    borderWidth: 1,
                },
            ],
        };
        return problemData;
    };

    const getContestStatsObject = () => {
        const contestData = {
            labels: ["Attempted", "Unattempted", "Unregistered"],
            datasets: [
                {
                    label: "Contest",
                    data: contest_stats,
                    backgroundColor: ["green", "red", "yellow"],
                    borderColor: ["white", "white", "white"],
                    borderWidth: 1,
                },
            ],
        };
        return contestData;
    };

    const lineData = {
        labels: [],
        datasets: [
            {
                label: "Rating",
                data: [],
                borderColor: "white",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    const setLineChartData = (ChartData) => {
        console.log("In for line chart");
        console.log(ChartData);
        const n = ChartData.length;
        var label = [];
        var data = [];
        if (n !== 0) {
            ChartData.map((obj) => {
                label.push(obj.time_stamp);
                data.push(obj.rating);
            });
            lineData.labels = label;
            lineData.datasets[0].data = data;
        }
        setLineData(lineData);
    };

    function toolTip(context) {
        // Tooltip Element
        let tooltipEl = document.getElementById("chartjs-tooltip");

        // Create element on first render
        if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.innerHTML =
                '<table cellspacing="0" cellpadding="0"></table>';
            document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        // Set caret Position
        tooltipEl.classList.remove("above", "below", "no-transform");
        if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
            tooltipEl.classList.add("no-transform");
        }

        function getBody(bodyItem) {
            return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
            var titleLines = tooltipModel.title || [];
            // console.log(titleLines)

            const label_array = line_data.labels;
            var n = label_array.length;
            var index = 0;
            for (var i = 0; i < n; i++) {
                if (label_array[i] == titleLines[0]) {
                    index = i;
                    break;
                }
            }
            titleLines[0] = contest_stats_line[index].contest_id;

            const bodyLines = tooltipModel.body.map(getBody);

            let innerHtml = "<thead>";

            titleLines.forEach(function (title) {
                innerHtml += "<tr><th>" + title + "</th></tr>";
            });
            innerHtml += "</thead><tbody>";

            bodyLines.forEach(function (body, i) {
                // const span = '<span>' + body + '</span>';
                innerHtml += "<tr><td>" + body + "</td></tr>";
            });
            innerHtml += "</tbody>";

            let tableRoot = tooltipEl.querySelector("table");
            tableRoot.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = "absolute";
        tooltipEl.style.left =
            position.left + window.pageXOffset + tooltipModel.caretX + "px";
        tooltipEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY + "px";
        // tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
        tooltipEl.style.pointerEvents = "none";
        tooltipEl.style.zIndex = 55;
    }

    useEffect(() => {
        if (username) {
            const url = `${BASE_URL}${GET_DASHBOARD_DATA}/${username}`;
            axios
                .get(url)
                .then((result) => {
                    console.log(result);

                    if (result.data.profile_pic)
                        setProfilePic(result.data.profile_pic);
                    setCurrentRating(result.data.current_rating);
                    setMaxRating(result.data.max_rating);

                    setQuestionStats(result.data.question_stats);
                    setContestStats(result.data.contest_stats);

                    setContestStatsLine(result.data.contest_stats_line);
                    setLineChartData(result.data.contest_stats_line);
                    setSubmissionData(result.data.submission_data);
                })
                .catch((err) => {
                    console.log(err);
                    router.push("/404");
                });

            // console.log(username)
        }
    }, [username]);

    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Navbar />
            <div className="dashboard">
                <div className="summary_area">
                    <p className="dashboard_title_div">Statistics</p>
                    <div className="dashboard_left_top">
                        <div className="dashboard_profile_info">
                            <img
                                src={profile_pic}
                                style={{ "border-radius": "50%" }}
                            ></img>
                            <div className="dashboard-profile-user">
                                <p>{username}</p>
                                <p>Current Rating : {current_rating}</p>
                                <p>(Max: {max_rating})</p>
                            </div>
                        </div>
                        <div className="dashboard_graph_div">
                            {question_stats.length != 0 ? (
                                <div className="dashboard_graph">
                                    {question_stats[0] + question_stats[1] !=
                                    0 ? (
                                        <>
                                            <Doughnut
                                                className="p-5"
                                                data={getProblemStatsObject()}
                                            />
                                            <p className="text-md">
                                                Problems Solved<br></br>
                                                {question_stats[1]}/
                                                {question_stats[0] +
                                                    question_stats[1]}
                                            </p>
                                        </>
                                    ) : (
                                        <p>Not enough data to display</p>
                                    )}
                                </div>
                            ) : (
                                <div className="dashboard_graph">
                                    Loading...
                                </div>
                            )}

                            {contest_stats.length != 0 ? (
                                <div className="dashboard_graph">
                                    {contest_stats[0] +
                                        contest_stats[1] +
                                        contest_stats[2] !=
                                    0 ? (
                                        <>
                                            <Doughnut
                                                className="p-5"
                                                data={getContestStatsObject()}
                                            />
                                            <p className="text-md">
                                                Contest Attempted
                                                <br />
                                                {contest_stats[0]}/
                                                {contest_stats[0] +
                                                    contest_stats[1] +
                                                    contest_stats[2]}
                                            </p>
                                        </>
                                    ) : (
                                        <p>Not enough data to display</p>
                                    )}
                                </div>
                            ) : (
                                <div className="dashboard_graph">
                                    Loading...
                                </div>
                            )}
                        </div>
                    </div>
                    {line_data ? (
                        <div className="dashboard_trendline flex justify-center">
                            {contest_stats_line.length !== 0 ? (
                                <Line
                                    className="p-2"
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: "Contest Ratings",
                                                color: ["white"],
                                                font: {
                                                    size: 14,
                                                    weight: "normal",
                                                },
                                            },
                                            tooltip: {
                                                enabled: false,
                                                external: function (context) {
                                                    toolTip(context);
                                                },
                                            },
                                        },
                                    }}
                                    data={line_data}
                                />
                            ) : (
                                <>Not enough data to display trendline</>
                            )}
                        </div>
                    ) : (
                        <div className="dashboard_trendline">Loading...</div>
                    )}
                </div>
                <div className="summary_area">
                    <p className="dashboard_title_div submission_div">
                        Submissions
                    </p>
                    {submission_data.length != 0 ? (
                        <div className="bg-slate-800 rounded-lg h-95.5% submission-details-dashboard">
                            <div className="dashboard_submission_title">
                                <div>S.No.</div>
                                <div>Q Id.</div>
                                <div className="col-span-2">Time stamp</div>
                                <div className="col-span-2">Verdict</div>
                            </div>

                            {submission_data.map((submission, index) => (
                                <SubmissionRow
                                    key={index}
                                    index={index}
                                    submission_id={submission._id}
                                    ques_no={submission.ques_id}
                                    submission_time={submission.time_stamp}
                                    verdict={submission.verdict}
                                />
                            ))}
                            <div className="">
                                <div
                                    className="dashboard_submission_heading col-start-4 hover:text-green-700 hover:cursor-pointer"
                                    onClick={() => {
                                        router.push(`/submissions`);
                                    }}
                                >
                                    View all Submissions
                                    <AiFillCaretDown />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-800 rounded-lg flex justify-center submission-details-dashboard">
                            No submissions made
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default dashboard;
