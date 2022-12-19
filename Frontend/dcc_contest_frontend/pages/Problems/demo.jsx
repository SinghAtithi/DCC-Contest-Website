import React from "react";
import CodeEditor from "../../components/CodeEditor";
import Navbar from "../../components/Navbar";
import QuestionStatement from "./QuestionStatement";

function demo() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-between mt-6 px-6">
        <div className="overflow-auto px-4">
          <QuestionStatement />
        </div>
        <div className="flex flex-col items-center mt-32 px-4">
          <CodeEditor />
          <button className="btn btn-outline btn-success mt-6">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default demo;
