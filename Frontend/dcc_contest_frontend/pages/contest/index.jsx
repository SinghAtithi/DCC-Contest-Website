import Router, { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { use, useEffect, useState } from "react";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import Countdown from "../../components/Countdown";
import moment from "moment/moment";
import ContestRegisterModal from "../../components/ContestRegisterModal";
import PastContestProblemModal from "../../components/PastContestProblemModal";
import ContestLandingSkeleton from "./ContestLandingSkeleton";
import { useSelector } from "react-redux";
import ContestUnRegisterModal from "../../components/ContestUnregisterModal";


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
  const router = useRouter();
  const { username } = useSelector(state => state.login);

  const [open, setOpen] = useState(false);
  const [openUnregister, setOpenUnregister] = useState(false);
  const [name, setName] = useState("");
  const [contestId, setContestId] = useState("");

  const [openPast, setOpenPast] = useState(false);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ongoingContests, setOngoingContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);


  useEffect(() => {
    axios
      .get(`${BASE_URL}/contest`)
      .then((res) => {
        const { ongoing = [], upcoming = [], past = [] } = res.data;
        setOngoingContests(ongoing);
        setPastContests(past);
        setUpcomingContests(upcoming);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        alert("Internal Server Error");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>DCC : Contests</title>
      </Head>

      <Navbar />

      <div className="content-area-top">
        {loading ? <ContestLandingSkeleton />
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
            <PastContests pastContests={pastContests} setOpenPast={setOpenPast} setName={setName} setContestId={setContestId} setProblems={setProblems} /></>}
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
            {props.upcomingContests.map((contest, index) => (
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
            ))}
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
        {/* head */}
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
          {props.ongoingContests.map((contest, index) => (
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
          ))}
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
          {/* head */}
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
            {props.pastContests.map((contest, index) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContestPage;
