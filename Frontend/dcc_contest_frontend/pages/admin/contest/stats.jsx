import React from 'react'
import CardComponent from '../../../components/contest/stats/CardComponent'
import Head from 'next/head'
import SideNav from '../../../components/SideNavAdmin'
import { useState } from 'react'
import { SUPER_ADMIN, AdminSideNavMap, END_USER, ADMIN, LOGIN_PAGE, GET_CONTEST_STATISTICS_BACKEND, BASE_URL } from '../../../utils/constants'
import BarCharts from '../../../components/contest/stats/BarCharts'
import LineCharts from '../../../components/contest/stats/LineChart'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import checkToken from '../../../utils/checkToken'
import axios from 'axios'
import ContestStatsSkeleton from '../../../components/skeleton/ContestStatsSkeleton'
import moment from 'moment';

export default function Statistics() {
    const router = useRouter();
    const { role, username, loggedIn } = useSelector(state => state.login);

    const [contest_name, setContestName] = useState("");
    const [no_registrations, setNoOfRegistrations] = useState(0);
    const [no_submissions, setNoOfSubmissions] = useState(0);
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [duration, setDuration] = useState("");
    const [no_active_users, setNoOfActiveUsers] = useState(0);
    const [quesWiseSubmissions, setQuesWiseSubmissions] = useState([]);

    const [timeWiseSubmission, setTimeWiseSubmission] = useState([]);

    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [severeError, setSevereError] = useState("");

    // useEffect that will be run when page loads.
    useEffect(() => {
        if (router.isReady) {
            if (loggedIn && (role === ADMIN || role === SUPER_ADMIN)) {
                if (router.query["id"]) {
                    getContestStats(router.query["id"]);
                }
                else {
                    // Set error that this page cannot be accessed directly
                    setSevereError("This page cannot be accessed directly. Please go to Search Contest Page, secarch for the contest and then click on Statistics.")
                    setLoadingSkeleton(false);
                }
            }
            else if (loggedIn && role === END_USER) router.push(`/${username}`);
            else {
                checkToken().then((status) => {
                    if (status.verified) {
                        if (status.role === ADMIN || status.role === SUPER_ADMIN) {
                            if (router.query["id"]) {
                                getContestStats(router.query["id"]);
                            }
                            else {
                                // Set error that this page cannot be accessed directly
                                setSevereError("This page cannot be accessed directly. Please go to Search Contest Page, secarch for the contest and then click on Statistics.")
                                setLoadingSkeleton(false);
                            }
                        } else router.push(`/${username}`);
                    } else {
                        if (router.query["id"]) {
                            router.push(LOGIN_PAGE + `?next=admin/contest/stats?id=${router.query["id"]}`);
                        }
                        else router.push(LOGIN_PAGE + "?next=admin/contest/view");
                    }
                });
            }
        }

    }, [router.isReady]);


    function getDuration(start_time, end_time) {
        const format = 'DD/MM/YYYY HH:mm';
        const startTime = moment(start_time, format);
        const endTime = moment(end_time, format);
        const duration = moment.duration(endTime.diff(startTime));

        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();

        let durationString = '';
        if (days > 0) {
            durationString += `${days} days `;
        }
        durationString += `${hours} hours ${minutes} minutes`;

        return durationString;
    }

    function getFullQuesStats(ques_ids, questionWiseSubmissions) {
        // Create a map of ques_id to total_submissions
        const submissionsMap = {};
        questionWiseSubmissions.forEach((submission) => {
            const { ques_id, total_submissions, accepted } = submission;
            submissionsMap[ques_id] = { total_submissions, accepted };
        });

        // Initialize the result array
        const result = ques_ids.map((ques) => {
            const { ques_id } = ques;
            const total_submissions = (submissionsMap[ques_id] && submissionsMap[ques_id].total_submissions) || 0;
            const accepted = (submissionsMap[ques_id] && submissionsMap[ques_id].accepted) || 0;
            return { ques_id, total_submissions, accepted };
        });
        return result;
    }


    function getContestStats(contest_id) {
        const url = BASE_URL + GET_CONTEST_STATISTICS_BACKEND + `/${contest_id}`;

        const options = {
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        };
        axios
            .get(url, options)
            .then((result) => {

                const data = result.data.data;

                if (!data) {
                    setSevereError(`Contest with ID ${contest_id} does not exist.`);
                    setLoadingSkeleton(false);
                }
                else {
                    console.log(data);
                    setContestName(data.contest_name);
                    setStartTime(data.start_time);
                    setEndTime(data.end_time);
                    setDuration(getDuration(data.start_time, data.end_time));

                    setNoOfRegistrations(data.no_of_registrations);
                    setNoOfSubmissions(data.no_of_submissions);
                    setNoOfActiveUsers(data.no_of_active_users);

                    if (data.ques_ids && data.ques_ids.length !== 0) {
                        const result = getFullQuesStats(data.ques_ids, data.question_wise_submissions);
                        setQuesWiseSubmissions(result);
                    }

                    setTimeWiseSubmission(data.time_wise_submissions); // A list of objects having _id, count, count_accepted

                    console.log(data.time_wise_submissions)
                    setSevereError("");
                    setLoadingSkeleton(false);
                }
            })
            .catch((error) => {
                // Display an error message if the API request fails
                if (error) {
                    if (error.response) {
                        const statusCode = error.response.status;
                        if (statusCode == 404) setSevereError(`Contest with ID ${contest_id} does not exist.`);
                        else if (statusCode == 500) setSevereError("Internal Server Error");
                        else if (statusCode == 401) setSevereError("Your session has expired. Please re-login");
                        else setSevereError("Something went wrong. Please relaod");
                    }
                    else if (error.request) {
                        setSevereError("Network error. Please check your internet connection");
                    }
                }
                else {
                    setSevereError("Something went wrong. Please relaod");
                }

                // Set the loading state to false
                setLoadingSkeleton(false);
            });

    }


    return (
        <>
            <Head><title>DCC : Contest Stats</title></Head>
            <SideNav role={role} highlight={AdminSideNavMap.contest_stats} />
            {/* <ViewContestSkeleton /> */}

            {
                loadingSkeleton
                    ? <ContestStatsSkeleton />
                    :
                    <div className='data-area'>
                        {severeError
                            ? <div className='flex justify-center p-2'>
                                <div className="alert alert-error shadow-lg w-fit">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{severeError}</span>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                <h2 className="stats-heading">Contest Details</h2>
                                <div className='contest-stats p-2'>
                                    <div className="card-component">
                                        <CardComponent title={"Contest Name"} value={contest_name} />
                                    </div>
                                    <div className="card-component">
                                        <CardComponent title={"Start time"} value={start_time} />
                                    </div>
                                    <div className="card-component">
                                        <CardComponent title={"End time"} value={end_time} />
                                    </div>
                                    <div className="card-component">
                                        <CardComponent title={"Duration"} value={duration} />
                                    </div>
                                </div>

                                <h2 className="stats-heading">Statistics</h2>
                                <div className='contest-stats p-2'>
                                    <div className="card-component">
                                        <CardComponent title={"No. of Registrations"} value={no_registrations} />
                                    </div>
                                    <div className="card-component">
                                        <CardComponent title={"No. of Active Users"} value={no_active_users} />
                                    </div>
                                    <div className="card-component">
                                        <CardComponent title={"No. of Submissions"} value={no_submissions} />
                                    </div>

                                </div>

                                {quesWiseSubmissions.length !== 0 ? <div className='contest-stats p-2'>
                                    <div className="card-component">
                                        <h2 className="stats-sub-heading">Question wise Submission</h2>
                                        <BarCharts title={"Question wise Submission Stats"} label={"Submissions"} labels={quesWiseSubmissions.map(ques => ques.ques_id)} data={quesWiseSubmissions.map(ques => ques.total_submissions)} />
                                    </div>
                                    <div className="card-component">
                                        <h2 className="stats-sub-heading">Question wise Acceptance rate</h2>
                                        <BarCharts title={"Question wise Acceptance rate"} label={"Acceptance Rate"} labels={quesWiseSubmissions.map(ques => ques.ques_id)} data={quesWiseSubmissions.map(ques => { return ques.accepted / ques.total_submissions * 100 })} asPercentage={true} y_min_max={[0, 100]} />
                                    </div>

                                </div> : <></>}

                                {timeWiseSubmission.length !== 0 ? <div className='contest-stats p-2'>
                                    <div className="card-component">
                                        <h2 className="stats-sub-heading">Time wise Submission Stats</h2>
                                        <LineCharts
                                            title={"Time wise Submission Stats"}
                                            label1={"No. of Submissions"}
                                            label2={"No. of correct Submissions"}
                                            labels={timeWiseSubmission.map(submission => submission.time_stamp)}
                                            data1={timeWiseSubmission.map(submission => submission.total_submissions)}
                                            data2={timeWiseSubmission.map(submission => submission.count_accepted)}
                                        />
                                    </div>
                                </div> : <></>}
                            </>
                        }
                    </div>}
        </>
    )
}
