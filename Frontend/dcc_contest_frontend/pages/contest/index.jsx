import Router from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import Countdown from "../../components/Countdown";
import moment from "moment/moment";
import ContestRegisterModal from "../../components/ContestRegisterModal";
import PastContestProblemModal from "../../components/PastContestProblemModal";
import ContestLandingSkeleton from "../../components/skeleton/ContestLandingSkeleton";
import { useSelector } from "react-redux";
import ContestUnRegisterModal from "../../components/ContestUnregisterModal";


// A function to get the duration of contests.
function getDuration(startTime, endTime) {
  const end = moment(endTime, "DD/MM/YYYY h:mm:s");
  const start = moment(startTime, "DD/MM/YYYY h:mm:s");

  const time = end.diff(start);

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / 1000 / 60) % 60);

  return `${("0" + days).slice(-2)}:${("0" + hours).slice(-2)}:${(
    "0" + minutes
  ).slice(-2)}`;
}


const ContestPage = () => {
  const { username } = useSelector(state => state.login); // gettimg the login state values as required

  const [open, setOpen] = useState(false); // For manipulating the contestRegisterModal
  const [openUnregister, setOpenUnregister] = useState(false);  // For manipulating the contestUnregisterModal
  const [openPast, setOpenPast] = useState(false); // For manipulating the pastContestModal

  const [name, setName] = useState(""); // For contest name that will be fed to modals
  const [contestId, setContestId] = useState(""); // For contest id that will be fed to modals
  const [problems, setProblems] = useState([]); // problem list for the pastContestModal

  const [skeletonLoading, setSkeletonLoading] = useState(true); // For loading skeleton

  const [ongoingContests, setOngoingContests] = useState([]); // List of ongoing contests
  const [upcomingContests, setUpcomingContests] = useState([]); // List of upcoming contests
  const [pastContests, setPastContests] = useState([]); // List of past contests

  const [severeError, setSevereError] = useState(""); // Error in case backend is not able to give proper response

  // useEffect that will be run on every render of the page.
  useEffect(() => {
    // Define the URL for the API request
    const url = BASE_URL + "/contest";

    // Send a GET request to the API
    axios
      .get(url)
      .then((res) => {
        // Extract the contest data from the response
        const { ongoing = [], upcoming = [], past = [] } = res.data;

        // Update the state variables with the contest data
        setOngoingContests(ongoing);
        setPastContests(past);
        setUpcomingContests(upcoming);

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
      });
  }, []);


  return (
    <>
      <Head>
        <title>DCC : Contests</title>
      </Head>

      <Navbar />

      <div className="content-area-top">
        {severeError
          ?
          <div className='flex justify-center p-2'>
            <div className="alert alert-error shadow-lg w-fit">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{severeError}</span>
              </div>
            </div>
          </div>
          :
          (skeletonLoading ? <ContestLandingSkeleton />
            :
            <>
              <ContestRegisterModal
                open={open}
                setOpen={setOpen}
                contest_id={contestId}
                name={name}
                upcomingContests={upcomingContests}
                setUpcomingContests={setUpcomingContests}
                username={username}
              />
              <ContestUnRegisterModal
                open={openUnregister}
                setOpen={setOpenUnregister}
                contest_id={contestId}
                name={name}
                upcomingContests={upcomingContests}
                setUpcomingContests={setUpcomingContests}
                username={username}
              />
              <PastContestProblemModal open={openPast} setOpen={setOpenPast} name={name} problems={problems} />

              <h1 id="contest-main-heading">CONTESTS</h1>
              <OngoingContests ongoingContests={ongoingContests} />
              <UpcomingContests username={username} upcomingContests={upcomingContests} setOpen={setOpen} setOpenUnregister={setOpenUnregister} setName={setName} setContestId={setContestId} />
              <PastContests pastContests={pastContests} setOpenPast={setOpenPast} setName={setName} setContestId={setContestId} setProblems={setProblems} /></>)
        }
      </div>
    </>
  );
};


function UpcomingContests(props) {
  return (
    <div id="contest-section">
      <h2 id="contest-heading">Upcoming Contests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full custom-table">
          {/* head */}
          <thead>
            <tr>
              <th>SL. NO.</th>
              <th>Contest Name</th>
              <th>Start</th>
              <th>Length</th>
              <th>Registration Closes in</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.upcomingContests.length !== 0 ? (props.upcomingContests.map((contest, index) => (
              <tr key={contest.contest_id} className="hover">
                <th>{index + 1}</th>
                <td>{contest.contest_name}</td>
                <td>{contest.start_time}</td>
                <td>{getDuration(contest.start_time, contest.end_time)}</td>
                <td>
                  <Countdown deadline={contest.start_time} />
                </td>
                <td>
                  {contest.registrations.includes(props.username) ? <button
                    className="btn btn-outline btn-info min-h-8 h-8"
                    onClick={() => {
                      props.setOpenUnregister(true);
                      props.setName(contest.contest_name);
                      props.setContestId(contest.contest_id);
                    }}
                  >
                    Unregister
                  </button>
                    :
                    <button
                      className="btn btn-outline btn-info min-h-8 h-8"
                      onClick={() => {
                        props.setOpen(true);
                        props.setName(contest.contest_name);
                        props.setContestId(contest.contest_id);
                      }}
                    >
                      Register
                    </button>}{" "}
                </td>
              </tr>
            )))
              :
              <tr>
                <th>-</th>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OngoingContests(props) {
  return (<div id="contest-section">
    <h2 id="contest-heading">Ongoing Contests</h2>
    <div className="overflow-x-auto">
      <table className="table w-full custom-table">
        <thead>
          <tr>
            <th>SL. NO.</th>
            <th>Contest Name</th>
            <th>Start</th>
            <th>Length</th>
            <th>Contest Ends In</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.ongoingContests.length !== 0 ? (props.ongoingContests.map((contest, index) => (
            <tr key={contest.contest_id} className="hover">
              <th>{index + 1}</th>
              <td>{contest.contest_name}</td>
              <td>{contest.start_time}</td>
              <td>{getDuration(contest.start_time, contest.end_time)}</td>
              <td>
                <Countdown deadline={contest.end_time} />
              </td>
              <td>
                <button
                  className="btn btn-outline btn-info min-h-8 h-8"
                  onClick={() => { Router.push(`/contest/${contest.contest_id}`); }}
                >
                  Enter
                </button>
              </td>
            </tr>
          )))
            :
            <tr>
              <th>-</th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>)
}

function PastContests(props) {
  return (
    <div id="contest-section">
      <h2 id="contest-heading">Past Contests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full custom-table">
          <thead>
            <tr>
              <th>SL. No.</th>
              <th>Contest Name</th>
              <th>Start</th>
              <th>Length</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.pastContests.length !== 0 ? (props.pastContests.map((contest, index) => (
              <tr key={contest.contest_id} className="hover">
                <th>{index + 1}</th>
                <td>{contest.contest_name}</td>
                <td>{contest.start_time}</td>
                <td>{getDuration(contest.start_time, contest.end_time)}</td>
                <td>
                  <button className="btn btn-outline btn-success min-h-8 h-8" onClick={() => { Router.push(`/leaderboard/${contest.contest_id}`); }}>
                    Leaderboard
                  </button>{" "}
                  <button className="btn btn-outline btn-success min-h-8 h-8" onClick={() => {
                    props.setOpenPast(true);
                    props.setName(contest.contest_name);
                    props.setProblems(contest.ques_ids);
                  }}>
                    Problems
                  </button>
                </td>
              </tr>
            )))
              :
              <tr>
                <th>-</th>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContestPage;
