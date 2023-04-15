import Router, { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";
import { baseUrl } from "../../utils/constants";
import axios from "axios";
import Link from "next/link";


const contestPage = () => {
    const router = useRouter();

    const ongoingContests = [
        {
            contestId: "A",
            name: "Contest A",
            startTime: "April 15, 2023 10:00:00",
            endTime: "April 20, 2023 18:00:00",
        },
        {
            contestId: "B",
            name: "Contest B",
            startTime: "April 16, 2023 12:00:00",
            endTime: "April 19, 2023 16:00:00",
        }
    ];

    const upcomingContests = [
        {
            contestId: "C",
            name: "Contest C",
            startTime: "April 22, 2023 09:00:00",
            endTime: "April 25, 2023 17:00:00",
        },
        {
            contestId: "D",
            name: "Contest D",
            startTime: "April 25, 2023 15:00:00",
            endTime: "April 28, 2023 20:00:00",
        },
    ];

    const pastContests = [
        {
            contestId: "E",
            name: "Contest E",
            startTime: "April 10, 2023 08:00:00",
            endTime: "April 15, 2023 12:00:00",
        },
        {
            contestId: "F",
            name: "Contest F",
            startTime: "April 05, 2023 14:00:00",
            endTime: "April 10, 2023 18:00:00",
        },
        {
            contestId: "G",
            name: "Contest G",
            startTime: "April 10, 2023 08:00:00",
            endTime: "April 15, 2023 12:00:00",
        },
        {
            contestId: "H",
            name: "Contest H",
            startTime: "April 05, 2023 14:00:00",
            endTime: "April 10, 2023 18:00:00",
        },
    ];

    useEffect(() => {
        toggleLoaderBackdrop();

        axios
            .get(`${baseUrl}/contest`)
            .then((res) => {
                // divide as upcoming, ongoing and past contests and display on the screen
                console.log(res);
                console.log("Here at contest folder");
                toggleLoaderBackdrop();
            })
            .catch((err) => {
                // do something based on error
                console.log(err);
                console.log(123);
                toggleLoaderBackdrop();
            });
    }, []);

    return (
        <>
            <Head>
                <title>Contests</title>
            </Head>
            <Navbar />
            <div className="contest-page">
                <h1 id="contest-main-heading">CONTESTS</h1>
                <div id="contest-section">
                    <h2 id="contest-heading">Ongoing Contests</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full custom-table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Contest Name</th>
                                    <th>Start</th>
                                    <th>Length</th>
                                    <th>Time Left</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ongoingContests.map((contest, index) => (
                                    <tr key={contest.contestId} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{contest.name}</td>
                                        <td>{contest.startTime}</td>
                                        <td>02:00</td>
                                        <td>01.45</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="contest-section">
                    <h2 id="contest-heading">Upcoming Contests</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full custom-table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Contest Name</th>
                                    <th>Start</th>
                                    <th>Length</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingContests.map((contest, index) => (
                                    <tr key={contest.contestId} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{contest.name}</td>
                                        <td>{contest.startTime}</td>
                                        <td>02:00</td>
                                        <td><button className="btn btn-outline btn-info min-h-8 h-8">Register</button></td> { /*create a register modal here*/ }
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="contest-section">
                    <h2 id="contest-heading">Past Contests</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full custom-table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Contest Name</th>
                                    <th>Start</th>
                                    <th>Length</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastContests.map((contest, index) => (
                                    <tr key={contest.contestId} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{contest.name}</td>
                                        <td>{contest.startTime}</td>
                                        <td>02:00</td>
                                        <td><button className="btn btn-outline btn-success min-h-8 h-8" ><Link href={`/leaderboard/${contest.contestId}`}T>Leaderboard</Link></button> <button className="btn btn-outline btn-success min-h-8 h-8"><Link href={`/contest/${contest.contestId}`}>Problems</Link></button></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default contestPage;
