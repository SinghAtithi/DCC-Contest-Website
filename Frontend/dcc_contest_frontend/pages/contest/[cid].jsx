import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar';
import ProblemTable from '../../components/contest/problemTable';
import { BASE_URL } from '../../utils/constants';
import Head from 'next/head';
import TableSkeleton from '../../components/skeleton/TableSkeleton';
import Countdown from '../../components/Countdown';
import { useSelector } from 'react-redux';

const ContestProblem = () => {
  const router = useRouter(); // router to access the url parameters, redirect etc.
  const { cid } = router.query; // cid variable in the url
  const {username} = useSelector(state=>state.login);

  const [contestId, setContestId] = useState(""); // Contest id for which the page is - from url
  const [contestName, setContestName] = useState(""); // Contest id for which the page is - from url
  const [contestEndTime, setContestEndTime] = useState(""); // Contest id for which the page is - from url
  const [problems, setProblems] = useState([]) // problems that must be shown in this page
  const [solved, setSolved] = useState([]) // problems that have been solved

  const [skeletonLoading, setSkeletonLoading] = useState(true); // For loading skeleton

  const [severeError, setSevereError] = useState(""); // Error in case backend is not able to give proper response

  // useEffect that will be triggered when cid changes.
  useEffect(() => {
    setSkeletonLoading(true);
    setContestId(cid);
    if (cid) {
      const url = BASE_URL + `/contest/${cid}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };

      // This will return the data only when contest is running
      axios.get(url, options).then((res) => {
        console.log(res.data);
        setSolved(res.data.solved);
        setProblems(res.data.ques_ids);
        setContestName(res.data.contest_name);
        setContestEndTime(res.data.end_time);
        setSkeletonLoading(false);
      }).catch((error) => {
        // Display an error message if the API request fails
        if (error) {
          console.log(error);
          if (error.response) {
            const statusCode = error.response.status;
            if (statusCode == 403) setSevereError("Forbidden : Contest has not yet started.");
            else if (statusCode == 404) setSevereError("Contest not found. You must have missed the registeration deadline or the contest doesnot exist.");
            else if (statusCode == 500) setSevereError("Internal Server Error");
            else if (statusCode == 401) setSevereError("Your session has expired. Please re-login");
          }
          else if (error.request) {
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
  }, [cid])

  return (
    <>
      <Head>
        <title>DCC : {contestId}</title>
      </Head>
      <Navbar />

      <div className='content-area-top'>
        <div className='p-2'>
          {severeError ? <div className='flex justify-center'>
            <div className="alert alert-error shadow-lg w-fit">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{severeError}</span>
              </div>
            </div>
          </div>
            : (skeletonLoading ? <ContestPageSkeleton /> : <>
              <h2 id="contest-main-heading">Contest : {contestName}</h2>
              <div className="flex justify-center">
                <div className="block m-4 px-4 rounded-lg bg-red-600">
                  <Countdown deadline={contestEndTime} />
                </div>
              </div>
              <div className='p-2'>
                <ProblemTable problems={problems} cid={cid} solved={solved}/>
              </div>
              <div className="p-2">
                <button className='btn btn-outline btn-info mx-2' onClick={()=>{
                  router.push(`/submissions/${username}`);
                }}>Submissions</button>
                <button className='btn btn-outline btn-info' onClick={()=>{
                  router.push(`/leaderboard/${cid}`);
                }}>Leaderboard</button>
              </div>
            </>
            )}
        </div>

      </div>
    </>
  )
}

function ContestPageSkeleton() {
  return (
    <>
      <h2 id="contest-main-heading"><div className="animated-background" style={{ width: "50%", height: "25px" }}></div></h2>
      <div className="flex justify-center">
        <div className="animated-background mt-2" style={{ width: "35%", height: "25px" }}></div>
      </div>
      <div className='p-2'>
        <TableSkeleton table_headers={["", "Problem", "Points", "Actions"]} rows={5} />
      </div>
    </>
  )
}

export default ContestProblem