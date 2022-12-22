import React, { useEffect } from "react";
import CodeEditor from "../../components/CodeEditor";
import Navbar from "../../components/Navbar";
import QuestionStatement from "../../components/QuestionStatement";

function demo() {
  const [problemId, setProblemId] = React.useState("");
  const [code, setCode] = React.useState("");

  useEffect(() => {
    (() => {
      try {
        let temp = window.location.href.split("/");
        setProblemId(temp[temp.length - 1]);
      } catch (err) {}
    })();
  }, []);

  useEffect(() => {
    if (problemId) {
    }
  }, [problemId]);

  const onSubmit = () => {
    console.log(code);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-between mt-6 px-6">
        <div className="overflow-auto px-4">
          <QuestionStatement problemId={problemId} />
        </div>
        <div className="flex flex-col items-center mt-32 px-4">
          <CodeEditor Code={code} setCode={setCode} ProblemId="demo" />
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
