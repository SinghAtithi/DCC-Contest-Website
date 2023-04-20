import Router, { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import toggleLoaderBackdrop from "../../utils/toggleCustomBackdrop";
import { baseUrl } from "../../utils/constants";
import axios from "axios";
import Link from "next/link";
import Countdown from "../../components/Countdown";
import moment from "moment/moment";
import ContestRegisterModal from "../../components/ContestRegisterModal";
import PastContestRegistrationModal from "../../components/PastContestProblemModal";


const contestPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contestId, setContestId] = useState("");

  const [openPast, setOpenPast] = useState(false);
  const [problems, setProblems] = useState([]);

  const ongoingContests = [
    {
      contestId: "A",
      name: "Contest A",
      startTime: "16/04/2023 00:00",
      endTime: "20/04/2023 18:00",
    },
    {
      contestId: "B",
      name: "Contest B",
      startTime: "15/04/2023 00:00",
      endTime: "21/04/2023 09:00",
    },
  ];

  const upcomingContests = [
    {
      contestId: "C",
      name: "Contest C",
      startTime: "22/04/2023 00:00",
      endTime: "25/04/2023 00:00",
    },
    {
      contestId: "D",
      name: "Contest D",
      startTime: "25/04/2023 00:00",
      endTime: "28/04/2023 00:00",
    },
  ];

  const pastContests = [
    {
      contestId: "E",
      name: "Contest E",
      startTime: "10/04/2023 00:00",
      endTime: "15/04/2023 00:00",
      problems: [{ name: "P1", problemId: "P1" }, { name: "P2", problemId: "P2" }, { name: "P3", problemId: "P3" }, { name: "P4", problemId: "P4" }, { name: "P4", problemId: "P4" }]
    },
    {
      contestId: "F",
      name: "Contest F",
      startTime: "10/04/2023 00:00",
      endTime: "15/04/2023 00:00",
      problems: [{ name: "P1", problemId: "P1" }, { name: "P2", problemId: "P2" }, { name: "P3", problemId: "P3" }, { name: "P4", problemId: "P4" }, { name: "P4", problemId: "P4" }]
    },
    {
      contestId: "G",
      name: "Contest G",
      startTime: "10/04/2023 00:00",
      endTime: "15/04/2023 00:00",
      problems: [{ name: "P1", problemId: "P1" }, { name: "P2", problemId: "P2" }, { name: "P3", problemId: "P3" }, { name: "P4", problemId: "P4" }, { name: "P4", problemId: "P4" }]
    },
    {
      contestId: "H",
      name: "Contest H",
      startTime: "10/04/2023 00:00",
      endTime: "15/04/2023 00:00",
      problems: [{ name: "P1", problemId: "P1" }, { name: "P2", problemId: "P2" }, { name: "P3", problemId: "P3" }, { name: "P4", problemId: "P4" }, { name: "P4", problemId: "P4" }]
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
  return (
    <>
      <Head>
        <title>Contests</title>
      </Head>

      <Navbar />

      <div className="contest-page">
        <ContestRegisterModal
          open={open}
          setOpen={setOpen}
          contestId={contestId}
          name={name}
        />
        <PastContestRegistrationModal open={openPast} setOpen={setOpenPast} name={name} problems={problems} />
        <h1 id="contest-main-heading">CONTESTS</h1>
        <div id="contest-section">
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
                {ongoingContests.map((contest, index) => (
                  <tr key={contest.contestId} className="hover">
                    <th>{index + 1}</th>
                    <td>{contest.name}</td>
                    <td>{contest.startTime}</td>
                    <td>{getDuration(contest.startTime, contest.endTime)}</td>
                    <td>
                      <Countdown deadline={contest.endTime} />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-info min-h-8 h-8"
                        onClick={() => { toggleLoaderBackdrop(); Router.push(`/contest/${contest.contestId}`); }}
                      >
                        Enter
                      </button>
                    </td>
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
                  <th>SL. NO.</th>
                  <th>Contest Name</th>
                  <th>Start</th>
                  <th>Length</th>
                  <th>Registration Closes in</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingContests.map((contest, index) => (
                  <tr key={contest.contestId} className="hover">
                    <th>{index + 1}</th>
                    <td>{contest.name}</td>
                    <td>{contest.startTime}</td>
                    <td>{getDuration(contest.startTime, contest.endTime)}</td>
                    <td>
                      <Countdown deadline={contest.startTime} />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-info min-h-8 h-8"
                        onClick={() => {
                          setOpen(true);
                          setName(contest.name);
                          setContestId(contest.contestId);
                        }}
                      >
                        Register
                      </button>{" "}
                    </td>
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
                  <th>Sl. No.</th>
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
                    <td>{getDuration(contest.startTime, contest.endTime)}</td>
                    <td>
                      <button className="btn btn-outline btn-success min-h-8 h-8" onClick={() => { toggleLoaderBackdrop(); Router.push(`/leaderboard/${contest.contestId}`); }}>
                        Leaderboard
                      </button>{" "}
                      <button className="btn btn-outline btn-success min-h-8 h-8" onClick={() => {
                        setOpenPast(true);
                        setName(contest.name);
                        setProblems(contest.problems);
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
      </div>
    </>
  );
};

export default contestPage;
