import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CodeEditor from "../../../components/CodeEditor";
import Navbar from "../../../components/Navbar";
import QuestionStatement from "../../../components/QuestionStatement";
import snippetCode from "../../../components/snippet";
import axios from "axios";
import ConsolePanel from "../../../components/console_panel";

const contest_container = {
  display: "flex",
};

const side_bar = {
  height: "90vh",
  width: "4%",
  border: "2px green",
  "border-style": "solid",
};

const question_area = {
  height: "90vh",
  width: "40%",
  overflowY: "scroll",
  border: "2px green",
  "border-style": "solid",
};

const code_editor = {
  height: "80vh",
  width: "56%",
};

const contestPage = () => {
  const router = useRouter();
  const { cid, pid } = router.query;

  const [problemId, setProblemId] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [lowerSpaceVisible, setLowerSpaceVisible] = React.useState(false);
  const [editorHeight, setEditorHeight] = React.useState("80vh");
  const [consoleData, setConsoleData] = React.useState(
    "Nothing to display on console"
  );
  const [loader, setLoader] = React.useState(false);
  const [consoleLoader, setConsoleLoader] = React.useState(false);

  const code_console = {
    display: lowerSpaceVisible ? "block" : "none",
  };

  useEffect(() => {
    (() => {
      try {
        let temp = window.location.href.split("/");
        setProblemId(temp[temp.length - 1]);
      } catch (err) {}
    })();
  }, []);

  useEffect(() => {
    setEditorHeight("80vh");
    setLowerSpaceVisible(false);
    setIsOpen(false);
    setConsoleData("Nothing to display on console");

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

  const onSubmit = async () => {
    setConsoleData("Evaluating the code ...");
    if (!isOpen) {
      setEditorHeight(editorHeight === "80vh" ? "60vh" : "80vh");
      setLowerSpaceVisible(!lowerSpaceVisible);
      setIsOpen(true);
    }

    setConsoleLoader(true);

    const url = "http://4.240.84.221:5000/question/submit";
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("language", "cpp");
    params.append("ques_no", problemId);

    axios
      .post(url, params, config)
      .then((result) => {
        setConsoleData(result.data.message);
        setConsoleLoader(false);
      })
      .catch((err) => {
        setConsoleData(err.response.data.error);
        setConsoleLoader(false);
      });
  };
  const controlConsole = () => {
    setEditorHeight(editorHeight === "80vh" ? "60vh" : "80vh");
    setLowerSpaceVisible(!lowerSpaceVisible);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar />
      <div style={contest_container}>
        <div style={side_bar}>
          <ul className="menu bg-base-500">
            <li>
              <button
                className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-3 my-2 rounded-full"
                onClick={() => {
                  router.push(`/contest/${cid}/Trial-03`);
                  setProblemId("Trial-03");
                }}
              >
                Q1
              </button>
            </li>
            <li>
              <button
                className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-3 my-2 rounded-full"
                onClick={() => {
                  router.push(`/contest/${cid}/Trial-04`);
                  setProblemId("Trial-04");
                }}
              >
                Q2
              </button>
            </li>
            <li>
              <button
                className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-3 my-2 rounded-full"
                onClick={() => {
                  router.push(`/contest/${cid}/Trial-05`);
                  setProblemId("Trial-05");
                }}
              >
                Q3
              </button>
            </li>
          </ul>
        </div>
        <div className="px-4 mx-2" style={question_area}>
          <QuestionStatement
            problemId={problemId}
            loader={loader}
            setLoader={setLoader}
          />
        </div>
        <div style={code_editor}>
          <div className="mx-4">
            <CodeEditor
              loader={loader}
              Code={code}
              setCode={setCode}
              ProblemId={problemId}
              EditorHeight={editorHeight}
              EditorWidth="54vw"
              controlConsole={controlConsole}
              onSubmit={onSubmit}
            />
          </div>
          <div style={code_console}>
            <ConsolePanel
              consoleLoader={consoleLoader}
              isOpen={isOpen}
              console_data={consoleData}
              width="56vw"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default contestPage;
