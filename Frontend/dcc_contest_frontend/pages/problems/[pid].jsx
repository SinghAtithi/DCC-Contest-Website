import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import CodeEditor from "../../components/CodeEditor";
import Navbar from "../../components/Navbar";
import QuestionStatement from "../../components/QuestionStatement";
import snippetCode from "../../components/snippet";
import axios from "axios";
import ConsolePanel from "../../components/console_panel";

// const question_area = {
//   height: "90vh",
//   width: "40%",
//   overflowY: "scroll"
// }

// const code_editor = {
//   height: "90vh",
//   width: "60%",
// }


const button_area = {
  display: "flex"
}



function problemPage() {

  const [problemId, setProblemId] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [lowerSpaceVisible, setLowerSpaceVisible] = React.useState(false);
  const [editorHeight, setEditorHeight] = React.useState("78vh");
  const [consoleData, setConsoleData] = React.useState("Nothing to display on console");
  const [consoleLoader, setConsoleLoader] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const code_console = {
    display: lowerSpaceVisible ? 'block' : 'none'
  }

  useEffect(() => {
      console.log("Here 123");
      try {
        let temp = window.location.href.split("/");
        setProblemId(temp[temp.length - 1]);
      } catch (err) { }
      
    },[]);

  useEffect(() => {
    console.log("Here 456");
    let prevCode = localStorage.getItem(problemId, snippetCode);
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
      setEditorHeight((editorHeight === "80vh") ? "60vh" : "80vh");
      setLowerSpaceVisible(!lowerSpaceVisible);
      setIsOpen(true);
    }

    setConsoleLoader(true);

    const url = "http://localhost:5000/question/submit";
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("language", "cpp");
    params.append("ques_no", problemId);

    axios.post(url, params, config).then((result) => {
      setConsoleData(result.data.message);
      setConsoleLoader(false);
    })
      .catch((err) => {
        setConsoleData(err);
        setConsoleLoader(false);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="problem-page">
        <div className="problem-page-left">
          <QuestionStatement problemId={problemId} loader={loader} setLoader={setLoader} />
        </div>
        <div className="problem-page-right">
          <div className="problem-page-right-top">
            <CodeEditor loader={loader} Code={code} setCode={setCode} ProblemId={problemId} EditorHeight={editorHeight} EditorWidth="58vw" controlConsole={controlConsole} onSubmit={onSubmit} />
          </div>
          <div className="problem-page-right-bottom" style={code_console}>
            <ConsolePanel consoleLoader={consoleLoader} isOpen={isOpen} console_data={consoleData} width="60vw" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default problemPage;
