import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import CodeEditor from "../../components/CodeEditor";
import Navbar from "../../components/Navbar";
import QuestionStatement from "../../components/QuestionStatement";
import snippetCode from "../../components/snippet";
import axios from "axios";
import ConsolePanel from "../../components/console_panel";
import Head from "next/head";
import { useSelector } from "react-redux";
import { GET_SUBMISSION, SUBMIT_QUESTION, BASE_URL } from "../../utils/constants";

function problemPage() {
  const router = useRouter();
  const { pid } = router.query;

  const [problemId, setProblemId] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [lowerSpaceVisible, setLowerSpaceVisible] = React.useState(false);
  const [editorHeight, setEditorHeight] = React.useState("78vh");
  const [consoleData, setConsoleData] = React.useState("Nothing to display on console");
  const [consoleLoader, setConsoleLoader] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [question__id, setQuestionId] = React.useState("");

  const code_console = {
    display: lowerSpaceVisible ? 'block' : 'none'
  }

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
    setEditorHeight((editorHeight === "78vh") ? "60vh" : "78vh");
    setLowerSpaceVisible(!lowerSpaceVisible);
    setIsOpen(!isOpen);
  }

  const onSubmit = async () => {
    setConsoleData("Evaluating the code ...");
    if (!isOpen) {
      setEditorHeight((editorHeight === "78vh") ? "60vh" : "78vh");
      setLowerSpaceVisible(!lowerSpaceVisible);
      setIsOpen(true);
    }

    setConsoleLoader(true);
    const url = BASE_URL + SUBMIT_QUESTION;
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": localStorage.getItem("token"),
      },
    };
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("language", "cpp");
    params.append("ques_id", question__id);

    axios.post(url, params, config).then((result) => {
      const submission_id = result.data.submission_id;
      console.log(submission_id);

      let poll;
      var count = 0;

      poll = setInterval(async () => {
        console.log("Poll = ", poll)
        console.log("count = ", count)
        count = count + 1;
        if (count === 10) {
          setConsoleData(`It is taking longer than usual. Please go the submission page to see the status.`);
          setConsoleLoader(false);
          clearInterval(poll);
        }
        else {
          const poll_url = `${BASE_URL}${GET_SUBMISSION}/${submission_id}`;
          axios.get(poll_url).then((result) => {
            if (result.data.verdict === "Accepted") {
              setConsoleData(`Verdict : Accepted\nTime : ${result.data.time_taken} seconds`);
              setConsoleLoader(false);
              clearInterval(poll);
            }
            else if (result.data.verdict === "Wrong Answer") {
              setConsoleData(`Verdict : Wrong Answer`);
              setConsoleLoader(false);
              clearInterval(poll);
            }
            else if (result.data.verdict === "Compilation Error") {
              setConsoleData(`Verdict : Compilation Error\n${result.data.error}`);
              setConsoleLoader(false);
              clearInterval(poll);
            }
            else if (result.data.verdict === "Time Limit Exceeded") {
              setConsoleData(`Verdict : Time Limit Exceeded`);
              setConsoleLoader(false);
              clearInterval(poll);
            }
            else if (result.data.verdict === "Server Error") {
              setConsoleData(`Server Error`);
              setConsoleLoader(false);
              clearInterval(poll);
            }

          }).catch((error) => {
            setConsoleData(`Something Went Wrong. Please try again.`);
            setConsoleLoader(false);
            clearInterval(poll);

          })
        }

      }, 3000)
    })
      .catch((err) => {
        setConsoleData("Something went wrong. Check your internet and retry again.");
        setConsoleLoader(false);
      });
  };

  return (
    <div>
      <Head>
        {problemId ? <title>DCC : {problemId}</title> : <title>DCC : Loading</title>}
      </Head>
      <Navbar />
      <div className="problem-page">
        <div className="problem-page-left">
          <QuestionStatement problemId={problemId} loader={loader} setLoader={setLoader} setQuestionId={setQuestionId} />
        </div>
        <div className="problem-page-right">
          <div className="problem-page-right-top">
            <CodeEditor loader={loader} Code={code} setCode={setCode} ProblemId={problemId} EditorHeight={editorHeight} EditorWidth="58vw" controlConsole={controlConsole} onSubmit={onSubmit} />
          </div>
          <div className="problem-page-right-bottom border-green-500" style={code_console}>
            <ConsolePanel consoleLoader={consoleLoader} isOpen={isOpen} console_data={consoleData} width="60vw" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default problemPage;
