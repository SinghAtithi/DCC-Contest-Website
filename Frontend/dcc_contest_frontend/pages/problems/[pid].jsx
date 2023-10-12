import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CodeEditor from "../../components/CodeEditor";
import Navbar from "../../components/Navbar";
import QuestionStatement from "../../components/QuestionStatement";
import snippetCode from "../../components/snippet";
import axios from "axios";
import ConsolePanel from "../../components/console_panel";
import Head from "next/head";
import { useSelector } from "react-redux";
import {
  GET_SUBMISSION,
  SUBMIT_QUESTION,
  BASE_URL,
} from "../../utils/constants";
import TheFooter from "../../components/Footer";

function ProblemPage() {
  const router = useRouter();
  const { pid } = router.query;

  const [problemId, setProblemId] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [lowerSpaceVisible, setLowerSpaceVisible] = React.useState(false);
  const [editorHeight, setEditorHeight] = React.useState("calc(90vh - 80px)");
  const [consoleData, setConsoleData] = React.useState(
    "Nothing to display on console"
  );
  const [consoleLoader, setConsoleLoader] = React.useState(false);
  const [loader, setLoader] = React.useState(true);
  const [question__id, setQuestionId] = React.useState("");
  const [ques_name, setQuesName] = React.useState("");
  const [submitting, setSubmitting] = useState("");
  const [background, setbackground] = useState("bg-warning"); // This stores the background of data in console - default is bg-warning, other values include bg-error, bg-success and bg-inherit

  const code_console = {
    display: lowerSpaceVisible ? "block" : "none",
  };

  useEffect(() => {
    if (pid) setProblemId(pid);
  }, [pid]);

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
    setEditorHeight(
      editorHeight === "calc(90vh - 80px)"
        ? "calc(90vh - 300px)"
        : "calc(90vh - 80px)"
    );
    setLowerSpaceVisible(!lowerSpaceVisible);
    setIsOpen(!isOpen);
  };

  const onSubmit = async () => {
    setConsoleData("Evaluating the code ...");
    if (!isOpen) {
      setEditorHeight(
        editorHeight === "calc(90vh - 80px)"
          ? "calc(90vh - 300px)"
          : "calc(90vh - 80px)"
      );
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
    params.append("ques_id", question__id); //This is the mongodb _id
    params.append("ques_name", ques_name);

    axios
      .post(url, params, config)
      .then((result) => {
        console.log(result.data);
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
                } else if (result.data.verdict === "Wrong Answer") {
                  setSubmitting("");
                  setConsoleData(`Verdict : Wrong Answer`);
                  setbackground("bg-error");
                  setConsoleLoader(false);
                  clearInterval(poll);
                } else if (result.data.verdict === "Compilation Error") {
                  setConsoleData(
                    `Verdict : Compilation Error\n${result.data.error}`
                  );
                  setSubmitting("");
                  setbackground("bg-error");
                  setConsoleLoader(false);
                  clearInterval(poll);
                } else if (result.data.verdict === "Time Limit Exceeded") {
                  setConsoleData(`Verdict : Time Limit Exceeded`);
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
                setConsoleData(`Something Went Wrong. Please try again.`);
                setbackground("bg-error");
                setConsoleLoader(false);
                clearInterval(poll);
                setSubmitting("");
              });
          }
        }, 3000);
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.error === "Invalid Token"
        )
          setConsoleData("Your session has expired. Please login again");
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
    <>
      <Head>
        {problemId ? (
          <title>DCC : {problemId}</title>
        ) : (
          <title>DCC : Loading</title>
        )}
      </Head>
      <Navbar />
      <div className="content-area-top">
        <div className="problem-page">
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
            <div
              className="problem-page-right-top"
              style={{ height: editorHeight }}
            >
              <CodeEditor
                loader={loader}
                Code={code}
                setCode={setCode}
                ProblemId={problemId}
                EditorHeight={editorHeight}
                EditorWidth="58vw"
                controlConsole={controlConsole}
                onSubmit={onSubmit}
                submitting={submitting}
                countdownRequired={false}
              />
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
        </div>
      </div>
      {/* <TheFooter /> */}
    </>
  );
}

export default ProblemPage;
