import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CodeEditor from "../../../components/CodeEditor";
import Navbar from "../../../components/Navbar";
import QuestionStatement from "../../../components/QuestionStatement";
import snippetCode from "../../../components/snippet";
import axios from "axios";
import ConsolePanel from "../../../components/console_panel";
import Head from "next/head";

import {
  GET_SUBMISSION,
  SUBMIT_QUESTION,
  BASE_URL,
} from "../../../utils/constants";
import Countdown from "../../../components/Countdown";


function ProblemPage() {
  const router = useRouter();
  const { pid, cid } = router.query;

  const [problemId, setProblemId] = React.useState("");
  const [contestId, setContestId] = React.useState("");
  const [contestEndTime, setContestEndTime] = React.useState("");

  const [code, setCode] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [lowerSpaceVisible, setLowerSpaceVisible] = React.useState(false);
  const [editorHeight, setEditorHeight] = React.useState('calc(90vh - 80px)');
  const [consoleData, setConsoleData] = React.useState("Nothing to display on console");
  const [consoleLoader, setConsoleLoader] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const [question__id, setQuestionId] = React.useState("");
  const [ques_name, setQuesName] = React.useState("");
  const [submitting, setSubmitting] = useState("");
  const [background, setbackground] = useState("bg-warning"); // This stores the background of console - default is bg-warning, other values include error and success
  const [severeError, setSevereError] = useState(""); // Error in case backend is not able to give proper response


  const code_console = {
    display: lowerSpaceVisible ? "block" : "none",
  };

  useEffect(() => {
    if (router.isReady) {
      setProblemId(pid);
      setContestId(cid);

      const url = BASE_URL + `/contest/timings/${cid}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };

      axios.get(url, options).then((res) => {

        setContestEndTime(res.data.end_time);
        if (!(res.data.ques_ids && res.data.ques_ids.some((item) => item.ques_id === pid))) router.push("/404");
      }).catch((error) => {
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
        else {
          setSevereError("Something went wrong.");
        }
      })
    }
  }, [router.isReady])

  useEffect(() => {
    let prevCode = localStorage.getItem(problemId);
    if (prevCode === null) {
      prevCode = snippetCode;
    }
    let prevCodeWithoutSpaces = prevCode.replace(/\s/g, "");
    if (prevCodeWithoutSpaces.length === 0) {
      prevCode = snippetCode;
    }
    setCode(prevCode);
  }, [problemId]);

  const controlConsole = () => {
    setEditorHeight(editorHeight === 'calc(90vh - 80px)' ? 'calc(90vh - 300px)' : 'calc(90vh - 80px)');
    setLowerSpaceVisible(!lowerSpaceVisible);
    setIsOpen(!isOpen);
  };

  const onSubmit = async () => {
    setConsoleData("Evaluating the code ...");
    if (!isOpen) {
      setEditorHeight(editorHeight === 'calc(90vh - 80px)' ? 'calc(90vh - 300px)' : 'calc(90vh - 80px)');
      setLowerSpaceVisible(!lowerSpaceVisible);
      setIsOpen(true);
    }

    setConsoleLoader(true);
    setSubmitting("loading");

    const url = BASE_URL + SUBMIT_QUESTION;
    const config = {
      headers: {
        "Content-background": "application/x-www-form-urlencoded",
        token: localStorage.getItem("token"),
      },
    };
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("language", "cpp");
    params.append("contest_id", contestId);
    params.append("ques_id", question__id);
    params.append("ques_name", ques_name);

    axios
      .post(url, params, config)
      .then((result) => {
        const submission_id = result.data.submission_id;


        let poll;
        var count = 0;

        poll = setInterval(async () => {
          count = count + 1;
          if (count === 20) {
            setConsoleData(
              `It is taking longer than usual. Please go the submission page to see the status.`
            );
            setSubmitting("");
            setConsoleLoader(false);
            clearInterval(poll);
          } else {
            const poll_url = `${BASE_URL}${GET_SUBMISSION}/${submission_id}`;
            axios
              .get(poll_url)
              .then((result) => {
                if (result.data.verdict === "Accepted") {
                  const timeTaken = parseFloat(result.data.time_taken);
                  const timeTakenFormatted = timeTaken.toFixed(3);
                  setConsoleData(
                    `Verdict: Accepted\nTime: ${timeTakenFormatted} milliseconds`
                  );
                  setSubmitting("");
                  setbackground("bg-success");
                  setConsoleLoader(false);
                  clearInterval(poll);
                } else if (
                  result.data.verdict === "Wrong Answer"
                ) {
                  setSubmitting("");
                  setConsoleData(`Verdict : Wrong Answer`);
                  setbackground("bg-error");
                  setConsoleLoader(false);
                  clearInterval(poll);
                } else if (
                  result.data.verdict === "Compilation Error"
                ) {

                  let toSet = result.data.error.replace(/\/home[\s\S]*?\.cpp:/g, '')
                  setConsoleData(
                    `Verdict : Compilation Error\n${toSet}`
                  );
                  setSubmitting("");
                  setbackground("bg-error");
                  setConsoleLoader(false);
                  clearInterval(poll);
                } else if (
                  result.data.verdict ===
                  "Time Limit Exceeded"
                ) {
                  setConsoleData(
                    `Verdict : Time Limit Exceeded`
                  );
                  setSubmitting("");
                  setbackground("bg-error");
                  setConsoleLoader(false);
                  clearInterval(poll);
                } else if (result.data.verdict === "Memory Limit Exceeded") {
                  setSubmitting("");
                  setConsoleData("Memory Limit Exceeded");
                  setbackground("bg-error");
                  setConsoleLoader(false);
                  clearInterval(poll);
                }
              })
              .catch((error) => {
                setConsoleData(
                  `Something Went Wrong. Please try again.`
                );
                setbackground("bg-error");
                setConsoleLoader(false);
                clearInterval(poll);
                setSubmitting("");
              });
          }
        }, 3000);
      })
      .catch((err) => {
        if (err.response.data.error === "Invalid Token") setConsoleData("Your session has expired. Please login again");
        else
          setConsoleData(
            "Something went wrong. Check your internet and retry."
          );
        setbackground("bg-error");
        setSubmitting("");
        setConsoleLoader(false);
      });
  };

  return (
    <div>
      <Head>
        {problemId ? (
          <title> DCC - {contestId} : {problemId}</title>
        ) : (
          <title>DCC : Loading</title>
        )}
      </Head>
      <Navbar />
      <div className='content-area-top'>
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
          <div className="problem-page">

            {/* This will be visible on smaller screens only */}
            <div className="ContestCountdownTop-container">
              <div className="ContestCountdownTop">
                <Countdown deadline={contestEndTime} />
              </div>
            </div>
            {/* This will be visible on smaller screens only */}


            <div className="problem-page-left">
              <QuestionStatement
                problemId={problemId}
                loader={loader}
                setLoader={setLoader}
                setQuestionId={setQuestionId}
                setQuesName={setQuesName}
              />
            </div>
            <div className="problem-page-right">
              <div className="problem-page-right-top" style={{ height: editorHeight }}>
                {contestEndTime && <CodeEditor
                  loader={loader}
                  Code={code}
                  setCode={setCode}
                  ProblemId={problemId}
                  EditorHeight={editorHeight}
                  EditorWidth="58vw"
                  controlConsole={controlConsole}
                  onSubmit={onSubmit}
                  submitting={submitting}
                  countdownRequired={true}
                  deadline={contestEndTime}
                />}
              </div>
              <div
                className="problem-page-right-bottom border-green-500"
                style={code_console}
              >
                <ConsolePanel
                  consoleLoader={consoleLoader}
                  isOpen={isOpen}
                  console_data={consoleData}
                  width="57vw"
                  background={background}
                />
              </div>
            </div>
          </div>}
      </div>
    </div>

  )
}

export default ProblemPage;
