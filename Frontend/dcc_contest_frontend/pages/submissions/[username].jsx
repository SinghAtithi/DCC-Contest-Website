import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import SubmissionTable from "../../components/submission/submissionTable";
import TableSkeleton from "../../components/skeleton/TableSkeleton";

export default function Submissions() {
    const router = useRouter();
    const { username } = router.query;

    const [submissionData, setSubmissionData] = useState([]);
    const [skeletonLoading, setSkeletonLoading] = useState(true);
    const [severeError, setSevereError] = useState("");


    useEffect(() => {
        if (router.isReady) {
            // Define the URL for the API request
            const url = BASE_URL + `/question/getAllSubmissions/${username}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
            };

            // Send a GET request to the API
            axios
                .get(url, options)
                .then((res) => {
                    // Extract the contest data from the response
                    // Update the state variables with the contest data
                    setSubmissionData(res.data);

                    // Set the loading state to false
                    setSkeletonLoading(false);
                })
                .catch((err) => {
                    // Display an error message if the API request fails
                    if (err) {
                        if (err.response) {
                            setSevereError("Internal Server Error");
                        }
                        else if (err.request) {
                            setSevereError("Network error. Please check your internet connection");
                        }
                    }
                    else {
                        setSevereError("Something went wrong. Please relaod");
                    }

                    // Set the loading state to false
                    setSkeletonLoading(false);
                })
        }
    }, [router.isReady]);


    return (
        <>
            <Head><title>DCC : Submissions</title></Head>
            <Navbar />

            <div className="content-area-top">
                {severeError ? <div className='flex justify-center p-2'>
                    <div className="alert alert-error shadow-lg w-fit">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{severeError}</span>
                        </div>
                    </div>
                </div> : <div className="p-2">
                    <h2 id="contest-main-heading">SUBMISSIONS</h2>
                    {skeletonLoading ? <TableSkeleton table_headers={["#", "Submitted At", "Name", "Verdict", "Time taken", "Actions"]} rows={5} /> : <SubmissionTable data={submissionData} />}
                </div>}
            </div>

        </>
    )
}
