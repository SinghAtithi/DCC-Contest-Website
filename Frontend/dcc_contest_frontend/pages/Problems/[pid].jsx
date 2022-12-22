import React, { useEffect } from "react";
import CodeEditor from "../../components/CodeEditor";
import Navbar from "../../components/Navbar";
import QuestionStatement from "../../components/QuestionStatement";
import snippetCode from "../../components/snippet";
import axios from "axios";

function demo() {
  const [problemId, setProblemId] = React.useState("");
  const [code, setCode] = React.useState("");

  useEffect(() => {
    (() => {
      try {
        let temp = window.location.href.split("/");
        setProblemId(temp[temp.length - 1]);
      } catch (err) { }
    })();
  }, []);

  useEffect(() => {
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
    console.log(code);

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
      alert(`${result.data.message} , ${result.data.time}`);
    })
      .catch((err) => {
        console.log(err.response.data.error);
      });

  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-between mt-6 px-6">
        <div className="overflow-auto px-4">
          <QuestionStatement problemId={problemId} />
        </div>
        <div className="flex flex-col items-center mt-32 px-4">
          <CodeEditor Code={code} setCode={setCode} ProblemId={problemId} />
          <button
            className="btn btn-outline btn-success mt-6"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default demo;
